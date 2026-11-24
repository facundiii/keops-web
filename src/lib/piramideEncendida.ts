// La pirámide encendida: la animación de la portada del aniversario, en canvas 2D y sin librerías.
//
// Recrea el flyer: una pirámide doble de piedra flota sobre el mar al atardecer, se agrieta
// con lava, se abre por la franja del medio dejando ver el fuego de adentro y se vuelve a armar.
// Una vuelta dura 14 s, como el reel. Se frena fuera de pantalla y con la pestaña oculta.
// Con "reducir movimiento" sigue viva pero más suave: gira más lento, se abre menos y no tira esquirlas.

type V3 = [number, number, number];
type Tri = [V3, V3, V3];

interface Fragmento {
  v: Tri;
  dentro: Tri;
  centro: V3;
  n: V3;
  dir: V3;
  peso: number;
  eje: V3;
  giro: number;
  brillo: number;
  tono: number;
  /** 1 en la franja del medio, 0 en las puntas: ahí se concentra la lava */
  banda: number;
  /** Por borde: quiebre de la veta [a 1/3, a 2/3] y si el borde va al revés de su sentido canónico */
  vetas: { j1: number; j2: number; invertida: boolean }[];
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
  /** Hasta dónde puede subir la punta (px desde arriba del lienzo) */
  techo: number;
  /** Línea del horizonte (px desde arriba del lienzo) */
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
const unidad = (a: V3): V3 => por(a, 1 / (Math.hypot(a[0], a[1], a[2]) || 1));
const mezcla = (a: V3, b: V3, t: number): V3 => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];

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

/** Número fijo para un borde: los dos fragmentos que lo comparten dibujan la misma veta. */
function claveBorde(a: V3, b: V3): { semilla: number; invertida: boolean } {
  const txt = (p: V3) => p.map((x) => x.toFixed(3)).join(",");
  const ta = txt(a), tb = txt(b);
  const invertida = ta > tb;
  const clave = invertida ? tb + "|" + ta : ta + "|" + tb;
  let h = 2166136261;
  for (let i = 0; i < clave.length; i++) h = Math.imul(h ^ clave.charCodeAt(i), 16777619);
  return { semilla: h >>> 0, invertida };
}

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

// ── La pirámide, partida en fragmentos ──────────────────────────
function armarFragmentos(): Fragmento[] {
  const azar = crearAzar(57);
  const entre = (a: number, b: number) => a + (b - a) * azar();
  // Pirámide doble: la de arriba más alta, la de abajo invertida y más corta (como el flyer)
  const ARRIBA: V3 = [0, -1.32, 0];
  const ABAJO: V3 = [0, 1.0, 0];
  const ANILLO: V3[] = [[1, 0, 0], [0, 0, 1], [-1, 0, 0], [0, 0, -1]];
  const caras: Tri[] = [];
  for (let i = 0; i < 4; i++) {
    const a = ANILLO[i];
    const b = ANILLO[(i + 1) % 4];
    caras.push([ARRIBA, a, b], [ABAJO, b, a]);
  }
  const jit = () => 0.5 + entre(-0.13, 0.13);
  const partir4 = ([a, b, c]: Tri): Tri[] => {
    const ab = mezcla(a, b, jit()), bc = mezcla(b, c, jit()), ca = mezcla(c, a, jit());
    return [[a, ab, ca], [ab, b, bc], [ca, bc, c], [ab, bc, ca]];
  };
  const partir3 = ([a, b, c]: Tri): Tri[] => {
    const u = entre(0.2, 0.5), v = entre(0.2, 0.5), w = 1 - u - v;
    const g: V3 = [a[0] * u + b[0] * v + c[0] * w, a[1] * u + b[1] * v + c[1] * w, a[2] * u + b[2] * v + c[2] * w];
    return [[a, b, g], [b, c, g], [c, a, g]];
  };

  const fragmentos: Fragmento[] = [];
  for (const cara of caras) {
    for (const t of partir4(cara)) {
      const piezas = azar() < 0.6 ? partir3(t) : [t];
      for (const pieza of piezas) {
        let [a, b, c] = pieza;
        const centro = por(suma(suma(a, b), c), 1 / 3);
        let n = unidad(cruz(resta(b, a), resta(c, a)));
        if (punto(n, centro) < 0) {
          [b, c] = [c, b];
          n = por(n, -1);
        }
        // La franja del medio se abre; las puntas casi no se mueven
        const banda = Math.pow(Math.max(0, 1 - Math.abs(centro[1]) / 0.95), 1.3);
        const espesor = entre(0.07, 0.13);
        const v: Tri = [a, b, c];
        fragmentos.push({
          v,
          dentro: v.map((p) => resta(p, por(n, espesor))) as Tri,
          centro,
          n,
          dir: unidad(suma(unidad(centro), [entre(-0.2, 0.2), entre(-0.15, 0.15), entre(-0.2, 0.2)])),
          peso: (0.12 + 1.05 * banda) * entre(0.7, 1.3),
          eje: unidad([entre(-1, 1), entre(-1, 1), entre(-1, 1)]),
          giro: entre(-0.5, 0.5) * (0.3 + banda),
          brillo: entre(0.35, 1),
          tono: entre(-0.05, 0.05),
          banda,
          vetas: [0, 1, 2].map((i) => {
            const { semilla, invertida } = claveBorde(v[i], v[(i + 1) % 3]);
            const r = crearAzar(semilla);
            return { j1: (r() - 0.5) * 0.2, j2: (r() - 0.5) * 0.2, invertida };
          }),
        });
      }
    }
  }
  return fragmentos;
}

