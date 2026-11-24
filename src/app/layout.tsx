import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Outfit } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/CustomCursor";
import { siteConfig } from "@/config/site";
import { aniversario } from "@/config/aniversario";

// Pasado el aniversario, muestra la home normal antes de pintar (ver SegunFecha).
// Corre antes que todo y no toca nada que maneje React: solo agrega una regla de estilo.
const finAniversario =
  `if(Date.now()>=${Date.parse(aniversario.fin)})document.head.insertAdjacentHTML("beforeend",` +
  `"<style>.segun-antes:has(+.segun-despues){display:none!important}.segun-antes+.segun-despues{display:block!important}</style>")`;

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
        {/* Script común, no next/script: tiene que correr en el parseo, antes de que se pinte la portada */}
        <script id="fin-aniversario" dangerouslySetInnerHTML={{ __html: finAniversario }} />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
