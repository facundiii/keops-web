"use client";

import { useSyncExternalStore, type ReactNode } from "react";

type Fase = "antes" | "despues" | "ambas";
const sinSuscripcion = () => () => {};

/**
 * Muestra `antes` hasta la fecha `hasta` y `despues` a partir de ella.
 * El sitio se genera de antemano, así que la fecha se compara en el navegador de cada persona
 * y una versión especial se apaga sola sin volver a publicar.
 *
 * Para que nadie vea un instante la versión equivocada: el HTML trae las dos, una regla de
 * globals.css muestra solo `antes`, y el script "fin-aniversario" del layout raíz invierte esa
 * regla antes de pintar si la fecha ya pasó. Después de cargar, queda montada solo la que corresponde.
 */
export function SegunFecha({ hasta, antes, despues }: { hasta: string; antes: ReactNode; despues: ReactNode }) {
  const limite = Date.parse(hasta);
  const fase = useSyncExternalStore<Fase>(
    sinSuscripcion,
    () => (Date.now() >= limite ? "despues" : "antes"),
    () => "ambas"
  );

  // Contenedores de bloque (no `display: contents`): al navegar, Next lleva el scroll al primer
  // elemento de la página, y uno sin caja lo deja donde estaba.
  return (
    <>
      {fase !== "despues" && <div className="segun-antes">{antes}</div>}
      {fase !== "antes" && <div className="segun-despues">{despues}</div>}
    </>
  );
}
