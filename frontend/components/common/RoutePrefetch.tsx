"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const routes = ["/rooms", "/services", "/gallery", "/about", "/contact", "/enquiry"];

export function RoutePrefetch() {
  const router = useRouter();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      routes.forEach((route) => router.prefetch(route));
    }, 50);

    return () => window.clearTimeout(timer);
  }, [router]);

  return null;
}
