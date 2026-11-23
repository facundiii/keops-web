/**
 * Etiqueta que marca contenido que solo se ve en desarrollo:
 * de ejemplo, sin confirmar o sin autorizar. Nunca aparece en el sitio publicado.
 */
export function EtiquetaEjemplo({
  texto = "De ejemplo: no se publica",
  className = "",
}: {
  texto?: string;
  className?: string;
}) {
  return (
    <span
      className={`texto-chico inline-block rounded-full border border-piedra bg-negro/90 px-3 py-1 text-arena ${className}`.trim()}
    >
      {texto}
    </span>
  );
}
