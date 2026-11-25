// La pirámide encendida: la animación de la portada del aniversario, en canvas 2D y sin librerías.
//
// Recrea el reel del flyer: una pirámide doble de piedra oscura flota sobre el mar al atardecer,
// pegada a la cámara. Entra a oscuras, se enciende y estalla por la franja del medio en bloques
// de roca con magma adentro; después respira como el reel: se abre, tira escombros y se vuelve
// a armar cada 14 s. Se frena fuera de pantalla y con la pestaña oculta.
// Con "reducir movimiento" no estalla ni se acerca: queda partida y encendida, y gira lento.

import { bucleVisible } from "@/lib/bucleLienzo";

type V3 = [number, number, number];

interface Fragmento {
  /** Cara de afuera: un polígono convexo */
  v: V3[];
  /** Cara de adentro: la de afuera corrida hacia el centro (el espesor de la roca) */
  dentro: V3[];
  /** Por borde (v[i] → v[i+1]): true si es una arista de la pirámide; si no, es una grieta con lava */
  arista: boolean[];
  centro: V3;
  n: V3;
  dir: V3;
  peso: number;
  eje: V3;
  giro: number;
  brillo: number;
  tono: number;
  /** 1 donde la pirámide se rompe (la franja del medio y la de abajo), 0 en la punta, que queda entera */
  rotura: number;
  /** Bloque suelto: sale de adentro cuando la pirámide se abre */
  suelto: boolean;
}

interface Esquirla {
  p: V3;
  vel: V3;
  tam: number;
  ang: number;
  vang: number;
  vida: number;
  dura: number;
  forma: [number, number][];
}

export interface MedidasPortada {
  /** Dónde va la punta de arriba (px desde arriba del lienzo) */
  techo: number;
  /** Dónde va la punta de abajo */
  piso: number;
  /** Línea del horizonte */
  horizonte: number;
}

export interface Piramide {
  pausar: (pausa: boolean) => void;
  remedir: () => void;
  destruir: () => void;
}

// ── Vectores ────────────────────────────────────────────────────
const suma = (a: V3, b: V3): V3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
const resta = (a: V3, b: V3): V3 => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const por = (a: V3, k: number): V3 => [a[0] * k, a[1] * k, a[2] * k];
const punto = (a: V3, b: V3) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const cruz = (a: V3, b: V3): V3 => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const largo = (a: V3) => Math.hypot(a[0], a[1], a[2]);
const unidad = (a: V3): V3 => por(a, 1 / (largo(a) || 1));
const mezcla = (a: V3, b: V3, t: number): V3 => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
const promedio = (ps: V3[]): V3 => por(ps.reduce(suma, [0, 0, 0] as V3), 1 / ps.length);

/** Gira v alrededor del eje k (unitario), fórmula de Rodrigues. */
function girarEje(v: V3, k: V3, ang: number): V3 {
  const c = Math.cos(ang);
  const s = Math.sin(ang);
  return suma(suma(por(v, c), por(cruz(k, v), s)), por(k, punto(k, v) * (1 - c)));
}

function girar(p: V3, ay: number, ax: number, az: number): V3 {
  let [x, y, z] = p;
  let c = Math.cos(ay), s = Math.sin(ay);
  [x, z] = [x * c + z * s, -x * s + z * c];
  c = Math.cos(ax); s = Math.sin(ax);
  [y, z] = [y * c - z * s, y * s + z * c];
  c = Math.cos(az); s = Math.sin(az);
  [x, y] = [x * c - y * s, x * s + y * c];
  return [x, y, z];
}

// Matrices de 3×3 por filas. Cada cuadro arma los giros una vez y los aplica a todos los vértices,
// en lugar de calcular senos y cosenos por cada punto.
type M3 = number[];

/** El mismo giro que girar(), como matriz: sus columnas son los ejes girados */
function matrizGiro(ay: number, ax: number, az: number): M3 {
  const x = girar([1, 0, 0], ay, ax, az), y = girar([0, 1, 0], ay, ax, az), z = girar([0, 0, 1], ay, ax, az);
  return [x[0], y[0], z[0], x[1], y[1], z[1], x[2], y[2], z[2]];
}

/** El mismo giro que girarEje(), como matriz (Rodrigues) */
function matrizEje(k: V3, ang: number): M3 {
  const c = Math.cos(ang), s = Math.sin(ang), t = 1 - c;
  const [x, y, z] = k;
  return [
    c + x * x * t, x * y * t - z * s, x * z * t + y * s,
    y * x * t + z * s, c + y * y * t, y * z * t - x * s,
    z * x * t - y * s, z * y * t + x * s, c + z * z * t,
  ];
}

function multiplicar(a: M3, b: M3): M3 {
  const r = new Array<number>(9);
  for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++) r[i * 3 + j] = a[i * 3] * b[j] + a[i * 3 + 1] * b[3 + j] + a[i * 3 + 2] * b[6 + j];
  return r;
}

