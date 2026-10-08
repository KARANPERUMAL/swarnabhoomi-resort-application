import { ImageReveal } from "@/components/common/ImageReveal";
import { TextReveal } from "@/components/common/TextReveal";
import { Button } from "@/components/common/Button";

export function IntroSection() {
  return (
    <section className="section-pad bg-[var(--background)]">
      <div className="container-xl grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <ImageReveal src="/images/services/A38.webp" alt="Garden cottages and outdoor activity lawn" className="aspect-[4/5]" />
        <TextReveal>
          <p className="eyebrow">Home away from home</p>
          <h2 className="mt-5 max-w-3xl font-serif text-[clamp(2.6rem,5.6vw,6rem)] leading-[0.9] text-balance">
            FARM STAY WITH RESORT COMFORT.
          </h2>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-[var(--muted)]">
            Secondary writing will be refined after client approval. For now, this space frames Swarnabhoomi as a nature-led stay with cottages, pool time, food, games, and flexible group experiences.
          </p>
          <div className="mt-8">
            <Button href="/about">Discover the resort</Button>
          </div>
        </TextReveal>
      </div>
    </section>
  );
}
