"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const routes = ["/rooms", "/services", "/gallery", "/about", "/contact", "/enquiry"];

export function RoutePrefetch() {
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;
    const timers: number[] = [];

    const prefetchRoutes = () => {
      if (cancelled) return;
      routes.forEach((route, index) => {
        const timer = window.setTimeout(() => {
          if (!cancelled) router.prefetch(route);
        }, index * 120);
        timers.push(timer);
      });
    };

    // Defer route warming until after initial page load and when the browser is idle
    // so prefetching never competes with critical LCP images and initial paint.
    const scheduleIdlePrefetch = () => {
      const win = typeof window !== "undefined" ? window : null;
      if (!win) return;

      const idleCallback = (win as unknown as { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number }).requestIdleCallback;
      if (typeof idleCallback === "function") {
        const idleId = idleCallback(prefetchRoutes, { timeout: 4000 });
        timers.push(idleId);
      } else {
        const timer = win.setTimeout(prefetchRoutes, 3500);
        timers.push(timer);
      }
    };

    if (document.readyState === "complete") {
      scheduleIdlePrefetch();
    } else {
      window.addEventListener("load", scheduleIdlePrefetch, { once: true });
    }

    return () => {
      cancelled = true;
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [router]);

  return null;
}
