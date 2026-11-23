"use client";

import { useEffect, useRef } from "react";

/**
 * Video de fondo: siempre sin sonido y en loop.
 * Si la persona pidió menos movimiento en su sistema, queda quieto en el primer cuadro.
 */
export function VideoFondo({ src, className = "" }: { src: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const consulta = window.matchMedia("(prefers-reduced-motion: reduce)");
    const aplicar = () => {
      if (consulta.matches) video.pause();
      else video.play().catch(() => {});
    };
    aplicar();
    consulta.addEventListener("change", aplicar);
    return () => consulta.removeEventListener("change", aplicar);
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      src={src}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
    />
  );
}
