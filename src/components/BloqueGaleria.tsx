import type { Medio } from "@/config/lineas";
import { Seccion, TituloSeccion } from "@/components/ui/Seccion";
import { Galeria, type MediaItem } from "@/components/Galeria";
import { FadeInSection } from "@/components/FadeInSection";

/** Galería de una página. Se muestra solo con 6 imágenes o más, o con al menos un video. */
export function BloqueGaleria({ titulo, medios }: { titulo: string; medios: Medio[] }) {
  const imagenes = medios.filter((m) => m.tipo === "imagen");
  const videos = medios.filter((m) => m.tipo === "video");
  if (videos.length === 0 && imagenes.length < 6) return null;

  const items: MediaItem[] = medios.map((m) =>
    m.tipo === "video" ? { type: "video", src: m.src, label: m.titulo } : { type: "image", src: m.src, alt: m.alt }
  );

  return (
    <Seccion>
      <FadeInSection>
        <TituloSeccion titulo={titulo} centrado />
      </FadeInSection>
      <Galeria items={items} />
    </Seccion>
  );
}