const aplicar = (m: M3, v: V3): V3 => [
  m[0] * v[0] + m[1] * v[1] + m[2] * v[2],
  m[3] * v[0] + m[4] * v[1] + m[5] * v[2],
  m[6] * v[0] + m[7] * v[1] + m[8] * v[2],
];

/** Aleatorio con semilla: siempre la misma pirámide. */
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

const entre01 = (x: number) => Math.max(0, Math.min(1, x));
/** Arranca rápido y frena suave */
const salida = (x: number) => 1 - Math.pow(1 - entre01(x), 3);
const suave = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const canal = (x: number) => Math.round(Math.max(0, Math.min(255, x)));
const rgb = (r: number, g: number, b: number) => `rgb(${canal(r)},${canal(g)},${canal(b)})`;

// ── La pirámide, partida en pedazos ─────────────────────────────
// Proporciones de Keops: vista en diagonal, la altura es casi la mitad del ancho.
const ARRIBA: V3 = [0, -0.95, 0];
const ABAJO: V3 = [0, 0.75, 0];

/** Cuánto se rompe cada zona: la punta queda entera; la franja del medio y la pirámide de abajo, no. */
function rotura(c: V3): number {
  if (c[1] < 0) return Math.pow(Math.max(0, 1 - -c[1] / 0.7), 1.2);
  return 0.5 + 0.5 * Math.max(0, 1 - c[1] / 0.55);
}

/** Área máxima de un pedazo: lajas grandes arriba, bloques chicos donde se rompe. */
function areaMaxima(c: V3): number {
  return c[1] < 0 ? 0.42 - 0.392 * Math.sqrt(rotura(c)) : 0.036;
}

interface Vertice {
  p: V3;
  /** El borde que sale de este vértice es arista de la pirámide */
  arista: boolean;
}

function areaPoligono(ps: V3[]): number {
  let acc: V3 = [0, 0, 0];
  for (let i = 0; i < ps.length; i++) acc = suma(acc, cruz(ps[i], ps[(i + 1) % ps.length]));
  return largo(acc) / 2;
}

/** Corta un polígono convexo con el plano que pasa por c con normal d. Los bordes nuevos son grietas. */
function cortar(poli: Vertice[], c: V3, d: V3): [Vertice[], Vertice[]] {
  const mitad = (signo: number) => {
    const out: Vertice[] = [];
    for (let i = 0; i < poli.length; i++) {
      const a = poli[i], b = poli[(i + 1) % poli.length];
      const sa = punto(resta(a.p, c), d) * signo;
      const sb = punto(resta(b.p, c), d) * signo;
      if (sa >= 0) out.push({ p: a.p, arista: sb >= 0 || sa > 0 ? a.arista : false });
      if ((sa > 0 && sb < 0) || (sa < 0 && sb > 0)) {
        out.push({ p: mezcla(a.p, b.p, sa / (sa - sb)), arista: sa > 0 ? false : a.arista });
      }
    }
    return out;
  };
  return [mitad(1), mitad(-1)];
}

