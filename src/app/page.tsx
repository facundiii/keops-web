"use client";

// Pantalla de entrada. Se elimina en la Etapa 3 (la home pasa a "/").
// El sonido arranca apagado: solo suena si la persona lo activa.

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Volume2, VolumeX } from "lucide-react";
import { Boton } from "@/components/ui/Boton";

export default function SplashPage() {
  const router = useRouter();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [sonando, setSonando] = useState(false);

  const alternarSonido = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.volume = 0.1;
      audio.loop = true;
      audio.play().then(() => setSonando(true)).catch(() => setSonando(false));
    } else {
      audio.pause();
      setSonando(false);
    }
  };

  const entrar = () => {
    audioRef.current?.pause();
    router.push("/home");
  };

  return (
    <div className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center bg-negro">
      <audio ref={audioRef} src="/pista.mp3" preload="none" />

      {/* Fondo */}
      <div className="absolute inset-0 splash-bg" />
      <div className="absolute inset-0 bg-negro/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-negro/75 via-transparent to-negro/10" />

      {/* Sonido: apagado hasta que la persona lo activa */}
      <button
        onClick={alternarSonido}
        className="texto-chico absolute top-6 right-6 z-20 flex items-center gap-2 min-h-[44px] px-4 rounded-full border border-piedra bg-negro/60 backdrop-blur-sm text-arena hover:text-marfil transition-colors duration-300"
        aria-pressed={sonando}
      >
        {sonando ? <Volume2 size={20} strokeWidth={1.5} /> : <VolumeX size={20} strokeWidth={1.5} />}
        <span>{sonando ? "Silenciar" : "Activar sonido"}</span>
      </button>

      {/* Contenido */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 select-none">
        {/* Jeroglíficos: ornamento */}
        <div
          aria-hidden="true"
          className="font-jeroglifico text-oro mb-6 text-4xl sm:text-5xl md:text-6xl leading-none tracking-[0.1em] whitespace-nowrap animate-fade-in-up"
        >
          𓇋𓇋𓂻𓅱𓇋 𓅓 𓊵
        </div>

        <p className="antetitulo text-marfil mb-8 animate-fade-in-up animate-delay-200">Bienvenidos</p>

        <div className="animate-fade-in-up animate-delay-400">
          <Boton variante="principal" onClick={entrar}>
            Entrar
            <ArrowRight size={20} strokeWidth={1.5} />
          </Boton>
        </div>
      </div>
    </div>
  );
}
