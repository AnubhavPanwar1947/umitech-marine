import Image from "next/image";
import { services, servicesSection } from "@/lib/site-data";
import { Reveal } from "@/components/Reveal";
import styles from "./ServicesGrid.module.css";

export function ServicesGrid() {
  return (
    <section id="services" className={`section ${styles.section}`} aria-labelledby="services-title">
      <div className="container">
        <Reveal as="h2" id="services-title" className="section-heading" delay={0}>
          {servicesSection.title}
        </Reveal>
        <Reveal as="p" className="section-lead" delay={100}>
          {servicesSection.lead}
        </Reveal>

        <ul className={styles.grid}>
          {services.map((service, index) => (
            <li key={service.title}>
              <Reveal delay={180 + index * 40}>
                <article className={styles.item}>
                  <div className={styles.card}>
                    <div className={styles.media}>
                      <Image
                        src={service.image}
                        alt={service.imageAlt}
                        fill
                        quality={100}
                        sizes="(max-width: 639px) 100vw, (max-width: 959px) 50vw, 25vw"
                        className={styles.image}
                      />
                      <div className={styles.overlay} aria-hidden />
                    </div>
                  </div>
                  <h3 className={styles.title}>{service.title}</h3>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
