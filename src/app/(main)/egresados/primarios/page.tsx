import type { Metadata } from "next";
import { egresadosPrimarios } from "@/config/lineas";
import { fotos } from "@/config/fotos";
import { PlantillaLinea } from "@/components/PlantillaLinea";
import { FormularioAgencia } from "@/components/FormularioAgencia";

export const metadata: Metadata = {
  title: egresadosPrimarios.meta.titulo,
  description: egresadosPrimarios.meta.descripcion,
};

export default function EgresadosPrimariosPage() {
  return (
    <PlantillaLinea pagina={egresadosPrimarios} fotos={{ porQue: fotos.egresados.porQue }}>
      <FormularioAgencia nivelInicial="Primario" />
    </PlantillaLinea>
  );
}
