import Image from "next/image";
import Link from "next/link";
import { contactPage } from "@/lib/site-data";
import { Reveal } from "@/components/Reveal";
import styles from "./ContactCardsSection.module.css";

const cardImageFallback = "/images/about-placeholder.svg";

export function ContactCardsSection() {
  const { title, cards } = contactPage;

  return (
    <section
      id="contact"
      className={`section ${styles.section}`}
      aria-labelledby="contact-page-title"
    >
      <div className="container">
        <Reveal as="h1" id="contact-page-title" className={styles.title} delay={0}>
          {title}
        </Reveal>

        <ul className={styles.grid}>
          {cards.map((card, index) => (
            <li key={card.title}>
              <Reveal as="article" className={styles.card} delay={80 + index * 60}>
                <div className={styles.media}>
                  <Image
                    src={card.image ?? cardImageFallback}
                    alt={card.imageAlt ?? card.title}
                    fill
                    quality={100}
                    sizes="(max-width: 959px) 100vw, 33vw"
                    className={styles.image}
                  />
                </div>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                {card.href ? (
                  <Link href={card.href} className={styles.cardBody}>
                    {card.description}
                  </Link>
                ) : (
                  <p className={styles.cardBody}>{card.description}</p>
                )}
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
