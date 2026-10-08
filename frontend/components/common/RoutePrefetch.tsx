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
      routes.forEach((route, index) => {
        const timer = window.setTimeout(() => {
          if (!cancelled) router.prefetch(route);
        }, index * 80);
        timers.push(timer);
      });
    };

    prefetchRoutes();
    const warmAgain = window.setTimeout(prefetchRoutes, 1200);
    timers.push(warmAgain);

    return () => {
      cancelled = true;
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [router]);

  return null;
}
