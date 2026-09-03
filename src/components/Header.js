"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { navigation } from "@/lib/site-data";
import styles from "./Header.module.css";
import { MobileNav } from "./MobileNav";
import { SearchButton } from "./SearchButton";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link href="#home" className={styles.brand} onClick={closeMenu}>
          {/* TODO: Replace /images/logo-placeholder.svg with the transparent UMITECH logo asset. */}
          <Image
            src="/images/logo-placeholder.svg"
            alt="UMITECH MARINE"
            width={160}
            height={44}
            className={styles.logo}
            priority
          />
        </Link>

        <nav className={styles.desktopNav} aria-label="Primary">
          <ul className={styles.navList}>
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={styles.navLink}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <SearchButton className={styles.search} />
          <Link href="#contact" className={`button ${styles.cta}`}>
            Contact Us
          </Link>
        </div>

        <div className={styles.mobileActions}>
          <SearchButton />
          <button
            type="button"
            className={styles.menuButton}
            aria-expanded={menuOpen}
            aria-controls={menuId}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
            <span aria-hidden className={styles.menuIcon} data-open={menuOpen} />
          </button>
        </div>
      </div>

      <MobileNav id={menuId} open={menuOpen} onNavigate={closeMenu} />
    </header>
  );
}
