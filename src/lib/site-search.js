import {
  about,
  aboutPage,
  blogPage,
  brand,
  contactCta,
  contactPage,
  cookiesPolicyPage,
  disclaimerPage,
  footer,
  hero,
  privacyPolicyPage,
  searchPopular,
  services,
  servicesPage,
  servicesSection,
  standardTermsPage,
  teamPage,
  termsPage,
} from "@/lib/site-data";
import { cfdDocxPlainText } from "@/lib/cfd-docx-plaintext";
import { cfdDocxSearchSections } from "@/lib/cfd-docx-search-sections";
import {
  LEGAL_PAGE_PREFIX,
  blogSectionAnchor,
  contactCardAnchor,
  legalClauseAnchor,
  legalSectionAnchor,
  serviceTopicAnchor,
  teamMemberAnchor,
} from "@/lib/search-anchors";
import {
  expandQueryWithSynonyms,
  findSnippetAnchorIndex,
  getSearchTokensForQuery,
  getVisibleMatchText,
  normalizeSearchText,
  recordHasHighlightableVisibleMatch,
  recordMatchesQuery,
  sanitizeVisibleSearchSource,
  queryTokensSatisfied,
  tokenMatchesInNormalizedText,
} from "@/lib/search-matching";

export {
  expandQueryWithSynonyms,
  getSearchTokensForQuery,
  normalizeSearchText,
  tokenizeSearchQuery,
} from "@/lib/search-matching";

export const RESULT_GROUP_LABELS = {
  services: "Service",
  articles: "Article",
  team: "Team member",
  about: "Company",
  legal: "Legal",
};

export function getRecordGroup(record) {
  const href = String(record.href ?? "");
  const category = normalizeSearchText(record.category);

  if (href.startsWith("/blog") || category.includes("blog")) {
    return "articles";
  }
  if (category.includes("team")) {
    return "team";
  }
  if (
    category.includes("legal") ||
    category.includes("terms") ||
    category.includes("cookies") ||
    category.includes("privacy") ||
    category.includes("disclaimer") ||
    category.includes("standard")
  ) {
    return "legal";
  }
  if (
    href.startsWith("/services") ||
    category.includes("service") ||
    category.includes("naval")
  ) {
    return "services";
  }
  if (
    category.includes("about") ||
    href === "/about" ||
    href === "/contact" ||
    category.includes("contact") ||
    category.includes("navigation") ||
    category.includes("footer") ||
    href === "/"
  ) {
    return "about";
  }

  return "about";
}

function pushRecord(records, seen, record) {
  const href = record.anchor ? `${record.href}#${record.anchor}` : record.href;
  const key = `${href}|${record.title}`;
  if (seen.has(key)) {
    return;
  }
  seen.add(key);
  records.push({
    title: record.title,
    href,
    category: record.category,
    searchText: record.searchText,
  });
}

function joinSearchParts(parts) {
  return parts.filter(Boolean).join(" ");
}

function buildLegalPageRecords(page, href, categoryPrefix, records, seen) {
  const pagePrefix = LEGAL_PAGE_PREFIX[href] ?? slugifyLegalPrefix(categoryPrefix);

  pushRecord(records, seen, {
    title: page.title,
    href,
    category: categoryPrefix,
    searchText: joinSearchParts([page.title, page.lead]),
  });

  for (const section of page.sections ?? []) {
    const sectionTitle = section.heading
      ? `${section.number}. ${section.heading}`
      : `Section ${section.number}`;
    const sectionParts = [
      section.heading,
      section.intro,
      ...(section.paragraphs ?? []),
      ...(section.listItems ?? []),
      ...(section.paragraphsAfterList ?? []),
      section.email,
      section.location,
      section.organization,
      section.phone,
      section.contactPageLabel,
    ];

    for (const definition of section.definitions ?? []) {
      sectionParts.push(definition.term, definition.text);
    }

    const clauses = section.clauses ?? [];

    for (const clause of clauses) {
      sectionParts.push(clause.id, clause.text, ...(clause.subItems ?? []));
    }

    pushRecord(records, seen, {
      title: sectionTitle,
      href,
      anchor: legalSectionAnchor(pagePrefix, section.number),
      category: `${categoryPrefix} · ${page.title}`,
      searchText: joinSearchParts(sectionParts),
    });

    for (const clause of clauses) {
      if (!clause.id) {
        continue;
      }
      const clauseLabel = `${clause.id}. ${section.heading}`;
      pushRecord(records, seen, {
        title: clauseLabel,
        href,
        anchor: legalClauseAnchor(pagePrefix, clause.id),
        category: `${categoryPrefix} · ${page.title}`,
        searchText: joinSearchParts([
          section.heading,
          sectionTitle,
          clause.id,
          clause.text,
          ...(clause.subItems ?? []),
        ]),
      });
    }
  }
}

