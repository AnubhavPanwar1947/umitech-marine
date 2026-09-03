import styles from "./ContactCtaSection.module.css";

export function ContactCtaSection() {
  return (
    <section
      id="contact"
      className={`section ${styles.section}`}
      aria-label="Contact"
    >
      <div className={`container ${styles.inner}`} />
    </section>
  );
}
