"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

interface ContentRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function ContentReveal({ children, className, delay = 0 }: ContentRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        node,
        { y: 18 },
        {
          y: 0,
          duration: 0.45,
          delay,
          ease: "power3.out",
          scrollTrigger: { trigger: node, start: "top 86%", once: true },
        },
      );
    }, ref);

    return () => ctx.revert();
  }, [delay]);

  return <div ref={ref} className={cn(className)}>{children}</div>;
}