function armarFragmentos(): Fragmento[] {
  const azar = crearAzar(57);
  const entre = (a: number, b: number) => a + (b - a) * azar();
  const ANILLO: V3[] = [[1, 0, 0], [0, 0, 1], [-1, 0, 0], [0, 0, -1]];
  const fragmentos: Fragmento[] = [];

  // Cada cara se corta en pedazos parejos: siempre de través, cerca del medio de su lado más largo
  const trocear = (poli: Vertice[], n: V3, prof: number) => {
    const ps = poli.map((v) => v.p);
    const area = areaPoligono(ps);
    const centro = promedio(ps);
    if (area <= areaMaxima(centro) || prof > 10) {
      if (area > 1e-4) agregar(poli, n, area);
      return;
    }
    let a = ps[0], b = ps[1], mayor = 0;
    for (let i = 0; i < ps.length; i++)
      for (let j = i + 1; j < ps.length; j++) {
        const l = largo(resta(ps[i], ps[j]));
        if (l > mayor) [a, b, mayor] = [ps[i], ps[j], l];
      }
    const d = girarEje(unidad(resta(b, a)), n, entre(-0.5, 0.5));
    for (const parte of cortar(poli, mezcla(a, b, entre(0.38, 0.62)), d)) {
      if (parte.length >= 3) trocear(parte, n, prof + 1);
    }
  };

  const agregar = (poli: Vertice[], n: V3, area: number) => {
    const v = poli.map((x) => x.p);
    const centro = promedio(v);
    const r = rotura(centro);
    const espesor = Math.min(0.13, Math.max(0.05, 0.45 * Math.sqrt(area)));
    fragmentos.push({
      v,
      dentro: v.map((p) => resta(p, por(n, espesor))),
      arista: poli.map((x) => x.arista),
      centro,
      n,
      dir: unidad(suma(unidad(centro), [entre(-0.25, 0.25), entre(-0.15, 0.15), entre(-0.25, 0.25)])),
      // La franja del medio vuela; la cáscara de abajo se separa menos; la punta casi no se mueve
      peso: (centro[1] < 0 ? 0.04 + 1.15 * Math.pow(r, 2.5) : 0.2 + 1.3 * (r - 0.5)) * entre(0.75, 1.25),
      eje: unidad([entre(-1, 1), entre(-1, 1), entre(-1, 1)]),
      giro: entre(-0.6, 0.6) * (0.2 + r),
      brillo: entre(0.4, 1),
      tono: entre(-0.02, 0.02),
      rotura: r,
      suelto: false,
    });
  };

  for (let i = 0; i < 4; i++) {
    const a = ANILLO[i], b = ANILLO[(i + 1) % 4];
    for (const cara of [[ARRIBA, a, b], [ABAJO, b, a]] as V3[][]) {
      let n = unidad(cruz(resta(cara[1], cara[0]), resta(cara[2], cara[0])));
      if (punto(n, promedio(cara)) < 0) n = por(n, -1);
      trocear(cara.map((p) => ({ p, arista: true })), n, 0);
    }
  }

  // Bloques sueltos: esperan adentro de la franja del medio y salen volando cuando se abre
  for (let i = 0; i < 34; i++) {
    const ang = entre(0, Math.PI * 2);
    const y = entre(-0.32, 0.3);
    const radio = (y < 0 ? 1 + y / -ARRIBA[1] : 1 - y / ABAJO[1]) / (Math.abs(Math.cos(ang)) + Math.abs(Math.sin(ang)));
    const base: V3 = [Math.cos(ang) * radio * 0.72, y, Math.sin(ang) * radio * 0.72];
    const lado = 0.05 + 0.1 * Math.pow(azar(), 1.8);
    const n = unidad([entre(-1, 1), entre(-1, 1), entre(-1, 1)]);
    const u = unidad(cruz(n, Math.abs(n[1]) < 0.9 ? [0, 1, 0] : [1, 0, 0]));
    const w = cruz(n, u);
    const h = lado / 2;
    const v = ([[-h, -h], [h, -h], [h, h], [-h, h]] as const).map(([x, z]) => suma(base, suma(por(u, x), por(w, z))));
    const espesor = lado * entre(0.6, 1);
    fragmentos.push({
      v,
      dentro: v.map((p) => resta(p, por(n, espesor))),
      arista: [false, false, false, false],
      centro: resta(base, por(n, espesor / 2)),
      n,
      dir: unidad(suma(unidad([base[0], base[1] * 0.6, base[2]]), [entre(-0.3, 0.3), entre(-0.25, 0.2), entre(-0.3, 0.3)])),
      peso: entre(1.4, 2.8),
      eje: unidad([entre(-1, 1), entre(-1, 1), entre(-1, 1)]),
      giro: entre(-3, 3),
      brillo: entre(0.5, 1),
      tono: entre(-0.02, 0.02),
      rotura: 1,
      suelto: true,
    });
  }
  return fragmentos;
}

// ── Línea de tiempo: 14 s, como el reel ─────────────────────────
const VUELTA = 14;
function apertura(t: number): number {
  const u = t % VUELTA;
  if (u < 2) return 0.03;
  if (u < 6) return 0.03 + 0.3 * suave((u - 2) / 4);
  if (u < 8.5) return 0.33 + 0.52 * suave((u - 6) / 2.5);
  if (u < 11) return 0.85 + 0.05 * Math.sin(((u - 8.5) / 2.5) * Math.PI);
  return 0.85 - 0.82 * suave((u - 11) / 3);
}
/** Momento de la vuelta en el que queda abierta del todo: ahí la toma después del estallido */
const ABIERTA = 8.5;
/** Lo que tarda en abrirse cuando estalla */
const SUBIDA = 0.6;

const LUZ = unidad([-0.5, -0.75, -0.55]);
const CAMARA = 3.6;
const OJO: V3 = [0, 0, -CAMARA];
/** La punta, un poco hacia la cámara */
const INCLINACION = 0.3;
const LADEO = -0.16;
/** Cuánto se separan los pedazos con la apertura completa */
const ALCANCE = 0.42;

/** Altura en pantalla de un punto con la pirámide quieta, en unidades de escala */
function alturaEnPantalla(p: V3): number {
  const q = girar(p, 0, INCLINACION, LADEO);
  return (q[1] * CAMARA) / (CAMARA + q[2]);
}

