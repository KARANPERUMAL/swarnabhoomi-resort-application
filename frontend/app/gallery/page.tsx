import type { Metadata } from "next";
import { GallerySection } from "@/components/sections/GallerySection";

export const metadata: Metadata = { title: "Gallery", description: "Browse Swarnabhoomi Farm Stay photographs." };

export default function GalleryPage() {
  return (
    <main className="pt-20">
      <GallerySection />
    </main>
  );
}
