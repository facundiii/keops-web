"use client";

import { useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { FuentesVideo, SOLO_CELULAR } from "@/components/FuentesVideo";

interface VideoPortadaProps {
  src: string;
  poster: string;
  /** Versión vertical del mismo video, solo para celular: ver `VideoPortada` en config/fotos.ts */
  celular?: { src: string; poster: string };
  className?: string;
}

/**
 * Video de fondo de un encabezado: sin sonido, en loop, con su primer cuadro mientras carga.
 * Lo que se mueve solo se puede frenar: la pausa aparece con el foco del teclado, abajo a la derecha.
 * Con el mouse no se ve, porque la primera vista de cada página va sin botones.
 *
 * Con `celular`, el navegador elige el archivo según el ancho de la pantalla (<source media>):
 * el celular baja solo el vertical y la compu, solo el horizontal. El primer cuadro va en un <picture>
 * detrás del video, que es transparente hasta que carga, porque `poster` no puede cambiar según el ancho.
 */
export function VideoPortada({ src, poster, celular, className = "" }: VideoPortadaProps) {
  const video = useRef<HTMLVideoElement>(null);
  const [enPausa, setEnPausa] = useState(false);

  const alternar = () => {
    const v = video.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
      setEnPausa(false);
    } else {
      v.pause();
      setEnPausa(true);
    }
  };

  return (
    <>
      {celular && (
        <picture>
          <source media={SOLO_CELULAR} srcSet={celular.poster} />
          <img src={poster} alt="" aria-hidden="true" className={className} />
        </picture>
      )}
      <video
        ref={video}
        className={className}
        src={celular ? undefined : src}
        poster={celular ? undefined : poster}
        autoPlay
        muted
        loop
        playsInline
        disablePictureInPicture
        aria-hidden="true"
      >
        {celular && <FuentesVideo src={src} celular={celular.src} />}
      </video>
      <button
        type="button"
        onClick={alternar}
        aria-label={enPausa ? "Reanudar el video" : "Pausar el video"}
        // La primera vista no lleva botones: la pausa aparece solo con el foco del teclado
        className="pausa-portada absolute bottom-4 right-4 z-20 flex items-center justify-center min-h-[44px] min-w-[44px] rounded-full border border-piedra bg-negro/70 text-marfil transition-colors duration-300 hover:border-oro hover:text-oro"
      >
        {enPausa ? (
          <Play size={20} strokeWidth={1.5} aria-hidden="true" />
        ) : (
          <Pause size={20} strokeWidth={1.5} aria-hidden="true" />
        )}
      </button>
    </>
  );
}
