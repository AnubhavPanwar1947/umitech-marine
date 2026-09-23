import { shouldClearQueryOnEscape } from "@/lib/search-panel-status";
import {
  filterSearchResultsByGroup,
  searchSite,
} from "@/lib/site-search";

export const SEARCH_PANEL_FOCUSABLE_SELECTOR =
  'button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function normalizeSearchPanelQuery(query) {
  return String(query ?? "").trim();
}

export function shouldFlushDebouncedQuery(rawQuery, debouncedQuery) {
  return (
    normalizeSearchPanelQuery(rawQuery) !==
    normalizeSearchPanelQuery(debouncedQuery)
  );
}

export function buildSearchInputDescribedBy({ escapeHintId, hasQuery }) {
  return hasQuery ? escapeHintId : undefined;
}

export function resolveSearchPanelEscapeAction(query) {
  if (shouldClearQueryOnEscape(normalizeSearchPanelQuery(query))) {
    return "clear-query";
  }
  return "close-panel";
}

export function shouldPreventTabTrapWrap({
  focusInsidePanel,
  shiftKey,
  activeIsFirst,
  activeIsLast,
}) {
  if (!focusInsidePanel) {
    return true;
  }
  if (shiftKey && activeIsFirst) {
    return true;
  }
  if (!shiftKey && activeIsLast) {
    return true;
  }
  return false;
}

export function isFocusablePanelElement(element) {
  if (!element || typeof element.getClientRects !== "function") {
    return false;
  }
  if (
    typeof element.hasAttribute === "function" &&
    element.hasAttribute("disabled")
  ) {
    return false;
  }
  return element.getClientRects().length > 0;
}

export function isFilterChipDisabled(groupId, filterCounts) {
  if (groupId === "all") {
    return false;
  }
  return (filterCounts[groupId] ?? 0) === 0;
}

/**
 * Resolves the first result link for Enter when no list item is keyboard-selected.
 * Always uses the current raw (in-input) query so fast type+Enter never uses a stale debounce.
 */
export function getEnterFirstResultForQuery(
  trimmedRawQuery,
  resultGroupFilter,
  resultsLimit,
) {
  if (trimmedRawQuery.length < 2) {
    return null;
  }

  const searchResult = searchSite(trimmedRawQuery, { limit: resultsLimit });
  if (searchResult.type !== "results" || searchResult.items.length === 0) {
    return null;
  }

  const filtered = filterSearchResultsByGroup(
    searchResult.items,
    resultGroupFilter,
  );
  return filtered[0] ?? null;
}
