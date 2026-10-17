"use client";

import { useEffect, useRef, useState } from "react";
import { bookingUrl, services } from "@/content";
import { CtaButton } from "./CtaButton";
import { ClipReveal } from "./Gsap";
import { Reveal } from "./Motion";

/** Sticky list on the left fills its dots as each service panel crosses mid-screen. */
export function Services() {
  const [active, setActive] = useState(0);
  const panels = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    panels.current.forEach((p) => p && io.observe(p));
    return () => io.disconnect();
  }, []);

  return (
    <div className="mx-auto grid max-w-[1280px] gap-10 px-4 md:grid-cols-[minmax(240px,1fr)_2fr] md:gap-16 md:px-8">
      <div className="hidden md:block">
        <div className="sticky top-36">
          <ol className="relative space-y-6 pl-8">
            <span aria-hidden className="absolute bottom-2 left-[5px] top-2 w-px bg-ink/20" />
            <span
              aria-hidden
              className="absolute left-[5px] top-2 w-px origin-top bg-ink transition-transform duration-500 motion-reduce:transition-none"
              style={{ height: "calc(100% - 16px)", transform: `scaleY(${active / (services.items.length - 1)})` }}
            />
            {services.items.map((s, i) => (
              <li key={s.name} className="relative">
                <span
                  aria-hidden
                  className={`absolute -left-8 top-1/2 size-[11px] -translate-y-1/2 rounded-full border border-ink transition-colors duration-300 ${
                    i <= active ? "bg-ink" : "bg-cream"
                  }`}
                />
                <a
                  href={`#service-${i}`}
                  className={`text-lg uppercase tracking-wide transition-colors duration-300 ${
                    i === active ? "text-ink" : "text-rust hover:text-ink"
                  }`}
                >
                  {s.name}
                </a>
              </li>
            ))}
          </ol>
          <CtaButton href={bookingUrl} className="mt-10">
            Book a free call
          </CtaButton>
        </div>
      </div>

      <div className="space-y-16 md:space-y-0">
        {services.items.map((s, i) => (
          <section
            key={s.name}
            id={`service-${i}`}
            data-i={i}
            ref={(el) => {
              panels.current[i] = el;
            }}
            className="flex flex-col justify-center md:min-h-[62vh]"
            aria-labelledby={`service-${i}-title`}
          >
            <h3 id={`service-${i}-title`} className="text-sm uppercase tracking-wide text-rust md:sr-only">
              {s.name}
            </h3>
            <Reveal as="p" className="mt-3 max-w-[30ch] font-serif text-2xl italic leading-tight md:mt-0 md:text-3xl lg:text-4xl">{s.outcome}</Reveal>
            <ClipReveal className="mt-8 bg-beige p-6 md:p-12">
              <p className="text-3xl font-medium tracking-tight md:text-5xl" aria-hidden>
                {s.name}
              </p>
              <ul className="mt-8 grid gap-x-10 gap-y-5 sm:grid-cols-2">
                {s.points.map((p, j) => (
                  <Reveal as="li" key={p} delay={j * 0.07} className="flex gap-3 text-base leading-snug md:text-xl">
                    <span aria-hidden className="mt-2 size-2 shrink-0 bg-flame" />
                    {p}
                  </Reveal>
                ))}
              </ul>
            </ClipReveal>
          </section>
        ))}
      </div>
    </div>
  );
}
