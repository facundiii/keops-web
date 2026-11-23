// Preguntas frecuentes, agrupadas por línea.
//
// SOLO se muestran las preguntas con `confirmado: true` y con respuesta escrita.
// Para publicar una: revisá el texto y cambiá `confirmado: false` por `confirmado: true`.
// Mientras no haya ninguna confirmada, la página de Preguntas frecuentes y su link no aparecen.

export type GrupoFaqId = "general" | "disco" | "egresados" | "eventos" | "academia";

export interface Pregunta {
  pregunta: string;
  respuesta: string;
  confirmado: boolean;
}

export interface GrupoFaq {
  id: GrupoFaqId;
  titulo: string;
  preguntas: Pregunta[];
}

export const faq: GrupoFaq[] = [
  {
    id: "general",
    titulo: "General",
    preguntas: [
      {
        pregunta: "¿Dónde queda Keops?",
        respuesta: "En Villa Carlos Paz, Córdoba, fuera del centro. Podés ver cómo llegar en Google Maps.",
        confirmado: false,
      },
      {
        pregunta: "¿Cómo me comunico?",
        respuesta: "Cada línea tiene su WhatsApp y su mail. Los encontrás al pie de cada página.",
        confirmado: false,
      },
    ],
  },
  {
    id: "disco",
    titulo: "Disco",
    preguntas: [
      {
        pregunta: "¿Cómo compro mi entrada?",
        respuesta: "Desde la app de entradas. Desde la cartelera de cada noche llegás directo.",
        confirmado: false,
      },
      {
        pregunta: "¿Cuándo abre Keops?",
        respuesta:
          "En verano, del 1 de enero a mediados de febrero, abrimos la mayoría de las noches. El resto del año hay noches especiales: mirá la cartelera.",
        confirmado: false,
      },
      {
        pregunta: "¿Hay sector VIP?",
        respuesta: "Sí. Para reservas, escribinos por WhatsApp.",
        confirmado: false,
      },
      {
        pregunta: "¿Cuál es la edad mínima para entrar?",
        respuesta: "", // A COMPLETAR
        confirmado: false,
      },
    ],
  },
  {
    id: "egresados",
    titulo: "Egresados",
    preguntas: [
      {
        pregunta: "¿Quién contrata la fiesta?",
        respuesta: "Trabajamos con agencias de viaje de egresados. Colegios y familias también pueden escribirnos.",
        confirmado: false,
      },
      {
        pregunta: "¿Las fiestas de primario y secundario son juntas?",
        respuesta: "No. Son fiestas separadas, pensadas para cada edad.",
        confirmado: false,
      },
      {
        pregunta: "¿Qué incluye la fiesta?",
        respuesta:
          "Show completo, animación, producción de video, seguridad para grupos grandes y aforo reservado para el contingente.",
        confirmado: false,
      },
      {
        pregunta: "¿Cómo se cuida a los chicos?",
        respuesta: "", // A COMPLETAR (controles de acceso, seguridad, personal)
        confirmado: false,
      },
    ],
  },
  {
    id: "eventos",
    titulo: "Eventos privados e Institucionales",
    preguntas: [
      {
        pregunta: "¿Qué tipo de eventos hacen?",
        respuesta: "Casamientos, cumpleaños, celebraciones y eventos de empresa.",
        confirmado: false,
      },
      {
        pregunta: "¿Puedo conocer el lugar antes?",
        respuesta: "Sí. Coordiná una visita o una reunión previa por WhatsApp.",
        confirmado: false,
      },
      {
        pregunta: "¿Qué capacidad tiene Keops?",
        respuesta: "Hasta 5.000 personas con todos los espacios abiertos. Cada espacio se puede usar por separado.",
        confirmado: false,
      },
      {
        pregunta: "¿Incluyen catering y técnica?",
        respuesta: "Sí: catering con menú adaptable, sonido, iluminación y pantallas.",
        confirmado: false,
      },
    ],
  },
  {
    id: "academia",
    titulo: "Academia",
    preguntas: [
      // A COMPLETAR cuando estén los datos del curso
    ],
  },
];

/** Preguntas publicables de un grupo: confirmadas y con respuesta. */
export function preguntasDe(id: GrupoFaqId): Pregunta[] {
  const grupo = faq.find((g) => g.id === id);
  return grupo ? grupo.preguntas.filter((p) => p.confirmado && p.respuesta.trim() !== "") : [];
}

/** Grupos que tienen al menos una pregunta publicable. */
export function gruposConPreguntas(): GrupoFaq[] {
  return faq
    .map((g) => ({ ...g, preguntas: preguntasDe(g.id) }))
    .filter((g) => g.preguntas.length > 0);
}

export function hayPreguntas(): boolean {
  return gruposConPreguntas().length > 0;
}
