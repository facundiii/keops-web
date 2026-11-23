import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { fusion } from "@/config/fusion";
import { ejemplos, nochesFusionDeEjemplo } from "@/config/ejemplos";
import { MOSTRAR_EJEMPLOS, listaConEjemplo, textoConEjemplo } from "@/lib/ejemplo";
import { EtiquetaEjemplo } from "@/components/ui/EtiquetaEjemplo";
import { Boton } from "@/components/ui/Boton";
import { Seccion, TituloSeccion } from "@/components/ui/Seccion";
import { NochesFusion } from "@/components/NochesFusion";
import { ContactCTA } from "@/components/ContactCTA";
import { FadeInSection } from "@/components/FadeInSection";

export const metadata: Metadata = {
  title: fusion.meta.titulo,
  description: fusion.meta.descripcion,
};

export default function FusionPage() {
  const { logo, texto, textoBoton, discos, tickets, contacto } = fusion;
  // Sin link ni noches cargadas, en desarrollo se muestran los de ejemplo.
  const { texto: url, esEjemplo: urlDeEjemplo } = textoConEjemplo(fusion.url, ejemplos.fusion.url);
  const agenda = listaConEjemplo(tickets.noches, MOSTRAR_EJEMPLOS ? nochesFusionDeEjemplo() : []);

  return (
    <>
      {/* Qué es Fusion */}
      <section className="bg-negro px-4 sm:px-6 pt-32 pb-16 lg:pt-44 lg:pb-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* El archivo del logo mide 168 px de ancho: no se agranda para que no se vea borroso */}
          <Image
            src={logo}
            alt="Fusion"
            width={168}
            height={74}
            priority
            className="mx-auto mb-10 logo-claro animate-fade-in"
          />
          <h1 className="titulo-2 text-marfil animate-fade-in-up">{texto}</h1>
          {url && (
            <div className="mt-9 animate-fade-in-up animate-delay-200">
              <Boton href={url}>
                {textoBoton}
                <ArrowUpRight size={20} strokeWidth={1.5} aria-hidden="true" />
              </Boton>
              {urlDeEjemplo && (
                <div className="mt-4">
                  <EtiquetaEjemplo texto="Link de ejemplo: no se publica" />
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Las tres discos */}
      <Seccion ancho="medio">
        <h2 className="sr-only">Las tres discos de Fusion</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-3">
          {discos.map((disco, i) => (
            <li
              key={disco.nombre}
              className={`flex items-center justify-center px-8 py-8 sm:py-4 border-piedra ${
                i > 0 ? "border-t sm:border-t-0 sm:border-l" : ""
              }`}
            >
              <FadeInSection delay={i * 120}>
                <div className="relative w-44 h-20 lg:w-56 lg:h-24">
                  <Image
                    src={disco.logo}
                    alt={disco.nombre}
                    fill
                    sizes="(max-width: 640px) 176px, 224px"
                    className="object-contain"
                  />
                </div>
              </FadeInSection>
            </li>
          ))}
        </ul>
      </Seccion>

      {/* Tickets */}
      <Seccion id="tickets" ancho="medio">
        <FadeInSection>
          <TituloSeccion antetitulo={tickets.antetitulo} titulo={tickets.titulo} />
        </FadeInSection>
        <NochesFusion noches={agenda.datos} url={url} sinFechas={tickets.sinFechas} esEjemplo={agenda.esEjemplo} />
      </Seccion>

      <ContactCTA title={contacto.titulo} subtitle={contacto.bajada} linea="disco" />
    </>
  );
}
