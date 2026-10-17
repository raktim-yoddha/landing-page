"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { work } from "@/content";

type Item = (typeof work.items)[number];

/**
 * Each card is sticky inside one tall container. While the next card slides up
 * over it, the card underneath scales down toward the back of the stack.
 */
export function WorkStack() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: container, offset: ["start start", "end end"] });
  const n = work.items.length;

  return (
    <div ref={container} className="relative">
      {work.items.map((item, i) => (
        <Card
          key={item.name}
          item={item}
          i={i}
          progress={scrollYProgress}
          range={[i / n, 1]}
          targetScale={1 - (n - i - 1) * 0.06}
        />
      ))}
    </div>
  );
}

function Card({
  item,
  i,
  progress,
  range,
  targetScale,
}: {
  item: Item;
  i: number;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}) {
  const reduce = useReducedMotion();
  const scale = useTransform(progress, range, [1, reduce ? 1 : targetScale]);

  return (
    <div className="sticky top-0 flex h-svh justify-center px-4 pt-24 md:px-8 md:pt-28">
      <motion.article
        style={{ scale, top: i * 24 }}
        className="relative flex h-fit w-full max-w-[1280px] origin-top flex-col overflow-hidden bg-black md:h-[min(74vh,620px)] md:flex-row"
      >
        <div className="relative aspect-video w-full bg-black md:aspect-auto md:h-full md:w-[60%]">
          <Image
            src={item.image}
            alt={`${item.name} screenshot`}
            fill
            sizes="(min-width: 768px) 60vw, 100vw"
            className="object-cover object-left-top"
          />
        </div>
        <div className="flex flex-1 flex-col bg-beige p-5 md:p-10">
          <h3 className="text-3xl font-medium uppercase tracking-tight lg:text-5xl md:text-4xl">{item.name}</h3>
          <p className="mt-2 font-serif text-lg italic text-rust">{item.tags.join(" · ")}</p>
          <p className="mt-3 font-serif text-lg italic leading-snug md:mt-6 md:text-2xl">{item.body}</p>
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-5 inline-flex w-fit items-center gap-3 bg-signal px-6 py-4 text-sm font-medium text-cream transition-colors hover:bg-ink md:mt-auto"
          >
            {item.linkLabel}
            <span aria-hidden className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
              ↗
            </span>
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>
      </motion.article>
    </div>
  );
}
