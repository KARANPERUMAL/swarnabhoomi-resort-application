import { ImageReveal } from "@/components/common/ImageReveal";
import { ResortFilm } from "@/components/sections/ResortFilm";

export function ResortSection() {
  return (
    <>
      <section className="bg-[var(--cream)] py-20">
        <div className="container-xl grid gap-5 md:grid-cols-[1.2fr_0.8fr]">
          <ImageReveal src="/images/hero/hero-main.webp" alt="Pool and resort at sunset" className="aspect-[16/10] md:aspect-[16/11]" />
          <div className="grid gap-5">
            <ImageReveal src="/images/wellness/aerial-pool.webp" alt="Aerial pool view" className="aspect-[4/3]" />
            <div className="bg-[var(--deep)] p-8 text-[var(--cream)] md:p-10">
              <p className="eyebrow">Stay, food, farm visits</p>
              <h2 className="mt-5 font-serif text-4xl leading-none md:text-5xl">A resort rhythm that turns slow time into the point.</h2>
            </div>
          </div>
        </div>
      </section>
      <ResortFilm />
    </>
  );
}
