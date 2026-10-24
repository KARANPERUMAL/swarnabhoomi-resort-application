import type { Metadata } from "next";
import { IntroSection } from "@/components/sections/IntroSection";
import { ResortSection } from "@/components/sections/ResortSection";
import { FinalCta } from "@/components/sections/FinalCta";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildPageMetadata, getBreadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "About Our Farm Stay & Nature Resort",
  description:
    "Learn about Swarnabhoomi Farm Stay in Kaggala, Karnataka. A private haven offering villa stays, cottages, pool evenings, farm walks, and quiet nature getaways for groups.",
  path: "/about",
});

export default function AboutPage() {
  const breadcrumbData = getBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
  ]);

  return (
    <main className="pt-28">
      <JsonLd data={breadcrumbData} />
      <section className="bg-[var(--background)] pb-12">
        <div className="container-xl grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow">About Swarnabhoomi</p>
            <h1 className="mt-4 font-serif text-4xl leading-[0.94] md:text-6xl">
              A farm-side resort experience shaped for groups.
            </h1>
          </div>
          <div className="grid gap-5 text-lg leading-8 text-[var(--muted)]">
            <p>
              Swarnabhoomi brings together villa-style stays, cottages, a swimming pool, food-led evenings, and outdoor activities in a calm farm setting.
            </p>
            <p>
              The final detailed brand story, ownership notes, and operating details should be added after Mithra sir&apos;s consent. Until then, the copy stays intentionally flexible and factual.
            </p>
            <p>
              The experience is best suited for families, friend groups, small celebrations, and team outings that need privacy, activities, and a slower nature-led rhythm.
            </p>
          </div>
        </div>
      </section>
      <IntroSection ctaHref="/rooms" ctaText="Explore our rooms" />
      <ResortSection />
      <FinalCta />
    </main>
  );
}
