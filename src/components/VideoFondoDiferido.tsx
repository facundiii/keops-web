"use client";

import { useSyncExternalStore } from "react";

const sinSuscripcion = () => () => {};

/**
 * Como VideoFondo, pero el archivo se pide recién en el navegador, después de cargar.
 * Sirve para un video que viene en el HTML oculto (la home normal mientras dura el aniversario):
 * si esa versión no es la que corresponde, se desmonta antes de pedir el video.
 */
export function VideoFondoDiferido({ src, className = "" }: { src: string; className?: string }) {
  const enElNavegador = useSyncExternalStore(sinSuscripcion, () => true, () => false);
  return (
    <video
      className={className}
      src={enElNavegador ? src : undefined}
      autoPlay
      muted
      loop
      playsInline
      disablePictureInPicture
      aria-hidden="true"
    />
  );
}
