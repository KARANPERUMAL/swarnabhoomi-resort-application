import type { Metadata } from "next";
import { Hero } from "@/components/hero/Hero";
import { IntroSection } from "@/components/sections/IntroSection";
import { ResortSection } from "@/components/sections/ResortSection";
import { RoomsSection } from "@/components/sections/RoomsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { LocationSection } from "@/components/sections/LocationSection";
import { FinalCta } from "@/components/sections/FinalCta";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Swarnabhoomi Farm Stay | The Nature's Nest | Resort in Kaggala, Karnataka",
  description:
    "Experience Swarnabhoomi Farm Stay in Kaggala, Karnataka. A nature-led resort featuring private cottages, villa stays, pool evenings, farm walks, outdoor games, and group dining.",
  path: "/",
});

export default function HomePage() {
  return (
    <main>
      <Hero />
      <IntroSection />
      <ResortSection />
      <RoomsSection />
      <ExperienceSection />
      <GallerySection />
      <LocationSection />
      <FinalCta />
    </main>
  );
}
