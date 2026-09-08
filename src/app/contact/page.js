import { ContactCardsSection } from "@/components/ContactCardsSection";
import { ContactFormSection } from "@/components/ContactFormSection";

export const metadata = {
  title: "Contact",
  description:
    "Contact UMITECH MARINE — visit us in Yokohama, call, email, or send a message through our contact form.",
};

export default function ContactPage() {
  return (
    <main>
      <ContactCardsSection />
      <ContactFormSection />
    </main>
  );
}
