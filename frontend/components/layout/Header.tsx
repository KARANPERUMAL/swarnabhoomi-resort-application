"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/common/Button";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/rooms", label: "Rooms" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const overlay = isHome && !scrolled && !open;
  const expandedBrand = isHome && !scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500",
        overlay
          ? "bg-transparent text-white"
          : "glass-header bg-[rgba(255,250,241,0.72)] text-[var(--deep)] backdrop-blur-2xl",
      )}
    >
      <div className={cn("container-xl flex items-center justify-between gap-6 transition-[height] duration-500", expandedBrand ? "h-28" : "h-20")}>
        <Link
          href="/"
          className={cn("focus-ring relative shrink-0 transition-[width,height] duration-500", expandedBrand ? "h-24 w-64" : "h-16 w-56")}
          aria-label="Swarnabhoomi home"
        >
          <Image
            src="/logos/swarnabhoomi-logo-transparent.png"
            alt="Swarnabhoomi Farm Stay"
            width={288}
            height={170}
            className="h-full w-full object-contain"
            style={{ display: "block", height: "100%", width: "100%", objectFit: "contain" }}
          />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link prefetch className="nav-link focus-ring text-sm font-extrabold uppercase tracking-[0.18em] opacity-90 transition hover:opacity-100" href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button href="/enquiry" variant={overlay ? "light" : "secondary"} className="min-h-11 px-7">
            Enquire
          </Button>
        </div>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="icon-button focus-ring inline-flex h-11 w-11 items-center justify-center rounded-full lg:hidden"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-x-0 top-20 z-40 min-h-[calc(100vh-5rem)] bg-[var(--background)] px-6 py-8 text-[var(--deep)] lg:hidden"
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
              {navItems.map((item) => (
                <Link
                  prefetch
                  className="focus-ring border-b border-[var(--line)] py-5 font-serif text-4xl"
                  href={item.href}
                  key={item.href}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <Button href="/enquiry" className="mt-8 w-full" onClick={() => setOpen(false)}>
              Enquire now
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
