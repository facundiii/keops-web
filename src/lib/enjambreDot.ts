// DOT: la esfera de cristal y el enjambre de burbujas cromadas del flyer de @dotbykeops,
// en canvas 2D y sin librerías.
//
// El mismo atardecer sobre el mar que la pirámide, más claro. La esfera muestra el horizonte
// dado vuelta, como una bola de vidrio. Las burbujas son espejos: una esfera espejada se ve igual
// desde cualquier ángulo, así que cada una es la misma imagen del cielo, armada una sola vez.
// Al bajar por la sección, el enjambre recorre las formaciones del reel (anillo, columna, disco,
// estela); late apenas a tempo de house y se aparta del puntero.
// Se frena fuera de pantalla y con la pestaña oculta.
// Con "reducir movimiento" queda en el anillo, girando lento, sin latir ni seguir el scroll.

import { bucleVisible } from "@/lib/bucleLienzo";

type V3 = [number, number, number];

interface Burbuja {
  /** Posición en cada formación, en radios de la esfera */
  formas: V3[];
  tam: number;
  /** Cuánto tarda en sumarse a cada cambio de formación (0 a 1): el enjambre se mueve en bandada */
  retraso: number;
  fase: number;
  /** Cuánto la corre el puntero, en px */
  empuje: [number, number];
}

export interface MedidasDot {
  /** Centro de la esfera (px) */
  cx: number;
  cy: number;
  /** Radio de la esfera (px) */
  radio: number;
  horizonte: number;
  /** Dónde está el sol sobre el horizonte (px desde la izquierda) */
  sol: number;
  /** En pantallas anchas el texto va a la izquierda: el cielo se oscurece de ese lado */
  textoAlCostado: boolean;
}

export interface Enjambre {
  puntero: (x: number | null, y?: number) => void;
  pausar: (pausa: boolean) => void;
  remedir: () => void;
  destruir: () => void;
}

/** Formaciones, en el orden del reel */
const DISPERSA = 0, ANILLO = 1, COLUMNA = 2, DISCO = 3, ESTELA = 4;

/**
 * El recorrido de la sección va de 0 (asoma desde abajo) a 1 (queda fija arriba) y de ahí a 5 (termina).
 * Cada parada: [recorrido, formación].
 */
const PARADAS: [number, number][] = [
  [0, DISPERSA],
  [1, ANILLO],
  [1.6, ANILLO],
  [2.4, COLUMNA],
  [3.2, DISCO],
  [4.2, ESTELA],
  [5, ANILLO],
];
/** Desde qué punto del recorrido aparece cada parte del texto */
export const PASOS_TEXTO = [0.75, 1.9, 2.7, 3.6];
export const RECORRIDO_TOTAL = 5;

const entre01 = (x: number) => Math.max(0, Math.min(1, x));
const suave = (x: number) => x * x * (3 - 2 * x);
const mezcla = (a: V3, b: V3, t: number): V3 => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];

