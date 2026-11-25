// Contenido de ejemplo: sirve para ver cómo queda el sitio mientras faltan datos reales.
//
// Se muestra en desarrollo (npm run dev, en tu PC) y en una demo armada a propósito para mostrar el
// sitio en una dirección de prueba (build con la variable DEMO_CON_EJEMPLOS=1).
// En el sitio publicado (npm run build, sin esa variable) MOSTRAR_EJEMPLOS vale false y nada de
// ejemplo se dibuja. La variable no va en netlify.toml: se pasa a mano solo al subir la demo.

import { fotos } from "@/config/fotos";
import type { Medio } from "@/config/lineas";

/** true solo en el build de una demo: muestra los ejemplos y pide a los buscadores que no la listen (app/layout.tsx). */
export const ES_DEMO = process.env.DEMO_CON_EJEMPLOS === "1";

export const MOSTRAR_EJEMPLOS = process.env.NODE_ENV === "development" || ES_DEMO;

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
