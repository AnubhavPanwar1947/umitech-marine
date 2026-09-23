import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  decodeHtmlEntities,
  getSearchTokensForQuery,
  normalizeSearchTextForMatching,
  sanitizeVisibleSearchSource,
  tokenMatchesInNormalizedText,
} from "../src/lib/search-matching.js";
import {
  getEnterFirstResultForQuery,
  isFilterChipDisabled,
  shouldFlushDebouncedQuery,
} from "../src/lib/search-panel-actions.js";
import { shouldClearQueryOnEscape } from "../src/lib/search-panel-status.js";
import {
  addRecentSearch,
  clearRecentSearches,
  readRecentSearches,
} from "../src/lib/search-recent.js";
import { searchPopular, standardTermsPage } from "../src/lib/site-data.js";
import {
  buildSiteSearchIndex,
  countSearchResultsByFilterGroup,
  filterSearchResultsByGroup,
  getClosestSearchResults,
  getEmptyStateFallbackResults,
  resetSiteSearchIndexCache,
  SEARCH_VAGUE_QUERY_RESULTS_CAP,
  searchSite,
} from "../src/lib/site-search.js";

function resultTitles(query, options = {}) {
  resetSiteSearchIndexCache();
  const { items } = searchSite(query, { limit: 500, ...options });
  return items.map((item) => item.title);
}

