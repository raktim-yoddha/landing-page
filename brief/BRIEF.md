# Build brief: Raktim Yoddha landing page

Prepared 2026-10-17. Read fully before building.

## Goal
Next.js landing page in this folder (`Landing page/`) for Raktim's **potential customers** (small businesses wanting websites, apps, automations, chatbots, local SEO, outreach). Content from old site https://raktimyoddha.vercel.app. Look, motion, color and presentation modeled on https://buildgrowandexit.com. Keep only the exciting parts. Project section must use the **stacked sliding cards** effect (one card slides over the previous one).

## Skills to apply (project-level, in `.claude/skills/`)
Installed during prep:
- `copywriting`, `copy-editing` (coreyhaines31/marketingskills): headline, value prop, CTA copy, and removing AI tells
- `cro`: value prop, CTA placement, friction, proof
- `seo-audit`, `schema`: metadata, semantic HTML, JSON-LD (Person + ProfessionalService)
- `vercel-react-best-practices`: Next.js performance
- `web-design-guidelines`: accessibility/UX QA pass at end
- `design-taste-frontend` (leonxlnx/taste-skill): anti-slop art direction
- `animation-performance` (emilkowalski): transform/opacity-only motion, frame budget
- `find-skills`: search for more skills if needed

Already available globally: `frontend-design`, `ui-ux-pro-max`, `mesh-seo`, `webapp-testing`, `code-review`.

Order: copywriting + cro (write copy first) → design-taste-frontend / frontend-design (direction) → build → animation-performance → seo-audit + schema → web-design-guidelines + webapp-testing (verify in browser, mobile + desktop).

Skipped on purpose: A/B testing (only useful after launch, with traffic), Landing Page Generator (overlaps the design skills).

## Stack
Next.js (latest stable, App Router, TypeScript), Tailwind, `motion` (Framer Motion), `lenis` for smooth scroll (the reference site uses Lenis). Check current versions/APIs with context7 before writing code. Fonts via `next/font/google`.

## Assets (in `brief/assets/`, move to `public/`)
- `mypic.png`: Raktim's portrait (1164x1351)
- `work/glowwithnutrition.png`, `work/hiveory.png`, `work/taskmaster.png`, `work/skillshare.png`: project screenshots (~1900x980)
- `og-image.png` (old OG image, regenerate new one), `favicon.ico`

## Content from old site (verbatim source, rewrite with copywriting skill)

**Meta**: title "Raktim Yoddha — Product Designer & Developer". Description: "Raktim Yoddha — product designer and developer in Gujarat, India. Websites, apps, automations and chatbots that help businesses grow."

**Hero**: "Hi, I'm Raktim Yoddha — I make businesses run on autopilot. Websites, apps, automations, and chatbots that work while you sleep. Local SEO and outreach that bring customers knocking. Ready to skip the grind?" CTA: "Book a Free Call".

**Stats**: 2+ Years of Experience · 10+ Projects Done · 2 Happy Clients

**Services ("What I provide")**:
1. Websites: Custom responsive UI/UX design · High-conversion landing pages · Modern Next.js & React architecture · Ultra-fast performance & SEO
2. Applications: Full-stack web & mobile development · Scalable backend architecture & APIs · Intuitive UI engineered for retention · Secure authentication & data sync
3. Automations: End-to-end multi-app workflow pipelines · Instant CRM, database & notification sync · Automated error-handling & live alerts · Custom API webhooks & integrations
4. Chatbots: Custom AI agents trained on your data · 24/7 lead qualification & instant support · Seamless live booking & CRM handoff · Multi-channel messaging deployment
5. Local SEO: Google Business Profile rank optimization · High-authority local citation building · Targeted geo-keyword search visibility · Review generation & reputation loops
6. Outreach: Multi-channel cold email & LinkedIn outreach · Verified B2B lead scraping & curation · High deliverability setup & domain warmup · Conversion copywriting & A/B testing

Mid CTA: "Ready to build your unfair advantage?" + Book a Free Call.

**Projects ("Recent work")**:
1. Glow with Nutrition (Landing Page): "Evidence-based, personalized nutrition plans and diet consultations built for real-life health goals." https://www.glowwithnutrition.fit/
2. Hiveory (Landing Page, Desktop App): "A local-first desktop workspace uniting autonomous AI agents, recursive split panes, and local chat." https://hiveory.vercel.app/
3. TaskMaster (Desktop App): "A minimalist floating desktop productivity tool with goal widgets, focus timers, and overlay states." https://github.com/raktim-yoddha/taskmaster
4. Skillshare (Web App, AI Platform): "Production-tested editor rules, MCP configs, and agent workflows shared by engineers who actually ship." https://skillsharehq.vercel.app/

**Community**:
- YouTube @codingvibeslive: "Live coding sessions, full builds and tutorials." 1,000+ subscribers. https://www.youtube.com/@codingvibeslive
- Discord: "Hang out with other builders, share your progress, swap tips and get direct support." 250+ members. https://discord.gg/sT8Maq6Cxs
- Twitch: "Catch the live streams, ask questions in chat and code along in real time." https://www.twitch.tv/codingvibeslive
- Free resources (old `/resources` page): Master Next.js with AI · Notion CRM Kit · The Automation Playbook · Local SEO Checklist. Old page also had a "Buy me a coffee" link.

