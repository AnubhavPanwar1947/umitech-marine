import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getServiceTopic,
  getServiceTopicParams,
} from "@/lib/site-data";
import styles from "./page.module.css";

export function generateStaticParams() {
  return getServiceTopicParams();
}

export async function generateMetadata({ params }) {
  const { practice, slug } = await params;
  const topic = getServiceTopic(practice, slug);

  if (!topic) {
    return { title: "Service" };
  }

  return {
    title: topic.item.title,
  };
}

export default async function ServiceTopicPage({ params }) {
  const { practice: practiceId, slug } = await params;
  const topic = getServiceTopic(practiceId, slug);

  if (!topic) {
    notFound();
  }

  const { item } = topic;

  return (
    <main>
      <section className={`section ${styles.section}`} aria-labelledby="service-topic-title">
        <div className={`container ${styles.inner}`}>
          <h1 id="service-topic-title" className={styles.title}>
            {item.title}
          </h1>
          <div className={styles.body}>
            {item.detail.map((paragraph) => (
              <p key={paragraph} className={styles.paragraph}>
                {paragraph}
              </p>
            ))}
            {item.detailList?.length ? (
              <ul className={styles.list}>
                {item.detailList.map((entry) => (
                  <li key={entry} className={styles.listItem}>
                    {entry}
                  </li>
                ))}
              </ul>
            ) : null}
            {item.detailAfter?.map((paragraph) => (
              <p key={paragraph} className={styles.paragraph}>
                {paragraph}
              </p>
            ))}
          </div>
          <Link href="/services" className={styles.backLink}>
            Back to Services
          </Link>
        </div>
      </section>
    </main>
  );
}
