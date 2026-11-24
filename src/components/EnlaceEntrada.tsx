import Link from "next/link";
import type { ReactNode } from "react";
import type { Noche } from "@/config/cartelera";

/** id de la sección "Comprá tu entrada" de Disco, la de los links de la app. */
export const ANCLA_ENTRADAS = "comprar-entrada";

interface EnlaceEntradaProps {
  noche: Noche;
  /** true en la página Disco: sin link propio, baja a la sección de la app sin cambiar de página. */
  enDisco?: boolean;
  className?: string;
  children: ReactNode;
}

/**
 * "Comprar entrada" de una noche: abre su link propio (urlEntradas) si lo tiene;
 * si no, lleva a la sección de la app en Disco.
 */
export function EnlaceEntrada({ noche, enDisco = false, className, children }: EnlaceEntradaProps) {
  const etiqueta = `Comprar entrada: ${noche.nombre}`;
  const propio = noche.urlEntradas?.trim();

  if (propio) {
    return (
      <a href={propio} target="_blank" rel="noopener noreferrer" className={className} aria-label={etiqueta}>
        {children}
      </a>
    );
  }

  if (enDisco) {
    return (
      <a href={`#${ANCLA_ENTRADAS}`} className={className} aria-label={etiqueta}>
        {children}
      </a>
    );
  }

  return (
    <Link href={`/disco#${ANCLA_ENTRADAS}`} className={className} aria-label={etiqueta}>
      {children}
    </Link>
  );
}
