// Contenido de la página Disco.
// Las noches se cargan en config/cartelera.ts y la foto del encabezado en config/fotos.ts.

import type { Medio } from "./lineas";

export const disco = {
  meta: {
    titulo: "Disco",
    descripcion:
      "La cartelera de Keops Disco, en Villa Carlos Paz. En verano, la temporada más intensa; el resto del año, noches especiales.",
  },

  encabezado: {
    antetitulo: "Disco",
    titulo: "La noche más grande de Carlos Paz",
    bajada: "En verano, la temporada más intensa de Carlos Paz. El resto del año, noches especiales.",
  },

  cartelera: {
    antetitulo: "Cartelera",
    titulo: "La agenda de la pirámide",
  },

  entradas: {
    antetitulo: "Entradas",
    titulo: "Comprá tu entrada",
    texto: "Sacá tu entrada desde la app.",
    googlePlay: "https://play.google.com/store/apps/details?id=app.quickpass.user.keops&pcampaignid=web_share",
    appStore: "https://apps.apple.com/ar/app/fusion/id1658554122",
  },

  /** Se muestra solo con 6 imágenes o más, o con al menos un video. */
  galeria: {
    titulo: "Galería",
    medios: [
      // A COMPLETAR. Ej:
      // { tipo: "imagen", src: "/fotos/02-pista-central.jpg", alt: "Pista central de Keops con luces amarillas" },
    ] as Medio[],
  },

  contacto: { titulo: "Escribinos", bajada: "" },
};
