import type { ReactNode } from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import type { PaginaLinea } from "@/config/lineas";
import { preguntasDe } from "@/config/faq";
import { Encabezado } from "@/components/Encabezado";
import { BloqueArgumentos } from "@/components/BloqueArgumentos";
import { Seccion, TituloSeccion } from "@/components/ui/Seccion";
import { Galeria, type MediaItem } from "@/components/Galeria";
import { EventosGallery } from "@/components/EventosGallery";
import { PhotoGallery } from "@/components/PhotoGallery";
import { PreguntasFrecuentes } from "@/components/PreguntasFrecuentes";
import { ContactCTA } from "@/components/ContactCTA";
import { FadeInSection } from "@/components/FadeInSection";

export interface FotoPagina {
  src: string;
  alt: string;
}

interface PlantillaLineaProps {
  pagina: PaginaLinea;
  /** Fotos opcionales de la página (se asignan desde config/fotos.ts) */
  fotos?: { encabezado?: FotoPagina; porQue?: FotoPagina; incluye?: FotoPagina };
  /** Contenido extra dentro del bloque de contacto (por ejemplo, un formulario) */
  children?: ReactNode;
}

/**
 * Plantilla común de las páginas de línea, en este orden:
 * 1. Encabezado  2. Por qué Keops  3. Qué incluye  4. Galería
 * 5. Referencias  6. Preguntas frecuentes  7. Contacto
 * Cada bloque se oculta solo si no tiene contenido.
 */
export function PlantillaLinea({ pagina, fotos = {}, children }: PlantillaLineaProps) {
  const { encabezado, porQue, incluye, galeria, referencias, extra, contacto } = pagina;

  // 4. Galería: solo con 6 imágenes o más, o con al menos un video
  const imagenes = galeria.medios.filter((m) => m.tipo === "imagen");
  const videos = galeria.medios.filter((m) => m.tipo === "video");
  const hayGaleria = videos.length > 0 || imagenes.length >= 6;
  const medios: MediaItem[] = galeria.medios.map((m) =>
    m.tipo === "video" ? { type: "video", src: m.src, label: m.titulo } : { type: "image", src: m.src, alt: m.alt }
  );

  // 5. Referencias: solo las autorizadas
  const logos = referencias.logos.filter((r) => r.autorizado);
  const testimonios = referencias.testimonios.filter((t) => t.autorizado && t.texto.trim() !== "");

  // 6. Preguntas frecuentes: solo las confirmadas
  const preguntas = preguntasDe(pagina.faq);

  const parrafosExtra = extra?.parrafos.filter((p) => p.trim() !== "") ?? [];

  return (
    <>
      {/* 1. Encabezado */}
      <Encabezado
        antetitulo={encabezado.antetitulo}
        titulo={encabezado.titulo}
        bajada={encabezado.bajada}
        boton={encabezado.boton}
        foto={fotos.encabezado?.src}
        fotoAlt={fotos.encabezado?.alt}
      />

      {/* 2. Por qué Keops */}
      <BloqueArgumentos titulo={porQue.titulo} argumentos={porQue.argumentos} foto={fotos.porQue} />

      {/* 3. Qué incluye */}
      {incluye.servicios.length > 0 && (
        <Seccion>
          <div className={fotos.incluye ? "grid gap-10 lg:grid-cols-2 lg:gap-16 lg:items-center" : ""}>
            <div>
              <FadeInSection>
                <TituloSeccion titulo={incluye.titulo} />
              </FadeInSection>
              <ul className={`grid gap-x-12 gap-y-5 ${fotos.incluye ? "" : "sm:grid-cols-2"}`}>
                {incluye.servicios.map((servicio, i) => (
                  <li key={servicio}>
                    <FadeInSection delay={i * 60}>
                      <span className="cuerpo text-marfil flex items-start gap-3">
                        <Check size={24} strokeWidth={1.5} aria-hidden="true" className="shrink-0 text-oro mt-0.5" />
                        {servicio}
                      </span>
                    </FadeInSection>
                  </li>
                ))}
              </ul>
            </div>

            {fotos.incluye && (
              <FadeInSection>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-piedra">
                  <Image
                    src={fotos.incluye.src}
                    alt={fotos.incluye.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </FadeInSection>
            )}
          </div>
        </Seccion>
      )}

      {/* 4. Galería */}
      {hayGaleria && (
        <Seccion className={galeria.estilo === "cine" ? "!px-0" : ""}>
          <FadeInSection>
            <TituloSeccion titulo={galeria.titulo} centrado className="px-4" />
          </FadeInSection>
          {galeria.estilo === "cine" && videos.length > 0 ? (
            <>
              <EventosGallery
                videoSrc={videos[0].src}
                leftImages={imagenes.filter((_, i) => i % 2 === 0).map((m) => m.src)}
                rightImages={imagenes.filter((_, i) => i % 2 === 1).map((m) => m.src)}
              />
              {imagenes.length >= 6 && (
                <div className="max-w-5xl mx-auto px-4 mt-12">
                  <PhotoGallery images={imagenes.map((m) => m.src)} />
                </div>
              )}
            </>
          ) : (
            <Galeria items={medios} />
          )}
        </Seccion>
      )}

      {/* 5. Referencias */}
      {(logos.length > 0 || testimonios.length > 0) && (
        <Seccion>
          <FadeInSection>
            <TituloSeccion titulo={referencias.titulo} centrado />
          </FadeInSection>

          {logos.length > 0 && (
            <ul className="flex flex-wrap items-center justify-center gap-x-14 gap-y-8">
              {logos.map((r) => (
                <li key={r.nombre}>
                  {r.logo ? (
                    <Image
                      src={r.logo}
                      alt={r.nombre}
                      width={240}
                      height={96}
                      className="h-14 w-auto max-w-[200px] object-contain"
                    />
                  ) : (
                    <span className="titulo-3 text-arena">{r.nombre}</span>
                  )}
                </li>
              ))}
            </ul>
          )}

          {testimonios.length > 0 && (
            <div className={`grid gap-4 md:grid-cols-2 ${logos.length > 0 ? "mt-14" : ""}`}>
              {testimonios.map((t) => (
                <figure key={t.texto} className="rounded-2xl border border-piedra bg-carbon p-7">
                  <blockquote className="cuerpo text-marfil">{t.texto}</blockquote>
                  {t.autor && <figcaption className="antetitulo mt-5">{t.autor}</figcaption>}
                </figure>
              ))}
            </div>
          )}
        </Seccion>
      )}

      {/* Bloque extra (por ejemplo, "Para las familias") */}
      {extra && parrafosExtra.length > 0 && (
        <Seccion ancho="angosto">
          <FadeInSection>
            <TituloSeccion antetitulo={extra.antetitulo} titulo={extra.titulo} />
            <div className="space-y-5">
              {parrafosExtra.map((p) => (
                <p key={p} className="cuerpo text-arena">
                  {p}
                </p>
              ))}
            </div>
          </FadeInSection>
        </Seccion>
      )}

      {/* 6. Preguntas frecuentes */}
      {preguntas.length > 0 && (
        <Seccion ancho="angosto">
          <FadeInSection>
            <TituloSeccion titulo="Preguntas frecuentes" />
          </FadeInSection>
          <PreguntasFrecuentes preguntas={preguntas} />
        </Seccion>
      )}

      {/* 7. Contacto */}
      <ContactCTA
        title={contacto.titulo}
        subtitle={contacto.bajada}
        linea={pagina.linea}
        instagramDe={pagina.instagram}
      >
        {children}
      </ContactCTA>
    </>
  );
}
