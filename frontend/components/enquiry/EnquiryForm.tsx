"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { submitEnquiry } from "@/lib/api";
import { nightsBetween } from "@/lib/utils";
import type { EnquiryPayload, Gender } from "@/types/enquiry";
import { Button } from "@/components/common/Button";
import { GuestSelector } from "@/components/enquiry/GuestSelector";
import { rooms } from "@/lib/constants";

const today = new Date().toISOString().slice(0, 10);

const initialForm: EnquiryPayload = {
  guestName: "",
  phone: "",
  email: "",
  gender: "PREFER_NOT_TO_SAY",
  adults: 2,
  children: 0,
  checkIn: "",
  checkOut: "",
  selectedRoom: "",
  message: "",
};

export function EnquiryForm({ selectedRoom }: { selectedRoom?: string }) {
  const searchParams = useSearchParams();
  const roomFromQuery = searchParams.get("room") ?? selectedRoom ?? "";
  const [form, setForm] = useState<EnquiryPayload>({ ...initialForm, selectedRoom: roomFromQuery });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [response, setResponse] = useState<string>("");
  const nights = useMemo(() => nightsBetween(form.checkIn, form.checkOut), [form.checkIn, form.checkOut]);

  useEffect(() => {
    if (roomFromQuery) {
      setForm((current) => ({ ...current, selectedRoom: roomFromQuery }));
    }
  }, [roomFromQuery]);

  const setField = <K extends keyof EnquiryPayload>(key: K, value: EnquiryPayload[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setResponse("");

    if (!nights) {
      setStatus("error");
      setResponse("Check-out must be after check-in.");
      return;
    }

    setStatus("loading");
    try {
      const result = await submitEnquiry(form);
      setStatus("success");
      setResponse(`${result.message}${result.enquiryId ? ` Reference: #${result.enquiryId}.` : ""}`);
    } catch (error) {
      setStatus("error");
      setResponse(error instanceof Error ? error.message : "Something went wrong while sending your enquiry.");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-[var(--cream)] p-8 md:p-12">
        <CheckCircle2 className="text-[var(--leaf)]" size={42} />
        <h2 className="mt-6 font-serif text-4xl leading-tight">Thank you for your enquiry.</h2>
        <p className="mt-5 text-lg leading-8 text-[var(--muted)]">{response}</p>
        <dl className="mt-8 grid gap-4 text-sm md:grid-cols-3">
          <div><dt className="font-bold">Dates</dt><dd>{form.checkIn} to {form.checkOut}</dd></div>
          <div><dt className="font-bold">Guests</dt><dd>{form.adults} adults, {form.children} children</dd></div>
          <div><dt className="font-bold">Room</dt><dd>{form.selectedRoom || "Not selected"}</dd></div>
        </dl>
      </div>
    );
  }

  return (
    <form className="grid gap-8 bg-[var(--cream)] p-6 md:p-10" onSubmit={onSubmit}>
      <div>
        <p className="eyebrow">Stay details</p>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-bold">
            Check-in
            <input className="focus-ring border border-[var(--line)] bg-white px-4 py-3" min={today} type="date" value={form.checkIn} onChange={(e) => setField("checkIn", e.target.value)} required />
          </label>
          <label className="grid gap-2 text-sm font-bold">
            Check-out
            <input className="focus-ring border border-[var(--line)] bg-white px-4 py-3" min={form.checkIn || today} type="date" value={form.checkOut} onChange={(e) => setField("checkOut", e.target.value)} required />
          </label>
        </div>
        <p className="mt-4 text-sm text-[var(--muted)]">{nights ? `${nights} night${nights > 1 ? "s" : ""}` : "Select valid dates to calculate nights."}</p>
        <GuestSelector label="Adults" min={1} value={form.adults} onChange={(value) => setField("adults", value)} />
        <GuestSelector label="Children" value={form.children} onChange={(value) => setField("children", value)} />
      </div>

      <div>
        <p className="eyebrow">Primary guest</p>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-bold">
            Full name
            <input className="focus-ring border border-[var(--line)] bg-white px-4 py-3" value={form.guestName} onChange={(e) => setField("guestName", e.target.value)} required />
          </label>
          <label className="grid gap-2 text-sm font-bold">
            Phone number
            <input className="focus-ring border border-[var(--line)] bg-white px-4 py-3" value={form.phone} onChange={(e) => setField("phone", e.target.value)} required />
          </label>
          <label className="grid gap-2 text-sm font-bold">
            Email
            <input className="focus-ring border border-[var(--line)] bg-white px-4 py-3" type="email" value={form.email} onChange={(e) => setField("email", e.target.value)} required />
          </label>
          <label className="grid gap-2 text-sm font-bold">
            Gender
            <select className="focus-ring border border-[var(--line)] bg-white px-4 py-3" value={form.gender} onChange={(e) => setField("gender", e.target.value as Gender)}>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="PREFER_NOT_TO_SAY">Prefer not to say</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm font-bold md:col-span-2">
            Selected room
            <select className="focus-ring border border-[var(--line)] bg-white px-4 py-3" value={form.selectedRoom} onChange={(e) => setField("selectedRoom", e.target.value)}>
              <option value="">Not sure yet</option>
              {rooms.map((room) => <option key={room.slug} value={room.name}>{room.name}</option>)}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-bold md:col-span-2">
            Special request
            <textarea className="focus-ring min-h-32 border border-[var(--line)] bg-white px-4 py-3" value={form.message} onChange={(e) => setField("message", e.target.value)} />
          </label>
        </div>
      </div>

      {response && <p className="text-sm font-bold text-red-700">{response}</p>}
      <Button type="submit" disabled={status === "loading"}>{status === "loading" ? "Sending..." : "Send enquiry"}</Button>
    </form>
  );
}
