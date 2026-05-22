"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

export type MediaItem =
  | { type: "image"; src: string; alt?: string }
  | { type: "video"; src: string; poster?: string };

interface CarouselProps {
  items: MediaItem[];
  autoplay?: boolean;
  autoplayDelay?: number;
}

export function Carousel({ items, autoplay = false, autoplayDelay = 4000 }: CarouselProps) {
  const plugins = autoplay
    ? [Autoplay({ delay: autoplayDelay, stopOnInteraction: true })]
    : [];

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, plugins);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", () => setSelectedIndex(emblaApi.selectedScrollSnap()));
  }, [emblaApi]);

  if (items.length === 0) {
    return (
      <div className="w-full aspect-video bg-night-800 rounded-xl flex items-center justify-center">
        <p className="text-white/30 text-sm tracking-widest uppercase">Sin contenido aún</p>
      </div>
    );
  }

  return (
    <div className="relative w-full group">
      {/* Embla viewport */}
      <div className="overflow-hidden rounded-xl" ref={emblaRef}>
        <div className="flex">
          {items.map((item, i) => (
            <div key={i} className="flex-[0_0_100%] min-w-0 relative aspect-video bg-night-800">
              {item.type === "image" ? (
                <Image
                  src={item.src}
                  alt={item.alt ?? `Slide ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 80vw"
                />
              ) : (
                <video
                  src={item.src}
                  poster={item.poster}
                  controls
                  playsInline
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Arrows */}
      {items.length > 1 && (
        <>
          <button
            onClick={scrollPrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-night-950/80 border border-white/10 flex items-center justify-center text-white/70 hover:text-gold hover:border-gold/50 transition-all duration-200 opacity-0 group-hover:opacity-100"
            aria-label="Anterior"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-night-950/80 border border-white/10 flex items-center justify-center text-white/70 hover:text-gold hover:border-gold/50 transition-all duration-200 opacity-0 group-hover:opacity-100"
            aria-label="Siguiente"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}

      {/* Dots */}
      {items.length > 1 && (
        <div className="flex justify-center gap-2 mt-5">
          {scrollSnaps.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === selectedIndex
                  ? "bg-gold w-6"
                  : "bg-white/25 w-1.5 hover:bg-white/50"
              }`}
              aria-label={`Ir a slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
