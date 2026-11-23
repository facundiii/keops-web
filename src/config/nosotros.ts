// Contenido de la página Nosotros. Se completa en las etapas 3 y 4.

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
export const equipo: PersonaEquipo[] = [
  { nombre: "Diego Fernandez", rol: "DJ Residente", foto: "" },
  { nombre: "Santi Dominguez", rol: "Animador", foto: "" },
  { nombre: "Facu Fernandez", rol: "VJ / LJ / Visuales", foto: "" },
  { nombre: "Facu Ercoles", rol: "LJ", foto: "" },
  { nombre: "Santi Miñoz", rol: "VJ", foto: "" },
  { nombre: "Diego Fernandez", rol: "Técnica", foto: "" },
];
