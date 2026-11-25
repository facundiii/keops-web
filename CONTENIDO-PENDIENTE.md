# Keops — Contenido pendiente

Lista de lo que falta completar o revisar en el sitio, archivo por archivo.
Todos los archivos están en `src/config/`. No hace falta tocar componentes.

**Cómo funciona:** un dato vacío (`""`) o una lista vacía (`[]`) hace que ese bloque no se muestre en el sitio publicado.
Al completarlo, el bloque aparece solo. Buscá `A COMPLETAR` dentro de cada archivo para encontrar el lugar exacto.

**Contenido de ejemplo:** en tu PC (`npm run dev`) los bloques vacíos se rellenan con contenido genérico para que
veas cómo queda cada página. Todo lo que es de ejemplo, está sin confirmar o sin autorizar lleva una etiqueta gris
("De ejemplo: no se publica", "Sin confirmar: no se publica", "Sin autorizar: no se publican").
Nada de eso entra en el sitio publicado (`npm run build`). Los textos de ejemplo están en `ejemplos.ts` y las fotos
de ejemplo en `fotos.ts`; no hace falta borrarlos: cuando cargás el dato real, el ejemplo deja de usarse solo.

---

## Lo más importante primero

1. **Dirección de Keops** (`comoLlegar.ts`): sin ella, "Cómo llegar" muestra solo el texto y el botón del mapa.
2. **Cartelera** (`cartelera.ts`): está vacía; Disco y la home muestran "Pronto anunciamos las próximas noches".
3. **Preguntas frecuentes** (`faq.ts`): las 14 están cargadas pero sin confirmar; la página no existe hasta confirmar al menos una.
4. **Línea de tiempo** (`nosotros.ts` y `fotos.ts`): los 5 hitos están cargados pero sin confirmar, así que en el sitio publicado todavía no se ve. Faltan párrafos más completos y tres imágenes.
5. **Academia** (`academia.ts` y `contacto.ts`): la página muestra solo el encabezado.

---

## `aniversario.ts` (versión especial de la home, 57 años)

- [ ] `banda.urlEntradas`: link directo a la noche del aniversario en Quickpass. Sin él, "Comprar entrada" lleva a "Comprá tu entrada" en Disco.
- [ ] `hora`: hora de apertura de la noche (ej. "00:30"). Es la misma para la pirámide y DOT, así que aparece en los dos lugares. Vacía, no se muestra.
- [ ] Revisar `banda.titulo` ("La noche del aniversario"), `banda.bajada` e `invitacion` ("Lo que hay esa noche"): son una propuesta (marcados con `TEXTO PROPUESTO`).
- [ ] **DOT** (`dot`): `sector` (el nombre del sector dedicado a DOT); vacío, no se muestra. La bajada ya dice "en un sector dedicado de Keops".
- [ ] **DOT**: confirmar que la entrada de la noche sirve también para DOT. DOT no tiene botón propio: la compra está en el cierre. Si se confirma, conviene decirlo en la bajada.
- [ ] **DOT**: revisar `bajada` (propuesta) y la escritura del lineup. Va en orden de salida: Fferniot; Lucas Reartes b2b Lukas Roldán; cierra Luciano Bertorello (nombres tomados del flyer).
- [ ] **DOT**: el logo en PNG o SVG, si se quiere el del flyer en lugar del nombre escrito en Outfit.
- [ ] Revisar `cuentaHasta` (hoy, sábado 12 a las 23:59) y `fin` (domingo 13 a las 12:00, cuando la home vuelve sola a la normal).
- La noche del aniversario no está en la cartelera de Disco: si la cargás en `cartelera.ts` (con su flyer), aparece también en "Próximas noches".

## `contacto.ts`

- [ ] **Academia:** `mail`, `whatsapp` (solo dígitos, con código de país) y `whatsappVisible`. Con esos datos aparecen el botón flotante de WhatsApp, el bloque de inscripción y la línea Academia en el pie.

## `comoLlegar.ts`

- [ ] `direccion`: dirección de Keops.
- [ ] Revisar `texto` (`TEXTO PROPUESTO`): ya no dice "fuera del centro"; ahora dice "La pirámide se reconoce desde lejos. Llegá en auto, taxi o remis: te dejan en la puerta."
- [ ] `estacionamiento` (opcional).
- [ ] `transporteContingentes` (opcional).

## `cartelera.ts`

