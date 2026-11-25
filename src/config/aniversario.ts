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
    /** Quien cierra la noche, en grande */
    cabeza: "Luciano Bertorello",
    /** Cada fila del resto del lineup: dos nombres en la misma fila son un b2b */
    lineup: [["Lucas Reartes", "Lukas Roldán"], ["Fferniot"]],
    bajada: "Electrónica, la misma noche y en otro sector de Keops.", // TEXTO PROPUESTO
    /** En qué sector de Keops va DOT, ej. "Salón Eletón". A COMPLETAR. Vacío = no se muestra. */
    sector: "",
    /** Hora de DOT, ej. "01:00". A COMPLETAR. Vacía = no se muestra. */
    hora: "",
    /** Link de entradas solo para DOT, si tiene las suyas. Vacío = sin botón: la entrada está en el cierre. */
    urlEntradas: "",
    boton: "Entradas para DOT",
  },

  /** Banda del cierre, después de DOT: acá va el botón de compra de la noche. */
  banda: {
    titulo: "La noche del aniversario", // TEXTO PROPUESTO
    bajada: "El sábado 12 de diciembre festejamos los 57 años de Keops: la pirámide y DOT, la misma noche.", // TEXTO PROPUESTO
    boton: "Comprar entrada",
    /**
     * Link directo a esta noche en la app de entradas (Quickpass). A COMPLETAR.
     * Vacío = el botón lleva a "Comprá tu entrada" en Disco.
     */
    urlEntradas: "",
    /** Hora de apertura, ej. "00:30". A COMPLETAR. Vacía = no se muestra. */
    hora: "",
    /** Línea chica debajo del botón */
    nota: "Entradas en la app Quickpass",
  },
};

/** true si la versión especial corresponde en este momento (milisegundos desde 1970). */
export function aniversarioVigente(ahora: number): boolean {
  return aniversario.activo && ahora < Date.parse(aniversario.fin);
}
