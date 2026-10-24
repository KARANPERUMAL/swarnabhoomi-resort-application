import type { Metadata } from "next";
import { GallerySection } from "@/components/sections/GallerySection";
import { JsonLd } from "@/components/seo/JsonLd";
import { galleryImages } from "@/lib/constants";
import { buildPageMetadata, getBreadcrumbSchema, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Resort Photo Gallery | Cottages & Pool",
  description:
    "View photos of Swarnabhoomi Farm Stay in Kaggala, Karnataka. Cottages, private villa, swimming pool at night, garden pathways, archery, dining areas, and scenic hills.",
  path: "/gallery",
});

export default function GalleryPage() {
  const breadcrumbData = getBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Gallery", path: "/gallery" },
  ]);

  const imageGallerySchema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: "Swarnabhoomi Farm Stay Photo Gallery",
    description: "Photographs of cottages, swimming pool, villa rooms, and grounds at Swarnabhoomi.",
    url: `${SITE_URL}/gallery`,
    image: galleryImages.map((img) => ({
      "@type": "ImageObject",
      contentUrl: `${SITE_URL}${img.src}`,
      caption: img.alt,
    })),
  };

  return (
    <main className="pt-20">
      <JsonLd data={breadcrumbData} />
      <JsonLd data={imageGallerySchema} />
      <GallerySection headingLevel="h1" />
    </main>
  );
}
