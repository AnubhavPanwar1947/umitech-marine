import Image from "next/image";
import { aboutPage } from "@/lib/site-data";
import { Reveal } from "@/components/Reveal";
import styles from "./ValuesSection.module.css";

const valueImageFallback = "/images/about-placeholder.svg";

export function ValuesSection() {
  const { values } = aboutPage;

  return (
    <section
      id="values"
      className={`section ${styles.section}`}
      aria-labelledby="values-title"
    >
      <div className="container">
        <Reveal
          as="h2"
          id="values-title"
          className={`section-heading ${styles.heading}`}
          delay={0}
        >
          {values.heading}
        </Reveal>

        <ul className={styles.grid}>
          {values.items.map((item, index) => (
            <li key={item.title}>
              <Reveal as="article" className={styles.card} delay={80 + index * 60}>
                <div className={styles.media}>
                  <Image
                    src={item.image ?? valueImageFallback}
                    alt={item.imageAlt ?? item.title}
                    fill
                    quality={100}
                    sizes="(max-width: 479px) 100vw, (max-width: 959px) 50vw, 25vw"
                    className={styles.image}
                  />
                </div>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardBody}>{item.description}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
