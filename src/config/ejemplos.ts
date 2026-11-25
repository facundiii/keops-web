// CONTENIDO DE EJEMPLO
//
// Textos genéricos para ver cómo queda cada página mientras faltan los datos reales.
// Solo se muestran en tu PC (npm run dev), con la etiqueta "De ejemplo: no se publica".
// En el sitio publicado no aparece nada de este archivo.
//
// No hace falta editar este archivo: cuando cargues el dato real en su config
// (lineas.ts, academia.ts, cartelera.ts, etc.), el ejemplo deja de usarse solo.
// Las fotos de ejemplo están en config/fotos.ts.

import type { Noche } from "./cartelera";
import type { Linea } from "./contacto";
import type { NocheFusion } from "./fusion";
import type { Argumento, Testimonio } from "./lineas";
import { lineas } from "./contacto";

// ── Fechas: siempre los próximos sábados, para que nunca queden vencidas ──
function proximosSabados(cantidad: number): string[] {
  const dia = new Date();
  dia.setHours(12, 0, 0, 0);
  dia.setDate(dia.getDate() + ((6 - dia.getDay() + 7) % 7));
  const fechas: string[] = [];
  for (let i = 0; i < cantidad; i++) {
    const mes = String(dia.getMonth() + 1).padStart(2, "0");
    const d = String(dia.getDate()).padStart(2, "0");
    fechas.push(`${dia.getFullYear()}-${mes}-${d}`);
    dia.setDate(dia.getDate() + 7);
  }
  return fechas;
}

/**
 * Cartelera de ejemplo, para ver cómo se ven las fichas y los flyers. Las noches (Gasolina, Silenzzio
 * y DOT) tienen nombre y estilo como las de verdad; los DJs y los artes son inventados (los flyers de
 * /disco/flyers/ejemplo-*.jpg están armados con las fotos del sitio).
 * Incluye una agotada y una sin arte.
 */
export function nochesDeEjemplo(): Noche[] {
  const [s1, s2, s3, s4] = proximosSabados(4);
  return [
    {
      id: "ejemplo-1",
      nombre: "Gasolina",
      estilo: "Reggaetón viejo",
      fecha: s1,
      hora: "00:00",
      djs: ["Martín Ríos", "Sofi Lazo b2b Nico Ferrán"],
      flyer: "/disco/flyers/ejemplo-gasolina.jpg",
    },
    {
      // Una fiesta con auriculares: cada DJ va por un canal, con un estilo de música distinto.
      // Va como agotada: los auriculares son limitados.
      id: "ejemplo-2",
      nombre: "Silenzzio",
      estilo: "Fiesta con auriculares, tres canales",
      fecha: s2,
      hora: "00:30",
      djs: ["Juli Benítez (reggaetón)", "Tomi Acosta (electrónica)", "Luca Mora (cuarteto y rock)"],
      flyer: "/disco/flyers/ejemplo-silenzzio.jpg",
      agotado: true,
    },
    {
      id: "ejemplo-3",
      nombre: "DOT",
      estilo: "Electrónica",
      fecha: s3,
      hora: "00:00",
      djs: ["Agus Peralta", "Mica Funes b2b Santi Vera", "Bruno Cáceres"],
      flyer: "/disco/flyers/ejemplo-dot.jpg",
    },
    { id: "ejemplo-4", nombre: "Noche sin arte", fecha: s4, hora: "00:00", djs: ["DJ Residente"], flyer: "" },
  ];
}

/** Noches Fusion de ejemplo, con flyers armados con las fotos del sitio (/fusion/flyers/ejemplo-*.jpg). */
export function nochesFusionDeEjemplo(): NocheFusion[] {
  const [s1, s2, s3] = proximosSabados(3);
  return [
    { id: "ejemplo-f1", nombre: "Fusion en Keops", fecha: s1, lugar: "Keops", urlEntradas: "", flyer: "/fusion/flyers/ejemplo-keops.jpg" },
    { id: "ejemplo-f2", nombre: "Fusion en Khalama", fecha: s2, lugar: "Khalama", urlEntradas: "", flyer: "/fusion/flyers/ejemplo-khalama.jpg" },
    {
      id: "ejemplo-f3",
      nombre: "Fusion en Molino",
      fecha: s3,
      lugar: "Molino",
      urlEntradas: "",
      agotado: true,
      flyer: "/fusion/flyers/ejemplo-molino.jpg",
    },
  ];
}

