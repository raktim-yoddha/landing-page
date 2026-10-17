import Link from "next/link";
import { community } from "@/content";
import { Sequence } from "./Gsap";

type Channel = (typeof community.channels)[number];

// Each platform's own hue, warmed and dimmed to sit with the cream/terracotta page.
// All pass 4.5:1 with cream text.
const brands = {
  youtube: {
    card: "bg-[#b8392b]",
    text: "text-[#b8392b]",
    // Simple Icons (CC0)
    path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  },
  discord: {
    card: "bg-[#6461a8]",
    text: "text-[#6461a8]",
    path: "M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z",
  },
  twitch: {
    card: "bg-[#7b4fa3]",
    text: "text-[#7b4fa3]",
    path: "M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z",
  },
} as const;

function Logo({ brand, className }: { brand: Channel["brand"]; className: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d={brands[brand].path} />
    </svg>
  );
}

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
  const b = brands[c.brand];
  return (
    <a
      href={c.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative flex min-h-[300px] flex-col overflow-hidden p-6 text-cream md:min-h-[440px] md:p-10 ${b.card}`}
    >
      <Logo
        brand={c.brand}
        className="pointer-events-none absolute -bottom-10 -right-10 size-56 opacity-[0.14] transition-transform duration-700 ease-out group-hover:-translate-x-2 group-hover:-translate-y-2 md:size-64"
      />
      <span className="relative text-3xl tracking-tight md:text-4xl">{c.name}</span>
      <span className="relative mt-4 max-w-[30ch] font-serif text-xl italic leading-snug">{c.detail}</span>
      <span className="relative mt-auto pt-8 text-base font-medium">{c.count}</span>
      <span className={`relative mt-4 inline-flex w-fit items-center gap-3 bg-cream px-5 py-3.5 text-sm font-medium transition-colors group-hover:bg-white ${b.text}`}>
        <Logo brand={c.brand} className="size-5" />
        {c.cta}
        <span aria-hidden className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
        <span className="sr-only">(opens in a new tab)</span>
      </span>
    </a>
  );
}
