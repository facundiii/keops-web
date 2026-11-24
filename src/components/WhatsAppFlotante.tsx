"use client";

import { usePathname } from "next/navigation";
import { contactoDeRuta, lineas, urlWhatsApp } from "@/config/contacto";
import { RUTA_INICIO } from "@/config/navegacion";
import { usePasoPortada } from "@/lib/usePasoPortada";
import { IconoWhatsApp } from "@/components/ui/IconoWhatsApp";

/**
 * Botón flotante de WhatsApp, con el número de la línea de la página que se está viendo.
 * Si la línea todavía no tiene número cargado, no se muestra.
 * En la home aparece recién al dejar la primera vista, que va sin botones.
 */
export function WhatsAppFlotante() {
  const ruta = usePathname();
  const pasoPortada = usePasoPortada();
  const linea = lineas[contactoDeRuta(ruta).linea];
  const url = urlWhatsApp(linea);

  if (!url) return null;

  const oculto = ruta === RUTA_INICIO && !pasoPortada;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Escribinos por WhatsApp (${linea.nombre})`}
      aria-hidden={oculto || undefined}
      tabIndex={oculto ? -1 : undefined}
      className={`fixed bottom-5 right-5 z-30 flex items-center justify-center w-14 h-14 rounded-full bg-whatsapp text-negro shadow-lg shadow-negro/60 transition-[transform,opacity,visibility] duration-300 hover:scale-105 ${
        oculto ? "invisible translate-y-3 opacity-0" : "visible opacity-100"
      }`}
    >
      <IconoWhatsApp size={28} />
    </a>
  );
}
