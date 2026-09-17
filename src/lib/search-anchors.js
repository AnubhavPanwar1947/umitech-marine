export function slugifyAnchor(value) {
  return String(value ?? "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-");
}

export const LEGAL_PAGE_PREFIX = {
  "/standard-terms-conditions": "standard-terms",
  "/terms-conditions": "terms",
  "/cookies-policy": "cookies-policy",
  "/privacy-policy": "privacy-policy",
};

export function legalSectionAnchor(pagePrefix, sectionNumber) {
  return `${pagePrefix}-section-${sectionNumber}`;
}

export function legalClauseAnchor(pagePrefix, clauseId) {
  const normalized = String(clauseId ?? "")
    .trim()
    .replace(/\./g, "-");
  return `${pagePrefix}-clause-${normalized}`;
}

export function blogSectionAnchor(heading) {
  return `section-${slugifyAnchor(heading)}`;
}

export function teamMemberAnchor(name) {
  const base = String(name ?? "")
    .replace(/^Capt\.\s*/i, "")
    .trim();
  return `team-member-${slugifyAnchor(base)}`;
}

export function contactCardAnchor(title) {
  return `contact-card-${slugifyAnchor(title)}`;
}

export function serviceTopicAnchor() {
  return "service-topic-title";
}
