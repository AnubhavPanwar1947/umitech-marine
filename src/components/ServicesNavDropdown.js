"use client";

import { useEffect, useId, useRef } from "react";
import Link from "next/link";
import { servicesDropdownItems } from "@/lib/site-data";
import { isNavItemCurrent } from "@/lib/nav-current";
import styles from "./ServicesNavDropdown.module.css";

export function ServicesNavDropdown({
  pathname,
  open,
  onOpenChange,
  onCloseSearch,
  linkClassName,
  itemClassName,
  chevronClassName,
}) {
  const menuId = useId();
  const itemRef = useRef(null);
  const closeTimerRef = useRef(null);

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const openMenu = () => {
    clearCloseTimer();
    onCloseSearch?.();
    onOpenChange(true);
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => {
      onOpenChange(false);
    }, 150);
  };

  const toggleMenu = () => {
    if (open) {
      onOpenChange(false);
      return;
    }

    onCloseSearch?.();
    onOpenChange(true);
  };

  useEffect(() => {
    if (!open) {
      return;
    }

    const handlePointerDown = (event) => {
      const target = event.target;
      if (!(target instanceof Node)) {
        return;
      }

      if (itemRef.current?.contains(target)) {
        return;
      }

      onOpenChange(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [open, onOpenChange]);

  useEffect(() => {
    return () => {
      clearCloseTimer();
    };
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === "Escape" && open) {
      event.preventDefault();
      onOpenChange(false);
      itemRef.current?.querySelector(`.${styles.servicesLink}`)?.focus();
    }
  };

  const closeMenu = () => {
    onOpenChange(false);
  };

  return (
    <li
      ref={itemRef}
      className={[styles.item, itemClassName].filter(Boolean).join(" ")}
      onMouseEnter={openMenu}
      onMouseLeave={scheduleClose}
      onKeyDown={handleKeyDown}
    >
      <div className={styles.row}>
        <Link
          href="/services"
          className={`${linkClassName} ${styles.servicesLink}`}
          aria-current={
            isNavItemCurrent(pathname, "/services") ? "page" : undefined
          }
          onClick={closeMenu}
        >
          Services
        </Link>
        <button
          type="button"
          className={[styles.chevronButton, chevronClassName]
            .filter(Boolean)
            .join(" ")}
          aria-expanded={open}
          aria-haspopup="true"
          aria-controls={menuId}
          aria-label={open ? "Hide services menu" : "Show services menu"}
          onClick={toggleMenu}
        >
          <span className={styles.chevron} aria-hidden data-open={open} />
        </button>
      </div>

      <ul
        id={menuId}
        className={styles.menu}
        role="menu"
        aria-label="Services"
        data-open={open ? "true" : undefined}
        onMouseEnter={openMenu}
        onMouseLeave={scheduleClose}
      >
        {servicesDropdownItems.map((subItem) => (
          <li key={subItem.href} role="none">
            <Link
              href={subItem.href}
              className={styles.menuLink}
              role="menuitem"
              tabIndex={open ? 0 : -1}
              onClick={closeMenu}
            >
              {subItem.label}
            </Link>
          </li>
        ))}
        <li role="none" className={styles.menuFooter}>
          <Link
            href="/services"
            className={styles.menuLinkAll}
            role="menuitem"
            tabIndex={open ? 0 : -1}
            onClick={closeMenu}
          >
            View all services
          </Link>
        </li>
      </ul>
    </li>
  );
}
