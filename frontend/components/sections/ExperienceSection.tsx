import Image from "next/image";
import { experiences } from "@/lib/constants";
import { ContentReveal } from "@/components/common/ContentReveal";
import { TextReveal } from "@/components/common/TextReveal";

export function ExperienceSection() {
  return (
    <section className="bg-[var(--deep)] py-20 text-[var(--cream)]">
      <div className="container-xl">
        <TextReveal>
          <p className="eyebrow">Services</p>
          <h2 className="mt-4 max-w-3xl font-serif text-6xl leading-[0.9] md:text-8xl">Nature first, comfort close.</h2>
        </TextReveal>
        <div className="mt-14 grid gap-5 md:grid-cols-4">
          {experiences.map((item, index) => (
            <ContentReveal key={item.title} delay={index * 0.08}>
              <article className="group">
              <div className="image-shell aspect-[3/4] bg-black/30">
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
