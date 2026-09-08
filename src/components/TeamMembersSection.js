import Image from "next/image";
import { teamPage } from "@/lib/site-data";
import { Reveal } from "@/components/Reveal";
import styles from "./TeamMembersSection.module.css";

export function TeamMembersSection() {
  const { members } = teamPage;

  return (
    <section
      id="team-members"
      className={`section ${styles.section}`}
      aria-labelledby="team-members-title"
    >
      <div className="container">
        <h2 id="team-members-title" className="sr-only">
          Team members
        </h2>
        <ul className={styles.list}>
          {members.map((member, index) => {
            const isLastMember = index === members.length - 1;

            return (
              <li
                key={member.name}
                className={[
                  styles.listItem,
                  isLastMember ? styles.listItemCenter : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <Reveal delay={80 + index * 60}>
                  <article className={styles.card}>
                    <div className={styles.cardLayout}>
                      <div className={styles.mediaColumn}>
                        <Image
                          src={member.image}
                          alt={member.imageAlt}
                          fill
                          sizes="(max-width: 959px) 100vw, (max-width: 1279px) 50vw, 184px"
                          className={styles.image}
                        />
                      </div>

                      <div className={styles.contentColumn}>
                        <h3 className={styles.name}>{member.name}</h3>
                        <p className={styles.role}>{member.role}</p>
                        <p className={styles.bio}>{member.bio}</p>

                        <ul className={styles.tagsGrid}>
                          {member.tags.map((tag, tagIndex) => {
                            const spanFull =
                              member.tags.length % 2 === 1 &&
                              tagIndex === member.tags.length - 1;

                            return (
                              <li
                                key={`${member.name}-${tagIndex}`}
                                tabIndex={0}
                                className={[
                                  styles.tagChip,
                                  spanFull ? styles.tagChipSpan : "",
                                ]
                                  .filter(Boolean)
                                  .join(" ")}
                              >
                                <span className={styles.tagLabel}>{tag}</span>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
