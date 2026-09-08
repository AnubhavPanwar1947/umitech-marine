import Link from "next/link";
import Image from "next/image";
import { footer } from "@/lib/site-data";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.columns}>
          <div className={styles.brand}>
            <Link href="#home" className={styles.brandLink}>
              <Image
                src="/images/logo.png"
                alt="UMITECH MARINE"
                width={1024}
                height={297}
                className={styles.logo}
                sizes="(max-width: 480px) 42vw, 160px"
              />
            </Link>
          </div>

          <nav className={styles.column} aria-label="Footer information">
            <h2 className={styles.columnHeading}>{footer.information.heading}</h2>
            <ul className={styles.linkList}>
              {footer.information.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={styles.link}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.column}>
            <h2 className={styles.columnHeading}>{footer.contact.heading}</h2>
            <address className={styles.contact}>
              <a href={footer.contact.phoneHref} className={styles.contactLink}>
                {footer.contact.phone}
              </a>
              <span className={styles.address}>{footer.contact.address}</span>
              <a href={footer.contact.emailHref} className={styles.contactLink}>
                {footer.contact.email}
              </a>
            </address>
          </div>
        </div>

        <div className={styles.utility}>
          <nav className={styles.legalNav} aria-label="Legal">
            <ul className={styles.legalList}>
              {footer.legalLinks.map((link) => (
                <li key={link.label}>
                  {/* TODO: Replace placeholder href with the real {link.label} page. */}
                  <Link href={link.href} className={styles.legalLink}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
