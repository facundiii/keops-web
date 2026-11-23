// Datos generales del sitio.
//
// El resto del contenido está repartido por tema:
//   contacto.ts    contacto de cada línea, Instagram por página y link del mapa
//   navegacion.ts  menú principal
//   home.ts        contenido de la home
//   lineas.ts      Egresados, Eventos privados e Institucionales
//   nosotros.ts    página Nosotros (misión, historia, espacios, equipo)
//   academia.ts    página Academia
//   comoLlegar.ts  sección "Cómo llegar"
//   faq.ts         preguntas frecuentes

export const siteConfig = {
  name: "Keops",
  location: "Villa Carlos Paz, Córdoba",
  url: "https://keops.ar",
  descripcion:
    "Disco, egresados, eventos privados e institucionales en Villa Carlos Paz, Córdoba. Desde 1969.",

  ticketApps: {
    googlePlay: "https://play.google.com/store/apps/details?id=app.quickpass.user.keops&pcampaignid=web_share",
    appStore: "https://apps.apple.com/ar/app/fusion/id1658554122",
  },

  // Cartelera: agregá acá cada fecha. Ejemplo:
  // {
  //   id: "1",
  //   name: "Nombre de la fiesta",
  //   artist: "DJ Residente ...",
  //   credits: ["DJ Residente ...", "DJ Invitado ..."], // opcional
  //   date: "Sábado 6 de diciembre",
  //   time: "00:00",
  //   flyer: "/disco/flyers/archivo.jpg",              // imagen 9:16 en public/disco/flyers/
  //   flyerFit: "fill" as const,                        // opcional
  // },
  upcomingEvents: [] as {
    id: string;
    name: string;
    artist: string;
    credits?: string[];
    date: string;
    time: string;
    flyer: string;
    flyerFit?: "cover" | "fill";
  }[],

  fusion: {
    href: "/fusion",
    logoSrc: "/fusion-logo.png",
    tagline: "Las tres discos más importantes de Villa Carlos Paz se juntaron para hacer de cada noche algo único",
    partners: [
      { name: "Keops", logoSrc: "/logo.png" },
      { name: "Khalama", logoSrc: "/khalama.png" },
      { name: "Molino", logoSrc: "/molino.png" },
    ],
  },

  // Disco: textos actuales. Se renuevan en la Etapa 4.
  sections: {
    disco: {
      title: "Disco",
      tagline: "La noche en su máxima expresión",
      description:
        "Cada semana transformamos Keops en el epicentro de la noche de Villa Carlos Paz. DJs en vivo, iluminación de último nivel y una pista que no para hasta el amanecer.",
      paragraphs: [
        "Keops Disco es sinónimo de experiencias únicas. Con una programación semanal cuidadosamente diseñada, cada noche tiene su propia identidad: desde electrónica profunda hasta los mejores hits del momento.",
        "Nuestra infraestructura de sonido e iluminación convierte cada noche en un espectáculo. Un equipo de técnicos y artistas visuales trabajan juntos para crear una atmósfera incomparable.",
      ],
    },
  },
} as const;
