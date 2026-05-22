import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { SubpageTemplate } from "@/components/SubpageTemplate";
import type { MediaItem } from "@/components/Carousel";

export const metadata: Metadata = {
  title: siteConfig.sections.eventos.title,
  description: siteConfig.sections.eventos.description,
};

const mediaItems: MediaItem[] = [
  // { type: "image", src: "/eventos/foto-1.jpg", alt: "Salón eventos" },
];

const { title, tagline, description, paragraphs, services, cta } = siteConfig.sections.eventos;

export default function EventosPage() {
  return (
    <SubpageTemplate
      title={title}
      tagline={tagline}
      description={description}
      paragraphs={[...paragraphs]}
      services={[...services]}
      cta={cta}
      mediaItems={mediaItems}
    />
  );
}
