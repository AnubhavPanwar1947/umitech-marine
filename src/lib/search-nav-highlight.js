import { buildHighlightRegExp } from "@/lib/search-highlight";
import {
  expandQueryWithSynonyms,
  normalizeSearchText,
  tokenizeSearchQuery,
} from "@/lib/site-search";

const STORAGE_KEY = "umitech-search-nav-highlight";
const MARK_CLASS = "search-destination-highlight";
export const SEARCH_NAV_EVENT = "umitech:search-nav";

const EXCLUDED_SELECTOR =
  "header, footer, script, style, noscript, [role='search'], [data-search-highlight-ignore]";

export function normalizePathname(pathname) {
  const path = String(pathname ?? "/");
  if (path.length > 1 && path.endsWith("/")) {
    return path.slice(0, -1);
  }
  return path || "/";
}

export function parseSearchResultHref(href) {
  const raw = String(href ?? "");
  const url = new URL(raw, "https://www.umitech.co.jp");
  return {
    pathname: normalizePathname(url.pathname),
    hash: url.hash ? decodeURIComponent(url.hash.slice(1)) : "",
  };
}

export function setSearchNavHighlight(query, href) {
  if (typeof window === "undefined" || typeof sessionStorage === "undefined") {
    return;
  }

  const trimmed = String(query ?? "").trim();
  if (!trimmed) {
    return;
  }

  const { pathname, hash } = parseSearchResultHref(href);

  try {
    sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        query: trimmed,
        pathname,
        hash,
        token: Date.now(),
      }),
    );
    window.dispatchEvent(new Event(SEARCH_NAV_EVENT));
  } catch {
    // Ignore quota / privacy errors.
  }
}

export function readSearchNavHighlight() {
  if (typeof window === "undefined" || typeof sessionStorage === "undefined") {
    return null;
  }

  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed.query !== "string") {
      return null;
    }
    return {
      query: parsed.query,
      pathname: normalizePathname(parsed.pathname),
      hash: String(parsed.hash ?? ""),
      token: parsed.token ?? 0,
    };
  } catch {
    return null;
  }
}

export function clearSearchNavHighlight() {
  if (typeof window === "undefined" || typeof sessionStorage === "undefined") {
    return;
  }
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore.
  }
}

export function locationMatchesPending(pending) {
  if (!pending) {
    return false;
  }

  const currentPath = normalizePathname(window.location.pathname);
  if (pending.pathname !== currentPath) {
    return false;
  }

  const currentHash = decodeURIComponent(window.location.hash.slice(1));
  if (pending.hash === currentHash) {
    return true;
  }

  if (pending.hash && document.getElementById(pending.hash)) {
    return true;
  }

  return !pending.hash;
}

function shouldSkipTextNode(textNode) {
  const value = textNode.nodeValue ?? "";
  if (!normalizeSearchText(value)) {
    return true;
  }

  let parent = textNode.parentElement;
  while (parent) {
    if (parent.closest(EXCLUDED_SELECTOR)) {
      return true;
    }
    if (parent.tagName === "MARK" && parent.classList.contains(MARK_CLASS)) {
      return true;
    }
    parent = parent.parentElement;
  }

  return false;
}

function collectTextNodesUnder(root) {
  const nodes = [];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      return shouldSkipTextNode(node)
        ? NodeFilter.FILTER_REJECT
        : NodeFilter.FILTER_ACCEPT;
    },
  });

  while (walker.nextNode()) {
    nodes.push(walker.currentNode);
  }

  return nodes;
}

function isTextNodeInOpenRange(textNode, startEl, endEl) {
  if (startEl.contains(textNode)) {
    return true;
  }

  const afterStart =
    startEl.compareDocumentPosition(textNode) &
    Node.DOCUMENT_POSITION_FOLLOWING;
  if (!afterStart) {
    return false;
  }

  if (!endEl) {
    return true;
  }

  if (endEl.contains(textNode)) {
    return false;
  }

  const beforeEnd =
    textNode.compareDocumentPosition(endEl) & Node.DOCUMENT_POSITION_FOLLOWING;
  return Boolean(beforeEnd);
}

function collectTextNodesInRange(startEl, endEl) {
  const main = document.querySelector("main") || document.body;
  const nodes = collectTextNodesUnder(main);
  return nodes.filter((node) => isTextNodeInOpenRange(node, startEl, endEl));
}

export function clearDestinationHighlights() {
  if (typeof document === "undefined") {
    return;
  }

  const marks = document.querySelectorAll(`mark.${MARK_CLASS}`);
  for (const mark of marks) {
    const text = mark.textContent ?? "";
    mark.replaceWith(document.createTextNode(text));
  }

  document.querySelectorAll("main")?.[0]?.normalize?.();
}

