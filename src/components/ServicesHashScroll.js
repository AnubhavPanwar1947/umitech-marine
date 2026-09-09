"use client";

import { useEffect } from "react";

export function ServicesHashScroll() {
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) {
      return;
    }

    const id = hash.slice(1);
    const scrollToTarget = () => {
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: "auto", block: "start" });
      }
    };

    scrollToTarget();
    const frame = window.requestAnimationFrame(scrollToTarget);

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
