"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Volume2, VolumeX } from "lucide-react";

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

function VideoSlot({ src }: { src?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    if (!videoRef.current.muted) videoRef.current.volume = 0.2;
    setMuted(videoRef.current.muted);
  };

  // Con "menos movimiento" activado en el sistema, el video queda quieto.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const consulta = window.matchMedia("(prefers-reduced-motion: reduce)");
    const aplicar = () => {
      if (consulta.matches) video.pause();
      else video.play().catch(() => {});
    };
    aplicar();
    consulta.addEventListener("change", aplicar);
    return () => consulta.removeEventListener("change", aplicar);
  }, [src]);

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
      {/* Botón de sonido — overlay dentro del video */}
      <div className="absolute bottom-4 inset-x-0 flex justify-center z-20">
        <button
          onClick={toggleMute}
          className="texto-chico flex items-center gap-2 min-h-[44px] px-4 rounded-full border border-oro bg-negro/80 backdrop-blur-sm text-oro hover:bg-oro/10 transition-colors duration-300"
        >
          {muted ? <VolumeX size={20} strokeWidth={1.5} /> : <Volume2 size={20} strokeWidth={1.5} />}
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
}

function Strip({ images, direction }: StripProps) {
  const items = [...images, ...images];
  const animClass = direction === "up" ? "animate-scroll-up" : "animate-scroll-down";

  return (
    <div className="overflow-hidden" style={{ height: "100%" }}>
      <div className={`flex flex-col gap-3 ${animClass}`}>
        {items.map((src, i) => (
          <ImageSlot key={i} src={src} />
        ))}
      </div>
    </div>
  );
}

// ── Strip: horizontal infinite scroll (mobile) ──────────────────

function HorizontalStrip({ leftImages, rightImages }: { leftImages: (string | undefined)[]; rightImages: (string | undefined)[] }) {
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
        <div className="flex gap-3 w-max animate-scroll-left-fast">
          {leftItems.map(renderItem)}
        </div>
      </div>
      {/* Fila 2 — derecha */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-8 z-10 bg-gradient-to-r from-negro to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-8 z-10 bg-gradient-to-l from-negro to-transparent pointer-events-none" />
        <div className="flex gap-3 w-max animate-scroll-right-fast">
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
            <Strip images={leftImages} direction="up" />
          </div>

          {/* Center — video */}
          <div className="flex-1 flex items-center justify-center h-full py-3">
            <div className="w-full max-w-[280px]">
              <VideoSlot src={videoSrc} />
            </div>
          </div>

          {/* Right strip — scrolls down */}
          <div className="w-52 shrink-0 h-full">
            <Strip images={rightImages} direction="down" />
          </div>
        </div>
      </div>

      {/* ── Mobile: video + horizontal carousel ── */}
      <div className="lg:hidden">
        <div className="max-w-xs mx-auto px-4 mb-6">
          <VideoSlot src={videoSrc} />
        </div>
        <HorizontalStrip leftImages={leftImages} rightImages={rightImages} />
      </div>
    </>
  );
}
