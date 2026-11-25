"use client";

import { useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

/**
 * Video de fondo de un encabezado: sin sonido, en loop, con su primer cuadro mientras carga.
 * Lo que se mueve solo se puede frenar: el botón queda en la esquina de abajo a la derecha.
 */
export function VideoPortada({ src, poster, className = "" }: { src: string; poster: string; className?: string }) {
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
      <video
        ref={video}
        className={className}
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        disablePictureInPicture
        aria-hidden="true"
      />
      <button
        type="button"
        onClick={alternar}
        aria-label={enPausa ? "Reanudar el video" : "Pausar el video"}
        className="absolute bottom-4 right-4 z-20 flex items-center justify-center min-h-[44px] min-w-[44px] rounded-full border border-piedra bg-negro/70 text-marfil transition-colors duration-300 hover:border-oro hover:text-oro"
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
