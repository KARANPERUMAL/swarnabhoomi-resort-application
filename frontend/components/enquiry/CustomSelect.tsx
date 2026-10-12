"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Check } from "lucide-react";

interface SelectOption {
  value: string;
  label: string;
}

interface CustomSelectProps {
  label: string;
  value?: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  required?: boolean;
  error?: string;
  placeholder?: string;
  className?: string;
}

export function CustomSelect({
  label,
  value,
  options,
  onChange,
  required,
  error,
  placeholder = "Select an option",
  className = "",
}: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  function choose(opt: SelectOption) {
    onChange(opt.value);
    setOpen(false);
  }

  return (
    <div className={`relative grid gap-2 text-sm font-bold ${className}`} ref={ref}>
      <span>
        {label}
        {required && <span className="ml-0.5 text-[var(--sun)]">*</span>}
      </span>

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
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={selected ? "font-normal text-[var(--foreground)]" : "font-normal text-[var(--muted)]"}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown
          size={16}
          className={`shrink-0 text-[var(--leaf)] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {error && <p className="text-xs font-normal text-red-600">{error}</p>}

      {/* Dropdown */}
      {open && (
        <ul
          role="listbox"
          className="absolute left-0 top-full z-50 mt-1 w-full border border-[var(--line)] bg-white shadow-xl"
        >
          {options.map((opt) => {
            const isActive = opt.value === value;
            return (
              <li
                key={opt.value}
                role="option"
                aria-selected={isActive}
                onClick={() => choose(opt)}
                className={[
                  "flex cursor-pointer items-center justify-between px-4 py-3 text-sm font-normal transition",
                  isActive
                    ? "bg-[var(--leaf)] text-white"
                    : "text-[var(--foreground)] hover:bg-[var(--background)]",
                ].join(" ")}
              >
                <span>{opt.label}</span>
                {isActive && <Check size={14} />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
