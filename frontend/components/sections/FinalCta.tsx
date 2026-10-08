import { Button } from "@/components/common/Button";

export function FinalCta() {
  return (
    <section className="bg-[var(--sun)] py-20 text-[var(--deep)]">
      <div className="container-xl flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <div>
          <p className="eyebrow text-[var(--deep)]">Enquiry only</p>
          <h2 className="mt-4 max-w-3xl font-serif text-5xl leading-[0.92] md:text-7xl">Tell us your dates. The team will call you back.</h2>
        </div>
        <Button href="/enquiry" variant="primary" className="shrink-0">Start enquiry</Button>
      </div>
    </section>
  );
}
