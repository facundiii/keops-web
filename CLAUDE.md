# Keops web: reglas de UI

Next.js 16 + Tailwind 3 + TypeScript. Sitio oscuro, sobrio, dorado como único acento.
Estas reglas son estrictas: si algo no entra en ellas, preguntá antes de inventar un valor nuevo.
El código existente puede tener excepciones viejas; no las copies en código nuevo.

El sistema completo está en `DESIGN.md` (tokens, componentes y reglas) y el producto en `PRODUCT.md`
(públicos, posicionamiento y voz). Leelos antes de diseñar algo nuevo.

## Tipografía: una sola combinación

- **Outfit** para títulos, **Inter** para todo lo demás (texto, botones, antetítulos, formularios).
- **Cormorant Garamond itálica 500** solo como acento, con la clase `.acento`, máximo una vez por sección.
- **NotoEgyptian** (`font-jeroglifico`) solo como ornamento, nunca para texto que haya que leer.
- No agregues fuentes, pesos ni estilos. Las fuentes se cargan en `src/app/layout.tsx`.
- Tamaños: solo las clases de la escala de `src/app/globals.css`:
  `.titulo-display`, `.titulo-1`, `.titulo-2`, `.titulo-3`, `.destacado`, `.cuerpo`, `.texto-chico`, `.antetitulo`,
  `.texto-boton` (botones y enlaces con flecha), `.etiqueta`, `.enlace-menu`, `.cifra`, `.numeral`, `.acento-grande`.
  `text-sm` / `text-xs` solo en piezas chicas de interfaz que no tengan rol. Nunca `text-[...]` ni `tracking-[...]`.

## Color: tokens fijos

Solo existen estos colores (`tailwind.config.ts` reemplaza la paleta de Tailwind a propósito):

| Token | Valor | Uso |
|---|---|---|
| `negro` | `#0A0A0A` | fondo general |
| `carbon` | `#161412` | tarjetas y superficies |
| `piedra` | `#2A2621` | bordes y divisores |
| `marfil` | `#F0ECE4` | texto principal |
| `arena` | `#A89F91` | texto secundario |
| `oro` | `#C9A961` | acento, botones principales, antetítulos |
| `oro-profundo` | `#A88A45` | hover y presionado del dorado |
| `laser` | `#A970FF` | SOLO en Disco, en detalles |
| `whatsapp` | `#25D366` | SOLO en el botón de WhatsApp |
| `lava`, `brasa`, `hielo`, `cielo-noche` | flyer | SOLO en la versión especial del aniversario (`src/components/aniversario/`) |

- Nada de hex, `rgb()` ni colores sueltos en componentes. Los modificadores de opacidad (`bg-oro/10`) están bien.
- Si cambia un token, cambialo en `tailwind.config.ts` y en `:root` de `globals.css` a la vez.
- Sin degradés decorativos ni glassmorphism. Los degradés negros van solo sobre fotos o video, para que se lea el texto, con las clases `.velo-*` de `globals.css` (no `bg-gradient-*` a mano).
- Plano en reposo: la única luz es el borde oro con un halo dorado suave (`shadow-halo`) en hover o foco (`DESIGN.md`, "La regla de la luz al tocar"). Nada brilla en reposo. Sombras: solo `shadow-halo` y `shadow-flotante`.

## Espaciado: escala de 4 px

- Usá solo estos pasos de Tailwind: `1 2 3 4 6 8 10 12 16 24` (4, 8, 12, 16, 24, 32, 40, 48, 64 y 96 px).
- Sin valores arbitrarios (`p-[13px]`). Excepciones: áreas táctiles `min-h-[44px]` / `min-w-[44px]` y `aspect-[...]`.
- Secciones: siempre con `<Seccion>` de `src/components/ui/Seccion.tsx`
  (`py-16 lg:py-24`, `px-4 sm:px-6 lg:px-8`, anchos `angosto | medio | ancho | amplio`).
  Lo que va alineado a la izquierda no indica ancho: cae sobre la misma línea que el navbar y el pie
  (`DESIGN.md`, "La regla de la línea única"). `amplio` es solo para una grilla de tarjetas con foto.
- El aire de arriba de una primera vista sale de `.bajo-navbar` (no `pt-32`).
- Encabezados de bloque: `<TituloSeccion>` (antetítulo + H2 + bajada, `mb-10 lg:mb-12`).
- Radios: `rounded-full` en botones y chips, `rounded-2xl` en tarjetas y fotos, `rounded-xl` en piezas internas.

## Íconos: Lucide

- Solo `lucide-react`. Tamaños `16`, `20` o `24`, siempre `strokeWidth={1.5}`, color heredado (`currentColor`).
- Excepción única: logos de marca que Lucide no tiene (WhatsApp: `src/components/ui/IconoWhatsApp.tsx`).
- Nada de emojis como íconos ni de otras librerías (react-icons, heroicons, SVG copiados).
- Ícono decorativo: `aria-hidden="true"`. Botón solo con ícono: `aria-label` y área de 44 px como mínimo.

## Primera vista: sin botones, en todas las páginas

- Nunca botones en la primera vista de ninguna página (decisión del dueño): ni en el hero o el encabezado, ni el "Contacto" dorado (va en texto hasta bajar), ni el WhatsApp flotante (aparece al bajar). Ver `usePasoPortada`. Una pausa de video o animación va oculta hasta que llega el foco del teclado.
- Las versiones especiales (como el aniversario) se configuran en `src/config/` con fecha de fin y se apagan solas (`SegunFecha`).

## Componentes

- Botones: siempre `<Boton>` / `claseBoton()` de `src/components/ui/Boton.tsx`
  (variantes `principal`, `secundario`, `whatsapp`). No armes otro botón.
- Antetítulos: `<Antetitulo>` o la clase `.antetitulo`.
- Reutilizá lo que ya está en `src/components/` antes de crear algo nuevo.

## Para no caer en lo genérico

- Nada de hero con degradé, tarjetas con sombra genérica, un ícono encima de cada título ni grillas de tres tarjetas iguales por reflejo.
- El dorado es escaso: un acento por vista, no en todos los elementos.
- Las animaciones salen de `tailwind.config.ts`; `globals.css` ya las apaga con `prefers-reduced-motion`, no lo saltees.
- Nada sale oculto del servidor esperando un script: el contenido y el cursor del sistema tienen que verse sin JavaScript (`FadeInSection`, `CustomCursor`).

## Antes de dar algo por terminado

- `npm run lint` y `npm run build` sin errores.
- Mirá el resultado en 375 px y 1280 px (`node capturas/capturar.mjs <carpeta> <ruta>` con el dev server prendido).
