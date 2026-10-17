"use client";

import { useEffect, useRef } from "react";

type CalFn = ((...args: unknown[]) => void) & { loaded?: boolean; ns: Record<string, CalFn>; q: unknown[] };
declare global {
  interface Window {
    Cal?: CalFn;
  }
}

const calLink = "raktimyoddha/30min";
const ns = "30min";

/** Cal.com inline booking. Its script loads only once the section is near the viewport. */
export function CalEmbed() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        loadCal();
        const Cal = window.Cal!;
        Cal("init", ns, { origin: "https://app.cal.com" });
        Cal.ns[ns]("inline", { elementOrSelector: el, calLink, config: { layout: "month_view", theme: "light" } });
        Cal.ns[ns]("ui", { layout: "month_view", hideEventTypeDetails: false, cssVarsPerTheme: { light: { "cal-brand": "#dd2400" } } });
      },
      { rootMargin: "600px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return <div ref={ref} className="min-h-[640px] w-full overflow-auto" data-lenis-prevent />;
}

// Cal.com's official loader snippet, unminified.
function loadCal() {
  if (window.Cal) return;
  const push = (api: CalFn, args: unknown) => api.q.push(args);
  const Cal = function (this: unknown, ...args: unknown[]) {
    const cal = window.Cal!;
    if (!cal.loaded) {
      cal.ns = {};
      cal.q = cal.q || [];
      document.head.appendChild(document.createElement("script")).src = "https://app.cal.com/embed/embed.js";
      cal.loaded = true;
    }
    if (args[0] === "init") {
      const api = function (...a: unknown[]) {
        push(api, a);
      } as CalFn;
      api.q = [];
      const name = args[1];
      if (typeof name === "string") {
        cal.ns[name] = cal.ns[name] || api;
        push(cal.ns[name], args);
        push(cal, ["initNamespace", name]);
      } else push(cal, args);
      return;
    }
    push(cal, args);
  } as CalFn;
  Cal.q = [];
  Cal.ns = {};
  window.Cal = Cal;
}
