import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { tarjetasLineas } from "@/config/home";
import { FadeInSection } from "@/components/FadeInSection";
import { HeroCTAButton, HeroScrollIndicator } from "@/components/HeroScrollButton";
import { ContactCTA } from "@/components/ContactCTA";

export default function HomePage() {
  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Video background */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/hero-video.mp4"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-negro/60 via-negro/50 to-negro/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-negro/30 via-transparent to-negro/30" />

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          {/* Pyramid logo */}
          <div className="hero-pyramid mb-1 sm:mb-2">
            <Image
              src="/logo-piramide.png"
              alt=""
              aria-hidden="true"
              width={400}
              height={400}
              className="w-[94px] sm:w-[130px] md:w-[182px] h-auto mx-auto"
              priority
            />
          </div>

          {/* Keops logo — compensación de transparencias: -37px top, -39px bottom (mobile) */}
          <div className="hero-logo -mt-[37px] sm:-mt-[57px] md:-mt-[84px]">
            <Image
              src="/logo.png"
              alt="Keops"
              width={1080}
              height={445}
              className="w-[300px] sm:w-[460px] md:w-[680px] h-auto mx-auto"
              priority
            />
          </div>

          {/* Subtitle — pegado justo debajo del contenido real del logo */}
          <p className="hero-subtitle-anim antetitulo -mt-[27px] sm:-mt-[47px] md:-mt-[72px]">
            Villa Carlos Paz · Córdoba · Argentina
          </p>

          {/* CTA */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in animate-delay-400">
            <HeroCTAButton />
          </div>
        </div>

        {/* Scroll indicator */}
        <HeroScrollIndicator />
      </section>

      {/* ─── LAS LÍNEAS ───────────────────────────────────────────────────── */}
      <section id="sections" className="bg-negro py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <FadeInSection>
            <div className="text-center mb-16">
              <h2 className="titulo-2 text-marfil mb-3">Nuestras propuestas</h2>
              <p className="cuerpo text-arena">Todo lo que Keops tiene para vos</p>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {tarjetasLineas.map((tarjeta, i) => (
              <FadeInSection key={tarjeta.id} delay={i * 80} className="h-full">
                <Link
                  href={tarjeta.href}
                  className="group flex h-full flex-col rounded-2xl border border-piedra bg-carbon p-8 md:p-10 transition-colors duration-300 hover:border-oro"
                >
                  <p className="antetitulo mb-3">{tarjeta.antetitulo}</p>
                  <h3 className="titulo-3 text-marfil mb-4">{tarjeta.titulo}</h3>
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
                </Link>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CIERRE ───────────────────────────────────────────────────────── */}
      <FadeInSection>
        <section className="bg-negro border-t border-piedra py-24 px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="w-12 h-px bg-oro mx-auto mb-8" />
            <blockquote className="acento text-3xl md:text-4xl text-marfil leading-snug">
              &ldquo;Más de 50 años generando recuerdos inolvidables.&rdquo;
            </blockquote>
            <p className="mt-6 antetitulo">
              {siteConfig.name} · {siteConfig.location}
            </p>
          </div>
        </section>
      </FadeInSection>

      <ContactCTA
        title="¿Querés saber más?"
        subtitle="Contactanos por WhatsApp, por mail o seguinos en Instagram para enterarte de todo lo que pasa en Keops."
      />
    </>
  );
}
