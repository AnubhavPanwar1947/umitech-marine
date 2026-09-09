import Image from "next/image";
import { teamPage } from "@/lib/site-data";
import { TeamCtaSection } from "@/components/TeamCtaSection";
import { TeamIntroSection } from "@/components/TeamIntroSection";
import { Reveal } from "@/components/Reveal";
import "./team-theme.css";

export const metadata = {
  title: "Team",
  description:
    "Meet the UMITECH MARINE team — naval architects and master mariners with experience in design, operations, and marine consultancy.",
};

export default function TeamPage() {
  const { members } = teamPage;

  return (
    <main>
      <TeamIntroSection />
      <section
        id="team-members"
        className="team-members section"
        aria-labelledby="team-members-title"
      >
        <div className="container">
          <h2 id="team-members-title" className="sr-only">
            Team members
          </h2>
          <ul className="team-members__list">
            {members.map((member, index) => (
              <li key={member.name} className="team-members__item">
                <Reveal delay={80 + index * 60}>
                  <article className="team-members__card" tabIndex={0}>
                    <div className="team-members__cardLayout">
                      <div className="team-members__mediaColumn">
                        <Image
                          src={member.image}
                          alt={member.imageAlt}
                          fill
                          sizes="(max-width: 639px) 100vw, (max-width: 1023px) 100vw, 50vw"
                          className="team-members__image"
                        />
                      </div>

                      <div className="team-members__contentColumn">
                        <h3 className="team-members__name">{member.name}</h3>
                        <p className="team-members__role">{member.role}</p>
                        <p className="team-members__bio">{member.bio}</p>
                      </div>
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <TeamCtaSection />
    </main>
  );
}
