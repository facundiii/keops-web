import type { Metadata } from "next";
import { institucionales } from "@/config/lineas";
import { fotos } from "@/config/fotos";
import { PlantillaLinea } from "@/components/PlantillaLinea";

export const metadata: Metadata = {
  title: institucionales.meta.titulo,
  description: institucionales.meta.descripcion,
};

export default function InstitucionalesPage() {
  return <PlantillaLinea pagina={institucionales} fotos={{ incluye: fotos.institucionales.incluye }} />;
}
