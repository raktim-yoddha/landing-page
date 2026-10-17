import Link from "next/link";
import { CalEmbed } from "@/components/CalEmbed";
import { CommunityCards } from "@/components/CommunityCards";
import { CtaButton } from "@/components/CtaButton";
import { ClipReveal, Counter, ScrollAway, ScrubX, Sequence, SplitReveal } from "@/components/Gsap";
import { Reveal } from "@/components/Motion";
import { Services } from "@/components/Services";
import { VisitCursor } from "@/components/VisitCursor";
import { WorkStack } from "@/components/WorkStack";
import { booking, bookingUrl, community, contact, faq, hero, reviews, services, work } from "@/content";

// Dummy reviews show only in development. See content.ts.
const showReviews = !reviews.placeholder || process.env.NODE_ENV === "development";

/** Section h2: plain words, then the italic serif accent, revealed line by line. */
function Heading({ id, lead, accent, className = "" }: { id: string; lead: string; accent: string; className?: string }) {
  return (
    <SplitReveal as="h2" id={id} className={`text-4xl leading-[1.1] tracking-tight md:text-5xl lg:text-6xl ${className}`}>
      {lead} <em className="font-serif font-normal">{accent}</em>
    </SplitReveal>
  );
}

export default function Home() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-cream">
        Skip to content
      </a>

      <header className="fixed inset-x-0 top-0 z-40 bg-cream">
        <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-4 md:px-8">
          <a href="#" className="flex items-center gap-2" aria-label="Raktim Yoddha, back to top">
            <span aria-hidden className="grid size-9 place-items-center bg-flame text-sm font-semibold text-cream">
              RY
            </span>
            <span className="text-[13px] font-semibold uppercase leading-[1.05] tracking-wide text-signal">
              Raktim
              <br />
              Yoddha
            </span>
          </a>
          <nav aria-label="Main" className="hidden items-center gap-8 text-sm md:flex">
            <a href="#services" className="hover:text-signal">Services</a>
            <a href="#work" className="hover:text-signal">Work</a>
            <a href="#community" className="hover:text-signal">Community</a>
            <a href="#faq" className="hover:text-signal">FAQ</a>
          </nav>
          <CtaButton href={bookingUrl} small>
            Book a free call
          </CtaButton>
        </div>
      </header>

      <main id="main">
        {/* Hero */}
        <section className="overflow-hidden pt-28 md:pt-40">
          <ScrollAway className="mx-auto max-w-[1200px] px-4 text-center">
            <SplitReveal as="h1" onLoad className="text-[clamp(2.5rem,11vw,3.25rem)] leading-[0.98] tracking-[-0.03em] md:text-[clamp(2rem,7vw,6.25rem)]">
              <span className="block">{hero.lead}</span>
              <span className="block font-serif italic">{hero.accent}</span>
            </SplitReveal>
            {/* Hero entrance is pure CSS so it starts on first paint, without waiting for JS (fast LCP). */}
            <p className="hero-in mx-auto mt-6 max-w-[38ch] text-balance font-serif md:max-w-[64ch] text-xl italic leading-snug [animation-delay:0.16s] md:mt-8 md:text-2xl">
              {hero.sub}
            </p>
            <div className="hero-in mt-8 [animation-delay:0.24s]">
              <CtaButton href={bookingUrl}>{hero.cta}</CtaButton>
            </div>
            <div className="hero-in [animation-delay:0.32s]">
              <dl className="mx-auto mt-10 grid max-w-[760px] grid-cols-3 items-start gap-3 md:mt-12 md:gap-4">
                {hero.stats.map((s) => (
                  <div key={s.label} className="flex flex-col items-center gap-1">
                    <dt className="order-2 max-w-[14ch] text-[13px] leading-tight text-ink/80 md:max-w-none md:text-sm">{s.label}</dt>
                    <dd className="text-3xl font-medium tracking-tight tabular-nums md:text-4xl">
                      <Counter value={s.value} suffix={s.suffix} />
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </ScrollAway>

        </section>

        {/* Giant wordmark */}
        <div aria-hidden className="mt-12 overflow-hidden md:mt-28">
          <ScrubX distance={-20}>
            <div className="flex w-max animate-marquee [--marquee-duration:30s] max-md:animate-none">
              {Array.from({ length: 4 }, (_, i) => (
                <span key={i} className="outline-text whitespace-nowrap pr-[0.3em] text-[22vw] font-semibold leading-[0.85] tracking-[-0.04em] md:text-[15vw]">
                  RAKTIM YODDHA
                </span>
              ))}
            </div>
          </ScrubX>
        </div>

        {/* Services */}
        <section id="services" className="py-16 md:py-40" aria-labelledby="services-title">
          <div className="mx-auto mb-10 max-w-[900px] px-4 text-center md:mb-20">
            <Heading id="services-title" lead={services.lead} accent={services.accent} />
          </div>
          <Services />
        </section>

        {/* Work: pinned cards that slide over each other */}
        <section id="work" className="bg-night pt-16 md:pt-32" aria-labelledby="work-title">
          <div className="px-4 text-center">
            <Heading id="work-title" lead={work.lead} accent={work.accent} className="text-cream" />
            <span aria-hidden className="mt-4 block text-4xl text-orange">
              <span className="inline-block md:animate-bounce">↓</span>
            </span>
          </div>
          <WorkStack />
          <VisitCursor />
          <Reveal className="flex justify-center px-4 pb-16 md:pb-32">
            <Link
              href={work.more.url}
              className="group inline-flex items-center gap-3 bg-cream px-7 py-4 text-sm font-medium text-ink transition-colors hover:bg-signal hover:text-cream md:text-base"
            >
              {work.more.label}
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </Reveal>
        </section>

        {showReviews && (
          <section className="mx-auto max-w-[1280px] px-4 py-16 md:px-8 md:py-32" aria-labelledby="reviews-title">
            <div className="text-center">
              <Heading id="reviews-title" lead={reviews.lead} accent={reviews.accent} />
            </div>
            <Sequence className="mt-12 grid gap-4 md:mt-16 md:grid-cols-2 md:gap-6">
              {reviews.items.map((r) => (
                <figure key={r.name} className="flex flex-col bg-beige p-6 md:p-10">
                  <span aria-hidden className="font-serif text-6xl leading-none text-clay md:text-7xl">“</span>
                  <blockquote className="-mt-4 font-serif text-2xl italic leading-snug md:text-[1.75rem]">{r.quote}</blockquote>
                  <figcaption className="mt-auto flex items-center gap-4 pt-8">
                    <span aria-hidden className="grid size-11 shrink-0 place-items-center rounded-full bg-clay text-sm font-medium text-ink">
                      {r.name.split(" ").map((w) => w[0]).join("")}
                    </span>
                    <span>
                      <span className="block font-medium">{r.name}</span>
                      <span className="block text-sm text-ink/70">{r.role}</span>
                    </span>
                  </figcaption>
                </figure>
              ))}
            </Sequence>
          </section>
        )}

        {/* Community */}
        <section id="community" className="mx-auto max-w-[1280px] px-4 py-16 md:px-8 md:py-40" aria-labelledby="community-title">
          <div className="text-center">
            <Heading id="community-title" lead={community.lead} accent={community.accent} />
            <Reveal as="p" delay={0.2} className="mx-auto mt-5 max-w-[40ch] text-balance font-serif text-xl italic leading-snug md:text-2xl">
              {community.body}
            </Reveal>
          </div>
          <CommunityCards />
        </section>

        {/* FAQ */}
        <section id="faq" className="mx-auto max-w-[960px] px-4 pb-16 md:pb-40" aria-labelledby="faq-title">
          <div className="text-center">
            <Heading id="faq-title" lead={faq.lead} accent={faq.accent} />
          </div>
          <div className="mt-12 border-t border-ink/20 md:mt-16">
            {faq.items.map((f, i) => (
              <Reveal key={f.q} delay={i * 0.05}>
                <details className="group border-b border-ink/20">
                  <summary className="flex cursor-pointer items-center justify-between gap-6 py-6 text-lg md:text-xl">
                    {f.q}
                    <span aria-hidden className="text-2xl text-signal transition-transform duration-300 group-open:rotate-45">+</span>
                  </summary>
                  <p className="max-w-[60ch] pb-6 font-serif text-xl italic leading-snug">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Booking */}
        <section id="book" className="bg-beige px-4 py-16 md:py-32" aria-labelledby="book-title">
          <div className="mx-auto max-w-[900px] text-center">
            <Heading id="book-title" lead={booking.lead} accent={booking.accent} />
            <Reveal as="p" delay={0.2} className="mt-4 font-serif text-xl italic md:text-2xl">
              {booking.body}
            </Reveal>
          </div>
          <ClipReveal className="mx-auto mt-12 max-w-[1040px] bg-cream">
            <CalEmbed />
          </ClipReveal>
          <p className="mt-6 text-center text-sm">
            {booking.fallback}{" "}
            <a href={`mailto:${contact.email}?subject=Free%20call`} className="text-signal underline underline-offset-4">
              {contact.email}
            </a>
          </p>
        </section>
      </main>

      <footer className="overflow-hidden bg-rust text-cream">
        <div className="mx-auto max-w-[1440px] px-4 pt-16 md:px-8 md:pt-24">
          <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
            <SplitReveal as="p" className="max-w-[30ch] font-serif text-3xl italic leading-tight md:text-[2rem] lg:max-w-[24ch] lg:text-4xl">
              Websites, apps and automations for businesses that want their evenings back.
            </SplitReveal>
            <ul className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
              <li><a href={`mailto:${contact.email}`} className="hover:underline">{contact.email}</a></li>
              <li><a href={contact.youtube} target="_blank" rel="noopener noreferrer" className="hover:underline">YouTube</a></li>
              <li><a href={contact.discord} target="_blank" rel="noopener noreferrer" className="hover:underline">Discord</a></li>
              <li><a href={contact.twitch} target="_blank" rel="noopener noreferrer" className="hover:underline">Twitch</a></li>
              <li><a href={contact.github} target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a></li>
            </ul>
          </div>
          {/* Sized in container units so the name spans exactly the footer's content width. */}
          <div aria-hidden className="@container mt-16 md:mt-24">
            <SplitReveal as="p" type="chars" className="whitespace-nowrap text-[13.4cqw] font-semibold leading-[0.8] tracking-[-0.05em]">
              RAKTIM YODDHA
            </SplitReveal>
          </div>
          <div className="flex justify-between py-6 text-[13px] text-cream/90">
            <span>© 2026 Raktim Yoddha. Gujarat, India.</span>
            <a href="#" className="hover:underline">Back to top ↑</a>
          </div>
        </div>
      </footer>
    </>
  );
}
