/** Video de fondo: siempre sin sonido, en loop y sin controles. */
export function VideoFondo({ src, className = "" }: { src: string; className?: string }) {
  return (
    <video
      className={className}
      src={src}
      autoPlay
      muted
      loop
      playsInline
      disablePictureInPicture
      aria-hidden="true"
    />
  );
}
