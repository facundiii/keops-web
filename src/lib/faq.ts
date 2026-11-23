import { faq, type GrupoFaqId } from "@/config/faq";
import { ejemplos } from "@/config/ejemplos";
import { MOSTRAR_EJEMPLOS } from "@/lib/ejemplo";

/**
 * publicada:    confirmada y con respuesta. Es lo único que sale en el sitio publicado.
 * sinConfirmar: tiene respuesta pero falta `confirmado: true`. Solo se ve en desarrollo.
 * ejemplo:      respuesta o pregunta de ejemplo. Solo se ve en desarrollo.
 */
export type EstadoPregunta = "publicada" | "sinConfirmar" | "ejemplo";

export interface PreguntaVisible {
  pregunta: string;
  respuesta: string;
  estado: EstadoPregunta;
}

/** Preguntas de un grupo que se pueden mostrar en este momento. */
export function preguntasVisibles(id: GrupoFaqId): PreguntaVisible[] {
  const grupo = faq.find((g) => g.id === id);
  if (!grupo) return [];

  const lista: PreguntaVisible[] = [];
  for (const p of grupo.preguntas) {
    const tieneRespuesta = p.respuesta.trim() !== "";
    if (p.confirmado && tieneRespuesta) {
      lista.push({ pregunta: p.pregunta, respuesta: p.respuesta, estado: "publicada" });
    } else if (MOSTRAR_EJEMPLOS) {
      const deEjemplo = ejemplos.faq.respuestas[p.pregunta];
      if (tieneRespuesta) lista.push({ pregunta: p.pregunta, respuesta: p.respuesta, estado: "sinConfirmar" });
      else if (deEjemplo) lista.push({ pregunta: p.pregunta, respuesta: deEjemplo, estado: "ejemplo" });
    }
  }

  // Grupo sin ninguna pregunta cargada: en desarrollo se muestran las de ejemplo.
  if (grupo.preguntas.length === 0 && MOSTRAR_EJEMPLOS) {
    for (const e of ejemplos.faq.preguntas[id] ?? []) lista.push({ ...e, estado: "ejemplo" });
  }

  return lista;
}

/** Grupos que tienen al menos una pregunta para mostrar. */
export function gruposVisibles(): { id: GrupoFaqId; titulo: string; preguntas: PreguntaVisible[] }[] {
  return faq
    .map((g) => ({ id: g.id, titulo: g.titulo, preguntas: preguntasVisibles(g.id) }))
    .filter((g) => g.preguntas.length > 0);
}

export function hayPreguntasVisibles(): boolean {
  return gruposVisibles().length > 0;
}
