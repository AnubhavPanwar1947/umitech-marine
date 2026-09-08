import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import styles from "./ServicePracticeSection.module.css";

export function ServicePracticeSection({
  id,
  heading,
  lead,
  items,
  image,
  imageAlt,
  variant = "default",
  compactTop = false,
  delay = 0,
}) {
  const sectionClassName = [
    "section",
    styles.section,
    variant === "alt" ? styles.sectionAlt : styles.sectionDefault,
    compactTop ? styles.sectionCompactTop : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section
      id={id}
      className={sectionClassName}
      aria-labelledby={`${id}-title`}
    >
      <div className="container">
        <Reveal className={styles.cardLayout} delay={delay}>
          <div className={styles.copyColumn}>
              <div className={styles.media}>
                <Image
                  src={image}
                  alt={imageAlt}
                  fill
                  quality={100}
                  sizes="(max-width: 959px) 100vw, 42vw"
                  className={styles.image}
                />
              </div>

              <h2
                id={`${id}-title`}
                className={`section-heading ${styles.heading}`}
              >
                {heading}
              </h2>

              <p className={styles.lead}>{lead}</p>
            </div>

            <div className={styles.topicsColumn}>
              <ul className={styles.topicsGrid}>
                {items.map((item, index) => {
                  const spanFull =
                    items.length % 2 === 1 && index === items.length - 1;

                  return (
                    <li
                      key={item.title}
                      tabIndex={0}
                      className={[
                        styles.topicChip,
                        spanFull ? styles.topicChipSpan : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      <h3 className={styles.itemTitle}>{item.title}</h3>
                      {item.body ? (
                        <p className={styles.itemBody}>{item.body}</p>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            </div>
        </Reveal>
      </div>
    </section>
  );
}
