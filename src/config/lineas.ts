// Contenido de las páginas de línea: Egresados (primarios y secundarios) y
// Eventos privados (que incluye los eventos de empresa). Todas usan la misma plantilla, en este orden:
//   1. Encabezado   2. Por qué Keops   3. Qué incluye   4. Galería
//   5. Referencias  6. Preguntas frecuentes (config/faq.ts)   7. Contacto
//
// Regla: un bloque sin contenido no se muestra. Si dejás una lista vacía ([]) o un
// texto vacío (""), ese bloque desaparece de la página.

import type { InstagramId, LineaId } from "./contacto";
import type { GrupoFaqId } from "./faq";

export interface Argumento {
  titulo: string;
  texto: string;
}

export type Medio =
  | { tipo: "imagen"; src: string; alt: string }
  | { tipo: "video"; src: string; titulo?: string };

export interface Referencia {
  nombre: string;
  /** Ruta del logo dentro de /public. Vacío = se muestra solo el nombre. */
  logo: string;
  /** Solo se muestra cuando está en true. */
  autorizado: boolean;
}

export interface Testimonio {
  texto: string;
  autor: string;
  autorizado: boolean;
}

export interface PaginaLinea {
  /** Título y descripción para Google y para la pestaña del navegador */
  meta: { titulo: string; descripcion: string };
  linea: LineaId;
  instagram: InstagramId;
  faq: GrupoFaqId;
  /** Primera vista de la página: va sin botones (el contacto aparece al bajar) */
  encabezado: { antetitulo: string; titulo: string; bajada: string };
  porQue: { titulo: string; argumentos: Argumento[] };
  incluye: { titulo: string; servicios: string[] };
  /** Se muestra solo con 6 imágenes o más, o con al menos un video. */
  galeria: { titulo: string; estilo: "grilla" | "cine"; medios: Medio[] };
  referencias: { titulo: string; logos: Referencia[]; testimonios: Testimonio[] };
  /**
   * Opcional: cómo es la fiesta, en momentos, justo después del encabezado.
   * Sirve para que se entienda de un vistazo qué vive el contingente. Sin momentos, no se muestra.
   */
  fiesta?: { antetitulo: string; titulo: string; momentos: Argumento[] };
  /** Bloque opcional de texto, antes de las preguntas frecuentes. Sin párrafos, no se muestra. */
  extra?: { antetitulo: string; titulo: string; parrafos: string[] };
  contacto: { titulo: string; bajada: string };
}

// ── Egresados ────────────────────────────────────────────────────

/** Los cuatro argumentos para la agencia. Se usan en /egresados y en las dos páginas de nivel. */
export const argumentosEgresados: Argumento[] = [
  {
    titulo: "Diferencia tu paquete",
    // TEXTO PROPUESTO: revisar
    texto: "Sumá a tu viaje una fiesta en la pirámide de Carlos Paz.",
  },
  {
    titulo: "Es el recuerdo del viaje",
    texto: "El show, las luces y la producción de video quedan en las redes de los chicos y las familias.",
  },
  {
    titulo: "Tranquiliza a las familias",
    texto: "Seguridad, control de acceso y trayectoria desde 1969.",
  },
  {
    titulo: "Un solo interlocutor",
    texto: "Coordinamos todo directo con tu agencia.",
  },
];

const serviciosEgresados: string[] = [
  "Matinées exclusivas para contingentes",
  "Coordinación directa con agencias",
  "Protocolos de seguridad para grupos numerosos",
  "Aforo reservado para el contingente",
  "Animación y producción de video",
  "Barra según corresponda y normativa vigente",
];

// Secundario: chicos de 17 y 18 años. No es una matinée: es la noche de egresados, y el foco es la fiesta.
// TEXTO PROPUESTO: revisar argumentos y servicios de secundario
const argumentosSecundarios: Argumento[] = [
  {
    titulo: "Diferencia tu paquete",
    texto: "Sumá a tu viaje la noche de egresados en la pirámide de Carlos Paz.",
  },
  {
    titulo: "Producción de boliche grande",
    texto: "DJ, láser, pantallas LED y show, en el espacio más grande de la ciudad.",
  },
  {
    titulo: "Es el recuerdo del viaje",
    texto: "El show, las luces y la producción de video de la noche quedan en sus redes.",
  },
  {
    titulo: "Un solo interlocutor",
    texto: "Coordinamos todo directo con tu agencia.",
  },
];

const serviciosSecundarios: string[] = [
  "Noches exclusivas para contingentes",
  "Coordinación directa con agencias",
  "Aforo reservado para el contingente",
  "DJ, show y animación",
  "Producción de video de la noche",
  "Barra según corresponda y normativa vigente",
];

