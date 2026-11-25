// El bucle de las animaciones en canvas del aniversario (la pirámide y DOT).
//
// - A 60 cuadros por segundo como máximo: en pantallas de 90, 120 o 144 Hz se ve igual y gasta la mitad.
// - Solo mientras el lienzo se ve de verdad: pegado al borde de la pantalla no cuenta.
// - Se frena con la pestaña oculta y con la pausa.
// - Mide cuánto tarda cada cuadro: si el equipo no llega, avisa una vez para que la escena se aligere.

export interface Bucle {
  /** Segundos de animación transcurridos */
  tiempo: () => number;
  pausar: (pausa: boolean) => void;
  destruir: () => void;
}

const INTERVALO = 1000 / 60;
/** Si dibujar un cuadro lleva más que esto de forma sostenida, el equipo no llega con holgura */
const PRESUPUESTO_MS = 7;

export function bucleVisible(
  canvas: HTMLCanvasElement,
  cuadro: (t: number) => void,
  opciones: { inicio?: number; alAtrasarse?: () => void } = {}
): Bucle {
  let corriendo = false, visible = false, enPausa = false, raf = 0;
  let tiempo = opciones.inicio ?? 0;
  let ritmo = 0, previo = 0;
  let costo = 0, medidos = 0, avisado = !opciones.alAtrasarse;

  const loop = (now: number) => {
    raf = requestAnimationFrame(loop);
    // En pantallas de más de 60 Hz se salta cuadros, siguiendo un reloj de 60 por segundo
    if (now - ritmo < INTERVALO - 2) return;
    ritmo = now - ritmo > INTERVALO * 2 ? now : ritmo + INTERVALO;
    tiempo += Math.min(0.05, (now - previo) / 1000);
    previo = now;

    const antes = performance.now();
    cuadro(tiempo);
    if (!avisado) {
      costo += (performance.now() - antes - costo) * 0.05;
      if (++medidos > 90 && costo > PRESUPUESTO_MS) {
        avisado = true;
        opciones.alAtrasarse?.();
      }
    }
  };
  const arrancar = () => {
    if (corriendo || !visible || document.hidden || enPausa) return;
    corriendo = true;
    ritmo = previo = performance.now();
    raf = requestAnimationFrame(loop);
  };
  const parar = () => {
    corriendo = false;
    cancelAnimationFrame(raf);
  };

  // El margen de -1 px hace que un lienzo pegado al borde, sin ningún pixel a la vista, no cuente como visible
  const observador = new IntersectionObserver(
    ([e]) => {
      visible = e.isIntersecting;
      if (visible) arrancar();
      else parar();
    },
    { rootMargin: "-1px" }
  );
  observador.observe(canvas);
  const alCambiarPestana = () => (document.hidden ? parar() : arrancar());
  document.addEventListener("visibilitychange", alCambiarPestana);

  return {
    tiempo: () => tiempo,
    pausar(pausa) {
      enPausa = pausa;
      if (pausa) parar();
      else arrancar();
    },
    destruir() {
      parar();
      observador.disconnect();
      document.removeEventListener("visibilitychange", alCambiarPestana);
    },
  };
}
