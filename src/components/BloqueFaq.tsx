import { preguntasDe, type GrupoFaqId } from "@/config/faq";
import { Seccion, TituloSeccion } from "@/components/ui/Seccion";
import { PreguntasFrecuentes } from "@/components/PreguntasFrecuentes";
import { FadeInSection } from "@/components/FadeInSection";

/**
 * Preguntas frecuentes de una línea, dentro de su página.
 * Solo muestra las confirmadas en config/faq.ts; sin ninguna, el bloque no aparece.
 */
export function BloqueFaq({ grupo }: { grupo: GrupoFaqId }) {
  const preguntas = preguntasDe(grupo);
  if (preguntas.length === 0) return null;

  return (
    <Seccion ancho="angosto">
      <FadeInSection>
        <TituloSeccion titulo="Preguntas frecuentes" />
      </FadeInSection>
      <PreguntasFrecuentes preguntas={preguntas} />
    </Seccion>
  );
}
