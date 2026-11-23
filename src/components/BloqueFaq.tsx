import type { GrupoFaqId } from "@/config/faq";
import { preguntasVisibles } from "@/lib/faq";
import { Seccion, TituloSeccion } from "@/components/ui/Seccion";
import { PreguntasFrecuentes } from "@/components/PreguntasFrecuentes";
import { FadeInSection } from "@/components/FadeInSection";

/**
 * Preguntas frecuentes de una línea, dentro de su página.
 * En el sitio publicado solo salen las confirmadas en config/faq.ts; sin ninguna, el bloque no aparece.
 */
export function BloqueFaq({ grupo }: { grupo: GrupoFaqId }) {
  const preguntas = preguntasVisibles(grupo);
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
