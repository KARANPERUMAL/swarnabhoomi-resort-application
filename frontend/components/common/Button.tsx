import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ButtonProps {
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "light" | "ghostLight" | "outline";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
}

export function Button({
  href,
  children,
  variant = "primary",
  className,
  type = "button",
  disabled,
  onClick,
}: ButtonProps) {
  const classes = cn(
    "btn focus-ring inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-7 text-sm font-extrabold uppercase tracking-[0.16em] transition duration-300 disabled:cursor-not-allowed",
    variant === "primary" && "btn-primary",
    variant === "secondary" && "btn-secondary",
    variant === "light" && "btn-light",
    variant === "ghostLight" && "btn-ghost-light",
    variant === "outline" && "btn-outline",
    disabled && "pointer-events-none opacity-55",
    className,
  );

  const content = (
    <>
      {children}
      <ArrowUpRight aria-hidden size={17} />
    </>
  );

  if (href) {
    return (
      <Link className={classes} href={href}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} type={type} disabled={disabled} onClick={onClick}>
      {content}
    </button>
  );
}
