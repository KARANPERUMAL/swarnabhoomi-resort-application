import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/common/Button";
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
            Stay options for families, friends, and group getaways.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--muted)]">
            These room details are arranged from the available room images and can be refined once final room names, capacity, and tariffs are approved.
          </p>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-xl grid gap-16">
          {rooms.map((room) => (
            <article id={room.slug} key={room.slug} className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
              <div className="image-shell aspect-[16/11]">
                <Image src={room.coverImage} alt={room.name} fill sizes="(max-width: 1024px) 100vw, 45vw" />
              </div>
              <div>
                <p className="eyebrow">{room.capacity}</p>
                <h2 className="mt-3 font-serif text-3xl leading-none md:text-4xl">{room.name}</h2>
                <p className="mt-5 text-lg leading-8 text-[var(--muted)]">{room.description}</p>
                <dl className="mt-6 grid gap-4 text-sm md:grid-cols-2">
                  <div className="border-t border-[var(--line)] pt-4">
                    <dt className="font-extrabold uppercase tracking-[0.14em]">Capacity</dt>
                    <dd className="mt-2 text-[var(--muted)]">{room.capacity}</dd>
                  </div>
                  <div className="border-t border-[var(--line)] pt-4">
                    <dt className="font-extrabold uppercase tracking-[0.14em]">Size</dt>
                    <dd className="mt-2 text-[var(--muted)]">{room.size}</dd>
                  </div>
                </dl>
                <div className="mt-6 flex flex-wrap gap-2">
                  {room.amenities.map((amenity) => (
                    <span key={amenity} className="border border-[var(--line)] px-3 py-2 text-xs font-bold uppercase tracking-[0.12em]">
                      {amenity}
                    </span>
                  ))}
                </div>
                <div className="mt-8">
                  <Button href={`/enquiry?room=${encodeURIComponent(room.name)}`}>Enquire for this room</Button>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-3 lg:col-span-2">
                {room.gallery.map((image) => (
                  <div className="image-shell aspect-[16/11]" key={image}>
                    <Image src={image} alt={`${room.name} view`} fill sizes="(max-width: 768px) 100vw, 30vw" />
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
