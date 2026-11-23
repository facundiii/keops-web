// Contacto de cada línea de Keops, Instagram por página y mapa.
// Si un dato está vacío (""), el sitio oculta lo que dependa de él.

export type LineaId = "disco" | "egresados" | "eventos" | "academia";

export interface Linea {
  /** Nombre que se muestra en el pie del sitio */
  nombre: string;
  mail: string;
  /** Solo dígitos, con código de país. Ej: "5493541637856" */
  whatsapp: string;
  /** El mismo número, como se muestra escrito */
  whatsappVisible: string;
  /** Mensaje con el que se abre el chat */
  mensaje: string;
}

export const lineas: Record<LineaId, Linea> = {
  disco: {
    nombre: "Disco y Fusion",
    mail: "rrpp@keops.ar",
    whatsapp: "5493541637856",
    whatsappVisible: "+54 9 3541 637856",
    mensaje: "Hola, me gustaría consultar sobre Keops Disco",
  },
  egresados: {
    nombre: "Egresados",
    mail: "egresados@keops.ar",
    whatsapp: "5493541580808",
    whatsappVisible: "+54 9 3541 580808",
    mensaje: "Hola, me gustaría consultar sobre egresados en Keops",
  },
  eventos: {
    nombre: "Eventos privados e Institucionales",
    mail: "eventos@keops.ar",
    whatsapp: "5493541579786",
    whatsappVisible: "+54 9 3541 579786",
    mensaje: "Hola, me gustaría consultar sobre eventos en Keops",
  },
  academia: {
    nombre: "Academia",
    mail: "", // A COMPLETAR
    whatsapp: "", // A COMPLETAR
    whatsappVisible: "", // A COMPLETAR
    mensaje: "Hola, me gustaría consultar sobre la academia de bartender de Keops",
  },
};

/** Link de WhatsApp de una línea. Devuelve "" si la línea no tiene número. */
export function urlWhatsApp(linea: Linea, mensaje: string = linea.mensaje): string {
  if (!linea.whatsapp) return "";
  return `https://wa.me/${linea.whatsapp}?text=${encodeURIComponent(mensaje)}`;
}

export const instagram = {
  oficial: { usuario: "@keopsoficial", url: "https://instagram.com/keopsoficial" },
  primarios: { usuario: "@keopsprimarios", url: "https://instagram.com/keopsprimarios" },
  secundarios: { usuario: "@keopsecundarios", url: "https://instagram.com/keopsecundarios" },
} as const;

export type InstagramId = keyof typeof instagram;

export const mapa = {
  /** Link que abre Google Maps */
  url: "https://maps.app.goo.gl/NTLZpL4MJ9mrNuCR7",
  /** Mapa incrustado en "Cómo llegar". Vacío = se muestra solo el botón. */
  incrustado:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3387.6!2d-64.46543!3d-31.4023895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x942d669190247b1b%3A0xf0ecd972344a83c8!2sKEOPS!5e0!3m2!1ses!2sar!4v1716000000000!5m2!1ses!2sar",
};

/** Qué línea e Instagram le corresponden a cada página. */
export function contactoDeRuta(ruta: string): { linea: LineaId; instagram: InstagramId } {
  if (ruta.startsWith("/egresados/primarios")) return { linea: "egresados", instagram: "primarios" };
  if (ruta.startsWith("/egresados/secundarios")) return { linea: "egresados", instagram: "secundarios" };
  if (ruta.startsWith("/egresados")) return { linea: "egresados", instagram: "oficial" };
  if (ruta.startsWith("/eventos") || ruta.startsWith("/institucionales")) return { linea: "eventos", instagram: "oficial" };
  if (ruta.startsWith("/academia")) return { linea: "academia", instagram: "oficial" };
  return { linea: "disco", instagram: "oficial" };
}
