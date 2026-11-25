"use client";

import { useSyncExternalStore } from "react";
import { FuentesVideo } from "@/components/FuentesVideo";

const sinSuscripcion = () => () => {};

/**
 * Como VideoFondo, pero el archivo se pide recién en el navegador, después de cargar.
 * Sirve para un video que viene en el HTML oculto (la home normal mientras dura el aniversario):
 * si esa versión no es la que corresponde, se desmonta antes de pedir el video.
 */
export function VideoFondoDiferido({ src, celular, className = "" }: { src: string; celular?: string; className?: string }) {
  const enElNavegador = useSyncExternalStore(sinSuscripcion, () => true, () => false);
  return (
    <video
      className={className}
      src={enElNavegador && !celular ? src : undefined}
      autoPlay
      muted
      loop
      playsInline
      disablePictureInPicture
      aria-hidden="true"
    >
      {enElNavegador && celular && <FuentesVideo src={src} celular={celular} />}
    </video>
  );
}
