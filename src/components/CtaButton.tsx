import type { ReactNode } from "react";

/**
 * Square red booking button. Two arrows keep nudging in toward the label (CSS
 * `cta-nudge`, globals.css); `small` is the compact header version.
 */
export function CtaButton({
  href,
  children,
  className = "",
  small = false,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  small?: boolean;
}) {
  const size = small ? "gap-2 px-3 py-2.5 text-[13px] md:gap-2.5 md:px-4 md:py-3 md:text-sm" : "gap-3 px-6 py-4 text-sm";
  return (
    <a
      href={href}
      className={`inline-flex items-center whitespace-nowrap bg-signal font-medium text-cream transition-[background-color,transform] duration-200 hover:bg-ink active:scale-[0.97] ${size} ${className}`}
    >
      <span aria-hidden className="cta-nudge">→</span>
      {children}
      <span aria-hidden className="cta-nudge cta-nudge-left">←</span>
    </a>
  );
}
