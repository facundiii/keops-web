/** Hasta este ancho se usa la versión vertical de un video de fondo, si la hay (el corte `md` de Tailwind) */
export const SOLO_CELULAR = "(max-width: 767px)";

/**
 * Las dos versiones de un video de fondo cuyo original es vertical: la franja horizontal para compu
 * y tablet, y el cuadro vertical para celular. El navegador elige una según el ancho de la pantalla
 * y baja solo esa. Va adentro de un <video> sin `src`.
 */
export function FuentesVideo({ src, celular }: { src: string; celular: string }) {
  return (
    <>
      <source src={celular} media={SOLO_CELULAR} type="video/mp4" />
      <source src={src} type="video/mp4" />
    </>
  );
}
