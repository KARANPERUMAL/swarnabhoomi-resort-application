import { Button } from "@/components/common/Button";
import { ImageReveal } from "@/components/common/ImageReveal";

export function LocationSection() {
  return (
    <section className="section-pad">
      <div className="container-xl grid items-center gap-12 lg:grid-cols-[1fr_0.9fr]">
        <div>
          <p className="eyebrow">Location</p>
          <h2 className="mt-4 font-serif text-4xl leading-[0.94] md:text-6xl">Hills, farms, and open air.</h2>
          <p className="mt-7 max-w-xl text-lg leading-8 text-[var(--muted)]">
            Located in Kaggala, Karnataka (571463), Swarnabhoomi offers quiet farm surroundings with scenic hill views, village walks, and fresh countryside air. Contact our team for route guidance and travel details.
          </p>
          <div className="mt-8">
            <Button href="/contact">Contact us</Button>
          </div>
        </div>
        <ImageReveal
          src="/images/location/hills-sunrise.webp"
          alt="Sunrise over hills near Swarnabhoomi Farm Stay in Kaggala, Karnataka"
          className="aspect-[4/5]"
        />
      </div>
    </section>
  );
}
