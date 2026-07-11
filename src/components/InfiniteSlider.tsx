import Image from "next/image";

interface Company {
  name: string;
  logo?: string;
  size?: "base" | "medium" | "large";
}

const companies: Company[] = [
  { name: "Flecha",     logo: "/egresados/flecha.png" },
  { name: "Super Tour", logo: "/egresados/super-tour.png", size: "large" },
  { name: "Astros",     logo: "/egresados/astros.jpg",     size: "medium" },
  { name: "Púrpura",    logo: "/egresados/purpura.png",    size: "medium" },
  { name: "Auckland",   logo: "/egresados/auckland.jpg",   size: "large" },
];

function Separator() {
  return <span className="mx-10 text-gold/25 text-lg select-none">◆</span>;
}

const sizeClass = {
  base:   "h-12 w-auto max-w-[140px]",
  medium: "h-16 w-auto max-w-[180px]",
  large:  "h-20 w-auto max-w-[240px]",
};

function CompanyItem({ name, logo, size = "base" }: Company) {
  if (logo) {
    return (
      <Image
        src={logo}
        alt={name}
        width={240}
        height={96}
        className={`${sizeClass[size]} object-contain`}
      />
    );
  }
  return (
    <span className="text-white/40 text-sm tracking-[0.2em] uppercase font-sans">
      {name}
    </span>
  );
}

export function InfiniteSlider() {
  const items = [...companies, ...companies];

  return (
    <div className="relative overflow-hidden py-3">
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-night-950 to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-night-950 to-transparent pointer-events-none" />

      <div
        className="inline-flex items-center animate-scroll-left"
        style={{ willChange: "transform" }}
      >
        {items.map((company, i) => (
          <span key={i} className="inline-flex items-center shrink-0">
            <CompanyItem {...company} />
            <Separator />
          </span>
        ))}
      </div>
    </div>
  );
}
