import { rooms } from "@/lib/constants";
import { RoomCard } from "@/components/rooms/RoomCard";

export function RoomGrid() {
  return (
    <div className="grid gap-8 md:grid-cols-3">
      {rooms.map((room) => (
        <RoomCard room={room} key={room.slug} />
      ))}
    </div>
  );
}
