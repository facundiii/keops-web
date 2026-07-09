"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Volume2, VolumeX } from "lucide-react";

export default function SplashPage() {
  const router = useRouter();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [muted, setMuted] = useState(false);
  const [audioReady, setAudioReady] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.1;
    audio.loop = true;

    const tryPlay = () => {
      audio.play().then(() => {
        setAudioReady(true);
      }).catch(() => {
        // Autoplay blocked — will play on first interaction
        setAudioReady(false);
      });
    };

    tryPlay();

    // Fallback: play on first user interaction if autoplay was blocked
    const onInteract = () => {
      if (audio.paused) {
        audio.play().then(() => setAudioReady(true)).catch(() => {});
      }
      document.removeEventListener("click", onInteract);
      document.removeEventListener("keydown", onInteract);
    };
    document.addEventListener("click", onInteract);
    document.addEventListener("keydown", onInteract);

    return () => {
      document.removeEventListener("click", onInteract);
      document.removeEventListener("keydown", onInteract);
    };
  }, []);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setMuted(audio.muted);
  };

  const handleEnter = () => {
    const audio = audioRef.current;
    if (audio) {
      // Fade out audio
      const fade = setInterval(() => {
        if (audio.volume > 0.05) {
          audio.volume = Math.max(0, audio.volume - 0.05);
        } else {
          audio.pause();
          clearInterval(fade);
        }
      }, 50);
    }
    router.push("/home");
  };

  return (
    <div className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center bg-night-950">
      {/* Audio */}
      <audio ref={audioRef} src="/pista.mp3" preload="auto" />

      {/* Background */}
      <div className="absolute inset-0 splash-bg" />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-night-950/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-night-950/75 via-transparent to-night-950/10" />

      {/* Mute button */}
      <button
        onClick={toggleMute}
        className="absolute top-6 right-6 z-20 flex items-center gap-2 px-3 py-2 rounded-full border border-white/15 bg-night-950/40 backdrop-blur-sm text-white/50 hover:text-white hover:border-white/30 transition-all duration-300 text-xs tracking-widest"
        aria-label={muted ? "Activar sonido" : "Silenciar"}
      >
        {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
        <span className="hidden sm:inline">{muted ? "Sin sonido" : "Sonido"}</span>
      </button>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 select-none">

        {/* Hieroglyphics */}
        <div className="splash-hieroglyph font-hieroglyph mb-6 text-4xl sm:text-5xl md:text-6xl leading-none tracking-[0.1em] whitespace-nowrap">
          𓇋𓇋𓂻𓅱𓇋 𓅓 𓊵
        </div>

        {/* Bienvenidos */}
        <p className="splash-welcome text-xs sm:text-sm tracking-[0.5em] uppercase text-white/60 mb-6 font-sans">
          Bienvenidos
        </p>

        {/* Enter button */}
        <button
          onClick={handleEnter}
          className="splash-enter group flex items-center gap-3 border border-gold/40 hover:border-gold text-gold/70 hover:text-gold px-8 py-4 rounded-full transition-all duration-500 hover:bg-gold/5 hover:shadow-[0_0_30px_rgba(201,169,97,0.2)] text-sm tracking-[0.3em] uppercase"
        >
          Entrar
          <ArrowRight
            size={16}
            className="group-hover:translate-x-1.5 transition-transform duration-300"
          />
        </button>
      </div>
    </div>
  );
}
