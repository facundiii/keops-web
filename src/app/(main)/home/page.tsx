import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { FadeInSection } from "@/components/FadeInSection";
import { HeroCTAButton, HeroScrollIndicator } from "@/components/HeroScrollButton";

const sectionCards = [
  {
    key: "disco" as const,
    href: "/disco",
    gradient: "from-purple-950/80 to-night-950/80",
    accentHover: "group-hover:text-purple-300",
    borderHover: "group-hover:border-purple-500/40",
    bgHover: "group-hover:bg-purple-500/5",
    emoji: "🎵",
  },
  {
    key: "eventos" as const,
    href: "/eventos",
    gradient: "from-gold-dark/60 to-night-950/80",
    accentHover: "group-hover:text-gold",
    borderHover: "group-hover:border-gold/40",
    bgHover: "group-hover:bg-gold/5",
    emoji: "✨",
  },
  {
    key: "egresados" as const,
    href: "/egresados",
    gradient: "from-rose-950/80 to-night-950/80",
    accentHover: "group-hover:text-rose-300",
    borderHover: "group-hover:border-rose-500/40",
    bgHover: "group-hover:bg-rose-500/5",
    emoji: "🎓",
  },
  {
    key: "institucionales" as const,
    href: "/institucionales",
    gradient: "from-sky-950/80 to-night-950/80",
    accentHover: "group-hover:text-sky-300",
    borderHover: "group-hover:border-sky-500/40",
    bgHover: "group-hover:bg-sky-500/5",
    emoji: "🏢",
  },
];

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
        <div className="absolute inset-0 bg-gradient-to-b from-night-950/60 via-night-950/50 to-night-950/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-night-950/30 via-transparent to-night-950/30" />

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
          <p className="hero-subtitle-anim -mt-[27px] sm:-mt-[47px] md:-mt-[72px] text-white/45 text-xs md:text-sm tracking-[0.45em] uppercase">
            Villa Carlos Paz · Córdoba · Argentina
          </p>

          {/* CTA */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in animate-delay-400">
            <HeroCTAButton />
          </div>
        </div>

        {/* Scroll indicator */}
        <HeroScrollIndicator />
      </section>

      {/* ─── SECCIONES ────────────────────────────────────────────────────── */}
      <section id="sections" className="bg-night-950 py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <FadeInSection>
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-5xl text-cream mb-3">
                Nuestras propuestas
              </h2>
              <p className="text-[var(--text-secondary)] text-sm md:text-base tracking-wide">
                Todo lo que Keops tiene para vos
              </p>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {sectionCards.map((card, i) => {
              const section = siteConfig.sections[card.key];
              return (
                <FadeInSection key={card.key} delay={i * 100}>
                  <Link
                    href={card.href}
                    className={`group block relative overflow-hidden rounded-2xl border border-white/5 bg-night-900 p-8 md:p-10 transition-all duration-300 ${card.borderHover} ${card.bgHover} hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/50`}
                  >
                    {/* Background gradient on hover */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    />

                    <div className="relative z-10">
                      <span className="text-3xl mb-5 block">{card.emoji}</span>
                      <p className={`text-xs tracking-[0.3em] uppercase text-white/40 mb-2 transition-colors duration-300 ${card.accentHover}`}>
                        {section.title}
                      </p>
                      <h3 className="font-serif text-2xl md:text-3xl text-cream mb-4 leading-tight">
                        {section.tagline}
                      </h3>
                      <p className="text-[var(--text-secondary)] text-sm leading-relaxed line-clamp-2">
                        {section.description}
                      </p>
                      <div className={`mt-6 flex items-center gap-2 text-xs tracking-widest uppercase text-white/30 transition-colors duration-300 ${card.accentHover}`}>
                        Ver más
                        <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </Link>
                </FadeInSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── MINI STATEMENT ──────────────────────────────────────────────── */}
      <FadeInSection>
        <section className="bg-night-950 border-t border-white/5 py-24 px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="w-12 h-px bg-gold mx-auto mb-8" />
            <blockquote className="font-serif text-2xl md:text-3xl lg:text-4xl text-cream/85 leading-relaxed">
              &ldquo;Más de 50 años generando recuerdos inolvidables.&rdquo;
            </blockquote>
            <p className="mt-6 text-[var(--text-secondary)] text-sm tracking-widest uppercase">
              {siteConfig.name} · {siteConfig.location}
            </p>
          </div>
        </section>
      </FadeInSection>
    </>
  );
}
