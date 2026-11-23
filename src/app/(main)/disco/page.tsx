import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Encabezado } from "@/components/Encabezado";
import { Seccion, TituloSeccion } from "@/components/ui/Seccion";
import { ContactCTA } from "@/components/ContactCTA";
import { FadeInSection } from "@/components/FadeInSection";
import { UpcomingEvents } from "@/components/UpcomingEvents";
import { TicketSection } from "@/components/TicketSection";

export const metadata: Metadata = {
  title: siteConfig.sections.disco.title,
  description: siteConfig.sections.disco.description,
};

const { title, tagline, description, paragraphs } = siteConfig.sections.disco;

export default function DiscoPage() {
  return (
    <>
      <Encabezado antetitulo={title} titulo={tagline} bajada={description} />

      {/* Cartelera */}
      <Seccion ancho="medio">
        <FadeInSection>
          <TituloSeccion antetitulo="Cartelera" titulo="La agenda de la pirámide" />
        </FadeInSection>
        <FadeInSection delay={100}>
          <UpcomingEvents events={siteConfig.upcomingEvents} />
        </FadeInSection>
      </Seccion>

      {/* Comprar entrada */}
      <TicketSection />

      {/* Texto */}
      <Seccion ancho="angosto">
        <div className="space-y-6">
          {paragraphs.map((para, i) => (
            <FadeInSection key={i} delay={i * 100}>
              <p className="cuerpo text-arena">{para}</p>
            </FadeInSection>
          ))}
        </div>
      </Seccion>

      {/* La galería vuelve cuando haya fotos (Etapa 4). */}

      <ContactCTA linea="disco" />
    </>
  );
}
