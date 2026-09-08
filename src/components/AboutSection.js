import Image from "next/image";
import Link from "next/link";
import { about } from "@/lib/site-data";
import { Reveal } from "@/components/Reveal";
import styles from "./AboutSection.module.css";

export function AboutSection() {
  return (
    <section id="about" className={`section ${styles.section}`} aria-labelledby="about-title">
      <div className={`container ${styles.layout}`}>
        <div className={styles.copy}>
          <Reveal as="p" className="eyebrow" delay={0}>
            {about.eyebrow}
          </Reveal>
          <Reveal
            as="h2"
            id="about-title"
            className={`section-heading ${styles.title}`}
            delay={80}
          >
            {about.titlePrefix}
            <span className={styles.titleAccent}>{about.titleAccent}</span>
          </Reveal>
          {about.paragraphs.map((paragraph, index) => (
            <Reveal
              key={paragraph.slice(0, 32)}
              as="p"
              className={styles.paragraph}
              delay={160 + index * 80}
            >
              {paragraph}
            </Reveal>
          ))}
          <Reveal className={styles.actions} delay={320}>
            <Link href={about.ctaHref} className={`button ${styles.cta}`}>
              {about.ctaLabel}
            </Link>
          </Reveal>
        </div>

        <Reveal className={styles.media} delay={120}>
          {/* TODO: Replace photo or adjust crop if a new approved About image arrives. */}
          <Image
            src={about.image}
            alt={about.imageAlt}
            fill
            quality={100}
            sizes="(max-width: 959px) 100vw, 50vw"
            className={styles.image}
          />
        </Reveal>
      </div>
    </section>
  );
}
