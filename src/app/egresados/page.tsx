import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { SubpageTemplate } from "@/components/SubpageTemplate";
import type { MediaItem } from "@/components/Carousel";

export const metadata: Metadata = {
  title: siteConfig.sections.egresados.title,
  description: siteConfig.sections.egresados.description,
};

const mediaItems: MediaItem[] = [
  // { type: "image", src: "/egresados/foto-1.jpg", alt: "Fiesta de egresados" },
];

const { title, tagline, description, paragraphs, cta } = siteConfig.sections.egresados;

export default function EgresadosPage() {
  return (
    <SubpageTemplate
      title={title}
      tagline={tagline}
      description={description}
      paragraphs={[...paragraphs]}
      cta={cta}
      mediaItems={mediaItems}
    />
  );
}
