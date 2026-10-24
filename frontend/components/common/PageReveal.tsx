"use client";

import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export function PageReveal({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // On initial page load, do not apply an initial translateY offset that delays or mutates LCP.
  // Only apply entrance animation on client-side route transitions.
  const shouldAnimate = !reduceMotion && mounted;

  return (
    <motion.div
      key={pathname}
      initial={shouldAnimate ? { y: 6 } : false}
      animate={{ y: 0 }}
      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
