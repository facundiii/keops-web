import Image from "next/image";
import type { Argumento } from "@/config/lineas";
import { Seccion, TituloSeccion } from "@/components/ui/Seccion";
import { EtiquetaEjemplo } from "@/components/ui/EtiquetaEjemplo";
import { FadeInSection } from "@/components/FadeInSection";

interface BloqueArgumentosProps {
  titulo: string;
  argumentos: Argumento[];
  /** Foto opcional, arriba de los argumentos */
  foto?: { src: string; alt: string; posicion?: string };
  /** true cuando los argumentos son de ejemplo (solo en desarrollo) */
  esEjemplo?: boolean;
}

/** "Por qué Keops": argumentos numerados. Sin argumentos, no se muestra. */
export function BloqueArgumentos({ titulo, argumentos, foto, esEjemplo = false }: BloqueArgumentosProps) {
  if (argumentos.length === 0) return null;

  return (
    <Seccion>
      <FadeInSection>
        <TituloSeccion titulo={titulo} className={esEjemplo ? "!mb-5" : ""} />
        {esEjemplo && <EtiquetaEjemplo className="mb-8" />}
      </FadeInSection>
      {foto && (
        <FadeInSection>
          <div className="relative aspect-[16/9] lg:aspect-[21/9] rounded-2xl overflow-hidden border border-piedra mb-4">
            <Image src={foto.src} alt={foto.alt} fill sizes="(max-width: 1280px) 100vw, 1152px" className="object-cover" style={{ objectPosition: foto.posicion }} />
          </div>
        </FadeInSection>
      )}
      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {argumentos.map((a, i) => (
          <li key={a.titulo}>
            <FadeInSection delay={i * 80} className="h-full">
              <div className="h-full rounded-2xl border border-piedra bg-carbon p-6 lg:p-7">
                <p className="font-titulo font-semibold text-oro text-sm tracking-[0.1em] mb-5" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="titulo-3 text-marfil mb-3">{a.titulo}</h3>
                <p className="cuerpo text-arena">{a.texto}</p>
              </div>
            </FadeInSection>
          </li>
        ))}
      </ol>
    </Seccion>
  );
}
