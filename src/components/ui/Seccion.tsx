import type { ReactNode } from "react";

interface SeccionProps {
  children: ReactNode;
  id?: string;
  /** Ancho máximo del contenido */
  ancho?: "angosto" | "medio" | "ancho" | "amplio";
  className?: string;
}

const anchos = { angosto: "max-w-3xl", medio: "max-w-5xl", ancho: "max-w-6xl", amplio: "max-w-7xl" };

/** Bloque de página: fondo negro, divisor arriba y aire parejo. */
export function Seccion({ children, id, ancho = "ancho", className = "" }: SeccionProps) {
  return (
    <section
      id={id}
      className={`bg-negro border-t border-piedra py-16 lg:py-24 px-4 sm:px-6 lg:px-8 scroll-mt-4 ${className}`.trim()}
    >
      <div className={`${anchos[ancho]} mx-auto`}>{children}</div>
    </section>
  );
}

interface TituloSeccionProps {
  titulo: string;
  antetitulo?: string;
  bajada?: string;
  centrado?: boolean;
  className?: string;
}

/** Antetítulo + H2 (+ bajada) de un bloque. */
export function TituloSeccion({ titulo, antetitulo, bajada, centrado = false, className = "" }: TituloSeccionProps) {
  return (
    <div className={`mb-10 lg:mb-12 ${centrado ? "text-center" : ""} ${className}`.trim()}>
      {antetitulo && <p className="antetitulo mb-3">{antetitulo}</p>}
      <h2 className="titulo-2 text-marfil">{titulo}</h2>
      {bajada && (
        <p className={`cuerpo text-arena mt-4 max-w-2xl ${centrado ? "mx-auto" : ""}`}>{bajada}</p>
      )}
    </div>
  );
}
