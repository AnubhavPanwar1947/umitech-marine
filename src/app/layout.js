import { DM_Sans, Libre_Baskerville } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const libreBaskerville = Libre_Baskerville({
  variable: "--font-libre-baskerville",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const siteUrl = "https://www.umitech.co.jp";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "UMITECH MARINE | Marine Consultants",
    template: "%s | UMITECH MARINE",
  },
  description:
    "UMITECH MARINE delivers premium marine consultancy across naval architecture, engineering, surveying, and legal consultancy with 24/7 support.",
  openGraph: {
    title: "UMITECH MARINE | Marine Consultants",
    description:
      "Premium marine consultancy backed by practical, hands-on expertise across naval architecture, engineering, surveying, and clean-fuel advisory.",
    url: siteUrl,
    siteName: "UMITECH MARINE",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/hero-placeholder.svg",
        width: 1600,
        height: 900,
        alt: "UMITECH MARINE placeholder hero image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "UMITECH MARINE | Marine Consultants",
    description:
      "Premium marine consultancy backed by practical, hands-on expertise.",
    images: ["/images/hero-placeholder.svg"],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${libreBaskerville.variable}`}
    >
      <body>
        <a href="#home" className="skip-link">
          Skip to main content
        </a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
