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

// ── Historia ─────────────────────────────────────────────────────

export interface Hito {
  /** Como se muestra: "1969", "Septiembre 2021". La foto se asigna por esta fecha en config/fotos.ts. */
  fecha: string;
  texto: string;
  /** SOLO se muestran los hitos con `confirmado: true`. */
  confirmado: boolean;
}

export const historia: { antetitulo: string; titulo: string; hitos: Hito[] } = {
  antetitulo: "Historia",
  titulo: "Desde 1969",
  hitos: [
    { fecha: "1969", texto: "Abre Keops en Villa Carlos Paz.", confirmado: false },
    { fecha: "2010", texto: "El frente de Keops, con la pirámide iluminada.", confirmado: false },
    { fecha: "2019", texto: "Keops cumple 50 años.", confirmado: false },
    {
      fecha: "2020",
      texto: "Una fiesta de verano en Keops llega a la tapa de la revista Paparazzi.",
      confirmado: false,
    },
    {
      fecha: "Septiembre 2021",
      texto: "Keops reabre después de 18 meses cerrado por la pandemia.",
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
    { id: "vip", nombre: "VIP +30", capacidad: "", descripcion: "" }, // A COMPLETAR
  ],
};

// ── Equipo ───────────────────────────────────────────────────────

export interface PersonaEquipo {
  nombre: string;
  rol: string;
  /** Ruta dentro de /public. Vacío = tarjeta sin foto. */
  foto: string;
}

/**
 * Nuestro equipo. Sin personas cargadas, el bloque no se muestra.
 * Estos nombres y roles vienen del pie del sitio anterior.
 */
export const equipo: { antetitulo: string; titulo: string; personas: PersonaEquipo[] } = {
  antetitulo: "Equipo",
  titulo: "Nuestro equipo",
  personas: [
    { nombre: "Diego Fernandez", rol: "DJ Residente", foto: "" },
    { nombre: "Santi Dominguez", rol: "Animador", foto: "" },
    { nombre: "Facu Fernandez", rol: "VJ / LJ / Visuales", foto: "" },
    { nombre: "Facu Ercoles", rol: "LJ", foto: "" },
    { nombre: "Santi Miñoz", rol: "VJ", foto: "" },
    { nombre: "Diego Fernandez", rol: "Técnica", foto: "" },
  ],
};
