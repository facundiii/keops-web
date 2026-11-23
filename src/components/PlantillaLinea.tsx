import type { ReactNode } from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import type { Argumento, Medio, PaginaLinea, Testimonio } from "@/config/lineas";
import type { Foto } from "@/config/fotos";
import { MOSTRAR_EJEMPLOS, listaConEjemplo } from "@/lib/ejemplo";
import { Encabezado } from "@/components/Encabezado";
import { BloqueArgumentos } from "@/components/BloqueArgumentos";
import { galeriaVisible } from "@/components/BloqueGaleria";
import { Seccion, TituloSeccion } from "@/components/ui/Seccion";
import { EtiquetaEjemplo } from "@/components/ui/EtiquetaEjemplo";
import { Galeria, type MediaItem } from "@/components/Galeria";
import { EventosGallery } from "@/components/EventosGallery";
import { PhotoGallery } from "@/components/PhotoGallery";
import { BloqueFaq } from "@/components/BloqueFaq";
import { ContactCTA } from "@/components/ContactCTA";
import { FadeInSection } from "@/components/FadeInSection";

/** Contenido de ejemplo de la página. Solo se usa en desarrollo, donde falte el dato real. */
export interface EjemplosLinea {
  argumentos?: Argumento[];
  galeria?: Medio[];
  testimonios?: Testimonio[];
  parrafosExtra?: string[];
}

interface PlantillaLineaProps {
  pagina: PaginaLinea;
  /** Fotos opcionales de la página (se asignan desde config/fotos.ts) */
  fotos?: { encabezado?: Foto; porQue?: Foto; incluye?: Foto };
  ejemplos?: EjemplosLinea;
  /** Contenido extra dentro del bloque de contacto (por ejemplo, un formulario) */
  children?: ReactNode;
}

/**
 * Plantilla común de las páginas de línea, en este orden:
 * 1. Encabezado  2. Por qué Keops  3. Qué incluye  4. Galería
 * 5. Referencias  6. Preguntas frecuentes  7. Contacto
 * Cada bloque se oculta solo si no tiene contenido.
 */
