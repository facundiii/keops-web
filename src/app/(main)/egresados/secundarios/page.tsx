import type { Metadata } from "next";
import { egresadosSecundarios } from "@/config/lineas";
import { fotos } from "@/config/fotos";
import { PlantillaLinea } from "@/components/PlantillaLinea";
import { FormularioAgencia } from "@/components/FormularioAgencia";

export const metadata: Metadata = {
  title: egresadosSecundarios.meta.titulo,
  description: egresadosSecundarios.meta.descripcion,
};

export default function EgresadosSecundariosPage() {
  return (
    <PlantillaLinea pagina={egresadosSecundarios} fotos={{ porQue: fotos.egresados.porQue }}>
      <FormularioAgencia nivelInicial="Secundario" />
    </PlantillaLinea>
  );
}
