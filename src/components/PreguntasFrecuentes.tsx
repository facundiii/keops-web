import { ChevronDown } from "lucide-react";
import type { PreguntaVisible } from "@/lib/faq";
import { EtiquetaEjemplo } from "@/components/ui/EtiquetaEjemplo";

const etiquetas = {
  sinConfirmar: "Sin confirmar: no se publica",
  ejemplo: "De ejemplo: no se publica",
};

/**
 * Lista de preguntas en acordeón. Usa <details>, así funciona con teclado y sin JavaScript.
 * Sin preguntas, no muestra nada.
 */
export function PreguntasFrecuentes({ preguntas }: { preguntas: PreguntaVisible[] }) {
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
          <div className="pb-6 pr-10">
            <p className="cuerpo text-arena">{p.respuesta}</p>
            {p.estado !== "publicada" && <EtiquetaEjemplo texto={etiquetas[p.estado]} className="mt-4" />}
          </div>
        </details>
      ))}
    </div>
  );
}
