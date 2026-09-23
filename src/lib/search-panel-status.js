import { searchFilterGroups } from "@/lib/site-data";

export const SEARCH_DEBOUNCE_MS = 135;

export function shouldClearQueryOnEscape(trimmedQuery) {
  return trimmedQuery.trim().length > 0;
}

export function buildSearchPanelStatus({
  searchResult,
  trimmedQuery,
  trimmedDebouncedQuery,
  resultGroupFilter,
  visibleCount,
  loadedResultCount,
  totalCount,
  hasMoreResults,
  showFullEmpty,
  showFilteredEmpty,
}) {
  if (trimmedDebouncedQuery.length < 2 && trimmedQuery.length > 0) {
    return { message: "Keep typing to search.", showCountLine: false };
  }

  if (searchResult.type === "hint") {
    return { message: "Enter a search term.", showCountLine: false };
  }

  if (showFullEmpty) {
    return {
      message: `No matches for “${trimmedDebouncedQuery}”.`,
      showCountLine: false,
    };
  }

  if (showFilteredEmpty) {
    const label =
      searchFilterGroups.find((group) => group.id === resultGroupFilter)?.label ??
      "";
    return {
      message: `No ${label} results in the loaded set.`,
      showCountLine: false,
    };
  }

  if (searchResult.vagueQuery && loadedResultCount > 0) {
    return {
      message: `Showing ${loadedResultCount} preview result${loadedResultCount === 1 ? "" : "s"}. Try a more specific term like a service or team member name.`,
      showCountLine: true,
    };
  }

  if (resultGroupFilter !== "all") {
    return {
      message: `${visibleCount} result${visibleCount === 1 ? "" : "s"} in this filter`,
      showCountLine: true,
    };
  }

  if (hasMoreResults) {
    return {
      message: `Showing ${loadedResultCount} of ${totalCount} results`,
      showCountLine: true,
    };
  }

  const showCountLine =
    loadedResultCount > 0 && trimmedDebouncedQuery.length >= 2;
  return {
    message: `${totalCount} result${totalCount === 1 ? "" : "s"} found`,
    showCountLine,
  };
}
