// Menú principal del sitio, en el orden en que se muestra.

/** Ruta de la home. */
export const RUTA_INICIO = "/";

export interface ItemNav {
  etiqueta: string;
  href: string;
  hijos?: { etiqueta: string; href: string }[];
}

export const navegacion: ItemNav[] = [
  { etiqueta: "Nosotros", href: "/nosotros" },
  {
    etiqueta: "Egresados",
    href: "/egresados",
    hijos: [
      { etiqueta: "Primarios", href: "/egresados/primarios" },
      { etiqueta: "Secundarios", href: "/egresados/secundarios" },
    ],
  },
  { etiqueta: "Eventos privados", href: "/eventos" },
  { etiqueta: "Disco", href: "/disco" },
  { etiqueta: "Academia", href: "/academia" },
];

/** Va al final, en texto, después de un divisor. */
export const navFusion: ItemNav = { etiqueta: "Fusion", href: "/fusion" };
