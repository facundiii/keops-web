import { Instagram, Mail } from "lucide-react";
import { siteConfig } from "@/config/site";

function WhatsAppIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

interface ContactCTAProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
}

export function ContactCTA({
  title = "¿Listo para reservar?",
  subtitle = "Contactanos por WhatsApp, por mail o seguinos en Instagram para no perderte ninguna novedad.",
  ctaText,
}: ContactCTAProps) {
  const waUrl = siteConfig.whatsapp.url;

  return (
    <section className="bg-night-950 border-t border-white/5 py-12 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-gold text-sm tracking-[0.3em] uppercase mb-4">Contacto</p>
        <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">{title}</h2>
        <p className="text-white/50 text-base md:text-lg leading-relaxed mb-8">{subtitle}</p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          {/* WhatsApp button */}
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-medium px-7 py-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#25D366]/25 text-sm tracking-wide"
          >
            <WhatsAppIcon size={20} />
            Chatear por WhatsApp
          </a>

          {/* Email button */}
          <a
            href={`mailto:${siteConfig.email}`}
            className="group flex items-center gap-3 border border-gold/30 hover:border-gold text-gold/70 hover:text-gold px-7 py-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-gold/10 text-sm tracking-wide"
          >
            <Mail size={20} />
            Escribinos por e-mail
          </a>

          {/* Instagram button */}
          <a
            href={siteConfig.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 border border-white/20 hover:border-[#E1306C] text-white/70 hover:text-white px-7 py-4 rounded-full transition-all duration-300 hover:scale-105 text-sm tracking-wide"
          >
            <Instagram size={20} className="group-hover:text-[#E1306C] transition-colors" />
            {siteConfig.instagram.handle}
          </a>
        </div>

        {/* Contact info */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-white/30 text-sm">
          <span className="flex items-center gap-2">
            <WhatsAppIcon size={14} />
            +{siteConfig.whatsapp.number.replace(/(\d{2})(\d{2})(\d{4})(\d+)/, "$1 $2 $3 $4")}
          </span>
          <span className="hidden sm:block">·</span>
          <span className="flex items-center gap-2">
            <Mail size={14} />
            {siteConfig.email}
          </span>
          <span className="hidden sm:block">·</span>
          <span className="flex items-center gap-2">
            <Instagram size={14} />
            {siteConfig.instagram.handle}
          </span>
        </div>
      </div>
    </section>
  );
}
