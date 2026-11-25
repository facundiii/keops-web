# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Keops tiene cuatro públicos. **Ninguno tiene prioridad sobre otro**: cuando una decisión obliga a elegir, el sitio reparte el peso entre las líneas en lugar de favorecer una (confirmado).

- **Público de la noche (Disco y Fusion):** gente que sale en Villa Carlos Paz, sobre todo en la temporada de verano. Quiere saber qué noche abre, quién pasa música y sacar la entrada.
- **Agencias de viaje de egresados (primario y secundario):** arman el viaje y contratan la fiesta. Necesitan argumentos para vender el paquete. En primario (matinée), algo que puedan reenviar a las familias. En secundario (17 y 18 años, la noche de egresados) el foco es la fiesta, no la seguridad.
- **Quienes organizan un evento privado:** casamientos, cumpleaños, celebraciones y eventos de empresa (Institucionales se sumó a Eventos privados).
- **Aspirantes a bartender (Academia):** quieren aprender el oficio en la academia de Keops.

## Product Purpose

El sitio de Keops (keops.ar) presenta el boliche de Villa Carlos Paz, Córdoba, abierto desde 1969, y sus cuatro líneas: Disco, Egresados, Eventos privados (incluye los eventos de empresa) y Academia, además de Fusion. A cada visitante lo lleva a su línea y al contacto de esa línea (WhatsApp, mail e Instagram propios).

**Medida de éxito confirmada: entradas vendidas.** Que el público de Disco y Fusion llegue desde la cartelera a la app de entradas. Los pedidos por WhatsApp de las demás líneas siguen siendo parte del sitio, pero no se eligieron como medida de éxito.

## Positioning

**La pirámide.** Keops es "la pirámide de Carlos Paz": el techo piramidal de la Pista Central y el edificio que es un ícono de la ciudad. Es lo único que ningún otro boliche de Carlos Paz puede decir con verdad (confirmado). La trayectoria desde 1969 y la escala (5.000 personas, 5 espacios) acompañan, pero el argumento central es la pirámide.

## Operating Context

- **Temporada:** en verano es la temporada más intensa de Carlos Paz; el resto del año hay noches especiales.
- **Entradas:** se sacan desde la app de entradas. La cartelera de Disco y la sección Tickets de Fusion llevan ahí.
- **Ubicación:** se recomienda llegar en auto, taxi o remis. En los textos no se remarca que está fuera del centro (decisión del dueño). Mapa: https://maps.app.goo.gl/NTLZpL4MJ9mrNuCR7
- **Contacto por línea** (`src/config/contacto.ts`):

  | Línea | Mail | WhatsApp |
  | --- | --- | --- |
  | Disco y Fusion | rrpp@keops.ar | +54 9 3541 637856 |
  | Egresados | egresados@keops.ar | +54 9 3541 580808 |
  | Eventos privados | eventos@keops.ar | +54 9 3541 579786 |
  | Academia | a completar | a completar |

- **Instagram por página:** @keopsprimarios (Egresados primario), @keopsecundarios (Egresados secundario), @keopsoficial (resto del sitio).
- **Agencias:** piden propuesta con un formulario corto (agencia, nivel, cantidad de chicos, fecha estimada) que arma un mensaje de WhatsApp al número de Egresados. No se guarda nada en un servidor.
- **Fusion:** las tres discos más importantes de Villa Carlos Paz (Keops, Khalama y Molino) juntas para hacer noches especiales.
- **Contenido editable:** todo el contenido vive en `src/config/`, para que se complete sin tocar componentes.

## Capabilities and Constraints

