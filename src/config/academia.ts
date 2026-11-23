// Contenido de la página Academia de bartender.
// Todo lo vacío está A COMPLETAR. Regla: un bloque sin contenido no se muestra.
// El WhatsApp y el mail de la academia se cargan en config/contacto.ts (línea "academia").

export const academia = {
  meta: {
    titulo: "Academia",
    descripcion: "La academia de bartender de Keops, en Villa Carlos Paz.",
  },

  encabezado: {
    antetitulo: "Academia de bartender",
    titulo: "Aprendé el oficio detrás de la barra",
    bajada: "", // A COMPLETAR
  },

  /** Qué vas a aprender: lista de temas. */
  temas: {
    titulo: "Qué vas a aprender",
    lista: [] as string[], // A COMPLETAR
  },

  /** Modalidad. Cada dato vacío no se muestra; con todos vacíos, el bloque se oculta. */
  modalidad: {
    titulo: "Modalidad",
    duracion: "", // A COMPLETAR
    diasYHorarios: "", // A COMPLETAR
    cupos: "", // A COMPLETAR
    requisitos: "", // A COMPLETAR
  },

  /** Docentes (opcional). */
  docentes: {
    titulo: "Docentes",
    lista: [] as { nombre: string; rol: string; foto: string }[], // A COMPLETAR
  },

  inscripcion: {
    titulo: "Inscripción",
    bajada: "", // A COMPLETAR
  },
};
