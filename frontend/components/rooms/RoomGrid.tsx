import { rooms } from "@/lib/constants";
import { RoomCard } from "@/components/rooms/RoomCard";

export function RoomGrid() {
  return (
    <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
      {rooms.map((room) => (
        <RoomCard room={room} key={room.slug} />
      ))}
    </div>
  );
}
