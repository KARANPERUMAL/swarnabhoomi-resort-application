"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { submitEnquiry } from "@/lib/api";
import { nightsBetween } from "@/lib/utils";
import type { EnquiryPayload, Gender } from "@/types/enquiry";
import { Button } from "@/components/common/Button";
import { GuestSelector } from "@/components/enquiry/GuestSelector";
import { DatePicker } from "@/components/enquiry/DatePicker";
import { CustomSelect } from "@/components/enquiry/CustomSelect";
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

type FieldErrors = Partial<Record<keyof EnquiryPayload | "dates", string>>;

const genderOptions = [
  { value: "MALE", label: "Male" },
  { value: "FEMALE", label: "Female" },
  { value: "PREFER_NOT_TO_SAY", label: "Prefer not to say" },
];

const roomOptions = [
  { value: "", label: "Not sure yet" },
  ...rooms.map((r) => ({ value: r.name, label: r.name })),
];

export function EnquiryForm({ selectedRoom }: { selectedRoom?: string }) {
  const searchParams = useSearchParams();
  const roomFromQuery = searchParams.get("room") ?? selectedRoom ?? "";
  const [form, setForm] = useState<EnquiryPayload>({ ...initialForm, selectedRoom: roomFromQuery });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [response, setResponse] = useState<string>("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Set<string>>(new Set());

  const nights = useMemo(() => nightsBetween(form.checkIn, form.checkOut), [form.checkIn, form.checkOut]);

  useEffect(() => {
    if (roomFromQuery) {
      setForm((current) => ({ ...current, selectedRoom: roomFromQuery }));
    }
  }, [roomFromQuery]);

  const setField = <K extends keyof EnquiryPayload>(key: K, value: EnquiryPayload[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
    // Clear error on change
    setErrors((prev) => ({ ...prev, [key]: undefined, dates: undefined }));
  };

  function touch(field: string) {
    setTouched((prev) => new Set(prev).add(field));
  }

  function validate(): FieldErrors {
    const errs: FieldErrors = {};
    if (!form.checkIn) errs.checkIn = "Please select a check-in date.";
    if (!form.checkOut) errs.checkOut = "Please select a check-out date.";
    if (form.checkIn && form.checkOut && !nights) errs.dates = "Check-out must be after check-in.";
    if (!form.guestName.trim()) errs.guestName = "Full name is required.";
    if (!form.phone.trim()) errs.phone = "Phone number is required.";
    if (!form.email.trim()) errs.email = "Email address is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Please enter a valid email.";
    return errs;
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setResponse("");

    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      // Mark all fields as touched so errors show
      setTouched(new Set(Object.keys(errs)));
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
    <form className="grid gap-8 bg-[var(--cream)] p-6 md:p-10" onSubmit={onSubmit} noValidate>
      {/* ── Stay details ─────────────────────────────────────── */}
      <div>
        <p className="eyebrow">Stay details</p>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <DatePicker
            label="Check-in"
            value={form.checkIn}
            min={today}
            onChange={(v) => { setField("checkIn", v); touch("checkIn"); }}
            required
            error={touched.has("checkIn") ? errors.checkIn : undefined}
          />
          <DatePicker
            label="Check-out"
            value={form.checkOut}
            min={form.checkIn || today}
            onChange={(v) => { setField("checkOut", v); touch("checkOut"); }}
            required
            error={touched.has("checkOut") ? errors.checkOut : undefined}
          />
        </div>

        {errors.dates && (
          <p className="mt-2 text-sm text-red-600">{errors.dates}</p>
        )}
        <p className="mt-4 text-sm text-[var(--muted)]">
          {nights ? `${nights} night${nights > 1 ? "s" : ""}` : "Select valid dates to calculate nights."}
        </p>

        <GuestSelector label="Adults" min={1} value={form.adults} onChange={(value) => setField("adults", value)} />
        <GuestSelector label="Children" value={form.children} onChange={(value) => setField("children", value)} />
      </div>

      {/* ── Primary guest ─────────────────────────────────────── */}
      <div>
        <p className="eyebrow">Primary guest</p>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {/* Full name */}
          <label className="grid gap-2 text-sm font-bold">
            Full name<span className="ml-0.5 text-[var(--sun)]">*</span>
            <input
              className={[
                "border bg-white px-4 py-3 font-normal outline-none transition",
                "focus:ring-2 focus:ring-[var(--leaf)] focus:ring-offset-1",
                errors.guestName && touched.has("guestName")
                  ? "border-red-500"
                  : "border-[var(--line)]",
              ].join(" ")}
              value={form.guestName}
              onChange={(e) => setField("guestName", e.target.value)}
              onBlur={() => touch("guestName")}
            />
            {errors.guestName && touched.has("guestName") && (
              <span className="text-xs font-normal text-red-600">{errors.guestName}</span>
            )}
          </label>

          {/* Phone number */}
          <label className="grid gap-2 text-sm font-bold">
            Phone number<span className="ml-0.5 text-[var(--sun)]">*</span>
            <input
              className={[
                "border bg-white px-4 py-3 font-normal outline-none transition",
                "focus:ring-2 focus:ring-[var(--leaf)] focus:ring-offset-1",
                errors.phone && touched.has("phone") ? "border-red-500" : "border-[var(--line)]",
              ].join(" ")}
              type="tel"
              value={form.phone}
              onChange={(e) => setField("phone", e.target.value)}
              onBlur={() => touch("phone")}
            />
            {errors.phone && touched.has("phone") && (
              <span className="text-xs font-normal text-red-600">{errors.phone}</span>
            )}
          </label>

          {/* Email */}
          <label className="grid gap-2 text-sm font-bold">
            Email<span className="ml-0.5 text-[var(--sun)]">*</span>
            <input
              className={[
                "border bg-white px-4 py-3 font-normal outline-none transition",
                "focus:ring-2 focus:ring-[var(--leaf)] focus:ring-offset-1",
                errors.email && touched.has("email") ? "border-red-500" : "border-[var(--line)]",
              ].join(" ")}
              type="email"
              value={form.email}
              onChange={(e) => setField("email", e.target.value)}
              onBlur={() => touch("email")}
            />
            {errors.email && touched.has("email") && (
              <span className="text-xs font-normal text-red-600">{errors.email}</span>
            )}
          </label>

          {/* Gender */}
          <CustomSelect
            label="Gender"
            value={form.gender}
            options={genderOptions}
            onChange={(v) => setField("gender", v as Gender)}
          />

          {/* Selected room */}
          <CustomSelect
            label="Selected room"
            value={form.selectedRoom}
            options={roomOptions}
            onChange={(v) => setField("selectedRoom", v)}
            className="md:col-span-2"
          />

          {/* Special request */}
          <label className="grid gap-2 text-sm font-bold md:col-span-2">
            Special request
            <textarea
              className="min-h-32 border border-[var(--line)] bg-white px-4 py-3 font-normal outline-none transition focus:ring-2 focus:ring-[var(--leaf)] focus:ring-offset-1"
              value={form.message}
              onChange={(e) => setField("message", e.target.value)}
            />
          </label>
        </div>
      </div>

      {/* ── Submit ─────────────────────────────────────────────── */}
      {response && status === "error" && (
        <p className="text-sm font-bold text-red-700">{response}</p>
      )}
      <Button type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Sending..." : "Send enquiry"}
      </Button>
    </form>
  );
}