function slugifyLegalPrefix(value) {
  return String(value ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function buildSiteSearchIndex() {
  const records = [];
  const seen = new Set();

  pushRecord(records, seen, {
    title: "Home",
    href: "/",
    category: brand.name,
    searchText: joinSearchParts([
      brand.name,
      brand.tagline,
      hero.headlinePrefix,
      hero.headlineAccent,
      hero.subheadlinePrefix,
      hero.subheadlineAccent,
      hero.subheadlineSuffix,
      hero.lead,
      hero.ctaLabel,
      servicesSection.title,
      servicesSection.lead,
      about.eyebrow,
      about.titlePrefix,
      about.titleAccent,
      ...about.paragraphs,
      about.ctaLabel,
      contactCta.title,
      contactCta.lead,
      contactCta.ctaLabel,
      ...services.map((service) => service.title),
    ]),
  });

  pushRecord(records, seen, {
    title: contactPage.title,
    href: "/contact",
    anchor: "contact",
    category: "Contact",
    searchText: joinSearchParts([
      contactPage.title,
      contactCta.title,
      contactCta.lead,
      ...contactPage.cards.map((card) => `${card.title} ${card.description}`),
      contactPage.form.heading,
      contactPage.form.submitLabel,
      footer.contact.phone,
      footer.contact.address,
      footer.contact.email,
    ]),
  });

  for (const card of contactPage.cards) {
    pushRecord(records, seen, {
      title: card.title,
      href: "/contact",
      anchor: contactCardAnchor(card.title),
      category: "Contact",
      searchText: joinSearchParts([card.title, card.description]),
    });
  }

  pushRecord(records, seen, {
    title: contactPage.form.heading,
    href: "/contact",
    anchor: "contact-form",
    category: "Contact",
    searchText: joinSearchParts([
      contactPage.form.heading,
      contactPage.form.submitLabel,
    ]),
  });

  pushRecord(records, seen, {
    title: "About",
    href: "/about",
    category: brand.name,
    searchText: joinSearchParts([
      aboutPage.intro.eyebrow,
      ...aboutPage.intro.paragraphs,
      aboutPage.mission.heading,
      ...aboutPage.mission.points,
      aboutPage.vision.heading,
      aboutPage.vision.body,
      aboutPage.values.heading,
      ...aboutPage.values.items.flatMap((item) => [
        item.title,
        item.description,
      ]),
    ]),
  });

  pushRecord(records, seen, {
    title: aboutPage.mission.heading,
    href: "/about",
    anchor: "mission",
    category: "About",
    searchText: joinSearchParts([
      aboutPage.mission.heading,
      ...aboutPage.mission.points,
    ]),
  });

  pushRecord(records, seen, {
    title: aboutPage.vision.heading,
    href: "/about",
    anchor: "vision",
    category: "About",
    searchText: joinSearchParts([aboutPage.vision.heading, aboutPage.vision.body]),
  });

  pushRecord(records, seen, {
    title: aboutPage.values.heading,
    href: "/about",
    anchor: "values",
    category: "About",
    searchText: joinSearchParts([
      aboutPage.values.heading,
      ...aboutPage.values.items.flatMap((item) => [
        item.title,
        item.description,
      ]),
    ]),
  });

  pushRecord(records, seen, {
    title: servicesPage.intro.title,
    href: "/services",
    category: "Services",
    searchText: joinSearchParts([
      servicesPage.intro.title,
      servicesPage.intro.lead,
      ...servicesPage.intro.bullets,
    ]),
  });

  for (const practice of servicesPage.practices) {
    const practiceLabel =
      practice.id === "naval" ? "Naval Architecture" : practice.heading;

    pushRecord(records, seen, {
      title: practiceLabel,
      href: "/services",
      anchor: practice.id,
      category: "Services",
      searchText: joinSearchParts([practiceLabel, practice.heading, practice.lead]),
    });

    for (const item of practice.items) {
      const itemParts = [
        item.title,
        ...(item.detail ?? []),
        ...(item.detailList ?? []),
        ...(item.detailAfter ?? []),
      ];

      if (item.slug && item.detail?.length) {
        pushRecord(records, seen, {
          title: item.title,
          href: `/services/${practice.id}/${item.slug}/`,
          anchor: serviceTopicAnchor(),
          category: `${practiceLabel} · Services`,
          searchText: joinSearchParts(itemParts),
        });
      } else {
        pushRecord(records, seen, {
          title: item.title,
          href: "/services",
          anchor: practice.id,
          category: `${practiceLabel} · Services`,
          searchText: joinSearchParts(itemParts),
        });
      }
    }
  }

  pushRecord(records, seen, {
    title: teamPage.intro.title,
    href: "/team",
    category: "Team",
    searchText: joinSearchParts([
      teamPage.intro.title,
      teamPage.intro.eyebrow,
      teamPage.intro.lead,
      teamPage.intro.leadSupplement,
      teamPage.cta.heading,
      teamPage.cta.lead,
      teamPage.cta.ctaLabel,
    ]),
  });

  for (const member of teamPage.members) {
    pushRecord(records, seen, {
      title: member.name,
      href: "/team",
      anchor: teamMemberAnchor(member.name),
      category: "Team",
      searchText: joinSearchParts([member.name, member.role, member.bio]),
    });
  }

  pushRecord(records, seen, {
    title: blogPage.intro.title,
    href: "/blog",
    category: "Blog",
    searchText: joinSearchParts([blogPage.intro.title, blogPage.intro.lead]),
  });

  for (const article of blogPage.articles) {
    const articleTitle = article.cardTitle ?? article.title;
    const articleParts = [
      articleTitle,
      article.title,
      article.excerpt,
      article.summary,
      ...(article.intro ?? []),
    ];

    if (article.format === "docxHtml") {
      articleParts.push(sanitizeVisibleSearchSource(cfdDocxPlainText));
    }

    pushRecord(records, seen, {
      title: articleTitle,
      href: `/blog/${article.slug}/`,
      category: "Blog",
      searchText: joinSearchParts(articleParts),
    });

    if (article.format === "docxHtml" && article.slug === "computational-fluid-dynamics") {
      for (const cfdSection of cfdDocxSearchSections) {
        pushRecord(records, seen, {
          title: cfdSection.label || articleTitle,
          href: `/blog/${article.slug}/`,
          anchor: cfdSection.id,
          category: `${articleTitle} · Blog`,
          searchText: joinSearchParts([
            articleTitle,
            article.title,
            cfdSection.label,
            sanitizeVisibleSearchSource(cfdSection.searchText),
          ]),
        });
      }
    }

    for (const section of article.sections ?? []) {
      pushRecord(records, seen, {
        title: section.heading,
        href: `/blog/${article.slug}/`,
        anchor: blogSectionAnchor(section.heading),
        category: `${articleTitle} · Blog`,
        searchText: joinSearchParts([
          articleTitle,
          article.title,
          section.heading,
          ...(section.paragraphs ?? []),
          ...(section.list ?? []),
        ]),
      });
    }

    if (article.cta) {
      pushRecord(records, seen, {
        title: article.cta.heading,
        href: `/blog/${article.slug}/`,
        category: `${articleTitle} · Blog`,
        searchText: joinSearchParts([
          article.cta.heading,
          article.cta.lead,
          article.cta.ctaLabel,
        ]),
      });
    }
  }

  buildLegalPageRecords(
    standardTermsPage,
    "/standard-terms-conditions",
    "Standard Terms",
    records,
    seen,
  );
  buildLegalPageRecords(termsPage, "/terms-conditions", "Website Terms", records, seen);
  buildLegalPageRecords(
    cookiesPolicyPage,
    "/cookies-policy",
    "Cookies",
    records,
    seen,
  );
  buildLegalPageRecords(
    privacyPolicyPage,
    "/privacy-policy",
    "Privacy",
    records,
    seen,
  );
  buildLegalPageRecords(
    disclaimerPage,
    "/disclaimer",
    "Disclaimer",
    records,
    seen,
  );

  return records;
}

let cachedIndex;

export function getSiteSearchIndex() {
  if (!cachedIndex) {
    cachedIndex = buildSiteSearchIndex();
  }
  return cachedIndex;
}

export function resetSiteSearchIndexCache() {
  cachedIndex = undefined;
}

function makeSnippet(text, query) {
  if (!text) {
    return "";
  }

  const index = findSnippetAnchorIndex(text, query);
  if (index < 0) {
    return "";
  }

  const start = Math.max(0, index - 48);
  const end = Math.min(text.length, start + 150);
  const slice = text.slice(start, end).replace(/\s+/g, " ").trim();
  const prefix = start > 0 ? "…" : "";
  const suffix = end < text.length ? "…" : "";
  return `${prefix}${slice}${suffix}`;
}

function scoreRecord(record, query, { relaxed = false } = {}) {
  if (!recordMatchesQuery(record, query, { relaxed })) {
    return null;
  }

  const tokens = getSearchTokensForQuery(query);
  const normalizedQuery = normalizeSearchText(expandQueryWithSynonyms(query));
  const title = normalizeSearchText(record.title);
  const body = normalizeSearchText(record.searchText);
  const visible = getVisibleMatchText(record);

  const matchedTokens = tokens.filter((token) =>
    tokenMatchesInNormalizedText(visible, token),
  );

  let score = 0;
  if (title === normalizedQuery) {
    score += 1000;
  } else if (tokens.length > 1 && queryTokensSatisfied(title, tokens)) {
    score += 700;
  } else if (queryTokensSatisfied(title, tokens)) {
    score += 500;
  } else if (queryTokensSatisfied(body, tokens)) {
    score += 120;
  } else if (relaxed) {
    score += matchedTokens.length * 25;
  }

  score += tokens.filter((token) => tokenMatchesInNormalizedText(title, token)).length * 40;
  score += tokens.filter((token) => tokenMatchesInNormalizedText(body, token)).length * 8;

  const snippetSource = record.searchText || record.title;
  const snippet = makeSnippet(snippetSource, query);
  if (
    !relaxed &&
    !recordHasHighlightableVisibleMatch(snippetSource, query) &&
    !recordHasHighlightableVisibleMatch(record.title, query)
  ) {
    return null;
  }

  const group = getRecordGroup(record);

  return {
    ...record,
    group,
    groupLabel: RESULT_GROUP_LABELS[group] ?? "Page",
    score,
    snippet,
  };
}

function rankSearchResults(query, { relaxed = false, limit = 25, offset = 0 } = {}) {
  const ranked = getSiteSearchIndex()
    .map((record) => scoreRecord(record, query, { relaxed }))
    .filter(Boolean)
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));

  const seenKeys = new Set();
  const allItems = [];
  for (const item of ranked) {
    const key = `${item.href}|${item.title}`;
    if (seenKeys.has(key)) {
      continue;
    }
    seenKeys.add(key);
    allItems.push(item);
  }

  const totalCount = allItems.length;
  const items = allItems.slice(offset, offset + limit);

  return {
    items,
    totalCount,
    hasMore: offset + limit < totalCount,
  };
}

