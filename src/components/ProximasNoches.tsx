"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";
import { proximasNoches } from "@/config/home";
import { cartelera } from "@/config/cartelera";
import { instagram } from "@/config/contacto";
import { fechaLarga } from "@/lib/fechas";
import { useNochesVigentes } from "@/lib/useNochesVigentes";
import { claseBoton } from "@/components/ui/Boton";

/**
 * Las próximas noches de la cartelera (home). Las fechas pasadas no aparecen.
 * Sin fechas, muestra el aviso con el Instagram.
 */
export function ProximasNoches() {
  const vigentes = useNochesVigentes();
  const sinFechas = cartelera.length === 0 || vigentes?.length === 0;

  // Hay noches cargadas pero todavía no se sabe la fecha de hoy:
  // se reserva el lugar para que la página no salte.
  if (!sinFechas && vigentes === null) return <div className="min-h-[96px]" aria-hidden="true" />;

  if (sinFechas || vigentes === null) {
    return (
      <p className="cuerpo text-arena">
        {proximasNoches.sinFechas}{" "}
        <a
          href={instagram.oficial.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-oro underline underline-offset-4 hover:text-oro-profundo transition-colors duration-200"
        >
          {instagram.oficial.usuario}
        </a>
        .
      </p>
    );
  }

  return (
    <>
      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {vigentes.slice(0, proximasNoches.cantidad).map((noche) => (
          <li key={noche.id}>
            <article className="h-full flex gap-5 rounded-2xl border border-piedra bg-carbon p-4">
              {noche.flyer && (
                <div className="relative w-24 shrink-0 aspect-[9/16] rounded-lg overflow-hidden border border-piedra">
                  <Image
                    src={noche.flyer}
                    alt={`Arte de ${noche.nombre}`}
                    fill
                    sizes="96px"
                    className={noche.flyerAjuste === "fill" ? "object-fill" : "object-cover"}
                  />
                </div>
              )}
              <div className="flex min-w-0 flex-col py-1">
                <p className="antetitulo mb-2">{fechaLarga(noche.fecha)}</p>
                <h3 className="titulo-3 text-marfil">{noche.nombre}</h3>
                {noche.djs.length > 0 && <p className="texto-chico text-arena mt-2">{noche.djs.join(" · ")}</p>}
                <p className="texto-chico text-arena mt-2 flex items-center gap-2">
                  <Clock size={20} strokeWidth={1.5} aria-hidden="true" />
                  Apertura {noche.hora} h
                </p>
              </div>
            </article>
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <Link href="/disco" className={claseBoton("secundario")}>
          {proximasNoches.boton}
        </Link>
      </div>
    </>
  );
}
