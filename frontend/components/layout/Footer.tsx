import Link from "next/link";
import { Instagram, Mail, MapPin, Phone } from "lucide-react";
import { resortContact } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-[var(--deep)] py-14 text-[var(--cream)]">
      <div className="container-xl grid gap-10 md:grid-cols-[1.3fr_0.7fr_0.7fr]">
        <div>
          <p className="eyebrow">Swarnabhoomi</p>
          <h2 className="mt-4 max-w-xl font-serif text-4xl leading-[0.98] text-balance">A quieter kind of luxury, held close to nature.</h2>
        </div>
        <div className="space-y-4 text-sm text-white/78">
          <p className="flex gap-3"><Phone size={17} /> {resortContact.phone}</p>
          <p className="flex gap-3"><Mail size={17} /> {resortContact.email}</p>
          <p className="flex gap-3"><MapPin className="mt-0.5 shrink-0" size={17} /> {resortContact.address}</p>
          <a className="flex gap-3 transition hover:text-white" href={resortContact.instagram} target="_blank" rel="noreferrer">
            <Instagram size={17} /> Instagram
          </a>
        </div>
        <div className="grid gap-3 text-sm font-bold uppercase tracking-[0.14em] text-white/80">
          <Link prefetch href="/services">Services</Link>
          <Link prefetch href="/gallery">Gallery</Link>
          <Link prefetch href="/enquiry">Enquire</Link>
          <Link prefetch href="/contact">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
