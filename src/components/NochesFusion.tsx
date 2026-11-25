"use client";

import Image from "next/image";
import type { NocheFusion } from "@/config/fusion";
import { fechaLarga } from "@/lib/fechas";
import { useVigentes } from "@/lib/useVigentes";
import { claseBoton } from "@/components/ui/Boton";
import { EtiquetaEjemplo } from "@/components/ui/EtiquetaEjemplo";
import { SinFechas } from "@/components/SinFechas";

interface NochesFusionProps {
  noches: NocheFusion[];
  /** Link general de Fusion, para las noches que no tienen link propio */
  url: string;
  /** Aviso cuando no hay fechas */
  sinFechas: string;
  /** true cuando las noches son de ejemplo (solo en desarrollo) */
  esEjemplo?: boolean;
}

/** Próximas noches Fusion, con botón para comprar la entrada. Las fechas pasadas se ocultan solas. */
export function NochesFusion({ noches, url, sinFechas, esEjemplo = false }: NochesFusionProps) {
  const vigentes = useVigentes(noches);

  if (noches.length === 0 || vigentes?.length === 0) return <SinFechas texto={sinFechas} conInstagram={false} />;

  // Hay noches, pero todavía no se sabe la fecha de hoy: se reserva el lugar.
  if (vigentes === null) return <div className="min-h-[120px]" aria-hidden="true" />;

  return (
    <>
      {esEjemplo && <EtiquetaEjemplo className="mb-5" />}
      <ul className="border-b border-piedra">
        {vigentes.map((noche) => {
          const link = noche.urlEntradas || url;
          return (
            <li
              key={noche.id}
              className="border-t border-piedra py-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-4 lg:gap-6">
                {/* El flyer de la noche, chico, al lado de los datos */}
                {noche.flyer && (
                  <div className="relative w-20 lg:w-24 aspect-[9/16] shrink-0 overflow-hidden rounded-xl border border-piedra bg-negro">
                    <Image
                      src={noche.flyer}
                      alt={`Arte de ${noche.nombre}`}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <p className="antetitulo mb-2">{fechaLarga(noche.fecha)}</p>
                  <h3 className="titulo-3 text-marfil">{noche.nombre}</h3>
                  {noche.lugar && <p className="texto-chico text-arena mt-1">{noche.lugar}</p>}
                </div>
              </div>
              {noche.agotado ? (
                <span className={claseBoton("secundario", "opacity-50 shrink-0")} aria-disabled="true">
                  Agotado
                </span>
              ) : (
                link && (
                  <a
                    href={link}
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
    </>
  );
}
