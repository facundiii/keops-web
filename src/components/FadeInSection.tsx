"use client";

import { useEffect, useRef } from "react";

interface FadeInSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Aparición suave al entrar en pantalla: fundido + subida de 16 px, 500 ms (estilos en globals.css).
 *
 * El contenido sale visible del servidor: sin JavaScript, o si el JavaScript falla, se lee igual.
 * Al cargar se esconde solo lo que todavía está debajo de la pantalla, y aparece al llegar.
 * Con prefers-reduced-motion no se esconde nada.
 */
export function FadeInSection({ children, className = "", delay = 0 }: FadeInSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Lo que ya está a la vista (o más arriba) no se toca: así no parpadea al cargar
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    el.dataset.aparece = "espera";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.aparece = "visto";
          observer.disconnect();
        }
      },
      // Aparece cuando asoma un poco por abajo, sea del alto que sea
      { rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      delete el.dataset.aparece;
    };
  }, []);

  return (
    <div ref={ref} className={`aparece ${className}`.trim()} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </div>
  );
}
