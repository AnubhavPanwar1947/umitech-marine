import { stats } from "@/lib/site-data";
import styles from "./StatsGrid.module.css";

export function StatsGrid() {
  return (
    <section className={`section ${styles.section}`} aria-label="Company statistics">
      <div className="container">
        <ul className={styles.grid}>
          {stats.map((item) => (
            <li key={item.label} className={styles.card}>
              <p className={styles.value}>{item.value}</p>
              <p className={styles.label}>{item.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
