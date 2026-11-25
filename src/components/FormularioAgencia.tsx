"use client";

import type { FormEvent } from "react";
import { lineas, urlWhatsApp } from "@/config/contacto";
import { Boton } from "@/components/ui/Boton";
import { IconoWhatsApp } from "@/components/ui/IconoWhatsApp";

const NIVELES = ["Primario", "Secundario", "Primario y secundario"] as const;
export type NivelEgresados = (typeof NIVELES)[number];

const claseCampo =
  "w-full min-h-[48px] rounded-xl border border-piedra bg-carbon px-4 font-sans text-base text-marfil placeholder:text-arena/70 transition-colors duration-200 hover:border-arena focus:border-oro";
const claseEtiqueta = "block font-sans font-medium text-sm text-marfil mb-2";

/**
 * Formulario corto para agencias. No guarda ni envía datos a ningún servidor:
 * arma un mensaje y abre WhatsApp con el número de Egresados.
 */
export function FormularioAgencia({ nivelInicial }: { nivelInicial?: NivelEgresados }) {
  const alEnviar = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const datos = new FormData(e.currentTarget);
    const valor = (campo: string) => String(datos.get(campo) ?? "").trim();

    const renglones = [
      "Hola, quiero pedir una propuesta para egresados.",
      `Agencia: ${valor("agencia")}`,
      `Nivel: ${valor("nivel")}`,
      valor("cantidad") && `Cantidad de chicos: ${valor("cantidad")}`,
      valor("fecha") && `Fecha estimada: ${valor("fecha")}`,
    ].filter(Boolean);

    window.open(urlWhatsApp(lineas.egresados, renglones.join("\n")), "_blank", "noopener,noreferrer");
  };

  return (
    <form onSubmit={alEnviar} className="rounded-2xl border border-piedra bg-negro p-4 sm:p-8">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="agencia" className={claseEtiqueta}>
            Agencia
          </label>
          <input id="agencia" name="agencia" type="text" required autoComplete="organization" className={claseCampo} />
        </div>

        <div>
          <label htmlFor="nivel" className={claseEtiqueta}>
            Nivel
          </label>
          <select id="nivel" name="nivel" required defaultValue={nivelInicial ?? ""} className={claseCampo}>
            <option value="" disabled>
              Elegí el nivel
            </option>
            {NIVELES.map((nivel) => (
              <option key={nivel} value={nivel}>
                {nivel}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="cantidad" className={claseEtiqueta}>
            Cantidad de chicos
          </label>
          <input id="cantidad" name="cantidad" type="number" min={1} inputMode="numeric" className={claseCampo} />
        </div>

        <div>
          <label htmlFor="fecha" className={claseEtiqueta}>
            Fecha estimada
          </label>
          <input id="fecha" name="fecha" type="text" placeholder="Ej.: septiembre de 2027" className={claseCampo} />
        </div>
      </div>

      <div className="mt-6">
        <Boton type="submit" variante="whatsapp" className="w-full">
          <IconoWhatsApp size={20} />
          Pedir propuesta por WhatsApp
        </Boton>
      </div>
      <p className="texto-chico text-arena mt-4 text-center">
        Se abre WhatsApp con el mensaje armado, listo para enviar.
      </p>
    </form>
  );
}
