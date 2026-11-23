// Contenido de la página Fusion.

export interface NocheFusion {
  /** Único por noche. Ej: "2026-12-12" */
  id: string;
  nombre: string;
  /** Fecha de la noche, en formato AAAA-MM-DD. Se oculta sola al mediodía del día siguiente. */
  fecha: string;
  /** Dónde es. Ej: "Keops", "Khalama", "Molino". Vacío = no se muestra. */
  lugar: string;
  /** Link para comprar la entrada de esa noche. Vacío = se usa el link general de Fusion (`url`). */
  urlEntradas: string;
  /** true = el botón pasa a decir "Agotado" */
  agotado?: boolean;
}

export const fusion = {
  meta: {
    titulo: "Fusion",
    descripcion:
      "Fusion: las tres discos más importantes de Villa Carlos Paz, Keops, Khalama y Molino, juntas en una misma noche.",
  },

  logo: "/fusion-logo.png",

  /** Qué es Fusion */
  texto: "Las tres discos más importantes de Villa Carlos Paz se juntaron para hacer de cada noche algo único.",

  /** Link a la app o al sitio de Fusion. Vacío = el botón no se muestra. */
  url: "", // A COMPLETAR
  textoBoton: "Ir a Fusion",

  discos: [
    { nombre: "Keops", logo: "/logo.png" },
    { nombre: "Khalama", logo: "/khalama.png" },
    { nombre: "Molino", logo: "/molino.png" },
  ],

  tickets: {
    antetitulo: "Tickets",
    titulo: "Próximas noches Fusion",
    sinFechas: "Pronto anunciamos las próximas noches.",
    noches: [
      // A COMPLETAR. Ej:
      // { id: "2026-12-12", nombre: "Fusion en Keops", fecha: "2026-12-12", lugar: "Keops", urlEntradas: "" },
    ] as NocheFusion[],
  },

  contacto: { titulo: "Escribinos", bajada: "" },
};
