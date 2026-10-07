import Image from "next/image";
import { Users } from "lucide-react";
import type { Room } from "@/types/room";

export function RoomCard({ room }: { room: Room }) {
  return (
    <article className="group">
      <div className="block">
        <div className="image-shell aspect-[4/5]">
          <Image src={room.coverImage} alt={room.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="transition duration-700 group-hover:scale-105" />
        </div>
        <div className="mt-5">
          <h3 className="font-serif text-3xl leading-none">{room.name}</h3>
          <p className="mt-3 flex items-center gap-2 text-sm text-[var(--muted)]"><Users size={16} /> {room.capacity}</p>
        </div>
      </div>
    </article>
  );
}
