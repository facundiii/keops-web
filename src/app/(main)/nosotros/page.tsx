import type { Metadata } from "next";
import Image from "next/image";
import { encabezado, mision, historia, espacios, equipo } from "@/config/nosotros";
import { fotos } from "@/config/fotos";
import { ejemplos } from "@/config/ejemplos";
import { MOSTRAR_EJEMPLOS, listaConEjemplo, textoConEjemplo } from "@/lib/ejemplo";
import { EtiquetaEjemplo } from "@/components/ui/EtiquetaEjemplo";
import { Encabezado } from "@/components/Encabezado";
import { Seccion, TituloSeccion } from "@/components/ui/Seccion";
import { LineaDeTiempo } from "@/components/LineaDeTiempo";
import { ComoLlegar } from "@/components/ComoLlegar";
import { FadeInSection } from "@/components/FadeInSection";

export const metadata: Metadata = {
  title: "Nosotros",
  description: encabezado.bajada,
};

export default function NosotrosPage() {
  // En el sitio publicado solo se ven los hitos confirmados.
  // En desarrollo (npm run dev) se ven todos, con una etiqueta en los que faltan confirmar.
  const hitos = historia.hitos.filter((h) => h.texto.trim() !== "" && (h.confirmado || MOSTRAR_EJEMPLOS));
  const areasEquipo = equipo.areas
    .map((a) => ({ ...a, personas: a.personas.filter((p) => p.nombre.trim() !== "") }))
    .filter((a) => a.personas.length > 0);

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
        velo="suave"
      />

      {/* 2. Misión */}
      {mision.texto.trim() !== "" && (
        <Seccion ancho="angosto">
          <FadeInSection>
            <p className="antetitulo mb-4">{mision.antetitulo}</p>
            <p className="destacado text-marfil">{mision.texto}</p>
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
          {/* La misma grilla que las líneas de la home: las dos primeras tarjetas van grandes y las demás
              completan la fila de a tres (o de a dos, si son dos o cuatro). Así no queda un hueco al final. */}
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6 lg:gap-6">
            {espacios.lista.map((espacio, i) => {
              const total = espacios.lista.length;
              const grande = i < 2;
              const enFilaDeDos = (total - 2) % 3 !== 0;
              const ultimaSola = total % 2 === 1 && i === total - 1;
              // Hasta dos fotos por espacio. Sin fotos, la tarjeta muestra solo nombre y texto.
              // Donde falta el dato real, en desarrollo se muestra uno de ejemplo.
              const deEjemplo = ejemplos.espacios[espacio.id];
              const capacidad = textoConEjemplo(espacio.capacidad, deEjemplo?.capacidad ?? "");
              const descripcion = textoConEjemplo(espacio.descripcion, deEjemplo?.descripcion ?? "");
              const fotosDelEspacio = listaConEjemplo(
                fotos.nosotros.espacios[espacio.id] ?? [],
                fotos.deEjemplo.espacios[espacio.id] ?? []
              );
              const fotosEspacio = fotosDelEspacio.datos.slice(0, 2);
              const esEjemplo = capacidad.esEjemplo || descripcion.esEjemplo || fotosDelEspacio.esEjemplo;
              const dosFotos = fotosEspacio.length > 1;
              // Cuánto ocupa cada foto según el tamaño de la tarjeta y si va de a una o de a dos
              const tamanosFoto = grande
                ? dosFotos
                  ? "(max-width: 640px) 50vw, 25vw"
                  : "(max-width: 640px) 100vw, 50vw"
                : dosFotos
                  ? "(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 17vw"
                  : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw";
              return (
                <li
                  key={espacio.id}
                  className={`${grande || enFilaDeDos ? "lg:col-span-3" : "lg:col-span-2"} ${ultimaSola ? "sm:col-span-2" : ""}`}
                >
                  <FadeInSection delay={i * 60} className="h-full">
                    <article className="h-full rounded-2xl border border-piedra bg-carbon overflow-hidden">
                      {fotosEspacio.length > 0 && (
                        <div className={`grid gap-px bg-piedra ${dosFotos ? "grid-cols-2" : ""}`}>
                          {fotosEspacio.map((foto) => (
                            <div key={foto.src} className={`relative ${dosFotos ? "aspect-[3/4]" : "aspect-[3/2]"}`}>
                              <Image
                                src={foto.src}
                                alt={foto.alt}
                                fill
                                sizes={tamanosFoto}
                                className="object-cover"
                                style={{ objectPosition: foto.posicion }}
                              />
                            </div>
                          ))}
                        </div>
                      )}
                      <div className="p-6 lg:p-8">
                        <h3 className="titulo-3 text-marfil">{espacio.nombre}</h3>
                        {capacidad.texto && <p className="antetitulo mt-2">{capacidad.texto}</p>}
                        {descripcion.texto && <p className="cuerpo text-arena mt-3">{descripcion.texto}</p>}
                        {esEjemplo && <EtiquetaEjemplo className="mt-4" />}
                      </div>
                    </article>
                  </FadeInSection>
                </li>
              );
            })}
          </ul>
        </Seccion>
      )}

      {/* 5. Nuestro equipo: por área, como los créditos de una noche. Sin fotos ni tarjetas. */}
      {areasEquipo.length > 0 && (
        <Seccion>
          <FadeInSection>
            <TituloSeccion antetitulo={equipo.antetitulo} titulo={equipo.titulo} />
          </FadeInSection>
          {/* Con una sola área, los nombres se reparten a lo ancho: si no, dos tercios de la fila quedan vacíos */}
          <div className={areasEquipo.length > 1 ? "grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12" : ""}>
            {areasEquipo.map((area, i) => (
              <FadeInSection key={area.nombre} delay={i * 80} className="border-t border-piedra pt-6">
                <h3 className="antetitulo">{area.nombre}</h3>
                <ul
                  className={
                    areasEquipo.length > 1 ? "mt-4 space-y-4" : "mt-4 grid gap-x-12 gap-y-4 sm:grid-cols-2 lg:grid-cols-3"
                  }
                >
                  {area.personas.map((persona) => (
                    <li key={persona.nombre}>
                      <p className="titulo-3 text-marfil">{persona.nombre}</p>
                      {persona.rol && <p className="texto-chico text-arena mt-1">{persona.rol}</p>}
                    </li>
                  ))}
                </ul>
              </FadeInSection>
            ))}
          </div>
        </Seccion>
      )}

      {/* 6. Cómo llegar */}
      <ComoLlegar />
    </>
  );
}
