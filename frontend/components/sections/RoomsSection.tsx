import { RoomGrid } from "@/components/rooms/RoomGrid";

export function RoomsSection() {
  return (
    <section id="cottages" className="section-pad">
      <div className="container-xl">
        <div className="mb-12">
          <div>
            <p className="eyebrow">Rooms</p>
            <h2 className="mt-4 max-w-3xl font-serif text-6xl leading-[0.9] md:text-8xl">Choose your cottage mood.</h2>
          </div>
        </div>
        <RoomGrid />
      </div>
    </section>
  );
}