export const ejemplos = {
  comoLlegar: {
    direccion: "Roque Sáenz Peña, Villa Carlos Paz, Córdoba",
    estacionamiento: "Estacionamiento propio, sin cargo para quienes vienen al evento.",
    transporteContingentes: "Los micros tienen un sector de ascenso y descenso frente al ingreso.",
  },

  espacios: {
    pistaCentral: {
      capacidad: "Hasta 2.500 personas",
      descripcion: "La pista principal, bajo el techo en forma de pirámide. Escenario, pantallas LED y el mayor despliegue de sonido y luces.",
    },
    salonEleton: {
      capacidad: "Hasta 800 personas",
      descripcion: "Un salón con pista y barra propias, que se arma a medida para fiestas y eventos.",
    },
    salonBar: {
      capacidad: "Hasta 400 personas",
      descripcion: "Un espacio más íntimo alrededor de la barra, para recepciones y celebraciones chicas.",
    },
    garden: {
      capacidad: "Hasta 1.000 personas",
      descripcion: "El sector al aire libre, para recepciones, atardeceres y noches de verano.",
    },
    vip: {
      capacidad: "Hasta 300 personas",
      descripcion: "Un sector reservado, con barra y atención propias.",
    },
  } as Record<string, { capacidad: string; descripcion: string }>,

  argumentos: {
    eventos: [
      { titulo: "Todo en un solo lugar", texto: "Ambientación, barra, música y catering, coordinados por un mismo equipo." },
      { titulo: "Cinco espacios", texto: "Elegís el espacio según la cantidad de invitados y el tipo de fiesta." },
      { titulo: "Producción de boliche", texto: "Sonido, luces y pantallas de una disco, puestos al servicio de tu evento." },
      { titulo: "Un coordinador para vos", texto: "Una persona te acompaña desde la primera reunión hasta el final de la noche." },
    ] as Argumento[],
  },

  testimonios: {
    egresados: [
      {
        texto: "La coordinación con Keops fue simple y los chicos volvieron hablando de la fiesta.",
        autor: "Nombre y apellido, agencia de ejemplo",
        autorizado: true,
      },
    ] as Testimonio[],
    eventos: [
      {
        texto: "El equipo se ocupó de todo y la fiesta salió como la imaginábamos.",
        autor: "Nombre y apellido, cumpleaños de 15",
        autorizado: true,
      },
      {
        texto: "Nos resolvieron el salón, la barra y la música en una sola reunión.",
        autor: "Nombre y apellido, casamiento",
        autorizado: true,
      },
    ] as Testimonio[],
  },

  /** "Para las familias", en las páginas de Egresados */
  paraLasFamilias: [
    "Cada fiesta de egresados es exclusiva para los contingentes: esa noche no ingresa público general.",
    "El ingreso y la salida se coordinan con la agencia y los coordinadores del viaje, y hay personal de seguridad durante toda la fiesta.",
  ],

  academia: {
    bajada: "Un curso práctico para aprender coctelería y trabajo de barra dentro de un boliche en funcionamiento.",
    temas: [
      "Coctelería clásica",
      "Técnicas de servicio y velocidad en barra",
      "Armado y orden de la estación de trabajo",
      "Destilados, licores e insumos",
      "Atención al cliente",
      "Práctica en una barra real",
    ],
    modalidad: {
      duracion: "8 semanas",
      diasYHorarios: "Martes y jueves, de 18 a 21 h",
      cupos: "20 personas por grupo",
      requisitos: "Ser mayor de 18 años. No hace falta experiencia.",
    },
    docentes: [
      { nombre: "Docente de ejemplo", rol: "Jefe de barra", foto: "" },
      { nombre: "Otro docente de ejemplo", rol: "Bartender", foto: "" },
    ],
    inscripcionBajada: "Escribinos y te contamos fechas de inicio, valores y formas de pago.",
    /** Contacto de ejemplo: usa el WhatsApp de Disco para que el botón funcione. */
    contacto: {
      nombre: "Academia",
      mail: "academia@keops.ar",
      whatsapp: lineas.disco.whatsapp,
      whatsappVisible: lineas.disco.whatsappVisible,
      mensaje: "Hola, me gustaría consultar sobre la academia de bartender de Keops",
    } as Linea,
  },

  fusion: {
    url: "https://example.com",
  },

  faq: {
    /** Respuestas de ejemplo para las preguntas que todavía no tienen respuesta, por pregunta. */
    respuestas: {
      "¿Cuál es la edad mínima para entrar?": "La edad mínima de ingreso es de 18 años, con DNI.",
      "¿Cómo se cuida a los chicos?":
        "Cada fiesta tiene control de acceso, personal de seguridad y coordinación permanente con la agencia y los coordinadores del contingente.",
    } as Record<string, string>,
    /** Preguntas de ejemplo para los grupos que todavía no tienen ninguna. */
    preguntas: {
      academia: [
        { pregunta: "¿Necesito experiencia previa?", respuesta: "No. El curso empieza desde cero." },
        { pregunta: "¿Entregan certificado?", respuesta: "Sí, al terminar el curso." },
        { pregunta: "¿Dónde se cursa?", respuesta: "En las barras de Keops, en Villa Carlos Paz." },
      ],
    } as Record<string, { pregunta: string; respuesta: string }[]>,
  },
};
