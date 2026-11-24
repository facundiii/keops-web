"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import { Play, ZoomIn } from "lucide-react";
import { Visor, type MedioVisor } from "@/components/Visor";

export type MediaItem =
  | { type: "video"; src: string; label?: string }
  | { type: "image"; src: string; alt?: string };

interface GaleriaProps {
  items: MediaItem[];
}

// ── Tarjeta de video (el <video> carga recién al acercarse a la pantalla) ──
function VideoCard({ item, index, onClick }: {
  item: Extract<MediaItem, { type: "video" }>;
  index: number;
  onClick: () => void;
}) {
  const containerRef = useRef<HTMLButtonElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.preload = "metadata";
          video.load();
          observer.unobserve(container);
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <button
      ref={containerRef}
      type="button"
      onClick={onClick}
      aria-label={`Reproducir video${item.label ? `: ${item.label}` : ` ${index + 1}`}`}
      className="relative block w-full aspect-[9/16] rounded-2xl overflow-hidden group border border-piedra text-left transition-colors duration-300 hover:border-oro focus-visible:border-oro"
    >
      <video
        ref={videoRef}
        src={item.src}
        preload="none"
        muted
        playsInline
        aria-hidden="true"
        tabIndex={-1}
        className="absolute inset-0 w-full h-full object-cover"
        onLoadedMetadata={(e) => { e.currentTarget.currentTime = 1; }}
      />
      {/* Oscurece el cuadro para que se lea el botón de play */}
      <div className="absolute inset-0 bg-negro/55 group-hover:bg-negro/40 transition-colors duration-300" />
      <div className="absolute inset-0 bg-gradient-to-t from-negro/80 via-transparent to-transparent" />

      {/* Número de clip: solo visual */}
      <div aria-hidden="true" className="absolute top-4 left-4 text-arena/60 font-titulo font-semibold text-5xl leading-none select-none">
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* Play */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
        <div className="relative flex items-center justify-center w-20 h-20 rounded-full border-2 border-oro/60 bg-oro/10 group-hover:border-oro group-hover:bg-oro/20 transition-all duration-300">
          <div className="absolute inset-0 rounded-full bg-oro/15 scale-0 group-hover:scale-150 opacity-100 group-hover:opacity-0 transition-all duration-500" />
          <Play size={30} strokeWidth={1.5} aria-hidden="true" className="text-oro ml-1.5" />
        </div>
        <div className="flex flex-col items-center gap-1">
          {item.label && (
            <p className="text-arena text-xs tracking-[0.25em] uppercase group-hover:text-marfil transition-colors duration-300">
              {item.label}
            </p>
          )}
          <p className="text-arena text-xs tracking-widest uppercase group-hover:text-oro transition-colors duration-300">
            Reproducir
          </p>
        </div>
      </div>

      {/* Fundido de abajo */}
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-carbon/90 to-transparent" />
    </button>
  );
}

// ── Tarjeta de imagen ────────────────────────────────────────────
function ImageCard({ item, onClick }: {
  item: Extract<MediaItem, { type: "image" }>;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={item.alt ? `Ampliar foto: ${item.alt}` : "Ampliar foto"}
      className="relative block w-full rounded-2xl overflow-hidden cursor-zoom-in group"
    >
      <Image
        src={item.src}
        alt=""
        width={0}
        height={0}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        style={{ width: "100%", height: "auto", display: "block" }}
        className="transition-transform duration-500 group-hover:scale-[1.03]"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-negro/0 group-hover:bg-negro/25 transition-colors duration-300 flex items-center justify-center">
        <ZoomIn size={24} strokeWidth={1.5} aria-hidden="true" className="text-marfil opacity-0 group-hover:opacity-80 transition-opacity duration-300" />
      </div>
    </button>
  );
}

// ── Componente principal ─────────────────────────────────────────
export function Galeria({ items }: GaleriaProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const medios = useMemo<MedioVisor[]>(
    () =>
      items.map((it) =>
        it.type === "video"
          ? { tipo: "video", src: it.src, titulo: it.label }
          : { tipo: "imagen", src: it.src, alt: it.alt ?? "" }
      ),
    [items]
  );

  const videos = items.filter((it) => it.type === "video");
  const images = items.filter((it) => it.type === "image");

  return (
    <>
      {/* Videos: tres columnas en computadora, una en celular */}
      {videos.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {videos.map((item, i) => (
            <VideoCard
              key={i}
              item={item as Extract<MediaItem, { type: "video" }>}
              index={i}
              onClick={() => setActiveIndex(items.indexOf(item))}
            />
          ))}
        </div>
      )}

      {/* Imágenes en mosaico */}
      {images.length > 0 && (
        <div className="columns-2 sm:columns-3 gap-3">
          {images.map((item, i) => (
            <div key={i} className="break-inside-avoid mb-3">
              <ImageCard
                item={item as Extract<MediaItem, { type: "image" }>}
                onClick={() => setActiveIndex(items.indexOf(item))}
              />
            </div>
          ))}
        </div>
      )}

      <Visor medios={medios} indice={activeIndex} alCambiar={setActiveIndex} alCerrar={() => setActiveIndex(null)} />
    </>
  );
}