**Booking**: Cal.com inline embed `raktimyoddha/30min` (old site loaded `https://app.cal.com/embed/embed.js`, month view). Old site used a separate `/book` page.

**Contact**: Email raktimyoddha07@gmail.com · WhatsApp `https://wa.me/?text=Hi%20Raktim%2C%20I%20saw%20your%20portfolio!` (no phone number in the link, so it opens a contact picker. Ask Raktim for his number.)

**Location**: Gujarat, India.

## Open decisions (ask Raktim before or while building)
1. **Testimonials are placeholders.** The 5 reviews on the old site (Ken Masters, Jessica, Kira Athrun, Jenny, Lirael Nassun) are template text from a 21st.dev component ("must-have for modern SaaS companies"). The stats say only 2 clients. Do not publish them as real reviews. Options: drop the section, or use real quotes from the 2 clients (likely Glow with Nutrition).
2. WhatsApp number (see Contact).
3. Booking: inline Cal.com section on the landing page (recommended, less friction) or keep a `/book` page.
4. Free resources: keep as a `/resources` page, or one link card only.

## Design system (measured from the reference)
The reference is a Framer site with Lenis smooth scroll. Copy the feel, not its code, images or wording.

Colors:
- `#FFFEF2` cream (page background, also text on dark)
- `#F4EEE6` warm beige (card text panels)
- `#FF2B00` signal red-orange (buttons, accents)
- `#EA8C55` soft orange (full-bleed section background behind the stacked cards)
- `#CC5237` terracotta (footer background, italic accent text)
- `#2B2B2B` charcoal (body text)
- `#000000` black (card image panels)

Type:
- Display mixes an upright grotesk with an italic serif inside the same headline, e.g. "*Build, Grow & Exit* an Online Education Business." Italic serif is used for the emphasized words and for body paragraphs too.
- Reference fonts are PP Editorial Old Italic + PP Neue Montreal (paid, don't use). Free substitutes: **Instrument Serif** (italic) + **Inter Tight** or **Hanken Grotesk**.
- Sizes: H1 70px / 84px line-height; H2 48px / 57.6px; small UI text 12px.

Buttons: square corners (radius 0), `#FF2B00` fill, cream text, 12px text, 14px 24px padding, 52px tall, arrow icons on both sides.

Overall: square corners, thin 1px rules, lots of whitespace, editorial feel.

## Reference sections worth borrowing
1. **Hero**: centered mixed serif/sans headline, italic sub-line, red CTA, then a horizontal strip of photo cards below (B&W photos with italic quotes overlaid). Use the project screenshots or a portrait strip.
2. **Giant marquee wordmark**: huge outlined repeating text ("BG&E BG&E…") scrolling horizontally. Use "RAKTIM YODDHA" (old site also had a big RAKTIM / YODDHA wordmark).
3. **Stacked sliding cards (required, for Projects)**: full-bleed `#EA8C55` section titled "We *Help* You To ↓". Each card: black image panel on the left (~60%), beige text panel on the right with an uppercase H2 title, italic serif body and a red CTA.
   - Mechanics: all cards sit in one tall container (~2290px for 3 cards). Each card is `position: sticky; top: 100px`. As the next card scrolls over, the previous one scales down (measured 1 → 0.7 → 0.6) with slight perspective, so earlier cards look like they recede behind. Build with CSS sticky + `motion` `useScroll`/`useTransform` on scale (transform only).
4. **Sticky stepper (good for the 6 services)**: "There Are *Four Core Elements*…". Sticky left list (TRAFFIC / SALES PROCESS / CONVERSION / VALUE) with a vertical line and dots that fill as you scroll. A CTA sits under the list. The right column scrolls through panels, each with an italic paragraph and a line-art diagram card.
5. **Final CTA**: "Want us to help you *achieve the same?*" + "Book a call with us now…" + button.
6. **FAQ**: centered "Frequently Asked *Questions*", full-width rows with 1px dividers, accordion.
7. **Footer**: full-bleed `#CC5237` terracotta, logo, short line, small print.

Skip (the "lame parts"): Forbes press banner, the "If built properly / If not built properly" comparison, long founder backstory ("Why Work With Us" 01/02/03), video case-study grid.

## Proposed page outline
1. Nav: wordmark + "Book a Free Call" button (sticky, minimal)
2. Hero: mixed-type headline about autopilot, sub-line, CTA, stats row, strip of project screenshots
3. Giant RAKTIM YODDHA marquee
4. Services: sticky stepper with the 6 services
5. Projects: stacked sliding cards on the orange section (4 projects, screenshot left, text + "Visit site" right)
6. Proof: real testimonials if provided, otherwise skip
7. Community + free resources (compact)
8. FAQ (new copy that answers buyer objections: price, timeline, process, what I need from you)
9. Final CTA + inline Cal.com booking
10. Footer: terracotta, email, WhatsApp, socials

## Quality bar
- `prefers-reduced-motion`: disable the card scale, Lenis and marquee motion
- Mobile: the stacked cards still work (image on top, text below), 16px gutters, no horizontal scroll
- Animate transform/opacity only. Lazy-load images with `next/image`.
- SEO: metadata, OG image (`opengraph-image.tsx`), JSON-LD, one H1, semantic sections, sitemap/robots
- Verify in the browser at 375px and 1440px before saying done
