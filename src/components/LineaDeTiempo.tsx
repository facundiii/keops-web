import Image from "next/image";
import type { Hito } from "@/config/nosotros";
import type { Foto } from "@/config/fotos";
import { FadeInSection } from "@/components/FadeInSection";

interface LineaDeTiempoProps {
  hitos: Hito[];
  /** Foto de cada hito, por año */
  fotos: Record<string, Foto | undefined>;
  /** Fotos de ejemplo, por año. Solo se usan en hitos sin confirmar (que no se publican). */
  fotosDeEjemplo?: Record<string, Foto | undefined>;
}

/**
 * Línea de tiempo vertical: año, párrafo breve e imagen.
 * En celular la línea va a la izquierda; en pantallas grandes va al centro
 * y los hitos alternan de lado (texto de un lado, imagen del otro).
 * Un hito sin imagen muestra solo el año y el párrafo.
 */
export function LineaDeTiempo({ hitos, fotos, fotosDeEjemplo = {} }: LineaDeTiempoProps) {
  return (
    <ol className="relative">
      {/* La línea */}
      <span
        aria-hidden="true"
        className="absolute top-2 bottom-2 left-[5px] w-px bg-piedra md:left-1/2 md:-translate-x-1/2"
      />

      {hitos.map((hito, i) => {
        // La foto real del año; si no hay y el hito está sin confirmar, una de ejemplo.
        const fotoReal = fotos[hito.anio];
        const foto = fotoReal ?? (hito.confirmado ? undefined : fotosDeEjemplo[hito.anio]);
        const esDeEjemplo = !fotoReal && Boolean(foto);
        const textoALaIzquierda = i % 2 === 0;

        return (
          <li
            key={hito.anio}
            className="relative pl-10 pb-12 last:pb-0 md:pl-0 md:pb-24 md:grid md:grid-cols-2 md:gap-x-24 md:items-center"
          >
            {/* El punto sobre la línea */}
            <span
              aria-hidden="true"
              className="absolute left-0 top-4 w-[11px] h-[11px] rounded-full bg-oro ring-4 ring-negro md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2"
            />

            {/* Año y párrafo */}
            <div className={textoALaIzquierda ? "md:order-1 md:text-right" : "md:order-2"}>
              <FadeInSection>
                <h3 className="titulo-1 text-oro">{hito.anio}</h3>
                <p className="cuerpo text-marfil mt-3">{hito.texto}</p>
                {!hito.confirmado && (
                  <p className="texto-chico text-arena mt-4 inline-block rounded-full border border-piedra px-3 py-1">
                    Sin confirmar: no se publica
                  </p>
                )}
              </FadeInSection>
            </div>

            {/* Imagen. Las fotos de archivo son chicas: nunca a pantalla completa. */}
            <div className={`mt-6 md:mt-0 ${textoALaIzquierda ? "md:order-2" : "md:order-1"}`}>
              {foto && (
                <FadeInSection delay={100}>
                  <div
                    className={`relative aspect-[3/2] max-w-md rounded-2xl overflow-hidden border border-piedra ${
                      textoALaIzquierda ? "" : "md:ml-auto"
                    }`}
                  >
                    <Image
                      src={foto.src}
                      alt={foto.alt}
                      fill
                      sizes="(max-width: 768px) 85vw, 448px"
                      className="object-cover"
                      style={{ objectPosition: foto.posicion }}
                    />
                    {esDeEjemplo && (
                      <span className="texto-chico absolute left-3 top-3 rounded-full border border-piedra bg-negro/90 px-3 py-1 text-arena">
                        Imagen de ejemplo
                      </span>
                    )}
                  </div>
                </FadeInSection>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
