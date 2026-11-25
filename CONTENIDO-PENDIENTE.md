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
- [ ] `banda.hora`: hora de apertura (ej. "00:30"). Vacía, no se muestra.
- [ ] Revisar `banda.titulo` ("La noche del aniversario"), `banda.bajada` e `invitacion` ("Lo que hay esa noche"): son una propuesta (marcados con `TEXTO PROPUESTO`).
- [ ] **DOT** (`dot`): `sector` (en qué sector de Keops va) y `hora`; vacíos, no se muestran.
- [ ] **DOT** `urlEntradas`: solo si DOT tiene entradas propias. Vacío, no hay botón en DOT y la entrada de la noche queda en el cierre.
- [ ] **DOT**: revisar `bajada` (propuesta) y la escritura del lineup (Luciano Bertorello; Lucas Reartes b2b Lukas Roldán; Fferniot, tomado del flyer).
- [ ] **DOT**: el logo en PNG o SVG, si se quiere el del flyer en lugar del nombre escrito en Outfit.
- [ ] Revisar `cuentaHasta` (hoy, sábado 12 a las 23:59) y `fin` (domingo 13 a las 12:00, cuando la home vuelve sola a la normal).
- La noche del aniversario no está en la cartelera de Disco: si la cargás en `cartelera.ts` (con su flyer), aparece también en "Próximas noches".

## `contacto.ts`

- [ ] **Academia:** `mail`, `whatsapp` (solo dígitos, con código de país) y `whatsappVisible`. Con esos datos aparecen el botón flotante de WhatsApp, el bloque de inscripción, el botón "Inscribite" y la línea Academia en el pie.

## `comoLlegar.ts`

- [ ] `direccion`: dirección de Keops.
- [ ] `estacionamiento` (opcional).
- [ ] `transporteContingentes` (opcional).

## `cartelera.ts`

- [ ] Cargar las próximas noches. Cada una lleva: `id`, `nombre`, `fecha` (formato `2026-12-05`), `hora`, `djs`, `flyer` y, si corresponde, `agotado: true`. Hay un ejemplo comentado en el archivo.
- [ ] Subir el arte de cada noche (vertical 9:16) a `public/disco/flyers/`.
- [ ] (Opcional) `urlEntradas` de cada noche: el link para comprar esa noche en la app o la web de entradas. Con él, "Comprar entrada" abre directo la compra; sin él, lleva a la sección "Comprá tu entrada" de Disco.
- No hace falta borrar las noches viejas: se ocultan solas al mediodía del día siguiente.

## `faq.ts`

- [ ] Revisar cada pregunta y pasar `confirmado: false` a `confirmado: true` para publicarla (General 2, Disco 4, Egresados 4, Eventos privados e Institucionales 4).
- [ ] Escribir la respuesta de **"¿Cuál es la edad mínima para entrar?"** (Disco).
- [ ] Escribir la respuesta de **"¿Cómo se cuida a los chicos?"** (Egresados): controles de acceso, seguridad, personal.
- [ ] Cargar las preguntas de **Academia** cuando estén los datos del curso.

## `nosotros.ts`

- [ ] **Línea de tiempo (Historia):** cada hito lleva año, párrafo breve e imagen. Los párrafos de 1969, 2010, 2019, 2020 y 2021 son **de ejemplo**: la primera oración es el dato real y el resto es relleno genérico. Reemplazarlos por la historia real.
- [ ] **Línea de tiempo:** las imágenes de 1969, 2020 y 2021 son **de ejemplo** (fotos actuales, con la etiqueta "Imagen de ejemplo"). Solo se ven en tu PC; al confirmar un hito sin foto propia, sale sin imagen.
- [ ] **Línea de tiempo:** pasar `confirmado` a `true` en cada hito revisado. En tu PC se ven todos con la etiqueta "Sin confirmar"; en el sitio publicado solo salen los confirmados.
- [ ] **Línea de tiempo:** faltan las imágenes de **1969, 2020 y 2021** (se asignan en `fotos.ts`). Las de 2010 y 2019 ya están.
- [ ] **Espacios:** `capacidad` y `descripcion` de Pista Central, Salón Eletón, Salón Bar, Keops Garden y VIP +30.
- [ ] **Misión:** el texto es el propuesto; revisarlo.

## `lineas.ts`

**Egresados primario**
- [ ] Revisar `titulo` y `bajada` del encabezado: son una propuesta (marcados con `TEXTO PROPUESTO`).
- [ ] `galeria.medios`: fotos o videos de primario (6 fotos o más, o un video).
- [ ] `extra.parrafos` ("Para las familias"): texto sobre seguridad y controles que la agencia pueda reenviar.

