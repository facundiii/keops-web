"use client";

import { ArrowDown } from "lucide-react";

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function smoothScrollTo(targetY: number, duration = 500) {
  const startY = window.scrollY;
  const distance = targetY - startY;
  let startTime: number | null = null;

  function step(timestamp: number) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, startY + distance * easeInOutCubic(progress));
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

function scrollToSections() {
  const el = document.getElementById("sections");
  if (el) smoothScrollTo(el.getBoundingClientRect().top + window.scrollY);
}

export function HeroCTAButton() {
  return (
    <button
      onClick={scrollToSections}
      className="group flex items-center gap-2 border border-gold/40 text-gold hover:bg-gold hover:text-night-950 px-8 py-3.5 rounded-full text-sm tracking-widest uppercase transition-all duration-300 hover:scale-105 cursor-pointer"
    >
      Conocé más
      <ArrowDown
        size={14}
        className="group-hover:translate-y-0.5 transition-transform duration-300"
      />
    </button>
  );
}

export function HeroScrollIndicator() {
  return (
    <button
      onClick={scrollToSections}
      aria-label="Desplazarse hacia abajo"
      className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 hover:text-gold transition-colors duration-300 animate-bounce-slow cursor-pointer"
    >
      <ArrowDown size={18} />
    </button>
  );
}
