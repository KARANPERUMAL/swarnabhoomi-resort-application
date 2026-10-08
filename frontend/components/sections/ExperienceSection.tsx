import Image from "next/image";
import { services } from "@/lib/constants";
import { ContentReveal } from "@/components/common/ContentReveal";
import { TextReveal } from "@/components/common/TextReveal";

export function ExperienceSection() {
  return (
    <section className="bg-[var(--deep)] py-20 text-[var(--cream)]">
      <div className="container-xl">
        <TextReveal>
          <p className="eyebrow">Services</p>
          <h2 className="mt-4 max-w-4xl font-serif text-5xl leading-[0.92] md:text-7xl">Stay, play, gather, and slow down.</h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/70">
            A flexible service list for villa stays, cottages, activities, food-led evenings, and farm-side experiences.
          </p>
        </TextReveal>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((item, index) => (
            <ContentReveal key={item.title} delay={index * 0.08}>
              <article className="group">
              <div className="image-shell aspect-[4/3] bg-black/30">
                <Image src={item.image} alt={item.title} fill sizes="(max-width: 768px) 100vw, 25vw" className="opacity-90 transition duration-700 group-hover:scale-105" />
              </div>
              <h3 className="mt-5 font-serif text-3xl">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/70">{item.text}</p>
              </article>
            </ContentReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
