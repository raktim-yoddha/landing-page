"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useRef } from "react";
import { work } from "@/content";
import "./Gsap"; // registers ScrollTrigger

type Item = (typeof work.items)[number];

/**
 * Pinned stage. Each next card slides up from below while the current one sinks
 * back and fades out, so only one card is ever visible. Without motion (reduced
 * motion or no JS) the cards are a plain list.
 */
export function WorkStack() {
  const stage = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = stage.current!;
      const cards = gsap.utils.toArray<HTMLElement>("[data-card]", el);
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
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
      className="group/stack flex flex-col items-center gap-8 px-4 pb-24 pt-10 data-[stack=on]:grid data-[stack=on]:h-svh data-[stack=on]:place-items-center data-[stack=on]:gap-0 data-[stack=on]:overflow-hidden data-[stack=on]:pb-0 data-[stack=on]:pt-[72px] md:px-8"
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
      className="flex w-full max-w-[min(1280px,calc((100svh-340px)*1.9))] origin-top xl:max-w-[1280px] flex-col overflow-hidden bg-beige will-change-transform group-data-[stack=on]/stack:[grid-area:1/1] xl:flex-row"
    >
      <div className="bg-black xl:w-[62%] xl:shrink-0">
        <Image
          src={item.image}
          alt={`${item.name} homepage screenshot`}
          width={item.size[0]}
          height={item.size[1]}
          sizes="(min-width: 1280px) 800px, (min-width: 768px) 90vw, 100vw"
          className="block h-auto w-full"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5 md:grid md:grid-cols-[1fr_1.3fr] md:gap-x-10 md:p-8 xl:flex xl:p-10">
        <div>
          <h3 className="text-[1.75rem] font-medium uppercase leading-none tracking-tight md:text-4xl xl:text-[2.75rem]">{item.name}</h3>
          <p className="mt-2 font-serif text-lg italic text-rust">{item.tags.join(" · ")}</p>
        </div>
        <div className="flex flex-col gap-4 xl:mt-3 xl:flex-1">
          <p className="font-serif text-lg italic leading-snug md:text-xl">{item.body}</p>
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-fit items-center gap-3 bg-signal px-6 py-4 text-sm font-medium text-cream transition-colors hover:bg-ink xl:mt-auto"
          >
            {item.linkLabel}
            <span aria-hidden className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1">
              ↗
            </span>
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>
      </div>
    </article>
  );
}
