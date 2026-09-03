import Image from "next/image";
import { about } from "@/lib/site-data";
import styles from "./AboutSection.module.css";

export function AboutSection() {
  return (
    <section id="about" className={`section ${styles.section}`} aria-labelledby="about-title">
      <div className={`container ${styles.layout}`}>
        <div className={styles.copy}>
          <h2 id="about-title" className="section-heading">
            {about.title}
          </h2>
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 32)} className={styles.paragraph}>
              {paragraph}
            </p>
          ))}
        </div>

        <div className={styles.media}>
          {/* TODO: Replace /images/about-placeholder.svg with approved UMITECH about image. */}
          <Image
            src={about.image}
            alt={about.imageAlt}
            fill
            sizes="(max-width: 1023px) 100vw, 40vw"
            className={styles.image}
          />
        </div>
      </div>
    </section>
  );
}
