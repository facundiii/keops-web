// Cartelera de Disco: las próximas noches.
//
// Las fechas pasadas se ocultan solas: cada noche deja de mostrarse al mediodía
// del día siguiente a su fecha. No hace falta borrarlas a mano ni volver a publicar.
// Sin noches vigentes, el sitio muestra "Pronto anunciamos las próximas noches".

/** Aviso cuando no hay fechas. El usuario de Instagram se agrega solo al final. */
export const textoSinFechas = "Pronto anunciamos las próximas noches. Seguinos en";

export interface Noche {
  /** Único por noche. Ej: "2026-12-05" */
  id: string;
  nombre: string;
  /** Fecha de la noche, en formato AAAA-MM-DD. Ej: "2026-12-05" */
  fecha: string;
  /** Hora de apertura. Ej: "00:00" */
  hora: string;
  /** DJs de la noche, en el orden en que se muestran */
  djs: string[];
  /** Arte del evento, vertical 9:16, dentro de /public. Ej: "/disco/flyers/archivo.jpg". Vacío = sin arte. */
  flyer: string;
  /** "cover" recorta para llenar el marco (por defecto); "fill" estira el arte completo. */
  flyerAjuste?: "cover" | "fill";
  /** true = el botón pasa a decir "Agotado" */
  agotado?: boolean;
  /**
   * Link para comprar la entrada de esta noche (app o web de entradas). Opcional.
   * Vacío = "Comprar entrada" lleva a la sección "Comprá tu entrada" de Disco, con los links de la app.
   */
  urlEntradas?: string;
}

export const cartelera: Noche[] = [
  // Ejemplo:
  // {
  //   id: "2026-12-05",
  //   nombre: "Nombre de la noche",
  //   fecha: "2026-12-05",
  //   hora: "00:00",
  //   djs: ["DJ Residente Diego Fernandez", "DJ Invitado ..."],
  //   flyer: "/disco/flyers/archivo.jpg",
  //   urlEntradas: "",
  // },
];
