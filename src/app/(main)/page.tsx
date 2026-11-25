import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { hero, cifras, tarjetasLineas, proximasNoches, cierre, contacto } from "@/config/home";
import { fotos } from "@/config/fotos";
import { cartelera } from "@/config/cartelera";
import { nochesDeEjemplo } from "@/config/ejemplos";
import { MOSTRAR_EJEMPLOS, listaConEjemplo } from "@/lib/ejemplo";
import { aniversario, aniversarioVigente } from "@/config/aniversario";
import { Seccion, TituloSeccion } from "@/components/ui/Seccion";
import { SegunFecha } from "@/components/SegunFecha";
import { VideoFondoDiferido } from "@/components/VideoFondoDiferido";
import { PortadaAniversario } from "@/components/aniversario/PortadaAniversario";
import { BandaAniversario } from "@/components/aniversario/BandaAniversario";
import { DotAniversario } from "@/components/aniversario/DotAniversario";
import { VideoFondo } from "@/components/VideoFondo";
import { ProximasNoches } from "@/components/ProximasNoches";
import { ComoLlegar } from "@/components/ComoLlegar";
import { ContactCTA } from "@/components/ContactCTA";
import { FadeInSection } from "@/components/FadeInSection";

// La home es estática: esto se calcula al generar el sitio. Pasado el aniversario,
// SegunFecha hace que el navegador vuelva solo a la home normal, sin volver a publicar.
const ANIVERSARIO_AL_GENERAR = aniversarioVigente(Date.now());

/**
 * Primera vista de siempre: el video con el título. Sin botones.
 * `diferirVideo`: cuando viene oculta en el HTML (durante el aniversario), el video se pide recién
 * si esta es la versión que corresponde.
 */
