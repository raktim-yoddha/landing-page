"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { bookingUrl, services } from "@/content";
import { CtaButton } from "./CtaButton";
import { ClipReveal } from "./Gsap";
import { Reveal } from "./Motion";

/**
 * Sticky service list (tablet and up) driven continuously by scroll: the line
 * fills and a marker travels between dots as the viewport centre moves from one
 * service panel to the next. DOM is updated directly; React never re-renders
 * while scrolling.
 */
export function Services() {
  const root = useRef<HTMLDivElement>(null);
  const n = services.items.length;

  useGSAP(
    () => {
      const el = root.current!;
      const panels = gsap.utils.toArray<HTMLElement>("[data-panel]", el);
      const dots = gsap.utils.toArray<HTMLElement>("[data-dot]", el);
      const labels = gsap.utils.toArray<HTMLElement>("[data-label]", el);
      const track = el.querySelector<HTMLElement>("[data-track]")!;
      const fill = el.querySelector<HTMLElement>("[data-fill]")!;
      const tip = el.querySelector<HTMLElement>("[data-tip]")!;

      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
        const state = { p: 0 };
        let trackH = 0;
        let centers: number[] = [];

        const draw = () => {
          gsap.set(fill, { scaleY: state.p });
          gsap.set(tip, { y: state.p * trackH });
          const active = Math.round(state.p * (n - 1));
          dots.forEach((d, i) => (d.dataset.on = String(state.p >= i / (n - 1) - 0.002)));
          labels.forEach((l, i) => (l.dataset.active = String(i === active)));
        };
        const to = gsap.quickTo(state, "p", { duration: reduce ? 0 : 0.45, ease: "power3.out", onUpdate: draw });

        const measure = () => {
          trackH = track.getBoundingClientRect().height;
          centers = panels.map((p) => {
            const r = p.getBoundingClientRect();
            return r.top + window.scrollY + r.height / 2;
          });
        };
        // Position of the viewport centre along the chain of panel centres, 0..1.
        const progress = () => {
          const c = window.scrollY + window.innerHeight / 2;
          if (c <= centers[0]) return 0;
          if (c >= centers[n - 1]) return 1;
          let i = 0;
          while (c > centers[i + 1]) i++;
          return (i + (c - centers[i]) / (centers[i + 1] - centers[i])) / (n - 1);
        };

        measure();
        state.p = progress();
        draw();

        ScrollTrigger.create({
          trigger: panels[0].parentElement,
          start: "top bottom",
          end: "bottom top",
          onRefresh: measure,
          onUpdate: () => to(progress()),
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className="mx-auto grid max-w-[1280px] gap-10 px-4 md:grid-cols-[minmax(250px,1fr)_2fr] md:gap-16 md:px-8">
      <div className="hidden md:block">
        <div className="sticky top-36">
          <ol className="relative space-y-6 pl-8">
            {/* Line runs from the first dot centre to the last (rows are a fixed 28px). */}
            <span aria-hidden data-track className="absolute bottom-[14px] left-[5px] top-[14px] w-px bg-ink/15" />
            <span aria-hidden data-fill className="absolute bottom-[14px] left-[5px] top-[14px] w-px origin-top scale-y-0 bg-ink" />
            <span
              aria-hidden
              data-tip
              className="absolute left-[5.5px] top-[14px] z-10 -ml-[7px] -mt-[7px] size-[14px] rounded-full bg-flame ring-4 ring-cream"
            />
            {services.items.map((s, i) => (
              <li key={s.name} className="relative">
                <span
                  aria-hidden
                  data-dot
                  data-on={i === 0 ? "true" : "false"}
                  className="absolute -left-8 top-1/2 size-[11px] -translate-y-1/2 rounded-full border border-ink bg-cream transition-colors duration-300 data-[on=true]:bg-ink"
                />
                <a
                  href={`#service-${i}`}
                  data-label
                  data-active={i === 0 ? "true" : "false"}
                  className="block whitespace-nowrap text-base uppercase leading-7 tracking-wide text-rust transition-colors duration-300 hover:text-ink data-[active=true]:text-ink lg:text-lg"
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

      <div className="space-y-12 md:space-y-0">
        {services.items.map((s, i) => (
          <section
            key={s.name}
            id={`service-${i}`}
            data-panel
            className="flex flex-col justify-center md:min-h-[62vh]"
            aria-labelledby={`service-${i}-title`}
          >
            <h3 id={`service-${i}-title`} className="sr-only">
              {s.name}
            </h3>
            <Reveal as="p" className="max-w-[30ch] font-serif text-2xl italic leading-tight md:text-3xl lg:text-4xl">{s.outcome}</Reveal>
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
