import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { Window } from "happy-dom";
import {
  buildSearchInputDescribedBy,
  isFilterChipDisabled,
  isFocusablePanelElement,
  resolveSearchPanelEscapeAction,
  SEARCH_PANEL_FOCUSABLE_SELECTOR,
  shouldFlushDebouncedQuery,
  shouldPreventTabTrapWrap,
} from "../src/lib/search-panel-actions.js";
import {
  countSearchResultsByFilterGroup,
  resetSiteSearchIndexCache,
  searchSite,
} from "../src/lib/site-search.js";
import {
  clearRecentSearches,
  dedupeRecentSearchEntries,
  readRecentSearches,
} from "../src/lib/search-recent.js";

function createPanelDocument() {
  const window = new Window({ innerWidth: 1280, innerHeight: 800 });
  const document = window.document;
  document.body.innerHTML = `
    <div id="panel" role="search">
      <button type="button" id="close">Close</button>
      <input id="search-input" type="search" aria-describedby="escape-hint" />
      <p id="escape-hint">Esc to clear · Esc again to close</p>
      <button type="button" id="filter-all" aria-pressed="true">All (3)</button>
      <button type="button" id="filter-legal" aria-disabled="true">Legal (0)</button>
      <button type="button" id="clear-recent">Clear</button>
      <button type="button" class="chip">marine</button>
    </div>
  `;
  return { window, document, panel: document.getElementById("panel") };
}

describe("search panel DOM behavior", () => {
  it("associates the escape hint with the input through aria-describedby", () => {
    const describedBy = buildSearchInputDescribedBy({
      escapeHintId: "escape-hint",
      hasQuery: true,
    });
    assert.equal(describedBy, "escape-hint");
    assert.equal(
      buildSearchInputDescribedBy({ escapeHintId: "escape-hint", hasQuery: false }),
      undefined,
    );
  });

  it("uses two-stage Escape semantics for clear then close", () => {
    assert.equal(resolveSearchPanelEscapeAction("marine"), "clear-query");
    assert.equal(resolveSearchPanelEscapeAction("   "), "close-panel");
    assert.equal(resolveSearchPanelEscapeAction(""), "close-panel");
  });

  it("flushes whitespace-equivalent raw and debounced queries without a stale state", () => {
    assert.equal(shouldFlushDebouncedQuery("  marine ", "marine"), false);
    assert.equal(shouldFlushDebouncedQuery("sire", ""), true);
  });

  it("still flushes Enter for no-result queries when debounce is behind", () => {
    resetSiteSearchIndexCache();
    const noResultQuery = "zzzznotfoundquery";
    const stale = searchSite("", { limit: 25 });
    assert.equal(stale.type, "hint");
    assert.equal(shouldFlushDebouncedQuery(noResultQuery, ""), true);
    const fresh = searchSite(noResultQuery, { limit: 25 });
    assert.equal(fresh.type, "results");
    assert.equal(fresh.items.length, 0);
  });

  it("keeps aria-disabled filter chips in the tab order and blocks filter changes", () => {
    const { document, panel } = createPanelDocument();
    const focusable = [...panel.querySelectorAll(SEARCH_PANEL_FOCUSABLE_SELECTOR)].filter(
      isFocusablePanelElement,
    );
    const legalChip = document.getElementById("filter-legal");
    assert.ok(focusable.includes(legalChip));
    assert.equal(legalChip.getAttribute("aria-disabled"), "true");

    resetSiteSearchIndexCache();
    const { items } = searchSite("engineering", { limit: 40 });
    const counts = countSearchResultsByFilterGroup(items);
    assert.equal(isFilterChipDisabled("legal", counts), counts.legal === 0);
  });

  it("wraps Tab and Shift+Tab at the panel edges", () => {
    assert.equal(
      shouldPreventTabTrapWrap({
        focusInsidePanel: false,
        shiftKey: false,
        activeIsFirst: false,
        activeIsLast: false,
      }),
      true,
    );
    assert.equal(
      shouldPreventTabTrapWrap({
        focusInsidePanel: true,
        shiftKey: true,
        activeIsFirst: true,
        activeIsLast: false,
      }),
      true,
    );
    assert.equal(
      shouldPreventTabTrapWrap({
        focusInsidePanel: true,
        shiftKey: false,
        activeIsFirst: false,
        activeIsLast: true,
      }),
      true,
    );
    assert.equal(
      shouldPreventTabTrapWrap({
        focusInsidePanel: true,
        shiftKey: false,
        activeIsFirst: false,
        activeIsLast: false,
      }),
      false,
    );
  });

  it("clears recent searches without leaving duplicate chip labels", () => {
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

    const deduped = dedupeRecentSearchEntries([
      "marine",
      " Marine ",
      "sire",
      "marine",
    ]);
    assert.deepEqual(deduped, ["marine", "sire"]);

    clearRecentSearches();
    assert.deepEqual(readRecentSearches(), []);
  });
});
