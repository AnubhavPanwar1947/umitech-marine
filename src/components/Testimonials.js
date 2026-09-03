"use client";

import { useState } from "react";
import { testimonials } from "@/lib/site-data";
import styles from "./Testimonials.module.css";

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = testimonials[activeIndex];

  const goTo = (index) => {
    const total = testimonials.length;
    setActiveIndex(((index % total) + total) % total);
  };

  return (
    <section
      id="testimonials"
      className={`section ${styles.section}`}
      aria-labelledby="testimonials-title"
    >
      <div className="container">
        <p className="eyebrow">Testimonials</p>
        <h2 id="testimonials-title" className="section-heading">
          Testimonials
        </h2>

        <article className={styles.card} aria-live="polite">
          <blockquote className={styles.quote}>
            <p>&ldquo;{active.quote}&rdquo;</p>
          </blockquote>
          <footer className={styles.meta}>
            <cite className={styles.name}>{active.name}</cite>
            <span className={styles.role}>{active.role}</span>
          </footer>
        </article>

        <div className={styles.controls}>
          <button
            type="button"
            className={styles.navButton}
            onClick={() => goTo(activeIndex - 1)}
            aria-label="Previous testimonial"
          >
            ←
          </button>

          <div className={styles.dots} role="tablist" aria-label="Testimonials">
            {testimonials.map((item, index) => (
              <button
                key={item.name + index}
                type="button"
                role="tab"
                aria-selected={index === activeIndex}
                aria-label={`Show testimonial ${index + 1}`}
                className={styles.dot}
                data-active={index === activeIndex}
                onClick={() => goTo(index)}
              />
            ))}
          </div>

          <button
            type="button"
            className={styles.navButton}
            onClick={() => goTo(activeIndex + 1)}
            aria-label="Next testimonial"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
