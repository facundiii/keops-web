import { ChevronDown } from "lucide-react";
import type { Pregunta } from "@/config/faq";

/**
 * Lista de preguntas en acordeón. Usa <details>, así funciona con teclado y sin JavaScript.
 * Sin preguntas, no muestra nada.
 */
export function PreguntasFrecuentes({ preguntas }: { preguntas: Pregunta[] }) {
  if (preguntas.length === 0) return null;

  return (
    <div className="border-b border-piedra">
      {preguntas.map((p) => (
        <details key={p.pregunta} className="group border-t border-piedra">
          <summary className="titulo-3 text-marfil flex items-center justify-between gap-4 min-h-[64px] py-4 list-none [&::-webkit-details-marker]:hidden hover:text-oro transition-colors duration-200">
            {p.pregunta}
            <ChevronDown
              size={24}
              strokeWidth={1.5}
              aria-hidden="true"
              className="shrink-0 text-oro transition-transform duration-300 group-open:rotate-180"
            />
          </summary>
          <p className="cuerpo text-arena pb-6 pr-10">{p.respuesta}</p>
        </details>
      ))}
    </div>
  );
}
