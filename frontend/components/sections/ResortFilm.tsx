"use client";

import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function ResortFilm() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: node,
          start: "top 78%",
          once: true,
        },
      });

      timeline
        .fromTo(
          ".film-frame",
          { clipPath: "inset(16% 0 16% 0)", scale: 1.06 },
          { clipPath: "inset(0% 0 0% 0)", scale: 1, duration: 1.25, ease: "power3.out" },
        )
        .fromTo(".film-video", { scale: 1.12 }, { scale: 1, duration: 1.5, ease: "power3.out" }, 0)
        .fromTo(".film-overlay", { opacity: 0.72 }, { opacity: 1, duration: 0.9, ease: "power2.out" }, 0.15)
        .fromTo(".film-play", { scale: 0.72, opacity: 0, rotate: -8 }, { scale: 1, opacity: 1, rotate: 0, duration: 0.75, ease: "back.out(1.8)" }, 0.55)
        .fromTo(".film-label", { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }, 0.75);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggle = async () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      await video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  return (
    <section ref={sectionRef} className="bg-[var(--cream)] pb-20">
      <div className="film-frame relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-[var(--deep)]">
          <video
            ref={videoRef}
            className="film-video aspect-[16/7] min-h-[420px] w-full object-cover opacity-90"
            src="/videos/hero/resort-film.mp4"
            poster="/images/hero/hero-main.webp"
            playsInline
            muted
            loop
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
          />
          <div className="film-overlay pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(16,35,19,0.36),rgba(16,35,19,0.58))]" />
          <button
            type="button"
            className="film-play focus-ring absolute left-1/2 top-1/2 inline-flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--cream)] text-[var(--deep)] shadow-[0_24px_70px_rgba(0,0,0,0.34)] transition duration-300 hover:bg-white hover:text-[var(--leaf)]"
            onClick={toggle}
            aria-label={playing ? "Pause resort video" : "Play resort video"}
          >
            <span className="film-pulse absolute inset-0 rounded-full" aria-hidden="true" />
            {playing ? <Pause size={30} fill="currentColor" /> : <Play className="ml-1" size={36} fill="currentColor" />}
          </button>
          <div className="film-label absolute bottom-8 right-[max(2rem,calc((100vw-1240px)/2+2rem))] hidden max-w-sm text-right text-sm font-bold uppercase tracking-[0.18em] text-white/80 md:block">
            Watch the resort film
          </div>
      </div>
    </section>
  );
}
