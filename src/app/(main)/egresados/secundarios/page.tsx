import type { Metadata } from "next";
import { egresadosSecundarios } from "@/config/lineas";
import { PlantillaLinea } from "@/components/PlantillaLinea";

export const metadata: Metadata = {
  title: egresadosSecundarios.meta.titulo,
  description: egresadosSecundarios.meta.descripcion,
};

export default function EgresadosSecundariosPage() {
  return <PlantillaLinea pagina={egresadosSecundarios} />;
}