function highlightTextNode(textNode, regex) {
  const text = textNode.nodeValue ?? "";
  regex.lastIndex = 0;

  if (!regex.test(text)) {
    return false;
  }

  regex.lastIndex = 0;
  const fragment = document.createDocumentFragment();
  let lastIndex = 0;
  let match = regex.exec(text);

  while (match) {
    if (match.index > lastIndex) {
      fragment.appendChild(
        document.createTextNode(text.slice(lastIndex, match.index)),
      );
    }
    const mark = document.createElement("mark");
    mark.className = MARK_CLASS;
    mark.textContent = match[0];
    fragment.appendChild(mark);
    lastIndex = regex.lastIndex;
    match = regex.exec(text);
  }

  if (lastIndex < text.length) {
    fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
  }

  textNode.parentNode?.replaceChild(fragment, textNode);
  return true;
}

function getHighlightRegExpForQuery(query) {
  const primary = buildHighlightRegExp(query);
  if (primary) {
    return primary;
  }

  const fallbackTokens = tokenizeSearchQuery(expandQueryWithSynonyms(query));
  if (!fallbackTokens.length) {
    return null;
  }

  const pattern = fallbackTokens
    .map((token) => token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .sort((a, b) => b.length - a.length)
    .join("|");

  return new RegExp(`(${pattern})`, "gi");
}

export function resolveHighlightScope(hashId) {
  const main = document.querySelector("main");
  const id = String(hashId ?? "");

  if (!id) {
    return main ? { type: "element", root: main } : null;
  }

  const target = document.getElementById(id);
  if (!target) {
    return main ? { type: "element", root: main } : null;
  }

  const scoped = target.closest("[data-search-highlight-scope]");
  if (scoped) {
    return { type: "element", root: scoped };
  }

  if (id.startsWith("cfd-section-")) {
    const markers = [...document.querySelectorAll('[id^="cfd-section-"]')];
    const index = markers.findIndex((marker) => marker.id === id);
    const end =
      index >= 0 && index < markers.length - 1 ? markers[index + 1] : null;
    return { type: "range", start: target, end };
  }

  if (id === "service-topic-title") {
    return {
      type: "element",
      root: target.closest("section") || target.parentElement || target,
    };
  }

  if (
    target.classList.contains("clause") ||
    id.startsWith("team-member-") ||
    id.startsWith("contact-card-") ||
    id === "contact-form" ||
    id === "contact"
  ) {
    return { type: "element", root: target };
  }

  if (["mission", "vision", "values", "core-values"].includes(id)) {
    return { type: "element", root: target };
  }

  if (target.tagName === "H2") {
    const section = target.closest("section");
    if (section) {
      return { type: "element", root: section };
    }
  }

  if (target.tagName === "SECTION") {
    return { type: "element", root: target };
  }

  return {
    type: "element",
    root: target.closest("section, article") || target,
  };
}

export function applyDestinationHighlights(scope, query) {
  const regex = getHighlightRegExpForQuery(query);
  if (!regex || !scope) {
    return 0;
  }

  let textNodes = [];
  if (scope.type === "range") {
    textNodes = collectTextNodesInRange(scope.start, scope.end);
  } else if (scope.root) {
    textNodes = collectTextNodesUnder(scope.root);
  }

  let count = 0;
  for (const node of textNodes) {
    if (highlightTextNode(node, regex)) {
      count += 1;
    }
  }

  return count;
}

export function getStickyHeaderOffset() {
  const header = document.querySelector("header");
  const headerHeight = header?.getBoundingClientRect().height;
  if (Number.isFinite(headerHeight) && headerHeight > 0) {
    return headerHeight + 12;
  }

  const headerVar = getComputedStyle(document.documentElement).getPropertyValue(
    "--header-height",
  );
  const parsed = Number.parseFloat(headerVar);
  const usesRem = /rem$/i.test(headerVar.trim());
  const rootSize = Number.parseFloat(
    getComputedStyle(document.documentElement).fontSize,
  );
  if (Number.isFinite(parsed) && parsed > 0) {
    const pixels = usesRem && Number.isFinite(rootSize) ? parsed * rootSize : parsed;
    return pixels + 12;
  }

  return 88;
}

export function scrollElementBelowHeader(element) {
  if (!element) {
    return false;
  }

  const offset = getStickyHeaderOffset();
  const top = element.getBoundingClientRect().top + window.scrollY - offset;

  window.scrollTo({
    top: Math.max(0, top),
    behavior: "auto",
  });

  return true;
}

export function scrollFirstDestinationHighlightIntoView() {
  const first = document.querySelector(`mark.${MARK_CLASS}`);
  if (!first) {
    return false;
  }

  return scrollElementBelowHeader(first);
}

export function isPendingSearchLanding() {
  const pending = readSearchNavHighlight();
  return locationMatchesPending(pending);
}

export const SEARCH_DESTINATION_MARK_CLASS = MARK_CLASS;
