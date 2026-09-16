import Link from "next/link";
import { termsPage } from "@/lib/site-data";
import styles from "./page.module.css";

const { title, description, sections } = termsPage;

export const metadata = {
  title,
  description,
};

export default function TermsConditionsPage() {
  return (
    <main>
      <section
        className={`section ${styles.section}`}
        aria-labelledby="terms-title"
      >
        <div className={`container ${styles.inner}`}>
          <article className={styles.article}>
            <h1 id="terms-title" className={styles.title}>
              {title}
            </h1>

            <div className={styles.body}>
              {sections.map((section) => (
                <section
                  key={section.number}
                  className={styles.contentSection}
                  aria-labelledby={`terms-section-${section.number}`}
                >
                  <h2
                    id={`terms-section-${section.number}`}
                    className={styles.sectionHeading}
                  >
                    {section.number}. {section.heading}
                  </h2>

                  {section.paragraphs?.map((paragraph) => (
                    <p key={paragraph} className={styles.paragraph}>
                      {paragraph}
                    </p>
                  ))}

                  {section.listItems?.length ? (
                    <ul className={styles.list}>
                      {section.listItems.map((item) => (
                        <li key={item} className={styles.listItem}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  {section.contact ? (
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
                        <Link
                          href={`mailto:${section.email}`}
                          className={styles.contactLink}
                        >
                          {section.email}
                        </Link>
                      </p>
                    </div>
                  ) : null}
                </section>
              ))}
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
