"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { aniversario } from "@/config/aniversario";
import { iniciarEnjambre, PASOS_TEXTO, RECORRIDO_TOTAL, type Enjambre } from "@/lib/enjambreDot";

const entre01 = (x: number) => Math.max(0, Math.min(1, x));

/**
 * DOT, la electrónica de la noche del aniversario, en un sector dedicado. Sigue a la pirámide al bajar:
 * la escena queda fija mientras se recorre la sección, el enjambre pasa por las formaciones
 * del reel y el lineup entra en orden de salida. Sin JavaScript o con "reducir movimiento",
 * es una pantalla con todo el texto a la vista.
 */
export function DotAniversario() {
  const { dot } = aniversario;
  const seccion = useRef<HTMLElement>(null);
  const escena = useRef<HTMLDivElement>(null);
  const lienzo = useRef<HTMLCanvasElement>(null);
  const enjambre = useRef<Enjambre | null>(null);
  const pausada = useRef(false);
  const [enPausa, setEnPausa] = useState(false);

  useEffect(() => {
    const s = seccion.current;
    const e = escena.current;
    const canvas = lienzo.current;
    if (!s || !e || !canvas) return;

    // Pantallas anchas: la esfera a la derecha y el texto a la izquierda. Celular: todo centrado, como el reel.
    const medir = () => {
      const W = canvas.clientWidth, H = canvas.clientHeight;
      if (W >= 1024) {
        return { cx: W * 0.66, cy: H * 0.5, radio: Math.min(W * 0.1, H * 0.17), horizonte: H * 0.6, sol: W * 0.84, textoAlCostado: true };
      }
      return { cx: W / 2, cy: H * 0.42, radio: Math.min(W * 0.2, H * 0.095), horizonte: H * 0.6, sol: W * 0.14, textoAlCostado: false };
    };
    // 0 a 1 mientras asoma desde abajo; de 1 a 5 mientras queda fija y se recorre
    const leerRecorrido = () => {
      const r = s.getBoundingClientRect();
      const alto = window.innerHeight;
      const llegada = entre01((alto - r.top) / alto);
      const recorrido = entre01(-r.top / Math.max(1, r.height - alto));
      return llegada + recorrido * (RECORRIDO_TOTAL - 1);
    };
    // Cada parte del texto entra cuando el recorrido llega a su paso, y ya queda
    const pasos = PASOS_TEXTO.map((_, i) => Array.from(s.querySelectorAll<HTMLElement>(`[data-paso="${i}"]`)));
    const alAvanzar = (u: number) => {
      PASOS_TEXTO.forEach((umbral, i) => {
        if (u >= umbral) for (const el of pasos[i]) el.classList.add("visto");
      });
    };

    const consulta = window.matchMedia("(prefers-reduced-motion: reduce)");
    const armar = () => {
      // El recorrido largo y el texto de a partes, solo con movimiento
      s.classList.toggle("dot-guiado", !consulta.matches);
      const p = iniciarEnjambre(canvas, { medir, leerRecorrido, suave: consulta.matches, alAvanzar });
      p.pausar(pausada.current);
      return p;
    };
    let p = armar();
    enjambre.current = p;
    // La pausa se muestra recién cuando hay algo andando (sin JavaScript no hay nada que frenar)
    s.classList.add("dot-anda");
    const alCambiarPreferencia = () => {
      p.destruir();
      p = armar();
      enjambre.current = p;
    };
    consulta.addEventListener("change", alCambiarPreferencia);

    const alMover = (ev: PointerEvent) => {
      const r = e.getBoundingClientRect();
      p.puntero(ev.clientX - r.left, ev.clientY - r.top);
    };
    const alSalir = () => p.puntero(null);
    e.addEventListener("pointermove", alMover, { passive: true });
    e.addEventListener("pointerleave", alSalir);
    e.addEventListener("pointercancel", alSalir);

    const observador = new ResizeObserver(() => p.remedir());
    observador.observe(canvas);
    return () => {
      consulta.removeEventListener("change", alCambiarPreferencia);
      e.removeEventListener("pointermove", alMover);
      e.removeEventListener("pointerleave", alSalir);
      e.removeEventListener("pointercancel", alSalir);
      observador.disconnect();
      p.destruir();
      enjambre.current = null;
      s.classList.remove("dot-anda");
    };
  }, []);

  useEffect(() => {
    pausada.current = enPausa;
    enjambre.current?.pausar(enPausa);
  }, [enPausa]);

  // DOT abre a la misma hora que el resto de la noche
  const sector = dot.sector.trim();
  const hora = aniversario.hora.trim();
  const lugar = hora ? (sector ? `${sector}, desde las ${hora} h` : `Desde las ${hora} h`) : sector;

  return (
    <section id="dot" ref={seccion} aria-labelledby="titulo-dot" className="dot-recorrido relative bg-negro">
      <div ref={escena} className="dot-escena sticky top-0 overflow-hidden">
        <canvas ref={lienzo} aria-hidden="true" className="absolute inset-0 block h-full w-full" />

        {/* El texto va sobre la misma línea que el resto del sitio (el ancho de siempre) */}
        <div className="dot-capa absolute inset-0 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto flex h-full w-full max-w-6xl flex-col items-center text-center lg:items-start lg:justify-center lg:text-left">
            <div data-paso="0" className="dot-paso">
              {/* Recibe el foco cuando se llega con "Lo que hay esa noche" desde el teclado */}
              <h2 id="titulo-dot" tabIndex={-1} className="dot-marca outline-none">
                {dot.nombre}
              </h2>
              <p className="dot-fecha mt-2 lg:mt-3">{aniversario.fechaCorta}</p>
              <p className="dot-sub mt-1">{dot.subtitulo}</p>
            </div>

            <div className="flex-1 lg:hidden" aria-hidden="true" />

            {/* En orden de salida: la noche sube hasta quien la cierra, que entra último y en grande */}
            <ol className="flex flex-col items-center gap-2 lg:mt-12 lg:max-w-xl lg:items-start" aria-label="Lineup en orden de salida">
              {dot.lineup.map((fila) => (
                <li key={fila.join("-")} data-paso="1" className="dot-paso dot-linea">
                  {fila.map((nombre, i) => (
                    <Fragment key={nombre}>
                      {i > 0 && <span className="dot-b2b">b2b</span>}
                      {nombre}
                    </Fragment>
                  ))}
                </li>
              ))}
              <li data-paso="2" className="dot-paso dot-cabeza mt-2">
                {dot.cabeza}
              </li>
            </ol>

            <div data-paso="3" className="dot-paso mt-4 lg:mt-6 lg:max-w-md">
              {dot.bajada && <p className="texto-chico text-balance text-arena">{dot.bajada}</p>}
              {lugar && <p className="texto-chico mt-1 text-marfil">{lugar}</p>}
            </div>
          </div>
        </div>

        {/* La pausa, a la vista: DOT no es primera vista, y lo que se mueve solo se tiene que poder frenar
            también con el mouse o con el dedo. Abajo a la izquierda, sobre la línea del texto;
            la esquina derecha es del WhatsApp flotante. Aparece cuando la animación está andando. */}
        <div className="dot-pausa pointer-events-none absolute inset-x-0 bottom-4 px-4 sm:px-6 lg:bottom-8 lg:px-8">
          <div className="mx-auto w-full max-w-6xl">
            <button
              type="button"
              onClick={() => setEnPausa((v) => !v)}
              aria-label={enPausa ? "Reanudar la animación" : "Pausar la animación"}
              className="pointer-events-auto flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-piedra bg-negro/70 text-marfil transition-colors duration-300 hover:border-oro hover:text-oro"
            >
              {enPausa ? <Play size={20} strokeWidth={1.5} aria-hidden="true" /> : <Pause size={20} strokeWidth={1.5} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
