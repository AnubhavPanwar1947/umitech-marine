import { aboutPage } from "@/lib/site-data";
import { Reveal } from "@/components/Reveal";
import styles from "./VisionSection.module.css";

export function VisionSection() {
  const { vision } = aboutPage;

  return (
    <section
      id="vision"
      className={`section ${styles.section}`}
      aria-labelledby="vision-title"
    >
      <div className={`container ${styles.inner}`}>
        <Reveal
          as="h2"
          id="vision-title"
          className={`section-heading ${styles.heading}`}
          delay={0}
        >
          {vision.heading}
        </Reveal>
        <Reveal delay={80}>
          <blockquote className={styles.quote}>
            <p>{vision.body}</p>
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
