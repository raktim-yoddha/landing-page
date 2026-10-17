"use client";

import { useEffect, useRef, type ReactNode } from "react";

// One shared observer for every Reveal on the page. CSS (globals.css) does the motion.
let observer: IntersectionObserver | undefined;
function observe(el: Element) {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add("is-in");
        observer!.unobserve(e.target);
      }
    },
    { rootMargin: "0px 0px -10% 0px" },
  );
  observer.observe(el);
  return () => observer!.unobserve(el);
}

/** Rises and fades in once when scrolled into view. `delay` in seconds staggers siblings. */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "p" | "span";
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => observe(ref.current!), []);
  return (
    <Tag
      ref={ref as React.Ref<never>}
      data-reveal=""
      className={className}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </Tag>
  );
}
