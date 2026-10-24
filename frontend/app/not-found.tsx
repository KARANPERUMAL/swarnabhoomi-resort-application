import Link from "next/link";
import { Button } from "@/components/common/Button";

export default function NotFound() {
  return (
    <main className="flex min-h-[75vh] items-center justify-center pt-28 pb-16">
      <div className="container-xl max-w-2xl text-center">
        <p className="eyebrow">404 Error</p>
        <h1 className="mt-4 font-serif text-5xl leading-[0.95] text-[var(--deep)] md:text-7xl">
          Page not found.
        </h1>
        <p className="mt-6 text-lg leading-8 text-[var(--muted)]">
          The page you are looking for might have been moved, renamed, or is temporarily unavailable. Let us guide you back to our serene farm stay.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button href="/" variant="primary">
            Return Home
          </Button>
          <Button href="/rooms" variant="secondary">
            Explore Rooms
          </Button>
        </div>
      </div>
    </main>
  );
}
