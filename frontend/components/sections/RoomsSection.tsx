import { RoomGrid } from "@/components/rooms/RoomGrid";

export function RoomsSection() {
  return (
    <section id="cottages" className="section-pad">
      <div className="container-xl">
        <div className="mb-12">
          <div>
            <p className="eyebrow">Rooms</p>
            <h2 className="mt-4 max-w-5xl font-serif text-5xl leading-[0.92] md:text-7xl">Rooms for families, groups, and quiet resort stays.</h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--muted)]">
              Villa-style stays, cottages, and group-friendly rooms are presented for enquiry-based booking. Final names and tariff details can be edited later.
            </p>
          </div>
        </div>
        <RoomGrid />
      </div>
    </section>
  );
}
