import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/common/SmoothScroll";
import { PageReveal } from "@/components/common/PageReveal";
import { RoutePrefetch } from "@/components/common/RoutePrefetch";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  SITE_URL,
  SITE_NAME,
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  getWebsiteSchema,
  getResortSchema,
} from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Swarnabhoomi Farm Stay | The Nature's Nest | Resort in Kaggala, Karnataka",
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  alternates: {
    canonical: `${SITE_URL}/`,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: `${SITE_URL}/`,
    siteName: SITE_NAME,
    title: "Swarnabhoomi Farm Stay | The Nature's Nest",
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Swarnabhoomi Farm Stay | The Nature's Nest",
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE.url],
  },
  icons: {
    icon: "/logos/swarnabhoomi-logo-transparent.png",
    apple: "/logos/swarnabhoomi-logo-transparent.png",
  },
  robots: {
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <JsonLd data={getWebsiteSchema()} />
        <JsonLd data={getResortSchema()} />
      </head>
      <body>
        <SmoothScroll />
        <RoutePrefetch />
        <Header />
        <PageReveal>{children}</PageReveal>
        <Footer />
      </body>
    </html>
  );
}
