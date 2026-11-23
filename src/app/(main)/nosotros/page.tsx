import type { Metadata } from "next";
import Image from "next/image";
import { encabezado, mision, historia, espacios } from "@/config/nosotros";
import { fotos } from "@/config/fotos";
import { Encabezado } from "@/components/Encabezado";
import { Seccion, TituloSeccion } from "@/components/ui/Seccion";
import { LineaDeTiempo } from "@/components/LineaDeTiempo";
import { ComoLlegar } from "@/components/ComoLlegar";
import { FadeInSection } from "@/components/FadeInSection";

export const metadata: Metadata = {
  title: "Nosotros",
  description: encabezado.bajada,
};

// En el sitio publicado solo se ven los hitos confirmados.
// En desarrollo (npm run dev) se ven todos, con una etiqueta en los que faltan confirmar.
const enDesarrollo = process.env.NODE_ENV === "development";

export default function NosotrosPage() {
  const hitos = historia.hitos.filter((h) => h.texto.trim() !== "" && (h.confirmado || enDesarrollo));

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

      {/* 3. Historia: línea de tiempo vertical */}
      {hitos.length > 0 && (
        <Seccion ancho="medio">
          <FadeInSection>
            <TituloSeccion antetitulo={historia.antetitulo} titulo={historia.titulo} centrado />
          </FadeInSection>
          <LineaDeTiempo
            hitos={hitos}
            fotos={fotos.nosotros.historia}
            fotosDeEjemplo={fotos.nosotros.historiaDeEjemplo}
          />
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

      {/* 5. Cómo llegar */}
      <ComoLlegar />
    </>
  );
}
