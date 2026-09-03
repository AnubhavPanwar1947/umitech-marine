import { Hero } from "@/components/Hero";
import { ServicesGrid } from "@/components/ServicesGrid";
import { DecarbonizationSection } from "@/components/DecarbonizationSection";
import { ContactCtaSection } from "@/components/ContactCtaSection";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <ServicesGrid />
      <DecarbonizationSection />
      <ContactCtaSection />
    </main>
  );
}
