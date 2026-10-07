import { Hero } from "@/components/hero/Hero";
import { IntroSection } from "@/components/sections/IntroSection";
import { ResortSection } from "@/components/sections/ResortSection";
import { RoomsSection } from "@/components/sections/RoomsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { LocationSection } from "@/components/sections/LocationSection";
import { FinalCta } from "@/components/sections/FinalCta";

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
