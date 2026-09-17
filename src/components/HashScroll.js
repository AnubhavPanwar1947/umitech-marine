"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  isPendingSearchLanding,
  readSearchNavHighlight,
  scrollElementBelowHeader,
  SEARCH_NAV_EVENT,
} from "@/lib/search-nav-highlight";

const MAX_ATTEMPTS = 60;

function scrollToHashId(id) {
  if (!id) {
    return true;
  }

  if (isPendingSearchLanding()) {
    return true;
  }

  const target = document.getElementById(id);
  if (!target) {
    return false;
  }

  scrollElementBelowHeader(target);
  return true;
}

export function HashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    let attempts = 0;
    let frame = 0;

    const run = () => {
      if (readSearchNavHighlight() && isPendingSearchLanding()) {
        return;
      }

      const hash = window.location.hash;
      if (!hash) {
        return;
      }

      const id = decodeURIComponent(hash.slice(1));
      if (scrollToHashId(id)) {
        return;
      }

      attempts += 1;
      if (attempts < MAX_ATTEMPTS) {
        frame = window.requestAnimationFrame(run);
      }
    };

    run();

    const handleHashChange = () => {
      attempts = 0;
      window.cancelAnimationFrame(frame);
      run();
    };

    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener(SEARCH_NAV_EVENT, handleHashChange);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener(SEARCH_NAV_EVENT, handleHashChange);
    };
  }, [pathname]);

  return null;
}
