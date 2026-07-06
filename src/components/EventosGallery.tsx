import Image from "next/image";
import { Play, ImageIcon } from "lucide-react";

// ── Slot components ─────────────────────────────────────────────

function ImageSlot({ src, alt }: { src?: string; alt?: string }) {
  if (!src) {
    return (
      <div className="w-full aspect-[9/16] rounded-xl bg-night-800 border border-white/5 flex items-center justify-center shrink-0">
        <ImageIcon size={20} className="text-white/10" />
      </div>
    );
  }
  return (
    <div className="w-full aspect-[9/16] relative rounded-xl overflow-hidden shrink-0">
      <Image src={src} alt={alt ?? ""} fill className="object-cover" sizes="240px" />
    </div>
  );
}

function VideoSlot({ src }: { src?: string }) {
  if (!src) {
    return (
      <div className="w-full aspect-[9/16] rounded-2xl bg-night-800 border border-white/8 flex flex-col items-center justify-center gap-4">
        <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center">
          <Play size={22} className="text-white/20 ml-1" />
        </div>
        <p className="text-white/20 text-[11px] tracking-[0.2em] uppercase">Video próximamente</p>
      </div>
    );
  }
  return (
    <div className="w-full aspect-[9/16] relative rounded-2xl overflow-hidden">
      <video
        src={src}
        className="w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      />
    </div>
  );
}

// ── Strip: vertical scroll column ───────────────────────────────

interface StripProps {
  images: (string | undefined)[];
  direction: "up" | "down";
}

function Strip({ images, direction }: StripProps) {
  // Duplicate for seamless loop
  const items = [...images, ...images];
  const animClass = direction === "up" ? "animate-scroll-up" : "animate-scroll-down";

  return (
    <div className="overflow-hidden" style={{ height: "100%" }}>
      <div className={`flex flex-col gap-3 ${animClass}`}>
        {items.map((src, i) => (
          <ImageSlot key={i} src={src} />
        ))}
      </div>
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────

interface EventosGalleryProps {
  videoSrc?: string;
  leftImages?: (string | undefined)[];
  rightImages?: (string | undefined)[];
}

const defaultImages: (string | undefined)[] = [
  undefined,
  undefined,
  undefined,
  undefined,
];

export function EventosGallery({
  videoSrc,
  leftImages = defaultImages,
  rightImages = defaultImages,
}: EventosGalleryProps) {
  return (
    <>
      {/* ── Desktop: 3-column cinema strip ── */}
      <div className="hidden lg:block relative">
        {/* Top + bottom vignettes */}
        <div className="absolute inset-x-0 top-0 h-20 z-10 bg-gradient-to-b from-night-950 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-20 z-10 bg-gradient-to-t from-night-950 to-transparent pointer-events-none" />

        <div
          className="flex gap-4 items-start max-w-5xl mx-auto px-4"
          style={{ height: "680px", overflow: "hidden" }}
        >
          {/* Left strip — scrolls up */}
          <div className="w-52 shrink-0 h-full">
            <Strip images={leftImages} direction="up" />
          </div>

          {/* Center — video */}
          <div className="flex-1 flex items-center justify-center h-full py-6">
            <div className="w-full max-w-[280px]">
              <VideoSlot src={videoSrc} />
            </div>
          </div>

          {/* Right strip — scrolls down */}
          <div className="w-52 shrink-0 h-full">
            <Strip images={rightImages} direction="down" />
          </div>
        </div>
      </div>

      {/* ── Mobile: stacked ── */}
      <div className="lg:hidden px-4">
        <div className="max-w-xs mx-auto mb-6">
          <VideoSlot src={videoSrc} />
        </div>
        <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
          {[...leftImages.slice(0, 2), ...rightImages.slice(0, 2)].map((src, i) => (
            <ImageSlot key={i} src={src} />
          ))}
        </div>
      </div>
    </>
  );
}
