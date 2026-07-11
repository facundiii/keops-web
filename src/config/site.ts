export const siteConfig = {
  name: "Keops",
  location: "Villa Carlos Paz, Córdoba",
  heroPhrase: "Donde la noche cobra vida",
  heroSubphrase: "Villa Carlos Paz · Córdoba · Argentina",

  email: "info@keopsoficial.com",

  whatsapp: {
    number: "54 9 3541 406061",
    url: "https://wa.me/+5493541406061?text=Hola%20me%20gustar%C3%ADa%20conocer%20m%C3%A1s%20informaci%C3%B3n%20sobre%20KEOPS",
    message: "Hola Keops, quiero más información",
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
      id: "7",
      name: "ANKH - Día del Amigo en Keops!",
      artist: "Diego Fernandez",
      credits: ["DJ Residente Diego Fernandez", "DJ Invitado Santino Pupplo"],
      date: "Sábado 18 de julio",
      time: "00:00",
      flyer: "/disco/flyers/ankh-180726.jpg",
      flyerFit: "fill" as const,
    },
    {
      id: "1",
      name: "¡Gusty DJ en Vivo!",
      artist: "DJ Residente Diego Fernandez",
      credits: ["DJ Residente Diego Fernandez", "DJ Invitado Facu Fernandez"],
      date: "Sábado 7 de junio",
      time: "00:00",
      flyer: "/disco/flyers/gustydj-180126.png",
    },
    {
      id: "2",
      name: "Noche de Verano",
      artist: "DJ Ejemplo",
      date: "Sábado 14 de junio",
      time: "00:00",
      flyer: "/disco/flyers/gustydj-180126.png",
    },
    {
      id: "3",
      name: "Noche de Verano",
      artist: "DJ Ejemplo",
      date: "Sábado 21 de junio",
      time: "00:00",
      flyer: "/disco/flyers/gustydj-180126.png",
    },
    {
      id: "4",
      name: "Noche de Verano",
      artist: "DJ Ejemplo",
      date: "Sábado 28 de junio",
      time: "00:00",
      flyer: "/disco/flyer-4.jpg",
    },
    {
      id: "5",
      name: "Noche de Verano",
      artist: "DJ Ejemplo",
      date: "Sábado 5 de julio",
      time: "00:00",
      flyer: "/disco/flyer-5.jpg",
    },
    {
      id: "6",
      name: "Noche de Verano",
      artist: "DJ Ejemplo",
      date: "Sábado 12 de julio",
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
    flyerFit?: "cover" | "fill";
  }[],

  nav: [
    { label: "Disco", href: "/disco" },
    { label: "Eventos", href: "/eventos" },
    { label: "Egresados", href: "/egresados" },
    { label: "Institucionales", href: "/institucionales" },
  ],

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
      cta: "Consultá la cartelera",
      mediaPath: "/disco",
    },

    eventos: {
      title: "Eventos Privados",
      tagline: "Tu celebración, a otro nivel",
      description:
        "Transformamos Keops en el escenario perfecto para tu evento. Cumpleaños, casamientos, despedidas — te brindamos un espacio único con todo el servicio.",
      paragraphs: [
        "Desde íntimas celebraciones hasta grandes fiestas, en Keops tenemos la capacidad y el equipo para hacer de tu evento algo verdaderamente especial.",
        "Trabajamos con vos en cada detalle: ambientación personalizada, catering, barra abierta, DJ o banda en vivo. Tu visión, nuestra experiencia.",
        "Coordiná una visita o una reunión previa para conocer el espacio y diseñar juntos el evento que siempre soñaste.",
      ],
      services: [
        "Ambientación y decoración personalizada según la temática del evento",
        "Barra abierta con tragos clásicos y opciones premium",
        "DJ profesional o banda en vivo a elección",
        "Servicio de catering con menú adaptable",
        "Coordinador exclusivo durante todo el evento",
        "Iluminación y sonido de último nivel incluidos",
      ],
      cta: "Reservá fecha",
      mediaPath: "/eventos",
    },

    egresados: {
      title: "Turismo Estudiantil",
      tagline: "Tu viaje de egresados, a otro nivel.",
      description:
        "Matinées pensadas para contingentes, coordinación directa con agencias y coordinadores de viaje, protocolos de seguridad para grupos grandes y aforo garantizado. Somos parte de la previa de miles de generaciones.",
      paragraphs: [
        "Entendemos la importancia de este momento único. Por eso ofrecemos paquetes especiales diseñados exclusivamente para fiestas de egresados de primario y secundario.",
        "Coordinación completa, animación, producción de video, barra habilitada según corresponda y todo lo necesario para que la noche sea perfecta.",
        "Contactanos para recibir asesoramiento especializado acorde a las necesidades de tu grupo.",
      ],
      services: [
        "Matinées exclusivas para contingentes estudiantiles",
        "Coordinación directa con agencias y coordinadores de viaje",
        "Protocolos de seguridad para grupos numerosos",
        "Aforo reservado según el tamaño del contingente",
        "Coordinación completa con animación y producción de video",
        "Barra habilitada según corresponda y normativa vigente",
      ],
      cta: "Pedir información",
      mediaPath: "/egresados",
    },

    institucionales: {
      title: "Institucionales",
      tagline: "Eventos corporativos con otro estilo",
      description:
        "Keops ofrece un espacio premium para eventos empresariales, lanzamientos, conferencias y celebraciones corporativas en Villa Carlos Paz.",
      paragraphs: [
        "Nuestro espacio se adapta a las necesidades de tu empresa. Desde presentaciones de producto hasta cenas de gala, contamos con la infraestructura técnica y el servicio profesional que tu evento requiere.",
        "Capacidad modular, equipamiento audiovisual de primer nivel, conectividad y servicio de catering personalizado.",
        "Ideal para empresas que buscan una locación diferente, con identidad y en uno de los destinos turísticos más importantes del centro del país.",
      ],
      services: [
        "Sala principal con capacidad modular adaptable al tipo de evento",
        "Equipamiento audiovisual profesional: pantallas, proyectores y micrófonos",
        "Conectividad WiFi de alta velocidad para presentaciones y streaming",
        "Catering corporativo con opciones de coffee break, almuerzo y cena",
        "Atención de un coordinador de eventos dedicado durante toda la jornada",
        "Estacionamiento disponible y acceso diferenciado para invitados VIP",
      ],
      cta: "Consultar disponibilidad",
      mediaPath: "/institucionales",
    },
  },
} as const;

export type SectionKey = keyof typeof siteConfig.sections;
