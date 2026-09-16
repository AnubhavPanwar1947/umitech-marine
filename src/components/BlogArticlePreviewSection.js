import Image from "next/image";
import Link from "next/link";
import { blogPage } from "@/lib/site-data";
import { Reveal } from "@/components/Reveal";
import styles from "./BlogArticlePreviewSection.module.css";

export function BlogArticlePreviewSection() {
  const { articles } = blogPage;

  return (
    <section
      id="blog-article-preview"
      className={`section ${styles.section}`}
      aria-label="Article previews"
    >
      <div className="container">
        <div className={styles.articles}>
          {articles.map((article, index) => (
            <Reveal key={article.slug} delay={40 + index * 40}>
              <article className={styles.card} aria-labelledby={`blog-preview-${article.slug}`}>
                <div className={styles.layout}>
                  <div className={styles.mediaColumn}>
                    <div className={styles.media}>
                  <Image
                    src={article.image}
                    alt={
                      article.imageAlt ||
                      article.cardTitle ||
                      article.title
                    }
                    fill
                        sizes="(max-width: 959px) 100vw, 42vw"
                        className={styles.image}
                      />
                    </div>
                  </div>

                  <div className={styles.contentColumn}>
                    <h2
                      id={`blog-preview-${article.slug}`}
                      className={styles.title}
                    >
                      {article.cardTitle ?? article.title}
                    </h2>
                    <p
                      className={`${styles.excerpt} ${article.summary ? "" : styles.excerptLast}`}
                    >
                      {article.excerpt}
                    </p>
                    {article.summary ? (
                      <p className={styles.summary}>{article.summary}</p>
                    ) : null}
                    <Link
                      href={`/blog/${article.slug}`}
                      className={`button ${styles.cta}`}
                    >
                      {article.ctaLabel}
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
