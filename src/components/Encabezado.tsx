import Image from "next/image";
import { claseBoton } from "@/components/ui/Boton";

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
}: EncabezadoProps) {
  return (
    <section
      className={`relative bg-negro px-4 sm:px-6 overflow-hidden ${
        foto ? "pt-36 pb-20 lg:pt-52 lg:pb-28" : "pt-32 pb-16 lg:pt-44 lg:pb-20"
      }`}
    >
      {foto && (
        <>
          <Image src={foto} alt={fotoAlt} fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-negro/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-negro via-negro/30 to-negro/60" />
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
