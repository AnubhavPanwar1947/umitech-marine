import Link from "next/link";
import { privacyPolicyPage } from "@/lib/site-data";
import { LegalContactBlock } from "@/components/LegalContactBlock";
import styles from "./page.module.css";

const { title, description, sections } = privacyPolicyPage;

export const metadata = {
  title,
  description,
};

export default function PrivacyPolicyPage() {
  return (
    <main>
      <section
        className={`section ${styles.section}`}
        aria-labelledby="privacy-policy-title"
      >
        <div className={`container ${styles.inner}`}>
          <article className={styles.article}>
            <h1 id="privacy-policy-title" className={styles.title}>
              {title}
            </h1>

            <div className={styles.body}>
              {sections.map((section) => (
                <section
                  key={section.number}
                  className={styles.contentSection}
                  aria-labelledby={`privacy-policy-section-${section.number}`}
                >
                  <h2
                    id={`privacy-policy-section-${section.number}`}
                    className={styles.sectionHeading}
                  >
                    {section.number}. {section.heading}
                  </h2>

                  {section.paragraphs?.map((paragraph) => (
                    <p key={paragraph} className={styles.paragraph}>
                      {paragraph}
                    </p>
                  ))}

                  {section.intro && !section.contact ? (
                    <p className={styles.paragraph}>{section.intro}</p>
                  ) : null}

                  {section.listItems?.length ? (
                    <ul className={styles.list}>
                      {section.listItems.map((item) => (
                        <li key={item} className={styles.listItem}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  {section.paragraphsAfterList?.map((paragraph) => (
                    <p key={paragraph} className={styles.paragraph}>
                      {paragraph}
                    </p>
                  ))}

                  <LegalContactBlock section={section} styles={styles} />
                </section>
              ))}
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
