"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ZoomIn, Loader2 } from "lucide-react";

interface PhotoGalleryProps {
  images: string[];
}

export function PhotoGallery({ images }: PhotoGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [imgLoaded, setImgLoaded] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const isOpen = lightboxIndex !== null;

  const open = useCallback((i: number) => {
    setImgLoaded(false);
    setLightboxIndex(i);
  }, []);

  const close = useCallback(() => setLightboxIndex(null), []);

  const prev = useCallback(() => {
    setImgLoaded(false);
    setLightboxIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length));
  }, [images.length]);

  const next = useCallback(() => {
    setImgLoaded(false);
    setLightboxIndex((i) => (i === null ? null : (i + 1) % images.length));
  }, [images.length]);

  // Keyboard + scroll lock
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close, prev, next]);

  // Preload adjacent images
  useEffect(() => {
    if (lightboxIndex === null) return;
    const preload = (src: string) => { const img = new window.Image(); img.src = src; };
    preload(images[(lightboxIndex + 1) % images.length]);
    preload(images[(lightboxIndex - 1 + images.length) % images.length]);
  }, [lightboxIndex, images]);

  // Swipe
  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 50) delta < 0 ? next() : prev();
    touchStartX.current = null;
  };

  return (
    <>
      {/* ── Masonry grid ── */}
      <div className="columns-2 sm:columns-3 lg:columns-4 gap-2 sm:gap-3">
        {images.map((src, i) => (
          <div
            key={i}
            className="break-inside-avoid mb-2 sm:mb-3 rounded-xl overflow-hidden cursor-zoom-in group relative"
            onClick={() => open(i)}
          >
            <Image
              src={src}
              alt={`Foto ${i + 1}`}
              width={0}
              height={0}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              style={{ width: "100%", height: "auto", display: "block" }}
              className="transition-transform duration-500 group-hover:scale-[1.03]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
              <ZoomIn size={22} className="text-white opacity-0 group-hover:opacity-80 transition-opacity duration-300 drop-shadow-lg" />
            </div>
          </div>
        ))}
      </div>

      {/* ── Lightbox ── */}
      {isOpen && lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center"
          onClick={close}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Close */}
          <button
            className="absolute top-4 right-4 z-10 p-2 rounded-full border border-white/15 bg-white/5 text-white/60 hover:text-white transition-colors duration-200"
            onClick={close}
            aria-label="Cerrar"
          >
            <X size={20} />
          </button>

          {/* Counter */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/35 text-xs tracking-[0.3em] select-none">
            {lightboxIndex + 1} / {images.length}
          </div>

          {/* Prev */}
          <button
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 rounded-full border border-white/15 bg-white/5 text-white/60 hover:text-white transition-colors duration-200"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Anterior"
          >
            <ChevronLeft size={22} />
          </button>

          {/* Image area */}
          <div
            className="flex items-center justify-center w-full h-full px-14 sm:px-20 py-14"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Loading spinner */}
            {!imgLoaded && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <Loader2 size={32} className="text-gold/50 animate-spin" />
              </div>
            )}
            {/* Native img — avoids next/image sizing issues in lightbox */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={images[lightboxIndex]}
              src={images[lightboxIndex]}
              alt={`Foto ${lightboxIndex + 1}`}
              onLoad={() => setImgLoaded(true)}
              style={{
                maxWidth: "100%",
                maxHeight: "calc(100vh - 112px)",
                width: "auto",
                height: "auto",
                objectFit: "contain",
                borderRadius: "12px",
                opacity: imgLoaded ? 1 : 0,
                transition: "opacity 0.2s ease",
                display: "block",
              }}
            />
          </div>

          {/* Next */}
          <button
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 rounded-full border border-white/15 bg-white/5 text-white/60 hover:text-white transition-colors duration-200"
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Siguiente"
          >
            <ChevronRight size={22} />
          </button>

          {/* Dot indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                style={{ width: i === lightboxIndex ? "16px" : "6px" }}
                className={`h-1.5 rounded-full transition-all duration-200 ${
                  i === lightboxIndex ? "bg-gold" : "bg-white/25"
                }`}
                onClick={(e) => { e.stopPropagation(); setImgLoaded(false); setLightboxIndex(i); }}
                aria-label={`Ir a foto ${i + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
