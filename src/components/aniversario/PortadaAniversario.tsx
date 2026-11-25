"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { aniversario } from "@/config/aniversario";
import { iniciarPiramide, type Piramide } from "@/lib/piramideEncendida";
import { claseBoton } from "@/components/ui/Boton";
import { Contador } from "@/components/aniversario/Contador";

/** El "57 años" del flyer: el 5 es una barra y un arco abierto; "AÑOS" va al lado de la barra. */
function Cincuenta({ etiqueta }: { etiqueta: string }) {
  return (
    <svg className="aniv-57 mt-1 lg:mt-3 text-marfil" viewBox="0 0 220 136" role="img" aria-label={etiqueta}>
      <rect className="aniv-pieza aniv-barra" x="4" y="6" width="66" height="17" fill="currentColor" />
      <text
        className="aniv-anos"
        x="80"
        y="22"
        fontSize="18"
        fontWeight="600"
        letterSpacing="1.4"
        fill="currentColor"
        style={{ fontFamily: "var(--font-inter), sans-serif" }}
      >
        AÑOS
      </text>
      <path
        className="aniv-pieza aniv-arco"
        d="M 14 70 A 40 40 0 1 1 26 122"
        fill="none"
        stroke="currentColor"
        strokeWidth="18"
      />
      <path className="aniv-pieza aniv-siete" d="M 104 32 H 198 L 150 134 H 126 L 168 51 H 104 Z" fill="currentColor" />
    </svg>
  );
}

/**
 * Segundos que faltan para que el logo aterrice: la pirámide estalla en ese momento.
 * Si el logo ya entró (la página tardó en cargar), estalla apenas se enciende.
 */
function hastaQueAterrice(logo: HTMLElement | null): number {
  const animacion = logo?.getAnimations?.()[0];
  const actual = animacion?.currentTime;
  if (!animacion || animacion.playState !== "running" || typeof actual !== "number") return 0;
  const retraso = Number(animacion.effect?.getTiming().delay ?? 0);
  return Math.max(0, (retraso + 300 - actual) / 1000);
}

/**
 * Primera vista de la home durante el aniversario. Sin botones: la fecha, la pirámide
 * que estalla con magma adentro, "Aniversario Keops 57 años" y la cuenta regresiva.
 * La compra está en la banda que sigue.
 */
export function PortadaAniversario() {
  const lienzo = useRef<HTMLCanvasElement>(null);
  const fecha = useRef<HTMLParagraphElement>(null);
  const titulo = useRef<HTMLHeadingElement>(null);
  const marca = useRef<HTMLImageElement>(null);
  const piramide = useRef<Piramide | null>(null);
  const pausada = useRef(false);
  const [enPausa, setEnPausa] = useState(false);

  useEffect(() => {
    const canvas = lienzo.current;
    if (!canvas) return;
    // Como en el reel, la pirámide va pegada a la cámara: la punta llega a la fecha y la de abajo
    // queda detrás de "Aniversario". En pantallas anchas baja hasta el medio del logo y el mar, más abajo.
    const medir = () => {
      const f = fecha.current;
      const m = marca.current;
      const alto = canvas.clientHeight;
      if (!f || !m || !m.offsetHeight) return { techo: alto * 0.1, piso: alto * 0.58, horizonte: alto * 0.64 };
      const fechaMedio = f.offsetTop + f.offsetHeight / 2;
      if (canvas.clientWidth < 768) {
        return { techo: fechaMedio - alto * 0.06, piso: m.offsetTop, horizonte: m.offsetTop + m.offsetHeight / 2 };
      }
      // En pantallas anchas la punta se sale por arriba, como cuando la cámara se acerca en el reel
      return { techo: fechaMedio - alto * 0.22, piso: m.offsetTop + m.offsetHeight / 2, horizonte: m.offsetTop + m.offsetHeight };
    };
    // Con "reducir movimiento" la pirámide no estalla ni se acerca: queda partida y encendida, y gira lento.
    // Si la preferencia cambia con la página abierta, se vuelve a armar.
    const consulta = window.matchMedia("(prefers-reduced-motion: reduce)");
    const armar = () => {
      const p = iniciarPiramide(canvas, { medir, suave: consulta.matches, explosion: hastaQueAterrice(marca.current) });
      p.pausar(pausada.current);
      return p;
    };
    let p = armar();
    piramide.current = p;
    const alCambiarPreferencia = () => {
      p.destruir();
      p = armar();
      piramide.current = p;
    };
    consulta.addEventListener("change", alCambiarPreferencia);
    // Las fuentes y el logo cambian dónde queda el texto: se vuelve a medir
    const observador = new ResizeObserver(() => p.remedir());
    observador.observe(canvas);
    if (fecha.current) observador.observe(fecha.current);
    if (titulo.current) observador.observe(titulo.current);
    return () => {
      consulta.removeEventListener("change", alCambiarPreferencia);
      observador.disconnect();
      p.destruir();
      piramide.current = null;
    };
  }, []);

  useEffect(() => {
    pausada.current = enPausa;
    piramide.current?.pausar(enPausa);
  }, [enPausa]);

  return (
    <section aria-labelledby="titulo-aniversario" className="aniv-portada relative isolate overflow-hidden bg-cielo-noche">
      <canvas ref={lienzo} aria-hidden="true" className="absolute inset-0 -z-10 block h-full w-full" />

      <div className="aniv-capa absolute inset-0 flex flex-col items-center px-4 text-center">
        <p ref={fecha} className="aniv-fecha aniv-fecha-entra">
          {aniversario.fechaCorta}
        </p>
        <div className="flex-1" aria-hidden="true" />
        <h1 ref={titulo} id="titulo-aniversario" className="flex flex-col items-center">
          <span className="aniv-palabra aniv-separar">{aniversario.palabra}</span>
          <Image
            ref={marca}
            src="/logo.png"
            alt="Keops"
            width={1080}
            height={445}
            sizes="330px"
            preload
            className="aniv-marca aniv-aterriza mt-2 lg:mt-3"
          />
          <Cincuenta etiqueta={aniversario.anios} />
        </h1>
        <Contador />
      </div>

      {/* La pirámide es la introducción: abajo, una invitación sutil a ver el resto de la noche */}
      <a href="#dot" className="aniv-seguir">
        {aniversario.invitacion}
        <span aria-hidden="true" className="aniv-seguir-linea" />
      </a>

      {/* Solo aparece con el foco del teclado */}
      <button
        type="button"
        onClick={() => setEnPausa((v) => !v)}
        className={claseBoton("secundario", "aniv-pausa bg-negro/80")}
      >
        {enPausa ? (
          <Play size={20} strokeWidth={1.5} aria-hidden="true" />
        ) : (
          <Pause size={20} strokeWidth={1.5} aria-hidden="true" />
        )}
        {enPausa ? "Reanudar la animación" : "Pausar la animación"}
      </button>
    </section>
  );
}
