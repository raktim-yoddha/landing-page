# Landing page

@AGENTS.md

Next.js 16 landing page for Raktim Yoddha's freelance business. Original build brief (content source, reference-site measurements, card-stack mechanics) is in `brief/BRIEF.md`.

- All copy lives in `src/content.ts`. Edit text there, not in components.
- Look is modeled on buildgrowandexit.com by request: cream/terracotta palette, italic-serif accent words, thin dividers. The `design-taste-frontend` skill bans these; the user's reference wins. Run its inspector with `--allow palette-claude,mixed-font-headline,hairline,covered-text,long-pin,pinned-over-picture`.
- Fonts are self-hosted in `src/fonts` (OFL) because the dev sandbox can't reach Google Fonts.
- Reviews are dummy placeholders (`reviews.placeholder: true`) and render only in `npm run dev`. Never ship fake reviews; remove the flag only with real, permitted quotes.
- FAQ answers marked `// CONFIRM` in `content.ts` state business policy Raktim must confirm.
- `siteUrl` in `content.ts` is the old domain; update when the new domain is live.
