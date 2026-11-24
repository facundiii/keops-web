import Image from "next/image";
import { claseBoton } from "@/components/ui/Boton";
import { EtiquetaEjemplo } from "@/components/ui/EtiquetaEjemplo";

interface EncabezadoProps {
  /** A quién le habla la página */
  antetitulo: string;
  /** La promesa */
  titulo: string;
  bajada?: string;
  /** Texto del botón de contacto. Lleva al bloque de contacto de la página. */
  boton?: string;
  /** A dónde lleva el botón. Por defecto, al bloque de contacto. */
  botonHref?: string;
  /** Foto de fondo (ruta dentro de /public) y su texto alternativo */
  foto?: string;
  fotoAlt?: string;
  /** Qué parte de la foto se ve al recortarla. Ej: "center 30%" */
  fotoPosicion?: string;
  /** true cuando la bajada es de ejemplo (solo en desarrollo): muestra la etiqueta */
  bajadaDeEjemplo?: boolean;
  /**
   * Cuánto se oscurece la foto. "fuerte" (por defecto) para fotos cargadas de detalle;
   * "suave" deja ver la parte de arriba de la foto y oscurece solo detrás del texto.
   */
  velo?: "fuerte" | "suave";
}

/** Encabezado de página interna: antetítulo, título, bajada y botón. */
export function Encabezado({
  antetitulo,
  titulo,
  bajada,
  boton,
  botonHref = "#contacto",
  foto,
  fotoAlt = "",
  fotoPosicion,
  bajadaDeEjemplo = false,
  velo = "fuerte",
}: EncabezadoProps) {
  return (
    <section
      className={`relative bg-negro px-4 sm:px-6 overflow-hidden ${
        foto ? "pt-36 pb-20 lg:pt-52 lg:pb-28" : "pt-32 pb-16 lg:pt-44 lg:pb-20"
      }`}
    >
      {foto && (
        <>
          <Image
            src={foto}
            alt={fotoAlt}
            fill
            preload
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: fotoPosicion }}
          />
          {velo === "fuerte" ? (
            <>
              <div className="absolute inset-0 bg-negro/60" />
              <div className="absolute inset-0 bg-gradient-to-t from-negro via-negro/30 to-negro/60" />
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-t from-negro via-negro/70 to-negro/20" />
          )}
        </>
      )}

      <div className="relative max-w-4xl mx-auto text-center">
        <p className="antetitulo mb-5 animate-fade-in">{antetitulo}</p>
        <h1 className="titulo-1 text-marfil animate-fade-in-up">{titulo}</h1>
        {bajada && (
          <p className="cuerpo text-arena mt-6 max-w-2xl mx-auto animate-fade-in-up animate-delay-100">
            {bajada}
          </p>
        )}
        {bajada && bajadaDeEjemplo && <EtiquetaEjemplo className="mt-4" />}
        {boton && (
          <div className="mt-9 animate-fade-in-up animate-delay-200">
            <a href={botonHref} className={claseBoton("principal")}>
              {boton}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
