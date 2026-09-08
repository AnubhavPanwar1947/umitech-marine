import { Inter } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
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
        url: "/images/heroImage.jpeg",
        width: 1600,
        height: 900,
        alt: "Aerial view of an LNG carrier at berth with spherical storage tanks",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "UMITECH MARINE | Marine Consultants",
    description:
      "Premium marine consultancy backed by practical, hands-on expertise.",
    images: ["/images/heroImage.jpeg"],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={inter.variable}
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