// ── Línea de tiempo: 14 s, como el reel ─────────────────────────
const VUELTA = 14;
const suave = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
function apertura(t: number): number {
  const u = t % VUELTA;
  if (u < 2) return 0.03;
  if (u < 6) return 0.03 + 0.3 * suave((u - 2) / 4);
  if (u < 8.5) return 0.33 + 0.52 * suave((u - 6) / 2.5);
  if (u < 11) return 0.85 + 0.05 * Math.sin(((u - 8.5) / 2.5) * Math.PI);
  return 0.85 - 0.82 * suave((u - 11) / 3);
}

const LUZ = unidad([-0.5, -0.75, -0.55]);
const CAMARA = 4.2;
/** La vuelta arranca ya en la fase de grietas: la primera apertura llega cuando el texto terminó de entrar (~3 s). */
const TIEMPO_INICIAL = 3.5;

export function iniciarPiramide(
  canvas: HTMLCanvasElement,
  opciones: { medir: () => MedidasPortada; suave: boolean }
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

  // Textura de piedra
  const ruido = document.createElement("canvas");
  ruido.width = ruido.height = 128;
  const nctx = ruido.getContext("2d");
  if (nctx) {
    const img = nctx.createImageData(128, 128);
    for (let i = 0; i < img.data.length; i += 4) {
      const g = 90 + azar() * 120;
      img.data[i] = img.data[i + 1] = img.data[i + 2] = g;
      img.data[i + 3] = 255;
    }
    nctx.putImageData(img, 0, 0);
  }
  let patron: CanvasPattern | null = null;

  // Medidas
  let W = 0, H = 0, DPR = 1, horizonte = 0, escala = 0, cx = 0, cy = 0;
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
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = canvas.clientWidth;
    H = canvas.clientHeight;
    if (!W || !H) return;
    for (const c of [canvas, reflejo, fondo]) {
      c.width = Math.round(W * DPR);
      c.height = Math.round(H * DPR);
    }
    for (const c of [ctx, rctx, fctx]) c?.setTransform(DPR, 0, 0, DPR, 0, 0);
    patron = ctx?.createPattern(ruido, "repeat") ?? null;
    const movil = W < 768;
    // La pirámide ocupa el lugar que deja el texto: el horizonte pasa por el medio de KEOPS
    // y la punta no toca la fecha. En pantallas anchas la punta de abajo baja detrás de "ANIVERSARIO".
    const m = opciones.medir();
    horizonte = m.horizonte;
    const piso = horizonte - (movil ? 40 : -6);
    const disponible = Math.max(120, piso - m.techo);
    escala = Math.min(W * (movil ? 0.4 : 0.2), disponible / 2.32);
    cx = W / 2;
    cy = m.techo + (disponible - 2.32 * escala) * 0.5 + 1.32 * escala;
    pintarFondo();
    brillos.length = 0;
    const b = crearAzar(1212);
    for (let i = 0; i < 170; i++) {
      const prof = Math.pow(b(), 1.6);
      brillos.push({ x: (b() - 0.5) * (40 + prof * W * 0.55), y: prof * (H - horizonte), l: 6 + b() * (18 + prof * 60), f: b() * 6.28, v: 1 + b() * 3 });
    }
  }

  const esquirlas: Esquirla[] = [];
  function soltarEsquirla(rotY: number, rotX: number, rotZ: number) {
    const ang = entre(0, Math.PI * 2);
    const base: V3 = [Math.cos(ang) * entre(0.6, 1), entre(-0.35, 0.35), Math.sin(ang) * entre(0.6, 1)];
    const p = girar(base, rotY, rotX, rotZ);
    const vel = por(unidad(suma(p, [0, entre(-0.25, 0.15), 0])), entre(0.35, 0.9));
    vel[2] = Math.max(vel[2], -0.12); // salen hacia los costados, no contra la cámara
    esquirlas.push({
      p,
      vel,
      tam: entre(0.014, 0.05),
      ang: entre(0, 6.28),
      vang: entre(-3, 3),
      vida: 0,
      dura: entre(2.2, 4.2),
      forma: [0, 1, 2, 3].map((i) => {
        const a = i * 1.57 + entre(-0.5, 0.5);
        const r = entre(0.6, 1.2);
        return [Math.cos(a) * r, Math.sin(a) * r] as [number, number];
      }),
    });
  }

  const proyectar = (p: V3): [number, number, number] => {
    const k = CAMARA / (CAMARA + p[2]);
    return [cx + p[0] * escala * k, cy + p[1] * escala * k, k];
  };

  let tPrevio = 0;
  function cuadro(t: number) {
    if (!ctx || !rctx || !W) return;
    // La luz no es movimiento: el fuego sigue la apertura completa también en el modo suave;
    // ahí solo se reducen el desplazamiento, el giro y las esquirlas.
    const luz = apertura(t);
    const E = luz * (modoSuave ? 0.45 : 1);
    const titileo = modoSuave ? 0.5 : 1;
    const fuego = Math.min(1.15, 0.5 + 0.6 * Math.pow(luz, 0.8) + titileo * (0.07 * Math.sin(t * 7.3) + 0.05 * Math.sin(t * 12.9)));
    const vel = modoSuave ? 0.5 : 1;
    const rotY = t * 0.32 * vel, rotX = 0.3 + 0.08 * Math.sin(t * 0.35), rotZ = -0.16 + 0.05 * Math.sin(t * 0.27);

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

    const lista = fragmentos
      .map((f) => {
        const desplazo = por(f.dir, E * f.peso * 0.42);
        const ang = E * f.giro;
        const mover = (v: V3) => girar(suma(suma(girarEje(resta(v, f.centro), f.eje, ang), f.centro), desplazo), rotY, rotX, rotZ);
        const pts = f.v.map(mover) as Tri;
        const dentro = f.dentro.map(mover) as Tri;
        const n = girar(girarEje(f.n, f.eje, ang), rotY, rotX, rotZ);
        return { f, pts, dentro, n, z: (pts[0][2] + pts[1][2] + pts[2][2]) / 3 };
      })
      .sort((a, b) => b.z - a.z);

    const trazar = (p: [number, number, number][]) => {
      rctx.beginPath();
      rctx.moveTo(p[0][0], p[0][1]);
      rctx.lineTo(p[1][0], p[1][1]);
      rctx.lineTo(p[2][0], p[2][1]);
      rctx.closePath();
    };

    // Vetas de lava: cada borde se quiebra en dos puntos, igual en los dos fragmentos que lo comparten
    const trazarVetas = (p: [number, number, number][], f: Fragmento) => {
      rctx.beginPath();
      for (let i = 0; i < 3; i++) {
        const veta = f.vetas[i];
        let a = p[i], b = p[(i + 1) % 3];
        if (veta.invertida) [a, b] = [b, a];
        const dx = b[0] - a[0], dy = b[1] - a[1];
        const largo = Math.hypot(dx, dy) || 1;
        const nx = -dy / largo, ny = dx / largo;
        rctx.moveTo(a[0], a[1]);
        rctx.lineTo(a[0] + dx / 3 + nx * largo * veta.j1, a[1] + dy / 3 + ny * largo * veta.j1);
        rctx.lineTo(a[0] + (2 * dx) / 3 + nx * largo * veta.j2, a[1] + (2 * dy) / 3 + ny * largo * veta.j2);
        rctx.lineTo(b[0], b[1]);
      }
    };

    const pintarFragmento = ({ f, pts, dentro, n }: (typeof lista)[number]) => {
      // Espesor de roca: la cara de atrás del fragmento, tomada por el fuego (más en la franja del medio)
      const calor = fuego * f.brillo * (0.3 + 0.7 * f.banda);
      trazar(dentro.map(proyectar));
      rctx.fillStyle = `rgb(${Math.round(34 + 150 * calor)},${Math.round(20 + 55 * calor)},${Math.round(14 + 8 * calor)})`;
      rctx.fill();
      const p = pts.map(proyectar);
      trazar(p);
      if (n[2] > 0) {
        // Cara interna: roca oscura que toma la luz de la lava
        rctx.fillStyle = `rgb(${Math.round(70 + 140 * calor)},${Math.round(28 + 70 * calor)},${Math.round(12 + 10 * calor)})`;
        rctx.fill();
        if (patron) {
          rctx.globalAlpha = 0.18;
          rctx.fillStyle = patron;
          rctx.fill();
          rctx.globalAlpha = 1;
        }
        return;
      }
      const lam = Math.max(0, punto(n, LUZ));
      const lado = Math.max(0, 1 - Math.abs(n[2])) * 0.5; // el canto que toma el atardecer
      const v = 0.11 + 0.52 * lam + f.tono;
      rctx.fillStyle = `rgb(${Math.round(255 * v * 0.42 + 190 * lado)},${Math.round(255 * v * 0.42 + 90 * lado)},${Math.round(255 * v * 0.46 + 50 * lado)})`;
      rctx.fill();
      if (patron) {
        rctx.globalAlpha = 0.14;
        rctx.fillStyle = patron;
        rctx.fill();
        rctx.globalAlpha = 1;
      }
      // Vetas de lava: encendidas desde el primer cuadro en la franja del medio, casi apagadas en las puntas
      const a = Math.min(1, fuego * (0.1 + 0.9 * f.banda) * (0.55 + 0.45 * f.brillo));
      trazarVetas(p, f);
      rctx.globalCompositeOperation = "lighter";
      rctx.lineJoin = "round";
      rctx.strokeStyle = `rgba(255,90,10,${0.3 * a})`;
      rctx.lineWidth = 2.5 + 4 * f.banda;
      rctx.stroke();
      rctx.strokeStyle = `rgba(255,205,110,${0.9 * a})`;
      rctx.lineWidth = 0.8 + 0.8 * f.banda;
      rctx.stroke();
      rctx.globalCompositeOperation = "source-over";
    };

    // Las esquirlas se apagan cuando la pirámide se cierra: la fase quieta queda limpia
    const restoEsquirlas = Math.max(0, Math.min(1, (E - 0.12) / 0.25));
    const pintarEsquirla = (e: Esquirla) => {
      // Cerca de la cámara la perspectiva las agranda de más: ahí no se dibujan
      if (CAMARA + e.p[2] < 1.6) return;
      const [x, y, k] = proyectar(e.p);
      const s = Math.min(e.tam * escala * k, e.tam * escala * 2.2);
      rctx.save();
      rctx.translate(x, y);
      rctx.rotate(e.ang);
      rctx.globalAlpha = Math.max(0, Math.min(1, (e.dura - e.vida) / 0.8, e.vida / 0.2) * restoEsquirlas);
      rctx.beginPath();
      e.forma.forEach(([px, py], i) => (i ? rctx.lineTo(px * s, py * s) : rctx.moveTo(px * s, py * s)));
      rctx.closePath();
      rctx.fillStyle = "#1c1a1b";
      rctx.fill();
      rctx.strokeStyle = `rgba(255,${130 + 70 * fuego},50,${0.8 * fuego})`;
      rctx.lineWidth = 1;
      rctx.stroke();
      rctx.restore();
      rctx.globalAlpha = 1;
    };

    // Esquirlas: nacen mientras la pirámide está abierta (no en el modo suave),
    // y no en los primeros 3 s, mientras entra el texto
    const dt = Math.max(0, Math.min(0.05, t - tPrevio));
    tPrevio = t;
    if (!modoSuave && t - TIEMPO_INICIAL > 3 && E > 0.2 && azar() < E * 22 * dt) soltarEsquirla(rotY, rotX, rotZ);
    for (let i = esquirlas.length - 1; i >= 0; i--) {
      const e = esquirlas[i];
      e.vida += dt;
      e.ang += e.vang * dt;
      e.p = suma(e.p, por(e.vel, dt * (0.9 + E)));
      if (e.vida > e.dura || restoEsquirlas === 0) esquirlas.splice(i, 1);
    }

    for (const e of esquirlas) if (e.p[2] > 0) pintarEsquirla(e);
    for (const item of lista) if (item.z > 0) pintarFragmento(item);

    // El fuego de adentro
    const [gx, gy] = proyectar([0, -0.05, 0]);
    const r = escala * (0.55 + 0.75 * E);
    const nucleo = rctx.createRadialGradient(gx, gy, 0, gx, gy, r);
    nucleo.addColorStop(0, `rgba(255,246,205,${Math.min(1, 0.25 + fuego * 0.8)})`);
    nucleo.addColorStop(0.3, `rgba(255,177,59,${0.6 * fuego})`);
    nucleo.addColorStop(0.7, `rgba(255,90,10,${0.28 * fuego})`);
    nucleo.addColorStop(1, "rgba(255,80,0,0)");
    rctx.globalCompositeOperation = "lighter";
    rctx.fillStyle = nucleo;
    rctx.beginPath();
    rctx.arc(gx, gy, r, 0, Math.PI * 2);
    rctx.fill();
    rctx.globalCompositeOperation = "source-over";

    for (const item of lista) if (item.z <= 0) pintarFragmento(item);
    for (const e of esquirlas) if (e.p[2] <= 0) pintarEsquirla(e);

    // Reflejo en el agua, ondulado
    const alto = Math.min((H - horizonte) * 0.75, horizonte);
    const paso = W < 768 ? 3 : 2;
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
      const a = 0.12 + 0.35 * fuego * (0.5 + 0.5 * Math.sin(tAgua * b.v + b.f));
      ctx.fillStyle = `rgba(255,190,110,${a * (1 - b.y / (H - horizonte))})`;
      ctx.fillRect(cx + b.x - b.l / 2, horizonte + 2 + b.y, b.l, 1.2);
    }
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "rgba(255,220,170,.35)";
    ctx.fillRect(0, horizonte, W, 1);
  }

  // Bucle: corre solo en pantalla, con la pestaña visible y sin pausa.
  let corriendo = false, visible = true, enPausa = false, raf = 0, tiempo = TIEMPO_INICIAL, ultimo = 0;
  const loop = (now: number) => {
    tiempo += Math.min(0.05, (now - ultimo) / 1000);
    ultimo = now;
    cuadro(tiempo);
    raf = requestAnimationFrame(loop);
  };
  const arrancar = () => {
    if (corriendo || !visible || document.hidden || enPausa) return;
    corriendo = true;
    ultimo = performance.now();
    raf = requestAnimationFrame(loop);
  };
  const parar = () => {
    corriendo = false;
    cancelAnimationFrame(raf);
  };

  const observador = new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    if (visible) arrancar();
    else parar();
  });
  observador.observe(canvas);
  const alCambiarPestana = () => (document.hidden ? parar() : arrancar());
  document.addEventListener("visibilitychange", alCambiarPestana);

  medir();
  cuadro(tiempo);
  arrancar();

  return {
    pausar(pausa) {
      enPausa = pausa;
      if (pausa) parar();
      else arrancar();
    },
    remedir() {
      medir();
      cuadro(tiempo);
    },
    destruir() {
      parar();
      observador.disconnect();
      document.removeEventListener("visibilitychange", alCambiarPestana);
    },
  };
}
