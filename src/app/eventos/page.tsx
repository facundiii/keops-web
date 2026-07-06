import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { SectionHero } from "@/components/SectionHero";
import { ContactCTA } from "@/components/ContactCTA";
import { FadeInSection } from "@/components/FadeInSection";
import { EventosGallery } from "@/components/EventosGallery";

export const metadata: Metadata = {
  title: siteConfig.sections.eventos.title,
  description: siteConfig.sections.eventos.description,
};

const { title, tagline, description, paragraphs, services, cta } = siteConfig.sections.eventos;

// ── Cargá tus archivos en /public/eventos/ y ponelos acá ─────────
// videoSrc: ruta al video vertical 9:16 (ej. "/eventos/promo.mp4")
// leftImages / rightImages: hasta 4 imágenes en cada tira lateral
const videoSrc: string | undefined = "/eventos/promo.mp4";
const leftImages: (string | undefined)[] = [
  "/eventos/eventos-1.jpg",
  "/eventos/eventos-1.jpg",
  "/eventos/eventos-1.jpg",
  "/eventos/eventos-1.jpg",
];
const rightImages: (string | undefined)[] = [
  "/eventos/eventos-1.jpg",
  "/eventos/eventos-1.jpg",
  "/eventos/eventos-1.jpg",
  "/eventos/eventos-1.jpg",
];

export default function EventosPage() {
  return (
    <>
      <SectionHero title={title} tagline={tagline} />

      {/* Description */}
      <FadeInSection>
        <section className="bg-night-950 py-10 px-4 border-b border-white/5">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-[var(--text-secondary)] text-lg md:text-xl leading-relaxed">
              {description}
            </p>
          </div>
        </section>
      </FadeInSection>

      {/* ── Creative gallery ── */}
      <section className="bg-night-950 py-12 border-b border-white/5">
        <FadeInSection>
          <div className="text-center px-4 mb-8">
            <p className="text-gold text-xs tracking-[0.35em] uppercase mb-3">Galería</p>
            <h2 className="font-serif text-3xl md:text-4xl text-cream">El espacio en imágenes</h2>
          </div>
        </FadeInSection>
        <EventosGallery
          videoSrc={videoSrc}
          leftImages={leftImages}
          rightImages={rightImages}
        />
      </section>

      {/* Body copy */}
      <section className="bg-night-950 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-6">
            {paragraphs.map((para, i) => (
              <FadeInSection key={i} delay={i * 100}>
                <p className="text-[var(--text-secondary)] text-base md:text-lg leading-relaxed tracking-wide">
                  {para}
                </p>
              </FadeInSection>
            ))}
          </div>

          {/* Services */}
          {services && services.length > 0 && (
            <FadeInSection delay={300}>
              <div className="mt-10 pt-10 border-t border-white/5">
                <div className="w-8 h-px bg-gold mb-6" />
                <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3">
                  Servicios incluidos
                </p>
                <h2 className="font-serif text-2xl md:text-3xl text-cream mb-6">
                  ¿Qué ofrecemos?
                </h2>
                <ul className="space-y-3">
                  {[...services].map((service, i) => (
                    <FadeInSection key={i} delay={i * 80}>
                      <li className="flex items-start gap-4 text-[var(--text-secondary)] text-base leading-relaxed">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                        {service}
                      </li>
                    </FadeInSection>
                  ))}
                </ul>
              </div>
            </FadeInSection>
          )}
        </div>
      </section>

      <ContactCTA ctaText={cta} />
    </>
  );
}
