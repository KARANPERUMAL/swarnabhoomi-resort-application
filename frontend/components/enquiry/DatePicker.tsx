"use client";

import { useEffect, useRef, useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";

interface DatePickerProps {
  label: string;
  value: string; // "YYYY-MM-DD"
  min?: string;  // "YYYY-MM-DD"
  onChange: (value: string) => void;
  required?: boolean;
  error?: string;
}

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
const DAYS = ["Su","Mo","Tu","We","Th","Fr","Sa"];

function parseLocal(dateStr: string): Date | null {
  if (!dateStr) return null;
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function toISO(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function formatDisplay(dateStr: string): string {
  const d = parseLocal(dateStr);
  if (!d) return "";
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

export function DatePicker({ label, value, min, onChange, required, error }: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const selected = parseLocal(value);
  const minDate = parseLocal(min ?? "") ?? today;

  const [cursor, setCursor] = useState<Date>(() => {
    const base = selected ?? minDate;
    return new Date(base.getFullYear(), base.getMonth(), 1);
  });

  // sync cursor when value changes externally
  useEffect(() => {
    const d = parseLocal(value);
    if (d) setCursor(new Date(d.getFullYear(), d.getMonth(), 1));
  }, [value]);

  // close on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  function prevMonth() {
    setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1));
  }
  function nextMonth() {
    setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1));
  }

  function buildCalendarDays(): (Date | null)[] {
    const year = cursor.getFullYear();
    const month = cursor.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells: (Date | null)[] = Array(firstDay).fill(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
    return cells;
  }

  function selectDate(day: Date) {
    onChange(toISO(day));
    setOpen(false);
  }

  const cells = buildCalendarDays();

  return (
    <div className="relative grid gap-2 text-sm font-bold" ref={ref}>
      <span>{label}{required && <span className="ml-0.5 text-[var(--sun)]">*</span>}</span>

      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={[
          "flex items-center justify-between gap-3 border bg-white px-4 py-3 text-left transition",
          "focus:outline-none focus:ring-2 focus:ring-[var(--leaf)] focus:ring-offset-1",
          error ? "border-red-500" : "border-[var(--line)]",
          open ? "border-[var(--leaf)] ring-2 ring-[var(--leaf)] ring-offset-1" : "",
        ].join(" ")}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <span className={value ? "font-normal text-[var(--foreground)]" : "font-normal text-[var(--muted)]"}>
          {value ? formatDisplay(value) : "Select date"}
        </span>
        <CalendarDays size={18} className="shrink-0 text-[var(--leaf)]" />
      </button>

      {error && <p className="text-xs font-normal text-red-600">{error}</p>}

      {/* Calendar dropdown */}
      {open && (
        <div
          role="dialog"
          className="absolute left-0 top-full z-50 mt-2 w-72 border border-[var(--line)] bg-white shadow-xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[var(--line)] px-4 py-3">
            <button
              type="button"
              onClick={prevMonth}
              className="rounded p-1 transition hover:bg-[var(--background)]"
              aria-label="Previous month"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="font-serif text-base font-semibold">
              {MONTHS[cursor.getMonth()]} {cursor.getFullYear()}
            </span>
            <button
              type="button"
              onClick={nextMonth}
              className="rounded p-1 transition hover:bg-[var(--background)]"
              aria-label="Next month"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 border-b border-[var(--line)] px-2 py-1">
            {DAYS.map((d) => (
              <span key={d} className="text-center text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">
                {d}
              </span>
            ))}
          </div>

          {/* Date cells */}
          <div className="grid grid-cols-7 gap-y-0.5 p-2">
            {cells.map((day, i) => {
              if (!day) return <span key={`empty-${i}`} />;

              const iso = toISO(day);
              const isSelected = value === iso;
              const isDisabled = day < minDate;
              const isToday = toISO(day) === toISO(today);

              return (
                <button
                  key={iso}
                  type="button"
                  disabled={isDisabled}
                  onClick={() => selectDate(day)}
                  className={[
                    "flex h-8 w-full items-center justify-center rounded text-sm transition",
                    isDisabled
                      ? "cursor-not-allowed text-[var(--muted)] opacity-40"
                      : "hover:bg-[var(--background)] cursor-pointer",
                    isSelected
                      ? "!bg-[var(--leaf)] font-bold text-white hover:!bg-[var(--deep)]"
                      : "",
                    isToday && !isSelected
                      ? "font-bold text-[var(--leaf)] underline underline-offset-2"
                      : "",
                  ].join(" ")}
                >
                  {day.getDate()}
                </button>
              );
            })}
          </div>

          {/* Footer */}
          <div className="flex justify-end border-t border-[var(--line)] px-4 py-2">
            <button
              type="button"
              onClick={() => { onChange(""); setOpen(false); }}
              className="text-xs text-[var(--muted)] transition hover:text-[var(--foreground)]"
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
