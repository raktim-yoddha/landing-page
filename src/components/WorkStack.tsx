"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useRef } from "react";
import { work } from "@/content";
import "./Gsap"; // registers ScrollTrigger

export type Item = (typeof work.items)[number];

/**
 * Pinned stage (tablet and up). Each next card slides up from below while the current
 * one sinks back and fades out, so only one card is ever visible. Phones, reduced
 * motion and no-JS get a plain list.
 */
export function WorkStack() {
  const stage = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = stage.current!;
      const cards = gsap.utils.toArray<HTMLElement>("[data-card]", el);
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        el.dataset.stack = "on";
        // Park the waiting cards fully below the viewport.
        const below = () => window.innerHeight;
        gsap.set(cards.slice(1), { y: below });

        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut", duration: 1 },
          scrollTrigger: {
            trigger: el,
            pin: true,
            start: "top top",
            end: () => `+=${(cards.length - 1) * window.innerHeight}`,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });

        tl.addLabel("card-0");
        cards.slice(1).forEach((card, i) => {
          tl.fromTo(card, { y: below }, { y: 0 }, `card-${i}`)
            .to(cards[i], { scale: 0.88, yPercent: -6, opacity: 0, ease: "power1.in" }, `card-${i}`)
            .addLabel(`card-${i + 1}`);
        });

        return () => {
          delete el.dataset.stack;
        };
      });

      return () => mm.revert();
    },
    { scope: stage },
  );

  return (
    <div
      ref={stage}
      className="group/stack flex flex-col items-center gap-6 px-4 pb-10 pt-10 md:gap-8 md:pb-24 data-[stack=on]:grid data-[stack=on]:h-svh data-[stack=on]:place-items-center data-[stack=on]:gap-0 data-[stack=on]:overflow-hidden data-[stack=on]:pb-0 data-[stack=on]:pt-[72px] md:px-8"
    >
      {work.items.map((item, i) => (
        <Card key={item.name} item={item} i={i} />
      ))}
    </div>
  );
}

function Card({ item, i }: { item: Item; i: number }) {
  return (
    <article
      data-card
      style={{ zIndex: i + 1 }}
      className="group/card flex w-full max-w-[1280px] origin-top flex-col overflow-hidden bg-beige group-data-[stack=on]/stack:[grid-area:1/1] md:h-[min(calc(100svh-140px),640px)] md:flex-row"
    >
      <ShotLink item={item} className="p-5 pb-8 pr-8 md:h-auto md:w-1/2 md:p-10 md:pb-12 md:pr-12">
        <BrowserFrame item={item} sizes="(min-width: 768px) 560px, 90vw" className="md:max-w-[90%]" />
      </ShotLink>
      <div className="flex min-h-0 flex-1 p-3 md:p-6">
        <div className="flex flex-1 flex-col border border-orange p-5 md:p-10">
          <h3 className="text-3xl uppercase leading-[0.95] tracking-tight md:text-4xl lg:text-5xl xl:text-6xl">{item.name}</h3>
          <p className="mt-2 font-serif text-lg italic text-rust">{item.tags.join(" · ")}</p>
          <p className="mt-3 max-w-[40ch] font-serif text-lg italic leading-snug md:mt-5 md:text-xl lg:text-2xl">{item.body}</p>
          <div className="mt-auto flex items-end justify-between gap-4 pt-4">
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 bg-signal px-5 py-3.5 text-sm font-medium text-cream transition-colors hover:bg-ink md:px-6 md:py-4 md:text-base"
            >
              {item.linkLabel}
              <span className="sr-only">(opens in a new tab)</span>
            </a>
            <svg
              aria-hidden
              viewBox="0 0 48 48"
              className="size-10 text-flame transition-transform duration-500 group-hover/card:-translate-y-1 group-hover/card:translate-x-1 md:size-14"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            >
              <path d="M10 38 38 10M16 10h22v22" />
            </svg>
          </div>
        </div>
      </div>
    </article>
  );
}

/**
 * The screenshot panel links to the live site. `data-visit` tells VisitCursor to
 * show the "Visit site" circle here; the system pointer hides on mouse devices.
 */
export function ShotLink({ item, children, className = "" }: { item: Item; children: React.ReactNode; className?: string }) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit ${item.name} (opens in a new tab)`}
      draggable={false}
      data-visit=""
      className={`relative grid shrink-0 select-none place-items-center overflow-hidden bg-sand [-webkit-user-drag:none] [@media(pointer:fine)]:cursor-none ${className}`}
    >
      {children}
    </a>
  );
}

/**
 * Screenshot shown as a browser window: charcoal title bar with the real address,
 * and a soft clay block offset behind it. Dark and light sites both read as "a website
 * in a window" instead of a bare rectangle on the card.
 */
export function BrowserFrame({ item, sizes, className = "" }: { item: Item; sizes: string; className?: string }) {
  const u = new URL(item.url);
  const address = (u.host.replace(/^www\./, "") + u.pathname).replace(/\/$/, "");
  return (
    <div className={`relative w-full ${className}`}>
      <div
        aria-hidden
        className="absolute inset-0 translate-x-3 translate-y-3 bg-clay transition-transform duration-500 ease-out group-hover/card:translate-x-4 group-hover/card:translate-y-4 md:translate-x-4 md:translate-y-4 md:group-hover/card:translate-x-5 md:group-hover/card:translate-y-5"
      />
      <div className="relative overflow-hidden bg-ink transition-transform duration-500 ease-out group-hover/card:-translate-x-0.5 group-hover/card:-translate-y-0.5">
        <div className="flex items-center gap-3 px-3 py-2 md:px-4 md:py-2.5">
          <span aria-hidden className="flex gap-1.5">
            <span className="size-2 rounded-full bg-flame md:size-2.5" />
            <span className="size-2 rounded-full bg-orange md:size-2.5" />
            <span className="size-2 rounded-full bg-cream/40 md:size-2.5" />
          </span>
          <span className="min-w-0 flex-1 truncate rounded-full bg-black/35 px-3 py-1 text-center text-[11px] text-cream/75 md:text-xs">
            {address}
          </span>
          <span aria-hidden className="w-[30px] md:w-[38px]" />
        </div>
        <Image
          src={item.image}
          alt={`${item.name} homepage screenshot`}
          width={item.size[0]}
          height={item.size[1]}
          sizes={sizes}
          draggable={false}
          className="block h-auto w-full"
        />
      </div>
    </div>
  );
}
