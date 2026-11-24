---
name: Keops
description: La pirámide de Carlos Paz. Disco, egresados, eventos privados, institucionales y academia, desde 1969.
colors:
  negro: "#0A0A0A"
  carbon: "#161412"
  piedra: "#2A2621"
  marfil: "#F0ECE4"
  arena: "#A89F91"
  oro: "#C9A961"
  oro-profundo: "#A88A45"
  laser: "#A970FF"
  whatsapp: "#25D366"
typography:
  titulo-display:
    fontFamily: "Outfit, system-ui, sans-serif"
    fontSize: "clamp(3rem, 1.6rem + 7vw, 7rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.02em"
  titulo-1:
    fontFamily: "Outfit, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 1.55rem + 3vw, 4rem)"
    fontWeight: 700
    lineHeight: 1.05
  titulo-2:
    fontFamily: "Outfit, system-ui, sans-serif"
    fontSize: "clamp(2rem, 1.8rem + 0.85vw, 2.5rem)"
    fontWeight: 700
    lineHeight: 1.12
  titulo-3:
    fontFamily: "Outfit, system-ui, sans-serif"
    fontSize: "clamp(1.25rem, 1.15rem + 0.45vw, 1.5rem)"
    fontWeight: 600
    lineHeight: 1.25
  cuerpo:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(1rem, 0.95rem + 0.25vw, 1.125rem)"
    fontWeight: 400
    lineHeight: 1.6
  texto-chico:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
  antetitulo:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(0.75rem, 0.72rem + 0.12vw, 0.8125rem)"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.2em"
  boton:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "0.1em"
  etiqueta:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.1em"
  acento:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontWeight: 500
  jeroglifico:
    fontFamily: "NotoEgyptian, serif"
rounded:
  lg: "8px"
  xl: "12px"
  2xl: "16px"
  full: "9999px"
spacing:
  "1": "4px"
  "2": "8px"
  "3": "12px"
  "4": "16px"
  "6": "24px"
  "8": "32px"
  "10": "40px"
  "12": "48px"
  "16": "64px"
  "24": "96px"
components:
  boton-principal:
    backgroundColor: "{colors.oro}"
    textColor: "{colors.negro}"
    typography: "{typography.boton}"
    rounded: "{rounded.full}"
    padding: "12px 28px"
    height: "44px"
  boton-principal-hover:
    backgroundColor: "{colors.oro-profundo}"
  boton-secundario:
    backgroundColor: "transparent"
    textColor: "{colors.oro}"
    typography: "{typography.boton}"
    rounded: "{rounded.full}"
    padding: "12px 28px"
    height: "44px"
  boton-secundario-hover:
    backgroundColor: "rgba(201, 169, 97, 0.1)"
  boton-whatsapp:
    backgroundColor: "{colors.whatsapp}"
    textColor: "{colors.negro}"
    typography: "{typography.boton}"
    rounded: "{rounded.full}"
    padding: "12px 28px"
    height: "44px"
  tarjeta:
    backgroundColor: "{colors.carbon}"
    textColor: "{colors.marfil}"
    rounded: "{rounded.2xl}"
    padding: "24px"
  campo:
    backgroundColor: "{colors.carbon}"
    textColor: "{colors.marfil}"
    typography: "{typography.cuerpo}"
    rounded: "{rounded.xl}"
    padding: "0 16px"
    height: "48px"
  etiqueta-fecha:
    backgroundColor: "{colors.laser}"
    textColor: "{colors.negro}"
    typography: "{typography.etiqueta}"
    rounded: "{rounded.full}"
    padding: "4px 12px"
  navbar:
    backgroundColor: "{colors.negro}"
    textColor: "{colors.marfil}"
    height: "64px"
  whatsapp-flotante:
    backgroundColor: "{colors.whatsapp}"
    textColor: "{colors.negro}"
    rounded: "{rounded.full}"
    size: "56px"
---

# Design System: Keops

## Overview

**Creative North Star: "La pirámide encendida"**

