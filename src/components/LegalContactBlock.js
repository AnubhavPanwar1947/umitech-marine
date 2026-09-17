import Link from "next/link";

export function LegalContactBlock({ section, styles }) {
  if (!section?.contact) {
    return null;
  }

  return (
    <div className={styles.contactBlock}>
      <p className={styles.paragraph}>{section.intro}</p>
      <p className={styles.contactLine}>
        <img
          src="/images/mail-us.svg"
          alt=""
          aria-hidden="true"
          decoding="async"
          className={styles.contactIcon}
        />
        <Link href={`mailto:${section.email}`} className={styles.contactLink}>
          {section.email}
        </Link>
      </p>
      {section.phone ? (
        <p className={styles.contactLine}>
          <img
            src="/images/contact-us.svg"
            alt=""
            aria-hidden="true"
            decoding="async"
            className={styles.contactIcon}
          />
          <Link href={section.phoneHref} className={styles.contactLink}>
            {section.phone}
          </Link>
        </p>
      ) : null}
      {section.location ? (
        <p className={styles.contactLine}>
          <img
            src="/images/visit-us.svg"
            alt=""
            aria-hidden="true"
            decoding="async"
            className={styles.contactIcon}
          />
          <span className={styles.contactText}>{section.location}</span>
        </p>
      ) : null}
    </div>
  );
}