/** Logos de agencias. Pasá `autorizado` a true para mostrar cada uno. */
const agencias: Referencia[] = [
  { nombre: "Flecha", logo: "/egresados/flecha.png", autorizado: false },
  { nombre: "Super Tour", logo: "/egresados/super-tour.png", autorizado: false },
  { nombre: "Astros", logo: "/egresados/astros.jpg", autorizado: false },
  { nombre: "Púrpura", logo: "/egresados/purpura.png", autorizado: false },
  { nombre: "Auckland", logo: "/egresados/auckland.jpg", autorizado: false },
];

/** Página /egresados: presentación para agencias y elección de nivel. */
export const egresados = {
  meta: {
    titulo: "Egresados",
    descripcion:
      "Fiestas de egresados en Keops, Villa Carlos Paz. Fiestas separadas para primario y secundario, coordinadas con cada agencia.",
  },
  encabezado: {
    antetitulo: "Para agencias de viaje",
    // Viene del sitio anterior
    titulo: "Tu viaje de egresados, a otro nivel",
    bajada: "Fiestas separadas para primario y secundario, con coordinación directa con cada agencia.",
  },
  niveles: [
    // TEXTO PROPUESTO: las líneas de cada nivel
    {
      titulo: "Egresados primario",
      texto: "Una matinée exclusiva para el contingente, con show y animación.",
      href: "/egresados/primarios",
      boton: "Ver primario",
    },
    {
      titulo: "Egresados secundario",
      texto: "La noche de egresados, con DJ, show y láser.",
      href: "/egresados/secundarios",
      boton: "Ver secundario",
    },
  ],
  porQue: { titulo: "Por qué Keops", argumentos: argumentosEgresados },
  contacto: { titulo: "Pedí una propuesta para tu agencia", bajada: "" },
};

export const egresadosPrimarios: PaginaLinea = {
  meta: {
    titulo: "Egresados primario",
    descripcion: "Fiestas de egresados de primario en Keops, Villa Carlos Paz, coordinadas con cada agencia.",
  },
  linea: "egresados",
  instagram: "primarios",
  faq: "egresados",
  encabezado: {
    antetitulo: "Egresados primario",
    // TEXTO PROPUESTO: revisar
    titulo: "La fiesta de su viaje",
    // TEXTO PROPUESTO: revisar
    bajada:
      "Una matinée exclusiva para los contingentes de primario que viajan a Carlos Paz: show, luces, DJ y producción de video, coordinada directo con tu agencia.",
  },
  // TEXTO PROPUESTO: revisar los momentos de la fiesta
  fiesta: {
    antetitulo: "La fiesta del viaje",
    titulo: "Cómo es la matinée en Keops",
    momentos: [
      { titulo: "Llega el contingente", texto: "Los chicos llegan con sus coordinadores, en el horario que acordamos con tu agencia." },
      { titulo: "La pirámide para ellos", texto: "Una matinée exclusiva para contingentes de primario, con lugar reservado para el suyo." },
      { titulo: "Show en la pista", texto: "Robots de luces LED, animación y DJ, con las luces y las pantallas de la pista central." },
      { titulo: "El video del viaje", texto: "La producción de video de la fiesta queda para los chicos y sus familias." },
    ],
  },
  porQue: { titulo: "Por qué Keops", argumentos: argumentosEgresados },
  incluye: { titulo: "Qué incluye", servicios: serviciosEgresados },
  galeria: {
    titulo: "Galería",
    estilo: "grilla",
    medios: [
      // A COMPLETAR: fotos y videos de primario. Ej:
      // { tipo: "imagen", src: "/egresados/primarios-1.jpg", alt: "Contingente de primario en la pista central" },
    ],
  },
  referencias: { titulo: "Agencias que trabajan con Keops", logos: agencias, testimonios: [] },
  extra: {
    antetitulo: "Para las familias",
    titulo: "Seguridad y controles",
    parrafos: [
      // A COMPLETAR: texto sobre seguridad y controles que la agencia pueda reenviar a las familias.
    ],
  },
  contacto: { titulo: "Pedí una propuesta para tu agencia", bajada: "" },
};

