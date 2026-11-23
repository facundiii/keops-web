import type { Metadata } from "next";
import { eventosPrivados } from "@/config/lineas";
import { fotos } from "@/config/fotos";
import { PlantillaLinea } from "@/components/PlantillaLinea";

export const metadata: Metadata = {
  title: eventosPrivados.meta.titulo,
  description: eventosPrivados.meta.descripcion,
};

export default function EventosPage() {
  return (
    <PlantillaLinea
      pagina={eventosPrivados}
      fotos={{ encabezado: fotos.eventos.encabezado, incluye: fotos.eventos.incluye }}
    />
  );
}
