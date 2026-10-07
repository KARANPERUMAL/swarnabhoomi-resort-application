"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Button } from "@/components/common/Button";

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(".hero-media", { scale: 1.04 }, { scale: 1, duration: 1.2, ease: "power3.out" });
      gsap.fromTo(".hero-copy > *", { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55, stagger: 0.08, ease: "power3.out", delay: 0.08 });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative min-h-[100svh] overflow-hidden bg-[var(--deep)] text-white">
      <div className="hero-media absolute inset-0">
        <Image src="/images/hero/hero-main.webp" alt="Swarnabhoomi Farm Stay pool and cottages at sunset" fill sizes="100vw" priority className="object-cover" />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,18,9,0.68),rgba(8,18,9,0.18)_58%,rgba(8,18,9,0.46))]" />
      <div className="container-xl relative z-10 flex min-h-[100svh] items-end pb-16 pt-32 md:pb-24">
        <div className="hero-copy max-w-4xl">
          <p className="eyebrow text-[#ffc46f]">Swarnabhoomi Farm Stay</p>
          <h1 className="mt-5 font-serif text-[clamp(4.3rem,12vw,12rem)] leading-[0.78] text-balance">The nature&apos;s nest.</h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-white/86 md:text-xl">
            A home away from home for families and groups: nature-led cottages, pool evenings, farm walks, food packages, and calm space to breathe.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Button href="/enquiry" variant="light">Enquire now</Button>
            <Button href="#cottages" variant="ghostLight">Explore cottages</Button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 right-8 hidden text-xs font-bold uppercase tracking-[0.22em] text-white/70 md:block">Scroll</div>
    </section>
  );
}
