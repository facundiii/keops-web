import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { SubpageTemplate } from "@/components/SubpageTemplate";
import type { MediaItem } from "@/components/Carousel";

export const metadata: Metadata = {
  title: siteConfig.sections.institucionales.title,
  description: siteConfig.sections.institucionales.description,
};

const mediaItems: MediaItem[] = [
  // { type: "image", src: "/institucionales/foto-1.jpg", alt: "Evento institucional" },
];

const { title, tagline, description, paragraphs, services, cta } = siteConfig.sections.institucionales;

export default function InstitucionalesPage() {
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
