"use client";

import { fusion } from "@/config/fusion";
import { fechaLarga } from "@/lib/fechas";
import { useVigentes } from "@/lib/useVigentes";
import { claseBoton } from "@/components/ui/Boton";
import { SinFechas } from "@/components/SinFechas";

/** Próximas noches Fusion, con botón para comprar la entrada. Las fechas pasadas se ocultan solas. */
export function NochesFusion() {
  const { noches, sinFechas } = fusion.tickets;
  const vigentes = useVigentes(noches);

  if (noches.length === 0 || vigentes?.length === 0) return <SinFechas texto={sinFechas} conInstagram={false} />;

  // Hay noches, pero todavía no se sabe la fecha de hoy: se reserva el lugar.
  if (vigentes === null) return <div className="min-h-[120px]" aria-hidden="true" />;

  return (
    <ul className="border-b border-piedra">
      {vigentes.map((noche) => {
        const url = noche.urlEntradas || fusion.url;
        return (
          <li
            key={noche.id}
            className="border-t border-piedra py-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="antetitulo mb-2">{fechaLarga(noche.fecha)}</p>
              <h3 className="titulo-3 text-marfil">{noche.nombre}</h3>
              {noche.lugar && <p className="texto-chico text-arena mt-1">{noche.lugar}</p>}
            </div>
            {noche.agotado ? (
              <span className={claseBoton("secundario", "opacity-50 shrink-0")} aria-disabled="true">
                Agotado
              </span>
            ) : (
              url && (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={claseBoton("principal", "shrink-0")}
                >
                  Comprar entrada
                </a>
              )
            )}
          </li>
        );
      })}
    </ul>
  );
}