export function getAutocompleteSuggestions(query, limit = 6) {
  const trimmed = query.trim();
  if (trimmed.length < 2) {
    return [];
  }

  const normalized = normalizeSearchText(expandQueryWithSynonyms(trimmed));
  const suggestions = new Set();

  for (const term of searchPopular) {
    const normalizedTerm = normalizeSearchText(term);
    if (
      normalizedTerm.includes(normalized) ||
      normalized.includes(normalizedTerm)
    ) {
      suggestions.add(term);
    }
  }

  const queryTokens = getSearchTokensForQuery(trimmed);

  for (const record of getSiteSearchIndex()) {
    const title = normalizeSearchText(record.title);
    if (
      title.startsWith(normalized) ||
      queryTokens.every((token) => tokenMatchesInNormalizedText(title, token))
    ) {
      suggestions.add(record.title);
    }
    if (suggestions.size >= limit * 2) {
      break;
    }
  }

  return [...suggestions]
    .filter((entry) => normalizeSearchText(entry) !== normalized)
    .sort((a, b) => {
      const aNorm = normalizeSearchText(a);
      const bNorm = normalizeSearchText(b);
      const aStarts = aNorm.startsWith(normalized) ? 0 : 1;
      const bStarts = bNorm.startsWith(normalized) ? 0 : 1;
      if (aStarts !== bStarts) {
        return aStarts - bStarts;
      }
      return a.localeCompare(b);
    })
    .slice(0, limit);
}

