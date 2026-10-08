import type { Metadata } from "next";
import { Instagram, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/common/Button";
import { resortContact } from "@/lib/constants";
import { ContentReveal } from "@/components/common/ContentReveal";
import { TextReveal } from "@/components/common/TextReveal";

export const metadata: Metadata = { title: "Contact", description: "Contact Swarnabhoomi Farm Stay." };

export default function ContactPage() {
  return (
    <main className="pt-28">
      <section className="section-pad">
        <div className="container-xl grid gap-12 lg:grid-cols-[1fr_0.9fr]">
          <TextReveal>
            <p className="eyebrow">Contact</p>
            <h1 className="mt-5 font-serif text-6xl leading-[0.88] md:text-8xl">Let the stay begin with a conversation.</h1>
          </TextReveal>
          <ContentReveal className="bg-[var(--cream)] p-8" delay={0.12}>
            <p className="flex gap-3 text-lg"><Phone /> {resortContact.phone}</p>
            <p className="mt-5 flex gap-3 text-lg"><Mail /> {resortContact.email}</p>
            <p className="mt-5 flex gap-3 leading-7 text-[var(--muted)]"><MapPin className="mt-1 shrink-0" /> {resortContact.address}</p>
            <a className="mt-5 flex gap-3 text-lg text-[var(--leaf)] transition hover:text-[var(--deep)]" href={resortContact.instagram} target="_blank" rel="noreferrer">
              <Instagram /> Instagram
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
