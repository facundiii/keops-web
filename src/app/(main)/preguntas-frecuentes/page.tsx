import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { gruposVisibles } from "@/lib/faq";
import { Encabezado } from "@/components/Encabezado";
import { Seccion } from "@/components/ui/Seccion";
import { PreguntasFrecuentes } from "@/components/PreguntasFrecuentes";

export const metadata: Metadata = {
  title: "Preguntas frecuentes",
  description: "Respuestas a las consultas más comunes sobre Keops: disco, egresados, eventos privados e institucionales.",
};

export default function PreguntasFrecuentesPage() {
  const grupos = gruposVisibles();

  // En el sitio publicado, mientras no haya ninguna pregunta confirmada en config/faq.ts, la página no existe.
  if (grupos.length === 0) notFound();

  return (
    <>
      <Encabezado antetitulo="Ayuda" titulo="Preguntas frecuentes" />

      {grupos.map((grupo) => (
        <Seccion key={grupo.id} id={grupo.id} ancho="angosto">
          <h2 className="titulo-2 text-marfil mb-8">{grupo.titulo}</h2>
          <PreguntasFrecuentes preguntas={grupo.preguntas} />
        </Seccion>
      ))}
    </>
  );
}