export function getAlternativeSearchSuggestions(query, limit = 4) {
  const normalized = normalizeSearchText(expandQueryWithSynonyms(query));
  const picks = searchPopular.filter((term) => {
    const termNorm = normalizeSearchText(term);
    return termNorm !== normalized && !termNorm.includes(normalized);
  });
  return picks.slice(0, limit);
}

const SUGGESTION_RECORD_OVERRIDES = {
  "Technical Consulting": (records) =>
    records.find((record) => record.href === "/services#engineering"),
};

function recordFromSuggestion(suggestion, query) {
  const records = getSiteSearchIndex();
  const override = SUGGESTION_RECORD_OVERRIDES[suggestion];
  const record = override ? override(records) : records.find((r) => r.title === suggestion);
  if (!record) {
    return null;
  }

  const scored =
    scoreRecord(record, query, { relaxed: true }) ??
    scoreRecord(record, query, { relaxed: false });
  if (scored) {
    return scored;
  }

  const group = getRecordGroup(record);
  return {
    ...record,
    group,
    groupLabel: RESULT_GROUP_LABELS[group] ?? "Page",
    score: 1,
    snippet: makeSnippet(record.searchText || record.title, query),
  };
}

export function getEmptyStateFallbackResults(query, limit = 3) {
  const trimmed = String(query ?? "").trim();
  if (!trimmed) {
    return [];
  }

  const suggestions = getAutocompleteSuggestions(trimmed, limit);
  const items = [];
  const seen = new Set();

  for (const suggestion of suggestions) {
    const scored = recordFromSuggestion(suggestion, trimmed);
    if (!scored) {
      continue;
    }
    const key = `${scored.href}|${scored.title}`;
    if (seen.has(key)) {
      continue;
    }
    seen.add(key);
    items.push(scored);
    if (items.length >= limit) {
      break;
    }
  }

  return items;
}

