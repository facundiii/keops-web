import type { Metadata } from "next";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { ContactCTA } from "@/components/ContactCTA";
import { FadeInSection } from "@/components/FadeInSection";

export const metadata: Metadata = {
  title: "Fusion",
  description: siteConfig.fusion.tagline,
};

function PartnerLogo({ name, logoSrc, large }: { name: string; logoSrc: string; large?: boolean }) {
  return (
    <div className={`flex items-center justify-center px-8 py-6 sm:py-0 sm:px-10 w-full ${
      large
        ? "h-[134px] sm:h-[134px] md:h-44 lg:h-52"
        : "h-28 sm:h-28 md:h-36 lg:h-44"
    }`}>
      <div className={`relative h-full ${
        large
          ? "w-44 sm:w-52 md:w-[269px] lg:w-[307px]"
          : "w-36 sm:w-44 md:w-56 lg:w-64"
      }`}>
        <Image
          src={logoSrc}
          alt={name}
          fill
          className="object-contain"
          sizes="(max-width: 640px) 60vw, (max-width: 768px) 33vw, 25vw"
        />
      </div>
    </div>
  );
}

export default function FusionPage() {
  return (
    <>
      {/* ─── HERO + LOGOS ─────────────────────────────────────────────────── */}
      <section className="relative flex flex-col items-center px-4 pt-28 pb-12 bg-night-950 overflow-hidden">
        {/* Glow radial background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white/[0.03] blur-3xl" />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto w-full">
          {/* Fusion logo */}
          <div className="relative w-56 h-32 sm:w-72 sm:h-40 md:w-96 md:h-52 mb-10 md:mb-12">
            <Image
              src={siteConfig.fusion.logoSrc}
              alt="Fusion"
              fill
              className="object-contain fusion-glow"
              priority
            />
          </div>

          {/* Tagline */}
          <FadeInSection>
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white leading-snug tracking-tight">
              {siteConfig.fusion.tagline}
            </h1>
          </FadeInSection>

          {/* Divider */}
          <FadeInSection delay={120}>
            <div className="mt-8 mb-8 w-16 h-px bg-white/20 mx-auto" />
          </FadeInSection>

          {/* Partner logos — columna en mobile, fila en sm+ */}
          <div className="flex flex-col sm:flex-row items-center justify-center w-full">
            {siteConfig.fusion.partners.map((partner, i) => (
              <FadeInSection
                key={partner.name}
                delay={180 + i * 180}
                className="w-full sm:flex-1 flex justify-center border-b sm:border-b-0 sm:border-r border-white/10 last:border-0"
              >
                <PartnerLogo
                  name={partner.name}
                  logoSrc={partner.logoSrc}
                  large={partner.name === "Keops"}
                />
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA
        title="¿Querés ser parte?"
        subtitle="Escribinos para más información sobre las noches Fusion."
      />
    </>
  );
}
