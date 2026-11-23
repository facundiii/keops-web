"use client";

import { ArrowDown } from "lucide-react";
import { Boton } from "@/components/ui/Boton";

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function smoothScrollTo(targetY: number, duration = 500) {
  // Sin animación para quien pidió menos movimiento
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.scrollTo(0, targetY);
    return;
  }

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
    <Boton variante="secundario" onClick={scrollToSections}>
      Conocé más
      <ArrowDown size={20} strokeWidth={1.5} />
    </Boton>
  );
}

export function HeroScrollIndicator() {
  return (
    <button
      onClick={scrollToSections}
      aria-label="Desplazarse hacia abajo"
      className="absolute bottom-8 left-1/2 -translate-x-1/2 text-arena hover:text-oro transition-colors duration-300 animate-bounce-slow"
    >
      <ArrowDown size={20} strokeWidth={1.5} />
    </button>
  );
}
