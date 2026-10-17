"use client";

import { useEffect, useRef } from "react";

/**
 * One red "Visit site" circle for the whole page, fixed to the mouse. It shows
 * whenever the pointer is over any `[data-visit]` element, re-checking on every
 * move and on every frame while the page scrolls or settles, so it stays put
 * while cards slide under a still mouse. Mouse/trackpad only.
 */
export function VisitCursor() {
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = dot.current;
    if (!el || !matchMedia("(pointer: fine)").matches) return;
    let x = -1;
    let y = -1;
    let until = 0;
    let raf = 0;

    const check = () => {
      const over = x >= 0 && !!document.elementFromPoint(x, y)?.closest("[data-visit]");
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      el.dataset.on = String(over);
      raf = performance.now() < until ? requestAnimationFrame(check) : 0;
    };
    // Keep checking for a moment after input: GSAP's scrub keeps moving cards after scrolling stops.
    const kick = () => {
      until = performance.now() + 1200;
      if (!raf) raf = requestAnimationFrame(check);
    };
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x = e.clientX;
      y = e.clientY;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      kick();
    };
    const leave = () => {
      x = -1;
      kick();
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("scroll", kick, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", kick);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div
      ref={dot}
      aria-hidden
      data-on="false"
      className="pointer-events-none fixed left-0 top-0 z-50 -ml-14 -mt-14 hidden size-28 flex-col items-center justify-center gap-1 rounded-full bg-signal text-cream opacity-0 transition-opacity duration-150 ease-out data-[on=true]:opacity-100 [@media(pointer:fine)]:flex"
    >
      <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M7 17 17 7M9 7h8v8" />
      </svg>
      <span className="text-sm font-medium leading-none">Visit site</span>
    </div>
  );
}
