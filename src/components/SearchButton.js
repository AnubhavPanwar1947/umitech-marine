import { forwardRef } from "react";
import styles from "./SearchButton.module.css";

export const SearchButton = forwardRef(function SearchButton(
  { className = "", onClick, ariaExpanded = false, ariaControls },
  ref
) {
  return (
    <button
      ref={ref}
      type="button"
      className={`${styles.button} ${className}`.trim()}
      aria-label="Search"
      aria-expanded={ariaExpanded}
      aria-controls={ariaControls}
      onClick={onClick}
    >
      <svg
        className={styles.icon}
        width="20"
        height="20"
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
    </button>
  );
});
