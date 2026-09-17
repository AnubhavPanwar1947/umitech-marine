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
                        width={article.imageWidth ?? 1600}
                        height={article.imageHeight ?? 758}
                        quality={100}
                        sizes="(max-width: 1279px) 100vw, 58vw"
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
