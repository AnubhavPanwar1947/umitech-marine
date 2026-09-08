"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { navigation } from "@/lib/site-data";
import { isNavItemCurrent } from "@/lib/nav-current";
import { getSearchPanelStyle } from "@/lib/search-panel-position";
import styles from "./Header.module.css";
import { MobileNav } from "./MobileNav";
import { SearchButton } from "./SearchButton";
import { SearchPanel } from "./SearchPanel";

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const menuId = useId();
  const searchPanelId = useId();
  const headerRef = useRef(null);
  const searchPanelRef = useRef(null);
  const desktopSearchRef = useRef(null);
  const mobileSearchRef = useRef(null);
  const [searchPanelStyle, setSearchPanelStyle] = useState(undefined);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isSolidHeaderPage =
    pathname === "/about" ||
    pathname === "/contact" ||
    pathname === "/services" ||
    pathname === "/team";

  useEffect(() => {
    if (isSolidHeaderPage) {
      return;
    }

    const hero = document.getElementById("home");
    if (!hero) {
      setPastHero(true);
      return;
    }

    const scrollOnThreshold = 8;

    const updateScrolled = () => {
      setPastHero(window.scrollY > scrollOnThreshold);
    };

    updateScrolled();
    window.addEventListener("scroll", updateScrolled, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateScrolled);
    };
  }, [isSolidHeaderPage]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key !== "Escape") {
        return;
      }

      if (searchOpen) {
        setSearchOpen(false);
        return;
      }

      if (menuOpen) {
        setMenuOpen(false);
      }
    };

    if (menuOpen || searchOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [menuOpen, searchOpen]);

  useEffect(() => {
    if (!searchOpen) {
      return;
    }

    const handlePointerDown = (event) => {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      if (searchPanelRef.current?.contains(target)) {
        return;
      }

      const searchToggles = headerRef.current?.querySelectorAll(
        `[aria-controls="${searchPanelId}"]`
      );
      for (const toggle of searchToggles ?? []) {
        if (toggle.contains(target)) {
          return;
        }
      }

      closeSearch();
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [searchOpen, searchPanelId]);

  useLayoutEffect(() => {
    if (!searchOpen) {
      setSearchPanelStyle(undefined);
      return;
    }

    const updatePosition = () => {
      const isDesktop = window.matchMedia("(min-width: 960px)").matches;
      const anchor = isDesktop ? desktopSearchRef.current : mobileSearchRef.current;

      if (!anchor) {
        return;
      }

      setSearchPanelStyle(getSearchPanelStyle(anchor));
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, { passive: true });

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition);
    };
  }, [searchOpen]);

  const closeMenu = () => setMenuOpen(false);
  const closeSearch = () => setSearchOpen(false);

  const toggleSearch = () => {
    if (searchOpen) {
      closeSearch();
      return;
    }

    if (menuOpen) {
      closeMenu();
    }

    setSearchOpen(true);
  };

  const toggleMenu = () => {
    if (menuOpen) {
      closeMenu();
      return;
    }

    if (searchOpen) {
      closeSearch();
    }

    setMenuOpen(true);
  };

  const handleSearchNavigate = () => {
    closeMenu();
    closeSearch();
  };

  const solidHeader = isSolidHeaderPage || pastHero;

  return (
    <header
      ref={headerRef}
      className={styles.header}
      data-scrolled={solidHeader ? "true" : undefined}
      data-about-page={isSolidHeaderPage ? "true" : undefined}
      data-menu-open={menuOpen ? "true" : undefined}
      data-search-open={searchOpen ? "true" : undefined}
    >
      <div className={`container ${styles.inner}`}>
        <Link
          href="/"
          className={styles.brand}
          onClick={() => {
            closeMenu();
            closeSearch();
          }}
        >
          <Image
            src="/images/logo.png"
            alt="UMITECH MARINE"
            width={1024}
            height={297}
            className={styles.logo}
            priority
            sizes="(max-width: 480px) 42vw, 160px"
          />
        </Link>

        <nav className={styles.desktopNav} aria-label="Primary">
          <ul className={styles.navList}>
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={styles.navLink}
                  aria-current={
                    isNavItemCurrent(pathname, item.href) ? "page" : undefined
                  }
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <SearchButton
            ref={desktopSearchRef}
            className={styles.search}
            ariaExpanded={searchOpen}
            ariaControls={searchPanelId}
            onClick={toggleSearch}
          />
          <Link href="/contact" className={`button ${styles.cta}`}>
            Contact Us
          </Link>
        </div>

        <div className={styles.mobileActions}>
          <SearchButton
            ref={mobileSearchRef}
            className={styles.mobileControl}
            ariaExpanded={searchOpen}
            ariaControls={searchPanelId}
            onClick={toggleSearch}
          />
          <button
            type="button"
            className={styles.menuButton}
            aria-expanded={menuOpen}
            aria-controls={menuId}
            onClick={toggleMenu}
          >
            <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
            <span aria-hidden className={styles.menuIcon} data-open={menuOpen} />
          </button>
        </div>
      </div>

      <SearchPanel
        id={searchPanelId}
        ref={searchPanelRef}
        open={searchOpen}
        panelStyle={searchPanelStyle}
        onClose={closeSearch}
        onNavigate={handleSearchNavigate}
      />
      <MobileNav id={menuId} open={menuOpen} onNavigate={closeMenu} pathname={pathname} />
    </header>
  );
}
