"use client";

import { useSyncExternalStore } from "react";
import { claveAhora, esVigente } from "@/lib/fechas";

const suscribir = () => () => {};
const enElNavegador = () => claveAhora(new Date());
const enElServidor = () => null;

/**
 * De una lista con fechas ("AAAA-MM-DD"), deja las que todavía no pasaron,
 * de la más próxima a la más lejana.
 * Devuelve `null` mientras no se sabe la fecha de hoy: el sitio se genera de antemano,
 * así que la fecha se compara en el navegador de cada persona.
 */
export function useVigentes<T extends { fecha: string }>(lista: T[]): T[] | null {
  const clave = useSyncExternalStore(suscribir, enElNavegador, enElServidor);
  if (clave === null) return null;
  return lista.filter((item) => esVigente(item.fecha, clave)).sort((a, b) => a.fecha.localeCompare(b.fecha));
}
