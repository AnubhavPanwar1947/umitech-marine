import Image from "next/image";
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
      <div className={`container ${styles.layout}`}>
        <div className={styles.copy}>
          <Reveal as="h1" id="services-intro-title" className={styles.title} delay={0}>
            {intro.title}
          </Reveal>
          <Reveal as="p" className={styles.lead} delay={60}>
            {intro.lead}
          </Reveal>
          {intro.bullets?.length ? (
            <Reveal as="ul" className={styles.bulletList} delay={100}>
              {intro.bullets.map((item) => (
                <li key={item} className={styles.bulletItem}>
                  {item}
                </li>
              ))}
            </Reveal>
          ) : null}
        </div>

        {intro.image ? (
          <Reveal className={styles.media} delay={120}>
            <Image
              src={intro.image}
              alt={intro.imageAlt}
              fill
              sizes="(max-width: 959px) 100vw, 45vw"
              className={styles.image}
            />
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
