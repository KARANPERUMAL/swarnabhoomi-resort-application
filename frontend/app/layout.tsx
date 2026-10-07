import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/common/SmoothScroll";
import { PageReveal } from "@/components/common/PageReveal";
import { RoutePrefetch } from "@/components/common/RoutePrefetch";

export const metadata: Metadata = {
  metadataBase: new URL("https://swarnabhoomi.example"),
  title: {
    default: "Swarnabhoomi Farm Stay | The Nature's Nest",
    template: "%s | Swarnabhoomi Farm Stay",
  },
  description:
    "A premium farm stay experience shaped around nature, poolside evenings, family stays, food, and calm resort living.",
  openGraph: {
    title: "Swarnabhoomi Farm Stay",
    description:
      "Home away from home: a nature-led farm stay with cottages, pool, food, and experiences.",
    images: ["/images/hero/hero-main.webp"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
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