function crearAzar(semilla: number) {
  let s = semilla;
  return () => {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function girarY([x, y, z]: V3, a: number): V3 {
  const c = Math.cos(a), s = Math.sin(a);
  return [x * c + z * s, y, -x * s + z * c];
}
function girarZ([x, y, z]: V3, a: number): V3 {
  const c = Math.cos(a), s = Math.sin(a);
  return [x * c - y * s, x * s + y * c, z];
}
function girarX([x, y, z]: V3, a: number): V3 {
  const c = Math.cos(a), s = Math.sin(a);
  return [x, y * c - z * s, y * s + z * c];
}

function armarBurbujas(cantidad: number): Burbuja[] {
  const azar = crearAzar(1212);
  const entre = (a: number, b: number) => a + (b - a) * azar();
  const campana = () => (azar() + azar() + azar() - 1.5) / 1.5;
  const lista: Burbuja[] = [];
  for (let i = 0; i < cantidad; i++) {
    // El halo del reel: un anillo grueso de frente, alrededor de la esfera
    const a = entre(0, Math.PI * 2);
    const r = 1.35 + 0.6 * Math.pow(azar(), 0.8);
    // El disco: un anillo plano y ancho, como el de Saturno
    const d = entre(0, Math.PI * 2);
    const rd = 1.35 + 1.5 * Math.sqrt(azar());
    // La estela: de abajo a la izquierda hacia arriba a la derecha, más abierta en la cola
    const s = azar();
    const abre = 0.12 + 0.5 * (1 - s);
    lista.push({
      formas: [
        [entre(-4.5, 4.5), entre(-5, 5), entre(-1.5, 3)],
        [Math.cos(a) * r, Math.sin(a) * r, entre(-0.45, 0.45)],
        [campana() * 0.32, entre(-1.9, 2.1), campana() * 0.32],
        [Math.cos(d) * rd, entre(-0.1, 0.1), Math.sin(d) * rd],
        [-2.8 + 5.6 * s + campana() * abre, 2.3 - 4.6 * s + 0.5 * Math.sin(s * Math.PI) + campana() * abre, campana() * abre],
      ],
      // Muchas chicas y unas pocas grandes
      tam: 0.06 + 0.2 * Math.pow(azar(), 2.6),
      retraso: azar(),
      fase: entre(0, Math.PI * 2),
      empuje: [0, 0],
    });
  }
  return lista;
}

/** Cada formación gira a su manera: el anillo sobre sí mismo, la columna y el disco alrededor del eje. */
function girarFormacion(p: V3, forma: number, t: number): V3 {
  if (forma === DISPERSA) return girarY(p, t * 0.05);
  if (forma === ANILLO) return girarZ(p, t * 0.12);
  if (forma === COLUMNA) return girarY(p, t * 0.4);
  if (forma === DISCO) return girarY(p, t * 0.25);
  return girarZ(p, 0.08 * Math.sin(t * 0.3));
}

/**
 * Una burbuja de vidrio, como las del flyer: transparente, con el atardecer dado vuelta adentro
 * (el mar oscuro arriba, el sol al medio y el cielo claro abajo), un anillo más oscuro cerca del
 * borde, el borde claro y un brillo.
 */
function armarReflejo(): HTMLCanvasElement {
  const S = 128;
  const c = document.createElement("canvas");
  c.width = c.height = S;
  const x = c.getContext("2d");
  if (!x) return c;
  x.beginPath();
  x.arc(S / 2, S / 2, S / 2 - 1, 0, Math.PI * 2);
  x.clip();
  const g = x.createLinearGradient(0, 0, 0, S);
  g.addColorStop(0, "rgba(34,40,58,0.6)");
  g.addColorStop(0.32, "rgba(96,92,100,0.42)");
  g.addColorStop(0.47, "rgba(232,190,140,0.72)");
  g.addColorStop(0.56, "rgba(214,196,176,0.5)");
  g.addColorStop(0.8, "rgba(176,190,212,0.45)");
  g.addColorStop(1, "rgba(206,216,234,0.6)");
  x.fillStyle = g;
  x.fillRect(0, 0, S, S);
  // El sol refractado, corrido hacia un costado
  const sol = x.createRadialGradient(S * 0.32, S * 0.46, 0, S * 0.32, S * 0.46, S * 0.2);
  sol.addColorStop(0, "rgba(255,236,196,0.9)");
  sol.addColorStop(1, "rgba(255,226,170,0)");
  x.fillStyle = sol;
  x.fillRect(0, 0, S, S);
  // Lente: un anillo apenas más oscuro adentro del borde, y el borde que toma la luz
  const lente = x.createRadialGradient(S / 2, S / 2, S * 0.28, S / 2, S / 2, S / 2);
  lente.addColorStop(0, "rgba(16,18,26,0)");
  lente.addColorStop(0.8, "rgba(16,18,26,0.28)");
  lente.addColorStop(0.93, "rgba(16,18,26,0.12)");
  lente.addColorStop(1, "rgba(236,242,252,0.7)");
  x.fillStyle = lente;
  x.fillRect(0, 0, S, S);
  const brillo = x.createRadialGradient(S * 0.6, S * 0.27, 0, S * 0.6, S * 0.27, S * 0.07);
  brillo.addColorStop(0, "rgba(255,255,255,1)");
  brillo.addColorStop(1, "rgba(255,255,255,0)");
  x.fillStyle = brillo;
  x.fillRect(0, 0, S, S);
  x.strokeStyle = "rgba(255,255,255,0.45)";
  x.lineWidth = 1.5;
  x.stroke();
  return c;
}

export function iniciarEnjambre(
  canvas: HTMLCanvasElement,
  opciones: {
    medir: () => MedidasDot;
    /** El recorrido de la sección en este momento, de 0 a RECORRIDO_TOTAL */
    leerRecorrido: () => number;
    suave: boolean;
    alAvanzar?: (recorrido: number) => void;
  }
): Enjambre {
  const ctx = canvas.getContext("2d");
  // El cielo y el mar limpios (los ve la esfera) y el fondo de la escena, con la penumbra del texto encima
  const limpio = document.createElement("canvas");
  const lctx = limpio.getContext("2d");
  const fondo = document.createElement("canvas");
  const fctx = fondo.getContext("2d");
  const nada = { puntero: () => {}, pausar: () => {}, remedir: () => {}, destruir: () => {} };
  if (!ctx || !fctx || !lctx) return nada;

  const { suave: modoSuave } = opciones;
  const reflejo = armarReflejo();
  let burbujas: Burbuja[] = [];
  let W = 0, H = 0, DPR = 1;
  let m: MedidasDot = { cx: 0, cy: 0, radio: 0, horizonte: 0, sol: 0, textoAlCostado: false };
  const brillos: { x: number; y: number; l: number; f: number; v: number }[] = [];

  function pintarFondo() {
    if (!lctx || !fctx) return;
    pintarCielo(lctx);
    fctx.clearRect(0, 0, W, H);
    fctx.drawImage(limpio, 0, 0, W, H);
    // Arriba sale del negro de la portada; en pantallas anchas, el lado del texto queda en penumbra
    const arriba = fctx.createLinearGradient(0, 0, 0, H * 0.16);
    arriba.addColorStop(0, "rgba(10,10,10,1)");
    arriba.addColorStop(1, "rgba(10,10,10,0)");
    fctx.fillStyle = arriba;
    fctx.fillRect(0, 0, W, H * 0.16);
    if (m.textoAlCostado) {
      const lado = fctx.createLinearGradient(0, 0, W * 0.55, 0);
      lado.addColorStop(0, "rgba(10,10,10,0.55)");
      lado.addColorStop(1, "rgba(10,10,10,0)");
      fctx.fillStyle = lado;
      fctx.fillRect(0, 0, W * 0.55, H);
    }
  }

  function pintarCielo(fctx: CanvasRenderingContext2D) {
    const { horizonte, sol } = m;
    // Cielo de la tarde, más claro que el de la pirámide
    const g = fctx.createLinearGradient(0, 0, 0, horizonte);
    g.addColorStop(0, "#0a0f22");
    g.addColorStop(0.3, "#172a50");
    g.addColorStop(0.62, "#35507a");
    g.addColorStop(0.88, "#5d6f8c");
    g.addColorStop(1, "#8a8896");
    fctx.fillStyle = g;
    fctx.fillRect(0, 0, W, horizonte);
    // Nubes largas y suaves
    const nube = crearAzar(77);
    for (let i = 0; i < 14; i++) {
      const y = horizonte * (0.25 + nube() * 0.65);
      const x = nube() * W;
      const w = W * (0.2 + nube() * 0.45);
      const h = 10 + nube() * 30;
      const clara = y < horizonte * 0.7;
      fctx.save();
      fctx.translate(x, y);
      fctx.scale(w / 2, h / 2);
      const c = fctx.createRadialGradient(0, 0, 0, 0, 0, 1);
      c.addColorStop(0, clara ? `rgba(205,215,232,${0.1 + nube() * 0.16})` : `rgba(38,46,66,${0.25 + nube() * 0.2})`);
      c.addColorStop(1, "rgba(205,215,232,0)");
      fctx.fillStyle = c;
      fctx.beginPath();
      fctx.arc(0, 0, 1, 0, Math.PI * 2);
      fctx.fill();
      fctx.restore();
    }
    // El sol, apoyado en el horizonte
    const s = fctx.createRadialGradient(sol, horizonte, 0, sol, horizonte, W * 0.6);
    s.addColorStop(0, "rgba(255,214,150,0.85)");
    s.addColorStop(0.12, "rgba(255,170,95,0.45)");
    s.addColorStop(0.45, "rgba(255,140,80,0.12)");
    s.addColorStop(1, "rgba(255,140,80,0)");
    fctx.fillStyle = s;
    fctx.fillRect(0, 0, W, horizonte);
    // Mar
    const mar = fctx.createLinearGradient(0, horizonte, 0, H);
    mar.addColorStop(0, "#3b4658");
    mar.addColorStop(0.15, "#232b38");
    mar.addColorStop(0.5, "#141820");
    mar.addColorStop(1, "#0a0a0a");
    fctx.fillStyle = mar;
    fctx.fillRect(0, horizonte, W, H - horizonte);
    // El reflejo del sol en el agua
    const alto = H - horizonte;
    fctx.save();
    fctx.translate(sol, horizonte);
    fctx.scale(Math.min(1, (W * 0.14) / alto), 1);
    const col = fctx.createRadialGradient(0, 0, 0, 0, 0, alto);
    col.addColorStop(0, "rgba(255,205,140,0.6)");
    col.addColorStop(0.4, "rgba(255,170,100,0.15)");
    col.addColorStop(1, "rgba(255,170,100,0)");
    fctx.fillStyle = col;
    fctx.fillRect(-alto, 0, alto * 2, alto);
    fctx.restore();
    fctx.fillStyle = "rgba(255,230,190,0.45)";
    fctx.fillRect(0, horizonte, W, 1);
  }

  function medir() {
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = canvas.clientWidth;
    H = canvas.clientHeight;
    if (!W || !H) return;
    for (const c of [canvas, fondo, limpio]) {
      c.width = Math.round(W * DPR);
      c.height = Math.round(H * DPR);
    }
    for (const c of [ctx, fctx, lctx]) c?.setTransform(DPR, 0, 0, DPR, 0, 0);
    m = opciones.medir();
    if (!burbujas.length) burbujas = armarBurbujas(W < 768 ? 130 : 190);
    pintarFondo();
    armarInterior();
    brillos.length = 0;
    const b = crearAzar(1969);
    for (let i = 0; i < 90; i++) {
      const prof = Math.pow(b(), 1.5);
      brillos.push({ x: (b() - 0.5) * (30 + prof * W * 0.3), y: prof * (H - m.horizonte), l: 4 + b() * (12 + prof * 40), f: b() * 6.28, v: 1 + b() * 3 });
    }
  }

  // Lo que se ve adentro de la esfera, armado una vez por tamaño de pantalla: el cielo y el mar
  // de atrás dados vuelta, estirados de costado y difuminados, como las franjas suaves del flyer.
  const interior = document.createElement("canvas");
  const ictx = interior.getContext("2d");
  /** Altura de la franja del sol adentro de la esfera (0 arriba, 1 abajo) */
  let franjaSol = 0.43;
  function armarInterior() {
    if (!ictx) return;
    const { cx, horizonte, radio: R } = m;
    const lado = Math.max(2, Math.round(2 * R * DPR));
    interior.width = interior.height = lado;
    ictx.setTransform(1, 0, 0, 1, 0, 0);
    // Una tajada angosta de lo que hay detrás (más angosta que la esfera: así se estira en franjas)
    const ancho = Math.min(W, R * 1.1);
    const x0 = Math.max(0, Math.min(W - ancho, cx - ancho / 2));
    const y0 = horizonte * 0.08;
    franjaSol = 1 - (horizonte - y0) / (H - y0);
    ictx.filter = `blur(${Math.max(1, R * DPR * 0.035)}px)`;
    // Dada vuelta en los dos sentidos, como en una bola de vidrio. Se pasa un poco del borde
    // para que el difuminado no deje bordes.
    ictx.save();
    ictx.translate(lado / 2, lado / 2);
    ictx.scale(-1.15, -1.15);
    ictx.drawImage(limpio, x0 * DPR, y0 * DPR, ancho * DPR, (H - y0) * DPR, -lado / 2, -lado / 2, lado, lado);
    ictx.restore();
    ictx.filter = "none";
    // El vidrio junta la luz: todo un poco más claro que el cielo de atrás
    ictx.globalCompositeOperation = "screen";
    ictx.fillStyle = "rgba(120,128,150,0.22)";
    ictx.fillRect(0, 0, lado, lado);
    // La franja dorada del atardecer, ancha y suave, como en el flyer
    const dorado = ictx.createLinearGradient(0, 0, 0, lado);
    dorado.addColorStop(Math.max(0, franjaSol - 0.22), "rgba(255,190,120,0)");
    dorado.addColorStop(franjaSol, "rgba(255,190,120,0.3)");
    dorado.addColorStop(Math.min(1, franjaSol + 0.3), "rgba(255,190,120,0)");
    ictx.globalCompositeOperation = "lighter";
    ictx.fillStyle = dorado;
    ictx.fillRect(0, 0, lado, lado);
    ictx.globalCompositeOperation = "source-over";
  }

  // La esfera de vidrio: transparente, con el atardecer dado vuelta en franjas, el sol refractado,
  // el borde que toma la luz y un brillo chico arriba
  function pintarEsfera(Rs: number) {
    if (!ctx) return;
    const { cx, cy } = m;
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, Rs, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(interior, cx - Rs, cy - Rs, Rs * 2, Rs * 2);
    // El sol de atrás, refractado: un resplandor del lado contrario, sobre la franja del horizonte
    ctx.globalCompositeOperation = "lighter";
    const sx = cx - Rs * 0.42 * Math.sign(m.sol - cx || 1), sy = cy - Rs + 2 * Rs * franjaSol * 0.95;
    const solAdentro = ctx.createRadialGradient(sx, sy, 0, sx, sy, Rs * 0.55);
    solAdentro.addColorStop(0, "rgba(255,236,200,0.75)");
    solAdentro.addColorStop(0.18, "rgba(255,196,130,0.35)");
    solAdentro.addColorStop(1, "rgba(255,160,100,0)");
    ctx.fillStyle = solAdentro;
    ctx.fillRect(cx - Rs, cy - Rs, Rs * 2, Rs * 2);
    ctx.globalCompositeOperation = "source-over";
    // Lente: un anillo apenas más oscuro adentro del borde y el borde claro
    const lente = ctx.createRadialGradient(cx, cy, Rs * 0.55, cx, cy, Rs);
    lente.addColorStop(0, "rgba(14,16,24,0)");
    lente.addColorStop(0.82, "rgba(14,16,24,0.2)");
    lente.addColorStop(0.95, "rgba(14,16,24,0.06)");
    lente.addColorStop(1, "rgba(232,238,250,0.55)");
    ctx.fillStyle = lente;
    ctx.fillRect(cx - Rs, cy - Rs, Rs * 2, Rs * 2);
    // El brillo: un punto chico y nítido arriba al medio
    ctx.globalCompositeOperation = "lighter";
    const bx = cx + Rs * 0.08, by = cy - Rs * 0.32;
    const brillo = ctx.createRadialGradient(bx, by, 0, bx, by, Rs * 0.06);
    brillo.addColorStop(0, "rgba(255,255,255,0.95)");
    brillo.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = brillo;
    ctx.fillRect(bx - Rs * 0.06, by - Rs * 0.06, Rs * 0.12, Rs * 0.12);
    ctx.globalCompositeOperation = "source-over";
    ctx.restore();
    ctx.strokeStyle = "rgba(255,255,255,0.4)";
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.arc(cx, cy, Rs, 0, Math.PI * 2);
    ctx.stroke();
  }

  let puntero: [number, number] | null = null;
  let recorrido = 0;
  let tPrevio = 0;
  const TEMPO = 60 / 124; // house

  function cuadro(t: number) {
    if (!ctx || !W) return;
    const dt = Math.max(0, Math.min(0.05, t - tPrevio));
    tPrevio = t;
    const { cx, cy, radio: R, horizonte } = m;

    // El recorrido sigue al scroll con un poco de inercia, así un salto se ve como un vuelo
    const objetivo = Math.max(0, Math.min(RECORRIDO_TOTAL, opciones.leerRecorrido()));
    recorrido += (objetivo - recorrido) * Math.min(1, dt * 5);
    opciones.alAvanzar?.(objetivo);

    let desde = ANILLO, hacia = ANILLO, tramo = 1;
    if (!modoSuave) {
      for (let i = 0; i < PARADAS.length - 1; i++) {
        const [u0, f0] = PARADAS[i], [u1, f1] = PARADAS[i + 1];
        if (recorrido <= u1) {
          [desde, hacia, tramo] = [f0, f1, entre01((recorrido - u0) / (u1 - u0))];
          break;
        }
      }
    }

    const ritmo = modoSuave ? 0.35 : 1;
    const tt = t * ritmo;
    const pulso = modoSuave ? 0 : Math.exp(-((t % TEMPO) / TEMPO) * 5);
    const latido = 1 + 0.02 * pulso;
    const vaiven = 0.22 * Math.sin(tt * 0.17);
    const F = 7;

    ctx.clearRect(0, 0, W, H);
    ctx.drawImage(fondo, 0, 0, W, H);

    // El sol titila sobre el agua
    ctx.globalCompositeOperation = "lighter";
    for (const b of brillos) {
      const a = 0.1 + 0.35 * (0.5 + 0.5 * Math.sin(tt * b.v * 1.6 + b.f));
      ctx.fillStyle = `rgba(255,200,140,${a * (1 - b.y / (H - horizonte))})`;
      ctx.fillRect(m.sol + b.x - b.l / 2, horizonte + 2 + b.y, b.l, 1.2);
    }
    ctx.globalCompositeOperation = "source-over";

    const lista = burbujas.map((b) => {
      const local = suave(entre01((tramo - b.retraso * 0.3) / 0.7));
      const A = girarFormacion(b.formas[desde], desde, tt);
      const B = girarFormacion(b.formas[hacia], hacia, tt);
      let p = mezcla(A, B, local);
      p = [
        (p[0] + Math.sin(tt * 0.9 + b.fase) * 0.06) * latido,
        (p[1] + Math.cos(tt * 0.7 + b.fase * 1.3) * 0.06) * latido,
        p[2] * latido,
      ];
      p = girarX(girarY(p, vaiven), 0.28);
      const k = F / (F + p[2]);
      let x = cx + p[0] * R * k;
      let y = cy + p[1] * R * k;
      // El puntero las aparta
      let ex = 0, ey = 0;
      if (puntero && !modoSuave) {
        const dx = x - puntero[0], dy = y - puntero[1];
        const d = Math.hypot(dx, dy) || 1;
        const alcance = R * 1.1;
        if (d < alcance) {
          const f = Math.pow(1 - d / alcance, 2) * R * 0.6;
          ex = (dx / d) * f;
          ey = (dy / d) * f;
        }
      }
      b.empuje[0] += (ex - b.empuje[0]) * Math.min(1, dt * 7);
      b.empuje[1] += (ey - b.empuje[1]) * Math.min(1, dt * 7);
      x += b.empuje[0];
      y += b.empuje[1];
      return { x, y, z: p[2], s: b.tam * R * k };
    });
    lista.sort((a, b) => b.z - a.z);

    const pintarBurbuja = (b: (typeof lista)[number]) => {
      if (b.s < 0.6 || F + b.z < 1) return;
      ctx.globalAlpha = 0.72 + 0.28 * entre01(1 - b.z / 3);
      ctx.drawImage(reflejo, b.x - b.s, b.y - b.s, b.s * 2, b.s * 2);
    };
    for (const b of lista) if (b.z > 0) pintarBurbuja(b);
    ctx.globalAlpha = 1;
    pintarEsfera(R * (1 + 0.008 * pulso));
    for (const b of lista) if (b.z <= 0) pintarBurbuja(b);
    ctx.globalAlpha = 1;
  }

  // Corre solo en pantalla, con la pestaña visible y sin pausa, a 60 cuadros por segundo como máximo
  medir();
  recorrido = Math.max(0, Math.min(RECORRIDO_TOTAL, opciones.leerRecorrido()));
  cuadro(0);
  const bucle = bucleVisible(canvas, cuadro);

  return {
    puntero(x, y) {
      puntero = x === null || y === undefined ? null : [x, y];
    },
    pausar: bucle.pausar,
    remedir() {
      medir();
      cuadro(bucle.tiempo());
    },
    destruir: bucle.destruir,
  };
}