describe("search matching regressions", () => {
  it("sanitizes CFD markup and entities for indexing", () => {
    const raw = "Wind test &amp; statistical <li methods";
    const cleaned = sanitizeVisibleSearchSource(raw);
    assert.equal(cleaned.includes("<li"), false);
    assert.match(cleaned, /&/);
    const normalized = normalizeSearchTextForMatching(cleaned);
    assert.equal(tokenMatchesInNormalizedText(normalized, "amp"), false);
    assert.equal(tokenMatchesInNormalizedText(normalized, "li"), false);
    assert.equal(decodeHtmlEntities("&amp;"), "&");
  });

  it('returns only visible SIRE matches (not Marine Surveys false positives)', () => {
    const titles = resultTitles("sire");
    assert.equal(
      titles.some((title) => title === "Inspection, Audits and Surveying"),
      false,
    );
    assert.ok(titles.some((title) => title === "Audits and Inspections"));
    assert.equal(
      titles.some((title) => title === "Marine Surveys"),
      false,
    );
    assert.equal(
      titles.some((title) => title === "Marine Warranty Surveys"),
      false,
    );
  });

  it("finds RightShip on the Inspection practice overview", () => {
    const titles = resultTitles("RightShip");
    assert.ok(
      titles.some((title) => title === "Inspection, Audits and Surveying"),
    );
  });

  it("does not match home for alt-only term spherical", () => {
    const titles = resultTitles("spherical");
    assert.equal(
      titles.some((title) => title === "Home"),
      false,
    );
  });

  it("does not match CFD for markup tokens amp or li", () => {
    const ampTitles = resultTitles("amp");
    const liTitles = resultTitles("li");
    assert.equal(
      ampTitles.some((title) => /computational fluid dynamics/i.test(title)),
      false,
    );
    assert.equal(
      liTitles.some((title) => /computational fluid dynamics/i.test(title)),
      false,
    );
  });

  it("reports total counts above the default render cap for vague stopwords", () => {
    resetSiteSearchIndexCache();
    const capped = searchSite("the", { limit: 25 });
    assert.equal(capped.type, "results");
    assert.equal(capped.vagueQuery, true);
    assert.ok(capped.items.length <= SEARCH_VAGUE_QUERY_RESULTS_CAP);
    assert.ok(capped.totalCount > capped.items.length);
    assert.equal(capped.hasMore, true);
  });

  it("does not run full search for queries shorter than two characters", () => {
    resetSiteSearchIndexCache();
    assert.equal(searchSite("m", { limit: 500 }).type, "hint");
    assert.equal(searchSite(" ", { limit: 500 }).type, "hint");
  });

  it("caps vague single-token stopword previews without blocking longer phrases", () => {
    resetSiteSearchIndexCache();
    const vague = searchSite("and", { limit: 500 });
    assert.equal(vague.vagueQuery, true);
    assert.ok(vague.items.length <= SEARCH_VAGUE_QUERY_RESULTS_CAP);
    assert.ok(vague.totalCount > vague.items.length);

    resetSiteSearchIndexCache();
    const specific = searchSite("and inspection", { limit: 25 });
    assert.equal(specific.vagueQuery, false);
    assert.ok(specific.items.length > 0);
  });

  it("uses two-stage Escape semantics at the logic level", () => {
    assert.equal(shouldClearQueryOnEscape("marine"), true);
    assert.equal(shouldClearQueryOnEscape("  "), false);
    assert.equal(shouldClearQueryOnEscape(""), false);
  });

  it("detects when Enter should flush ahead of the debounced query", () => {
    assert.equal(shouldFlushDebouncedQuery("sire", ""), true);
    assert.equal(shouldFlushDebouncedQuery("sire", "sire"), false);
    assert.equal(shouldFlushDebouncedQuery("  marine ", "marine"), false);
    assert.equal(shouldFlushDebouncedQuery("  marine ", "  marine "), false);
  });

  it("resolves Enter navigation from the raw query, not a stale debounce", () => {
    resetSiteSearchIndexCache();
    const staleDebounced = searchSite("m", { limit: 25 });
    assert.equal(staleDebounced.type, "hint");

    resetSiteSearchIndexCache();
    const flushed = getEnterFirstResultForQuery("sire", "all", 25);
    assert.ok(flushed);
    assert.equal(flushed.title, "Audits and Inspections");
  });

  it("marks zero-count filter chips as disabled except All", () => {
    resetSiteSearchIndexCache();
    const { items } = searchSite("engineering", { limit: 40 });
    const counts = countSearchResultsByFilterGroup(items);
    assert.equal(isFilterChipDisabled("all", counts), false);
    assert.equal(
      isFilterChipDisabled("services", counts),
      counts.services === 0,
    );
    if (counts.legal === 0) {
      assert.equal(isFilterChipDisabled("legal", counts), true);
    }
  });

  it("clears recent searches in session storage without error", () => {
    const storage = new Map();
    globalThis.sessionStorage = {
      getItem: (key) => storage.get(key) ?? null,
      setItem: (key, value) => {
        storage.set(key, value);
      },
      removeItem: (key) => {
        storage.delete(key);
      },
    };
    globalThis.window = globalThis;

    clearRecentSearches();
    assert.deepEqual(readRecentSearches(), []);

    addRecentSearch("marine");
    assert.equal(readRecentSearches().length, 1);

    clearRecentSearches();
    assert.deepEqual(readRecentSearches(), []);
  });

  it("matches filter chip counts to filterSearchResultsByGroup", () => {
    resetSiteSearchIndexCache();
    const { items } = searchSite("marine", { limit: 40 });
    const counts = countSearchResultsByFilterGroup(items);
    assert.equal(counts.all, items.length);
    for (const groupId of ["services", "articles", "team", "about", "legal"]) {
      assert.equal(
        counts[groupId],
        filterSearchResultsByGroup(items, groupId).length,
      );
    }
  });

  it("keeps searchPopular terms aligned with strong site matches", () => {
    for (const term of searchPopular) {
      resetSiteSearchIndexCache();
      const result = searchSite(term, { limit: 8 });
      assert.equal(result.type, "results", `expected results for ${term}`);
      assert.ok(result.items.length > 0, `no items for ${term}`);
    }
  });

  it("ranks Flag state popular search above unrelated legal sections", () => {
    resetSiteSearchIndexCache();
    const { items } = searchSite("Flag state", { limit: 8 });
    assert.ok(
      items.some((item) => item.title === "Audits and Inspections"),
      "expected maritime flag-state content in top results",
    );
    assert.equal(
      items[0]?.title.startsWith("9."),
      false,
      "legal section should not top flag state results",
    );
  });

  it("matches word families and partial stems", () => {
    const inspect = resultTitles("inspect");
    assert.ok(inspect.includes("Inspection, Audits and Surveying"));
    assert.ok(inspect.includes("Audits and Inspections"));

    const consult = resultTitles("consult");
    assert.ok(consult.includes("Engineering"));

    const certificate = resultTitles("certificate");
    assert.ok(certificate.some((title) => /marine surveys/i.test(title)));

    const stabilit = resultTitles("stabilit");
    assert.ok(stabilit.includes("Stability Calculation"));

    const engineer = resultTitles("engineer");
    assert.ok(engineer.includes("Engineering"));

    const navalArchitect = resultTitles("naval architect");
    assert.ok(navalArchitect.includes("Naval Architecture"));
  });

  it("matches hyphen and compound variants", () => {
    const hyphen = resultTitles("front-end");
    const frontend = resultTitles("frontend");
    const frontEnd = resultTitles("front end");
    assert.deepEqual(new Set(frontend), new Set(hyphen));
    assert.deepEqual(new Set(frontEnd), new Set(hyphen));
    assert.ok(hyphen.includes("Front-End Engineering Design Study"));

    const dryDock = resultTitles("dry dock");
    const drydock = resultTitles("drydock");
    assert.deepEqual(new Set(dryDock), new Set(drydock));
    assert.ok(dryDock.length > 0);
  });

  it("preserves P&I as a dedicated token (not a search for and)", () => {
    assert.deepEqual(getSearchTokensForQuery("P&I"), ["pi"]);
    resetSiteSearchIndexCache();
    const piTitles = resultTitles("P&I");
    assert.ok(piTitles.includes("Marine Surveys"));
    const andCount = searchSite("and", { limit: 500 }).totalCount;
    const piCount = searchSite("P&I", { limit: 500 }).totalCount;
    assert.ok(piCount < andCount);
  });

  it("keeps fees and payment discoverable", () => {
    const titles = resultTitles("fees and payment");
    assert.ok(titles.some((title) => title.startsWith("5.")));
  });

  it("indexes visible legal clauses without ids on parent section records", () => {
    resetSiteSearchIndexCache();
    const records = buildSiteSearchIndex();
    for (const section of standardTermsPage.sections) {
      const title = section.heading
        ? `${section.number}. ${section.heading}`
        : `Section ${section.number}`;
      const record = records.find((entry) => entry.title === title);
      assert.ok(record, `missing section record for ${title}`);
      for (const clause of section.clauses ?? []) {
        if (!clause.text) {
          continue;
        }
        assert.ok(
          record.searchText.includes(clause.text),
          `clause text missing from section index: ${title}`,
        );
      }
    }
  });

  it("does not surface removed Indian law phrase from Standard Terms", () => {
    resetSiteSearchIndexCache();
    const records = buildSiteSearchIndex();
    const governingLaw = records.find((item) =>
      item.title.includes("Governing Law and Jurisdiction"),
    );
    assert.ok(governingLaw);
    assert.equal(governingLaw.searchText.includes("Indian law"), false);

    const exact = searchSite("Indian", { limit: 50 });
    assert.equal(
      exact.items.some(
        (item) =>
          item.href.includes("standard-terms-section-11") &&
          (item.snippet ?? "").match(/Indian/i),
      ),
      false,
    );
  });

  it("resolves autocomplete suggestions into empty-state fallback records", () => {
    resetSiteSearchIndexCache();
    const fallback = getEmptyStateFallbackResults("consult", 3);
    assert.ok(fallback.length > 0);
    assert.ok(
      fallback.some(
        (item) =>
          item.title === "Engineering" || item.href.includes("engineering"),
      ),
    );

    resetSiteSearchIndexCache();
    const closest = getClosestSearchResults("stabilit", 3);
    assert.ok(closest.length > 0);
    assert.ok(closest.some((item) => item.title === "Stability Calculation"));
  });

  it("filters displayed results by group without changing underlying matches", () => {
    resetSiteSearchIndexCache();
    const { items } = searchSite("marine", { limit: 40 });
    assert.ok(items.length > 3);
    const groups = new Set(items.map((item) => item.group));
    assert.ok(groups.size > 1);

    const servicesOnly = filterSearchResultsByGroup(items, "services");
    assert.ok(servicesOnly.length > 0);
    assert.ok(servicesOnly.length < items.length);
    assert.ok(servicesOnly.every((item) => item.group === "services"));

    const all = filterSearchResultsByGroup(items, "all");
    assert.deepEqual(all, items);
  });
});
