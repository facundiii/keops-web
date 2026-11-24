"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ZoomIn } from "lucide-react";
import { Visor, type MedioVisor } from "@/components/Visor";

interface PhotoGalleryProps {
  images: string[];
  /** Texto alternativo de cada foto, en el mismo orden */
  alts?: string[];
}

/** Mosaico de fotos que se abren en el visor. */
export function PhotoGallery({ images, alts = [] }: PhotoGalleryProps) {
  const [activa, setActiva] = useState<number | null>(null);

  const medios = useMemo<MedioVisor[]>(
    () => images.map((src, i) => ({ tipo: "imagen", src, alt: alts[i] || `Foto ${i + 1}` })),
    [images, alts]
  );

  return (
    <>
      <div className="columns-2 sm:columns-3 lg:columns-4 gap-2 sm:gap-3">
        {medios.map((medio, i) => (
          <div key={medio.src + i} className="break-inside-avoid mb-2 sm:mb-3">
            <button
              type="button"
              onClick={() => setActiva(i)}
              aria-label={`Ampliar foto: ${medio.tipo === "imagen" ? medio.alt : ""}`}
              className="relative block w-full rounded-xl overflow-hidden cursor-zoom-in group"
            >
              <Image
                src={medio.src}
                alt=""
                width={0}
                height={0}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                style={{ width: "100%", height: "auto", display: "block" }}
                className="transition-transform duration-500 group-hover:scale-[1.03]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-negro/0 group-hover:bg-negro/30 transition-colors duration-300 flex items-center justify-center">
                <ZoomIn size={24} strokeWidth={1.5} aria-hidden="true" className="text-marfil opacity-0 group-hover:opacity-80 transition-opacity duration-300" />
              </div>
            </button>
          </div>
        ))}
      </div>

      <Visor medios={medios} indice={activa} alCambiar={setActiva} alCerrar={() => setActiva(null)} />
    </>
  );
}
