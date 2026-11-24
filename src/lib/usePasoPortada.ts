"use client";

import { useSyncExternalStore } from "react";

const suscribir = (aviso: () => void) => {
  window.addEventListener("scroll", aviso, { passive: true });
  window.addEventListener("resize", aviso);
  return () => {
    window.removeEventListener("scroll", aviso);
    window.removeEventListener("resize", aviso);
  };
};
const enElNavegador = () => window.scrollY > window.innerHeight * 0.6;
const enElServidor = () => false;

/**
 * true cuando ya se bajó más allá de la primera vista (el 60 % de la pantalla).
 * En la home, recién ahí aparecen los botones: el Contacto dorado y el WhatsApp flotante.
 */
export function usePasoPortada(): boolean {
  return useSyncExternalStore(suscribir, enElNavegador, enElServidor);
}