Keops se ve como la pirámide de noche: una arquitectura oscura y enorme en la que la luz marca solo lo importante. El negro es el edificio y el oro es la luz que se enciende sobre él: en la acción principal, en el antetítulo que dice a quién se le habla, en el punto de cada año de la historia y en lo que la persona está por tocar. Todo lo demás se queda en la penumbra, en marfil y arena sobre negro.

El clima es **monumental y nocturno**. Monumental en la escala: títulos en Outfit muy pesados, en mayúscula en el hero, y fotos y videos de la pista a todo el ancho. Nocturno en la luz: fondo casi negro con tono tierra, nada de blanco puro y movimiento que aparece despacio, como una pista que se va llenando. La densidad es baja: mucho aire entre bloques, una sola idea por sección.

Las piezas son **táctiles y luminosas**: en reposo son planas y quietas; cuando el mouse pasa por encima o el teclado las enfoca, se encienden en oro. La firma de la marca es la pirámide misma: el isotipo del triángulo y la foto del techo piramidal visto desde adentro. Los jeroglíficos existen solo como ornamento.

**Key Characteristics:**
- Fondo casi negro con tono tierra; el oro aparece como luz, nunca como relleno.
- Outfit pesada para los títulos, Inter para leer y Cormorant itálica como única firma por sección.
- Profundidad por capas de tono (negro, carbón, piedra), no por sombras.
- Lo que se toca es una píldora; lo que contiene es una tarjeta de esquinas suaves.
- Plano en reposo, encendido en oro al pasar el mouse o hacer foco.
- Apariciones lentas y cortas que se apagan con `prefers-reduced-motion`.

## Colors

Una paleta de noche con un solo acento: negros con tono tierra, textos marfil y arena, y un dorado que funciona como luz.

