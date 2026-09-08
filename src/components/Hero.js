import Image from "next/image";
import Link from "next/link";
import { hero } from "@/lib/site-data";
import { Reveal } from "@/components/Reveal";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section id="home" className={styles.hero} aria-labelledby="hero-title">
      <div
        className={styles.media}
        style={{ "--hero-image": `url(${hero.image})` }}
      >
        <Image
          src={hero.image}
          alt={hero.imageAlt}
          fill
          priority
          quality={100}
          sizes="100vw"
          className={styles.image}
        />
        <div className={styles.overlay} aria-hidden />
      </div>

      <div className={styles.content}>
        <Reveal
          as="h1"
          id="hero-title"
          className={styles.title}
          immediate
          delay={0}
        >
          {hero.headlinePrefix}
          <span className={styles.titleAccent}>{hero.headlineAccent}</span>
        </Reveal>
        <Reveal as="p" className={styles.subheadline} immediate delay={100}>
          {hero.subheadlinePrefix}
          <span className={styles.titleAccent}>{hero.subheadlineAccent}</span>
          {hero.subheadlineSuffix}
        </Reveal>
        <Reveal as="p" className={styles.lead} immediate delay={200}>
          {hero.lead}
        </Reveal>
        <Reveal className={styles.actions} immediate delay={300}>
          <Link href={hero.ctaHref} className={`button ${styles.cta}`}>
            {hero.ctaLabel}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
