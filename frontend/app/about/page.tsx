import type { Metadata } from "next";
import { IntroSection } from "@/components/sections/IntroSection";
import { ResortSection } from "@/components/sections/ResortSection";

export const metadata: Metadata = { title: "About", description: "About Swarnabhoomi Farm Stay and its nature-led resort experience." };

export default function AboutPage() {
  return (
    <main className="pt-20">
      <IntroSection />
      <ResortSection />
    </main>
  );
}
