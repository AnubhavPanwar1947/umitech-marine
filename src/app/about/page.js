import { AboutIntroSection } from "@/components/AboutIntroSection";
import { MissionSection } from "@/components/MissionSection";
import { VisionSection } from "@/components/VisionSection";
import { ValuesSection } from "@/components/ValuesSection";

export const metadata = {
  title: "About",
  description:
    "Learn about Umitech Marine Solutions — our mission, vision, values, and the expertise behind our marine consultancy services.",
};

export default function AboutPage() {
  return (
    <main>
      <AboutIntroSection />
      <MissionSection />
      <VisionSection />
      <ValuesSection />
    </main>
  );
}
