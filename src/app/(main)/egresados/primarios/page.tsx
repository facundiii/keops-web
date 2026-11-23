import type { Metadata } from "next";
import { egresadosPrimarios } from "@/config/lineas";
import { PlantillaLinea } from "@/components/PlantillaLinea";

export const metadata: Metadata = {
  title: egresadosPrimarios.meta.titulo,
  description: egresadosPrimarios.meta.descripcion,
};

export default function EgresadosPrimariosPage() {
  return <PlantillaLinea pagina={egresadosPrimarios} />;
}
