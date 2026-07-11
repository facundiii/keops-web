import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
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
  icons: {
    icon: "/logo-piramide.png",
    apple: "/logo-piramide.png",
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.heroPhrase,
    siteName: siteConfig.name,
    locale: "es_AR",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${cormorant.variable} ${inter.variable}`}>
      <head>
        <link
          rel="preload"
          href="/fonts/NotoSansEgyptianHieroglyphs-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link rel="preload" href="/landing-pc.png" as="image" media="(min-width: 768px)" />
        <link rel="preload" href="/landing-mobile.png" as="image" media="(max-width: 767px)" />
      </head>
      <body>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
