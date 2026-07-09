import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { SectionHero } from "@/components/SectionHero";
import { Carousel } from "@/components/Carousel";
import { ContactCTA } from "@/components/ContactCTA";
import { FadeInSection } from "@/components/FadeInSection";
import { UpcomingEvents } from "@/components/UpcomingEvents";
import { TicketSection } from "@/components/TicketSection";
import type { MediaItem } from "@/components/Carousel";

export const metadata: Metadata = {
  title: siteConfig.sections.disco.title,
  description: siteConfig.sections.disco.description,
};

// Reemplazá con las rutas reales de tus imágenes/videos en /public/disco/
const mediaItems: MediaItem[] = [
  // { type: "image", src: "/disco/foto-1.jpg", alt: "Pista de baile" },
  // { type: "video", src: "/disco/promo.mp4", poster: "/disco/promo-poster.jpg" },
];

const { title, tagline, description, paragraphs, cta } = siteConfig.sections.disco;

export default function DiscoPage() {
  return (
    <>
      <SectionHero title={title} tagline={tagline} />

      {/* Descripción intro */}
      <FadeInSection>
        <section className="bg-night-950 py-16 px-4 border-b border-white/5">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-white/60 text-lg md:text-xl leading-relaxed">{description}</p>
          </div>
        </section>
      </FadeInSection>

      {/* Próximas aperturas */}
      <section className="bg-night-950 py-12 px-4 border-b border-white/5">
        <div className="max-w-5xl mx-auto">
          <FadeInSection>
            <div className="mb-12">
              <p className="text-gold text-xs tracking-[0.35em] uppercase mb-3">Cartelera</p>
              <h2 className="font-serif text-3xl md:text-4xl text-cream">La agenda de la pirámide</h2>
            </div>
          </FadeInSection>
          <FadeInSection delay={100}>
            <UpcomingEvents events={siteConfig.upcomingEvents} />
          </FadeInSection>
        </div>
      </section>

      {/* Comprar entrada */}
      <TicketSection />

      {/* Body copy */}
      <section className="bg-night-950 py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-8">
            {paragraphs.map((para, i) => (
              <FadeInSection key={i} delay={i * 100}>
                <p className="text-white/55 text-base md:text-lg leading-relaxed tracking-wide">
                  {para}
                </p>
              </FadeInSection>
            ))}
          </div>

          <FadeInSection delay={300}>
            <div className="mt-16 pt-16 border-t border-white/5">
              <div className="w-8 h-px bg-gold mb-8" />
              <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3">Galería</p>
              <h2 className="font-serif text-2xl md:text-3xl text-white mb-10">
                Conocé el espacio
              </h2>
              <Carousel items={mediaItems} autoplay={mediaItems.length > 1} />
            </div>
          </FadeInSection>
        </div>
      </section>

      <ContactCTA ctaText={cta} />
    </>
  );
}
