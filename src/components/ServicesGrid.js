import Image from "next/image";
import { services, servicesSection } from "@/lib/site-data";
import styles from "./ServicesGrid.module.css";

export function ServicesGrid() {
  return (
    <section id="services" className={`section ${styles.section}`} aria-labelledby="services-title">
      <div className="container">
        <p className="eyebrow">{servicesSection.eyebrow}</p>
        <h2 id="services-title" className="section-heading">
          {servicesSection.title}
        </h2>
        <p className="section-lead">{servicesSection.lead}</p>

        <ul className={styles.grid}>
          {services.map((service) => (
            <li key={service.title}>
              <article className={styles.card}>
                <div className={styles.media}>
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    sizes="(max-width: 639px) 100vw, (max-width: 959px) 50vw, 25vw"
                    className={styles.image}
                  />
                  <div className={styles.overlay} aria-hidden />
                </div>
                <div className={styles.body}>
                  <h3 className={styles.title}>{service.title}</h3>
                  <p className={styles.description}>{service.description}</p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
