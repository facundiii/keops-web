import type { Metadata } from "next";
import Image from "next/image";
import { RUTA_INICIO } from "@/config/navegacion";
import { Boton } from "@/components/ui/Boton";

export const metadata: Metadata = {
  title: "Página no encontrada",
};

/** Se muestra cuando la dirección no existe. */
export default function NoEncontrada() {
  return (
    <main className="min-h-[100svh] bg-negro flex items-center justify-center px-4 py-24">
      <div className="max-w-xl text-center">
        <Image src="/logo-piramide.png" alt="" width={96} height={96} className="w-14 h-auto mx-auto mb-8" />
        <p className="antetitulo mb-4">Error 404</p>
        <h1 className="titulo-1 text-marfil">No encontramos esa página</h1>
        <p className="cuerpo text-arena mt-6">Puede que el link esté mal escrito o que la página ya no exista.</p>
        <div className="mt-9">
          <Boton href={RUTA_INICIO}>Volver al inicio</Boton>
        </div>
      </div>
    </main>
  );
}
