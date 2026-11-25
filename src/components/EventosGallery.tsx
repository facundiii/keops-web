"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";

// ── Slot components ─────────────────────────────────────────────
// Las fotos de las tiras son decorativas (alt vacío): las mismas fotos están,
// con su descripción, en la grilla de abajo. Un lugar sin foto no se muestra.

function ImageSlot({ src, alt }: { src?: string; alt?: string }) {
  if (!src) return null;
  return (
    <div className="w-full aspect-[9/16] relative rounded-xl overflow-hidden shrink-0">
      <Image src={src} alt={alt ?? ""} fill className="object-cover" sizes="240px" />
    </div>
  );
}

const claseControlVideo =
  "flex items-center min-h-[44px] rounded-full border border-oro bg-negro/80 backdrop-blur-sm text-oro hover:bg-oro/10 transition-colors duration-300";

function VideoSlot({ src, enPausa, alPausar }: { src?: string; enPausa: boolean; alPausar: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  // El botón de pausa frena el video junto con las tiras de fotos.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (enPausa) video.pause();
    else video.play().catch(() => {});
  }, [enPausa]);

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    if (!videoRef.current.muted) videoRef.current.volume = 0.2;
    setMuted(videoRef.current.muted);
  };

  if (!src) return null;

  return (
    <div className="w-full aspect-[9/16] relative rounded-2xl overflow-hidden">
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      />
      {/* Gradient base para el botón */}
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-negro/60 to-transparent pointer-events-none" />
      {/* Pausa (video y tiras de fotos) y sonido: dentro del video */}
      <div className="absolute bottom-4 inset-x-0 flex justify-center gap-2 z-20">
        <button
          type="button"
          onClick={alPausar}
          aria-label={enPausa ? "Reanudar el video y las fotos" : "Pausar el video y las fotos"}
          className={`${claseControlVideo} justify-center w-11`}
        >
          {enPausa ? (
            <Play size={20} strokeWidth={1.5} aria-hidden="true" />
          ) : (
            <Pause size={20} strokeWidth={1.5} aria-hidden="true" />
          )}
        </button>
        <button type="button" onClick={toggleMute} className={`${claseControlVideo} texto-chico gap-2 px-4`}>
          {muted ? (
            <VolumeX size={20} strokeWidth={1.5} aria-hidden="true" />
          ) : (
            <Volume2 size={20} strokeWidth={1.5} aria-hidden="true" />
          )}
          <span>{muted ? "Activar sonido" : "Silenciar"}</span>
        </button>
      </div>
    </div>
  );
}

// ── Strip: vertical scroll column ───────────────────────────────

interface StripProps {
  images: (string | undefined)[];
  direction: "up" | "down";
  pausado: boolean;
}

function Strip({ images, direction, pausado }: StripProps) {
  const items = [...images, ...images];
  const animClass = direction === "up" ? "animate-scroll-up" : "animate-scroll-down";

  return (
    <div className="overflow-hidden" style={{ height: "100%" }}>
      <div className={`tira-continua flex flex-col gap-3 ${animClass} ${pausado ? "animacion-pausada" : ""}`}>
        {items.map((src, i) => (
          <ImageSlot key={i} src={src} />
        ))}
      </div>
    </div>
  );
}

// ── Strip: horizontal infinite scroll (mobile) ──────────────────

function HorizontalStrip({
  leftImages,
  rightImages,
  pausado,
}: {
  leftImages: (string | undefined)[];
  rightImages: (string | undefined)[];
  pausado: boolean;
}) {
  const pausa = pausado ? "animacion-pausada" : "";
  const leftItems = [...leftImages, ...leftImages];
  const rightItems = [...rightImages, ...rightImages];

  const renderItem = (src: string | undefined, i: number) =>
    src ? (
      <div key={i} className="w-28 shrink-0 aspect-[9/16] relative rounded-xl overflow-hidden">
        <Image src={src} alt="" fill className="object-cover" sizes="112px" />
      </div>
    ) : null;

  return (
    <div className="flex flex-col gap-3">
      {/* Fila 1 — izquierda */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-8 z-10 bg-gradient-to-r from-negro to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-8 z-10 bg-gradient-to-l from-negro to-transparent pointer-events-none" />
        <div className={`tira-continua flex gap-3 w-max animate-scroll-left-fast ${pausa}`}>
          {leftItems.map(renderItem)}
        </div>
      </div>
      {/* Fila 2 — derecha */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-8 z-10 bg-gradient-to-r from-negro to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-8 z-10 bg-gradient-to-l from-negro to-transparent pointer-events-none" />
        <div className={`tira-continua flex gap-3 w-max animate-scroll-right-fast ${pausa}`}>
          {rightItems.map(renderItem)}
        </div>
      </div>
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────

interface EventosGalleryProps {
  videoSrc?: string;
  leftImages?: (string | undefined)[];
  rightImages?: (string | undefined)[];
}

const defaultImages: (string | undefined)[] = [
  undefined,
  undefined,
  undefined,
  undefined,
];

export function EventosGallery({
  videoSrc,
  leftImages = defaultImages,
  rightImages = defaultImages,
}: EventosGalleryProps) {
  // Lo que se mueve solo se puede pausar (WCAG 2.2.2): un botón frena el video y las tiras.
  const [enPausa, setEnPausa] = useState(false);
  const alPausar = () => setEnPausa((v) => !v);

  return (
    <>
      {/* ── Desktop: 3-column cinema strip ── */}
      <div className="hidden lg:block relative">
        {/* Top + bottom vignettes */}
        <div className="absolute inset-x-0 top-0 h-12 z-10 bg-gradient-to-b from-negro to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-12 z-10 bg-gradient-to-t from-negro to-transparent pointer-events-none" />

        <div
          className="flex gap-4 items-start max-w-5xl mx-auto px-4"
          style={{ height: "660px", overflow: "hidden" }}
        >
          {/* Left strip — scrolls up */}
          <div className="w-52 shrink-0 h-full">
            <Strip images={leftImages} direction="up" pausado={enPausa} />
          </div>

          {/* Center — video */}
          <div className="flex-1 flex items-center justify-center h-full py-3">
            <div className="w-full max-w-[280px]">
              <VideoSlot src={videoSrc} enPausa={enPausa} alPausar={alPausar} />
            </div>
          </div>

          {/* Right strip — scrolls down */}
          <div className="w-52 shrink-0 h-full">
            <Strip images={rightImages} direction="down" pausado={enPausa} />
          </div>
        </div>
      </div>

      {/* ── Mobile: video + horizontal carousel ── */}
      <div className="lg:hidden">
        <div className="max-w-xs mx-auto px-4 mb-6">
          <VideoSlot src={videoSrc} enPausa={enPausa} alPausar={alPausar} />
        </div>
        <HorizontalStrip leftImages={leftImages} rightImages={rightImages} pausado={enPausa} />
      </div>
    </>
  );
}
