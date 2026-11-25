// Versión especial de la home para el aniversario de Keops.
//
// Se ve mientras `activo` sea true y todavía no haya llegado `fin`.
// Pasado `fin`, la home vuelve sola a la normal: el navegador de cada persona
// compara la fecha, así que no hace falta volver a publicar el sitio.
// Las fechas van con la hora y la zona de Argentina (-03:00).

export const aniversario = {
  /** false = no se muestra nunca, aunque las fechas estén vigentes */
  activo: true,

  /** Momento en que el contador llega a cero */
  cuentaHasta: "2026-12-12T23:59:00-03:00",
  /** Cuándo se apaga sola la versión especial */
  fin: "2026-12-13T12:00:00-03:00",

  /** Fecha corta de arriba, como en el flyer */
  fechaCorta: "SÁB 12 DIC",
  /** Palabra sobre el logo */
  palabra: "Aniversario",
  /** Texto del logo "57 años", para lectores de pantalla. El 57 está dibujado: otro año necesita otro dibujo. */
  anios: "57 años",

  /**
   * Hora de apertura de la noche, ej. "00:30": la pirámide y DOT abren a la misma hora.
   * Se muestra en DOT y en el cierre. A COMPLETAR. Vacía = no se muestra.
   */
  hora: "",

  contador: {
    faltan: "Faltan",
    /** Se muestra cuando el contador llega a cero, hasta `fin` */
    esNoche: "Es esta noche",
  },

  /** La invitación de abajo de la portada: la pirámide es la introducción y la noche sigue al bajar */
  invitacion: "Lo que hay esa noche", // TEXTO PROPUESTO

  /** DOT: la electrónica de la misma noche, en otro sector. Datos del flyer de @dotbykeops. */
  dot: {
    /** Nombre del sector, como en el flyer. Si llega el logo en archivo, reemplaza al texto. */
    nombre: "DOT.",
    subtitulo: "Aniversario de Keops",
    /**
     * El lineup en orden de salida: la primera fila abre la noche.
     * Dos nombres en la misma fila son un b2b.
     */
    lineup: [["Fferniot"], ["Lucas Reartes", "Lukas Roldán"]],
    /** Quien cierra la noche: va después del lineup y en grande */
    cabeza: "Luciano Bertorello",
    bajada: "Electrónica, la misma noche y en otro sector de Keops.", // TEXTO PROPUESTO
    /** En qué sector de Keops va DOT, ej. "Salón Eletón". A COMPLETAR. Vacío = no se muestra. */
    sector: "",
  },

  /** Banda del cierre, después de DOT: acá va el único botón de compra de la noche. */
  banda: {
    titulo: "La noche del aniversario", // TEXTO PROPUESTO
    bajada: "El sábado 12 de diciembre festejamos los 57 años de Keops: la pirámide y DOT, la misma noche.", // TEXTO PROPUESTO
    boton: "Comprar entrada",
    /**
     * Link directo a esta noche en la app de entradas (Quickpass). A COMPLETAR.
     * Vacío = el botón lleva a "Comprá tu entrada" en Disco.
     */
    urlEntradas: "",
    /** Línea chica debajo del botón */
    nota: "Entradas en la app Quickpass",
  },
};

/** true si la versión especial corresponde en este momento (milisegundos desde 1970). */
export function aniversarioVigente(ahora: number): boolean {
  return aniversario.activo && ahora < Date.parse(aniversario.fin);
}
