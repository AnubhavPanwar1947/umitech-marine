import { aboutPage } from "@/lib/site-data";
import { Reveal } from "@/components/Reveal";
import styles from "./CoreValuesSection.module.css";

export function CoreValuesSection() {
  const { coreValues } = aboutPage;

  return (
    <section
      id="core-values"
      className={`section ${styles.section}`}
      aria-labelledby="core-values-title"
    >
      <div className={`container ${styles.inner}`}>
        <Reveal
          as="h2"
          id="core-values-title"
          className={`section-heading ${styles.heading}`}
          delay={0}
        >
          {coreValues.heading}
        </Reveal>
        {coreValues.paragraphs.map((paragraph, index) => (
          <Reveal
            key={paragraph.slice(0, 32)}
            as="p"
            className={styles.paragraph}
            delay={80 + index * 80}
          >
            {paragraph}
          </Reveal>
        ))}
      </div>
    </section>
  );
}