export const egresadosSecundarios: PaginaLinea = {
  meta: {
    titulo: "Egresados secundario",
    descripcion:
      "La noche de egresados de secundario en Keops, Villa Carlos Paz: DJ, show, láser y producción de video, coordinada con cada agencia.",
  },
  linea: "egresados",
  instagram: "secundarios",
  faq: "egresados",
  encabezado: {
    antetitulo: "Egresados secundario",
    // TEXTO PROPUESTO: revisar
    titulo: "La noche más grande del viaje",
    // TEXTO PROPUESTO: revisar
    bajada:
      "La fiesta de egresados de secundario en la pirámide de Carlos Paz: una noche exclusiva para los contingentes, con DJ, show, láser y producción de video.",
  },
  // TEXTO PROPUESTO: revisar los momentos de la noche
  fiesta: {
    antetitulo: "La noche",
    titulo: "Así es la noche de egresados",
    momentos: [
      { titulo: "La pirámide abre para ellos", texto: "Una noche exclusiva para contingentes de secundario, con lugar reservado para cada uno." },
      { titulo: "Pista de boliche grande", texto: "DJ, láser, pantallas LED y el sonido de la pista central de Keops." },
      { titulo: "Show en medio de la gente", texto: "Animación y show adentro de la pista, para que la fiesta no pare." },
      { titulo: "Queda en video", texto: "La producción de video de la noche termina en sus redes." },
    ],
  },
  porQue: { titulo: "Por qué Keops", argumentos: argumentosSecundarios },
  incluye: { titulo: "Qué incluye", servicios: serviciosSecundarios },
  galeria: {
    titulo: "Galería",
    estilo: "grilla",
    medios: [
      { tipo: "video", src: "/egresados/video-1.mp4", titulo: "Noche de egresados" },
      { tipo: "video", src: "/egresados/video-2.mp4", titulo: "Noche de egresados" },
      { tipo: "video", src: "/egresados/video-3.mp4", titulo: "Noche de egresados" },
    ],
  },
  referencias: { titulo: "Agencias que trabajan con Keops", logos: agencias, testimonios: [] },
  // Sin "Para las familias": en secundario el foco es la fiesta (decisión del dueño)
  contacto: { titulo: "Pedí una propuesta para tu agencia", bajada: "" },
};

// ── Eventos privados ─────────────────────────────────────────────

export const eventosPrivados: PaginaLinea = {
  meta: {
    titulo: "Eventos privados",
    descripcion:
      "Casamientos, cumpleaños, celebraciones y eventos de empresa en Keops, Villa Carlos Paz: ambientación, barra, DJ y catering en un solo lugar.",
  },
  linea: "eventos",
  instagram: "oficial",
  faq: "eventos",
  encabezado: {
    antetitulo: "Eventos privados",
    titulo: "Tu fiesta, con la producción de un boliche",
    // TEXTO PROPUESTO: suma los eventos de empresa, que antes tenían su página (Institucionales)
    bajada:
      "Casamientos, cumpleaños, celebraciones y eventos de empresa, con ambientación, barra, DJ y catering en un solo lugar.",
  },
  porQue: {
    titulo: "Por qué Keops",
    argumentos: [
      // A COMPLETAR: cuatro argumentos. Ej: { titulo: "...", texto: "..." },
    ],
  },
  incluye: {
    titulo: "Qué incluye",
    servicios: [
      "Ambientación personalizada según la temática del evento",
      "Barra abierta",
      "DJ",
      "Catering con menú adaptable",
      "Coordinador exclusivo durante todo el evento",
      "Iluminación y sonido incluidos",
    ],
  },
  galeria: {
    titulo: "El espacio en imágenes",
    estilo: "cine",
    medios: [
      { tipo: "video", src: "/eventos/promo.mp4", titulo: "Eventos privados en Keops" },
      { tipo: "imagen", src: "/eventos/eventos-1.jpg", alt: "Evento privado en Keops" },
      { tipo: "imagen", src: "/eventos/eventos-2.jpg", alt: "Evento privado en Keops" },
      { tipo: "imagen", src: "/eventos/eventos-3.jpg", alt: "Evento privado en Keops" },
      { tipo: "imagen", src: "/eventos/eventos-4.jpg", alt: "Evento privado en Keops" },
      { tipo: "imagen", src: "/eventos/eventos-5.jpg", alt: "Evento privado en Keops" },
      { tipo: "imagen", src: "/eventos/eventos-6.jpg", alt: "Evento privado en Keops" },
      { tipo: "imagen", src: "/eventos/eventos-7.jpg", alt: "Evento privado en Keops" },
      { tipo: "imagen", src: "/eventos/eventos-8.jpg", alt: "Evento privado en Keops" },
      { tipo: "imagen", src: "/eventos/eventos-9.jpg", alt: "Evento privado en Keops" },
    ],
  },
  referencias: { titulo: "Quienes ya festejaron en Keops", logos: [], testimonios: [] },
  contacto: { titulo: "Contanos tu idea", bajada: "" },
};