- **Páginas:** `/` (home), `/nosotros`, `/egresados`, `/egresados/primarios`, `/egresados/secundarios`, `/eventos` (`/institucionales` redirige acá), `/disco`, `/academia`, `/fusion`, `/preguntas-frecuentes`.
- **Plantilla común** para Egresados (primario y secundario) y Eventos privados: encabezado, por qué Keops, qué incluye, galería, referencias, preguntas frecuentes de la línea y contacto.
- **Un bloque sin datos no se muestra.** Un campo vacío oculta su bloque en el sitio publicado. En desarrollo, los huecos se rellenan con contenido de ejemplo marcado con una etiqueta ("De ejemplo: no se publica") que nunca entra en el build.
- **Fechas que se ocultan solas:** la cartelera esconde las noches pasadas comparando con la fecha actual.
- **Publicación con permiso:** las preguntas frecuentes y los hitos de la historia solo se publican con `confirmado: true`; logos de agencias y referencias, con `autorizado: true`.
- **Galerías:** solo se muestran con 6 imágenes o más, o con un video.
- **Stack:** Next.js 16, React 19, Tailwind 3, TypeScript. Deploy en Netlify (`netlify.toml`).
- **Sin decidir o sin cargar** (detalle en `CONTENIDO-PENDIENTE.md`): dirección de Keops, cartelera, datos de Academia, URL de Fusion, edad mínima para entrar, cuidado de los chicos en egresados, capacidad y descripción de cada espacio.

## Brand Commitments

- **Nombre:** Keops. **Isotipo:** solo el triángulo (`public/logo-piramide.png`), sin la palabra KEOPS.
- **Frases propias:** "La pirámide de Carlos Paz", "Desde 1969", "Generaciones enteras bailaron bajo esta pirámide."
- **Voz:** voseo siempre ("Pedí", nunca "Solicite"). Frases cortas y concretas, datos antes que adjetivos. Sin emoji.
- **Nada que venza:** "trayectoria desde 1969", nunca "57 años" ni "más de 50 años"; nunca "cada semana".
- **Sin comparación con hoteles** en los textos de Egresados (decisión de revisión).
- **Textos de botones:** "Comprar entrada", "Pedir propuesta", "Armá tu evento", "Escribinos por WhatsApp", "Ver cartelera", "Agotado".
- **Fusion:** sin su logo en el navbar; los logos de Keops, Khalama y Molino pueden ir dentro de su página.

## Evidence on Hand

- **Fotos** (`public/fotos/`, mapeadas en `src/config/fotos.ts`): 10 fotos optimizadas. `01-pista-central-piramide.jpg` es la única que muestra el techo de la pirámide desde adentro y es la más valiosa. `09-historia-exterior-2010.jpg` es de baja resolución: siempre chica.
- **Video:** `public/hero-video.mp4` (hero de la home) y 3 videos en la galería de Egresados secundario.
- **Cifras reales:** 5.000 personas, 5 espacios (Pista Central, Salón Eletón, Salón Bar, Keops Garden, Salón VIP), apertura en 1969.
- **Historia:** 5 hitos cargados (1969, 2010, 2019, 2020, septiembre 2021), todos sin confirmar.
- **Referencias:** logos de agencias (Flecha, Super Tour, Astros, Púrpura, Auckland) y de Sancor Seguros y FIE, todos sin autorizar.
- **No hay y no se inventan:** testimonios, fotos del equipo, fotos de Salón Bar y Keops Garden, párrafos de historia confirmados, capacidad por espacio. El logo de Fusion mide 168 px y no se puede agrandar.

## Product Principles

1. **La pirámide primero.** Lo que solo Keops puede decir va adelante de lo que podría decir cualquier boliche.
2. **Cinco líneas, mismo peso.** Cada visitante encuentra su línea y su contacto sin pasar por las de otros.
3. **Camino corto a la entrada.** Desde cualquier noche publicada hay un solo paso hasta comprar.
4. **Nada inventado, nada vacío.** Un dato que falta oculta su bloque; nunca relleno publicado.
5. **Nada que venza.** Fechas que se ocultan solas y textos que siguen siendo ciertos el año que viene.

## Accessibility & Inclusion

- Respetar `prefers-reduced-motion`. El sonido siempre arranca apagado y solo se activa si la persona lo elige.
- Foco visible para teclado en todo lo interactivo y áreas táctiles de 44 × 44 px como mínimo.
- El texto corrido nunca baja de 16 px.
- Todo se tiene que ver bien a 375 px de ancho, sin scroll horizontal.
- Texto alternativo descriptivo en español en todas las fotos.
