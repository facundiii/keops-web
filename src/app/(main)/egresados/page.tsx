import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { SectionHero } from "@/components/SectionHero";
import { ContactCTA } from "@/components/ContactCTA";
import { FadeInSection } from "@/components/FadeInSection";
import { InfiniteSlider } from "@/components/InfiniteSlider";
import { EgresadosGallery, type MediaItem } from "@/components/EgresadosGallery";

export const metadata: Metadata = {
  title: siteConfig.sections.egresados.title,
  description: siteConfig.sections.egresados.description,
};

const { title, tagline, description, paragraphs, services } = siteConfig.sections.egresados;

export default function EgresadosPage() {
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
                  {services.map((service, i) => (
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

      {/* ── Galería de videos e imágenes ── */}
      <section className="bg-night-950 py-12 px-4 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <FadeInSection>
            <div className="text-center mb-10">
              <p className="text-gold text-xs tracking-[0.35em] uppercase mb-3">Galería</p>
              <h2 className="font-serif text-3xl md:text-4xl text-cream">Momentos que quedan para siempre</h2>
            </div>
          </FadeInSection>
          <EgresadosGallery
            items={[
              { type: "video", src: "/egresados/video-1.mp4", label: "Noche de egresados" },
              { type: "video", src: "/egresados/video-2.mp4", label: "Noche de egresados" },
              { type: "video", src: "/egresados/video-3.mp4", label: "Noche de egresados" },
              // Acá van las imágenes cuando las tengas:
              // { type: "image", src: "/egresados/foto-1.jpg" },
            ] satisfies MediaItem[]}
          />
        </div>
      </section>

      {/* Companies trust strip */}
      <FadeInSection>
        <section className="bg-night-950 border-t border-white/5 py-12 px-4">
          <div className="max-w-5xl mx-auto">
            <p className="text-gold text-xs tracking-[0.35em] uppercase mb-4 text-center">
              Empresas que confían en nosotros
            </p>
            <InfiniteSlider />
          </div>
        </section>
      </FadeInSection>

      <ContactCTA
        ctaText={siteConfig.sections.egresados.cta}
        email={siteConfig.contactInfo.egresados.email}
        whatsappUrl={siteConfig.contactInfo.egresados.whatsappUrl}
        whatsappDisplay={siteConfig.contactInfo.egresados.whatsappDisplay}
      />
    </>
  );
}
