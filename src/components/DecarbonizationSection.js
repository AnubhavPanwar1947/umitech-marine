import Image from "next/image";
import Link from "next/link";
import { decarbonization } from "@/lib/site-data";
import styles from "./DecarbonizationSection.module.css";

export function DecarbonizationSection() {
  return (
    <section
      id="decarbonization"
      className={`section ${styles.section}`}
      aria-labelledby="decarbonization-title"
    >
      <div className={`container ${styles.layout}`}>
        <div className={styles.copy}>
          <p className="eyebrow">{decarbonization.eyebrow}</p>
          <h2 id="decarbonization-title" className="section-heading">
            {decarbonization.title}
          </h2>
          {decarbonization.paragraphs.map((paragraph) => (
            <p key={paragraph} className={styles.paragraph}>
              {paragraph}
            </p>
          ))}
          <Link href={decarbonization.ctaHref} className="button">
            {decarbonization.ctaLabel}
          </Link>
        </div>

        <div className={styles.media}>
          {/* TODO: Replace with approved decarbonization photography or illustration. */}
          <Image
            src={decarbonization.image}
            alt={decarbonization.imageAlt}
            fill
            sizes="(max-width: 959px) 100vw, 50vw"
            className={styles.image}
          />
        </div>
      </div>
    </section>
  );
}
