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
import { addRecentSearch } from "@/lib/search-recent";
import {
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
  const inputRef = useRef(null);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    if (!open) {
      return;
    }

    setQuery("");
    setActiveIndex(-1);

    const frame = requestAnimationFrame(() => {
      inputRef.current?.focus();
    });

    return () => cancelAnimationFrame(frame);
  }, [open]);

  const searchResult = useMemo(() => searchSite(query), [query]);
  const autocomplete = useMemo(
    () => getAutocompleteSuggestions(query),
    [query],
  );

  const filteredItems = useMemo(() => {
    if (searchResult.type !== "results") {
      return [];
    }
    return searchResult.items;
  }, [searchResult]);

  const closestResults = useMemo(() => {
    if (searchResult.type !== "results" || searchResult.items.length > 0) {
      return [];
    }
    return getClosestSearchResults(query, 3);
  }, [searchResult, query]);

  const relatedServices = useMemo(() => {
    if (searchResult.type !== "results" || searchResult.items.length > 0) {
      return [];
    }
    return getRelatedServiceResults(3);
  }, [searchResult]);

  const alternativeSuggestions = useMemo(() => {
    if (searchResult.type !== "results" || searchResult.items.length > 0) {
      return [];
    }
    return getAlternativeSearchSuggestions(query);
  }, [searchResult, query]);

  const navigableItems = useMemo(() => {
    const items = [];
    for (const suggestion of autocomplete) {
      items.push({ kind: "suggestion", suggestion });
    }
    for (const item of filteredItems) {
      items.push({ kind: "result", item });
    }
    return items;
  }, [autocomplete, filteredItems]);

  useEffect(() => {
    setActiveIndex(-1);
  }, [query, filteredItems.length]);

  if (!open) {
    return null;
  }

  const trimmedQuery = query.trim();
  const hasQuery = trimmedQuery.length > 0;
  const showAutocomplete = trimmedQuery.length >= 2 && autocomplete.length > 0;
  const totalCount =
    searchResult.type === "results" ? filteredItems.length : 0;
  const hasAnyResults =
    searchResult.type === "results" && searchResult.items.length > 0;
  const showFullEmpty =
    searchResult.type === "results" &&
    trimmedQuery.length > 0 &&
    !hasAnyResults;

  const statusMessage =
    searchResult.type === "hint"
      ? "Enter a search term."
      : showFullEmpty
        ? `No matches for “${trimmedQuery}”.`
        : `${totalCount} result${totalCount === 1 ? "" : "s"} found`;

  const handleResultClick = (searchTerm) => {
    if (searchTerm) {
      addRecentSearch(searchTerm);
    }
    onNavigate();
    onClose();
  };

  const handleClearQuery = () => {
    setQuery("");
    inputRef.current?.focus();
  };

  const activateNavigableItem = (index) => {
    const entry = navigableItems[index];
    if (!entry) {
      return;
    }

    if (entry.kind === "suggestion") {
      setQuery(entry.suggestion);
      return;
    }

    addRecentSearch(trimmedQuery);
    router.push(entry.item.href);
    handleResultClick(trimmedQuery);
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
      if (activeIndex >= 0) {
        event.preventDefault();
        activateNavigableItem(activeIndex);
        return;
      }
      if (filteredItems[0]) {
        event.preventDefault();
        addRecentSearch(trimmedQuery);
        router.push(filteredItems[0].href);
        handleResultClick(trimmedQuery);
      }
    }
  };

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
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={handleInputKeyDown}
          placeholder="Search services, team members, articles…"
          autoComplete="off"
          enterKeyHint="search"
          role="combobox"
          aria-expanded={showAutocomplete || filteredItems.length > 0}
          aria-controls={`${id}-listbox`}
          aria-autocomplete="list"
          aria-activedescendant={
            activeIndex >= 0 ? `${id}-option-${activeIndex}` : undefined
          }
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

      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {statusMessage}
      </p>

      {searchResult.type === "results" && hasQuery ? (
        <p className={styles.resultCount} aria-hidden="true">
          {totalCount} result{totalCount === 1 ? "" : "s"} found
        </p>
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
                    onClick={() => setQuery(suggestion)}
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
            We could not find an exact match for “{trimmedQuery}”. Try another
            keyword or browse our services.
          </p>
          {alternativeSuggestions.length > 0 ? (
            <div className={styles.chips} role="group" aria-label="Try searching for">
              {alternativeSuggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  className={styles.chip}
                  onClick={() => setQuery(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          ) : null}
          {closestResults.length > 0 ? (
            <>
              <p className={styles.popularEyebrow}>Closest matches</p>
              <ul className={styles.results} id={`${id}-listbox`}>
                {closestResults.map((item) => (
                  <li key={`closest-${item.href}-${item.title}`}>
                    <Link
                      href={item.href}
                      className={styles.result}
                      onClick={() => handleResultClick(trimmedQuery)}
                    >
                      <span className={styles.resultMeta}>
                        <GroupIcon group={item.group} />
                        <span className={styles.resultType}>{item.groupLabel}</span>
                      </span>
                      <span className={styles.resultTitle}>
                        <HighlightedText text={item.title} query={query} />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          ) : null}
          {relatedServices.length > 0 ? (
            <>
              <p className={styles.popularEyebrow}>Related services</p>
              <ul className={styles.results}>
                {relatedServices.map((item) => (
                  <li key={`related-${item.href}-${item.title}`}>
                    <Link
                      href={item.href}
                      className={styles.result}
                      onClick={() => handleResultClick(trimmedQuery)}
                    >
                      <span className={styles.resultMeta}>
                        <GroupIcon group={item.group} />
                        <span className={styles.resultType}>{item.groupLabel}</span>
                      </span>
                      <span className={styles.resultTitle}>{item.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
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
                  onClick={() => handleResultClick(trimmedQuery)}
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
    </div>
  );
});
