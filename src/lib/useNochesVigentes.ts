"use client";

import { useSyncExternalStore } from "react";
import { cartelera, type Noche } from "@/config/cartelera";
import { claveAhora, esVigente } from "@/lib/fechas";

const suscribir = () => () => {};
const enElNavegador = () => claveAhora(new Date());
const enElServidor = () => null;

/**
 * Noches de la cartelera que todavía no pasaron, de la más próxima a la más lejana.
 * Devuelve `null` mientras no se sabe la fecha de hoy (el sitio se genera de antemano,
 * así que la fecha se compara en el navegador de cada persona).
 */
export function useNochesVigentes(): Noche[] | null {
  const clave = useSyncExternalStore(suscribir, enElNavegador, enElServidor);
  if (clave === null) return null;
  return cartelera
    .filter((noche) => esVigente(noche.fecha, clave))
    .sort((a, b) => a.fecha.localeCompare(b.fecha));
}
