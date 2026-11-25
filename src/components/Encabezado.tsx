import Image from "next/image";
import type { VideoPortada as DatosVideo } from "@/config/fotos";
import { claseBoton } from "@/components/ui/Boton";
import { EtiquetaEjemplo } from "@/components/ui/EtiquetaEjemplo";
import { VideoPortada } from "@/components/VideoPortada";

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
  /** Video de fondo. Si hay video, reemplaza a la foto. */
  video?: DatosVideo;
  /** true cuando la bajada es de ejemplo (solo en desarrollo): muestra la etiqueta */
  bajadaDeEjemplo?: boolean;
  /**
   * Cuánto se oscurece la foto. "fuerte" (por defecto) para fotos cargadas de detalle;
   * "suave" deja ver la parte de arriba de la foto y oscurece solo detrás del texto.
   */
  velo?: "fuerte" | "suave";
}

/**
 * Encabezado de página interna: antetítulo, título, bajada y botón.
 * Con foto o video ocupa casi toda la pantalla, para que la página entre con fuerza:
 * - video horizontal o foto: de fondo, con un velo negro para que se lea el texto;
 * - video vertical: de fondo en celular y, en pantallas anchas, al costado del texto, como un reel.
 * Sin foto ni video (como Preguntas frecuentes), es un encabezado corto de texto.
 */
export function Encabezado({
  antetitulo,
  titulo,
  bajada,
  boton,
  botonHref = "#contacto",
  foto,
  fotoAlt = "",
  fotoPosicion,
  video,
  bajadaDeEjemplo = false,
  velo = "fuerte",
}: EncabezadoProps) {
  const conMedio = Boolean(foto || video);
  const reel = Boolean(video?.vertical);
  // Un título corto, con foto o video, va en el tamaño de la portada de la home
  const tituloGrande = conMedio && titulo.length <= 30;

  return (
    <section
      className={`relative bg-negro px-4 sm:px-6 lg:px-8 overflow-hidden ${
        conMedio ? "encabezado-alto flex items-end pt-32 pb-16 lg:items-center lg:pt-32 lg:pb-20" : "pt-32 pb-16 lg:pt-44 lg:pb-20"
      }`}
    >
      {foto && !video && (
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
              <div className="absolute inset-0 bg-negro/50" />
              <div className="absolute inset-0 bg-gradient-to-t from-negro via-negro/30 to-negro/60" />
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-t from-negro via-negro/70 to-negro/20" />
          )}
        </>
      )}

      {video && !reel && (
        <>
          <VideoPortada src={video.src} poster={video.poster} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-negro/60 via-negro/35 to-negro" />
        </>
      )}

      <div className={`mx-auto w-full ${reel ? "max-w-7xl lg:grid lg:grid-cols-12 lg:items-center lg:gap-12" : "max-w-4xl"}`}>
        <div className={`relative z-10 ${reel ? "text-center lg:col-span-7 lg:text-left" : "text-center"}`}>
          <p className="antetitulo mb-5 animate-fade-in">{antetitulo}</p>
          <h1 className={`${tituloGrande ? "titulo-display" : "titulo-1"} text-marfil animate-fade-in-up`}>{titulo}</h1>
          {bajada && (
            <p
              className={`cuerpo mt-6 max-w-2xl animate-fade-in-up animate-delay-100 ${conMedio ? "text-marfil" : "text-arena"} ${
                reel ? "mx-auto lg:mx-0" : "mx-auto"
              }`}
            >
              {bajada}
            </p>
          )}
          {bajada && bajadaDeEjemplo && <EtiquetaEjemplo className="mt-4" />}
          {boton && (
            <div className="mt-8 animate-fade-in-up animate-delay-200">
              <a href={botonHref} className={claseBoton("principal")}>
                {boton}
              </a>
            </div>
          )}
        </div>

        {video && reel && (
          // Celular: el video llena el encabezado. Pantallas anchas: un reel al costado del texto.
          <div className="absolute inset-0 lg:relative lg:inset-auto lg:col-span-5 lg:flex lg:justify-end">
            <div className="encabezado-reel lg:rounded-2xl lg:border lg:border-piedra">
              <VideoPortada src={video.src} poster={video.poster} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-negro via-negro/55 to-negro/30 lg:hidden" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
