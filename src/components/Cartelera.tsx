"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import type { Noche } from "@/config/cartelera";
import { EtiquetaEjemplo } from "@/components/ui/EtiquetaEjemplo";
import { fechaCorta, fechaLarga } from "@/lib/fechas";
import { useVigentes } from "@/lib/useVigentes";
import { claseBoton } from "@/components/ui/Boton";
import { SinFechas } from "@/components/SinFechas";
import { EnlaceEntrada } from "@/components/EnlaceEntrada";

/** Arte del evento. Sin arte (o si falla la carga), el marco muestra la pirámide y el nombre. */
function Arte({ noche }: { noche: Noche }) {
  const [fallo, setFallo] = useState(false);

  if (!noche.flyer || fallo) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
        <Image src="/logo-piramide.png" alt="" width={96} height={96} className="w-16 h-auto" />
        <p className="titulo-3 text-marfil">{noche.nombre}</p>
      </div>
    );
  }

  return (
    <Image
      src={noche.flyer}
      alt={`Arte de ${noche.nombre}`}
      fill
      sizes="(max-width: 640px) 85vw, (max-width: 1024px) 45vw, 30vw"
      className={noche.flyerAjuste === "fill" ? "object-fill" : "object-cover"}
      onError={() => setFallo(true)}
    />
  );
}

/** Ficha de una noche: arte dentro del marco de Keops, fecha, DJs y botón. */
function Ficha({ noche }: { noche: Noche }) {
  return (
    <article className="h-full flex flex-col rounded-2xl border border-piedra bg-carbon p-3">
      {/* Marco de Keops */}
      <div className="flex items-center justify-between gap-3 px-1 pb-3">
        <span className="flex items-center gap-2">
          <Image src="/logo-piramide.png" alt="" width={40} height={40} className="w-5 h-auto" />
          <span className="antetitulo text-marfil">Keops Disco</span>
        </span>
        {/* Etiqueta de fecha: único uso del color láser */}
        <span className="etiqueta rounded-full bg-laser px-3 py-1 text-negro whitespace-nowrap">
          {fechaCorta(noche.fecha)}
        </span>
      </div>

      <div className="relative aspect-[9/16] rounded-xl overflow-hidden border border-piedra bg-negro">
        <Arte noche={noche} />
      </div>

      <div className="flex flex-1 flex-col px-1 pt-4">
        <h3 className="titulo-3 text-marfil">{noche.nombre}</h3>
        {/* Qué tipo de noche es: va pegado al nombre */}
        {noche.estilo && <p className="texto-chico text-marfil mt-1">{noche.estilo}</p>}
        <p className="texto-chico text-arena mt-2 flex items-center gap-2">
          <Clock size={20} strokeWidth={1.5} aria-hidden="true" className="shrink-0" />
          {fechaLarga(noche.fecha)} · {noche.hora} h
        </p>
        {noche.djs.length > 0 && (
          <ul className="texto-chico text-marfil mt-3 space-y-1">
            {noche.djs.map((dj) => (
              <li key={dj}>{dj}</li>
            ))}
          </ul>
        )}
        <div className="mt-auto pt-4">
          {noche.agotado ? (
            <span className={claseBoton("secundario", "w-full opacity-50")} aria-disabled="true">
              Agotado
            </span>
          ) : (
            <EnlaceEntrada noche={noche} enDisco className={claseBoton("principal", "w-full")}>
              Comprar entrada
            </EnlaceEntrada>
          )}
        </div>
      </div>
    </article>
  );
}

interface CarteleraProps {
  noches: Noche[];
  /** true cuando las noches son de ejemplo (solo en desarrollo) */
  esEjemplo?: boolean;
}

/** Cartelera de Disco. Las fechas pasadas se ocultan solas. */
export function Cartelera({ noches, esEjemplo = false }: CarteleraProps) {
  const vigentes = useVigentes(noches);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start" });
  const [seleccionado, setSeleccionado] = useState(0);
  const [puntos, setPuntos] = useState<number[]>([]);
  const [hayAnterior, setHayAnterior] = useState(false);
  const [haySiguiente, setHaySiguiente] = useState(false);

  const alIniciar = useCallback((api: NonNullable<typeof emblaApi>) => {
    setPuntos(api.scrollSnapList());
  }, []);

  const alSeleccionar = useCallback((api: NonNullable<typeof emblaApi>) => {
    setSeleccionado(api.selectedScrollSnap());
    setHayAnterior(api.canScrollPrev());
    setHaySiguiente(api.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    // Lectura inicial del estado del carrusel (sistema externo): patrón oficial de Embla.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    alIniciar(emblaApi);
    alSeleccionar(emblaApi);
    emblaApi.on("reInit", alIniciar).on("reInit", alSeleccionar).on("select", alSeleccionar);
    return () => {
      emblaApi.off("reInit", alIniciar).off("reInit", alSeleccionar).off("select", alSeleccionar);
    };
  }, [emblaApi, alIniciar, alSeleccionar]);

  // Sin noches cargadas, o todas pasadas: aviso con el Instagram.
  if (noches.length === 0 || vigentes?.length === 0) return <SinFechas />;

  // Hay noches, pero todavía no se sabe la fecha de hoy: se reserva el lugar.
  if (vigentes === null) return <div className="min-h-[520px]" aria-hidden="true" />;

  const claseFlecha =
    "absolute top-[40%] -translate-y-1/2 z-10 flex items-center justify-center w-11 h-11 rounded-full bg-negro border border-piedra text-marfil hover:text-oro hover:border-oro transition-colors duration-200 disabled:opacity-0";

  return (
    <div className="relative">
      {esEjemplo && <EtiquetaEjemplo className="mb-4" />}
      {vigentes.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => emblaApi?.scrollPrev()}
            disabled={!hayAnterior}
            className={`${claseFlecha} -left-3 lg:-left-5`}
            aria-label="Noches anteriores"
          >
            <ChevronLeft size={24} strokeWidth={1.5} />
          </button>
          <button
            type="button"
            onClick={() => emblaApi?.scrollNext()}
            disabled={!haySiguiente}
            className={`${claseFlecha} -right-3 lg:-right-5`}
            aria-label="Noches siguientes"
          >
            <ChevronRight size={24} strokeWidth={1.5} />
          </button>
        </>
      )}

      <div className="overflow-hidden" ref={emblaRef}>
        <ul className="flex gap-4 lg:gap-6">
          {vigentes.map((noche) => (
            <li
              key={noche.id}
              className="flex-[0_0_85%] sm:flex-[0_0_calc(50%-8px)] lg:flex-[0_0_calc(33.333%-16px)] min-w-0"
            >
              <Ficha noche={noche} />
            </li>
          ))}
        </ul>
      </div>

      {puntos.length > 1 && (
        <div className="flex justify-center mt-4">
          {puntos.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => emblaApi?.scrollTo(i)}
              className="flex items-center justify-center w-8 h-11"
              aria-label={`Ir al grupo ${i + 1} de noches`}
              aria-current={i === seleccionado ? "true" : undefined}
            >
              <span
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === seleccionado ? "bg-oro w-6" : "bg-piedra w-1.5"
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
