"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Clock, Calendar, ImageIcon } from "lucide-react";

export type UpcomingEvent = {
  id: string;
  name: string;
  artist: string;
  credits?: string[];
  date: string;
  time: string;
  flyer: string;
  flyerFit?: "cover" | "fill";
};

function FlyerImage({ src, name, fit = "cover" }: { src: string; name: string; fit?: "cover" | "fill" }) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-night-700 to-night-900 gap-3">
        <ImageIcon size={28} className="text-white/15" />
        <span className="text-white/20 text-xs tracking-widest uppercase">Flyer próximamente</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={`Flyer ${name}`}
      fill
      className={`${fit === "fill" ? "object-fill" : "object-cover"} transition-transform duration-500 group-hover:scale-105`}
      sizes="(max-width: 640px) 80vw, (max-width: 1024px) 45vw, 30vw"
      onError={() => setErrored(true)}
    />
  );
}

function scrollToTickets() {
  const el = document.getElementById("comprar-entrada");
  if (!el) return;
  const startY = window.scrollY;
  const targetY = el.getBoundingClientRect().top + startY - 80;
  const duration = 600;
  let startTime: number | null = null;
  const ease = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  const step = (ts: number) => {
    if (!startTime) startTime = ts;
    const p = Math.min((ts - startTime) / duration, 1);
    window.scrollTo(0, startY + (targetY - startY) * ease(p));
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

interface UpcomingEventsProps {
  events: UpcomingEvent[];
}

export function UpcomingEvents({ events }: UpcomingEventsProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [prevEnabled, setPrevEnabled] = useState(false);
  const [nextEnabled, setNextEnabled] = useState(true);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevEnabled(emblaApi.canScrollPrev());
    setNextEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  if (events.length === 0) {
    return (
      <div className="flex items-center justify-center py-16 px-8 rounded-2xl border border-white/5 bg-night-900">
        <p className="text-white/25 text-sm tracking-widest uppercase text-center">
          Próximas fechas en camino — seguinos en Instagram para enterarte primero
        </p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Arrows */}
      {events.length > 1 && (
        <>
          <button
            onClick={scrollPrev}
            disabled={!prevEnabled}
            className="absolute -left-4 md:-left-6 top-[40%] -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-night-800 border border-white/10 flex items-center justify-center text-white/85 hover:text-gold hover:border-gold/40 transition-all duration-200 disabled:opacity-20 disabled:cursor-not-allowed"
            aria-label="Anterior"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={scrollNext}
            disabled={!nextEnabled}
            className="absolute -right-4 md:-right-6 top-[40%] -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-night-800 border border-white/10 flex items-center justify-center text-white/85 hover:text-gold hover:border-gold/40 transition-all duration-200 disabled:opacity-20 disabled:cursor-not-allowed"
            aria-label="Siguiente"
          >
            <ChevronRight size={18} />
          </button>
        </>
      )}

      {/* Viewport */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="flex-[0_0_100%] sm:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)] min-w-0"
            >
              <div className="rounded-2xl overflow-hidden border border-white/5 bg-night-900 flex flex-col group hover:border-gold/20 transition-colors duration-300">
                {/* Flyer 9:16 */}
                <div className="relative w-full aspect-[9/16] bg-night-800 overflow-hidden">
                  <FlyerImage src={event.flyer} name={event.name} fit={event.flyerFit} />
                  {/* Gradient bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-night-900 to-transparent pointer-events-none" />
                </div>

                {/* Info */}
                <div className="p-5 flex flex-col gap-3 flex-1">
                  <div>
                    {event.credits ? (
                      <div className="flex flex-col gap-0.5 mb-1">
                        {event.credits.map((credit, i) => (
                          <p key={i} className="text-gold text-xs tracking-[0.2em] uppercase leading-tight">{credit}</p>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gold text-xs tracking-[0.25em] uppercase mb-1">{event.artist}</p>
                    )}
                    <h3 className="font-serif text-xl text-white leading-tight">{event.name}</h3>
                  </div>

                  <div className="flex flex-col gap-1.5 text-white/40 text-xs">
                    <span className="flex items-center gap-2">
                      <Calendar size={12} className="shrink-0" />
                      {event.date}
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock size={12} className="shrink-0" />
                      Apertura {event.time} hs
                    </span>
                  </div>

                  <button
                    onClick={scrollToTickets}
                    className="mt-auto w-full py-3 rounded-xl bg-gold/10 border border-gold/30 text-gold text-xs tracking-widest uppercase font-medium hover:bg-gold hover:text-night-950 transition-all duration-300 hover:scale-[1.02]"
                  >
                    Comprar Entrada
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      {events.length > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {scrollSnaps.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === selectedIndex ? "bg-gold w-5" : "bg-white/20 w-1 hover:bg-white/40"
              }`}
              aria-label={`Ir a evento ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
