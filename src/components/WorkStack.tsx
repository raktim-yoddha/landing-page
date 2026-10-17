"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useEffect, useRef } from "react";
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
      {/* Screenshot sits smaller inside a black field so the whole page always fits. */}
      <ShotLink item={item} className="p-5 md:h-auto md:w-1/2 md:p-10">
        <Image
          src={item.image}
          alt={`${item.name} homepage screenshot`}
          width={item.size[0]}
          height={item.size[1]}
          sizes="(min-width: 768px) 560px, 90vw"
          draggable={false}
          className="h-auto max-h-full w-auto max-w-full object-contain transition-transform duration-700 ease-out group-hover/card:scale-[1.03] md:max-w-[88%]"
        />
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
 * The screenshot panel links to the live site. With a mouse, a red "Visit site"
 * circle sits exactly on the cursor (position written straight to the transform,
 * no easing, no React re-renders) and only fades in/out. The system pointer is
 * hidden only while the circle is showing.
 */
export function ShotLink({ item, children, className = "" }: { item: Item; children: React.ReactNode; className?: string }) {
  const dot = useRef<HTMLSpanElement>(null);
  const link = useRef<HTMLAnchorElement>(null);
  const last = useRef({ x: -1, y: -1 });

  // Scrolling moves the card away from a still mouse; hide until the next pointer move.
  useEffect(() => {
    const hide = () => {
      if (dot.current?.dataset.on !== "true") return;
      dot.current.dataset.on = "false";
      if (link.current) link.current.dataset.cursor = "";
    };
    window.addEventListener("scroll", hide, { passive: true });
    return () => window.removeEventListener("scroll", hide);
  }, []);

  const place = (e: React.PointerEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    // Keep the whole circle (56px radius) inside the panel so it is never cut in half at an edge.
    const clamp = (v: number, max: number) => Math.min(Math.max(v, 56), max - 56);
    dot.current!.style.transform = `translate3d(${clamp(e.clientX - r.left, r.width)}px, ${clamp(e.clientY - r.top, r.height)}px, 0)`;
  };
  const show = (e: React.PointerEvent<HTMLAnchorElement>, on: boolean) => {
    if (e.pointerType !== "mouse" || !dot.current) return;
    // Content sliding under a still mouse fires pointerenter too; only real moves count.
    if (on && e.clientX === last.current.x && e.clientY === last.current.y) return;
    if (on) place(e);
    last.current = { x: e.clientX, y: e.clientY };
    dot.current.dataset.on = String(on);
    e.currentTarget.dataset.cursor = on ? "dot" : "";
  };
  const move = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (e.pointerType !== "mouse" || !dot.current) return;
    // Browsers fire a synthetic move after scrolling with the mouse still; ignore it.
    if (e.clientX === last.current.x && e.clientY === last.current.y) return;
    last.current = { x: e.clientX, y: e.clientY };
    place(e);
    // A card can slide in under a still mouse without firing pointerenter.
    if (dot.current.dataset.on !== "true") show(e, true);
  };
  return (
    <a
      ref={link}
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit ${item.name} (opens in a new tab)`}
      draggable={false}
      onPointerEnter={(e) => show(e, true)}
      onPointerMove={move}
      onPointerLeave={(e) => show(e, false)}
      className={`relative grid shrink-0 select-none place-items-center overflow-hidden bg-black [-webkit-user-drag:none] data-[cursor=dot]:cursor-none ${className}`}
    >
      {children}
      <span
        ref={dot}
        aria-hidden
        data-on="false"
        className="pointer-events-none absolute left-0 top-0 -ml-14 -mt-14 hidden size-28 flex-col items-center justify-center gap-1 rounded-full bg-signal text-cream opacity-0 transition-opacity duration-150 ease-out data-[on=true]:opacity-100 [@media(pointer:fine)]:flex"
      >
        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M7 17 17 7M9 7h8v8" />
        </svg>
        <span className="text-sm font-medium leading-none">Visit site</span>
      </span>
    </a>
  );
}
