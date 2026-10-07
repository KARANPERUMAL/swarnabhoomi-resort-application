import type { Metadata } from "next";
import { EnquiryForm } from "@/components/enquiry/EnquiryForm";
import { ContentReveal } from "@/components/common/ContentReveal";
import { TextReveal } from "@/components/common/TextReveal";

export const metadata: Metadata = {
  title: "Enquiry",
  description: "Send an enquiry to Swarnabhoomi Farm Stay. The team will contact you manually to confirm availability.",
};

interface PageProps {
  searchParams: Promise<{ room?: string }>;
}

export default async function EnquiryPage({ searchParams }: PageProps) {
  const { room } = await searchParams;
  return (
    <main className="pt-28">
      <section className="section-pad">
        <div className="container-xl grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <TextReveal>
            <p className="eyebrow">Manual confirmation</p>
            <h1 className="mt-5 font-serif text-7xl leading-[0.86] md:text-9xl">Send your stay enquiry.</h1>
            <p className="mt-8 text-lg leading-8 text-[var(--muted)]">
              This is not an automatic booking engine. Your enquiry is saved, emailed to the resort team, and then confirmed manually after they contact you.
            </p>
          </TextReveal>
          <ContentReveal delay={0.12}>
            <EnquiryForm selectedRoom={room} />
          </ContentReveal>
        </div>
      </section>
    </main>
  );
}
