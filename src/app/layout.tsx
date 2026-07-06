import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CustomCursor } from "@/components/CustomCursor";
import { siteConfig } from "@/config/site";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — ${siteConfig.location}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: `${siteConfig.heroPhrase}. Disco, eventos privados, egresados e institucionales en ${siteConfig.location}.`,
  keywords: ["boliche", "nightclub", "Villa Carlos Paz", "Keops", "egresados", "eventos"],
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.heroPhrase,
    siteName: siteConfig.name,
    locale: "es_AR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${cormorant.variable} ${inter.variable}`}>
      <body>
        <CustomCursor />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
