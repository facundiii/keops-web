"use client";

import { useEffect, useRef } from "react";

const INTERACTIVOS = "a, button, [role='button'], label, summary";
/** Donde manda el cursor del sistema: en un campo se escribe, y un mapa incrustado trae el suyo */
const DEL_SISTEMA = "input, textarea, select, iframe";

/**
 * Cursor propio (solo con mouse): un punto que sigue al puntero y un anillo que lo alcanza con inercia
 * y se agranda sobre lo que se puede tocar. El anillo se anima solo mientras se mueve: con el mouse
 * quieto no gasta nada. Dentro del visor (<dialog>) se usa el cursor del sistema (globals.css).
 *
 * El cursor del sistema se oculta recién cuando este componente arranca (clase `cursor-propio` en <html>):
 * sin JavaScript, o si falla, queda el cursor de siempre. No se dibuja hasta el primer movimiento,
 * se esconde al salir de la ventana y le deja el lugar al del sistema en campos y mapas.
 */
export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    const raiz = document.documentElement;
    raiz.classList.add("cursor-propio");

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let raf = 0;
    /** Todavía no entró a la ventana, o salió */
    let afuera = true;
    let delSistema = false;

    const mostrar = () => {
      const si = !afuera && !delSistema;
      ring.classList.toggle("is-visible", si);
      dot.classList.toggle("is-visible", si);
    };

    // Se mueve con `translate`, que no recalcula el diseño de la página (antes: left y top)
    const animate = () => {
      ringX += (mouseX - ringX) * 0.1;
      ringY += (mouseY - ringY) * 0.1;
      ring.style.translate = `${ringX}px ${ringY}px`;
      // Cuando el anillo alcanza al punto, el bucle se frena hasta el próximo movimiento
      raf = Math.abs(mouseX - ringX) + Math.abs(mouseY - ringY) > 0.3 ? requestAnimationFrame(animate) : 0;
    };

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (afuera) {
        // Entra donde está el puntero, sin cruzar la pantalla desde la esquina
        afuera = false;
        ringX = mouseX;
        ringY = mouseY;
        ring.style.translate = `${ringX}px ${ringY}px`;
        mostrar();
      }
      dot.style.translate = `${mouseX}px ${mouseY}px`;
      if (!raf) raf = requestAnimationFrame(animate);
    };

    // Una sola escucha en el documento, en lugar de una por cada link o botón
    const onOver = (e: MouseEvent) => {
      const sobre = e.target as Element | null;
      delSistema = Boolean(sobre?.closest?.(DEL_SISTEMA));
      ring.classList.toggle("is-hovering", !delSistema && Boolean(sobre?.closest?.(INTERACTIVOS)));
      mostrar();
    };
    const onLeave = () => {
      afuera = true;
      mostrar();
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    raiz.addEventListener("mouseleave", onLeave);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      raiz.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
      raiz.classList.remove("cursor-propio");
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="custom-cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="custom-cursor-dot" aria-hidden="true" />
    </>
  );
}
