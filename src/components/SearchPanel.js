"use client";

import { forwardRef, useEffect, useId, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { searchIndex, searchPopular } from "@/lib/site-data";
import styles from "./SearchPanel.module.css";

function filterSearchIndex(query) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return { type: "hint" };
  }

  const matches = searchIndex.filter((item) => {
    if (item.label.toLowerCase().includes(normalized)) {
      return true;
    }

    return item.keywords.some(
      (keyword) => keyword.includes(normalized) || normalized.includes(keyword)
    );
  });

  const seen = new Set();

  return {
    type: "results",
    items: matches.filter((item) => {
      const key = `${item.href}-${item.label}`;
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    }),
  };
}

function SearchGlyph() {
  return (
    <svg
      className={styles.inputIcon}
      width="16"
      height="16"
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

export const SearchPanel = forwardRef(function SearchPanel(
  { id, open, panelStyle, onClose, onNavigate },
  ref
) {
  const inputId = useId();
  const inputRef = useRef(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!open) {
      return;
    }

    setQuery("");

    const frame = requestAnimationFrame(() => {
      inputRef.current?.focus();
    });

    return () => cancelAnimationFrame(frame);
  }, [open]);

  const filtered = useMemo(() => filterSearchIndex(query), [query]);

  if (!open) {
    return null;
  }

  const handleResultClick = () => {
    onNavigate();
    onClose();
  };

  return (
    <div
      id={id}
      ref={ref}
      className={styles.panel}
      style={panelStyle}
      role="search"
    >
      <label htmlFor={inputId} className="sr-only">
        Search this site
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
          placeholder="Search services and sections…"
          autoComplete="off"
          enterKeyHint="search"
        />
      </div>

      {filtered.type === "hint" ? (
        <div className={styles.popular}>
          <p className={styles.popularEyebrow}>Popular searches</p>
          <p className={styles.popularHint}>Start with a service or section.</p>
          <div className={styles.chips} role="group" aria-label="Popular searches">
            {searchPopular.map((suggestion) => (
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
        </div>
      ) : filtered.items.length === 0 ? (
        <p className={styles.message}>No matches</p>
      ) : (
        <ul className={styles.results}>
          {filtered.items.map((item) => (
            <li key={`${item.href}-${item.label}`}>
              <Link
                href={item.href}
                className={styles.result}
                onClick={handleResultClick}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});
