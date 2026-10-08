"use client";

import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { galleryImages } from "@/lib/constants";
import { ContentReveal } from "@/components/common/ContentReveal";
import { TextReveal } from "@/components/common/TextReveal";

export function GallerySection() {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (active === null) return;
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight") setActive((active + 1) % galleryImages.length);
      if (event.key === "ArrowLeft") setActive((active - 1 + galleryImages.length) % galleryImages.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <section className="section-pad bg-[var(--cream)]">
      <div className="container-xl">
        <TextReveal>
          <div className="mb-12 max-w-4xl">
          <p className="eyebrow">Gallery</p>
          <h2 className="mt-4 font-serif text-4xl leading-[0.94] md:text-6xl">A visual note from the farm.</h2>
          </div>
        </TextReveal>
        <div className="grid auto-rows-[190px] gap-4 md:grid-cols-4 md:auto-rows-[240px]">
          {galleryImages.map((image, index) => (
            <ContentReveal key={image.src} delay={Math.min(index * 0.06, 0.3)} className={index === 0 || index === 4 ? "md:col-span-2 md:row-span-2" : ""}>
              <button
                className="image-shell focus-ring h-full w-full text-left"
                onClick={() => setActive(index)}
              >
                <Image src={image.src} alt={image.alt} fill sizes="(max-width: 768px) 100vw, 35vw" className="transition duration-700 hover:scale-105" />
              </button>
            </ContentReveal>
          ))}
        </div>
      </div>

      {active !== null && (
        <div className="fixed inset-0 z-[80] bg-black/92 p-4 text-white" role="dialog" aria-modal="true" aria-label="Gallery image viewer">
          <button className="focus-ring absolute right-5 top-5 z-10 rounded-full border border-white/30 bg-white/10 p-3 text-white backdrop-blur transition hover:bg-white hover:text-[var(--deep)]" onClick={() => setActive(null)} aria-label="Close gallery">
            <X />
          </button>
          <button className="focus-ring absolute left-5 top-1/2 z-10 rounded-full border border-white/30 bg-white/10 p-3 text-white backdrop-blur transition hover:bg-white hover:text-[var(--deep)]" onClick={() => setActive((active - 1 + galleryImages.length) % galleryImages.length)} aria-label="Previous image">
            <ChevronLeft />
          </button>
          <button className="focus-ring absolute right-5 top-1/2 z-10 rounded-full border border-white/30 bg-white/10 p-3 text-white backdrop-blur transition hover:bg-white hover:text-[var(--deep)]" onClick={() => setActive((active + 1) % galleryImages.length)} aria-label="Next image">
            <ChevronRight />
          </button>
          <Image src={galleryImages[active].src} alt={galleryImages[active].alt} fill sizes="100vw" className="object-contain p-8" />
        </div>
      )}
    </section>
  );
}
