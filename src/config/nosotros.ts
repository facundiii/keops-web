// Contenido de la página Nosotros.
// Regla: un bloque sin contenido no se muestra.

export const encabezado = {
  antetitulo: "Nosotros",
  titulo: "La pirámide de Carlos Paz",
  bajada: "Desde 1969, generaciones enteras bailaron bajo esta pirámide.",
};

export const mision = {
  antetitulo: "Misión",
  // Texto propuesto, editable. Vacío = el bloque no se muestra.
  texto:
    "Hacer que cada fiesta en Keops se recuerde: con la escala, la producción y el oficio que nos acompañan desde 1969.",
};

// ── Historia: línea de tiempo ────────────────────────────────────
//
// Cada hito lleva el año, un párrafo breve y una imagen.
// La imagen de cada año se asigna en config/fotos.ts (nosotros.historia), por el año.
//
// `confirmado`: en el sitio publicado SOLO se ven los hitos con `confirmado: true`.
// Mientras trabajás en tu PC (npm run dev) se ven todos, y los que faltan confirmar
// llevan la etiqueta "Sin confirmar" para que los puedas revisar antes de publicarlos.

export interface Hito {
  /** Año del hito. Ej: "1969" */
  anio: string;
  /** Párrafo breve sobre ese año */
  texto: string;
  confirmado: boolean;
}

export const historia: { antetitulo: string; titulo: string; hitos: Hito[] } = {
  antetitulo: "Historia",
  titulo: "Desde 1969",
  // TEXTOS DE EJEMPLO: la primera oración de cada año es el dato real; el resto es relleno
  // genérico para ver cómo queda la línea de tiempo. Reemplazalos por la historia real
  // antes de pasar `confirmado` a true.
  hitos: [
    {
      anio: "1969",
      texto:
        "Abre Keops en Villa Carlos Paz. La pirámide empieza a recibir a la ciudad y a quienes la visitan cada temporada, y se vuelve un punto de encuentro de la noche.",
      confirmado: false,
    },
    {
      anio: "2010",
      texto:
        "El frente de Keops, con la pirámide iluminada. Una imagen que ya es parte del paisaje de Carlos Paz y que se reconoce desde lejos.",
      confirmado: false,
    },
    {
      anio: "2019",
      texto:
        "Keops cumple 50 años. Medio siglo de noches, festejado con quienes pasaron por la pista en distintas épocas.",
      confirmado: false,
    },
    {
      anio: "2020",
      texto:
        "Una fiesta de verano en Keops llega a la tapa de la revista Paparazzi. La temporada pone a la pirámide en el centro de la escena.",
      confirmado: false,
    },
    {
      anio: "2021",
      texto:
        "En septiembre, Keops reabre después de 18 meses cerrado por la pandemia. La pista vuelve a encenderse y empieza una nueva etapa.",
      confirmado: false,
    },
  ],
};

// ── Espacios ─────────────────────────────────────────────────────

export interface Espacio {
  id: "pistaCentral" | "salonEleton" | "salonBar" | "garden" | "vip";
  nombre: string;
  /** Ej: "Hasta 1.500 personas". Vacío = no se muestra. */
  capacidad: string;
  /** Vacío = no se muestra. */
  descripcion: string;
}

export const espacios: { antetitulo: string; titulo: string; lista: Espacio[] } = {
  antetitulo: "Espacios",
  titulo: "Cinco espacios",
  lista: [
    { id: "pistaCentral", nombre: "Pista Central", capacidad: "", descripcion: "" }, // A COMPLETAR
    { id: "salonEleton", nombre: "Salón Eletón", capacidad: "", descripcion: "" }, // A COMPLETAR
    { id: "salonBar", nombre: "Salón Bar", capacidad: "", descripcion: "" }, // A COMPLETAR
    { id: "garden", nombre: "Keops Garden", capacidad: "", descripcion: "" }, // A COMPLETAR
    { id: "vip", nombre: "Salón VIP", capacidad: "", descripcion: "" }, // A COMPLETAR
  ],
};

// ── Nuestro equipo ───────────────────────────────────────────────
//
// El equipo, por área. Un área sin personas no se muestra; sin ninguna, el bloque tampoco.
// `rol` es opcional: vacío, se muestra solo el nombre debajo del área.

export interface PersonaEquipo {
  nombre: string;
  rol: string;
}

export const equipo: { antetitulo: string; titulo: string; areas: { nombre: string; personas: PersonaEquipo[] }[] } = {
  antetitulo: "Equipo",
  titulo: "Nuestro equipo",
  areas: [
    {
      nombre: "Administración",
      personas: [
        { nombre: "Francisco Giordano", rol: "" },
        { nombre: "Débora Bourdieu", rol: "" },
        { nombre: "Jessica Sosa", rol: "" },
      ],
    },
    {
      // La cabina: quien pone la música y quienes manejan las visuales (VJ) y las luces (LJ)
      nombre: "Cabina",
      personas: [
        { nombre: "Diego Fernandez", rol: "DJ Residente" },
        { nombre: "Facundo Fernandez", rol: "VJ / LJ" },
        { nombre: "Facundo Ercoles", rol: "VJ / LJ" },
        { nombre: "Santiago Miñoz", rol: "VJ / LJ" },
      ],
    },
  ],
};
