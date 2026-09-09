import Image from "next/image";
import Link from "next/link";
import { blogPage } from "@/lib/site-data";
import { Reveal } from "@/components/Reveal";
import styles from "./BlogArticlePreviewSection.module.css";

export function BlogArticlePreviewSection() {
  const { article } = blogPage;

  return (
    <section
      id="blog-article-preview"
      className={`section ${styles.section}`}
      aria-labelledby="blog-article-preview-title"
    >
      <div className="container">
        <Reveal delay={40}>
          <article className={styles.card}>
            <div className={styles.layout}>
              <div className={styles.mediaColumn}>
                <div className={styles.media}>
                  <Image
                    src={article.image}
                    alt={article.imageAlt}
                    fill
                    sizes="(max-width: 959px) 100vw, 42vw"
                    className={styles.image}
                  />
                </div>
              </div>

              <div className={styles.contentColumn}>
                <h2 id="blog-article-preview-title" className={styles.title}>
                  {article.title}
                </h2>
                <p className={styles.excerpt}>{article.excerpt}</p>
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
      </div>
    </section>
  );
}
