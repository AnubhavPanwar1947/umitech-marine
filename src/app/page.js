import { Hero } from "@/components/Hero";
import { ServicesGrid } from "@/components/ServicesGrid";
import { AboutSection } from "@/components/AboutSection";
import { ContactCtaSection } from "@/components/ContactCtaSection";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <ServicesGrid />
      <AboutSection />
      <ContactCtaSection />
    </main>
  );
}
