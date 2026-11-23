import { SectionHero } from "@/components/SectionHero";
import { Carousel, MediaItem } from "@/components/Carousel";
import { ContactCTA } from "@/components/ContactCTA";
import { FadeInSection } from "@/components/FadeInSection";
import type { LineaId } from "@/config/contacto";

interface SubpageTemplateProps {
  title: string;
  tagline: string;
  description: string;
  paragraphs: string[];
  services?: string[];
  cta: string;
  mediaItems?: MediaItem[];
  linea?: LineaId;
}

export function SubpageTemplate({
  title,
  tagline,
  description,
  paragraphs,
  services,
  cta,
  mediaItems = [],
  linea,
}: SubpageTemplateProps) {
  return (
    <>
      <SectionHero title={title} tagline={tagline} />

      {/* Description */}
      <FadeInSection>
        <section className="bg-negro py-10 px-4 border-b border-piedra">
          <div className="max-w-3xl mx-auto text-center">
            <p className="cuerpo text-arena">{description}</p>
          </div>
        </section>
      </FadeInSection>

      {/* Body copy */}
      <section className="bg-negro py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-6">
            {paragraphs.map((para, i) => (
              <FadeInSection key={i} delay={i * 100}>
                <p className="cuerpo text-arena">
                  {para}
                </p>
              </FadeInSection>
            ))}
          </div>

          {services && services.length > 0 && (
            <FadeInSection delay={300}>
              <div className="mt-10 pt-10 border-t border-piedra">
                <div className="w-8 h-px bg-oro mb-6" />
                <p className="antetitulo mb-3">Servicios incluidos</p>
                <h2 className="titulo-2 text-marfil mb-6">¿Qué ofrecemos?</h2>
                <ul className="space-y-3">
                  {services.map((service, i) => (
                    <FadeInSection key={i} delay={i * 80}>
                      <li className="flex items-start gap-4 cuerpo text-arena">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-oro shrink-0" />
                        {service}
                      </li>
                    </FadeInSection>
                  ))}
                </ul>
              </div>
            </FadeInSection>
          )}

          <FadeInSection delay={300}>
            <div className="mt-10 pt-10 border-t border-piedra">
              <div className="w-8 h-px bg-oro mb-6" />
              <p className="antetitulo mb-3">Galería</p>
              <h2 className="titulo-2 text-marfil mb-8">
                Conocé el espacio
              </h2>
              <Carousel items={mediaItems} autoplay={mediaItems.length > 1} />
            </div>
          </FadeInSection>
        </div>
      </section>

      <ContactCTA linea={linea} />
    </>
  );
}
