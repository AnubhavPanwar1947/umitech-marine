import {
  about,
  aboutPage,
  blogPage,
  brand,
  contactCta,
  contactPage,
  cookiesPolicyPage,
  footer,
  hero,
  navigation,
  privacyPolicyPage,
  services,
  servicesPage,
  servicesSection,
  standardTermsPage,
  teamPage,
  termsPage,
} from "@/lib/site-data";
import { cfdDocxPlainText } from "@/lib/cfd-docx-plaintext";

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
    ];

    for (const definition of section.definitions ?? []) {
      sectionParts.push(definition.term, definition.text);
    }

    for (const clause of section.clauses ?? []) {
      sectionParts.push(clause.id, clause.text, ...(clause.subItems ?? []));
    }

    pushRecord(records, seen, {
      title: sectionTitle,
      href,
      category: `${categoryPrefix} · ${page.title}`,
      searchText: joinSearchParts(sectionParts),
    });
  }
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
      anchor: "team-members",
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

    for (const section of article.sections ?? []) {
      pushRecord(records, seen, {
        title: section.heading,
        href: `/blog/${article.slug}/`,
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
  const tokens = tokenizeSearchQuery(query);
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

function scoreRecord(record, query) {
  const tokens = tokenizeSearchQuery(query);
  if (!tokens.length) {
    return null;
  }

  const normalizedQuery = normalizeSearchText(query);
  const title = normalizeSearchText(record.title);
  const category = normalizeSearchText(record.category);
  const body = normalizeSearchText(record.searchText);
  const haystack = `${title} ${category} ${body}`;

  const allTokensMatch = tokens.every((token) => haystack.includes(token));
  if (!allTokensMatch) {
    return null;
  }

  let score = 0;
  if (title === normalizedQuery) {
    score += 1000;
  } else if (title.includes(normalizedQuery)) {
    score += 700;
  } else if (tokens.every((token) => title.includes(token))) {
    score += 500;
  }

  if (category.includes(normalizedQuery)) {
    score += 250;
  }

  if (body.includes(normalizedQuery)) {
    score += 200;
  }

  score += tokens.filter((token) => title.includes(token)).length * 40;
  score += tokens.filter((token) => body.includes(token)).length * 10;

  return {
    ...record,
    score,
    snippet: makeSnippet(record.searchText || record.title, query),
  };
}

export function searchSite(query) {
  const trimmed = query.trim();
  if (!trimmed) {
    return { type: "hint" };
  }

  const ranked = getSiteSearchIndex()
    .map((record) => scoreRecord(record, trimmed))
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
    if (items.length >= 25) {
      break;
    }
  }

  return { type: "results", items };
}
