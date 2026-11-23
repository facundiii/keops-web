import { MapPin } from "lucide-react";
import { comoLlegar } from "@/config/comoLlegar";
import { mapa } from "@/config/contacto";
import { Boton } from "@/components/ui/Boton";
import { Seccion } from "@/components/ui/Seccion";
import { FadeInSection } from "@/components/FadeInSection";

/** Sección "Cómo llegar". Los datos vacíos en config/comoLlegar.ts no se muestran. */
export function ComoLlegar() {
  const { titulo, direccion, texto, estacionamiento, transporteContingentes } = comoLlegar;
  const extras = [
    { etiqueta: "Estacionamiento", valor: estacionamiento },
    { etiqueta: "Transporte para contingentes", valor: transporteContingentes },
  ].filter((e) => e.valor.trim() !== "");

  return (
    <Seccion id="como-llegar" ancho="medio">
      <FadeInSection>
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <h2 className="titulo-2 text-marfil mb-6">{titulo}</h2>

            {direccion && (
              <p className="cuerpo text-marfil flex items-start gap-3 mb-4">
                <MapPin size={24} strokeWidth={1.5} aria-hidden="true" className="shrink-0 text-oro mt-0.5" />
                {direccion}
              </p>
            )}

            {texto && <p className="cuerpo text-arena max-w-2xl">{texto}</p>}

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
          </div>

          <div>
            <Boton variante="secundario" href={mapa.url}>
              <MapPin size={20} strokeWidth={1.5} aria-hidden="true" />
              Ver en Google Maps
            </Boton>
          </div>
        </div>
      </FadeInSection>
    </Seccion>
  );
}
