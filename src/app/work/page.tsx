import type { Metadata } from "next";
import Link from "next/link";
import { CtaButton } from "@/components/CtaButton";
import { Sequence, SplitReveal } from "@/components/Gsap";
import { Reveal } from "@/components/Motion";
import { VisitCursor } from "@/components/VisitCursor";
import { BrowserFrame, ShotLink, type Item } from "@/components/WorkStack";
import { work } from "@/content";

export const metadata: Metadata = {
  title: "All Projects | Raktim Yoddha",
  description: "Websites, apps and tools designed and built by Raktim Yoddha, with links to every live project.",
  alternates: { canonical: "/work" },
};

// Homepage slider projects first, then everything added to `work.archive`.
const projects: Item[] = [...work.items, ...work.archive];

export default function WorkPage() {
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 bg-cream">
        <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-4 md:px-8">
          <Link href="/" className="group inline-flex items-center gap-2 text-sm">
            <span aria-hidden className="transition-transform group-hover:-translate-x-1">←</span>
            Main website
          </Link>
          <CtaButton href="/#book" small>
            Book a free call
          </CtaButton>
        </div>
      </header>

      <main className="min-h-svh bg-orange pb-20 pt-28 md:pb-32 md:pt-40">
        <div className="mx-auto max-w-[1280px] px-4 md:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <SplitReveal as="h1" onLoad className="text-[clamp(3rem,15vw,4rem)] leading-[0.95] tracking-tight text-black md:text-8xl">
              All <em className="font-serif font-normal">projects</em>
            </SplitReveal>
            <Reveal as="p" delay={0.2} className="max-w-[34ch] font-serif text-xl italic leading-snug text-black md:text-right md:text-2xl">
              {projects.length} things I designed and built. Every one is live or open source.
            </Reveal>
          </div>

          <Sequence className="mt-12 grid gap-6 md:mt-20 md:grid-cols-2 md:gap-8">
            {projects.map((p) => (
              <ProjectTile key={p.name} p={p} />
            ))}
          </Sequence>
          <VisitCursor />

          <Reveal className="mt-16 flex flex-col items-center gap-5 text-center md:mt-24">
            <p className="text-3xl tracking-tight text-black md:text-5xl">
              Want yours <em className="font-serif font-normal">on this page?</em>
            </p>
            <CtaButton href="/#book">Book a free call</CtaButton>
          </Reveal>
        </div>
      </main>
    </>
  );
}

/** Same language as the homepage cards: black field with the screenshot, beige box with an orange inner line. */
function ProjectTile({ p }: { p: Item }) {
  return (
    <article className="group/card flex flex-col bg-beige">
      <ShotLink item={p} className="p-5 pb-8 pr-8 md:p-10 md:pb-12 md:pr-12">
        <BrowserFrame item={p} sizes="(min-width: 768px) 560px, 90vw" />
      </ShotLink>
      <div className="flex flex-1 p-3 md:p-5">
        <div className="flex flex-1 flex-col border border-orange p-5 md:p-8">
          <h2 className="text-3xl uppercase leading-[0.95] tracking-tight md:text-4xl">{p.name}</h2>
          <p className="mt-2 font-serif text-lg italic text-rust">{p.tags.join(" · ")}</p>
          <p className="mt-3 font-serif text-lg italic leading-snug md:text-xl">{p.body}</p>
          <div className="mt-auto flex items-end justify-between gap-4 pt-6">
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-signal px-5 py-3.5 text-sm font-medium text-cream transition-colors hover:bg-ink"
            >
              {p.linkLabel}
              <span className="sr-only">(opens in a new tab)</span>
            </a>
            <svg aria-hidden viewBox="0 0 48 48" className="size-10 text-flame transition-transform duration-500 group-hover/card:-translate-y-1 group-hover/card:translate-x-1" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M10 38 38 10M16 10h22v22" />
            </svg>
          </div>
        </div>
      </div>
    </article>
  );
}