### Primary
- **Oro** (#C9A961): la luz del sistema. Botón principal, antetítulos, ítem activo del menú, punto y año de cada hito de la historia, íconos de check, número de cada argumento y borde de una tarjeta al pasar el mouse. También es el color del foco de teclado.
- **Oro profundo** (#A88A45): el oro presionado. Hover y estado activo del botón principal, fondo de la selección de texto y hover de la barra de scroll. Nunca aparece solo.

### Secondary
- **Láser** (#A970FF): el único color de pista. Solo en la etiqueta de fecha de cada noche de la cartelera de Disco.

### Tertiary
- **WhatsApp** (#25D366): color funcional, no de marca. Solo en el botón de WhatsApp (bloques de contacto, formulario de agencias y botón flotante).

### Neutral
- **Negro** (#0A0A0A): el edificio. Fondo de todas las secciones, del navbar con scroll y del menú de celular; también el texto sobre oro, láser y WhatsApp.
- **Carbón** (#161412): la primera capa sobre el negro. Tarjetas, campos de formulario, menú desplegable y fichas de la cartelera.
- **Piedra** (#2A2621): las juntas. Bordes de tarjetas y fotos, divisores entre secciones, líneas del acordeón, la línea de tiempo y el fondo de un ítem del desplegable en hover.
- **Marfil** (#F0ECE4): texto principal y títulos. Reemplaza al blanco en todo el sitio.
- **Arena** (#A89F91): texto secundario. Bajadas, respuestas del acordeón, datos de contacto y párrafos de tarjetas.

### Named Rules
**La regla 70 / 20 / 10.** En cualquier vista, alrededor de 70 % negro, 20 % marfil y 10 % oro. Si el oro pasa de una décima parte de la pantalla, deja de ser luz.

**La regla del oro como luz.** El oro marca lo importante o lo que se está por tocar. Nunca es fondo de una sección ni relleno decorativo.

**La regla del color de un solo lugar.** El láser vive solo en las etiquetas de fecha de Disco y el verde solo en el botón de WhatsApp. Fuera de ahí no existen.

## Typography

**Display Font:** Outfit (con system-ui y sans-serif)
**Body Font:** Inter (con system-ui y sans-serif)
**Accent Font:** Cormorant Garamond itálica (con Georgia y serif)
**Ornament Font:** NotoEgyptian, jeroglíficos solo como adorno

**Character:** Outfit es geométrica y pesada: da la escala monumental de un edificio. Inter es neutra y clara para leer de noche en el celular. Cormorant itálica aparece una sola vez por sección, como una firma escrita a mano.

### Hierarchy
- **Display** (Outfit 800, de 48 a 112 px, interlineado 0.95, espaciado −0.02em, mayúsculas): solo el título del hero de la home.
- **Título 1** (Outfit 700, de 36 a 64 px, interlineado 1.05): el H1 de cada página interna y los años de la línea de tiempo.
- **Título 2** (Outfit 700, de 32 a 40 px, interlineado 1.12): el título de cada bloque.
- **Título 3** (Outfit 600, de 20 a 24 px, interlineado 1.25): títulos de tarjetas, preguntas del acordeón e ítems del menú de celular.
- **Cuerpo** (Inter 400, de 16 a 18 px, interlineado 1.6): texto corrido y bajadas, en anchos de 576 a 672 px como máximo.
- **Texto chico** (Inter 400, 14 px, interlineado 1.5): datos de contacto, hora y DJs de una noche, notas al pie de un formulario.
- **Antetítulo** (Inter 500, de 12 a 13 px, espaciado 0.2em, mayúsculas, oro): arriba de cada título, dice de qué o a quién habla el bloque.
- **Botón** (Inter 600, 14 px, espaciado 0.1em, mayúsculas): texto de botones y de los enlaces con flecha de las tarjetas.
- **Etiqueta** (Inter 600, 12 px, espaciado 0.1em, mayúsculas): la fecha corta de cada noche.
- **Acento** (Cormorant Garamond itálica 500): frases cortas como "Desde 1969" o el cierre de la home, en tamaño de título.

### Named Rules
**La regla del acento único.** Cormorant itálica aparece como máximo una vez por sección y nunca en un título.

**La regla de la escala cerrada.** Todo texto usa uno de los roles de arriba. No se inventan tamaños, y el texto corrido nunca baja de 16 px.

**La regla de las mayúsculas.** Mayúsculas solo en el display del hero, antetítulos, botones y etiquetas. Los demás títulos llevan mayúscula inicial y `text-wrap: balance`.

## Layout

El sitio se arma con **bandas a todo el ancho**, una por bloque, siempre sobre negro y separadas por una línea piedra arriba. Cada banda tiene aire vertical de 64 px en celular y 96 px desde 1024 px, y márgenes laterales de 16 px, 24 px desde 640 px y 32 px desde 1024 px. Adentro, el contenido se centra en uno de cuatro anchos: angosto (768 px) para texto y cierres, medio (1024 px), ancho (1152 px, el de siempre) y amplio (1280 px) para grillas de tarjetas. El encabezado de un bloque (antetítulo, título 2 y bajada) deja 40 px abajo, 48 px desde 1024 px.

Hay dos aperturas de página. La home abre con un **hero a pantalla completa** (100 svh) con video de fondo y el texto apoyado abajo a la izquierda. Las páginas internas abren con un **encabezado centrado**: antetítulo, título 1, bajada y botón; con foto de fondo es más alto.

Las grillas se piensan desde 375 px. La home ordena las líneas en una grilla de seis columnas desde 1024 px: las dos primeras tarjetas ocupan media fila cada una y las otras tres, un tercio. Los argumentos van en una, dos o cuatro columnas. La cartelera es un carrusel que muestra el 85 % de una ficha en celular, dos fichas desde 640 px y tres desde 1024 px. El navbar cambia a menú de celular por debajo de 1024 px.

**La regla de la banda con junta.** Cada bloque es una banda negra con una línea piedra arriba. No se alternan fondos entre secciones ni hay cajas que corten la banda.

## Elevation & Depth

El sistema es **plano en reposo**. La profundidad sale de capas de tono: el negro es el suelo, el carbón es la primera capa (tarjetas, campos, desplegables) y el piedra, el borde que separa una capa de otra. Sobre fotos y video, un velo y un degradé negros oscurecen lo justo para que se lea el texto; son funcionales, no decorativos. Hay dos velos: el **fuerte** (negro al 60 % más un degradé) para fotos cargadas de detalle, y el **suave** (solo un degradé que nace negro detrás del texto y se aclara hacia arriba) para fotos donde lo que se ve es el argumento, como el techo de la pirámide. El navbar con scroll usa negro al 95 % con desenfoque de fondo.

La luz aparece como respuesta: al pasar el mouse o hacer foco, el borde de una pieza se enciende en oro y la acompaña un **halo dorado suave**. Esta dirección está confirmada pero todavía no está aplicada en el código: hoy la respuesta es solo el borde oro y una leve escala de la foto.

### Shadow Vocabulary
- **Flotante** (`box-shadow: 0 10px 15px -3px rgb(10 10 10 / 0.6), 0 4px 6px -4px rgb(10 10 10 / 0.6)`): la única sombra en uso. Separa el botón flotante de WhatsApp del contenido que pasa por debajo.
- **Halo dorado** (`box-shadow: 0 0 24px rgb(201 169 97 / 0.25)`): valor provisional hasta implementarlo. Solo en hover o foco de tarjetas y botones, junto con el borde oro.

### Named Rules
**La regla de la luz al tocar.** Nada brilla en reposo. El borde oro y el halo dorado aparecen solo como respuesta a hover o foco y se apagan al salir.

**La regla de las capas.** Para separar planos se sube de negro a carbón y se marca la junta en piedra. No se usan sombras para dar profundidad.

## Shapes

El lenguaje de formas es de dos piezas: **lo que se toca es una píldora** (botones, etiquetas de fecha, puntos del carrusel, flechas circulares y botón flotante) y **lo que contiene es una tarjeta** de esquinas suaves de 16 px (tarjetas, fotos, formularios y fichas). Por dentro de una tarjeta, las piezas bajan a 12 px (campos, menú desplegable, arte de una noche) y los ítems del desplegable a 8 px. Todo borde es de 1 px en piedra y pasa a oro al tocarlo. Las fotos siempre van dentro de una tarjeta con borde, nunca sueltas con esquinas rectas.

La geometría propia es el **triángulo**: el isotipo de la pirámide firma la ficha de cada noche y reemplaza al arte cuando falta. Una raya corta de oro (48 × 1 px) introduce la frase de cierre de la home.

**La regla de la píldora y la tarjeta.** No hay esquinas rectas ni otros radios: 9999 px para lo que se toca y 16 px para lo que contiene (12 px y 8 px solo adentro).

## Components

### Buttons
Firmes, en mayúsculas, con la luz puesta en el principal.
- **Shape:** píldora (9999 px), al menos 44 px de alto, 12 px × 28 px de relleno y 10 px entre ícono y texto.
- **Principal:** fondo oro, texto negro. Uno por bloque como máximo.
- **Hover / Focus:** el principal pasa a oro profundo en 300 ms; el foco de teclado es un contorno oro de 2 px a 3 px de distancia, igual en todo el sitio.
- **Secundario:** contorno oro de 1 px y texto oro; en hover se tiñe de oro al 10 % y al 20 % presionado.
- **WhatsApp:** fondo verde WhatsApp, texto negro y el ícono de la marca; en hover baja al 85 %.
- **Agotado:** el secundario al 50 % de opacidad, sin acción.
- **Enlace con flecha:** en las tarjetas, texto de botón en oro con una flecha de 20 px que se corre 4 px a la derecha al pasar el mouse. Mide al menos 44 px de alto. Es también el "Comprar entrada" de cada noche en la home.
- **Tiendas de la app:** en "Comprá tu entrada", Google Play y App Store son botones secundarios con el logo de cada tienda (20 px). En computadora van arriba los QR, sobre marfil, para abrir la app en el celular.

### Chips
- **Etiqueta de fecha:** píldora láser con texto negro en mayúsculas (12 px), arriba a la derecha de cada ficha de la cartelera. Único uso del láser.
- **Etiqueta de ejemplo:** píldora con borde piedra, fondo negro al 90 % y texto chico arena ("De ejemplo: no se publica"). Solo existe en desarrollo y nunca entra en el sitio publicado.

### Cards / Containers
- **Corner Style:** 16 px.
- **Background:** carbón sobre la banda negra.
- **Shadow Strategy:** ninguna en reposo; ver Elevation & Depth.
- **Border:** 1 px piedra, que pasa a oro en hover en las tarjetas que son enlaces.
- **Internal Padding:** 24 px, 32 px desde 1024 px en las tarjetas de la home.
- **Tarjeta de línea (home):** foto arriba (16:9 en las grandes, 16:10 en las chicas) que se agranda al 103 % en 500 ms, luego antetítulo, título 3, texto arena y enlace con flecha al pie. Sin íconos.
- **Tarjeta de argumento:** número de dos cifras en Outfit 600 oro ("01"), título 3 y texto arena.

### Inputs / Fields
- **Style:** fondo carbón, borde piedra de 1 px, esquinas de 12 px, 48 px de alto, 16 px de relleno lateral, texto Inter de 16 px en marfil y placeholder arena al 70 %. La etiqueta va arriba en Inter 500 de 14 px.
- **Focus:** el borde pasa a oro y se suma el contorno de foco global. En hover el borde pasa a arena.
- **Contenedor:** el formulario vive en una tarjeta negra con borde piedra (16 px de esquinas) y cierra con un botón de WhatsApp a todo el ancho.

### Navigation
- **Style:** barra fija de 64 px (80 px desde 1024 px). Transparente arriba de todo; al bajar, negro al 95 % con desenfoque y borde piedra.
- **Typography:** enlaces en Inter 500 de 15 px, marfil; el activo y el hover en oro.
- **Comportamiento:** se esconde al bajar y vuelve apenas se sube o se llega al tope. No se esconde mientras haya foco de teclado adentro.
- **Desplegable (Egresados):** tarjeta carbón con borde piedra y esquinas de 12 px; los ítems se tiñen de piedra en hover.
- **Orden:** isotipo a la izquierda, ítems, un divisor vertical piedra, Fusion y el botón principal "Contacto".
- **Celular:** menú negro a pantalla completa con ítems en título 3 de 56 px de alto separados por líneas piedra, y el botón "Contacto" al pie. En páginas internas, "← Inicio" a la izquierda y el isotipo centrado.

### Acordeón (preguntas frecuentes)
Filas separadas por líneas piedra, cada pregunta en título 3 marfil que pasa a oro en hover, con un chevron oro de 24 px que gira en 300 ms al abrir. La respuesta va en cuerpo arena. Funciona con teclado y sin JavaScript.

### Ficha de noche (cartelera)
La firma de Disco. Una tarjeta carbón con 12 px de relleno y un **marco de Keops** arriba: el isotipo de 20 px, "Keops Disco" como antetítulo marfil y la etiqueta de fecha láser. Debajo, el arte vertical (9:16) con esquinas de 12 px y borde piedra; sin arte, el marco muestra la pirámide y el nombre de la noche. Cierra con el nombre en título 3, la fecha larga y la hora con un reloj de 20 px, los DJs y "Comprar entrada" a todo el ancho. En carrusel, con flechas circulares de 44 px y puntos que se estiran en oro (24 px) en la posición actual.

**Comprar entrada, en un paso.** Cada noche puede tener su link de compra; con él, "Comprar entrada" lo abre en otra pestaña. Sin link, lleva a "Comprá tu entrada" en Disco. El botón lleva el nombre de la noche para los lectores de pantalla ("Comprar entrada: …"). El encabezado de Disco también tiene "Comprar entrada", así la compra está en la primera pantalla.

### Visor (galerías)
Las fotos y los videos de las galerías se abren en un visor a pantalla completa sobre un diálogo nativo, con fondo negro al 95 %. Los controles (cerrar, anterior, siguiente) son círculos de 44 px en carbón con borde piedra que se encienden en oro. Arriba, la posición ("3 / 9") en texto chico arena, que se anuncia al cambiar; abajo, puntos solo visuales. El foco entra al botón de cerrar, Escape cierra y el foco vuelve a la foto que lo abrió. Las flechas del teclado y deslizar el dedo pasan de foto. Cada miniatura es un botón con nombre ("Ampliar foto: …", "Reproducir video: …"). Los videos abren sin sonido.

### Banda de la pirámide (cierre de la home)
La frase de cierre va sobre la foto del techo de la pirámide visto desde la pista, a todo el ancho (4:5 en celular, 3:2 desde 640 px y 2:1 desde 1024 px). El velo es solo un degradé que sube desde el negro: abajo se lee la frase y arriba el techo queda a la vista. Encima de la frase, la raya corta de oro; la frase va en Cormorant itálica.

### Línea de tiempo (Nosotros)
Una línea vertical piedra de 1 px con un punto oro de 11 px por hito, separado del fondo por un anillo negro de 4 px. El año va en título 1 oro y el párrafo en cuerpo marfil. En celular la línea va a la izquierda; desde 768 px va al centro y los hitos alternan de lado, con el texto de un lado y la foto (3:2, como máximo 448 px de ancho) del otro.

### Franja de cifras (home)
Tres datos en una fila: número en Outfit 700 marfil (30 px, 48 px desde 1024 px) y la palabra abajo como antetítulo, separados por divisores verticales piedra.

### Botón flotante de WhatsApp
Círculo verde de 56 px abajo a la derecha, a 20 px de los bordes, con el número de la línea de la página. Es la única pieza con sombra y crece al 105 % al pasar el mouse.

### Movimiento
Las piezas aparecen con un fundido y una subida de 16 px en 500 ms, escalonadas de 60 a 80 ms dentro de una grilla. Las respuestas de hover duran entre 200 y 300 ms; el zoom de las fotos, 500 ms. Con `prefers-reduced-motion` todo se ve desde el inicio, sin animación, y el sonido siempre arranca apagado. Lo que se mueve solo se puede pausar: en la galería de Eventos, un botón circular de 44 px junto al de sonido frena el video y las tiras de fotos.

## Do's and Don'ts

### Do:
- **Do** usar solo los nueve tokens de color, con la proporción 70 % negro, 20 % marfil y 10 % oro.
- **Do** dejar las piezas planas en reposo y encenderlas en oro (borde oro y halo dorado suave) solo en hover o foco.
- **Do** armar cada bloque como una banda negra con línea piedra arriba y aire vertical de 64 px (96 px desde 1024 px).
- **Do** usar píldora (9999 px) para lo que se toca y 16 px para lo que contiene.
- **Do** mostrar la pirámide: el isotipo como firma y la foto del techo piramidal (`01-pista-central-piramide.jpg`) donde más pese, con el velo suave para que el techo se vea.
- **Do** dejar la compra a un paso: "Comprar entrada" en cada noche, en la home y en Disco.
- **Do** abrir todo con un botón o un link de verdad, con nombre, que funcione con teclado.
- **Do** usar íconos Lucide de 16, 20 o 24 px con trazo 1.5, en oro o marfil.
- **Do** probar cada pantalla a 375 px y a 1280 px.

### Don't:
- **Don't** usar emoji en ningún lugar del sitio.
- **Don't** usar colores sueltos: ni blancos con opacidad, ni grises de Tailwind, ni hex fuera de los tokens.
- **Don't** usar el láser fuera de las etiquetas de fecha de Disco ni el verde fuera del botón de WhatsApp.
- **Don't** usar Cormorant en títulos ni más de una vez por sección, ni los jeroglíficos para texto que haya que leer.
- **Don't** dejar un halo o un brillo encendido en reposo, ni usar sombras para dar profundidad.
- **Don't** poner íconos en las tarjetas de las líneas de la home.
- **Don't** usar degradés decorativos: los degradés negros van solo sobre fotos o video, para que se lea el texto.
- **Don't** mostrar a pantalla completa fotos de archivo de baja resolución, como la del frente en 2010.
