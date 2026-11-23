// Contenido de las páginas de línea: Egresados (primarios y secundarios),
// Eventos privados e Institucionales. Todas usan la misma plantilla, en este orden:
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
  encabezado: { antetitulo: string; titulo: string; bajada: string; boton: string };
  porQue: { titulo: string; argumentos: Argumento[] };
  incluye: { titulo: string; servicios: string[] };
  /** Se muestra solo con 6 imágenes o más, o con al menos un video. */
  galeria: { titulo: string; estilo: "grilla" | "cine"; medios: Medio[] };
  referencias: { titulo: string; logos: Referencia[]; testimonios: Testimonio[] };
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
    boton: "Pedir propuesta",
  },
  niveles: [
    { titulo: "Egresados primario", href: "/egresados/primarios", boton: "Ver primario" },
    { titulo: "Egresados secundario", href: "/egresados/secundarios", boton: "Ver secundario" },
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
    titulo: "La fiesta de primario, pensada para su edad",
    // TEXTO PROPUESTO: revisar
    bajada: "Una fiesta exclusiva para contingentes de primario, separada de la de secundario y coordinada directo con tu agencia.",
    boton: "Pedir propuesta",
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
    descripcion: "Fiestas de egresados de secundario en Keops, Villa Carlos Paz, coordinadas con cada agencia.",
  },
  linea: "egresados",
  instagram: "secundarios",
  faq: "egresados",
  encabezado: {
    antetitulo: "Egresados secundario",
    // TEXTO PROPUESTO: revisar
    titulo: "La fiesta de secundario, en la pirámide de Carlos Paz",
    // TEXTO PROPUESTO: revisar
    bajada: "Una fiesta exclusiva para contingentes de secundario, con show, animación y producción de video, coordinada directo con tu agencia.",
    boton: "Pedir propuesta",
  },
  porQue: { titulo: "Por qué Keops", argumentos: argumentosEgresados },
  incluye: { titulo: "Qué incluye", servicios: serviciosEgresados },
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
  extra: {
    antetitulo: "Para las familias",
    titulo: "Seguridad y controles",
    parrafos: [
      // A COMPLETAR: texto sobre seguridad y controles que la agencia pueda reenviar a las familias.
    ],
  },
  contacto: { titulo: "Pedí una propuesta para tu agencia", bajada: "" },
};

// ── Eventos privados ─────────────────────────────────────────────

export const eventosPrivados: PaginaLinea = {
  meta: {
    titulo: "Eventos privados",
    descripcion:
      "Casamientos, cumpleaños y celebraciones en Keops, Villa Carlos Paz: ambientación, barra, DJ o banda en vivo y catering en un solo lugar.",
  },
  linea: "eventos",
  instagram: "oficial",
  faq: "eventos",
  encabezado: {
    antetitulo: "Eventos privados",
    titulo: "Tu fiesta, con la producción de un boliche",
    bajada:
      "Casamientos, cumpleaños y celebraciones, con ambientación, barra, DJ o banda en vivo y catering en un solo lugar.",
    boton: "Armá tu evento",
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
      "DJ o banda en vivo, a elección",
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

// ── Institucionales ──────────────────────────────────────────────

export const institucionales: PaginaLinea = {
  meta: {
    titulo: "Institucionales",
    descripcion: "Eventos de empresa en Keops, Villa Carlos Paz: técnica, catering y un coordinador dedicado.",
  },
  linea: "eventos",
  instagram: "oficial",
  faq: "eventos",
  encabezado: {
    antetitulo: "Institucionales",
    titulo: "Tu evento dentro de un ícono de Carlos Paz",
    bajada: "Técnica, catering y un coordinador dedicado.",
    boton: "Pedir propuesta",
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
      // Vienen del sitio anterior: CONFIRMAR que todos sigan siendo ciertos.
      "Espacios que se adaptan al tipo de evento",
      "Pantallas, proyectores y micrófonos",
      "WiFi para presentaciones y streaming",
      "Catering: coffee break, almuerzo o cena",
      "Coordinador dedicado durante toda la jornada",
      "Estacionamiento y acceso diferenciado para invitados VIP",
    ],
  },
  galeria: {
    titulo: "Galería",
    estilo: "grilla",
    medios: [
      // A COMPLETAR: fotos de eventos de empresa (6 o más para que se muestre la galería).
    ],
  },
  referencias: {
    titulo: "Empresas que eligieron Keops",
    logos: [
      { nombre: "Sancor Seguros", logo: "", autorizado: false },
      { nombre: "FIE", logo: "", autorizado: false },
    ],
    testimonios: [],
  },
  contacto: { titulo: "Contanos tu idea", bajada: "" },
};
