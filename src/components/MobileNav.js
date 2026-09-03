"use client";

import Link from "next/link";
import { navigation } from "@/lib/site-data";
import styles from "./MobileNav.module.css";

export function MobileNav({ id, open, onNavigate }) {
  return (
    <nav
      id={id}
      className={styles.panel}
      data-open={open}
      aria-label="Mobile"
      aria-hidden={!open}
    >
      <ul className={styles.list}>
        {navigation.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={styles.link}
              onClick={onNavigate}
              tabIndex={open ? 0 : -1}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
      <Link
        href="#contact"
        className={`button ${styles.contact}`}
        onClick={onNavigate}
        tabIndex={open ? 0 : -1}
      >
        Contact Us
      </Link>
    </nav>
  );
}
