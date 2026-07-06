interface SectionHeroProps {
  title: string;
  tagline: string;
  accentColor?: string;
}

export function SectionHero({ title, tagline }: SectionHeroProps) {
  return (
    <section className="relative pt-28 pb-10 px-4 bg-night-950 overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-transparent to-gold/30" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        <p className="text-gold text-xs tracking-[0.4em] uppercase mb-6 animate-fade-in">
          {title}
        </p>
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-cream leading-tight animate-fade-in-up">
          {tagline}
        </h1>
        <div className="mt-8 w-16 h-px bg-gold mx-auto" />
      </div>
    </section>
  );
}
