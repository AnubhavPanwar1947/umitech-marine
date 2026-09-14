"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { services, servicesPage, servicesSection } from "@/lib/site-data";
import { ServiceCardIcon } from "@/components/ServiceCardIcon";
import { Reveal } from "@/components/Reveal";
import styles from "./ServicesGrid.module.css";

const MAX_CHIPS = 4;
const MOBILE_MEDIA = "(max-width: 959px)";

function useNarrowViewport() {
  const [narrow, setNarrow] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(MOBILE_MEDIA);
    const sync = () => setNarrow(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return narrow;
}

export function ServicesGrid() {
  const practicesById = useMemo(
    () => Object.fromEntries(servicesPage.practices.map((practice) => [practice.id, practice])),
    [],
  );
  const narrow = useNarrowViewport();
  const [openIndex, setOpenIndex] = useState(null);
  const gridRef = useRef(null);

  const closeOverlay = useCallback(() => setOpenIndex(null), []);

  useEffect(() => {
    if (openIndex === null) return undefined;

    const onPointerDown = (event) => {
      if (!gridRef.current?.contains(event.target)) {
        closeOverlay();
      }
    };

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        closeOverlay();
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [openIndex, closeOverlay]);

  return (
    <section id="services" className={`section ${styles.section}`} aria-labelledby="services-title">
      <div className="container">
        <Reveal as="h2" id="services-title" className="section-heading" delay={0}>
          {servicesSection.title}
        </Reveal>
        <Reveal as="p" className="section-lead" delay={100}>
          {servicesSection.lead}
        </Reveal>

        <ul className={styles.grid} ref={gridRef}>
          {services.map((service, index) => {
            const practice = practicesById[service.practiceId];
            const chips = (practice?.items ?? []).slice(0, MAX_CHIPS);
            const isOpen = narrow && openIndex === index;

            return (
              <li key={service.practiceId}>
                <Reveal className={styles.revealCell} delay={180 + index * 40}>
                  <article className={styles.item}>
                    <div
                      className={`${styles.card} ${isOpen ? styles.cardOpen : ""}`}
                      data-open={isOpen ? "true" : undefined}
                    >
                      <div className={styles.cardBody}>
                        <div className={styles.iconRegion}>
                          <ServiceCardIcon practiceId={service.practiceId} />
                        </div>
                        <h3 className={styles.title}>{service.title}</h3>
                      </div>

                      <div className={styles.overlayLight} aria-hidden />

                      <div className={styles.overlayPanel}>
                        {practice?.lead ? (
                          <p className={styles.overlayLead}>{practice.lead}</p>
                        ) : null}
                        <ul className={styles.chipList}>
                          {chips.map((item) => (
                            <li key={item.slug}>
                              <Link
                                href={`/services/${service.practiceId}/${item.slug}/`}
                                className={styles.chip}
                              >
                                {item.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                        <Link
                          href={`/services#${service.practiceId}`}
                          className={styles.explore}
                        >
                          Explore →
                        </Link>
                      </div>

                      {narrow ? (
                        <button
                          type="button"
                          className={styles.expandButton}
                          aria-expanded={isOpen}
                          aria-label={`Show links for ${service.title}`}
                          onClick={() => setOpenIndex(isOpen ? null : index)}
                        />
                      ) : null}
                    </div>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
