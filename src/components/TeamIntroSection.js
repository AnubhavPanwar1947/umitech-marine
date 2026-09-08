import { teamPage } from "@/lib/site-data";
import { Reveal } from "@/components/Reveal";
import styles from "./TeamIntroSection.module.css";

export function TeamIntroSection() {
  const { intro } = teamPage;

  return (
    <section
      id="team-intro"
      className={`section ${styles.section}`}
      aria-labelledby="team-intro-title"
    >
      <div className={`container ${styles.inner}`}>
        <Reveal as="h1" id="team-intro-title" className={styles.title} delay={0}>
          {intro.title}
        </Reveal>
        <Reveal as="p" className={`eyebrow ${styles.eyebrow}`} delay={40}>
          {intro.eyebrow}
        </Reveal>
        <Reveal as="p" className={styles.lead} delay={80}>
          {intro.lead}
        </Reveal>
      </div>
    </section>
  );
}
