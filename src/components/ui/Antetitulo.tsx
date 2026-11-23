import type { ReactNode } from "react";

/** Texto corto en mayúsculas y oro que va arriba de un título. */
export function Antetitulo({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`antetitulo ${className}`.trim()}>{children}</p>;
}
