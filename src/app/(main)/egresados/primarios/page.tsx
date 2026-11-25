import type { Metadata } from "next";
import { egresadosPrimarios } from "@/config/lineas";
import { fotos } from "@/config/fotos";
import { ejemplos } from "@/config/ejemplos";
import { galeriaDeEjemplo } from "@/lib/ejemplo";
import { PlantillaLinea } from "@/components/PlantillaLinea";
import { FormularioAgencia } from "@/components/FormularioAgencia";

export const metadata: Metadata = {
  title: egresadosPrimarios.meta.titulo,
  description: egresadosPrimarios.meta.descripcion,
};

export default function EgresadosPrimariosPage() {
  return (
    <PlantillaLinea
      pagina={egresadosPrimarios}
      fotos={{ encabezado: fotos.primarios.encabezado, porQue: fotos.primarios.porQue }}
      ejemplos={{
        galeria: galeriaDeEjemplo(),
        testimonios: ejemplos.testimonios.egresados,
        parrafosExtra: ejemplos.paraLasFamilias,
      }}
    >
      <FormularioAgencia nivelInicial="Primario" />
    </PlantillaLinea>
  );
}
