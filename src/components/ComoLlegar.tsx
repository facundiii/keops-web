import { MapPin } from "lucide-react";
import { comoLlegar } from "@/config/comoLlegar";
import { mapa } from "@/config/contacto";
import { ejemplos } from "@/config/ejemplos";
import { textoConEjemplo } from "@/lib/ejemplo";
import { Boton } from "@/components/ui/Boton";
import { Seccion } from "@/components/ui/Seccion";
import { EtiquetaEjemplo } from "@/components/ui/EtiquetaEjemplo";
import { FadeInSection } from "@/components/FadeInSection";

/**
 * Sección "Cómo llegar": texto, mapa y el botón "Ver en Google Maps" sobre el mapa.
 * Los datos vacíos en config/comoLlegar.ts no se muestran en el sitio publicado;
 * en desarrollo se completan con datos de ejemplo.
 */
export function ComoLlegar() {
  const { titulo, texto } = comoLlegar;
  const direccion = textoConEjemplo(comoLlegar.direccion, ejemplos.comoLlegar.direccion);
  const estacionamiento = textoConEjemplo(comoLlegar.estacionamiento, ejemplos.comoLlegar.estacionamiento);
  const transporte = textoConEjemplo(comoLlegar.transporteContingentes, ejemplos.comoLlegar.transporteContingentes);

  const extras = [
    { etiqueta: "Estacionamiento", valor: estacionamiento.texto },
    { etiqueta: "Transporte para contingentes", valor: transporte.texto },
  ].filter((e) => e.valor.trim() !== "");
  const hayEjemplos = direccion.esEjemplo || estacionamiento.esEjemplo || transporte.esEjemplo;

  const claseBotonMapa =
    "inline-flex items-center gap-2 min-h-[44px] px-6 rounded-full border border-piedra bg-negro/90 backdrop-blur-sm " +
    "font-sans font-medium text-sm text-marfil whitespace-nowrap transition-colors duration-300 hover:border-oro hover:text-oro";

  return (
    <Seccion id="como-llegar">
      <FadeInSection>
        <h2 className="titulo-2 text-marfil mb-6">{titulo}</h2>

        {direccion.texto && (
          <p className="cuerpo text-marfil flex items-start gap-3 mb-4">
            {/* El ícono se centra con el primer renglón del texto */}
            <span className="flex h-7 shrink-0 items-center text-oro">
              <MapPin size={24} strokeWidth={1.5} aria-hidden="true" />
            </span>
            {direccion.texto}
          </p>
        )}

        {/* Sin ancho máximo: en pantallas anchas entra en una línea */}
        {texto && <p className="cuerpo text-arena">{texto}</p>}

        {extras.length > 0 && (
          <dl className="mt-8 grid gap-6 sm:grid-cols-2 max-w-2xl">
            {extras.map((e) => (
              <div key={e.etiqueta}>
                <dt className="antetitulo mb-2">{e.etiqueta}</dt>
                <dd className="cuerpo text-arena">{e.valor}</dd>
              </div>
            ))}
          </dl>
        )}

        {hayEjemplos && (
          <EtiquetaEjemplo texto="Dirección y datos de ejemplo: no se publican" className="mt-6" />
        )}

        {mapa.incrustado ? (
          /* Mapa con el botón encima */
          <div className="relative mt-10 h-72 md:h-96 rounded-2xl overflow-hidden border border-piedra">
            <iframe
              src={mapa.incrustado}
              title="Ubicación de Keops en Google Maps"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "grayscale(0.4) brightness(0.75) contrast(1.1)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <a
              href={mapa.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`absolute bottom-5 left-1/2 -translate-x-1/2 ${claseBotonMapa}`}
            >
              <MapPin size={20} strokeWidth={1.5} aria-hidden="true" />
              Ver en Google Maps
            </a>
          </div>
        ) : (
          <div className="mt-8">
            <Boton variante="secundario" href={mapa.url}>
              <MapPin size={20} strokeWidth={1.5} aria-hidden="true" />
              Ver en Google Maps
            </Boton>
          </div>
        )}
      </FadeInSection>
    </Seccion>
  );
}
