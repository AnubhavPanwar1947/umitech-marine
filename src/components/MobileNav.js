"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { navigation, servicesDropdownItems } from "@/lib/site-data";
import { isNavItemCurrent } from "@/lib/nav-current";
import styles from "./MobileNav.module.css";

export function MobileNav({ id, open, onNavigate, pathname }) {
  const [servicesExpanded, setServicesExpanded] = useState(false);
  const servicesSubmenuId = useId();

  const handleNavigate = () => {
    setServicesExpanded(false);
    onNavigate();
  };

  return (
    <nav
      id={id}
      className={styles.panel}
      data-open={open}
      aria-label="Mobile"
      aria-hidden={!open}
    >
      <ul className={styles.list}>
        {navigation.map((item) => {
          if (item.href === "/services") {
            return (
              <li key={item.href} className={styles.servicesItem}>
                <div className={styles.servicesRow}>
                  <Link
                    href="/services"
                    className={styles.link}
                    aria-current={
                      isNavItemCurrent(pathname, item.href) ? "page" : undefined
                    }
                    onClick={handleNavigate}
                    tabIndex={open ? 0 : -1}
                  >
                    Services
                  </Link>
                  <button
                    type="button"
                    className={styles.expandButton}
                    aria-expanded={servicesExpanded}
                    aria-controls={servicesSubmenuId}
                    aria-label={
                      servicesExpanded
                        ? "Hide services submenu"
                        : "Show services submenu"
                    }
                    onClick={() => setServicesExpanded((expanded) => !expanded)}
                    tabIndex={open ? 0 : -1}
                  >
                    <span
                      className={styles.expandIcon}
                      aria-hidden
                      data-open={servicesExpanded ? "true" : undefined}
                    />
                  </button>
                </div>

                <ul
                  id={servicesSubmenuId}
                  className={styles.submenu}
                  data-open={servicesExpanded ? "true" : undefined}
                >
                  {servicesDropdownItems.map((subItem) => (
                    <li key={subItem.href}>
                      <Link
                        href={subItem.href}
                        className={styles.submenuLink}
                        onClick={handleNavigate}
                        tabIndex={open && servicesExpanded ? 0 : -1}
                      >
                        {subItem.label}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      href="/services"
                      className={styles.submenuLinkAll}
                      onClick={handleNavigate}
                      tabIndex={open && servicesExpanded ? 0 : -1}
                    >
                      View all services
                    </Link>
                  </li>
                </ul>
              </li>
            );
          }

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={styles.link}
                aria-current={
                  isNavItemCurrent(pathname, item.href) ? "page" : undefined
                }
                onClick={handleNavigate}
                tabIndex={open ? 0 : -1}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
      <Link
        href="/contact"
        className={`button ${styles.contact}`}
        onClick={handleNavigate}
        tabIndex={open ? 0 : -1}
      >
        Contact Us
      </Link>
    </nav>
  );
}
