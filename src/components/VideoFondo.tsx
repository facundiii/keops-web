import { FuentesVideo } from "@/components/FuentesVideo";

/**
 * Video de fondo: siempre sin sonido, en loop y sin controles.
 * Con `celular` (la versión vertical del mismo video), el navegador elige el archivo según el ancho de la pantalla.
 */
export function VideoFondo({ src, celular, className = "" }: { src: string; celular?: string; className?: string }) {
  return (
    <video
      className={className}
      src={celular ? undefined : src}
      autoPlay
      muted
      loop
      playsInline
      disablePictureInPicture
      aria-hidden="true"
    >
      {celular && <FuentesVideo src={src} celular={celular} />}
    </video>
  );
}
