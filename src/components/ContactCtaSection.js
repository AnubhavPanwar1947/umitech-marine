import Link from "next/link";
import { contactCta } from "@/lib/site-data";
import { Reveal } from "@/components/Reveal";
import styles from "./ContactCtaSection.module.css";

export function ContactCtaSection() {
  return (
    <section
      id="contact"
      className={`section ${styles.section}`}
      aria-labelledby="contact-title"
    >
      <div className={styles.media} aria-hidden="true">
        <div className={styles.image} />
        <div className={styles.overlay} />
      </div>

      <div className={`container ${styles.inner}`}>
        <Reveal as="h2" id="contact-title" className={styles.title} delay={0}>
          {contactCta.title}
        </Reveal>
        <Reveal as="p" className={styles.lead} delay={100}>
          {contactCta.lead}
        </Reveal>
        <Reveal className={styles.actions} delay={200}>
          <Link href={contactCta.ctaHref} className={styles.cta}>
            {contactCta.ctaLabel}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
