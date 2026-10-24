"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const routes = ["/rooms", "/services", "/gallery", "/about", "/contact", "/enquiry"];

export function RoutePrefetch() {
  const router = useRouter();

  useEffect(() => {
    let prefetched = false;

    const onUserActivity = () => {
      if (prefetched) return;
      prefetched = true;
      window.removeEventListener("pointerdown", onUserActivity);
      window.removeEventListener("touchstart", onUserActivity);
      window.removeEventListener("scroll", onUserActivity);

      routes.forEach((route) => router.prefetch(route));
    };

    window.addEventListener("pointerdown", onUserActivity, { passive: true, once: true });
    window.addEventListener("touchstart", onUserActivity, { passive: true, once: true });
    window.addEventListener("scroll", onUserActivity, { passive: true, once: true });

    return () => {
      window.removeEventListener("pointerdown", onUserActivity);
      window.removeEventListener("touchstart", onUserActivity);
      window.removeEventListener("scroll", onUserActivity);
    };
  }, [router]);

  return null;
}
