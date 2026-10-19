"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";
import { useEffect, useRef, type ElementType, type ReactNode } from "react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
// Phones resize the viewport as the address bar hides; don't recalc every trigger for that.
ScrollTrigger.config({ ignoreMobileResize: true });

/**
 * Heavy effects (text splitting, scroll scrubs, clip reveals, counters) run only on
 * tablets and up. Phones get plain fades and native scrolling, which is faster and
 * uses far less memory.
 */
const desktopMotion = "(min-width: 768px) and (prefers-reduced-motion: no-preference)";

/**
 * Lenis smooth scroll on mouse/trackpad devices only; touch keeps native scrolling
 * (and no always-on rAF loop). Every Lenis tick updates ScrollTrigger.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (!matchMedia(`${desktopMotion} and (pointer: fine)`).matches) return;
    const lenis = new Lenis({ lerp: 0.1, anchors: true, autoRaf: true });
    lenis.on("scroll", ScrollTrigger.update);
    return () => lenis.destroy();
  }, []);
  return null;
}

/**
 * Masked line (or char) reveal. Elements carry `data-split`, which CSS hides until
 * the split is ready so nothing flashes; phones, reduced motion and no-JS show text as is.
 *
 * `live` (chars only): once revealed, letters breathe in weight as a rolling wave
 * (`.is-live` in globals.css) and the word skews with scroll speed, both only while on screen.
 */
export function SplitReveal({
  as: Tag = "div",
  type = "lines",
  onLoad = false,
  live = false,
  className,
  id,
  children,
}: {
  as?: ElementType;
  type?: "lines" | "chars";
  onLoad?: boolean;
  live?: boolean;
  className?: string;
  id?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current!;
      const mm = gsap.matchMedia();
      mm.add(desktopMotion, () => {
        let revealed = false;
        let inView = false;
        const setLive = () => el.classList.toggle("is-live", revealed && inView);

        SplitText.create(el, {
          type: type === "chars" ? "chars,lines" : "lines",
          mask: type,
          linesClass: "split-line",
          charsClass: "split-char",
          autoSplit: true,
          onSplit(self) {
            gsap.set(el, { visibility: "visible" });
            if (live) self.chars.forEach((c, i) => (c as HTMLElement).style.setProperty("--i", String(i)));
            return gsap.from(type === "chars" ? self.chars : self.lines, {
              yPercent: 120,
              duration: type === "chars" ? 0.8 : 1,
              ease: "expo.out",
              stagger: type === "chars" ? 0.025 : 0.1,
              delay: onLoad ? 0.1 : 0,
              scrollTrigger: onLoad ? undefined : { trigger: el, start: "top 88%", once: true },
              onComplete: () => {
                revealed = true;
                setLive();
              },
            });
          },
        });

        if (live) {
          // Skew with scroll speed, settling back to upright (GSAP's velocity-skew pattern).
          const skew = { v: 0 };
          const setSkew = gsap.quickSetter(el, "skewX", "deg");
          const clamp = gsap.utils.clamp(-8, 8);
          gsap.set(el, { transformOrigin: "50% 100%" });
          ScrollTrigger.create({
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            onToggle: (st) => {
              inView = st.isActive;
              setLive();
            },
            onUpdate: (st) => {
              const v = clamp(st.getVelocity() / -300);
              if (Math.abs(v) > Math.abs(skew.v)) {
                skew.v = v;
                gsap.to(skew, { v: 0, duration: 0.8, ease: "power3", overwrite: true, onUpdate: () => setSkew(skew.v) });
              }
            },
          });
          return () => el.classList.remove("is-live");
        }
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} data-split="" className={className} id={id}>
      {children}
    </Tag>
  );
}

/** Counts up from 0 when scrolled into view. Server HTML keeps the final number. */
export function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const fmt = (n: number) => `${Math.round(n).toLocaleString("en-US")}${suffix}`;

  useGSAP(() => {
    const el = ref.current!;
    const mm = gsap.matchMedia();
    mm.add(desktopMotion, () => {
      const obj = { n: 0 };
      el.textContent = fmt(0);
      gsap.set(el, { visibility: "visible" });
      gsap.to(obj, {
        n: value,
        duration: 1.8,
        ease: "power3.out",
        delay: 0.5,
        onUpdate: () => {
          el.textContent = fmt(obj.n);
        },
        scrollTrigger: { trigger: el, start: "top 95%", once: true },
      });
      return () => {
        el.textContent = fmt(value);
      };
    });
    return () => mm.revert();
  });

  return (
    <span ref={ref} data-split="">
      {fmt(value)}
    </span>
  );
}

/** Slides its content sideways as the page scrolls past it. */
export function ScrubX({ children, distance = -30, className }: { children: ReactNode; distance?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(desktopMotion, () => {
      gsap.fromTo(
        ref.current,
        { xPercent: 0 },
        {
          xPercent: distance,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: 0.6 },
        },
      );
    });
    return () => mm.revert();
  });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/** Unmasks upward from the bottom edge as it enters the viewport (clip-path + small rise). */
export function ClipReveal({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(desktopMotion, () => {
      gsap.from(ref.current, {
        clipPath: "inset(100% 0% 0% 0%)",
        y: 40,
        duration: 1.1,
        ease: "expo.out",
        clearProps: "clipPath",
        scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
      });
    });
    return () => mm.revert();
  });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/** Scroll-linked drift: moves up and fades as its section scrolls out of view. */
export function ScrollAway({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(desktopMotion, () => {
      gsap.to(ref.current, {
        yPercent: -18,
        opacity: 0.15,
        ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top top+=120", end: "bottom top", scrub: 0.5 },
      });
    });
    return () => mm.revert();
  });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/**
 * Children unmask one after another (first, second, third…) when the group enters.
 * Desktop only; on phones the items simply sit in place.
 */
export function Sequence({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(desktopMotion, () => {
        gsap.from(gsap.utils.toArray<HTMLElement>(":scope > *", ref.current), {
          clipPath: "inset(100% 0% 0% 0%)",
          y: 60,
          duration: 1,
          ease: "expo.out",
          stagger: 0.18,
          clearProps: "clipPath,transform",
          scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
