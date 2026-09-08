import { TeamCtaSection } from "@/components/TeamCtaSection";
import { TeamIntroSection } from "@/components/TeamIntroSection";
import { TeamMembersSection } from "@/components/TeamMembersSection";

export const metadata = {
  title: "Team",
  description:
    "Meet the UMITECH MARINE team — naval architects and master mariners with experience in design, operations, and marine consultancy.",
};

export default function TeamPage() {
  return (
    <main>
      <TeamIntroSection />
      <TeamMembersSection />
      <TeamCtaSection />
    </main>
  );
}
