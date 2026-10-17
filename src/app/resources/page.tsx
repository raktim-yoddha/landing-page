import type { Metadata } from "next";
import Link from "next/link";
import { CtaButton } from "@/components/CtaButton";
import { ClipReveal, SplitReveal } from "@/components/Gsap";
import { Reveal } from "@/components/Motion";
import { contact, resourcesPage as r } from "@/content";

export const metadata: Metadata = {
  title: "Free Resources | Raktim Yoddha",
  description: r.body,
  alternates: { canonical: "/resources" },
};

type Item = (typeof r.items)[number];

const tones = {
  orange: "bg-orange text-black",
  ink: "bg-ink text-cream",
  rust: "bg-rust text-cream",
  beige: "bg-beige text-ink",
} as const;

export default function ResourcesPage() {
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

      <main className="mx-auto max-w-[1280px] px-4 pb-24 pt-32 md:px-8 md:pb-32 md:pt-40">
        <div className="text-center">
          <SplitReveal as="h1" onLoad className="text-5xl leading-none tracking-tight md:text-8xl">
            {r.lead} <em className="font-serif font-normal">{r.accent}</em>
          </SplitReveal>
          <Reveal as="p" delay={0.2} className="mx-auto mt-5 max-w-[40ch] text-balance font-serif text-xl italic md:text-2xl">
            {r.body}
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-6 md:mt-20 md:grid-cols-2 md:gap-8">
          {r.items.map((item) => (
            <li key={item.name}>
              <ClipReveal>
                <Poster item={item} />
              </ClipReveal>
            </li>
          ))}
        </ul>

        <Reveal className="mx-auto mt-24 max-w-[960px] bg-beige p-8 text-center md:mt-32 md:p-14">
          <h2 className="text-4xl leading-[1.1] tracking-tight md:text-5xl">
            {r.cta.lead} <em className="font-serif font-normal">{r.cta.accent}</em>
          </h2>
          <p className="mx-auto mt-4 max-w-[48ch] text-balance font-serif text-xl italic">{r.cta.body}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
            <CtaButton href="/#book">Book a free call</CtaButton>
            <Link href="/" className="text-sm font-medium underline underline-offset-4 hover:text-signal">
              View main website
            </Link>
          </div>
        </Reveal>
      </main>
    </>
  );
}

function Poster({ item }: { item: Item }) {
  const mail = `mailto:${contact.email}?subject=${encodeURIComponent(`Send me: ${item.name}`)}&body=${encodeURIComponent(`Hi Raktim, I'd like the free ${item.kind.toLowerCase()} "${item.name}".`)}`;
  return (
    <article className={`group relative flex min-h-[300px] flex-col md:aspect-[16/10] overflow-hidden p-6 md:p-10 ${tones[item.tone]}`}>
      <Motif kind={item.motif} />
      <p className="relative font-serif text-lg italic">{item.kind}</p>
      <h2 className="relative mt-3 max-w-[11ch] text-4xl font-semibold uppercase leading-[0.92] tracking-tight md:text-6xl">{"poster" in item ? item.poster : item.name}</h2>
      <p className="relative mt-3 font-serif text-xl italic md:text-2xl">{item.tagline}</p>
      <div className="relative mt-auto flex flex-wrap items-center justify-between gap-4">
        <span className="text-sm font-medium md:text-base">{item.detail}</span>
        <a
          href={mail}
          className="inline-flex items-center gap-2 bg-signal px-5 py-3 text-sm font-medium text-cream transition-[background-color,transform] hover:bg-black active:scale-[0.97]"
        >
          Get it free
          <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
        </a>
      </div>
    </article>
  );
}

/** One line-art motif per resource, drawn in the card's own text colour. */
function Motif({ kind }: { kind: Item["motif"] }) {
  const common = "pointer-events-none absolute -right-10 top-1/2 h-[75%] -translate-y-1/2 opacity-20 transition-transform duration-700 group-hover:-translate-y-[52%] group-hover:rotate-3 md:right-4";
  const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 2 } as const;
  if (kind === "hex")
    return (
      <svg aria-hidden viewBox="0 0 200 200" className={common} {...stroke}>
        {[[60, 50], [120, 50], [90, 102], [150, 102], [60, 154], [120, 154]].map(([x, y]) => (
          <path key={`${x}-${y}`} d={`M${x} ${y - 30}l26 15v30l-26 15-26-15v-30z`} />
        ))}
      </svg>
    );
  if (kind === "windows")
    return (
      <svg aria-hidden viewBox="0 0 200 200" className={common} {...stroke}>
        <rect x="20" y="30" width="120" height="80" />
        <rect x="45" y="60" width="120" height="80" />
        <rect x="70" y="90" width="120" height="80" />
        <path d="M32 46h60M32 58h90" />
      </svg>
    );
  if (kind === "circuit")
    return (
      <svg aria-hidden viewBox="0 0 200 200" className={common} {...stroke}>
        <path d="M20 60h60v50h60V40h40M20 150h70v-30h50v30h40" />
        {[[180, 40], [140, 110], [20, 60], [180, 150], [20, 150]].map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="7" fill="currentColor" />
        ))}
      </svg>
    );
  return (
    <svg aria-hidden viewBox="0 0 200 200" className={common} {...stroke}>
      {[30, 55, 80].map((rad) => (
        <circle key={rad} cx="100" cy="110" r={rad} />
      ))}
      <path d="M100 150s-30-34-30-56a30 30 0 0 1 60 0c0 22-30 56-30 56z" fill="currentColor" />
    </svg>
  );
}
