import { ServicesIntroSection } from "@/components/ServicesIntroSection";
import { ServicePracticeSection } from "@/components/ServicePracticeSection";
import { ServicesHashScroll } from "@/components/ServicesHashScroll";
import { servicesPage } from "@/lib/site-data";

export const metadata = {
  title: "Services",
  description:
    "Our Services — naval architecture, engineering, inspection and surveying, and legal consultancy for marine operations.",
};

export default function ServicesPage() {
  return (
    <main>
      <ServicesHashScroll />
      <ServicesIntroSection />
      {servicesPage.practices.map((practice, index) => (
        <ServicePracticeSection
          key={practice.id}
          id={practice.id}
          heading={practice.heading}
          lead={practice.lead}
          items={practice.items}
          image={practice.image}
          imageAlt={practice.imageAlt}
          imagePosition={practice.imagePosition}
          variant={practice.variant}
          compactTop={index === 0}
          delay={80 + index * 40}
        />
      ))}
    </main>
  );
}
