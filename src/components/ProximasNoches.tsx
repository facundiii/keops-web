"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import type { Noche } from "@/config/cartelera";
import { fechaLarga } from "@/lib/fechas";
import { useVigentes } from "@/lib/useVigentes";
import { claseBoton } from "@/components/ui/Boton";
import { EtiquetaEjemplo } from "@/components/ui/EtiquetaEjemplo";
import { SinFechas } from "@/components/SinFechas";
import { EnlaceEntrada } from "@/components/EnlaceEntrada";

/** Enlace con flecha, como el de las tarjetas de las líneas. 44 px de alto para el dedo. */
const claseEnlace = "inline-flex min-h-[44px] items-center gap-2 texto-boton";

interface ProximasNochesProps {
  noches: Noche[];
  /** Cuántas noches se muestran como máximo */
  cantidad: number;
  boton: string;
  /** true cuando las noches son de ejemplo (solo en desarrollo) */
  esEjemplo?: boolean;
}

/**
 * Las próximas noches de la cartelera (home). Las fechas pasadas no aparecen.
 * Sin fechas, muestra el aviso con el Instagram.
 */
export function ProximasNoches({ noches, cantidad, boton, esEjemplo = false }: ProximasNochesProps) {
  const vigentes = useVigentes(noches);

  // Sin noches cargadas, o todas pasadas
  if (noches.length === 0 || vigentes?.length === 0) return <SinFechas />;

  // Hay noches, pero todavía no se sabe la fecha de hoy: se reserva el lugar.
  if (vigentes === null) return <div className="min-h-[190px]" aria-hidden="true" />;

  return (
    <>
      {esEjemplo && <EtiquetaEjemplo className="mb-4" />}
      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {vigentes.slice(0, cantidad).map((noche) => (
          <li key={noche.id}>
            <article className="h-full flex gap-4 rounded-2xl border border-piedra bg-carbon p-4">
              {noche.flyer && (
                // `self-start`: la miniatura conserva su 9:16 aunque la tarjeta sea más alta; si se estira, recorta el flyer por los costados
                <div className="relative w-24 shrink-0 self-start aspect-[9/16] rounded-lg overflow-hidden border border-piedra">
                  <Image
                    src={noche.flyer}
                    alt={`Arte de ${noche.nombre}`}
                    fill
                    sizes="96px"
                    className={noche.flyerAjuste === "fill" ? "object-fill" : "object-cover"}
                  />
                </div>
              )}
              <div className="flex min-w-0 flex-1 flex-col pt-1">
                <p className="antetitulo mb-2">{fechaLarga(noche.fecha)}</p>
                <h3 className="titulo-3 text-marfil">{noche.nombre}</h3>
                {/* Qué tipo de noche es: va pegado al nombre */}
                {noche.estilo && <p className="texto-chico text-marfil mt-1">{noche.estilo}</p>}
                {noche.djs.length > 0 && <p className="texto-chico text-arena mt-2">{noche.djs.join(" · ")}</p>}
                <p className="texto-chico text-arena mt-2 flex items-center gap-2">
                  <Clock size={20} strokeWidth={1.5} aria-hidden="true" className="shrink-0" />
                  Apertura {noche.hora} h
                </p>
                {/* Un solo paso hasta comprar, sin tener que buscar la noche otra vez en Disco */}
                <div className="mt-auto pt-3">
                  {noche.agotado ? (
                    <p className={`${claseEnlace} text-arena`}>Agotado</p>
                  ) : (
                    <EnlaceEntrada noche={noche} className={`group ${claseEnlace} text-oro`}>
                      Comprar entrada
                      <ArrowRight
                        size={20}
                        strokeWidth={1.5}
                        aria-hidden="true"
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </EnlaceEntrada>
                  )}
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <Link href="/disco" className={claseBoton("secundario")}>
          {boton}
        </Link>
      </div>
    </>
  );
}
