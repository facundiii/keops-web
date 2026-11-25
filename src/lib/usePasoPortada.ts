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
const enElNavegador = () => {
  // En una página corta alcanza con bajar la mitad de lo que se puede; una que no scrollea no tiene primera vista aparte
  const maximo = document.documentElement.scrollHeight - window.innerHeight;
  if (maximo <= 0) return true;
  return window.scrollY > Math.min(window.innerHeight * 0.6, maximo * 0.5);
};
const enElServidor = () => false;

/**
 * true cuando ya se bajó más allá de la primera vista (el 60 % de la pantalla).
 * En todas las páginas, recién ahí aparecen los botones: el Contacto dorado y el WhatsApp flotante.
 */
export function usePasoPortada(): boolean {
  return useSyncExternalStore(suscribir, enElNavegador, enElServidor);
}
