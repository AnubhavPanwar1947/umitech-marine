import { blogPage } from "@/lib/site-data";
import { Reveal } from "@/components/Reveal";
import styles from "./BlogIntroSection.module.css";

export function BlogIntroSection() {
  const { intro } = blogPage;

  return (
    <section
      id="blog-intro"
      className={`section ${styles.section}`}
      aria-labelledby="blog-intro-title"
    >
      <div className={`container ${styles.inner}`}>
        <Reveal as="h1" id="blog-intro-title" className={styles.title} delay={0}>
          {intro.title}
        </Reveal>
        <Reveal as="p" className={styles.lead} delay={60}>
          {intro.lead}
        </Reveal>
      </div>
    </section>
  );
}
