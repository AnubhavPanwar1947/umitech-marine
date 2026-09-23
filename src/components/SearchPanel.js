"use client";

import {
  forwardRef,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { splitTextByHighlights } from "@/lib/search-highlight";
import { setSearchNavHighlight } from "@/lib/search-nav-highlight";
import {
  buildSearchInputDescribedBy,
  getEnterFirstResultForQuery,
  isFilterChipDisabled,
  isFocusablePanelElement,
  normalizeSearchPanelQuery,
  resolveSearchPanelEscapeAction,
  SEARCH_PANEL_FOCUSABLE_SELECTOR,
  shouldFlushDebouncedQuery,
  shouldPreventTabTrapWrap,
} from "@/lib/search-panel-actions";
import {
  addRecentSearch,
  clearRecentSearches,
  dedupeRecentSearchEntries,
  readRecentSearches,
} from "@/lib/search-recent";
import {
  buildSearchPanelStatus,
  SEARCH_DEBOUNCE_MS,
} from "@/lib/search-panel-status";
import { searchFilterGroups, searchPopular } from "@/lib/site-data";
import {
  countSearchResultsByFilterGroup,
  DEFAULT_SEARCH_RESULTS_LIMIT,
  filterSearchResultsByGroup,
  getAlternativeSearchSuggestions,
  getAutocompleteSuggestions,
  getClosestSearchResults,
  getRelatedServiceResults,
  searchSite,
} from "@/lib/site-search";
import styles from "./SearchPanel.module.css";

function SearchGlyph() {
  return (
    <svg
      className={styles.inputIcon}
      width="12"
      height="12"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="8.75" cy="8.75" r="5.25" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M13 13L17.25 17.25"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function GroupIcon({ group }) {
  const common = {
    width: 11,
    height: 11,
    viewBox: "0 0 20 20",
    fill: "none",
    "aria-hidden": true,
    className: styles.resultTypeIcon,
  };

  switch (group) {
    case "services":
      return (
        <svg {...common}>
          <path
            d="M4 14L10 4L16 14H4Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "articles":
      return (
        <svg {...common}>
          <rect
            x="4"
            y="3"
            width="12"
            height="14"
            rx="1.5"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path d="M7 8H13M7 11H13" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case "team":
      return (
        <svg {...common}>
          <circle cx="10" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M4 17C4 13.5 6.5 12 10 12C13.5 12 16 13.5 16 17"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );
    case "legal":
      return (
        <svg {...common}>
          <path
            d="M10 3L4 6V9C4 13 6.5 15.5 10 17C13.5 15.5 16 13 16 9V6L10 3Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
          <path d="M10 6V10L12.5 12.5" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
  }
}

function HighlightedText({ text, query, className }) {
  const parts = useMemo(() => splitTextByHighlights(text, query), [text, query]);

  return (
    <span className={className}>
      {parts.map((part, index) =>
        part.highlight ? (
          <mark key={`${part.text}-${index}`} className={styles.highlight}>
            {part.text}
          </mark>
        ) : (
          <span key={`${part.text}-${index}`}>{part.text}</span>
        ),
      )}
    </span>
  );
}

export const SearchPanel = forwardRef(function SearchPanel(
  { id, open, panelStyle, onClose, onNavigate },
  ref,
) {
  const router = useRouter();
  const inputId = useId();
  const statusId = useId();
  const escapeHintId = useId();
  const inputRef = useRef(null);
  const debounceTimeoutRef = useRef(null);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const [recentSearches, setRecentSearches] = useState([]);
  const [resultsLimit, setResultsLimit] = useState(DEFAULT_SEARCH_RESULTS_LIMIT);
  const [resultGroupFilter, setResultGroupFilter] = useState("all");

  useEffect(() => {
    if (!open) {
      return;
    }

    const frame = requestAnimationFrame(() => {
      setQuery("");
      setDebouncedQuery("");
      setActiveIndex(-1);
      setResultsLimit(DEFAULT_SEARCH_RESULTS_LIMIT);
      setResultGroupFilter("all");
      setRecentSearches(dedupeRecentSearchEntries(readRecentSearches()));
      inputRef.current?.focus();
    });

    return () => cancelAnimationFrame(frame);
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }
    debounceTimeoutRef.current = window.setTimeout(() => {
      setResultsLimit(DEFAULT_SEARCH_RESULTS_LIMIT);
      setDebouncedQuery(query);
      debounceTimeoutRef.current = null;
    }, SEARCH_DEBOUNCE_MS);
    return () => {
      if (debounceTimeoutRef.current) {
        window.clearTimeout(debounceTimeoutRef.current);
        debounceTimeoutRef.current = null;
      }
    };
  }, [query, open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleEscapeCapture = (event) => {
      if (event.key !== "Escape") {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      const escapeAction = resolveSearchPanelEscapeAction(query);
      if (escapeAction === "clear-query") {
        setQuery("");
        requestAnimationFrame(() => {
          inputRef.current?.focus();
        });
        return;
      }
      onClose();
    };

    document.addEventListener("keydown", handleEscapeCapture, true);
    return () => {
      document.removeEventListener("keydown", handleEscapeCapture, true);
    };
  }, [onClose, open, query]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const panel = typeof ref === "object" && ref ? ref.current : null;
    if (!(panel instanceof HTMLElement)) {
      return;
    }

    const getFocusableElements = () =>
      [...panel.querySelectorAll(SEARCH_PANEL_FOCUSABLE_SELECTOR)].filter(
        isFocusablePanelElement,
      );

    const handleTabTrap = (event) => {
      if (event.key !== "Tab") {
        return;
      }
      const focusable = getFocusableElements();
      if (!focusable.length) {
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      if (
        shouldPreventTabTrapWrap({
          focusInsidePanel: panel.contains(active),
          shiftKey: event.shiftKey,
          activeIsFirst: active === first,
          activeIsLast: active === last,
        })
      ) {
        event.preventDefault();
        if (!panel.contains(active)) {
          first.focus();
          return;
        }
        if (event.shiftKey) {
          last.focus();
        } else {
          first.focus();
        }
      }
    };

    panel.addEventListener("keydown", handleTabTrap);
    return () => {
      panel.removeEventListener("keydown", handleTabTrap);
    };
  }, [open, ref, query, debouncedQuery, resultGroupFilter, resultsLimit]);

  const searchResult = useMemo(
    () => searchSite(debouncedQuery, { limit: resultsLimit }),
    [debouncedQuery, resultsLimit],
  );
  const autocomplete = useMemo(
    () => getAutocompleteSuggestions(debouncedQuery),
    [debouncedQuery],
  );

  const allResultItems = useMemo(() => {
    if (searchResult.type !== "results") {
      return [];
    }
    return searchResult.items;
  }, [searchResult]);

  const filteredItems = useMemo(
    () => filterSearchResultsByGroup(allResultItems, resultGroupFilter),
    [allResultItems, resultGroupFilter],
  );

  const filterCounts = useMemo(
    () => countSearchResultsByFilterGroup(allResultItems),
    [allResultItems],
  );

  const closestResults = useMemo(() => {
    if (searchResult.type !== "results" || searchResult.items.length > 0) {
      return [];
    }
    return getClosestSearchResults(debouncedQuery, 3);
  }, [searchResult, debouncedQuery]);

  const relatedServices = useMemo(() => {
    if (searchResult.type !== "results" || searchResult.items.length > 0) {
      return [];
    }
    return getRelatedServiceResults(debouncedQuery, 3);
  }, [searchResult, debouncedQuery]);

  const alternativeSuggestions = useMemo(() => {
    if (searchResult.type !== "results" || searchResult.items.length > 0) {
      return [];
    }
    return getAlternativeSearchSuggestions(debouncedQuery);
  }, [searchResult, debouncedQuery]);

  const emptySuggestedChips = useMemo(() => {
    if (closestResults.length > 0 || relatedServices.length > 0) {
      return [];
    }
    return alternativeSuggestions;
  }, [alternativeSuggestions, closestResults.length, relatedServices.length]);

  const emptyStateNavResults = useMemo(() => {
    const seen = new Set();

    return [...closestResults, ...relatedServices].filter((item) => {
      const key = `${item.href}\u0000${item.title}`;
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  }, [closestResults, relatedServices]);

  const trimmedDebouncedQuery = normalizeSearchPanelQuery(debouncedQuery);
  const isEmptyResultsState =
    searchResult.type === "results" &&
    trimmedDebouncedQuery.length >= 2 &&
    searchResult.items.length === 0;

  const hasEmptyStateListbox =
    isEmptyResultsState && emptyStateNavResults.length > 0;

  const navigableItems = useMemo(() => {
    const items = [];
    for (const suggestion of autocomplete) {
      items.push({ kind: "suggestion", suggestion });
    }
    for (const item of filteredItems) {
      items.push({ kind: "result", item });
    }
    if (isEmptyResultsState) {
      for (const item of emptyStateNavResults) {
        items.push({ kind: "result", item });
      }
    }
    return items;
  }, [
    autocomplete,
    filteredItems,
    emptyStateNavResults,
    isEmptyResultsState,
  ]);

  if (!open) {
    return null;
  }

  const trimmedQuery = normalizeSearchPanelQuery(query);
  const hasQuery = trimmedQuery.length > 0;
  const showAutocomplete =
    trimmedDebouncedQuery.length >= 2 && autocomplete.length > 0;
  const totalCount =
    searchResult.type === "results" ? searchResult.totalCount : 0;
  const visibleCount = filteredItems.length;
  const hasMoreResults =
    searchResult.type === "results" &&
    Boolean(searchResult.hasMore) &&
    !searchResult.vagueQuery;
  const hasAnyResults =
    searchResult.type === "results" && allResultItems.length > 0;
  const showFullEmpty = isEmptyResultsState;
  const showFilteredEmpty =
    searchResult.type === "results" &&
    trimmedDebouncedQuery.length >= 2 &&
    hasAnyResults &&
    resultGroupFilter !== "all" &&
    filteredItems.length === 0;
  const showResultFilters =
    trimmedDebouncedQuery.length >= 2 && hasAnyResults;

  const { message: statusMessage, showCountLine } = buildSearchPanelStatus({
    searchResult,
    trimmedQuery,
    trimmedDebouncedQuery,
    resultGroupFilter,
    visibleCount,
    loadedResultCount: allResultItems.length,
    totalCount,
    hasMoreResults,
    showFullEmpty,
    showFilteredEmpty,
  });

  const navigateToSearchResult = (href, searchTerm) => {
    const term = String(searchTerm ?? trimmedQuery).trim();
    if (term) {
      setSearchNavHighlight(term, href);
      addRecentSearch(term);
    }
    onNavigate();
    onClose();
  };

  const handleResultClick = (searchTerm, href) => {
    if (href && searchTerm?.trim()) {
      setSearchNavHighlight(searchTerm.trim(), href);
    }
    if (searchTerm) {
      addRecentSearch(searchTerm);
    }
    onNavigate();
    onClose();
  };

  const flushDebouncedQuery = () => {
    if (debounceTimeoutRef.current) {
      window.clearTimeout(debounceTimeoutRef.current);
      debounceTimeoutRef.current = null;
    }
    setResultsLimit(DEFAULT_SEARCH_RESULTS_LIMIT);
    setDebouncedQuery(query);
  };

  const handleClearQuery = () => {
    setQuery("");
    setActiveIndex(-1);
    inputRef.current?.focus();
  };

  const handleClearRecentSearches = () => {
    clearRecentSearches();
    setRecentSearches([]);
  };

  const handleInputBlur = () => {
    if (shouldFlushDebouncedQuery(query, debouncedQuery)) {
      flushDebouncedQuery();
    }
  };

  const syncDebouncedQueryIfNeeded = () => {
    if (!shouldFlushDebouncedQuery(query, debouncedQuery)) {
      return;
    }
    flushDebouncedQuery();
  };

  const handleResultGroupFilterChange = (groupId) => {
    setResultGroupFilter(groupId);
    setActiveIndex(-1);
  };

  const updateQuery = (nextQuery) => {
    setQuery(nextQuery);
    setActiveIndex(-1);
  };

  const activateNavigableItem = (index) => {
    const entry = navigableItems[index];
    if (!entry) {
      return;
    }

    if (entry.kind === "suggestion") {
      updateQuery(entry.suggestion);
      return;
    }

    navigateToSearchResult(entry.item.href, trimmedQuery);
    router.push(entry.item.href);
  };

  const handleInputKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (!navigableItems.length) {
        return;
      }
      setActiveIndex((current) =>
        current < navigableItems.length - 1 ? current + 1 : 0,
      );
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (!navigableItems.length) {
        return;
      }
      setActiveIndex((current) =>
        current > 0 ? current - 1 : navigableItems.length - 1,
      );
      return;
    }

    if (event.key === "Enter") {
      syncDebouncedQueryIfNeeded();

      if (activeIndex >= 0) {
        event.preventDefault();
        activateNavigableItem(activeIndex);
        return;
      }

      const firstResult = getEnterFirstResultForQuery(
        trimmedQuery,
        resultGroupFilter,
        resultsLimit,
      );
      if (firstResult) {
        event.preventDefault();
        navigateToSearchResult(firstResult.href, trimmedQuery);
        router.push(firstResult.href);
      }
    }
  };

  const inputDescribedBy = buildSearchInputDescribedBy({
    escapeHintId,
    hasQuery,
  });

  return (
    <div
      id={id}
      ref={ref}
      className={styles.panel}
      style={panelStyle}
      role="search"
    >
      <div className={styles.panelHeader}>
        <p className={styles.panelTitle} id={statusId}>
          Site search
        </p>
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close search"
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>

      <label htmlFor={inputId} className="sr-only">
        Search services, team members, articles, and more
      </label>
      <div className={styles.inputWrap}>
        <SearchGlyph />
        <input
          ref={inputRef}
          id={inputId}
          type="search"
          className={styles.input}
          value={query}
          onChange={(event) => updateQuery(event.target.value)}
          onBlur={handleInputBlur}
          onKeyDown={handleInputKeyDown}
          placeholder="Search services, team members, articles…"
          autoComplete="off"
          enterKeyHint="search"
          role="combobox"
          aria-expanded={
            showAutocomplete || filteredItems.length > 0 || hasEmptyStateListbox
          }
          aria-controls={
            filteredItems.length > 0 || hasEmptyStateListbox
              ? `${id}-listbox`
              : undefined
          }
          aria-autocomplete="list"
          aria-activedescendant={
            activeIndex >= 0 ? `${id}-option-${activeIndex}` : undefined
          }
          aria-describedby={inputDescribedBy}
        />
        {hasQuery ? (
          <button
            type="button"
            className={styles.clearButton}
            onClick={handleClearQuery}
            aria-label="Clear search"
          >
            <span aria-hidden="true">×</span>
          </button>
        ) : null}
      </div>

      {hasQuery ? (
        <p id={escapeHintId} className={styles.escapeHint}>
          Esc to clear · Esc again to close
        </p>
      ) : null}

      {showResultFilters ? (
        <div
          className={styles.filterBar}
          role="group"
          aria-label="Filter results by type"
        >
          {searchFilterGroups.map((group) => {
            const pressed = resultGroupFilter === group.id;
            const count = filterCounts[group.id] ?? 0;
            const chipDisabled = isFilterChipDisabled(group.id, filterCounts);
            return (
              <button
                key={group.id}
                type="button"
                className={`${styles.filterChip} ${chipDisabled ? styles.filterChipDisabled : ""}`.trim()}
                aria-pressed={pressed}
                aria-disabled={chipDisabled ? "true" : undefined}
                onClick={() => {
                  if (chipDisabled) {
                    return;
                  }
                  handleResultGroupFilterChange(group.id);
                }}
              >
                {group.label} ({count})
              </button>
            );
          })}
        </div>
      ) : null}

      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {statusMessage}
      </p>

      {searchResult.type === "results" &&
      trimmedDebouncedQuery.length >= 2 &&
      !showFilteredEmpty &&
      showCountLine ? (
        <p className={styles.resultCount} aria-hidden="true">
          {statusMessage}
        </p>
      ) : null}

      {showFilteredEmpty ? (
        <p className={styles.message}>
          No results in this category for the current query. Try another filter
          or show more results.
        </p>
      ) : null}

      {searchResult.type === "hint" && !hasQuery ? (
        <div className={styles.idleState}>
          {recentSearches.length > 0 ? (
            <div className={styles.suggestionGroup}>
              <div className={styles.suggestionGroupHeader}>
                <p className={styles.popularEyebrow}>Recent searches</p>
                <button
                  type="button"
                  className={styles.clearRecentButton}
                  onClick={handleClearRecentSearches}
                >
                  Clear
                </button>
              </div>
              <div className={styles.chips} role="group" aria-label="Recent searches">
                {recentSearches.map((term) => (
                  <button
                    key={term}
                    type="button"
                    className={styles.chip}
                    onClick={() => updateQuery(term)}
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : null}
          <div className={styles.suggestionGroup}>
            <p className={styles.popularEyebrow}>Popular searches</p>
            <p className={styles.popularHint}>Try a service, team member, or topic.</p>
            <div className={styles.chips} role="group" aria-label="Popular searches">
              {searchPopular.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  className={styles.chip}
                  onClick={() => updateQuery(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {showAutocomplete ? (
        <div className={styles.autocomplete}>
          <p className={styles.popularEyebrow}>Suggestions</p>
          <ul className={styles.autocompleteList} aria-label="Search suggestions">
            {autocomplete.map((suggestion, index) => {
              const navIndex = index;
              const isActive = activeIndex === navIndex;
              return (
                <li key={suggestion}>
                  <button
                    id={`${id}-option-${navIndex}`}
                    type="button"
                    className={styles.autocompleteItem}
                    data-active={isActive ? "true" : undefined}
                    onClick={() => updateQuery(suggestion)}
                  >
                    <HighlightedText text={suggestion} query={query} />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}

      {showFullEmpty ? (
        <div className={styles.emptyState}>
          <p className={styles.message}>
            We could not find an exact match for “{trimmedDebouncedQuery}”. Try
            another keyword or browse our services.
          </p>
          {emptySuggestedChips.length > 0 ? (
            <div className={styles.suggestionGroup}>
              <p className={styles.popularEyebrow}>Suggested searches</p>
              <div
                className={styles.chips}
                role="group"
                aria-label="Suggested searches"
              >
                {emptySuggestedChips.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    className={styles.chip}
                    onClick={() => updateQuery(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          ) : null}
          {emptyStateNavResults.length > 0 ? (
            <div className={styles.suggestionGroup}>
              <p className={styles.popularEyebrow}>Suggested for you</p>
              <ul
                className={styles.results}
                id={`${id}-listbox`}
                role="listbox"
                aria-label="Suggested for you"
              >
                {emptyStateNavResults.map((item, emptyIndex) => {
                  const navIndex = autocomplete.length + emptyIndex;
                  const isActive = activeIndex === navIndex;
                  return (
                    <li
                      key={`empty-${item.href}-${item.title}`}
                      role="option"
                      aria-selected={isActive}
                    >
                      <Link
                        id={`${id}-option-${navIndex}`}
                        href={item.href}
                        className={styles.result}
                        data-active={isActive ? "true" : undefined}
                        onClick={() =>
                          handleResultClick(trimmedQuery, item.href)
                        }
                      >
                        <span className={styles.resultMeta}>
                          <GroupIcon group={item.group} />
                          <span className={styles.resultType}>
                            {item.groupLabel}
                          </span>
                        </span>
                        <span className={styles.resultTitle}>
                          <HighlightedText text={item.title} query={query} />
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : null}
          <div className={styles.emptyActions}>
            <Link href="/services" className={styles.emptyLink} onClick={() => handleResultClick()}>
              Browse services
            </Link>
            <Link href="/contact" className={styles.emptyLink} onClick={() => handleResultClick()}>
              Contact us
            </Link>
          </div>
        </div>
      ) : null}

      {searchResult.type === "results" && filteredItems.length > 0 ? (
        <ul
          className={styles.results}
          id={`${id}-listbox`}
          role="listbox"
          aria-label="Search results"
        >
          {filteredItems.map((item, index) => {
            const navIndex = autocomplete.length + index;
            const isActive = activeIndex === navIndex;
            return (
              <li key={`${item.href}-${item.title}`} role="option" aria-selected={isActive}>
                <Link
                  id={`${id}-option-${navIndex}`}
                  href={item.href}
                  className={styles.result}
                  data-active={isActive ? "true" : undefined}
                  onClick={() => handleResultClick(trimmedQuery, item.href)}
                >
                  <span className={styles.resultMeta}>
                    <GroupIcon group={item.group} />
                    <span className={styles.resultType}>{item.groupLabel}</span>
                    {item.category ? (
                      <span className={styles.resultCategory}>{item.category}</span>
                    ) : null}
                  </span>
                  <span className={styles.resultTitle}>
                    <HighlightedText text={item.title} query={query} />
                  </span>
                  {item.snippet ? (
                    <span className={styles.resultSnippet}>
                      <HighlightedText text={item.snippet} query={query} />
                    </span>
                  ) : null}
                </Link>
              </li>
            );
          })}
        </ul>
      ) : null}

      {searchResult.type === "results" && hasMoreResults ? (
        <button
          type="button"
          className={styles.showMoreButton}
          onClick={() =>
            setResultsLimit((current) => current + DEFAULT_SEARCH_RESULTS_LIMIT)
          }
        >
          Show more results
        </button>
      ) : null}
    </div>
  );
});