export function getClosestSearchResults(query, limit = 3) {
  const { items } = rankSearchResults(query, { relaxed: true, limit });
  if (items.length > 0) {
    return items;
  }
  return getEmptyStateFallbackResults(query, limit);
}

export function getRelatedServiceResults(query, limit = 3) {
  const trimmed = String(query ?? "").trim();
  if (!trimmed) {
    return [];
  }

  const { items } = rankSearchResults(trimmed, { relaxed: true, limit: 12 });
  const serviceItems = items
    .filter((item) => item.group === "services")
    .slice(0, limit)
    .map((item) => ({
      ...item,
      snippet: item.snippet || makeSnippet(item.searchText || item.title, trimmed),
    }));

  if (serviceItems.length > 0) {
    return serviceItems;
  }

  return getEmptyStateFallbackResults(trimmed, limit)
    .filter((item) => item.group === "services")
    .slice(0, limit);
}

export const DEFAULT_SEARCH_RESULTS_LIMIT = 25;

export const SEARCH_MIN_QUERY_LENGTH = 2;

export const SEARCH_VAGUE_QUERY_RESULTS_CAP = 6;

export const SEARCH_VAGUE_STOPWORDS = new Set([
  "a",
  "an",
  "and",
  "as",
  "at",
  "be",
  "by",
  "for",
  "from",
  "in",
  "is",
  "it",
  "of",
  "on",
  "or",
  "the",
  "to",
  "with",
]);

export function isVagueSingleTokenQuery(query) {
  const trimmed = String(query ?? "").trim().toLowerCase();
  const tokens = trimmed.split(/\s+/).filter(Boolean);
  return tokens.length === 1 && SEARCH_VAGUE_STOPWORDS.has(tokens[0]);
}

export function searchSite(query, { limit = DEFAULT_SEARCH_RESULTS_LIMIT, offset = 0 } = {}) {
  const trimmed = query.trim();
  if (!trimmed || trimmed.length < SEARCH_MIN_QUERY_LENGTH) {
    return { type: "hint" };
  }

  const vagueQuery = isVagueSingleTokenQuery(trimmed);
  const effectiveLimit = vagueQuery
    ? Math.min(limit, SEARCH_VAGUE_QUERY_RESULTS_CAP)
    : limit;

  const { items, totalCount, hasMore } = rankSearchResults(trimmed, {
    limit: effectiveLimit,
    offset,
  });

  return {
    type: "results",
    items,
    totalCount,
    hasMore: vagueQuery ? totalCount > items.length : hasMore,
    limit: effectiveLimit,
    offset,
    vagueQuery,
  };
}

export function filterSearchResultsByGroup(items, groupId) {
  if (groupId === "all") {
    return items;
  }
  return items.filter((item) => item.group === groupId);
}

export function countSearchResultsByFilterGroup(items) {
  const counts = { all: items.length };
  for (const groupId of ["services", "articles", "team", "about", "legal"]) {
    counts[groupId] = filterSearchResultsByGroup(items, groupId).length;
  }
  return counts;
}
