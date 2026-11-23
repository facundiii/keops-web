// Contenido de ejemplo: sirve para ver cómo queda el sitio mientras faltan datos reales.
//
// SOLO se muestra en desarrollo (npm run dev, en tu PC). En el sitio publicado
// (npm run build) esta constante vale false y nada de ejemplo se dibuja.

import { fotos } from "@/config/fotos";
import type { Medio } from "@/config/lineas";

export const MOSTRAR_EJEMPLOS = process.env.NODE_ENV === "development";

/** Galería de ejemplo, armada con las fotos de ejemplo de config/fotos.ts. */
export function galeriaDeEjemplo(): Medio[] {
  return fotos.deEjemplo.galeria.map((f) => ({ tipo: "imagen", src: f.src, alt: f.alt }));
}

/** Usa la lista real; si está vacía y estamos en desarrollo, la de ejemplo. */
export function listaConEjemplo<T>(real: readonly T[], ejemplo: readonly T[]): { datos: T[]; esEjemplo: boolean } {
  if (real.length > 0) return { datos: [...real], esEjemplo: false };
  if (MOSTRAR_EJEMPLOS && ejemplo.length > 0) return { datos: [...ejemplo], esEjemplo: true };
  return { datos: [], esEjemplo: false };
}

/** Usa el texto real; si está vacío y estamos en desarrollo, el de ejemplo. */
export function textoConEjemplo(real: string, ejemplo: string): { texto: string; esEjemplo: boolean } {
  if (real.trim() !== "") return { texto: real, esEjemplo: false };
  if (MOSTRAR_EJEMPLOS && ejemplo.trim() !== "") return { texto: ejemplo, esEjemplo: true };
  return { texto: "", esEjemplo: false };
}
