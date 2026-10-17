import Link from "next/link";
import { community } from "@/content";
import { Sequence } from "./Gsap";

type Channel = (typeof community.channels)[number];

// Dimmed site palette instead of platform brand colours.
const tones = {
  rust: { card: "bg-rust text-cream", button: "bg-cream text-rust hover:bg-ink hover:text-cream" },
  ink: { card: "bg-ink text-cream", button: "bg-cream text-ink hover:bg-signal hover:text-cream" },
  orange: { card: "bg-orange text-black", button: "bg-black text-cream hover:bg-signal" },
} as const;

/** Three channel cards and a wide resources bar; they unmask in order on desktop. */
export function CommunityCards() {
  const r = community.resources;
  return (
    <Sequence className="mt-12 grid gap-4 md:mt-16 md:grid-cols-3 md:gap-6">
      {community.channels.map((c) => (
        <ChannelCard key={c.name} c={c} />
      ))}
      <Link
        href={r.url}
        className="group flex flex-col gap-6 bg-beige p-6 transition-colors hover:bg-[#ece3d8] md:col-span-3 md:flex-row md:items-center md:justify-between md:p-10"
      >
        <span>
          <span className="block text-3xl tracking-tight md:text-4xl">{r.title}</span>
          <span className="mt-2 block font-serif text-xl italic">{r.body}</span>
        </span>
        <span className="inline-flex w-fit shrink-0 items-center gap-3 bg-signal px-6 py-4 text-sm font-medium text-cream transition-colors group-hover:bg-ink">
          {r.cta}
          <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </span>
      </Link>
    </Sequence>
  );
}

function ChannelCard({ c }: { c: Channel }) {
  const t = tones[c.tone];
  return (
    <a
      href={c.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative flex min-h-[300px] flex-col overflow-hidden p-6 md:min-h-[440px] md:p-10 ${t.card}`}
    >
      <Motif kind={c.motif} />
      <span className="relative text-3xl tracking-tight md:text-4xl">{c.name}</span>
      <span className="relative mt-4 max-w-[30ch] font-serif text-xl italic leading-snug">{c.detail}</span>
      <span className="relative mt-auto pt-8 text-base font-medium">{c.count}</span>
      <span className={`relative mt-4 inline-flex w-fit items-center gap-3 px-5 py-3.5 text-sm font-medium transition-colors ${t.button}`}>
        {c.cta}
        <span aria-hidden className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
        <span className="sr-only">(opens in a new tab)</span>
      </span>
    </a>
  );
}

/** Large line-art mark in the card's own colour, bottom right, drifting on hover. */
function Motif({ kind }: { kind: Channel["motif"] }) {
  const cls =
    "pointer-events-none absolute -bottom-8 -right-8 size-56 opacity-[0.18] transition-transform duration-700 ease-out group-hover:-translate-x-2 group-hover:-translate-y-2 md:size-64";
  const s = { fill: "none", stroke: "currentColor", strokeWidth: 3 } as const;
  if (kind === "play")
    return (
      <svg aria-hidden viewBox="0 0 200 200" className={cls} {...s}>
        <rect x="20" y="45" width="160" height="110" />
        <path d="M85 75v50l42-25z" fill="currentColor" />
      </svg>
    );
  if (kind === "chat")
    return (
      <svg aria-hidden viewBox="0 0 200 200" className={cls} {...s}>
        <path d="M30 40h140v90H90l-35 30v-30H30z" />
        <circle cx="75" cy="85" r="9" fill="currentColor" />
        <circle cx="125" cy="85" r="9" fill="currentColor" />
      </svg>
    );
  return (
    <svg aria-hidden viewBox="0 0 200 200" className={cls} {...s}>
      <path d="M40 30h130v95l-35 35h-30l-25 25v-25H40z" />
      <path d="M95 65v40M130 65v40" />
    </svg>
  );
}
