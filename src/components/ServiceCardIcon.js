import styles from "./ServiceCardIcon.module.css";

const ICON_SRC = {
  naval: "/images/Naval Architecture.svg",
  engineering: "/images/Engineering.svg",
  inspection: "/images/Inspection, Audits and Surveying.svg",
  loadicator: "/images/LOADICATOR.svg",
};

const ICON_SCALE_CLASS = {
  naval: styles.iconNaval,
  inspection: styles.iconInspection,
};

/** @param {{ practiceId: 'naval' | 'engineering' | 'inspection' | 'loadicator' }} props */
export function ServiceCardIcon({ practiceId }) {
  const src = ICON_SRC[practiceId] ?? ICON_SRC.naval;
  const scaleClass = ICON_SCALE_CLASS[practiceId] ?? "";

  return (
    <div className={styles.tile} aria-hidden="true">
      <img
        className={`${styles.icon} ${scaleClass}`.trim()}
        src={src}
        alt=""
        aria-hidden="true"
        decoding="async"
      />
    </div>
  );
}
