import Image from "next/image";

interface Company {
  name: string;
  logo?: string;
}

const companies: Company[] = [
  { name: "Flecha",          logo: "/egresados/flecha.png" },
  { name: "Super Tour",      logo: "/egresados/super-tour.png" },
  { name: "Auckland",        logo: undefined },
  { name: "Viajes Egresados",logo: undefined },
  { name: "Top Tour",        logo: undefined },
  { name: "Sol y Luna",      logo: undefined },
];

function Separator() {
  return <span className="mx-10 text-gold/25 text-lg select-none">◆</span>;
}

function CompanyItem({ name, logo }: Company) {
  if (logo) {
    return (
      <Image
        src={logo}
        alt={name}
        width={120}
        height={48}
        className="h-10 w-auto object-contain opacity-40 hover:opacity-70 transition-opacity duration-300 brightness-0 invert"
      />
    );
  }
  return (
    <span className="text-white/25 text-sm tracking-[0.2em] uppercase font-sans hover:text-white/50 transition-colors duration-300">
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
