"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type MouseEvent, type TouchEvent } from "react";
import { ChevronLeft, ChevronRight, Loader2, X } from "lucide-react";

export type MedioVisor =
  | { tipo: "imagen"; src: string; alt: string }
  | { tipo: "video"; src: string; titulo?: string };

interface VisorProps {
  medios: MedioVisor[];
  /** El medio abierto; null = visor cerrado */
  indice: number | null;
  alCambiar: (indice: number) => void;
  alCerrar: () => void;
}

const claseControl =
  "flex items-center justify-center w-11 h-11 rounded-full border border-piedra bg-carbon text-marfil transition-colors duration-200 hover:border-oro hover:text-oro";

/**
 * Visor a pantalla completa de las galerías, sobre un <dialog> nativo:
 * el foco queda adentro mientras está abierto, Escape lo cierra y al cerrarlo
 * el foco vuelve a la foto que lo abrió. Las flechas del teclado y deslizar el dedo pasan de foto.
 */
export function Visor({ medios, indice, alCambiar, alCerrar }: VisorProps) {
  const dialogo = useRef<HTMLDialogElement>(null);
  const botonCerrar = useRef<HTMLButtonElement>(null);
  const inicioToque = useRef<number | null>(null);
  const [cargada, setCargada] = useState<string | null>(null);

  const abierto = indice !== null;
  const total = medios.length;
  const medio = indice !== null ? medios[indice] : null;

  // Abre el diálogo como modal y lo cierra en la limpieza (patrón de la documentación de React).
  useEffect(() => {
    if (!abierto) return;
    const el = dialogo.current;
    if (!el) return;
    const anterior = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    el.showModal();
    botonCerrar.current?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      el.close();
      document.body.style.overflow = "";
      anterior?.focus();
    };
  }, [abierto]);

  // Precarga las fotos vecinas para que pasar de foto sea instantáneo.
  useEffect(() => {
    if (indice === null || total < 2) return;
    for (const i of [(indice + 1) % total, (indice - 1 + total) % total]) {
      const vecino = medios[i];
      if (vecino.tipo === "imagen") {
        const img = new window.Image();
        img.src = vecino.src;
      }
    }
  }, [indice, medios, total]);

  const ir = (paso: number) => {
    if (indice === null || total < 2) return;
    alCambiar((indice + paso + total) % total);
  };

  const alTeclear = (e: KeyboardEvent<HTMLDialogElement>) => {
    // Dentro del video, las flechas adelantan y atrasan: no se tocan.
    if (e.target instanceof HTMLVideoElement) return;
    if (e.key === "ArrowLeft") ir(-1);
    if (e.key === "ArrowRight") ir(1);
  };

  // Un clic en el fondo (no en la foto ni en los controles) cierra.
  const alClic = (e: MouseEvent<HTMLDialogElement>) => {
    if (e.target instanceof HTMLElement && e.target.dataset.fondo !== undefined) alCerrar();
  };

  const alEmpezarToque = (e: TouchEvent) => {
    inicioToque.current = e.touches[0].clientX;
  };
  const alTerminarToque = (e: TouchEvent) => {
    if (inicioToque.current === null) return;
    const delta = e.changedTouches[0].clientX - inicioToque.current;
    if (Math.abs(delta) > 50) ir(delta < 0 ? 1 : -1);
    inicioToque.current = null;
  };

  return (
    <dialog
      ref={dialogo}
      aria-label="Galería"
      onClose={alCerrar}
      onKeyDown={alTeclear}
      onClick={alClic}
      onTouchStart={alEmpezarToque}
      onTouchEnd={alTerminarToque}
      className="m-0 h-full max-h-none w-full max-w-none border-0 bg-negro/95 p-0 text-marfil"
    >
      {medio && indice !== null && (
        <>
          <button ref={botonCerrar} type="button" onClick={alCerrar} aria-label="Cerrar" className={`${claseControl} absolute right-4 top-4 z-10`}>
            <X size={24} strokeWidth={1.5} aria-hidden="true" />
          </button>

          {total > 1 && (
            <p aria-live="polite" className="texto-chico absolute left-1/2 top-6 -translate-x-1/2 tracking-[0.2em] text-arena">
              {indice + 1} / {total}
            </p>
          )}

          <div data-fondo="" className="flex h-full w-full items-center justify-center px-16 py-20 sm:px-24">
            {medio.tipo === "video" ? (
              <video
                key={medio.src}
                src={medio.src}
                controls
                autoPlay
                muted
                playsInline
                aria-label={medio.titulo || "Video de la galería"}
                onLoadedMetadata={(e) => {
                  e.currentTarget.volume = 0.05;
                }}
                className="max-h-full max-w-full rounded-2xl"
              />
            ) : (
              <>
                {cargada !== medio.src && (
                  <Loader2
                    size={32}
                    strokeWidth={1.5}
                    aria-hidden="true"
                    className="pointer-events-none absolute animate-spin text-oro"
                  />
                )}
                {/* <img> nativo: next/image necesita medidas fijas y acá la foto se adapta a la pantalla */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  key={medio.src}
                  src={medio.src}
                  alt={medio.alt}
                  onLoad={() => setCargada(medio.src)}
                  className={`max-h-full max-w-full rounded-xl object-contain transition-opacity duration-200 ${
                    cargada === medio.src ? "opacity-100" : "opacity-0"
                  }`}
                />
              </>
            )}
          </div>

          {total > 1 && (
            <>
              <button
                type="button"
                onClick={() => ir(-1)}
                aria-label="Anterior"
                className={`${claseControl} absolute left-2 top-1/2 z-10 -translate-y-1/2 sm:left-4`}
              >
                <ChevronLeft size={24} strokeWidth={1.5} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => ir(1)}
                aria-label="Siguiente"
                className={`${claseControl} absolute right-2 top-1/2 z-10 -translate-y-1/2 sm:right-4`}
              >
                <ChevronRight size={24} strokeWidth={1.5} aria-hidden="true" />
              </button>

              {/* Posición en la galería: solo visual, el número de arriba ya lo anuncia */}
              <div aria-hidden="true" className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-1.5">
                {medios.map((m, i) => (
                  <span
                    key={m.src + i}
                    className={`h-1.5 rounded-full transition-all duration-200 ${i === indice ? "w-4 bg-oro" : "w-1.5 bg-piedra"}`}
                  />
                ))}
              </div>
            </>
          )}
        </>
      )}
    </dialog>
  );
}
