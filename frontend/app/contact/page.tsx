import type { Metadata } from "next";
import { Instagram, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/common/Button";
import { resortContact } from "@/lib/constants";
import { ContentReveal } from "@/components/common/ContentReveal";
import { TextReveal } from "@/components/common/TextReveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildPageMetadata, getBreadcrumbSchema, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact Us & Location Details",
  description:
    "Get in touch with Swarnabhoomi Farm Stay in Kaggala, Karnataka. Reach out by phone, email, or send an enquiry to plan your family stay, celebration, or group outing.",
  path: "/contact",
});

export default function ContactPage() {
  const breadcrumbData = getBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
  ]);

  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${SITE_URL}/contact/#webpage`,
    url: `${SITE_URL}/contact`,
    name: "Contact Swarnabhoomi Farm Stay",
    description: "Contact information, address, and phone number for Swarnabhoomi Farm Stay.",
    mainEntity: {
      "@type": "LodgingBusiness",
      name: resortContact.name,
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
    },
  };

  return (
    <main className="pt-28">
      <JsonLd data={breadcrumbData} />
      <JsonLd data={contactPageSchema} />
      <section className="section-pad">
        <div className="container-xl grid gap-12 lg:grid-cols-[1fr_0.9fr]">
          <TextReveal>
            <p className="eyebrow">Contact</p>
            <h1 className="mt-5 font-serif text-6xl leading-[0.88] md:text-8xl">
              Let the stay begin with a conversation.
            </h1>
          </TextReveal>
          <ContentReveal className="bg-[var(--cream)] p-8" delay={0.12}>
            <a
              className="flex w-fit items-center gap-3 text-lg transition hover:text-[var(--leaf)] hover:underline underline-offset-4 cursor-pointer"
              href={`tel:${resortContact.phone.replace(/\s/g, "")}`}
              aria-label={`Call Swarnabhoomi at ${resortContact.phone}`}
            >
              <Phone aria-hidden="true" /> {resortContact.phone}
            </a>
            <a
              className="mt-5 flex w-fit items-center gap-3 text-lg transition hover:text-[var(--leaf)] hover:underline underline-offset-4 cursor-pointer"
              href={`mailto:${resortContact.email}`}
              aria-label={`Email Swarnabhoomi at ${resortContact.email}`}
            >
              <Mail aria-hidden="true" /> {resortContact.email}
            </a>
            <a
              className="mt-5 flex w-fit items-start gap-3 leading-7 text-[var(--muted)] transition hover:text-[var(--leaf)] hover:underline underline-offset-4 cursor-pointer"
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(resortContact.address)}`}
              target="_blank"
              rel="noreferrer"
              aria-label={`View Swarnabhoomi location on Google Maps: ${resortContact.address}`}
            >
              <MapPin className="mt-1 shrink-0" aria-hidden="true" /> {resortContact.address}
            </a>
            <a
              className="mt-5 flex w-fit items-center gap-3 text-lg text-[var(--leaf)] transition hover:text-[var(--deep)] hover:underline underline-offset-4 cursor-pointer"
              href={resortContact.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Visit Swarnabhoomi on Instagram"
            >
              <Instagram aria-hidden="true" /> Instagram
            </a>
            <div className="mt-8">
              <Button href="/enquiry">Send enquiry</Button>
            </div>
          </ContentReveal>
        </div>
      </section>
    </main>
  );
}
