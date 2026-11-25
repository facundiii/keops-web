// El paso de la pirámide a DOT en la home del aniversario.
//
// La portada es la introducción: un gesto hacia abajo (rueda, trackpad, dedo o teclado) lleva a DOT
// de una vez, en una sola animación, y el enjambre se arma en el camino. Desde el comienzo de DOT,
// un gesto hacia arriba vuelve a la portada. Entre las dos no se queda a mitad de camino: si el
// scroll termina en el medio (una barra de scroll, la inercia de un dedo), sigue hasta la que corresponde.
//
// No se usa con "reducir movimiento" (lo decide quien lo llama) ni cuando la portada es más alta
// que la pantalla, como en un celular acostado: ahí hace falta bajar para leerla entera.

/** Cuánto hay que mover la rueda o el dedo para que cuente como intención de pasar */
const UMBRAL_RUEDA = 24;
const UMBRAL_DEDO = 28;
/** Margen para considerar que el scroll está justo arriba de todo o justo al comienzo de DOT */
const BORDE = 2;

/** Arranca con decisión y aterriza suave */
const curva = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

export function iniciarPasoNoche(
  portada: HTMLElement,
  destino: HTMLElement,
  opciones: { enlace?: HTMLAnchorElement | null; alLlegar?: HTMLElement | null } = {}
): () => void {
  let animando = false, raf = 0;
  // Después de llegar, la inercia del trackpad sigue mandando ruedas: se ignoran un momento
  let calma = 0, calmaTope = 0;
  let acumulado = 0, ultimaRueda = 0;
  let toque: { y: number; decidido: boolean } | null = null;
  let ultimoScroll = window.scrollY, direccion = 0;
  let espera = 0;

  const activo = () =>
    portada.getClientRects().length > 0 &&
    portada.offsetHeight <= window.innerHeight + 40 &&
    document.body.style.overflow !== "hidden";
  const inicioDot = () => destino.getBoundingClientRect().top + window.scrollY;

  /** A dónde va un gesto, o null si este scroll no le toca al paso (ya está en DOT, o arriba de todo y sube) */
  const destinoDelGesto = (bajando: boolean): number | null => {
    const y = window.scrollY, D = inicioDot();
    const enElTramo = y < D - BORDE || (Math.abs(y - D) <= BORDE && !bajando);
    if (!enElTramo || (!bajando && y <= BORDE)) return null;
    return bajando ? D : 0;
  };

  const ir = (hasta: number, enfocar = false) => {
    cancelAnimationFrame(raf);
    const desde = window.scrollY, distancia = hasta - desde;
    if (Math.abs(distancia) < 1) return;
    animando = true;
    const dura = Math.min(1200, 600 + Math.abs(distancia) * 0.6);
    const t0 = performance.now();
    const paso = (now: number) => {
      const x = Math.min(1, (now - t0) / dura);
      window.scrollTo({ top: desde + distancia * curva(x), behavior: "instant" });
      if (x < 1) {
        raf = requestAnimationFrame(paso);
        return;
      }
      animando = false;
      calma = now + 450;
      calmaTope = now + 1200;
      if (enfocar) opciones.alLlegar?.focus({ preventScroll: true });
    };
    raf = requestAnimationFrame(paso);
  };

  const alRodar = (e: WheelEvent) => {
    if (e.ctrlKey || !activo() || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
    const ahora = performance.now();
    if (animando || ahora < calma) {
      e.preventDefault();
      if (!animando) calma = Math.min(calmaTope, ahora + 160);
      return;
    }
    const dy = e.deltaY * (e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? window.innerHeight : 1);
    const hasta = destinoDelGesto(dy > 0);
    if (hasta === null) return;
    e.preventDefault();
    if (ahora - ultimaRueda > 250 || Math.sign(dy) !== Math.sign(acumulado)) acumulado = 0;
    ultimaRueda = ahora;
    acumulado += dy;
    if (Math.abs(acumulado) >= UMBRAL_RUEDA) {
      acumulado = 0;
      ir(hasta);
    }
  };

  const alTocar = (e: TouchEvent) => {
    toque = e.touches.length === 1 ? { y: e.touches[0].clientY, decidido: false } : null;
  };
  const alMoverDedo = (e: TouchEvent) => {
    if (!toque || e.touches.length !== 1 || !activo()) return;
    if (animando) {
      if (e.cancelable) e.preventDefault();
      return;
    }
    const dy = toque.y - e.touches[0].clientY; // positivo: el dedo sube y la página baja
    const hasta = destinoDelGesto(dy > 0);
    if (hasta === null) return;
    if (e.cancelable) e.preventDefault();
    if (!toque.decidido && Math.abs(dy) >= UMBRAL_DEDO) {
      toque.decidido = true;
      ir(hasta);
    }
  };
  const alSoltar = () => {
    toque = null;
  };

  const alTeclear = (e: KeyboardEvent) => {
    if (e.altKey || e.ctrlKey || e.metaKey || !activo()) return;
    if ((e.target as HTMLElement | null)?.closest?.("input, textarea, select, button, [contenteditable], dialog")) return;
    let bajando: boolean;
    if (e.key === " ") bajando = !e.shiftKey;
    else if (e.key === "ArrowDown" || e.key === "PageDown") bajando = true;
    else if (e.key === "ArrowUp" || e.key === "PageUp") bajando = false;
    else return;
    if (animando) {
      e.preventDefault();
      return;
    }
    const hasta = destinoDelGesto(bajando);
    if (hasta === null) return;
    e.preventDefault();
    ir(hasta);
  };

  // "Lo que hay esa noche" hace el mismo paso. Con teclado, el foco sigue a DOT.
  const alElegirEnlace = (e: MouseEvent) => {
    if (!activo()) return;
    e.preventDefault();
    ir(inicioDot(), e.detail === 0);
  };

  // Si el scroll queda entre la portada y DOT, termina el paso hacia donde iba
  const alTerminar = () => {
    if (animando || toque || !activo()) return;
    const y = window.scrollY, D = inicioDot();
    if (y <= BORDE || y >= D - BORDE) return;
    ir(direccion < 0 ? 0 : direccion > 0 ? D : y < D / 2 ? 0 : D);
  };
  const conScrollend = "onscrollend" in window;
  const alDesplazar = () => {
    const y = window.scrollY;
    if (y !== ultimoScroll) direccion = Math.sign(y - ultimoScroll);
    ultimoScroll = y;
    if (!conScrollend) {
      window.clearTimeout(espera);
      espera = window.setTimeout(alTerminar, 150);
    }
  };

  // La rueda y el dedo se escuchan solo sobre la portada y DOT, así el resto de la home scrollea sin esperar
  const zonas = [portada, destino];
  for (const z of zonas) {
    z.addEventListener("wheel", alRodar, { passive: false });
    z.addEventListener("touchstart", alTocar, { passive: true });
    z.addEventListener("touchmove", alMoverDedo, { passive: false });
    z.addEventListener("touchend", alSoltar);
    z.addEventListener("touchcancel", alSoltar);
  }
  window.addEventListener("keydown", alTeclear);
  window.addEventListener("scroll", alDesplazar, { passive: true });
  if (conScrollend) window.addEventListener("scrollend", alTerminar);
  opciones.enlace?.addEventListener("click", alElegirEnlace);

  return () => {
    cancelAnimationFrame(raf);
    window.clearTimeout(espera);
    for (const z of zonas) {
      z.removeEventListener("wheel", alRodar);
      z.removeEventListener("touchstart", alTocar);
      z.removeEventListener("touchmove", alMoverDedo);
      z.removeEventListener("touchend", alSoltar);
      z.removeEventListener("touchcancel", alSoltar);
    }
    window.removeEventListener("keydown", alTeclear);
    window.removeEventListener("scroll", alDesplazar);
    window.removeEventListener("scrollend", alTerminar);
    opciones.enlace?.removeEventListener("click", alElegirEnlace);
  };
}
