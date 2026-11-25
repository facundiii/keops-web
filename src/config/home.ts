// Contenido de la home, en el orden en que se muestra:
// hero · cifras · las líneas · próximas noches · cómo llegar · cierre · contacto
// Las fotos de las tarjetas están en config/fotos.ts y "Cómo llegar" en config/comoLlegar.ts.

/**
 * Primera vista de la home. Va sin botones: el contacto y la compra aparecen al bajar.
 * Durante el aniversario la reemplaza la portada especial (config/aniversario.ts).
 */
export const hero = {
  antetitulo: "Villa Carlos Paz · Desde 1969",
  titulo: "La pirámide de Carlos Paz",
  bajada: "Disco, egresados y eventos privados en el espacio más grande de la ciudad.",
  /**
   * Video de fondo, dentro de /public. Siempre sin sonido.
   *
   * El original es vertical (1080 × 1920, 39,5 s; está en el historial de git, en el primer commit de este
   * archivo). Nunca se estira: `video` es una franja horizontal de 1080 × 720 para compu y tablet, y
   * `videoCelular`, el cuadro vertical (sin la franja de abajo, que trae un rótulo "KEOPS") a 576 × 870.
   *
   * La franja horizontal no está siempre a la misma altura: cambia con cada toma para que no corte
   * caras ni carteles. Fila donde arranca, por tramo (en segundos): 0 → 200 · 2,37 → 600 · 3,40 → 400 ·
   * 4,63 → 330 · 7,33 → 580 · 11,0 → 680 · 25,03 → 220 · 27,2 → 560 · 28,2 → 300 · 29,2 → 160 ·
   * 30,67 → 680 · 32,17 → 360 · 33,33 → 300 · 34,33 → 460 · 35,33 → 680.
   */
  video: "/hero-video.mp4",
  videoCelular: "/hero-video-vertical.mp4",
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
  id: "egresados" | "eventos" | "disco" | "academia";
  antetitulo: string;
  titulo: string;
  texto: string;
  boton: string;
  href: string;
}

/** Las líneas, en el orden en que se muestran: el mismo del menú (config/navegacion.ts). Sin íconos. */
export const tarjetasLineas: TarjetaLinea[] = [
  {
    id: "disco",
    antetitulo: "Disco",
    titulo: "La noche más grande de Carlos Paz.",
    texto: "Cinco espacios, sectores al aire libre y VIP.",
    boton: "Ver próximas aperturas",
    href: "/disco",
  },
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
    // TEXTO PROPUESTO: suma los eventos de empresa, que antes tenían su página (Institucionales)
    texto:
      "Casamientos, cumpleaños, celebraciones y eventos de empresa, con ambientación, barra, DJ y catering en un solo lugar.",
    boton: "Armá tu evento",
    href: "/eventos",
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
