// Mapeo de fotos: qué foto va en cada lugar del sitio.
// Para cambiar una foto, cambiá acá cuál se usa; no hace falta tocar componentes.
// Los archivos están en /public/fotos/.

export interface Foto {
  /** Ruta dentro de /public */
  src: string;
  /** Texto alternativo: qué se ve en la foto */
  alt: string;
  /** Qué parte se ve cuando la foto se recorta. Ej: "center 30%" (más arriba). Por defecto, el centro. */
  posicion?: string;
}

// ── Las fotos disponibles ────────────────────────────────────────
const pistaCentralPiramide: Foto = {
  src: "/fotos/01-pista-central-piramide.jpg",
  alt: "Pista central de Keops, con el techo en forma de pirámide y los haces de luz encendidos",
  posicion: "center 35%",
};
const pistaCentral: Foto = {
  src: "/fotos/02-pista-central.jpg",
  alt: "Pista central de Keops con luces amarillas y pantallas LED",
};
const salonEletonArmado: Foto = {
  src: "/fotos/03-salon-eleton-armado.jpg",
  alt: "Salón Eletón armado para un evento, con la pista iluminada y mesas a los costados",
  posicion: "center 60%",
};
const salonEletonBarra: Foto = {
  src: "/fotos/04-salon-eleton-barra.jpg",
  alt: "Barra y mesas altas del Salón Eletón, con luces rojas y violetas",
};
const salonBar: Foto = {
  src: "/fotos/05-salon-bar.jpg",
  alt: "Barra del Salón Bar, con estantes de botellas iluminados",
};
const salonBarKeops: Foto = {
  src: "/fotos/06-salon-bar-keops.jpg",
  alt: "Barra del Salón Bar con el logo de Keops en la pantalla",
};
const showRobotsLed: Foto = {
  src: "/fotos/07-show-robots-led.jpg",
  alt: "Show de robots con trajes de luces LED en medio del público",
};
const catering: Foto = {
  src: "/fotos/08-catering.jpg",
  alt: "Bandeja de catering con mini hamburguesas, servida en un evento en Keops",
  posicion: "center 65%",
};
/** Baja resolución (760 px): usar chica, nunca a pantalla completa. */
const historiaExterior2010: Foto = {
  src: "/fotos/09-historia-exterior-2010.jpg",
  alt: "Frente de Keops con la pirámide iluminada, en 2010",
};
const historia50Anios: Foto = {
  src: "/fotos/10-historia-50-anios.jpg",
  alt: "Festejo de los 50 años de Keops, con una torta en forma de pirámide",
};

// ── Dónde va cada una ────────────────────────────────────────────
export const fotos = {
  /** Tarjetas de las líneas en la home */
  home: {
    egresados: showRobotsLed,
    eventos: salonEletonArmado,
    institucionales: catering,
    disco: pistaCentral,
    academia: salonBarKeops,
  } as Record<string, Foto | undefined>,

  nosotros: {
    encabezado: pistaCentralPiramide as Foto | undefined,
    /** Fotos de cada espacio (se muestran hasta dos por tarjeta). Lista vacía = tarjeta sin foto. */
    espacios: {
      pistaCentral: [pistaCentralPiramide, pistaCentral],
      salonEleton: [salonEletonArmado, salonEletonBarra],
      salonBar: [salonBar],
      garden: [],
      vip: [],
    } as Record<string, Foto[]>,
    /**
     * Imagen de cada hito de la línea de tiempo, por año (el mismo `anio` de config/nosotros.ts).
     * Un año sin imagen muestra solo el año y el párrafo.
     */
    historia: {
      // "1969": A COMPLETAR
      "2010": historiaExterior2010,
      "2019": historia50Anios,
      // "2020": A COMPLETAR
      // "2021": A COMPLETAR
    } as Record<string, Foto | undefined>,
    /**
     * Imágenes DE EJEMPLO para los años que todavía no tienen la suya.
     * Son fotos actuales, puestas solo para ver cómo queda el diseño.
     * Nunca se publican: solo se ven en tu PC, en los hitos sin confirmar.
     */
    historiaDeEjemplo: {
      "1969": pistaCentralPiramide,
      "2020": showRobotsLed,
      "2021": pistaCentral,
    } as Record<string, Foto | undefined>,
  },

  disco: { encabezado: pistaCentral as Foto | undefined },
  eventos: { encabezado: salonEletonArmado as Foto | undefined, incluye: catering as Foto | undefined },
  institucionales: { incluye: catering as Foto | undefined },
  egresados: { porQue: showRobotsLed as Foto | undefined },
  academia: { encabezado: salonBarKeops as Foto | undefined },

  /** Para las galerías, cuando haya 6 fotos o más de cada una (config/lineas.ts). */
  paraGalerias: {
    pistaCentral: [pistaCentral],
    institucionales: [salonEletonBarra],
    academia: [salonBar],
  },
};
