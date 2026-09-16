import Link from "next/link";
import { standardTermsPage } from "@/lib/site-data";
import styles from "./page.module.css";

const { title, description, sections } = standardTermsPage;

export const metadata = {
  title,
  description,
};

export default function StandardTermsConditionsPage() {
  return (
    <main>
      <section
        className={`section ${styles.section}`}
        aria-labelledby="standard-terms-title"
      >
        <div className={`container ${styles.inner}`}>
          <article className={styles.article}>
            <h1 id="standard-terms-title" className={styles.title}>
              {title}
            </h1>

            <div className={styles.body}>
              {sections.map((section) => (
                <section
                  key={section.number}
                  className={styles.contentSection}
                  aria-labelledby={`standard-terms-section-${section.number}`}
                >
                  <h2
                    id={`standard-terms-section-${section.number}`}
                    className={styles.sectionHeading}
                  >
                    {section.number}. {section.heading}
                  </h2>

                  {section.intro && !section.contact ? (
                    <p className={styles.paragraph}>{section.intro}</p>
                  ) : null}

                  {section.definitions?.length ? (
                    <dl className={styles.definitions}>
                      {section.definitions.map((definition) => (
                        <div key={definition.term} className={styles.definition}>
                          <dt className={styles.definitionTerm}>
                            &ldquo;{definition.term}&rdquo;
                          </dt>
                          <dd className={styles.definitionText}>
                            {definition.text}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  ) : null}

                  {section.clauses?.map((clause, clauseIndex) => (
                    <div
                      key={clause.id ?? `${section.number}-clause-${clauseIndex}`}
                      className={styles.clause}
                    >
                      <p className={styles.paragraph}>
                        {clause.id ? (
                          <span className={styles.clauseId}>{clause.id}.</span>
                        ) : null}
                        {clause.text}
                      </p>
                      {clause.subItems?.length ? (
                        <ol className={styles.subList} type="a">
                          {clause.subItems.map((item) => (
                            <li key={item} className={styles.subListItem}>
                              {item}
                            </li>
                          ))}
                        </ol>
                      ) : null}
                    </div>
                  ))}

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
                      <p className={styles.contactLine}>
                        <img
                          src="/images/visit-us.svg"
                          alt=""
                          aria-hidden="true"
                          decoding="async"
                          className={styles.contactIcon}
                        />
                        <span className={styles.contactText}>
                          {section.location}
                        </span>
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
