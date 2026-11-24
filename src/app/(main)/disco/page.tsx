import type { Metadata } from "next";
import { disco } from "@/config/disco";
import { cartelera as noches } from "@/config/cartelera";
import { fotos } from "@/config/fotos";
import { nochesDeEjemplo } from "@/config/ejemplos";
import { MOSTRAR_EJEMPLOS, galeriaDeEjemplo, listaConEjemplo } from "@/lib/ejemplo";
import { Encabezado } from "@/components/Encabezado";
import { Seccion, TituloSeccion } from "@/components/ui/Seccion";
import { Cartelera } from "@/components/Cartelera";
import { TicketSection } from "@/components/TicketSection";
import { ANCLA_ENTRADAS } from "@/components/EnlaceEntrada";
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
  // Con la cartelera vacía, en desarrollo se muestran noches de ejemplo.
  const agenda = listaConEjemplo(noches, MOSTRAR_EJEMPLOS ? nochesDeEjemplo() : []);

  return (
    <>
      <Encabezado
        antetitulo={encabezado.antetitulo}
        titulo={encabezado.titulo}
        bajada={encabezado.bajada}
        boton={encabezado.boton || undefined}
        botonHref={`#${ANCLA_ENTRADAS}`}
        foto={foto?.src}
        fotoAlt={foto?.alt}
        fotoPosicion={foto?.posicion}
      />

      {/* Cartelera: las fechas pasadas se ocultan solas */}
      <Seccion id="cartelera">
        <FadeInSection>
          <TituloSeccion antetitulo={cartelera.antetitulo} titulo={cartelera.titulo} />
        </FadeInSection>
        <Cartelera noches={agenda.datos} esEjemplo={agenda.esEjemplo} />
      </Seccion>

      {/* Comprar entrada */}
      <TicketSection />

      {/* Galería: oculta hasta tener fotos */}
      <BloqueGaleria titulo={galeria.titulo} medios={galeria.medios} ejemplo={galeriaDeEjemplo()} />

      <BloqueFaq grupo="disco" />

      <ContactCTA title={contacto.titulo} subtitle={contacto.bajada} linea="disco" />
    </>
  );
}
