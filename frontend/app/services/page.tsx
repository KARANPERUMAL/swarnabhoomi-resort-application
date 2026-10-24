import type { Metadata } from "next";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { FinalCta } from "@/components/sections/FinalCta";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildPageMetadata, getBreadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Resort Services, Activities & Amenities",
  description:
    "Explore resort activities and amenities at Swarnabhoomi Farm Stay in Kaggala, Karnataka. Swimming pool, bonfire, barbeque, karaoke, net cricket, badminton, archery, and farm walks.",
  path: "/services",
});

export default function ServicesPage() {
  const breadcrumbData = getBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
  ]);

  return (
    <main className="pt-20">
      <JsonLd data={breadcrumbData} />
      <ExperienceSection headingLevel="h1" />
      <FinalCta />
    </main>
  );
}
