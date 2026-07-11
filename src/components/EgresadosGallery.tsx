"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { X, Play, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";

export type MediaItem =
  | { type: "video"; src: string; label?: string }
  | { type: "image"; src: string; alt?: string };

interface EgresadosGalleryProps {
  items: MediaItem[];
}

// ── Card de video (sin elemento <video> — carga cero) ───────────
function VideoCard({ item, index, onClick }: {
  item: Extract<MediaItem, { type: "video" }>;
  index: number;
  onClick: () => void;
}) {
  return (
    <div
      className="relative aspect-[9/16] rounded-2xl overflow-hidden cursor-pointer group border border-white/20 hover:border-gold/50 transition-colors duration-300"
      onClick={onClick}
    >
      {/* Frame del video como fondo — solo carga metadata + primer frame */}
      <video
        src={item.src}
        preload="metadata"
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        onLoadedMetadata={(e) => { e.currentTarget.currentTime = 1; }}
      />
      {/* Overlay oscuro para que el play destaque */}
      <div className="absolute inset-0 bg-night-950/55 group-hover:bg-night-950/40 transition-colors duration-300" />
      <div className="absolute inset-0 bg-gradient-to-t from-night-950/80 via-transparent to-transparent" />

      {/* Clip number */}
      <div className="absolute top-4 left-4 text-white/20 font-serif italic text-5xl leading-none select-none">
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* Film grain texture lines */}
      <div className="absolute inset-0 opacity-[0.025]"
        style={{ backgroundImage: "repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 4px)" }}
      />

      {/* Play button */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
        <div className="relative flex items-center justify-center w-20 h-20 rounded-full border-2 border-gold/60 bg-gold/10 group-hover:border-gold group-hover:bg-gold/20 transition-all duration-300">
          <div className="absolute inset-0 rounded-full bg-gold/15 scale-0 group-hover:scale-150 opacity-100 group-hover:opacity-0 transition-all duration-500" />
          <Play size={30} className="text-gold ml-1.5 drop-shadow-[0_0_12px_rgba(201,169,97,0.9)]" />
        </div>
        <div className="flex flex-col items-center gap-1">
          {item.label && (
            <p className="text-white/60 text-xs tracking-[0.25em] uppercase group-hover:text-white/90 transition-colors duration-300">
              {item.label}
            </p>
          )}
          <p className="text-white/30 text-[10px] tracking-widest uppercase group-hover:text-gold/60 transition-colors duration-300">
            Reproducir
          </p>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-night-900/90 to-transparent" />
    </div>
  );
}

// ── Card de imagen ───────────────────────────────────────────────
function ImageCard({ item, onClick }: {
  item: Extract<MediaItem, { type: "image" }>;
  onClick: () => void;
}) {
  return (
    <div
      className="relative rounded-2xl overflow-hidden cursor-zoom-in group"
      onClick={onClick}
    >
      <Image
        src={item.src}
        alt={item.alt ?? ""}
        width={0}
        height={0}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        style={{ width: "100%", height: "auto", display: "block" }}
        className="transition-transform duration-500 group-hover:scale-[1.03]"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300 flex items-center justify-center">
        <ZoomIn size={22} className="text-white opacity-0 group-hover:opacity-80 transition-opacity duration-300" />
      </div>
    </div>
  );
}

// ── Modal ────────────────────────────────────────────────────────
function Modal({ items, index, onClose, onPrev, onNext }: {
  items: MediaItem[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const item = items[index];
  const touchStartX = useRef<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = 0.05;
    }
  }, [index]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, onPrev, onNext]);

  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 50) delta < 0 ? onNext() : onPrev();
    touchStartX.current = null;
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/97 backdrop-blur-sm flex items-center justify-center"
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Close */}
      <button
        className="absolute top-4 right-4 z-10 p-2 rounded-full border border-white/15 bg-white/5 text-white/60 hover:text-white transition-colors duration-200"
        onClick={onClose}
        aria-label="Cerrar"
      >
        <X size={20} />
      </button>

      {/* Counter */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/30 text-xs tracking-[0.3em] select-none">
        {index + 1} / {items.length}
      </div>

      {/* Prev */}
      {items.length > 1 && (
        <button
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 rounded-full border border-white/15 bg-white/5 text-white/60 hover:text-white transition-colors duration-200"
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          aria-label="Anterior"
        >
          <ChevronLeft size={22} />
        </button>
      )}

      {/* Content — video o imagen, creado solo cuando el modal abre */}
      <div
        className="flex items-center justify-center w-full h-full px-14 sm:px-20 py-14"
        onClick={(e) => e.stopPropagation()}
      >
        {item.type === "video" ? (
          <video
            ref={videoRef}
            key={item.src}
            src={item.src}
            controls
            autoPlay
            playsInline
            onLoadedMetadata={(e) => { e.currentTarget.volume = 0.05; }}
            style={{
              maxWidth: "100%",
              maxHeight: "calc(100vh - 112px)",
              width: "auto",
              height: "auto",
              borderRadius: "16px",
            }}
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={item.src}
            src={item.src}
            alt={item.alt ?? ""}
            style={{
              maxWidth: "100%",
              maxHeight: "calc(100vh - 112px)",
              width: "auto",
              height: "auto",
              objectFit: "contain",
              borderRadius: "12px",
            }}
          />
        )}
      </div>

      {/* Next */}
      {items.length > 1 && (
        <button
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 rounded-full border border-white/15 bg-white/5 text-white/60 hover:text-white transition-colors duration-200"
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          aria-label="Siguiente"
        >
          <ChevronRight size={22} />
        </button>
      )}

      {/* Dots */}
      {items.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
          {items.map((_, i) => (
            <button
              key={i}
              style={{ width: i === index ? "16px" : "6px" }}
              className={`h-1.5 rounded-full transition-all duration-200 ${i === index ? "bg-gold" : "bg-white/25"}`}
              onClick={(e) => { e.stopPropagation(); }}
              aria-label={`Ir a item ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Componente principal ─────────────────────────────────────────
export function EgresadosGallery({ items }: EgresadosGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const open = useCallback((i: number) => setActiveIndex(i), []);
  const close = useCallback(() => setActiveIndex(null), []);
  const prev = useCallback(() => setActiveIndex((i) => i === null ? null : (i - 1 + items.length) % items.length), [items.length]);
  const next = useCallback(() => setActiveIndex((i) => i === null ? null : (i + 1) % items.length), [items.length]);

  const videos = items.filter((it) => it.type === "video");
  const images = items.filter((it) => it.type === "image");

  return (
    <>
      {/* Videos — grid de 3 columnas en desktop, 1 en mobile */}
      {videos.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {videos.map((item, i) => (
            <VideoCard
              key={i}
              item={item as Extract<MediaItem, { type: "video" }>}
              index={i}
              onClick={() => open(items.indexOf(item))}
            />
          ))}
        </div>
      )}

      {/* Imágenes — masonry */}
      {images.length > 0 && (
        <div className="columns-2 sm:columns-3 gap-3">
          {images.map((item, i) => (
            <div key={i} className="break-inside-avoid mb-3">
              <ImageCard
                item={item as Extract<MediaItem, { type: "image" }>}
                onClick={() => open(items.indexOf(item))}
              />
            </div>
          ))}
        </div>
      )}

      {/* Modal — solo existe cuando activeIndex no es null */}
      {activeIndex !== null && (
        <Modal
          items={items}
          index={activeIndex}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      )}
    </>
  );
}
