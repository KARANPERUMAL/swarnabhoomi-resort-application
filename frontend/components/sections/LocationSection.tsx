import { Button } from "@/components/common/Button";
import { ImageReveal } from "@/components/common/ImageReveal";

export function LocationSection() {
  return (
    <section className="section-pad">
      <div className="container-xl grid items-center gap-12 lg:grid-cols-[1fr_0.9fr]">
        <div>
          <p className="eyebrow">Location</p>
          <h2 className="mt-4 font-serif text-6xl leading-[0.9] md:text-8xl">Hills, farms, and open air.</h2>
          <p className="mt-7 max-w-xl text-lg leading-8 text-[var(--muted)]">
            The supplied notes mention farm visits, village visits, and nearby travel references. Final map coordinates can be added when confirmed.
          </p>
          <div className="mt-8">
            <Button href="/contact">Contact us</Button>
          </div>
        </div>
        <ImageReveal src="/images/location/hills-sunrise.webp" alt="Sunrise over hills near Swarnabhoomi" className="aspect-[4/5]" />
      </div>
    </section>
  );
}