**Egresados secundario**
- [ ] Revisar `titulo` y `bajada` del encabezado: son una propuesta (marcados con `TEXTO PROPUESTO`).
- [ ] Confirmar que los 3 videos de la galería son de secundario.
- [ ] `extra.parrafos` ("Para las familias"): mismo texto que en primario, o uno propio.

**Agencias** (se ven en las dos páginas de nivel)
- [ ] Pasar `autorizado` a `true` en cada agencia que pueda mostrarse: Flecha, Super Tour, Astros, Púrpura, Auckland. El bloque se titula "Agencias que trabajan con Keops".

**Eventos privados**
- [ ] `porQue.argumentos`: los cuatro argumentos de "Por qué Keops" (hoy el bloque está oculto).
- [ ] `referencias`: testimonios o logos reales (opcional).
- [ ] Mejorar el texto alternativo de las 9 fotos de la galería (hoy dicen "Evento privado en Keops").

**Institucionales**
- [ ] `porQue.argumentos`: los cuatro argumentos de "Por qué Keops" (hoy el bloque está oculto).
- [ ] `incluye.servicios`: confirmar los seis (vienen del sitio anterior): espacios adaptables, pantallas y proyectores, WiFi, catering, coordinador, estacionamiento y acceso VIP.
- [ ] `galeria.medios`: 6 fotos o más de eventos de empresa.
- [ ] `referencias.logos`: pasar `autorizado` a `true` en Sancor Seguros y FIE cuando lo permitan, y agregar sus logos (sin logo se muestra el nombre).

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
- [ ] `tickets.noches`: próximas noches Fusion (`id`, `nombre`, `fecha`, `lugar`, `urlEntradas`).

## `fotos.ts`

- [ ] Fotos de **Keops Garden** y **VIP +30** (hoy sus tarjetas muestran solo el nombre).
- [ ] Revisar el encuadre de las fotos verticales recortadas (salón armado y catering). Se ajusta con `posicion`, por ejemplo `"center 40%"`.

## Archivos que convendría conseguir

- [ ] **Logo de Fusion en mayor tamaño:** el actual mide 168 px de ancho y no se puede agrandar sin que se vea borroso.
- [ ] Más fotos para las galerías de Disco, Institucionales, Academia y Egresados primario.

---

## Textos que escribí o ajusté yo (para revisar)

- **Encabezados de Egresados primario y secundario** (`lineas.ts`): el documento no los definía.
- **Sin comparación con hoteles:** el título de Egresados pasó a "Tu viaje de egresados, a otro nivel" (el del sitio anterior) en la home y en `/egresados`. El argumento "Diferencia tu paquete" quedó como "Sumá a tu viaje una fiesta en la pirámide de Carlos Paz." (`lineas.ts`, marcado `TEXTO PROPUESTO`).
- **Primera vista de la home sin botones** (`home.ts`): se sacaron "Egresados" y "Ver próximas aperturas" del hero. "Contacto" se ve en texto y el WhatsApp flotante aparece recién al bajar. La tarjeta de Egresados sigue diciendo "Ver egresados".
- **Cifras de la home** (`home.ts`): tres, todas con número y palabra: 5.000 personas, 5 espacios, 1969 año de apertura.
- **"Trayectoria desde 1969"** en lugar de "57 años de trayectoria" (`lineas.ts`), para que no venza.
- **Servicios de Eventos privados e Institucionales** (`lineas.ts`): los acorté y les saqué adjetivos ("premium", "de último nivel", "de alta velocidad").
- **Botón de la tarjeta Institucionales en la home** (`home.ts`): "Pedir propuesta" en vez de "Pedí una propuesta", para usar el mismo texto de botón en todo el sitio.
- **Títulos de contacto** "Escribinos" en la home, Disco y Fusion (`home.ts`, `disco.ts`, `fusion.ts`).
- **Mensaje del formulario de agencias:** "Hola, quiero pedir una propuesta para egresados." seguido de agencia, nivel, cantidad y fecha.
- **Botón "Comprar entrada" en el encabezado de Disco** (`disco.ts`, `encabezado.boton`): baja directo a "Comprá tu entrada". Para sacarlo, dejá el texto vacío.
- **Botones de las tiendas** en "Comprá tu entrada": ahora dicen solo "Google Play" y "App Store" (antes, "Disponible en Google Play").
