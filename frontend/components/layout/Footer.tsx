import Link from "next/link";
import { Instagram, Mail, MapPin, Phone } from "lucide-react";
import { resortContact } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-[var(--deep)] py-14 text-[var(--cream)]">
      <div className="container-xl grid gap-10 md:grid-cols-[1.3fr_0.7fr_0.7fr]">
        <div>
          <p className="eyebrow">Swarnabhoomi</p>
          <h2 className="mt-4 max-w-xl font-serif text-4xl leading-[0.98] text-balance">
            A quieter kind of luxury, held close to nature.
          </h2>
          <p className="mt-3 text-xs text-white/50">
            © {new Date().getFullYear()} {resortContact.name}. All rights reserved.
          </p>
        </div>
        <div className="space-y-4 text-sm text-white/78">
          <a
            className="flex w-fit items-center gap-3 transition hover:text-white hover:underline underline-offset-4 cursor-pointer"
            href={`tel:${resortContact.phone.replace(/\s/g, "")}`}
            aria-label={`Call Swarnabhoomi at ${resortContact.phone}`}
          >
            <Phone size={17} aria-hidden="true" /> {resortContact.phone}
          </a>
          <a
            className="flex w-fit items-center gap-3 transition hover:text-white hover:underline underline-offset-4 cursor-pointer"
            href={`mailto:${resortContact.email}`}
            aria-label={`Email Swarnabhoomi at ${resortContact.email}`}
          >
            <Mail size={17} aria-hidden="true" /> {resortContact.email}
          </a>
          <a
            className="flex w-fit items-start gap-3 transition hover:text-white hover:underline underline-offset-4 cursor-pointer"
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(resortContact.address)}`}
            target="_blank"
            rel="noreferrer"
            aria-label={`View resort address on Google Maps: ${resortContact.address}`}
          >
            <MapPin className="mt-0.5 shrink-0" size={17} aria-hidden="true" /> {resortContact.address}
          </a>
          <a
            className="flex w-fit items-center gap-3 transition hover:text-white hover:underline underline-offset-4 cursor-pointer"
            href={resortContact.instagram}
            target="_blank"
            rel="noreferrer"
            aria-label="Visit Swarnabhoomi on Instagram"
          >
            <Instagram size={17} aria-hidden="true" /> Instagram
          </a>
        </div>
        <nav
          className="grid gap-3 text-sm font-bold uppercase tracking-[0.14em] text-white/80"
          aria-label="Footer navigation"
        >
          <Link prefetch href="/rooms">Rooms</Link>
          <Link prefetch href="/services">Services</Link>
          <Link prefetch href="/gallery">Gallery</Link>
          <Link prefetch href="/about">About</Link>
          <Link prefetch href="/contact">Contact</Link>
          <Link prefetch href="/enquiry">Enquire</Link>
        </nav>
      </div>
    </footer>
  );
}
