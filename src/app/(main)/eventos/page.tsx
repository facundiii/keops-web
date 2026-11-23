import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { SectionHero } from "@/components/SectionHero";
import { ContactCTA } from "@/components/ContactCTA";
import { FadeInSection } from "@/components/FadeInSection";
import { EventosGallery } from "@/components/EventosGallery";
import { PhotoGallery } from "@/components/PhotoGallery";

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
  "/eventos/eventos-3.jpg",
  "/eventos/eventos-5.jpg",
  "/eventos/eventos-7.jpg",
  "/eventos/eventos-9.jpg",
];
const rightImages: (string | undefined)[] = [
  "/eventos/eventos-2.jpg",
  "/eventos/eventos-4.jpg",
  "/eventos/eventos-6.jpg",
  "/eventos/eventos-8.jpg",
  "/eventos/eventos-1.jpg",
];

export default function EventosPage() {
  return (
    <>
      <SectionHero title={title} tagline={tagline} />

      {/* Description */}
      <FadeInSection>
        <section className="bg-negro py-10 px-4 border-b border-piedra">
          <div className="max-w-3xl mx-auto text-center">
            <p className="cuerpo text-arena">
              {description}
            </p>
          </div>
        </section>
      </FadeInSection>

      {/* ── Creative gallery ── */}
      <section className="bg-negro py-12 border-b border-piedra">
        <FadeInSection>
          <div className="text-center px-4 mb-8">
            <p className="antetitulo mb-3">Galería</p>
            <h2 className="titulo-2 text-marfil">El espacio en imágenes</h2>
          </div>
        </FadeInSection>
        <EventosGallery
          videoSrc={videoSrc}
          leftImages={leftImages}
          rightImages={rightImages}
        />
      </section>

      {/* ── Photo gallery ── */}
      <section className="bg-negro py-12 px-4 border-b border-piedra">
        <FadeInSection>
          <div className="text-center mb-8">
            <p className="antetitulo mb-3">Fotos</p>
            <h2 className="titulo-2 text-marfil">Mirá en detalle lo que tenemos para ofrecerte</h2>
          </div>
        </FadeInSection>
        <div className="max-w-5xl mx-auto">
          <PhotoGallery
            images={[
              "/eventos/eventos-1.jpg",
              "/eventos/eventos-2.jpg",
              "/eventos/eventos-3.jpg",
              "/eventos/eventos-4.jpg",
              "/eventos/eventos-5.jpg",
              "/eventos/eventos-6.jpg",
              "/eventos/eventos-7.jpg",
              "/eventos/eventos-8.jpg",
              "/eventos/eventos-9.jpg",
            ]}
          />
        </div>
      </section>

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

          {/* Services */}
          {services && services.length > 0 && (
            <FadeInSection delay={300}>
              <div className="mt-10 pt-10 border-t border-piedra">
                <div className="w-8 h-px bg-oro mb-6" />
                <p className="antetitulo mb-3">
                  Servicios incluidos
                </p>
                <h2 className="titulo-2 text-marfil mb-6">
                  ¿Qué ofrecemos?
                </h2>
                <ul className="space-y-3">
                  {[...services].map((service, i) => (
                    <FadeInSection key={i} delay={i * 80}>
                      <li className="flex items-start gap-4 cuerpo text-arena">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-oro shrink-0" />
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

      <ContactCTA linea="eventos" />
    </>
  );
}
