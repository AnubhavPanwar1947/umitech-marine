import Image from "next/image";
import { aboutPage } from "@/lib/site-data";
import { Reveal } from "@/components/Reveal";
import styles from "./AboutIntroSection.module.css";

export function AboutIntroSection() {
  const { intro } = aboutPage;

  return (
    <section
      id="about-us"
      className={`section ${styles.section}`}
      aria-labelledby="about-intro-title"
    >
      <div className={`container ${styles.layout}`}>
        <div className={styles.copy}>
          <Reveal as="h2" id="about-intro-title" className={styles.title} delay={0} immediate>
            {intro.eyebrow}
          </Reveal>
          {intro.paragraphs.map((paragraph, index) => (
            <Reveal
              key={paragraph.slice(0, 32)}
              as="p"
              className={styles.paragraph}
              delay={80 + index * 80}
              immediate={index === 0}
            >
              {paragraph}
            </Reveal>
          ))}
        </div>

        <Reveal className={styles.media} delay={120} immediate>
          <Image
            src={intro.image}
            alt={intro.imageAlt}
            fill
            priority
            quality={100}
            sizes="(max-width: 959px) 100vw, 50vw"
            className={styles.image}
          />
        </Reveal>
      </div>
    </section>
  );
}
