import { siteConfig } from "@/config/site";

function GooglePlayIcon() {
  return (
    <svg width="29" height="29" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3.18 23.76c.37.2.8.22 1.19.05l11.6-6.57-2.52-2.52-10.27 9.04zM.5 1.4C.19 1.77 0 2.33 0 3.04v17.93c0 .71.19 1.27.5 1.63l.08.08 10.04-10.04v-.24L.58 1.32.5 1.4zM20.1 10.27l-2.85-1.62-2.82 2.82 2.82 2.82 2.87-1.63c.82-.46.82-1.93-.02-2.39zM4.37.19L15.97 6.76l-2.52 2.52L3.18.24C3.56.07 4 .09 4.37.19z" />
    </svg>
  );
}

function AppStoreIcon() {
  return (
    <svg width="29" height="29" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
    </svg>
  );
}

export function TicketSection() {
  return (
    <section
      id="comprar-entrada"
      className="bg-night-950 border-t border-white/5 pt-12 pb-8 px-4"
    >
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-gold text-xs tracking-[0.35em] uppercase mb-4">Entradas</p>
        <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
          Comprá tu entrada
        </h2>
        <p className="text-white/40 text-sm md:text-base leading-relaxed mb-12">
          Descargá la app y asegurá tu lugar antes de que se agoten.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Google Play */}
          <a
            href={siteConfig.ticketApps.googlePlay}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-5 bg-night-800 hover:bg-night-700 border border-white/10 hover:border-white/20 text-white px-8 py-5 rounded-2xl transition-all duration-300 hover:scale-105 w-full sm:w-auto min-w-[260px]"
          >
            <span className="text-white/60 group-hover:text-white transition-colors">
              <GooglePlayIcon />
            </span>
            <div className="text-left">
              <p className="text-white/40 text-[13px] tracking-widest uppercase leading-none mb-1">Disponible en</p>
              <p className="text-white text-base font-medium leading-none">Google Play</p>
            </div>
          </a>

          {/* App Store */}
          <a
            href={siteConfig.ticketApps.appStore}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-5 bg-night-800 hover:bg-night-700 border border-white/10 hover:border-white/20 text-white px-8 py-5 rounded-2xl transition-all duration-300 hover:scale-105 w-full sm:w-auto min-w-[260px]"
          >
            <span className="text-white/60 group-hover:text-white transition-colors">
              <AppStoreIcon />
            </span>
            <div className="text-left">
              <p className="text-white/40 text-[13px] tracking-widest uppercase leading-none mb-1">Disponible en</p>
              <p className="text-white text-base font-medium leading-none">App Store</p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
