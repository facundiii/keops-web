"use client";

import { usePathname } from "next/navigation";
import { contactoDeRuta, lineas, urlWhatsApp } from "@/config/contacto";
import { IconoWhatsApp } from "@/components/ui/IconoWhatsApp";

/**
 * Botón flotante de WhatsApp, con el número de la línea de la página que se está viendo.
 * Si la línea todavía no tiene número cargado, no se muestra.
 */
export function WhatsAppFlotante() {
  const ruta = usePathname();
  const linea = lineas[contactoDeRuta(ruta).linea];
  const url = urlWhatsApp(linea);

  if (!url) return null;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Escribinos por WhatsApp (${linea.nombre})`}
      className="fixed bottom-5 right-5 z-30 flex items-center justify-center w-14 h-14 rounded-full bg-whatsapp text-negro shadow-lg shadow-negro/60 transition-transform duration-300 hover:scale-105"
    >
      <IconoWhatsApp size={28} />
    </a>
  );
}
