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

  /** Banda que sigue a la primera vista, como la última línea del flyer: acá va el botón de compra. */
  banda: {
    titulo: "57 años bajo la pirámide", // TEXTO PROPUESTO
    bajada: "El sábado 12 de diciembre festejamos el aniversario de Keops.", // TEXTO PROPUESTO
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
