import Link from "next/link";
import { teamPage } from "@/lib/site-data";
import { Reveal } from "@/components/Reveal";
import styles from "./TeamCtaSection.module.css";

export function TeamCtaSection() {
  const { cta } = teamPage;

  return (
    <section
      id="team-contact"
      className={`section ${styles.section}`}
      aria-labelledby="team-cta-title"
    >
      <div className={`container ${styles.inner}`}>
        <Reveal
          as="h2"
          id="team-cta-title"
          className={`section-heading ${styles.heading}`}
          delay={0}
        >
          {cta.heading}
        </Reveal>
        <Reveal as="p" className={styles.lead} delay={80}>
          {cta.lead}
        </Reveal>
        <Reveal className={styles.actions} delay={160}>
          <Link href={cta.ctaHref} className="button">
            {cta.ctaLabel}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
