import type { Metadata } from "next";
import { disco } from "@/config/disco";
import { fotos } from "@/config/fotos";
import { Encabezado } from "@/components/Encabezado";
import { Seccion, TituloSeccion } from "@/components/ui/Seccion";
import { Cartelera } from "@/components/Cartelera";
import { TicketSection } from "@/components/TicketSection";
import { BloqueGaleria } from "@/components/BloqueGaleria";
import { BloqueFaq } from "@/components/BloqueFaq";
import { ContactCTA } from "@/components/ContactCTA";
import { FadeInSection } from "@/components/FadeInSection";

export const metadata: Metadata = {
  title: disco.meta.titulo,
  description: disco.meta.descripcion,
};

export default function DiscoPage() {
  const { encabezado, cartelera, galeria, contacto } = disco;
  const foto = fotos.disco.encabezado;

  return (
    <>
      <Encabezado
        antetitulo={encabezado.antetitulo}
        titulo={encabezado.titulo}
        bajada={encabezado.bajada}
        foto={foto?.src}
        fotoAlt={foto?.alt}
        fotoPosicion={foto?.posicion}
      />

      {/* Cartelera: las fechas pasadas se ocultan solas */}
      <Seccion id="cartelera">
        <FadeInSection>
          <TituloSeccion antetitulo={cartelera.antetitulo} titulo={cartelera.titulo} />
        </FadeInSection>
        <Cartelera />
      </Seccion>

      {/* Comprar entrada */}
      <TicketSection />

      {/* Galería: oculta hasta tener fotos */}
      <BloqueGaleria titulo={galeria.titulo} medios={galeria.medios} />

      <BloqueFaq grupo="disco" />

      <ContactCTA title={contacto.titulo} subtitle={contacto.bajada} linea="disco" />
    </>
  );
}
