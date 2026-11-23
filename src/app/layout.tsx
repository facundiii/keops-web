import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Outfit } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/CustomCursor";
import { siteConfig } from "@/config/site";

// Títulos
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-outfit",
  display: "swap",
});

// Texto, botones, antetítulos y formularios
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

// Solo como acento en itálica ("Desde 1969")
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500"],
  style: ["italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.location}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.descripcion,
  keywords: ["boliche", "nightclub", "Villa Carlos Paz", "Keops", "egresados", "eventos"],
  icons: {
    icon: "/logo-piramide.png",
    apple: "/logo-piramide.png",
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.descripcion,
    siteName: siteConfig.name,
    locale: "es_AR",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" data-scroll-behavior="smooth" className={`${outfit.variable} ${inter.variable} ${cormorant.variable}`}>
      <body>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
