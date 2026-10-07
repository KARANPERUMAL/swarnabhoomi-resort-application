"use client";

import Lenis from "@studio-freight/lenis";
import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ duration: 0.65, smoothWheel: true, wheelMultiplier: 1 });

    const raf = (time: number) => {
      lenis.raf(time);
      ScrollTrigger.update();
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return null;
}
