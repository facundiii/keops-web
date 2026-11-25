import type { Medio } from "@/config/lineas";
import { MOSTRAR_EJEMPLOS } from "@/lib/ejemplo";
import { Seccion, TituloSeccion } from "@/components/ui/Seccion";
import { EtiquetaEjemplo } from "@/components/ui/EtiquetaEjemplo";
import { Galeria, type MediaItem } from "@/components/Galeria";
import { FadeInSection } from "@/components/FadeInSection";

/** Una galería se muestra solo con 6 imágenes o más, o con al menos un video. */
export function galeriaVisible(medios: Medio[]): boolean {
  return medios.some((m) => m.tipo === "video") || medios.filter((m) => m.tipo === "imagen").length >= 6;
}

interface BloqueGaleriaProps {
  titulo: string;
  medios: Medio[];
  /** Galería de ejemplo: se usa solo en desarrollo, cuando la real todavía no alcanza para mostrarse. */
  ejemplo?: Medio[];
}

/** Galería de una página. Sin fotos suficientes, no se muestra. */
export function BloqueGaleria({ titulo, medios, ejemplo = [] }: BloqueGaleriaProps) {
  const hayReal = galeriaVisible(medios);
  const esEjemplo = !hayReal && MOSTRAR_EJEMPLOS && galeriaVisible(ejemplo);
  if (!hayReal && !esEjemplo) return null;

  const items: MediaItem[] = (hayReal ? medios : ejemplo).map((m) =>
    m.tipo === "video" ? { type: "video", src: m.src, label: m.titulo } : { type: "image", src: m.src, alt: m.alt }
  );

  return (
    <Seccion>
      <FadeInSection>
        <TituloSeccion titulo={titulo} centrado className={esEjemplo ? "!mb-4" : ""} />
        {esEjemplo && (
          <div className="text-center mb-8">
            <EtiquetaEjemplo />
          </div>
        )}
      </FadeInSection>
      <Galeria items={items} />
    </Seccion>
  );
}
