"use client";

import { useSyncExternalStore } from "react";
import { aniversario } from "@/config/aniversario";

const suscribir = (aviso: () => void) => {
  const id = window.setInterval(aviso, 1000);
  return () => window.clearInterval(id);
};
const segundoActual = () => Math.floor(Date.now() / 1000);
const enElServidor = () => null;
const dos = (n: number) => String(n).padStart(2, "0");
const UNIDADES = ["días", "horas", "min", "seg"];

/** Cuenta regresiva al aniversario. En el servidor muestra guiones; el navegador pone la cuenta real. */
export function Contador() {
  const ahora = useSyncExternalStore(suscribir, segundoActual, enElServidor);
  const objetivo = Math.floor(Date.parse(aniversario.cuentaHasta) / 1000);
  const falta = ahora === null ? null : Math.max(0, objetivo - ahora);

  if (falta === 0) {
    // Sin la demora de la entrada: aparece con un fundido corto justo cuando llega a cero
    return <p className="aniv-fecha animate-fade-in mt-6 text-marfil">{aniversario.contador.esNoche}</p>;
  }

  const partes =
    falta === null
      ? null
      : [Math.floor(falta / 86400), Math.floor((falta % 86400) / 3600), Math.floor((falta % 3600) / 60), falta % 60];

  return (
    <div
      role="timer"
      aria-label="Cuenta regresiva al aniversario"
      className="aniv-entra aniv-entra-contador mt-4 lg:mt-8 flex flex-col items-center gap-2"
    >
      <p className="aniv-unidad text-hielo">{aniversario.contador.faltan}</p>
      <div className="flex">
        {UNIDADES.map((unidad, i) => (
          <div
            key={unidad}
            className={`aniv-celda flex flex-col items-center ${i > 0 ? "border-l border-marfil/20" : ""}`}
          >
            <span className="aniv-numero text-marfil">{partes ? dos(partes[i]) : "--"}</span>
            <span className="aniv-unidad mt-2">{unidad}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
