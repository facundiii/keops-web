// Contenido de la home, en el orden en que se muestra:
// hero · cifras · las líneas · próximas noches · cómo llegar · cierre · contacto
// Las fotos de las tarjetas están en config/fotos.ts y "Cómo llegar" en config/comoLlegar.ts.

export const hero = {
  antetitulo: "Villa Carlos Paz · Desde 1969",
  titulo: "La pirámide de Carlos Paz",
  bajada: "Disco, egresados, eventos privados e institucionales en el espacio más grande de la ciudad.",
  botones: [
    { texto: "Egresados", href: "/egresados" },
    { texto: "Ver próximas aperturas", href: "/disco" },
  ],
  /** Video de fondo, dentro de /public. Siempre sin sonido. */
  video: "/hero-video.mp4",
};

/** Franja de cifras. Todas con el mismo formato: un número grande y una palabra debajo. */
export const cifras: { dato: string; detalle: string }[] = [
  { dato: "5.000", detalle: "personas" },
  { dato: "5", detalle: "espacios" },
  { dato: "1969", detalle: "año de apertura" },
];

export const proximasNoches = {
  antetitulo: "Disco",
  titulo: "Próximas noches",
  /** Cuántas noches se muestran como máximo */
  cantidad: 3,
  boton: "Ver próximas aperturas",
};

/** Frase de cierre, en Cormorant itálica. */
export const cierre = "Generaciones enteras bailaron bajo esta pirámide.";

export const contacto = {
  titulo: "Escribinos",
  bajada: "",
};

export interface TarjetaLinea {
  id: "egresados" | "eventos" | "institucionales" | "disco" | "academia";
  antetitulo: string;
  titulo: string;
  texto: string;
  boton: string;
  href: string;
}

/** Las líneas, en el orden en que se muestran. Sin íconos. */
export const tarjetasLineas: TarjetaLinea[] = [
  {
    id: "egresados",
    antetitulo: "Egresados",
    titulo: "Tu viaje de egresados, a otro nivel.",
    texto: "Fiestas exclusivas para primario y secundario, con coordinación directa con cada agencia.",
    boton: "Ver egresados",
    href: "/egresados",
  },
  {
    id: "eventos",
    antetitulo: "Eventos privados",
    titulo: "Tu fiesta, con la producción de un boliche.",
    texto:
      "Casamientos, cumpleaños y celebraciones, con ambientación, barra, DJ o banda en vivo y catering en un solo lugar.",
    boton: "Armá tu evento",
    href: "/eventos",
  },
  {
    id: "institucionales",
    antetitulo: "Institucionales",
    titulo: "Tu evento dentro de un ícono de Carlos Paz.",
    texto: "Técnica, catering y un coordinador dedicado.",
    boton: "Pedir propuesta",
    href: "/institucionales",
  },
  {
    id: "disco",
    antetitulo: "Disco",
    titulo: "La noche más grande de Carlos Paz.",
    texto: "Cinco espacios, sectores al aire libre y VIP.",
    boton: "Ver próximas aperturas",
    href: "/disco",
  },
  {
    id: "academia",
    antetitulo: "Academia",
    titulo: "Aprendé el oficio detrás de la barra.",
    texto: "La academia de bartender de Keops.",
    boton: "Conocé la academia",
    href: "/academia",
  },
];
