---
version: 1
slug: "src-components-aniversario-portadaaniversario-tsx"
primary_target: "src/components/aniversario/PortadaAniversario.tsx"
related_targets: ["src/app/(main)/page.tsx","src/components/aniversario/BandaAniversario.tsx"]
---

# Portada del aniversario (home, 57 años)

**Alcance:** primera vista de la home y la banda que la sigue, solo mientras dure el aniversario (config/aniversario.ts; se apaga sola el domingo 13 de diciembre a las 12:00). Modo del visitante: Persuade.

**Público y tarea:** el público de la noche (y cualquiera que entre a la home) tiene que entender en un vistazo que Keops cumple 57 años y que la fiesta es el sábado 12 de diciembre; la acción es comprar la entrada, que vive en la banda que sigue (Quickpass). Restricciones del dueño: la primera vista no tiene botones (ni del hero, ni el Contacto dorado, ni el WhatsApp flotante); el contador apunta al sábado 12 a las 23:59.

**Momento memorable:** la pirámide de piedra que se abre y deja ver el fuego de adentro, sobre el mar al atardecer, como el reel de Instagram.

**Sin resolver:** link directo de la noche en Quickpass, hora de apertura, texto de la banda (propuesto), sponsors del flyer (fuera por falta de archivos y permisos).

## Direction contract

THESIS: La pirámide encendida, literal: el flyer del aniversario hecho portada. Rechaza el contador genérico en cajas sobre una foto.

OWN-WORLD: Cielo de atardecer (noche azul que baja a ámbar), mar quieto con reflejo y destellos, pirámide doble de pizarra con vetas de lava (lava #FF6A13, brasa #FFC04D), fecha en hielo #CFE8EF con tracking amplio, logotipo blanco ANIVERSARIO / KEOPS / 57 AÑOS.

STORY: El visitante ve la fecha, la pirámide que se abre y el 57; entiende que es el aniversario y cuánto falta; baja y compra la entrada.

FIRST VIEWPORT: Fecha arriba al centro; la pirámide ocupa el centro hasta el horizonte, que pasa por la mitad de KEOPS; debajo, el 57 y el contador en una fila (días, horas, min, seg). Sin botones; la acción principal está en la banda siguiente.

FORM: Recreación del flyer del dueño, código a mano (canvas 2D). seed: none (pinned) — "Quiero que sigas la misma linea de visualizacion de las imagenes del flyer de instagram y trates de copiar la animacion del flyer del video."

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
