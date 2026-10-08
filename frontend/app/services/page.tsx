import type { Metadata } from "next";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata: Metadata = {
  title: "Services",
  description: "Villa stay, cottage stay, tent stay, pool, bonfire, barbeque, karaoke, games, and farm walk services at Swarnabhoomi.",
};

export default function ServicesPage() {
  return (
    <main className="pt-20">
      <ExperienceSection />
      <FinalCta />
    </main>
  );
}
