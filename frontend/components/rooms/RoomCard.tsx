import Image from "next/image";
import Link from "next/link";
import { Users } from "lucide-react";
import type { Room } from "@/types/room";

export function RoomCard({ room }: { room: Room }) {
  return (
    <article className="group">
      <Link className="block focus-ring" href={`/rooms#${room.slug}`}>
        <div className="image-shell aspect-[16/11]">
          <Image src={room.coverImage} alt={room.name} fill sizes="(max-width: 768px) 100vw, 40vw" className="transition duration-700 group-hover:scale-105" />
        </div>
        <div className="mt-5">
          <h3 className="font-serif text-3xl leading-none">{room.name}</h3>
          <p className="mt-3 flex items-center gap-2 text-sm text-[var(--muted)]"><Users size={16} /> {room.capacity}</p>
          <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{room.description}</p>
        </div>
      </Link>
    </article>
  );
}
