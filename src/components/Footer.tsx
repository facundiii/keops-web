import Link from "next/link";
import Image from "next/image";
import { Instagram, MapPin, Facebook } from "lucide-react";
import { siteConfig } from "@/config/site";

function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function TikTokIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.93a8.24 8.24 0 004.83 1.55V7.01a4.85 4.85 0 01-1.06-.32z" />
    </svg>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-night-950 border-t border-white/5">
      {/* Google Maps */}
      <div className="relative w-full h-72 md:h-96 overflow-hidden">
        <iframe
          src={siteConfig.maps.embedUrl}
          width="100%"
          height="100%"
          style={{ border: 0, filter: "grayscale(0.4) brightness(0.75) contrast(1.1)" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Ubicación Keops"
        />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-night-950 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-night-950 to-transparent pointer-events-none" />

        {/* Location badge */}
        <a
          href={siteConfig.maps.shareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-night-950/90 backdrop-blur-sm border border-white/10 hover:border-gold/40 text-white/70 hover:text-gold text-xs tracking-wide px-4 py-2.5 rounded-full transition-all duration-300 whitespace-nowrap"
        >
          <MapPin size={12} className="shrink-0" />
          {siteConfig.location} — Ver en Google Maps
        </a>
      </div>

      {/* ── Social media strip ── */}
      <div className="border-b border-white/5 py-7 px-4 text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-[var(--text-secondary)] mb-4">
          Seguinos en nuestras redes
        </p>
        <div className="flex items-center justify-center gap-4">
          <a
            href={siteConfig.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="flex items-center gap-2.5 px-5 py-3 rounded-xl border border-white/10 text-white/50 hover:text-white hover:border-[#E1306C]/50 hover:bg-[#E1306C]/5 transition-all duration-300 text-sm tracking-wider"
          >
            <Instagram size={18} />
            <span>Instagram</span>
          </a>
          <a
            href={siteConfig.tiktok.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
            className="flex items-center gap-2.5 px-5 py-3 rounded-xl border border-white/10 text-white/50 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-300 text-sm tracking-wider"
          >
            <TikTokIcon size={18} />
            <span>TikTok</span>
          </a>
          <a
            href={siteConfig.facebook.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="flex items-center gap-2.5 px-5 py-3 rounded-xl border border-white/10 text-white/50 hover:text-white hover:border-[#1877F2]/50 hover:bg-[#1877F2]/5 transition-all duration-300 text-sm tracking-wider"
          >
            <Facebook size={18} />
            <span>Facebook</span>
          </a>
        </div>
      </div>

      {/* ── Staff ── */}
      <div className="border-b border-white/5 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <p className="text-xs tracking-[0.35em] uppercase text-gold mb-1">Equipo</p>
            <h3 className="font-serif text-xl text-cream">Nuestro Staff</h3>
          </div>
          <ul className="flex flex-wrap justify-center gap-x-10 gap-y-4">
            {[
              { role: "DJ Residente", name: "Diego Fernandez" },
              { role: "Animador", name: "Santi Dominguez" },
              { role: "VJ / LJ / Visuales", name: "Facu Fernandez" },
              { role: "LJ", name: "Facu Ercoles" },
              { role: "VJ", name: "Santi Miñoz" },
              { role: "Técnica", name: "Diego Fernandez" },
            ].map(({ role, name }) => (
              <li key={role} className="flex items-start gap-2 text-sm w-[155px]">
                <span className="mt-[7px] w-1 h-1 rounded-full bg-gold/60 shrink-0" />
                <span>
                  <span className="block text-white/35 text-[10px] tracking-[0.2em] uppercase leading-none mb-0.5">{role}</span>
                  <span className="text-white/70">{name}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Footer main ── */}
      <div className="max-w-7xl mx-auto px-4 py-5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Keops logo */}
          <Link href="/" className="flex items-center shrink-0">
            <div className="relative w-36 md:w-44 aspect-[1080/445]">
              <Image
                src="/logo.png"
                alt="Keops"
                fill
                className="object-contain opacity-80 hover:opacity-100 transition-opacity duration-200"
              />
            </div>
          </Link>

          {/* Links + Fusion */}
          <nav className="flex flex-wrap justify-center items-center gap-6">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm tracking-widest uppercase text-white/40 hover:text-gold transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
            <Link href={siteConfig.fusion.href} aria-label="Fusion" className="relative h-10 w-32 inline-block">
              <Image
                src={siteConfig.fusion.logoSrc}
                alt="Fusion"
                fill
                className="object-contain fusion-glow"
              />
            </Link>
          </nav>

          {/* WhatsApp */}
          <div className="flex items-center gap-5">
            <a
              href={siteConfig.whatsapp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-[#25D366] transition-colors duration-200"
              aria-label="WhatsApp"
            >
              <WhatsAppIcon size={20} />
            </a>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-white/5 text-center">
          <p className="text-white/25 text-xs tracking-widest">
            © {year} {siteConfig.name}. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
