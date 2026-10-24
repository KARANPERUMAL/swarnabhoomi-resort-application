import type { Metadata } from "next";
import { resortContact, rooms, services } from "@/lib/constants";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://swarnabhoomi-resort-application.vercel.app"
).replace(/\/$/, "");

export const DEFAULT_OG_IMAGE = {
  url: `${SITE_URL}/images/hero/hero-main.webp`,
  width: 1200,
  height: 630,
  alt: "Swarnabhoomi Farm Stay - Aerial view of resort cottages and pool",
};

export const SITE_NAME = "Swarnabhoomi Farm Stay";
export const DEFAULT_DESCRIPTION =
  "A nature-led farm stay and resort in Kaggala, Karnataka. Enjoy private villa and cottage stays, swimming pool, farm walks, bonfire, barbeque, and outdoor activities for families and groups.";

/**
 * Normalizes a pathname to a clean canonical absolute URL without trailing slashes (except root).
 */
export function buildCanonicalUrl(path: string = "/"): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  if (cleanPath === "/" || cleanPath === "") {
    return `${SITE_URL}/`;
  }
  return `${SITE_URL}${cleanPath.replace(/\/$/, "")}`;
}

interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  image?: {
    url: string;
    width?: number;
    height?: number;
    alt?: string;
  };
  noIndex?: boolean;
}

export function buildPageMetadata({
  title,
  description,
  path,
  image,
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const canonicalUrl = buildCanonicalUrl(path);
  const ogImage = image
    ? {
        url: image.url.startsWith("http") ? image.url : `${SITE_URL}${image.url}`,
        width: image.width || 1200,
        height: image.height || 630,
        alt: image.alt || title,
      }
    : DEFAULT_OG_IMAGE;

  const isHome = path === "/" || path === "";

  return {
    title: isHome ? { absolute: title } : title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      locale: "en_IN",
      type: "website",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage.url],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
  };
}

/**
 * Returns structured data for the WebSite entity.
 */
export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: `${SITE_URL}/`,
    name: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    inLanguage: "en-IN",
    publisher: {
      "@id": `${SITE_URL}/#resort`,
    },
  };
}

/**
 * Returns structured data for the LodgingBusiness / Resort entity using verified repository details.
 */
export function getResortSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Resort", "LodgingBusiness"],
    "@id": `${SITE_URL}/#resort`,
    name: resortContact.name,
    alternateName: "Swarnabhoomi Resort",
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/logos/swarnabhoomi-logo-transparent.png`,
    image: `${SITE_URL}/images/hero/hero-main.webp`,
    description:
      "A nature-led resort and farm stay located in Kaggala, Karnataka, offering villa and cottage stays, private swimming pool, farm walks, bonfire, barbeque, and outdoor group activities.",
    telephone: resortContact.phone,
    email: resortContact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Swarnabhoomi",
      addressLocality: "Kaggala",
      addressRegion: "Karnataka",
      postalCode: "571463",
      addressCountry: "IN",
    },
    sameAs: [resortContact.instagram],
    amenityFeature: services.map((service) => ({
      "@type": "LocationFeatureSpecification",
      name: service.title,
      value: true,
    })),
    makesOffer: rooms.map((room) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "HotelRoom",
        name: room.name,
        description: room.description,
        occupancy: {
          "@type": "QuantitativeValue",
          description: room.capacity,
        },
      },
    })),
  };
}

/**
 * Returns BreadcrumbList structured data for any path.
 */
export function getBreadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: buildCanonicalUrl(item.path),
    })),
  };
}
