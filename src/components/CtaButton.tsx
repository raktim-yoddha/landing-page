import type { ReactNode } from "react";

/** Square red button with arrows on both sides, like the reference. */
export function CtaButton({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a
      href={href}
      className={`group inline-flex items-center gap-3 bg-signal px-6 py-4 text-sm font-medium text-cream transition-[background-color,transform] duration-200 hover:bg-ink active:scale-[0.97] ${className}`}
    >
      <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
      {children}
      <span aria-hidden className="transition-transform duration-300 group-hover:-translate-x-1">
        ←
      </span>
    </a>
  );
}
