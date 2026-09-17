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
  navigation,
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

const SEARCH_SYNONYM_RULES = [
  { pattern: /\bmarine survey(?:ing)?\b/gi, replacement: "surveying" },
  { pattern: /\bship design\b/gi, replacement: "naval architecture" },
  { pattern: /\bcfd\b/gi, replacement: "computational fluid dynamics" },
  { pattern: /\btechnical consulting\b/gi, replacement: "engineering" },
];

export const RESULT_GROUP_LABELS = {
  services: "Service",
  articles: "Article",
  team: "Team member",
  about: "Company",
  legal: "Legal",
};

export function expandQueryWithSynonyms(query) {
  let expanded = String(query ?? "");
  for (const rule of SEARCH_SYNONYM_RULES) {
    expanded = expanded.replace(rule.pattern, rule.replacement);
  }
  return expanded;
}

export function getSearchTokensForQuery(query) {
  return tokenizeSearchQuery(expandQueryWithSynonyms(query));
}

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

export function normalizeSearchText(value) {
  return String(value ?? "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[\u2010-\u2015\u2212]/g, "-")
    .replace(/&/g, " and ")
    .replace(/[/\\]/g, " ")
    .replace(/[^\p{L}\p{N}\s@.,%-]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function tokenizeSearchQuery(query) {
  const normalized = normalizeSearchText(query);
  if (!normalized) {
    return [];
  }
  return normalized
    .split(" ")
    .map((token) => token.trim())
    .filter(
      (token) =>
        token.length >= 2 ||
        /^\d/.test(token) ||
        token.includes("@") ||
        token.includes("."),
    );
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
    searchText: joinSearchParts([page.title, page.description]),
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
      hero.imageAlt,
      servicesSection.title,
      servicesSection.lead,
      about.eyebrow,
      about.titlePrefix,
      about.titleAccent,
      ...about.paragraphs,
      about.ctaLabel,
      about.imageAlt,
      contactCta.title,
      contactCta.lead,
      contactCta.ctaLabel,
      ...services.map((service) => [service.title, service.imageAlt].join(" ")),
    ]),
  });

  for (const item of navigation) {
    pushRecord(records, seen, {
      title: item.label,
      href: item.href,
      category: "Navigation",
      searchText: item.label,
    });
  }

  for (const link of footer.information.links) {
    pushRecord(records, seen, {
      title: link.label,
      href: link.href,
      category: "Footer",
      searchText: link.label,
    });
  }

  for (const link of footer.legalLinks) {
    if (link.href === "#") {
      continue;
    }
    pushRecord(records, seen, {
      title: link.label,
      href: link.href,
      category: "Legal",
      searchText: link.label,
    });
  }

  pushRecord(records, seen, {
    title: contactPage.title,
    href: "/contact",
    anchor: "contact",
    category: "Contact",
    searchText: joinSearchParts([
      contactPage.title,
      contactCta.title,
      contactCta.lead,
      ...contactPage.cards.map(
        (card) => `${card.title} ${card.description} ${card.imageAlt ?? ""}`,
      ),
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
      searchText: joinSearchParts([
        card.title,
        card.description,
        card.imageAlt,
      ]),
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
      aboutPage.intro.imageAlt,
      aboutPage.mission.heading,
      ...aboutPage.mission.points,
      aboutPage.vision.heading,
      aboutPage.vision.body,
      aboutPage.values.heading,
      ...aboutPage.values.items.flatMap((item) => [
        item.title,
        item.description,
        item.imageAlt,
      ]),
      aboutPage.coreValues.heading,
      ...aboutPage.coreValues.paragraphs,
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
    title: aboutPage.coreValues.heading,
    href: "/about",
    anchor: "core-values",
    category: "About",
    searchText: joinSearchParts([
      aboutPage.coreValues.heading,
      ...aboutPage.coreValues.paragraphs,
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
      searchText: joinSearchParts([
        practiceLabel,
        practice.heading,
        practice.lead,
        practice.imageAlt,
      ]),
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
          searchText: joinSearchParts([practiceLabel, practice.lead, ...itemParts]),
        });
      } else {
        pushRecord(records, seen, {
          title: item.title,
          href: "/services",
          anchor: practice.id,
          category: `${practiceLabel} · Services`,
          searchText: joinSearchParts([practiceLabel, ...itemParts]),
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
      searchText: joinSearchParts([
        member.name,
        member.role,
        member.bio,
        member.imageAlt,
      ]),
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
      article.imageAlt,
      ...(article.intro ?? []),
    ];

    if (article.format === "docxHtml") {
      articleParts.push(cfdDocxPlainText);
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
            cfdSection.searchText,
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

function makeSnippet(text, query) {
  if (!text) {
    return "";
  }
  const tokens = getSearchTokensForQuery(query);
  const lower = text.toLowerCase();
  let index = -1;
  for (const token of tokens) {
    const found = lower.indexOf(token);
    if (found >= 0) {
      index = found;
      break;
    }
  }
  if (index < 0) {
    index = 0;
  }
  const start = Math.max(0, index - 48);
  const end = Math.min(text.length, start + 150);
  const slice = text.slice(start, end).replace(/\s+/g, " ").trim();
  const prefix = start > 0 ? "…" : "";
  const suffix = end < text.length ? "…" : "";
  return `${prefix}${slice}${suffix}`;
}

function scoreRecord(record, query, { relaxed = false } = {}) {
  const tokens = getSearchTokensForQuery(query);
  if (!tokens.length) {
    return null;
  }

  const normalizedQuery = normalizeSearchText(expandQueryWithSynonyms(query));
  const title = normalizeSearchText(record.title);
  const category = normalizeSearchText(record.category);
  const body = normalizeSearchText(record.searchText);
  const haystack = `${title} ${category} ${body}`;

  const matchedTokens = tokens.filter((token) => haystack.includes(token));
  const allTokensMatch = matchedTokens.length === tokens.length;
  const anyTokenMatch = matchedTokens.length > 0;

  if (!allTokensMatch && !(relaxed && anyTokenMatch)) {
    return null;
  }

  let score = 0;
  if (title === normalizedQuery) {
    score += 1000;
  } else if (title.includes(normalizedQuery)) {
    score += 700;
  } else if (tokens.every((token) => title.includes(token))) {
    score += 500;
  } else if (tokens.every((token) => category.includes(token))) {
    score += 320;
  } else if (tokens.every((token) => body.includes(token))) {
    score += 120;
  } else if (relaxed) {
    score += matchedTokens.length * 25;
  }

  if (category.includes(normalizedQuery)) {
    score += 250;
  }

  if (body.includes(normalizedQuery) && !title.includes(normalizedQuery)) {
    score += 80;
  }

  score += tokens.filter((token) => title.includes(token)).length * 40;
  score += tokens.filter((token) => category.includes(token)).length * 18;
  score += tokens.filter((token) => body.includes(token)).length * 8;

  const group = getRecordGroup(record);

  return {
    ...record,
    group,
    groupLabel: RESULT_GROUP_LABELS[group] ?? "Page",
    score,
    snippet: makeSnippet(record.searchText || record.title, query),
  };
}

function rankSearchResults(query, { relaxed = false, limit = 25 } = {}) {
  const ranked = getSiteSearchIndex()
    .map((record) => scoreRecord(record, query, { relaxed }))
    .filter(Boolean)
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));

  const seenKeys = new Set();
  const items = [];
  for (const item of ranked) {
    const key = `${item.href}|${item.title}`;
    if (seenKeys.has(key)) {
      continue;
    }
    seenKeys.add(key);
    items.push(item);
    if (items.length >= limit) {
      break;
    }
  }

  return { items, totalCount: ranked.length };
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

  for (const record of getSiteSearchIndex()) {
    const title = normalizeSearchText(record.title);
    if (title.includes(normalized) || title.startsWith(normalized)) {
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

export function getRelatedServiceResults(limit = 3) {
  const seen = new Set();
  const items = [];

  for (const record of getSiteSearchIndex()) {
    if (getRecordGroup(record) !== "services") {
      continue;
    }
    const key = `${record.href}|${record.title}`;
    if (seen.has(key)) {
      continue;
    }
    seen.add(key);
    items.push({
      ...record,
      group: "services",
      groupLabel: RESULT_GROUP_LABELS.services,
      snippet: "",
    });
    if (items.length >= limit) {
      break;
    }
  }

  return items;
}

export function getClosestSearchResults(query, limit = 3) {
  const { items } = rankSearchResults(query, { relaxed: true, limit });
  return items;
}

export function searchSite(query) {
  const trimmed = query.trim();
  if (!trimmed) {
    return { type: "hint" };
  }

  const { items, totalCount } = rankSearchResults(trimmed);
  return { type: "results", items, totalCount };
}

export function filterSearchResultsByGroup(items, groupId) {
  if (groupId === "all") {
    return items;
  }
  return items.filter((item) => item.group === groupId);
}
