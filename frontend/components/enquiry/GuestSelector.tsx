import { Minus, Plus } from "lucide-react";

interface GuestSelectorProps {
  label: string;
  value: number;
  min?: number;
  onChange: (value: number) => void;
}

export function GuestSelector({ label, value, min = 0, onChange }: GuestSelectorProps) {
  return (
    <div className="flex items-center justify-between border-b border-[var(--line)] py-4">
      <span className="font-bold">{label}</span>
      <div className="flex items-center gap-4">
        <button className="icon-button focus-ring rounded-full p-2" type="button" onClick={() => onChange(Math.max(min, value - 1))} aria-label={`Decrease ${label}`}>
          <Minus size={16} />
        </button>
        <span className="w-8 text-center text-lg font-bold">{value}</span>
        <button className="icon-button focus-ring rounded-full p-2" type="button" onClick={() => onChange(value + 1)} aria-label={`Increase ${label}`}>
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
}
