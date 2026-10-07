export function cn(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export function nightsBetween(checkIn: string, checkOut: string) {
  if (!checkIn || !checkOut) return 0;
  const start = new Date(`${checkIn}T00:00:00`);
  const end = new Date(`${checkOut}T00:00:00`);
  const diff = end.getTime() - start.getTime();
  return diff > 0 ? Math.round(diff / 86_400_000) : 0;
}
