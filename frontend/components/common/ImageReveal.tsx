"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

export function ImageReveal({ src, alt, className, priority }: ImageRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const image = node.querySelector("img");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        node,
        { clipPath: "inset(14% 0 14% 0)" },
        { clipPath: "inset(0% 0 0% 0)", duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: node, start: "top 82%" } },
      );
      gsap.fromTo(
        image,
        { scale: 1.12 },
        { scale: 1, duration: 1.5, ease: "power3.out", scrollTrigger: { trigger: node, start: "top 82%" } },
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className={cn("image-shell", className)}>
      <Image src={src} alt={alt} fill sizes="(max-width: 768px) 100vw, 50vw" priority={priority} />
    </div>
  );
}
