import { SectionHero } from "@/components/SectionHero";
import { Carousel, MediaItem } from "@/components/Carousel";
import { ContactCTA } from "@/components/ContactCTA";
import { FadeInSection } from "@/components/FadeInSection";

interface SubpageTemplateProps {
  title: string;
  tagline: string;
  description: string;
  paragraphs: string[];
  services?: string[];
  cta: string;
  mediaItems?: MediaItem[];
}

export function SubpageTemplate({
  title,
  tagline,
  description,
  paragraphs,
  services,
  cta,
  mediaItems = [],
}: SubpageTemplateProps) {
  return (
    <>
      <SectionHero title={title} tagline={tagline} />

      {/* Description */}
      <FadeInSection>
        <section className="bg-night-950 py-10 px-4 border-b border-white/5">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-white/60 text-lg md:text-xl leading-relaxed">{description}</p>
          </div>
        </section>
      </FadeInSection>

      {/* Body copy */}
      <section className="bg-night-950 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-6">
            {paragraphs.map((para, i) => (
              <FadeInSection key={i} delay={i * 100}>
                <p className="text-white/55 text-base md:text-lg leading-relaxed tracking-wide">
                  {para}
                </p>
              </FadeInSection>
            ))}
          </div>

          {services && services.length > 0 && (
            <FadeInSection delay={300}>
              <div className="mt-10 pt-10 border-t border-white/5">
                <div className="w-8 h-px bg-gold mb-6" />
                <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3">Servicios incluidos</p>
                <h2 className="font-serif text-2xl md:text-3xl text-white mb-6">¿Qué ofrecemos?</h2>
                <ul className="space-y-3">
                  {services.map((service, i) => (
                    <FadeInSection key={i} delay={i * 80}>
                      <li className="flex items-start gap-4 text-white/60 text-base leading-relaxed">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                        {service}
                      </li>
                    </FadeInSection>
                  ))}
                </ul>
              </div>
            </FadeInSection>
          )}

          <FadeInSection delay={300}>
            <div className="mt-10 pt-10 border-t border-white/5">
              <div className="w-8 h-px bg-gold mb-6" />
              <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3">Galería</p>
              <h2 className="font-serif text-2xl md:text-3xl text-white mb-8">
                Conocé el espacio
              </h2>
              <Carousel items={mediaItems} autoplay={mediaItems.length > 1} />
            </div>
          </FadeInSection>
        </div>
      </section>

      <ContactCTA ctaText={title} />
    </>
  );
}
