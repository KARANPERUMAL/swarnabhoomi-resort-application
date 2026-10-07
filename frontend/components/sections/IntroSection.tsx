import { ImageReveal } from "@/components/common/ImageReveal";
import { TextReveal } from "@/components/common/TextReveal";
import { Button } from "@/components/common/Button";

export function IntroSection() {
  return (
    <section className="section-pad bg-[var(--background)]">
      <div className="container-xl grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <ImageReveal src="/images/resort/arrival-sign.webp" alt="Swarnabhoomi entrance and cottage" className="aspect-[4/5]" />
        <TextReveal>
          <p className="eyebrow">Home away from home</p>
          <h2 className="mt-5 max-w-3xl font-serif text-[clamp(3.2rem,7vw,7.5rem)] leading-[0.86] text-balance">
            Farm stay calm with resort comfort.
          </h2>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-[var(--muted)]">
            Swarnabhoomi is shaped around nature, family time, group stays, poolside evenings, and the simple pleasure of fresh air. The current site keeps factual details editable where final business information is still pending.
          </p>
          <div className="mt-8">
            <Button href="/about">Discover the resort</Button>
          </div>
        </TextReveal>
      </div>
    </section>
  );
}
