import Image from "next/image";
import Link from "next/link";
import { hero } from "@/lib/site-data";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section id="home" className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.media}>
        {/* TODO: Replace hero image with approved UMITECH photography. */}
        <Image
          src={hero.image}
          alt={hero.imageAlt}
          fill
          priority
          sizes="100vw"
          className={styles.image}
        />
        <div className={styles.overlay} aria-hidden />
      </div>

      <div className={`container ${styles.content}`}>
        <h1 id="hero-title" className={styles.title}>
          {hero.headline}
        </h1>
        <p className={styles.subheadline}>{hero.subheadline}</p>
        <p className={styles.lead}>{hero.lead}</p>
        <div className={styles.actions}>
          <Link href={hero.ctaHref} className="button">
            {hero.ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
