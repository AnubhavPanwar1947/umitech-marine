import styles from "./ReadMoreArrow.module.css";

/** @param {{ className?: string }} props */
export function ReadMoreArrow({ className }) {
  const iconClass = className ? `${styles.icon} ${className}` : styles.icon;

  return (
    <svg
      className={iconClass}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M2.5 8h9.2M8.2 3.5 13.5 8l-5.3 4.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
