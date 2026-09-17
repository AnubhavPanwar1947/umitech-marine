import Image from "next/image";
import Link from "next/link";
import styles from "./CfdWireframeArticle.module.css";

export function CfdWireframeArticle({
  title,
  articleTitle,
  headings,
  bodyHtml,
  heroImage,
  heroImageWidth = 1600,
  heroImageHeight = 758,
  heroImageAlt = "CFD Phase 2 volume fraction contour of a vessel hull at the free surface",
}) {
  return (
    <section className={`section ${styles.section}`} aria-labelledby="cfd-article-title">
      <div className="container">
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <ol className={styles.breadcrumbList}>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/blog">Marine Insights</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <span aria-current="page">Computational Fluid Dynamics</span>
            </li>
          </ol>
        </nav>

        <header className={styles.intro}>
          <div className={styles.introHero}>
            <div className={styles.introTitleCol}>
              <h1 id="cfd-article-title" className={styles.articleTitle}>
                {title}
              </h1>
            </div>
            {heroImage ? (
              <div className={styles.introMediaCol}>
                <Image
                  src={heroImage}
                  alt={heroImageAlt}
                  width={heroImageWidth}
                  height={heroImageHeight}
                  quality={100}
                  className={styles.introHeroImage}
                  sizes="(max-width: 767px) 100vw, 58vw"
                  priority
                />
              </div>
            ) : null}
          </div>
        </header>

        <div className={styles.heroSeparator} aria-hidden="true" />

        {articleTitle ? (
          <h2 className={styles.articleHeadline}>{articleTitle}</h2>
        ) : null}

        <details className={styles.tocMobile}>
          <summary className={styles.tocMobileSummary}>In this article</summary>
          {headings.length > 0 ? (
            <ol className={styles.tocMobileList}>
              {headings.map((item, index) => (
                <li key={item.id}>
                  <a href={`#${item.id}`}>
                    <span className={styles.tocIndex}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ol>
          ) : null}
        </details>

        <div className={styles.articleLayout}>
          <div
            className={styles.docxBody}
            dangerouslySetInnerHTML={{ __html: bodyHtml }}
          />

          {headings.length > 0 ? (
            <aside className={styles.tocAside} aria-label="Table of contents">
              <p className={styles.tocAsideTitle}>In this article</p>
              <ol className={styles.tocAsideList}>
                {headings.map((item, index) => (
                  <li key={item.id}>
                    <a href={`#${item.id}`}>
                      <span className={styles.tocIndex}>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ol>
            </aside>
          ) : null}
        </div>

        <aside
          className={styles.contactAside}
          aria-labelledby="cfd-contact-heading"
        >
          <h2 id="cfd-contact-heading" className={styles.contactHeading}>
            For more information, please contact us:
          </h2>
          <div className={styles.contactBlock}>
            <p className={styles.contactLine}>
              <img
                src="/images/mail-us.svg"
                alt=""
                aria-hidden="true"
                decoding="async"
                className={styles.contactIcon}
              />
              <Link href="mailto:info@umitech.co.jp" className={styles.contactLink}>
                info@umitech.co.jp
              </Link>
            </p>
          </div>
        </aside>

        <Link href="/blog" className={styles.backLink}>
          Back to Marine Insights
        </Link>
      </div>
    </section>
  );
}