export function iniciarPiramide(
  canvas: HTMLCanvasElement,
  opciones: {
    medir: () => MedidasPortada;
    suave: boolean;
    /** Segundos desde que arranca hasta que estalla: lo marca el logo, que aterriza en ese momento */
    explosion?: number;
  }
): Piramide {
  const ctx = canvas.getContext("2d");
  const reflejo = document.createElement("canvas");
  const rctx = reflejo.getContext("2d");
  const fondo = document.createElement("canvas");
  const fctx = fondo.getContext("2d");
  if (!ctx || !rctx || !fctx) return { pausar: () => {}, remedir: () => {}, destruir: () => {} };

  const { suave: modoSuave } = opciones;
  const fragmentos = armarFragmentos();
  const azar = crearAzar(1969);
  const entre = (a: number, b: number) => a + (b - a) * azar();
  const explosion = Math.max(0.8, opciones.explosion ?? 0);
  // La vuelta arranca de forma que, al terminar de estallar, quede abierta del todo
  const inicio = modoSuave ? 3.5 : ABIERTA - explosion - SUBIDA;

  // Textura de piedra
  const ruido = document.createElement("canvas");
  ruido.width = ruido.height = 128;
  const nctx = ruido.getContext("2d");
  if (nctx) {
    const img = nctx.createImageData(128, 128);
    for (let i = 0; i < img.data.length; i += 4) {
      const g = 25 + azar() * 85;
      img.data[i] = img.data[i + 1] = img.data[i + 2] = g;
      img.data[i + 3] = 255;
    }
    nctx.putImageData(img, 0, 0);
  }
  let patron: CanvasPattern | null = null;

  // Medidas. En un equipo que no llega, la escena se aligera: menos resolución, sin la textura
  // de la piedra y el reflejo del agua en tiras más anchas. La forma y la luz quedan iguales.
  let W = 0, H = 0, DPR = 1, horizonte = 0, escala = 0, cx = 0, cy = 0;
  let ligero = false;
  const brillos: { x: number; y: number; l: number; f: number; v: number }[] = [];

  function pintarFondo() {
    if (!fctx) return;
    const g = fctx.createLinearGradient(0, 0, 0, horizonte);
    g.addColorStop(0, "#070a1c");
    g.addColorStop(0.38, "#151c3d");
    g.addColorStop(0.62, "#3b3053");
    g.addColorStop(0.82, "#8a4f4c");
    g.addColorStop(0.94, "#d9884c");
    g.addColorStop(1, "#f6c27a");
    fctx.fillStyle = g;
    fctx.fillRect(0, 0, W, horizonte);
    // Nubes bajas, alargadas
    const nube = crearAzar(11);
    for (let i = 0; i < 16; i++) {
      const y = horizonte * (0.45 + nube() * 0.45), x = nube() * W, w = W * (0.18 + nube() * 0.4), h = 4 + nube() * 14;
      fctx.fillStyle = `rgba(${40 + nube() * 50},${28 + nube() * 30},${60 + nube() * 40},${0.18 + nube() * 0.25})`;
      fctx.beginPath();
      fctx.ellipse(x, y, w / 2, h / 2, 0, 0, Math.PI * 2);
      fctx.fill();
    }
    // Mar frío, como el del reel: el calor queda solo en la columna del sol y el reflejo
    const m = fctx.createLinearGradient(0, horizonte, 0, H);
    m.addColorStop(0, "#463848");
    m.addColorStop(0.06, "#252a40");
    m.addColorStop(0.35, "#141a2e");
    m.addColorStop(0.7, "#0d1120");
    m.addColorStop(1, "#0a0a0a");
    fctx.fillStyle = m;
    fctx.fillRect(0, horizonte, W, H - horizonte);
  }

  function medir() {
    DPR = Math.min(window.devicePixelRatio || 1, ligero ? 1.5 : 2);
    W = canvas.clientWidth;
    H = canvas.clientHeight;
    if (!W || !H) return;
    for (const c of [canvas, reflejo, fondo]) {
      c.width = Math.round(W * DPR);
      c.height = Math.round(H * DPR);
    }
    for (const c of [ctx, rctx, fctx]) c?.setTransform(DPR, 0, 0, DPR, 0, 0);
    patron = ctx?.createPattern(ruido, "repeat") ?? null;
    // La punta de abajo toca el logo y la de arriba llega a la fecha. En celular desborda
    // los costados, como en el reel; en pantallas anchas el alto manda.
    const m = opciones.medir();
    horizonte = m.horizonte;
    const arriba = alturaEnPantalla(ARRIBA), abajo = alturaEnPantalla(ABAJO);
    escala = Math.max(60, Math.min((m.piso - m.techo) / (abajo - arriba), W * (W < 768 ? 0.66 : 0.42)));
    cx = W / 2;
    cy = m.piso - abajo * escala;
    pintarFondo();
    brillos.length = 0;
    const b = crearAzar(1212);
    for (let i = 0; i < 170; i++) {
      const prof = Math.pow(b(), 1.6);
      brillos.push({ x: (b() - 0.5) * (40 + prof * W * 0.55), y: prof * (H - horizonte), l: 6 + b() * (18 + prof * 60), f: b() * 6.28, v: 1 + b() * 3 });
    }
  }

  const esquirlas: Esquirla[] = [];
  function soltarEsquirla(rotY: number, rotX: number, rotZ: number, fuerza: number) {
    const ang = entre(0, Math.PI * 2);
    const base: V3 = [Math.cos(ang) * entre(0.5, 0.95), entre(-0.3, 0.35), Math.sin(ang) * entre(0.5, 0.95)];
    const p = girar(base, rotY, rotX, rotZ);
    const vel = por(unidad(suma(p, [0, entre(-0.25, 0.2), 0])), entre(0.35, 0.95) * fuerza);
    vel[2] = Math.max(vel[2], -0.12); // salen hacia los costados, no contra la cámara
    esquirlas.push({
      p,
      vel,
      tam: 0.015 + 0.045 * Math.pow(azar(), 2),
      ang: entre(0, 6.28),
      vang: entre(-3, 3),
      vida: 0,
      dura: entre(2.2, 4.2),
      forma: [0, 1, 2, 3].map((i) => {
        const a = i * 1.57 + entre(-0.45, 0.45);
        const r = entre(0.7, 1.15);
        return [Math.cos(a) * r, Math.sin(a) * r] as [number, number];
      }),
    });
  }

  let tPrevio = 0;
  let estallo = false;
  function cuadro(t: number) {
    if (!ctx || !rctx || !W) return;
    const tIntro = t - inicio;

    // Cuánto está abierta. En el modo suave queda partida y quieta, apenas respira.
    const luz = apertura(t);
    let E: number;
    if (modoSuave) E = 0.58 + 0.04 * Math.sin(t * 0.5);
    else if (tIntro < explosion) E = 0.02;
    else if (tIntro < explosion + SUBIDA) E = 0.02 + (apertura(ABIERTA) - 0.02) * salida((tIntro - explosion) / SUBIDA);
    else E = luz;

    // El fuego: arranca apagado, se enciende y estalla con un destello. La luz no es movimiento:
    // en el modo suave también se enciende y titila, más calmo.
    const encendido = modoSuave
      ? 0.1 + 0.9 * salida(tIntro / 1.6)
      : tIntro < explosion
        ? 0.08 + 0.55 * suave(entre01(tIntro / explosion))
        : 1;
    const destello = !modoSuave && tIntro >= explosion ? 0.8 * Math.exp(-(tIntro - explosion) * 2.4) : 0;
    const titileo = modoSuave ? 0.5 : 1;
    const base = 0.5 + 0.6 * Math.pow(modoSuave ? Math.max(luz, 0.55) : E, 0.8);
    const fuego = Math.min(1.6, (base + titileo * (0.07 * Math.sin(t * 7.3) + 0.05 * Math.sin(t * 12.9))) * encendido + destello);

    // La cámara: entra de lejos y se acerca con el estallido; después acompaña la apertura
    const acercar = modoSuave ? 1 : (0.8 + 0.2 * salida(tIntro / (explosion + 1.4))) * (0.97 + 0.07 * E);
    const sacudon = modoSuave ? 0 : destello * 3;
    const ox = sacudon * Math.sin(t * 53), oy = sacudon * Math.cos(t * 61);
    const esc = escala * acercar;
    const grosor = Math.max(0.8, esc / 240);
    const vel = modoSuave ? 0.45 : 1;
    const rotY = -0.25 + (tIntro - (modoSuave ? 0 : explosion)) * 0.2 * vel;
    const rotX = INCLINACION + 0.06 * vel * Math.sin(t * 0.35);
    const rotZ = LADEO + 0.04 * vel * Math.sin(t * 0.27);
    const proyectar = (p: V3): [number, number, number] => {
      const k = CAMARA / (CAMARA + p[2]);
      return [cx + ox + p[0] * esc * k, cy + oy + p[1] * esc * k, k];
    };

    // Cielo, mar y sol. El resplandor del sol queda en el cielo; en el mar, solo una columna
    // angosta debajo del sol: el agua sigue fría a los costados, como en el reel.
    ctx.clearRect(0, 0, W, H);
    ctx.drawImage(fondo, 0, 0, W, H);
    ctx.globalCompositeOperation = "lighter";
    const sol = ctx.createRadialGradient(cx, horizonte, 0, cx, horizonte, W * 0.55);
    sol.addColorStop(0, `rgba(255,214,150,${0.55 + 0.35 * fuego})`);
    sol.addColorStop(0.18, `rgba(255,150,70,${0.25 + 0.2 * fuego})`);
    sol.addColorStop(1, "rgba(255,120,60,0)");
    ctx.fillStyle = sol;
    ctx.fillRect(0, 0, W, horizonte);
    const altoMar = H - horizonte;
    ctx.save();
    ctx.translate(cx, horizonte);
    ctx.scale(Math.min(1, (W * 0.16) / altoMar), 1);
    const columna = ctx.createRadialGradient(0, 0, 0, 0, 0, altoMar);
    columna.addColorStop(0, `rgba(255,190,120,${0.4 + 0.25 * fuego})`);
    columna.addColorStop(0.35, `rgba(255,140,70,${0.12 + 0.08 * fuego})`);
    columna.addColorStop(1, "rgba(255,120,60,0)");
    ctx.fillStyle = columna;
    ctx.fillRect(-altoMar, 0, altoMar * 2, altoMar);
    ctx.restore();
    ctx.globalCompositeOperation = "source-over";

    // La pirámide se pinta en su propio lienzo, para reflejarla en el agua
    rctx.clearRect(0, 0, W, H);

    // Cada pedazo gira sobre su eje, se corre hacia afuera y gira con toda la pirámide:
    // M·(R·(v − centro) + centro + desplazo) = (M·R)·v + M·(centro + desplazo − R·centro)
    const M = matrizGiro(rotY, rotX, rotZ);
    const lista: {
      f: Fragmento; pts: V3[]; dentro: V3[]; n: V3; z: number; salto: number; vis: number; cerca: number; cCara: V3; cDentro: V3;
    }[] = [];
    for (const f of fragmentos) {
      const salto = E * f.peso * ALCANCE;
      // Los bloques sueltos aparecen cuando ya salieron de adentro
      const vis = f.suelto ? entre01((salto - 0.12) / 0.1) : 1;
      if (vis === 0) continue;
      const desplazo = por(f.dir, salto);
      const R = matrizEje(f.eje, E * f.giro);
      const MR = multiplicar(M, R);
      const corrido = aplicar(M, resta(suma(f.centro, desplazo), aplicar(R, f.centro)));
      const mover = (v: V3): V3 => {
        const q = aplicar(MR, v);
        return [q[0] + corrido[0], q[1] + corrido[1], q[2] + corrido[2]];
      };
      const pts = f.v.map(mover);
      const dentro = f.dentro.map(mover);
      const cCara = promedio(pts), cDentro = promedio(dentro);
      // El magma calienta lo que está cerca del centro; lo que sale volando se enfría
      const cerca = Math.pow(1 - entre01((largo(suma(f.centro, desplazo)) - 0.25) / 1.0), 1.3);
      lista.push({ f, pts, dentro, n: aplicar(MR, f.n), z: (cCara[2] + cDentro[2]) / 2, salto, vis, cerca, cCara, cDentro });
    }
    lista.sort((a, b) => b.z - a.z);

    const poligono = (p: [number, number, number][]) => {
      rctx.beginPath();
      rctx.moveTo(p[0][0], p[0][1]);
      for (let i = 1; i < p.length; i++) rctx.lineTo(p[i][0], p[i][1]);
      rctx.closePath();
    };

    const pintarFragmento = ({ f, pts, dentro, n, salto, vis, cerca, cCara, cDentro }: (typeof lista)[number]) => {
      // Cerca de la cámara la perspectiva los agranda de más: ahí no se dibujan
      if (f.suelto && CAMARA + cCara[2] < 1.5) return;
      const P = pts.map(proyectar), Q = dentro.map(proyectar);
      const cCaja = mezcla(cCara, cDentro, 0.5);
      const calor = fuego * f.brillo * (0.3 + 0.7 * f.rotura) * (0.12 + 0.88 * cerca);
      rctx.globalAlpha = vis;
      // Costados de roca: oscuros, encendidos solo cerca del magma. Solo cuando el pedazo se separó.
      if (f.suelto || salto > 0.015) {
        rctx.fillStyle = rgb(20 + 200 * calor, 9 + 75 * calor, 6 + 14 * calor);
        for (let i = 0; i < pts.length; i++) {
          const j = (i + 1) % pts.length;
          const a = pts[i], b = pts[j], c = dentro[j], d = dentro[i];
          // Centro del costado, y si mira hacia la cámara
          const lx = (a[0] + b[0] + c[0] + d[0]) / 4, ly = (a[1] + b[1] + c[1] + d[1]) / 4, lz = (a[2] + b[2] + c[2] + d[2]) / 4;
          if ((lx - cCaja[0]) * (OJO[0] - lx) + (ly - cCaja[1]) * (OJO[1] - ly) + (lz - cCaja[2]) * (OJO[2] - lz) <= 0) continue;
          poligono([P[i], P[j], Q[j], Q[i]]);
          rctx.fill();
        }
      }
      if (punto(n, resta(OJO, cCara)) <= 0) {
        // Se ve la cara de adentro: roca encendida, al rojo cerca del centro
        poligono(Q);
        rctx.fillStyle = rgb(40 + 230 * calor, 14 + 150 * calor, 6 + 50 * calor);
        rctx.fill();
        rctx.globalAlpha = 1;
        return;
      }
      // Cara de afuera: piedra casi negra, con el canto que toma el atardecer y el reflejo del magma
      poligono(P);
      const lam = Math.max(0, punto(n, LUZ));
      const lado = Math.max(0, 1 - Math.abs(n[2])) * 0.16;
      const v = 0.03 + 0.1 * lam + f.tono;
      const reflejoFuego = f.rotura * E * fuego * cerca * 0.35;
      rctx.fillStyle = rgb(235 * v + 150 * lado + 120 * reflejoFuego, 238 * v + 70 * lado + 45 * reflejoFuego, 255 * v + 35 * lado + 8 * reflejoFuego);
      rctx.fill();
      if (patron && !ligero) {
        rctx.globalAlpha = 0.18 * vis;
        rctx.fillStyle = patron;
        rctx.fill();
        rctx.globalAlpha = vis;
      }
      // Grietas con lava: los bordes que no son aristas de la pirámide.
      // Encendidas en la franja del medio y abajo, casi apagadas en la punta.
      const a = Math.min(1, fuego * (0.03 + 0.97 * Math.pow(f.rotura, 1.5)) * (0.4 + 0.6 * f.brillo)) * (f.suelto ? 0.2 : 1);
      if (a > 0.02) {
        rctx.beginPath();
        for (let i = 0; i < P.length; i++) {
          if (f.arista[i]) continue;
          const j = (i + 1) % P.length;
          rctx.moveTo(P[i][0], P[i][1]);
          rctx.lineTo(P[j][0], P[j][1]);
        }
        rctx.globalCompositeOperation = "lighter";
        rctx.lineCap = "round";
        rctx.strokeStyle = `rgba(255,90,10,${0.35 * a})`;
        rctx.lineWidth = grosor * (2.2 + 4.5 * f.rotura);
        rctx.stroke();
        rctx.strokeStyle = `rgba(255,214,120,${0.95 * a})`;
        rctx.lineWidth = grosor * (0.7 + f.rotura);
        rctx.stroke();
        rctx.globalCompositeOperation = "source-over";
      }
      rctx.globalAlpha = 1;
    };

    // El centro de la pirámide en pantalla: de ahí sale la luz
    const [gx, gy] = proyectar(girar([0, -0.05, 0], rotY, rotX, rotZ));

    // Escombros: bloques de roca con el costado que mira al fuego encendido.
    // Se apagan cuando la pirámide se cierra: la fase quieta queda limpia.
    const restoEsquirlas = entre01((E - 0.12) / 0.25);
    const pintarEsquirla = (e: Esquirla) => {
      if (CAMARA + e.p[2] < 1.6) return;
      const [x, y, k] = proyectar(e.p);
      const s = Math.min(e.tam * esc * k, e.tam * esc * 1.8);
      const alfa = Math.max(0, Math.min(1, (e.dura - e.vida) / 0.8, e.vida / 0.2) * restoEsquirlas);
      if (alfa <= 0) return;
      const l = Math.hypot(gx - x, gy - y) || 1;
      const forma = (dx: number, dy: number) => {
        rctx.save();
        rctx.translate(x + dx, y + dy);
        rctx.rotate(e.ang);
        rctx.beginPath();
        e.forma.forEach(([px, py], i) => (i ? rctx.lineTo(px * s, py * s) : rctx.moveTo(px * s, py * s)));
        rctx.closePath();
        rctx.restore();
      };
      rctx.globalAlpha = alfa;
      forma(((gx - x) / l) * s * 0.55, ((gy - y) / l) * s * 0.55);
      rctx.fillStyle = rgb(40 + 90 * Math.min(1, fuego), 15 + 30 * Math.min(1, fuego), 8 + 6 * Math.min(1, fuego));
      rctx.fill();
      forma(0, 0);
      rctx.fillStyle = "#121011";
      rctx.fill();
      rctx.strokeStyle = `rgba(255,${130 + 70 * Math.min(1, fuego)},50,${0.55 * Math.min(1, fuego)})`;
      rctx.lineWidth = 1;
      rctx.stroke();
      rctx.globalAlpha = 1;
    };

    // Escombros: una tanda al estallar y después mientras está abierta (no en el modo suave)
    const dt = Math.max(0, Math.min(0.05, t - tPrevio));
    tPrevio = t;
    if (!modoSuave && !estallo && tIntro >= explosion) {
      estallo = true;
      for (let i = 0; i < (W < 768 ? 22 : 34); i++) soltarEsquirla(rotY, rotX, rotZ, 1.5);
    }
    if (!modoSuave && tIntro > explosion && E > 0.2 && azar() < E * (W < 768 ? 24 : 36) * dt) soltarEsquirla(rotY, rotX, rotZ, 1);
    for (let i = esquirlas.length - 1; i >= 0; i--) {
      const e = esquirlas[i];
      e.vida += dt;
      e.ang += e.vang * dt;
      e.p = suma(e.p, por(e.vel, dt * (0.9 + E)));
      if (e.vida > e.dura || restoEsquirlas === 0) esquirlas.splice(i, 1);
    }

    for (const e of esquirlas) if (e.p[2] > 0) pintarEsquirla(e);
    for (const item of lista) if (item.z > 0) pintarFragmento(item);

    // El magma de adentro: se ve por las grietas y entre los bloques
    const abierta = 0.35 + 0.65 * E;
    const r = esc * (0.5 + 0.9 * E);
    const nucleo = rctx.createRadialGradient(gx, gy, 0, gx, gy, r);
    nucleo.addColorStop(0, `rgba(255,252,235,${Math.min(1, 0.3 + fuego * abierta)})`);
    nucleo.addColorStop(0.25, `rgba(255,214,110,${Math.min(1, 0.95 * fuego * abierta)})`);
    nucleo.addColorStop(0.55, `rgba(255,130,30,${Math.min(1, 0.55 * fuego * abierta)})`);
    nucleo.addColorStop(1, "rgba(255,80,0,0)");
    rctx.globalCompositeOperation = "lighter";
    rctx.fillStyle = nucleo;
    rctx.beginPath();
    rctx.arc(gx, gy, r, 0, Math.PI * 2);
    rctx.fill();
    rctx.globalCompositeOperation = "source-over";

    for (const item of lista) if (item.z <= 0) pintarFragmento(item);
    for (const e of esquirlas) if (e.p[2] <= 0) pintarEsquirla(e);

    // La luz del magma se derrama un poco sobre la roca de adelante
    const derrame = Math.min(0.5, 0.22 * fuego * E + 0.3 * destello);
    if (derrame > 0.01) {
      const halo = rctx.createRadialGradient(gx, gy, 0, gx, gy, r * 1.1);
      halo.addColorStop(0, `rgba(255,170,60,${derrame})`);
      halo.addColorStop(1, "rgba(255,90,10,0)");
      rctx.globalCompositeOperation = "lighter";
      rctx.fillStyle = halo;
      rctx.beginPath();
      rctx.arc(gx, gy, r * 1.1, 0, Math.PI * 2);
      rctx.fill();
      rctx.globalCompositeOperation = "source-over";
    }

    // Reflejo en el agua, ondulado
    const alto = Math.min((H - horizonte) * 0.75, horizonte);
    const paso = (W < 768 ? 3 : 2) * (ligero ? 2 : 1);
    // En el modo suave el agua se mueve más lento y con menos oleaje
    const tAgua = t * (modoSuave ? 0.4 : 1);
    const oleaje = modoSuave ? 0.6 : 1;
    for (let k = 0; k < alto; k += paso) {
      const src = horizonte - k - paso;
      if (src < 0) break;
      const onda = oleaje * (Math.sin(k * 0.13 + tAgua * 2.1) * (0.6 + k * 0.045) + Math.sin(k * 0.05 - tAgua * 1.3) * 1.5);
      ctx.globalAlpha = Math.max(0, 0.3 * (1 - k / alto));
      ctx.drawImage(reflejo, 0, src * DPR, W * DPR, paso * DPR, onda, horizonte + k * 0.92, W, paso);
    }
    ctx.globalAlpha = 1;
    ctx.drawImage(reflejo, 0, 0, W, H);

    // Destellos del sol sobre el agua
    ctx.globalCompositeOperation = "lighter";
    for (const b of brillos) {
      const a = 0.12 + 0.35 * Math.min(1, fuego) * (0.5 + 0.5 * Math.sin(tAgua * b.v + b.f));
      ctx.fillStyle = `rgba(255,190,110,${a * (1 - b.y / (H - horizonte))})`;
      ctx.fillRect(cx + b.x - b.l / 2, horizonte + 2 + b.y, b.l, 1.2);
    }
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "rgba(255,220,170,.35)";
    ctx.fillRect(0, horizonte, W, 1);

    // La escena sale de la noche: el primer cuadro es del color del fondo de la sección
    const amanecer = salida(tIntro / 1.1);
    if (amanecer < 1) {
      ctx.fillStyle = `rgba(11,16,38,${1 - amanecer})`;
      ctx.fillRect(0, 0, W, H);
    }
  }

  // Corre solo en pantalla, con la pestaña visible y sin pausa, a 60 cuadros por segundo como máximo
  tPrevio = inicio;
  medir();
  cuadro(inicio);
  const bucle = bucleVisible(canvas, cuadro, {
    inicio,
    alAtrasarse() {
      ligero = true;
      medir();
    },
  });

  return {
    pausar: bucle.pausar,
    remedir() {
      medir();
      cuadro(bucle.tiempo());
    },
    destruir: bucle.destruir,
  };
}
