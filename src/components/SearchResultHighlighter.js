"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  applyDestinationHighlights,
  clearDestinationHighlights,
  clearSearchNavHighlight,
  getPageHighlightScope,
  locationMatchesPending,
  readSearchNavHighlight,
  SEARCH_NAV_EVENT,
  scrollElementBelowHeader,
  scrollFirstDestinationHighlightIntoView,
} from "@/lib/search-nav-highlight";
import "./search-destination-highlight.css";

const MAX_ATTEMPTS = 90;
const SCROLL_RETRY_MS = [0, 32, 80, 160, 320];

export function SearchResultHighlighter() {
  const pathname = usePathname();

  useEffect(() => {
    let attempts = 0;
    let frame = 0;
    let cancelled = false;
    let appliedToken = null;
    const scrollTimers = [];

    const clearScrollTimers = () => {
      for (const timer of scrollTimers) {
        window.clearTimeout(timer);
      }
      scrollTimers.length = 0;
    };

    const scrollToMatch = () => {
      const pending = readSearchNavHighlight();
      if (pending?.hash) {
        const target = document.getElementById(pending.hash);
        if (target) {
          scrollElementBelowHeader(target);
          return;
        }
      }

      scrollFirstDestinationHighlightIntoView();
    };

    const lockLandingScroll = () => {
      clearScrollTimers();
      for (const delay of SCROLL_RETRY_MS) {
        const timer = window.setTimeout(() => {
          if (!cancelled) {
            scrollToMatch();
          }
        }, delay);
        scrollTimers.push(timer);
      }

      const clearTimer = window.setTimeout(() => {
        if (!cancelled) {
          scrollToMatch();
          clearSearchNavHighlight();
        }
      }, SCROLL_RETRY_MS[SCROLL_RETRY_MS.length - 1] + 40);
      scrollTimers.push(clearTimer);
    };

    const tryHighlight = () => {
      if (cancelled) {
        return;
      }

      const pending = readSearchNavHighlight();
      if (!pending) {
        return;
      }

      if (!locationMatchesPending(pending)) {
        attempts += 1;
        if (attempts < MAX_ATTEMPTS) {
          frame = window.requestAnimationFrame(tryHighlight);
        }
        return;
      }

      const hashId = pending.hash;
      if (hashId && !document.getElementById(hashId)) {
        attempts += 1;
        if (attempts < MAX_ATTEMPTS) {
          frame = window.requestAnimationFrame(tryHighlight);
        }
        return;
      }

      if (appliedToken === pending.token) {
        scrollToMatch();
        return;
      }

      appliedToken = pending.token;
      clearDestinationHighlights();
      applyDestinationHighlights(getPageHighlightScope(), pending.query);
      lockLandingScroll();
    };

    const schedule = () => {
      attempts = 0;
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(tryHighlight);
    };

    schedule();

    window.addEventListener("hashchange", schedule);
    window.addEventListener(SEARCH_NAV_EVENT, schedule);

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", schedule);
      window.removeEventListener(SEARCH_NAV_EVENT, schedule);
      clearScrollTimers();
    };
  }, [pathname]);

  return null;
}
