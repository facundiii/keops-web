import Image from "next/image";

interface Company {
  name: string;
  logo?: string;
  large?: boolean;
}

const companies: Company[] = [
  { name: "Flecha",     logo: "/egresados/flecha.png" },
  { name: "Super Tour", logo: "/egresados/super-tour.png", large: true },
  { name: "Astros",     logo: "/egresados/astros.jpg" },
  { name: "Púrpura",    logo: "/egresados/purpura.png" },
  { name: "Auckland",   logo: "/egresados/auckland.jpg", large: true },
];

function Separator() {
  return <span className="mx-10 text-gold/25 text-lg select-none">◆</span>;
}

function CompanyItem({ name, logo, large }: Company) {
  if (logo) {
    return (
      <Image
        src={logo}
        alt={name}
        width={240}
        height={96}
        className={large
          ? "h-20 w-auto max-w-[240px] object-contain"
          : "h-12 w-auto max-w-[140px] object-contain"
        }
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
        className="flex items-center whitespace-nowrap animate-scroll-left"
        style={{ width: "max-content" }}
      >
        {items.map((company, i) => (
          <span key={i} className="inline-flex items-center">
            <CompanyItem {...company} />
            <Separator />
          </span>
        ))}
      </div>
    </div>
  );
}