export function PlantillaLinea({ pagina, fotos = {}, ejemplos = {}, children }: PlantillaLineaProps) {
  const { encabezado, porQue, incluye, galeria, referencias, extra, contacto } = pagina;

  // 2. Por qué Keops
  const argumentos = listaConEjemplo(porQue.argumentos, ejemplos.argumentos ?? []);

  // 4. Galería: solo con 6 imágenes o más, o con al menos un video
  const hayGaleriaReal = galeriaVisible(galeria.medios);
  const galeriaEsEjemplo = !hayGaleriaReal && MOSTRAR_EJEMPLOS && galeriaVisible(ejemplos.galeria ?? []);
  const mediosGaleria = hayGaleriaReal ? galeria.medios : galeriaEsEjemplo ? (ejemplos.galeria ?? []) : [];
  const imagenes = mediosGaleria.filter((m) => m.tipo === "imagen");
  const videos = mediosGaleria.filter((m) => m.tipo === "video");
  const medios: MediaItem[] = mediosGaleria.map((m) =>
    m.tipo === "video" ? { type: "video", src: m.src, label: m.titulo } : { type: "image", src: m.src, alt: m.alt }
  );

  // 5. Referencias: en el sitio publicado, solo las autorizadas.
  //    En desarrollo se ven también las que falta autorizar, con su etiqueta.
  const logos = referencias.logos.filter((r) => r.autorizado || MOSTRAR_EJEMPLOS);
  const hayLogosSinAutorizar = logos.some((r) => !r.autorizado);
  const testimonios = listaConEjemplo(
    referencias.testimonios.filter((t) => t.autorizado && t.texto.trim() !== ""),
    ejemplos.testimonios ?? []
  );

  const parrafosExtra = listaConEjemplo(
    extra?.parrafos.filter((p) => p.trim() !== "") ?? [],
    extra ? (ejemplos.parrafosExtra ?? []) : []
  );

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
        fotoPosicion={fotos.encabezado?.posicion}
      />

      {/* 2. Por qué Keops */}
      <BloqueArgumentos
        titulo={porQue.titulo}
        argumentos={argumentos.datos}
        foto={fotos.porQue}
        esEjemplo={argumentos.esEjemplo}
      />

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
                    style={{ objectPosition: fotos.incluye.posicion }}
                  />
                </div>
              </FadeInSection>
            )}
          </div>
        </Seccion>
      )}

      {/* 4. Galería */}
      {mediosGaleria.length > 0 && (
        <Seccion className={galeria.estilo === "cine" && hayGaleriaReal ? "!px-0" : ""}>
          <FadeInSection>
            <TituloSeccion titulo={galeria.titulo} centrado className={galeriaEsEjemplo ? "px-4 !mb-5" : "px-4"} />
            {galeriaEsEjemplo && (
              <div className="text-center mb-8">
                <EtiquetaEjemplo />
              </div>
            )}
          </FadeInSection>
          {galeria.estilo === "cine" && hayGaleriaReal && videos.length > 0 ? (
            <>
              <EventosGallery
                videoSrc={videos[0].src}
                leftImages={imagenes.filter((_, i) => i % 2 === 0).map((m) => m.src)}
                rightImages={imagenes.filter((_, i) => i % 2 === 1).map((m) => m.src)}
              />
              {imagenes.length >= 6 && (
                <div className="max-w-5xl mx-auto px-4 mt-12">
                  <PhotoGallery
                    images={imagenes.map((m) => m.src)}
                    alts={imagenes.map((m) => (m.tipo === "imagen" ? m.alt : ""))}
                  />
                </div>
              )}
            </>
          ) : (
            <Galeria items={medios} />
          )}
        </Seccion>
      )}

      {/* 5. Referencias */}
      {(logos.length > 0 || testimonios.datos.length > 0) && (
        <Seccion>
          <FadeInSection>
            <TituloSeccion titulo={referencias.titulo} centrado />
          </FadeInSection>

          {logos.length > 0 && (
            <>
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
              {hayLogosSinAutorizar && (
                <div className="text-center mt-8">
                  <EtiquetaEjemplo texto="Sin autorizar: no se publican" />
                </div>
              )}
            </>
          )}

          {testimonios.datos.length > 0 && (
            <div className={logos.length > 0 ? "mt-14" : ""}>
              {testimonios.esEjemplo && (
                <div className="text-center mb-6">
                  <EtiquetaEjemplo texto="Testimonios de ejemplo: no se publican" />
                </div>
              )}
              <div className={`grid gap-4 ${testimonios.datos.length > 1 ? "md:grid-cols-2" : "max-w-2xl mx-auto"}`}>
                {testimonios.datos.map((t) => (
                  <figure key={t.texto} className="rounded-2xl border border-piedra bg-carbon p-7">
                    <blockquote className="cuerpo text-marfil">{t.texto}</blockquote>
                    {t.autor && <figcaption className="antetitulo mt-5">{t.autor}</figcaption>}
                  </figure>
                ))}
              </div>
            </div>
          )}
        </Seccion>
      )}

      {/* Bloque extra (por ejemplo, "Para las familias") */}
      {extra && parrafosExtra.datos.length > 0 && (
        <Seccion ancho="angosto">
          <FadeInSection>
            <TituloSeccion antetitulo={extra.antetitulo} titulo={extra.titulo} />
            <div className="space-y-5">
              {parrafosExtra.datos.map((p) => (
                <p key={p} className="cuerpo text-arena">
                  {p}
                </p>
              ))}
            </div>
            {parrafosExtra.esEjemplo && <EtiquetaEjemplo className="mt-6" />}
          </FadeInSection>
        </Seccion>
      )}

      {/* 6. Preguntas frecuentes */}
      <BloqueFaq grupo={pagina.faq} />

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
