import { servicesPage } from "@/lib/site-data";
import { Reveal } from "@/components/Reveal";
import styles from "./ServicesIntroSection.module.css";

export function ServicesIntroSection() {
  const { intro } = servicesPage;

  return (
    <section
      id="services-intro"
      className={`section ${styles.section}`}
      aria-labelledby="services-intro-title"
    >
      <div className={`container ${styles.inner}`}>
        <Reveal as="h1" id="services-intro-title" className={styles.title} delay={0}>
          {intro.title}
        </Reveal>
        <Reveal as="p" className={styles.lead} delay={60}>
          {intro.lead}
        </Reveal>
      </div>
    </section>
  );
}
