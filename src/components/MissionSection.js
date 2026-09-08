import { aboutPage } from "@/lib/site-data";
import { Reveal } from "@/components/Reveal";
import styles from "./MissionSection.module.css";

export function MissionSection() {
  const { mission } = aboutPage;

  return (
    <section
      id="mission"
      className={`section ${styles.section}`}
      aria-labelledby="mission-title"
    >
      <div className={`container ${styles.inner}`}>
        <Reveal
          as="h2"
          id="mission-title"
          className={`section-heading ${styles.heading}`}
          delay={0}
        >
          {mission.heading}
        </Reveal>
        <Reveal delay={80}>
          <ul className={styles.points}>
            {mission.points.map((point) => (
              <li key={point} className={styles.point}>
                {point}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
