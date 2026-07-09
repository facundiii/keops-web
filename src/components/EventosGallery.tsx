"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Play, ImageIcon, Volume2, VolumeX } from "lucide-react";

// ── Slot components ─────────────────────────────────────────────

function ImageSlot({ src, alt }: { src?: string; alt?: string }) {
  if (!src) {
    return (
      <div className="w-full aspect-[9/16] rounded-xl bg-night-800 border border-white/5 flex items-center justify-center shrink-0">
        <ImageIcon size={20} className="text-white/10" />
      </div>
    );
  }
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

  if (!src) {
    return (
      <div className="w-full aspect-[9/16] rounded-2xl bg-night-800 border border-white/8 flex flex-col items-center justify-center gap-4">
        <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center">
          <Play size={22} className="text-white/20 ml-1" />
        </div>
        <p className="text-white/20 text-[11px] tracking-[0.2em] uppercase">Video próximamente</p>
      </div>
    );
  }

  return (
    <div className="w-full">
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
      </div>
      <div className="flex justify-center mt-3">
        <button
          onClick={toggleMute}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/15 bg-night-900/60 backdrop-blur-sm text-white/50 hover:text-gold hover:border-gold/40 transition-all duration-300 text-[11px] tracking-widest"
          aria-label={muted ? "Activar sonido" : "Silenciar"}
        >
          {muted ? <VolumeX size={13} /> : <Volume2 size={13} />}
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

  const renderItem = (src: string | undefined, i: number) => (
    <div key={i} className="w-28 shrink-0 aspect-[9/16] relative rounded-xl overflow-hidden">
      {src ? (
        <Image src={src} alt="" fill className="object-cover" sizes="112px" />
      ) : (
        <div className="w-full h-full bg-night-800 border border-white/5 flex items-center justify-center">
          <ImageIcon size={16} className="text-white/10" />
        </div>
      )}
    </div>
  );

  return (
    <div className="flex flex-col gap-3">
      {/* Fila 1 — izquierda */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-8 z-10 bg-gradient-to-r from-night-950 to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-8 z-10 bg-gradient-to-l from-night-950 to-transparent pointer-events-none" />
        <div className="flex gap-3 w-max animate-scroll-left-fast">
          {leftItems.map(renderItem)}
        </div>
      </div>
      {/* Fila 2 — derecha */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-8 z-10 bg-gradient-to-r from-night-950 to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-8 z-10 bg-gradient-to-l from-night-950 to-transparent pointer-events-none" />
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
        <div className="absolute inset-x-0 top-0 h-20 z-10 bg-gradient-to-b from-night-950 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-20 z-10 bg-gradient-to-t from-night-950 to-transparent pointer-events-none" />

        <div
          className="flex gap-4 items-start max-w-5xl mx-auto px-4"
          style={{ height: "680px", overflow: "hidden" }}
        >
          {/* Left strip — scrolls up */}
          <div className="w-52 shrink-0 h-full">
            <Strip images={leftImages} direction="up" />
          </div>

          {/* Center — video */}
          <div className="flex-1 flex items-center justify-center h-full py-6">
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
