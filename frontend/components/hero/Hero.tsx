import { Button } from "@/components/common/Button";

export function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-[var(--deep)] text-white">
      <div className="hero-media absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          srcSet="/images/hero/hero-main-mobile.webp 800w, /images/hero/hero-main.webp 1672w"
          sizes="(max-width: 768px) 100vw, 100vw"
          src="/images/hero/hero-main-mobile.webp"
          alt="Aerial view of Swarnabhoomi cottages and pool"
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,18,9,0.68),rgba(8,18,9,0.18)_58%,rgba(8,18,9,0.46))]" />
      <div className="container-xl relative z-10 flex min-h-[100svh] items-end pb-16 pt-32 md:pb-24">
        <div className="hero-copy max-w-3xl">
          <h1 className="font-serif text-[clamp(2.6rem,9.5vw,9.8rem)] leading-[0.84] text-balance">The nature&apos;s nest.</h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--sun)] md:text-[1.05rem]">
              A home away from home for families and groups:
              <br className="hidden md:block" />
              nature-led cottages, pool evenings, farm walks, food packages,
              <br className="hidden md:block" />
              and calm space to breathe.
            </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Button href="/enquiry" variant="light">Enquire now</Button>
            <Button href="/rooms" variant="ghostLight">Explore rooms</Button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 right-8 hidden text-xs font-bold uppercase tracking-[0.22em] text-white/70 md:block">Scroll</div>
    </section>
  );
}
