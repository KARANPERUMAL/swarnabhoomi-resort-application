import type { Metadata } from "next";
import Image from "next/image";
import { Sparkles, Users } from "lucide-react";
import { Button } from "@/components/common/Button";
import { ContentReveal } from "@/components/common/ContentReveal";
import { rooms } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Rooms",
  description: "Explore rooms and stay options at Swarnabhoomi.",
};

export default function RoomsPage() {
  return (
    <main className="pt-20">
      <section className="bg-[var(--cream)] py-16">
        <div className="container-xl">
          <p className="eyebrow">Rooms</p>
          <h1 className="mt-4 max-w-5xl font-serif text-4xl leading-[0.94] md:text-6xl">
            Villa and cottage stays for families, friends, and group getaways.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--muted)]">
            Choose between Villa Stay and Cottage Stay. Every stay can include the wider resort experience, and tent stay can be requested as an add-on for guests who want an outdoor camp-style plan.
          </p>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-xl grid gap-16">
          {rooms.map((room, index) => (
            <ContentReveal delay={index * 0.08} key={room.slug}>
              <article id={room.slug} className="group/room grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
              <div className="image-shell room-image-shell aspect-[16/11] shadow-[0_24px_70px_rgba(16,35,19,0.14)] transition duration-500 group-hover/room:-translate-y-1 group-hover/room:shadow-[0_34px_90px_rgba(16,35,19,0.2)]">
                <Image
                  src={room.coverImage}
                  alt={room.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="transition duration-700 group-hover/room:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_42%,rgba(16,35,19,0.5))] opacity-0 transition duration-500 group-hover/room:opacity-100" />
                <div className="pointer-events-none absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full bg-[rgba(255,250,241,0.92)] px-4 py-2 text-xs font-extrabold uppercase tracking-[0.16em] text-[var(--deep)] opacity-0 shadow-[0_14px_34px_rgba(0,0,0,0.18)] transition duration-500 group-hover/room:opacity-100">
                  <Sparkles size={14} />
                  View stay
                </div>
              </div>
              <div>
                <p className="eyebrow inline-flex items-center gap-2"><Users size={15} /> {room.capacity}</p>
                <h2 className="mt-3 font-serif text-3xl leading-none md:text-4xl">{room.name}</h2>
                <p className="mt-5 text-lg leading-8 text-[var(--muted)]">{room.description}</p>
                <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-2">
                  <div className="border-t border-[var(--line)] pt-4 transition duration-300 group-hover/room:border-[var(--leaf)]">
                    <dt className="font-extrabold uppercase tracking-[0.14em]">Capacity</dt>
                    <dd className="mt-2 text-[var(--muted)]">{room.capacity}</dd>
                  </div>
                  <div className="border-t border-[var(--line)] pt-4 transition duration-300 group-hover/room:border-[var(--leaf)]">
                    <dt className="font-extrabold uppercase tracking-[0.14em]">Experience</dt>
                    <dd className="mt-2 text-[var(--muted)]">Pool, food, games, farm walk, and evening add-ons</dd>
                  </div>
                </dl>
                <div className="mt-8">
                  <Button href={`/enquiry?room=${encodeURIComponent(room.name)}`}>Enquire for this room</Button>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-3 lg:col-span-2">
                {room.gallery.map((image, galleryIndex) => (
                  <div
                    className="image-shell aspect-[16/11] transition duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(16,35,19,0.16)]"
                    key={image}
                    style={{ transitionDelay: `${galleryIndex * 40}ms` }}
                  >
                    <Image
                      src={image}
                      alt={`${room.name} view`}
                      fill
                      sizes="(max-width: 768px) 100vw, 30vw"
                      className="transition duration-700 hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </article>
            </ContentReveal>
          ))}
        </div>
      </section>
    </main>
  );
}
