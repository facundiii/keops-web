// Menú principal del sitio, en el orden en que se muestra.

/** Ruta de la home. */
export const RUTA_INICIO = "/";

export interface ItemNav {
  etiqueta: string;
  href: string;
  hijos?: { etiqueta: string; href: string }[];
}

// Primero lo que se ofrece, con Disco adelante; "Nosotros" cierra. La home muestra las líneas
// en este mismo orden (config/home.ts).
export const navegacion: ItemNav[] = [
  { etiqueta: "Disco", href: "/disco" },
  {
    etiqueta: "Egresados",
    href: "/egresados",
    hijos: [
      { etiqueta: "Primarios", href: "/egresados/primarios" },
      { etiqueta: "Secundarios", href: "/egresados/secundarios" },
    ],
  },
  { etiqueta: "Eventos privados", href: "/eventos" },
  { etiqueta: "Academia", href: "/academia" },
  { etiqueta: "Nosotros", href: "/nosotros" },
];

/** Va al final, en texto, después de un divisor. */
export const navFusion: ItemNav = { etiqueta: "Fusion", href: "/fusion" };

/**
 * Preguntas frecuentes: un signo de pregunta en la barra (después de Fusion) y un renglón en el menú
 * de celular. La etiqueta es lo que lee el lector de pantalla y lo que se ve en ese renglón y en el pie.
 * Se muestra solo si la página existe, es decir, si hay alguna pregunta para mostrar (lib/faq.ts).
 */
export const navPreguntas: ItemNav = { etiqueta: "Preguntas frecuentes", href: "/preguntas-frecuentes" };