- [ ] Cargar las próximas noches. Cada una lleva: `id`, `nombre`, `fecha` (formato `2026-12-05`), `hora`, `djs`, `flyer` y, si corresponde, `estilo` (qué tipo de noche es, por ejemplo "Reggaetón viejo") y `agotado: true`. Hay un ejemplo comentado en el archivo.
- [ ] Subir el arte de cada noche (vertical 9:16) a `public/disco/flyers/`.
- Para ver cómo quedan las fichas y los flyers, en tu PC la cartelera muestra tres noches de ejemplo: **Gasolina** (reggaetón viejo), **Silenzzio** (fiesta con auriculares, tres canales; va como agotada) y **DOT** (electrónica), con artes armados con las fotos del sitio (`public/disco/flyers/ejemplo-*.jpg`). Los DJs, las horas y las fechas son inventados. Lo mismo en Fusion (`public/fusion/flyers/`). No se publican; cuando cargues noches reales, se pueden borrar esos archivos.
- [ ] (Opcional) `urlEntradas` de cada noche: el link para comprar esa noche en la app o la web de entradas. Con él, "Comprar entrada" abre directo la compra; sin él, lleva a la sección "Comprá tu entrada" de Disco.
- No hace falta borrar las noches viejas: se ocultan solas al mediodía del día siguiente.

## `faq.ts`

- [ ] Revisar cada pregunta y pasar `confirmado: false` a `confirmado: true` para publicarla (General 2, Disco 4, Egresados 4, Eventos privados 4).
- [ ] Escribir la respuesta de **"¿Cuál es la edad mínima para entrar?"** (Disco).
- [ ] Escribir la respuesta de **"¿Cómo se cuida a los chicos?"** (Egresados): controles de acceso, seguridad, personal.
- [ ] Cargar las preguntas de **Academia** cuando estén los datos del curso.

## `nosotros.ts`

- [ ] **Línea de tiempo (Historia):** cada hito lleva año, párrafo breve e imagen. Los párrafos de 1969, 2010, 2019, 2020 y 2021 son **de ejemplo**: la primera oración es el dato real y el resto es relleno genérico. Reemplazarlos por la historia real.
- [ ] **Línea de tiempo:** las imágenes de 1969, 2020 y 2021 son **de ejemplo** (fotos actuales, con la etiqueta "Imagen de ejemplo"). Solo se ven en tu PC; al confirmar un hito sin foto propia, sale sin imagen.
- [ ] **Línea de tiempo:** pasar `confirmado` a `true` en cada hito revisado. En tu PC se ven todos con la etiqueta "Sin confirmar"; en el sitio publicado solo salen los confirmados.
- [ ] **Línea de tiempo:** faltan las imágenes de **1969, 2020 y 2021** (se asignan en `fotos.ts`). Las de 2010 y 2019 ya están.
- [ ] **Espacios:** `capacidad` y `descripcion` de Pista Central, Salón Eletón, Salón Bar, Keops Garden y Salón VIP.
- [ ] **Misión:** el texto es el propuesto; revisarlo.
- [ ] **Nuestro equipo** (`equipo`): están Administración (Francisco Giordano, Débora Bourdieu, Jessica Sosa) y Cabina (Diego Fernandez, DJ Residente; Facundo Fernandez, Facundo Ercoles y Santiago Miñoz, VJ / LJ). Se pueden sumar más áreas (por ejemplo, show o técnica) y un rol por persona.

## `lineas.ts`

**Egresados primario**
- [ ] Revisar el encabezado ("La fiesta de su viaje") y el bloque `fiesta` ("Cómo es la matinée en Keops", cuatro momentos): son una propuesta (`TEXTO PROPUESTO`).
- [ ] `galeria.medios`: fotos o videos de primario (6 fotos o más, o un video). Un video de primario también serviría para el encabezado (hoy muestra la foto del show de robots LED).
- [ ] `extra.parrafos` ("Para las familias"): texto sobre seguridad y controles que la agencia pueda reenviar.

**Egresados secundario** (17 y 18 años: la noche de egresados, no una matinée)
- [ ] Revisar el encabezado ("La noche más grande del viaje"), el bloque `fiesta` ("Así es la noche de egresados"), los argumentos y los servicios de secundario: son una propuesta (`TEXTO PROPUESTO`).
- [ ] Confirmar que los 3 videos de la galería son de secundario. El encabezado usa un tramo de 12 s de `video-1.mp4` (`public/portadas/secundarios.mp4`) y el de `/egresados`, otro tramo del mismo video.
- Sin "Para las familias" ni el argumento de seguridad: en secundario el foco es la fiesta.

**Agencias** (se ven en las dos páginas de nivel)
- [ ] Pasar `autorizado` a `true` en cada agencia que pueda mostrarse: Flecha, Super Tour, Astros, Púrpura, Auckland. El bloque se titula "Agencias que trabajan con Keops".

**Eventos privados** (incluye los eventos de empresa: Institucionales ya no tiene página y `/institucionales` lleva acá)
- [ ] `porQue.argumentos`: los cuatro argumentos de "Por qué Keops" (hoy el bloque está oculto).
- [ ] Revisar la bajada y el texto de la tarjeta de la home, que ahora suman "eventos de empresa" (`TEXTO PROPUESTO`).
- [ ] Revisar el servicio "DJ" (antes "DJ o banda en vivo, a elección"): si querés, sumale un detalle.
- [ ] `referencias`: testimonios o logos reales (opcional). Si Sancor Seguros y FIE autorizan, pueden ir acá.
- [ ] Mejorar el texto alternativo de las 9 fotos de la galería (hoy dicen "Evento privado en Keops").