function HeroVideo({ diferirVideo = false }: { diferirVideo?: boolean }) {
  const claseVideo = "absolute inset-0 w-full h-full object-cover";
  return (
    <section className="relative min-h-[100svh] flex items-end overflow-hidden">
      {diferirVideo ? (
        <VideoFondoDiferido src={hero.video} className={claseVideo} />
      ) : (
        <VideoFondo src={hero.video} className={claseVideo} />
      )}
      {/* Oscurece el video lo justo para que se lea el texto */}
      <div className="velo-video absolute inset-0" />

      {/* El texto va sobre la misma línea que el resto del sitio (el ancho de siempre) */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 bajo-navbar pb-16 lg:pb-24">
        <div className="max-w-6xl mx-auto">
          <p className="antetitulo mb-4 animate-fade-in">{hero.antetitulo}</p>
          <h1 className="titulo-display text-marfil max-w-5xl animate-fade-in-up">{hero.titulo}</h1>
          <p className="cuerpo text-marfil mt-6 max-w-xl animate-fade-in-up animate-delay-100">{hero.bajada}</p>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  // Con la cartelera vacía, en desarrollo se muestran noches de ejemplo.
  const agenda = listaConEjemplo(cartelera, MOSTRAR_EJEMPLOS ? nochesDeEjemplo() : []);
  const conAniversario = ANIVERSARIO_AL_GENERAR;

  return (
    <>
      {/* 1. Primera vista: sin botones. Durante el aniversario, la noche en orden:
          la pirámide como introducción, DOT al bajar y el cierre con la entrada. */}
      {conAniversario ? (
        <SegunFecha
          hasta={aniversario.fin}
          antes={
            <>
              <PortadaAniversario />
              <DotAniversario />
              <BandaAniversario />
            </>
          }
          despues={<HeroVideo diferirVideo />}
        />
      ) : (
        <HeroVideo />
      )}

      {/* 2. Cifras */}
      <section aria-label="Keops en cifras" className="bg-negro border-t border-piedra px-4 sm:px-6 lg:px-8">
        {/* La primera cifra arranca sobre la línea del contenido; las demás, después de su divisor */}
        <ul className="max-w-6xl mx-auto flex">
          {cifras.map((cifra, i) => (
            <li
              key={cifra.dato}
              className={`flex-1 min-w-0 py-10 lg:py-12 border-piedra ${i > 0 ? "border-l pl-4 sm:pl-6 lg:pl-8" : ""}`}
            >
              <p className="cifra text-marfil">{cifra.dato}</p>
              {cifra.detalle && <p className="antetitulo mt-3">{cifra.detalle}</p>}
            </li>
          ))}
        </ul>
      </section>

      {/* 3. Las líneas */}
      <Seccion ancho="amplio">
        <h2 className="sr-only">Las líneas de Keops</h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6 lg:gap-6">
          {tarjetasLineas.map((tarjeta, i) => {
            const foto = fotos.home[tarjeta.id];
            const grande = i < 2;
            // Las dos primeras van grandes. Las demás completan la fila de a tres, o de a dos si son dos o cuatro.
            const enFilaDeDos = (tarjetasLineas.length - 2) % 3 !== 0;
            const impar = tarjetasLineas.length % 2 === 1;
            return (
              <li
                key={tarjeta.id}
                className={`${grande || enFilaDeDos ? "lg:col-span-3" : "lg:col-span-2"} ${
                  impar && i === tarjetasLineas.length - 1 ? "sm:col-span-2" : ""
                }`}
              >
                <FadeInSection delay={i * 80} className="h-full">
                  <Link
                    href={tarjeta.href}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-piedra bg-carbon transition-[border-color,box-shadow] duration-300 hover:border-oro hover:shadow-halo focus-visible:border-oro focus-visible:shadow-halo"
                  >
                    {foto && (
                      <div className={`relative overflow-hidden ${grande ? "aspect-[16/9]" : "aspect-[16/10]"}`}>
                        <Image
                          src={foto.src}
                          alt={foto.alt}
                          fill
                          sizes={
                            grande
                              ? "(max-width: 640px) 100vw, 50vw"
                              : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          }
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          style={{ objectPosition: foto.posicion }}
                        />
                      </div>
                    )}
                    <div className="flex flex-1 flex-col p-6 lg:p-8">
                      <p className="antetitulo mb-3">{tarjeta.antetitulo}</p>
                      <h3 className="titulo-3 text-marfil mb-3">{tarjeta.titulo}</h3>
                      <p className="cuerpo text-arena">{tarjeta.texto}</p>
                      <span className="mt-auto pt-6 inline-flex items-center gap-2 texto-boton text-oro">
                        {tarjeta.boton}
                        <ArrowRight
                          size={20}
                          strokeWidth={1.5}
                          aria-hidden="true"
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </span>
                    </div>
                  </Link>
                </FadeInSection>
              </li>
            );
          })}
        </ul>
      </Seccion>

      {/* 4. Próximas noches */}
      <Seccion>
        <FadeInSection>
          <TituloSeccion antetitulo={proximasNoches.antetitulo} titulo={proximasNoches.titulo} />
          <ProximasNoches
            noches={agenda.datos}
            cantidad={proximasNoches.cantidad}
            boton={proximasNoches.boton}
            esEjemplo={agenda.esEjemplo}
          />
        </FadeInSection>
      </Seccion>

      {/* 5. Cómo llegar */}
      <ComoLlegar />

      {/* 6. Cierre: la frase sobre la pirámide vista desde la pista.
          El velo oscurece solo abajo, detrás de la frase; arriba el techo queda a la vista. */}
      {cierre && (
        <section className="relative isolate overflow-hidden border-t border-piedra">
          {fotos.cierre && (
            <>
              <Image
                src={fotos.cierre.src}
                alt={fotos.cierre.alt}
                fill
                sizes="100vw"
                className="-z-10 object-cover"
                style={{ objectPosition: fotos.cierre.posicion }}
              />
              <div className="velo-cierre absolute inset-0 -z-10" />
            </>
          )}
          <div
            className={`flex items-end justify-center px-4 sm:px-6 lg:px-8 pb-16 lg:pb-24 ${
              fotos.cierre ? "aspect-[4/5] sm:aspect-[3/2] lg:aspect-[2/1]" : "pt-16 lg:pt-24"
            }`}
          >
            <FadeInSection>
              <div className="max-w-3xl text-center">
                <div className="w-12 h-px bg-oro mx-auto mb-8" aria-hidden="true" />
                <p className="acento acento-grande text-marfil">{cierre}</p>
              </div>
            </FadeInSection>
          </div>
        </section>
      )}

      {/* 7. Contacto */}
      <ContactCTA title={contacto.titulo} subtitle={contacto.bajada} />
    </>
  );
}
