export const siteConfig = {
  name: "Keops",
  location: "Villa Carlos Paz, CÃ³rdoba",
  heroPhrase: "Donde la noche cobra vida",
  heroSubphrase: "Villa Carlos Paz Â· CÃ³rdoba Â· Argentina",

  whatsapp: {
    number: "54 9 3541 406061",
    url: "https://wa.me/+5493541406061?text=Hola%20me%20gustar%C3%ADa%20conocer%20m%C3%A1s%20informaci%C3%B3n%20sobre%20KEOPS",
    message: "Hola Keops, quiero mÃ¡s informaciÃ³n",
  },

  instagram: {
    handle: "@keopsoficial",
    url: "https://instagram.com/keopsoficial",
  },

  tiktok: {
    handle: "@keopsoficial",
    url: "https://www.tiktok.com/@keopsoficial",
  },

  facebook: {
    handle: "keopsoficial",
    url: "https://www.facebook.com/keopsoficial",
  },

  maps: {
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3387.6!2d-64.46543!3d-31.4023895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x942d669190247b1b%3A0xf0ecd972344a83c8!2sKEOPS!5e0!3m2!1ses!2sar!4v1716000000000!5m2!1ses!2sar",
    shareUrl: "https://maps.app.goo.gl/NTLZpL4MJ9mrNuCR7",
  },

  ticketApps: {
    googlePlay: "https://play.google.com/store/apps/details?id=app.quickpass.user.keops&pcampaignid=web_share",
    appStore: "https://apps.apple.com/ar/app/fusion/id1658554122",
  },

  upcomingEvents: [
    {
      id: "1",
      name: "Â¡Gusty DJ en Vivo!",
      artist: "DJ Residente Diego Fernandez",
      credits: ["DJ Residente Diego Fernandez", "DJ Invitado Facu Fernandez"],
      date: "SÃ¡bado 7 de junio",
      time: "00:00",
      flyer: "/disco/flyers/gustydj-180126.png",
    },
    {
      id: "2",
      name: "Noche de Verano",
      artist: "DJ Ejemplo",
      date: "SÃ¡bado 14 de junio",
      time: "00:00",
      flyer: "/disco/flyers/gustydj-180126.png",
    },
    {
      id: "3",
      name: "Noche de Verano",
      artist: "DJ Ejemplo",
      date: "SÃ¡bado 21 de junio",
      time: "00:00",
      flyer: "/disco/flyers/gustydj-180126.png",
    },
    {
      id: "4",
      name: "Noche de Verano",
      artist: "DJ Ejemplo",
      date: "SÃ¡bado 28 de junio",
      time: "00:00",
      flyer: "/disco/flyer-4.jpg",
    },
    {
      id: "5",
      name: "Noche de Verano",
      artist: "DJ Ejemplo",
      date: "SÃ¡bado 5 de julio",
      time: "00:00",
      flyer: "/disco/flyer-5.jpg",
    },
    {
      id: "6",
      name: "Noche de Verano",
      artist: "DJ Ejemplo",
      date: "SÃ¡bado 12 de julio",
      time: "00:00",
      flyer: "/disco/flyer-6.jpg",
    },
  ] as {
    id: string;
    name: string;
    artist: string;
    credits?: string[];
    date: string;
    time: string;
    flyer: string;
  }[],

  nav: [
    { label: "Disco", href: "/disco" },
    { label: "Eventos", href: "/eventos" },
    { label: "Egresados", href: "/egresados" },
    { label: "Institucionales", href: "/institucionales" },
  ],

  fusion: {
    href: "/fusion",
    logoSrc: "/fusion-logo.jpeg",
    tagline: "Las tres discos mÃ¡s importantes de Villa Carlos Paz se juntaron para hacer de cada noche algo Ãºnico",
    partners: [
      { name: "Keops", logoSrc: "/logo.png" },
      { name: "Khalama", logoSrc: "/khalama.jpeg" },
      { name: "Molino", logoSrc: "/molino.jpeg" },
    ],
  },

  sections: {
    disco: {
      title: "Disco",
      tagline: "La noche en su mÃ¡xima expresiÃ³n",
      description:
        "Cada semana transformamos Keops en el epicentro de la noche de Villa Carlos Paz. DJs en vivo, iluminaciÃ³n de Ãºltimo nivel y una pista que no para hasta el amanecer.",
      paragraphs: [
        "Keops Disco es sinÃ³nimo de experiencias Ãºnicas. Con una programaciÃ³n semanal cuidadosamente diseÃ±ada, cada noche tiene su propia identidad: desde electrÃ³nica profunda hasta los mejores hits del momento.",
        "Nuestra infraestructura de sonido e iluminaciÃ³n convierte cada noche en un espectÃ¡culo. Un equipo de tÃ©cnicos y artistas visuales trabajan juntos para crear una atmÃ³sfera incomparable.",
      ],
      cta: "ConsultÃ¡ la cartelera",
      mediaPath: "/disco",
    },

    eventos: {
      title: "Eventos Privados",
      tagline: "Tu celebraciÃ³n, a otro nivel",
      description:
        "Transformamos Keops en el escenario perfecto para tu evento. CumpleaÃ±os, casamientos, despedidas â€” te brindamos un espacio Ãºnico con todo el servicio.",
      paragraphs: [
        "Desde Ã­ntimas celebraciones hasta grandes fiestas, en Keops tenemos la capacidad y el equipo para hacer de tu evento algo verdaderamente especial.",
        "Trabajamos con vos en cada detalle: ambientaciÃ³n personalizada, catering, barra abierta, DJ o banda en vivo. Tu visiÃ³n, nuestra experiencia.",
        "CoordinÃ¡ una visita o una reuniÃ³n previa para conocer el espacio y diseÃ±ar juntos el evento que siempre soÃ±aste.",
      ],
      services: [
        "AmbientaciÃ³n y decoraciÃ³n personalizada segÃºn la temÃ¡tica del evento",
        "Barra abierta con tragos clÃ¡sicos y opciones premium",
        "DJ profesional o banda en vivo a elecciÃ³n",
        "Servicio de catering con menÃº adaptable",
        "Coordinador exclusivo durante todo el evento",
        "IluminaciÃ³n y sonido de Ãºltimo nivel incluidos",
      ],
      cta: "ReservÃ¡ fecha",
      mediaPath: "/eventos",
    },

    egresados: {
      title: "Turismo Estudiantil",
      tagline: "Tu viaje de egresados, a otro nivel.",
      description:
        "MatinÃ©es pensadas para contingentes, coordinaciÃ³n directa con agencias y coordinadores de viaje, protocolos de seguridad para grupos grandes y aforo garantizado. Somos parte de la previa de miles de generaciones.",
      paragraphs: [
        "Entendemos la importancia de este momento Ãºnico. Por eso ofrecemos paquetes especiales diseÃ±ados exclusivamente para fiestas de egresados de primario y secundario.",
        "CoordinaciÃ³n completa, animaciÃ³n, producciÃ³n de video, barra habilitada segÃºn corresponda y todo lo necesario para que la noche sea perfecta.",
        "Contactanos para recibir asesoramiento especializado acorde a las necesidades de tu grupo.",
      ],
      services: [
        "MatinÃ©es exclusivas para contingentes estudiantiles",
        "CoordinaciÃ³n directa con agencias y coordinadores de viaje",
        "Protocolos de seguridad para grupos numerosos",
        "Aforo reservado segÃºn el tamaÃ±o del contingente",
        "CoordinaciÃ³n completa con animaciÃ³n y producciÃ³n de video",
        "Barra habilitada segÃºn corresponda y normativa vigente",
      ],
      cta: "Pedir informaciÃ³n",
      mediaPath: "/egresados",
    },

    institucionales: {
      title: "Institucionales",
      tagline: "Eventos corporativos con otro estilo",
      description:
        "Keops ofrece un espacio premium para eventos empresariales, lanzamientos, conferencias y celebraciones corporativas en Villa Carlos Paz.",
      paragraphs: [
        "Nuestro espacio se adapta a las necesidades de tu empresa. Desde presentaciones de producto hasta cenas de gala, contamos con la infraestructura tÃ©cnica y el servicio profesional que tu evento requiere.",
        "Capacidad modular, equipamiento audiovisual de primer nivel, conectividad y servicio de catering personalizado.",
        "Ideal para empresas que buscan una locaciÃ³n diferente, con identidad y en uno de los destinos turÃ­sticos mÃ¡s importantes del centro del paÃ­s.",
      ],
      services: [
        "Sala principal con capacidad modular adaptable al tipo de evento",
        "Equipamiento audiovisual profesional: pantallas, proyectores y micrÃ³fonos",
        "Conectividad WiFi de alta velocidad para presentaciones y streaming",
        "Catering corporativo con opciones de coffee break, almuerzo y cena",
        "AtenciÃ³n de un coordinador de eventos dedicado durante toda la jornada",
        "Estacionamiento disponible y acceso diferenciado para invitados VIP",
      ],
      cta: "Consultar disponibilidad",
      mediaPath: "/institucionales",
    },
  },
} as const;

export type SectionKey = keyof typeof siteConfig.sections;
