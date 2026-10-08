"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const routes = ["/rooms", "/services", "/gallery", "/about", "/contact", "/enquiry"];

export function RoutePrefetch() {
  const router = useRouter();

  useEffect(() => {
    const prefetchRoutes = () => routes.forEach((route) => router.prefetch(route));
    const idleId = "requestIdleCallback" in window
      ? window.requestIdleCallback(prefetchRoutes, { timeout: 1500 })
      : undefined;
    const timer = idleId === undefined ? window.setTimeout(prefetchRoutes, 500) : undefined;

    return () => {
      if (idleId !== undefined && "cancelIdleCallback" in window) window.cancelIdleCallback(idleId);
      if (timer !== undefined) window.clearTimeout(timer);
    };
  }, [router]);

  return null;
}
