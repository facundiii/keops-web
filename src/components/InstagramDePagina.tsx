"use client";

import { usePathname } from "next/navigation";
import { Instagram } from "lucide-react";
import { contactoDeRuta, instagram } from "@/config/contacto";

/** Link al Instagram que corresponde a la página actual (oficial, primarios o secundarios). */
export function InstagramDePagina({ className = "" }: { className?: string }) {
  const ruta = usePathname();
  const cuenta = instagram[contactoDeRuta(ruta).instagram];

  return (
    <a href={cuenta.url} target="_blank" rel="noopener noreferrer" className={className}>
      <Instagram size={20} strokeWidth={1.5} aria-hidden="true" />
      <span>
        <span className="sr-only">Instagram: </span>
        {cuenta.usuario}
      </span>
    </a>
  );
}
