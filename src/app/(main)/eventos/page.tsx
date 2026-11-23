import type { Metadata } from "next";
import { eventosPrivados } from "@/config/lineas";
import { PlantillaLinea } from "@/components/PlantillaLinea";

export const metadata: Metadata = {
  title: eventosPrivados.meta.titulo,
  description: eventosPrivados.meta.descripcion,
};

export default function EventosPage() {
  return <PlantillaLinea pagina={eventosPrivados} />;
}