## `academia.ts`

- [ ] `encabezado.bajada`.
- [ ] `temas.lista`: qué se aprende.
- [ ] `modalidad`: `duracion`, `diasYHorarios`, `cupos`, `requisitos`.
- [ ] `docentes.lista` (opcional): nombre, rol y foto.
- [ ] `galeria.medios`: 6 fotos o más (ya hay una disponible: `05-salon-bar.jpg`).
- [ ] `inscripcion.bajada` (opcional).

## `disco.ts`

- [ ] `galeria.medios`: 6 fotos o más de la pista (ya hay una disponible: `02-pista-central.jpg`).

## `fusion.ts`

- [ ] `url`: link a la app o al sitio de Fusion. Sin él no aparecen el botón "Ir a Fusion" ni "Comprar entrada" en las noches que no tengan link propio.
- [ ] `tickets.noches`: próximas noches Fusion (`id`, `nombre`, `fecha`, `lugar`, `urlEntradas` y, si hay, `flyer`, vertical 9:16 en `public/fusion/flyers/`).

## `fotos.ts`

- [ ] Fotos de **Salón Bar** y **Keops Garden** (hoy sus tarjetas muestran solo el nombre). La foto `05-salon-bar.jpg` es del Salón VIP y ya está en su tarjeta.
- [ ] Revisar el encuadre de las fotos verticales recortadas (salón armado y catering). Se ajusta con `posicion`, por ejemplo `"center 40%"`.
- [ ] **Foto de la pirámide en más resolución** (`01-pista-central-piramide.jpg`). Hoy mide 1367 × 2048 px y es vertical, pero va a todo el ancho en el encabezado de Nosotros y en el cierre de la home: en pantallas grandes se ve blanda. Hace falta una horizontal de 2560 px de ancho o más (o el original de la cámara).

## Archivos que convendría conseguir

- [ ] **Logo de Fusion en mayor tamaño:** el actual mide 168 px de ancho y no se puede agrandar sin que se vea borroso.
- [ ] Más fotos para las galerías de Disco, Academia y Egresados primario.

---

## Textos que escribí o ajusté yo (para revisar)

- **Encabezados de Egresados primario y secundario** (`lineas.ts`): el documento no los definía.
- **Sin comparación con hoteles:** el título de Egresados pasó a "Tu viaje de egresados, a otro nivel" (el del sitio anterior) en la home y en `/egresados`. El argumento "Diferencia tu paquete" quedó como "Sumá a tu viaje una fiesta en la pirámide de Carlos Paz." (`lineas.ts`, marcado `TEXTO PROPUESTO`).
- **Primera vista de la home sin botones** (`home.ts`): se sacaron "Egresados" y "Ver próximas aperturas" del hero. "Contacto" se ve en texto y el WhatsApp flotante aparece recién al bajar. La tarjeta de Egresados sigue diciendo "Ver egresados".
- **Cifras de la home** (`home.ts`): tres, todas con número y palabra: 5.000 personas, 5 espacios, 1969 año de apertura.
- **"Trayectoria desde 1969"** en lugar de "57 años de trayectoria" (`lineas.ts`), para que no venza.
- **Servicios de Eventos privados** (`lineas.ts`): los acorté y les saqué adjetivos ("premium", "de último nivel", "de alta velocidad"). Sin banda en vivo.
- **Institucionales afuera:** sin página, sin tarjeta en la home y sin ítem en el menú. Eventos privados suma "eventos de empresa" y `/institucionales` redirige a `/eventos`.
- **Encabezados de las páginas internas:** con foto o video ocupan casi toda la pantalla. `/egresados` y secundario tienen un video vertical (al costado del texto en la compu) y Disco, el video de la pista. Son tramos cortos y livianos de los videos propios (`public/portadas/`).
- **"Nuestro equipo"** volvió a Nosotros, por área y sin fotos: Administración (Francisco Giordano, Débora Bourdieu y Jessica Sosa) y Cabina (Diego Fernandez, Facundo Fernandez, Facundo Ercoles y Santiago Miñoz), que vuelve como estaba antes del rediseño.
- **Títulos de contacto** "Escribinos" en la home, Disco y Fusion (`home.ts`, `disco.ts`, `fusion.ts`).
- **Mensaje del formulario de agencias:** "Hola, quiero pedir una propuesta para egresados." seguido de agencia, nivel, cantidad y fecha.
- **Sin botones en la primera vista de ninguna página:** los encabezados ya no tienen botón (tampoco "Comprar entrada" en Disco) y el "Contacto" dorado y el WhatsApp flotante aparecen al bajar, como en la home.
- **Botones de las tiendas** en "Comprá tu entrada": ahora dicen solo "Google Play" y "App Store" (antes, "Disponible en Google Play").
