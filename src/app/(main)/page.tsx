import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { hero, cifras, tarjetasLineas, proximasNoches, cierre, contacto } from "@/config/home";
import { fotos } from "@/config/fotos";
import { cartelera } from "@/config/cartelera";
import { nochesDeEjemplo } from "@/config/ejemplos";
import { MOSTRAR_EJEMPLOS, listaConEjemplo } from "@/lib/ejemplo";
import { Boton } from "@/components/ui/Boton";
import { Seccion, TituloSeccion } from "@/components/ui/Seccion";
import { VideoFondo } from "@/components/VideoFondo";
import { ProximasNoches } from "@/components/ProximasNoches";
import { ComoLlegar } from "@/components/ComoLlegar";
import { ContactCTA } from "@/components/ContactCTA";
import { FadeInSection } from "@/components/FadeInSection";

export default function HomePage() {
  // Con la cartelera vacía, en desarrollo se muestran noches de ejemplo.
  const agenda = listaConEjemplo(cartelera, MOSTRAR_EJEMPLOS ? nochesDeEjemplo() : []);

  return (
    <>
      {/* 1. Hero */}
      <section className="relative min-h-[100svh] flex items-end overflow-hidden">
        <VideoFondo src={hero.video} className="absolute inset-0 w-full h-full object-cover" />
        {/* Oscurece el video lo justo para que se lea el texto */}
        <div className="absolute inset-0 bg-gradient-to-b from-negro/55 via-negro/35 to-negro" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 lg:pb-24">
          <p className="antetitulo mb-5 animate-fade-in">{hero.antetitulo}</p>
          <h1 className="titulo-display text-marfil max-w-5xl animate-fade-in-up">{hero.titulo}</h1>
          <p className="cuerpo text-marfil mt-6 max-w-xl animate-fade-in-up animate-delay-100">{hero.bajada}</p>
          <div className="mt-9 flex flex-col sm:flex-row gap-4 animate-fade-in-up animate-delay-200">
            {hero.botones.map((boton, i) => (
              <Boton key={boton.href} href={boton.href} variante={i === 0 ? "principal" : "secundario"}>
                {boton.texto}
              </Boton>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Cifras */}
      <section aria-label="Keops en cifras" className="bg-negro border-t border-piedra">
        <ul className="max-w-7xl mx-auto flex">
          {cifras.map((cifra, i) => (
            <li
              key={cifra.dato}
              className={`flex-1 min-w-0 px-4 sm:px-6 lg:px-8 py-10 lg:py-12 border-piedra ${i > 0 ? "border-l" : ""}`}
            >
              <p className="font-titulo font-bold text-marfil text-3xl lg:text-5xl leading-none">{cifra.dato}</p>
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
            return (
              <li
                key={tarjeta.id}
                className={`${grande ? "lg:col-span-3" : "lg:col-span-2"} ${
                  i === tarjetasLineas.length - 1 ? "sm:col-span-2" : ""
                }`}
              >
                <FadeInSection delay={i * 80} className="h-full">
                  <Link
                    href={tarjeta.href}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-piedra bg-carbon transition-colors duration-300 hover:border-oro"
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
                      <span className="mt-auto pt-6 inline-flex items-center gap-2 font-sans font-semibold text-sm uppercase tracking-[0.1em] text-oro">
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

      {/* 6. Cierre */}
      {cierre && (
        <Seccion ancho="angosto">
          <FadeInSection>
            <div className="text-center">
              <div className="w-12 h-px bg-oro mx-auto mb-8" aria-hidden="true" />
              <p className="acento text-3xl md:text-5xl text-marfil leading-tight">{cierre}</p>
            </div>
          </FadeInSection>
        </Seccion>
      )}

      {/* 7. Contacto */}
      <ContactCTA title={contacto.titulo} subtitle={contacto.bajada} />
    </>
  );
}
