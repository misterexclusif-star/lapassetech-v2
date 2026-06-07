# LaPasseTech — Design System (V2)

Foundations for the LaPasseTech V2 site. Warm, editorial, conversion-oriented —
built to be dropped into the existing **Astro** codebase.

Source of truth for the visual direction: the validated homepage mock
**MIX CLAIR + Vert « MJ » v4** (see `../design_handoff_homepage_v4/`).

---

## What's here
| File | Role |
|---|---|
| `styles.css` | **Global entry** — link this one file. Imports fonts + all tokens + base + components. |
| `tokens/fonts.css` | `@import` for the webfonts (Cabinet Grotesk via Fontshare; DM Sans / Instrument Serif / JetBrains Mono via Google). |
| `tokens/colors.css` | Color tokens + semantic aliases. |
| `tokens/typography.css` | Font families, weights, type scale, line-heights, tracking. |
| `tokens/spacing.css` | 4px spacing scale + layout vars (container, section padding, nav). |
| `tokens/radius-shadow.css` | Radius + shadow tokens. |
| `base.css` | Resets, heading defaults, layout helpers, editorial type roles (`.lpt-eyebrow`, `.lpt-em`, `.lpt-serif-italic`, `.lpt-mono`). |
| `components.css` | Reusable classes: `.lpt-btn` (4 intents), `.lpt-pill`, `.lpt-tag`, `.lpt-status`, `.lpt-card`, `.lpt-article-card`, `.lpt-input`, `.lpt-mark`, `.lpt-check`. |
| `content.css` | Page-level patterns: header/footer chrome, breadcrumb, `.lpt-prose` (long-form), callouts, code blocks (+ `--brown`/`--beige` variants), stepper, stat grid, sticky aside (+ `--brown`/`--beige` bilan cards), CTA band, **listings** (hero/filter bar/card grid/cover image/featured/level badge/métier chips), **`.lpt-hero-cover`** (article cover hero), **`.lpt-timeline`**. |
| `design-system.html` | **Visual style guide** — open in a browser to see every token + component rendered from the real CSS. |

## Using it in Astro
1. Copy this folder to `src/styles/design-system/` (or keep it referenced).
2. In your base layout, import once:
   ```astro
   ---
   import "../styles/design-system/styles.css";
   ---
   ```
3. Use semantic CSS variables in components (`var(--accent)`, `var(--text-body)`,
   `var(--surface-cream)`…) and the `.lpt-*` classes for buttons/pills/cards.
4. **Fonts in prod:** self-host Cabinet Grotesk (Fontshare licence) + the Google
   families instead of the CDN `@import`s in `tokens/fonts.css` (perf + GDPR).

---

## CONTENT FUNDAMENTALS (voice & tone)
- **Language:** French. Direct address with informal **« tu »** (never « vous »).
  e.g. "Le digital, c'est pas réservé aux autres.", "Tu te poses la même question ?"
- **Voice:** honest, anti-bullshit, encouraging-but-not-naive. Tagline energy:
  *"Sans bullshit, sans jargon, sans complexe."* The founder (Guy) speaks in first
  person — peer-to-peer, lived experience, no corporate gloss.
- **Casing:** sentence case for body & titles; UPPERCASE only for small tracked
  eyebrows/tags (`RECONVERSION`, `COMMENT ÇA MARCHE`).
- **Emphasis:** a single key phrase per title gets the **caramel emphasis**
  (`.lpt-em`) — bold, upright, not highlighted. Reserve the serif italic
  (`.lpt-serif-italic`) for short flourishes ("en 5 minutes").
- **Numbers/credibility:** concrete and specific — "16 ans en marketing", "POEI
  financé à 100%", "2× par semaine", "20 pages". No vague hype.
- **Emoji:** none. Tech micro-copy uses mono tokens (`// finançable via :`,
  `step_01`, `en_ligne`) — sparingly, as a flavor, never load-bearing.
- **CTAs:** verb-first, benefit-clear — "Faire mon diagnostic gratuit",
  "Commencer mon bilan", "Recevoir le guide gratuitement", "Je m'abonne".

## VISUAL FOUNDATIONS
- **Palette:** warm caramel `#9C5A2C` is the primary accent (emphasis words, the
  bilan band, the guide/Guy/newsletter CTAs, the hero `<mark>`). A green
  `#16B877` "tech punch" is used at ~5% (status dot, action arrows, the active
  step's top bar). Yellow `#F5C542` is the loud CTA color (header + "Commencer
  mon bilan"). Neutrals are warm (ink `#2A2520`, creams `#F8F4EB`/`#FAF7F3`,
  beiges). Dark sections use near-black `#1A1714`.
- **Backgrounds:** flat warm fills, no gradients. Sections alternate
  white / cream / beige; one caramel "moment" (bilan) and a dark
  newsletter+footer close. No textures or patterns.
- **Type:** display = **Cabinet Grotesk** 700/800, very tight tracking
  (`-0.025em`); body = **DM Sans**; serif accent = **Instrument Serif** (italic);
  mono = **JetBrains Mono** for tech labels.
- **Cards:** generous radius (8–18px), 1px warm border `#E5DDC9`, optional soft
  shadow `0 12px 32px -16px rgba(42,37,32,.18)`. Hover = lift 1–2px + raise shadow.
- **Borders/dividers:** 1px hairlines `#E5DDC9` on light; the cream header has a
  **1.5px solid black** bottom border (signature). On dark, dividers are
  `rgba(255,255,255,.1)`.
- **Buttons:** radius 5–8px. Primary = black w/ a green arrow; CTA = yellow w/
  black text; accent = caramel w/ soft caramel shadow; outline = 1.5px ink.
  Hover darkens ~6% + lifts 1px; active settles back.
- **Motion:** restrained. Status dot pulse (opacity), ticker marquee, gentle
  hover transitions. Honor `prefers-reduced-motion`. No bounces, no parallax.
- **Layout:** 1280px content width; sections ~`80px 64px`; hero is a 2-col split
  on cream with a divider. Mobile: stack grids, header → drawer, keep CTA visible.

## ICONOGRAPHY
- Minimal. Inline glyph arrows `→` (the primary arrow often tinted green on dark
  CTAs) and caramel checkmarks `✓` (`.lpt-check`). No emoji.
- No bespoke icon set in the mock. **Recommendation for prod:** adopt a single
  light-stroke open-source set — **Lucide** (1.5px stroke) fits the editorial,
  un-fussy tone — and tint with `currentColor`. Flag if you prefer another set.
- Category tags are text pills (`.lpt-tag`), not icons.

## Assets
- The homepage mock uses **Unsplash placeholders** for the founder + persona
  imagery. Replace with real, licensed photography of Guy and real testimonials,
  or commissioned illustration consistent with the warm palette.

## CAVEATS / substitutions
- **Cabinet Grotesk** is not on Google Fonts — loaded from Fontshare; offline it
  falls back to **Bricolage Grotesque**. Provide/host the real Cabinet Grotesk
  files for production.
- Iconography is a **recommendation** (Lucide), not extracted from an existing
  set — confirm or swap.

## Related
- `../design_handoff_homepage_v4/` — full homepage handoff (README + reference
  HTML + screenshots) this system was derived from, plus `CLAUDE_CODE_PROMPT.md`.
- `../pages/` — all the other site pages already mocked on this design system
  (open `pages/index.html`): article / resource / fiche-métier detail templates,
  the three listings, and the À propos page. `pages/options-*.html` are
  exploration comparatives — the chosen options are already applied.
