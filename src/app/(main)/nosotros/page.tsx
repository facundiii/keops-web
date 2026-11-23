import type { Metadata } from "next";
import Image from "next/image";
import { encabezado, mision, historia, espacios, equipo } from "@/config/nosotros";
import { fotos } from "@/config/fotos";
import { Encabezado } from "@/components/Encabezado";
import { Seccion, TituloSeccion } from "@/components/ui/Seccion";
import { ComoLlegar } from "@/components/ComoLlegar";
import { FadeInSection } from "@/components/FadeInSection";

export const metadata: Metadata = {
  title: "Nosotros",
  description: encabezado.bajada,
};

export default function NosotrosPage() {
  // Solo los hitos confirmados
  const hitos = historia.hitos.filter((h) => h.confirmado && h.texto.trim() !== "");

  return (
    <>
      {/* 1. Encabezado */}
      <Encabezado
        antetitulo={encabezado.antetitulo}
        titulo={encabezado.titulo}
        bajada={encabezado.bajada}
        foto={fotos.nosotros.encabezado?.src}
        fotoAlt={fotos.nosotros.encabezado?.alt}
        fotoPosicion={fotos.nosotros.encabezado?.posicion}
      />

      {/* 2. Misión */}
      {mision.texto.trim() !== "" && (
        <Seccion ancho="angosto">
          <FadeInSection>
            <p className="antetitulo mb-5">{mision.antetitulo}</p>
            <p className="font-sans text-xl lg:text-2xl leading-relaxed text-marfil">{mision.texto}</p>
          </FadeInSection>
        </Seccion>
      )}

      {/* 3. Historia: línea de tiempo */}
      {hitos.length > 0 && (
        <Seccion ancho="angosto">
          <FadeInSection>
            <TituloSeccion antetitulo={historia.antetitulo} titulo={historia.titulo} />
          </FadeInSection>
          <ol className="border-l border-piedra">
            {hitos.map((hito, i) => {
              const foto = fotos.nosotros.historia[hito.fecha];
              return (
                <li key={hito.fecha} className="relative pl-8 pb-12 last:pb-0">
                  <span aria-hidden="true" className="absolute -left-[5px] top-2 w-[9px] h-[9px] rounded-full bg-oro" />
                  <FadeInSection delay={i * 60}>
                    <p className="titulo-3 text-oro mb-2">{hito.fecha}</p>
                    <p className="cuerpo text-marfil">{hito.texto}</p>
                    {/* Fotos de archivo: siempre chicas, nunca a pantalla completa */}
                    {foto && (
                      <div className="relative mt-5 max-w-sm aspect-[3/2] rounded-xl overflow-hidden border border-piedra">
                        <Image
                          src={foto.src}
                          alt={foto.alt}
                          fill
                          sizes="(max-width: 640px) 85vw, 384px"
                          className="object-cover"
                          style={{ objectPosition: foto.posicion }}
                        />
                      </div>
                    )}
                  </FadeInSection>
                </li>
              );
            })}
          </ol>
        </Seccion>
      )}

      {/* 4. Espacios */}
      {espacios.lista.length > 0 && (
        <Seccion>
          <FadeInSection>
            <TituloSeccion antetitulo={espacios.antetitulo} titulo={espacios.titulo} />
          </FadeInSection>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {espacios.lista.map((espacio, i) => {
              // Hasta dos fotos por espacio. Sin fotos, la tarjeta muestra solo nombre y texto.
              const fotosEspacio = (fotos.nosotros.espacios[espacio.id] ?? []).slice(0, 2);
              return (
                <li key={espacio.id}>
                  <FadeInSection delay={i * 60} className="h-full">
                    <article className="h-full rounded-2xl border border-piedra bg-carbon overflow-hidden">
                      {fotosEspacio.length > 0 && (
                        <div className={`grid gap-px bg-piedra ${fotosEspacio.length > 1 ? "grid-cols-2" : ""}`}>
                          {fotosEspacio.map((foto) => (
                            <div
                              key={foto.src}
                              className={`relative ${fotosEspacio.length > 1 ? "aspect-[3/4]" : "aspect-[3/2]"}`}
                            >
                              <Image
                                src={foto.src}
                                alt={foto.alt}
                                fill
                                sizes={
                                  fotosEspacio.length > 1
                                    ? "(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 17vw"
                                    : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                }
                                className="object-cover"
                                style={{ objectPosition: foto.posicion }}
                              />
                            </div>
                          ))}
                        </div>
                      )}
                      <div className="p-6 lg:p-7">
                        <h3 className="titulo-3 text-marfil">{espacio.nombre}</h3>
                        {espacio.capacidad && <p className="antetitulo mt-2">{espacio.capacidad}</p>}
                        {espacio.descripcion && <p className="cuerpo text-arena mt-3">{espacio.descripcion}</p>}
                      </div>
                    </article>
                  </FadeInSection>
                </li>
              );
            })}
          </ul>
        </Seccion>
      )}

      {/* 5. Nuestro equipo */}
      {equipo.personas.length > 0 && (
        <Seccion>
          <FadeInSection>
            <TituloSeccion antetitulo={equipo.antetitulo} titulo={equipo.titulo} />
          </FadeInSection>
          <ul className="grid gap-4 grid-cols-2 lg:grid-cols-3">
            {equipo.personas.map((persona, i) => (
              <li key={`${persona.nombre}-${persona.rol}`}>
                <FadeInSection delay={i * 60} className="h-full">
                  <article className="h-full rounded-2xl border border-piedra bg-carbon overflow-hidden">
                    {persona.foto && (
                      <div className="relative aspect-square">
                        <Image
                          src={persona.foto}
                          alt={`${persona.nombre}, ${persona.rol}`}
                          fill
                          sizes="(max-width: 1024px) 50vw, 33vw"
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="p-5 lg:p-6">
                      <h3 className="titulo-3 text-marfil">{persona.nombre}</h3>
                      <p className="antetitulo mt-2">{persona.rol}</p>
                    </div>
                  </article>
                </FadeInSection>
              </li>
            ))}
          </ul>
        </Seccion>
      )}

      {/* 6. Cómo llegar */}
      <ComoLlegar />
    </>
  );
}
