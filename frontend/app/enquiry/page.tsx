import type { Metadata } from "next";
import { Suspense } from "react";
import { EnquiryForm } from "@/components/enquiry/EnquiryForm";
import { ContentReveal } from "@/components/common/ContentReveal";
import { TextReveal } from "@/components/common/TextReveal";

export const metadata: Metadata = {
  title: "Enquiry",
  description: "Send an enquiry to Swarnabhoomi Farm Stay. The team will contact you manually to confirm availability.",
};

export default function EnquiryPage() {
  return (
    <main className="pt-28">
      <section className="section-pad">
        <div className="container-xl grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <TextReveal>
            <p className="eyebrow">Manual confirmation</p>
            <h1 className="mt-5 font-serif text-6xl leading-[0.88] md:text-8xl">Send your stay enquiry.</h1>
            <p className="mt-8 text-lg leading-8 text-[var(--muted)]">
              This is not an automatic booking engine. Your enquiry is saved, emailed to the resort team, and then confirmed manually after they contact you.
            </p>
          </TextReveal>
          <ContentReveal delay={0.12}>
            <Suspense fallback={<div className="min-h-[620px] bg-[var(--cream)]" />}>
              <EnquiryForm />
            </Suspense>
          </ContentReveal>
        </div>
      </section>
    </main>
  );
}
