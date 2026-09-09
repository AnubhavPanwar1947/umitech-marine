import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogArticle, getBlogArticleParams } from "@/lib/site-data";
import styles from "./page.module.css";

export function generateStaticParams() {
  return getBlogArticleParams();
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = getBlogArticle(slug);

  if (!article) {
    return { title: "Article" };
  }

  return {
    title: article.title,
  };
}

export default async function BlogArticlePage({ params }) {
  const { slug } = await params;
  const article = getBlogArticle(slug);

  if (!article) {
    notFound();
  }

  return (
    <main>
      <section
        className={`section ${styles.section}`}
        aria-labelledby="blog-article-title"
      >
        <div className={`container ${styles.inner}`}>
          <h1 id="blog-article-title" className={styles.title}>
            {article.title}
          </h1>

          <div className={styles.hero}>
            <Image
              src={article.image}
              alt={article.imageAlt}
              fill
              sizes="(max-width: 959px) 100vw, 42rem"
              className={styles.heroImage}
              priority
            />
          </div>

          <div className={styles.body}>
            {article.intro.map((paragraph) => (
              <p key={paragraph} className={styles.paragraph}>
                {paragraph}
              </p>
            ))}

            {article.sections.map((section) => (
              <section
                key={section.heading}
                className={styles.contentSection}
                aria-labelledby={`section-${section.heading}`}
              >
                <h2
                  id={`section-${section.heading}`}
                  className={styles.sectionHeading}
                >
                  {section.heading}
                </h2>
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph} className={styles.paragraph}>
                    {paragraph}
                  </p>
                ))}
                {section.list?.length ? (
                  <ul className={styles.list}>
                    {section.list.map((entry) => (
                      <li key={entry} className={styles.listItem}>
                        {entry}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>

          <div className={styles.ctaBlock}>
            <h2 className={styles.ctaHeading}>{article.cta.heading}</h2>
            <p className={styles.ctaLead}>{article.cta.lead}</p>
            <Link href={article.cta.ctaHref} className={`button ${styles.cta}`}>
              {article.cta.ctaLabel}
            </Link>
          </div>

          <Link href="/blog" className={styles.backLink}>
            Back to Marine Insights
          </Link>
        </div>
      </section>
    </main>
  );
}
