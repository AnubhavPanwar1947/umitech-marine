import Image from "next/image";
import Link from "next/link";
import { footer, teamPage } from "@/lib/site-data";
import styles from "./CfdWireframeArticle.module.css";

const CFD_CONTACT_PORTRAIT =
  "/blog/computational-fluid-dynamics/blog-abhinav.png";

const cfdContactMember =
  teamPage.members.find((member) =>
    member.name.includes("Abhinav Upadhyay"),
  ) ?? teamPage.members[0];

export function CfdWireframeArticle({
  title,
  articleTitle,
  headings,
  bodyHtml,
  heroImage,
  heroImageAlt = "CFD laboratory simulation of marine vessel flow",
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
                  width={1280}
                  height={720}
                  className={styles.introHeroImage}
                  sizes="(min-width: 768px) 48vw, 100vw"
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
          className={styles.contactCard}
          aria-labelledby="cfd-contact-heading"
        >
          <h2 id="cfd-contact-heading" className={styles.contactHeading}>
            For more information, please contact
          </h2>
          <div className={styles.contactCardBody}>
            <div className={styles.contactPortraitFrame}>
              <Image
                src={CFD_CONTACT_PORTRAIT}
                alt={cfdContactMember.imageAlt}
                width={50}
                height={100}
                className={styles.contactPortrait}
                sizes="50px"
              />
            </div>
            <div className={styles.contactDetails}>
              <p className={styles.contactName}>{cfdContactMember.name}</p>
              <p className={styles.contactRole}>{cfdContactMember.role}</p>
              <p className={styles.contactLine}>
                <a href={footer.contact.phoneHref}>{footer.contact.phone}</a>
              </p>
              <p className={styles.contactLine}>
                <a href={footer.contact.emailHref}>{footer.contact.email}</a>
              </p>
            </div>
          </div>
        </aside>

        <Link href="/blog" className={styles.backLink}>
          Back to Marine Insights
        </Link>
      </div>
    </section>
  );
}
