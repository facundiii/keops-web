// Contenido de la home.

export interface TarjetaLinea {
  id: "egresados" | "eventos" | "institucionales" | "disco" | "academia";
  antetitulo: string;
  titulo: string;
  texto: string;
  boton: string;
  href: string;
}

/** Las líneas, en el orden en que se muestran. Sin íconos. */
export const tarjetasLineas: TarjetaLinea[] = [
  {
    id: "egresados",
    antetitulo: "Egresados",
    titulo: "La fiesta que ningún hotel puede igualar.",
    texto: "Fiestas exclusivas para primario y secundario, con coordinación directa con cada agencia.",
    boton: "Soy agencia",
    href: "/egresados",
  },
  {
    id: "eventos",
    antetitulo: "Eventos privados",
    titulo: "Tu fiesta, con la producción de un boliche.",
    texto:
      "Casamientos, cumpleaños y celebraciones, con ambientación, barra, DJ o banda en vivo y catering en un solo lugar.",
    boton: "Armá tu evento",
    href: "/eventos",
  },
  {
    id: "institucionales",
    antetitulo: "Institucionales",
    titulo: "Tu evento dentro de un ícono de Carlos Paz.",
    texto: "Técnica, catering y un coordinador dedicado.",
    boton: "Pedí una propuesta",
    href: "/institucionales",
  },
  {
    id: "disco",
    antetitulo: "Disco",
    titulo: "La noche más grande de Carlos Paz.",
    texto: "Cinco espacios, sectores al aire libre y VIP.",
    boton: "Ver cartelera",
    href: "/disco",
  },
  {
    id: "academia",
    antetitulo: "Academia",
    titulo: "Aprendé el oficio detrás de la barra.",
    texto: "La academia de bartender de Keops.",
    boton: "Conocé la academia",
    href: "/academia",
  },
];
