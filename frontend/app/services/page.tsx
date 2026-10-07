import type { Metadata } from "next";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata: Metadata = {
  title: "Services",
  description: "Farm walks, pool evenings, food, bonfire, and nature-led services at Swarnabhoomi.",
};

export default function ServicesPage() {
  return (
    <main className="pt-20">
      <ExperienceSection />
      <FinalCta />
    </main>
  );
}
