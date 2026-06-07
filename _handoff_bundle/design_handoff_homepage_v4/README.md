# Handoff — LaPasseTech V2 · Homepage (direction « MIX CLAIR + Vert MJ v4 »)

## Overview
This package documents the **validated V2 homepage** for LaPasseTech — a French site that
guides career-changers (« reconversion ») into digital jobs. The design is warm, editorial,
and conversion-oriented: a cream/caramel palette with a discreet green "tech" accent, a
chat-style "bilan" (assessment) module, social proof, and two lead-capture moments (PDF guide
+ newsletter).

The retained direction is internally called **MIX CLAIR + Vert « MJ » v4**.

## About the design files
The files in this bundle are **design references created in HTML/React (via in-browser Babel)** —
prototypes that show the intended look, copy, and behavior. **They are not meant to be copied
into production as-is.** The components are parameterized exploration code (one big "warm" component
driven by dozens of flags); production should be a **clean re-implementation** of the *rendered result*
documented here, in the project's real environment.

- If a codebase/stack already exists → recreate these screens with its existing component
  library, design-system tokens, and conventions.
- If no codebase exists yet → pick an appropriate modern stack (e.g. **Next.js + React + CSS
  Modules / Tailwind**, or Astro for a mostly-static marketing site) and build the homepage there.

The single best reference is **`homepage-v4-reference.html`** — open it in a browser to see the
exact pixels and inspect the DOM/computed styles. The `source-reference/` folder contains the
original exploration JSX for cross-checking values, **not** for copy-paste.

## Fidelity
**High-fidelity.** Colors, typography, spacing, copy, and interactions are final. Recreate the UI
pixel-faithfully. The only placeholders are the **images** (Unsplash stand-ins — see Assets).

---

## Page structure (block order — top → bottom)

The homepage is a single scrolling column, **1280px** content width, centered. Order:

1. **Top ticker** (thin scrolling band of financing/credibility chips)
2. **Header / Nav** (sticky-candidate)
3. **Hero**
4. **Freins** — « Tu te poses la même question ? » (4 persona cards)
5. **Bilan** — « Ton bilan en 5 minutes » (chat module, caramel band)
6. **Content** — « S'informer. Agir. » (articles + resources)
7. **3 étapes pour passer** (connected 3-cell "how it works" grid)
8. **Lead magnet** — « Le guide des métiers du digital… » (white, email capture)
9. **Témoignages** — « Des parcours qui ressemblent au tien. » (grid)
10. **Guy** — « Guy — celui qui est passé. » (founder + stats + primary CTA)
11. **Newsletter** — « 2 fois par semaine, concret et gratuit » (dark band)
12. **Footer** (dark, 4 columns + legal bar)

> Note: blocks 7–10 ordering was specifically arranged by the client. Keep this exact sequence.

---

## Design tokens

### Colors
| Token | Hex | Usage |
|---|---|---|
| `caramel` (primary accent) | `#9C5A2C` | Section emphasis words, "Tech" in logo, step numbers, bilan band bg, guide/Guy CTAs, hero `<mark>` |
| `caramel-deep` | `#5C2E10` | Accent text/borders on light bg |
| `caramel-soft` | `#F2E2CC` | Eyebrow/pill backgrounds |
| `green-punch` (tech accent) | `#16B877` | "en ligne" status dot, action arrows, active-step bar — used sparingly (~5%) |
| `green-punch-deep` | `#0E7A4D` | Active-step number/badge text |
| `green-punch-soft` | `rgba(22,184,119,.12–.18)` | Halo behind status dot, active-step badge bg |
| `yellow` | `#F5C542` | Header CTA bg, "Commencer mon bilan" button bg (dark text) |
| `ink` (text) | `#2A2520` | Primary body/heading text |
| `ink-black` | `#1A1714` | Hero CTA, "Envoyer" chip, dark sections (newsletter/footer) |
| `gray` | `#6B655D` | Secondary text |
| `gray-lt` | `#9A9388` | Eyebrows, meta, muted labels |
| `gray-light` | `#B5AE9F` | Footnotes, dark-section muted text |
| `paper` (white) | `#FFFFFF` | Card surfaces, several section bgs |
| `cream` | `#F8F4EB` | Hero bg, quote chip, Guy stat cards |
| `cream-header` | `#FAF7F3` | **Header background** |
| `beige` | `#EFE6D2` | — |
| `temoignage-bg` | `#F2E4D4` | Testimonials section bg |
| `border` | `#E5DDC9` | Hairlines/dividers on light bg |
| `border-dark` | `rgba(255,255,255,.1)` | Dividers on dark bg |

### Per-section backgrounds (this variant)
- Freins: `#FFFFFF` · Bilan band: `#9C5A2C` · Content: `#FFFFFF` · 3 étapes: `#FFFFFF`
- Lead magnet: `#FFFFFF` · Témoignages: `#F2E4D4` · Guy: `#F6ECDD` · Newsletter & Footer: `#1A1714`

### Typography
| Role | Family (with fallbacks) | Notes |
|---|---|---|
| Display / headings (`fd`) | **Cabinet Grotesk** → Bricolage Grotesque → system-ui | weights 700/800, tight tracking `-0.025em` |
| Body (`fb`) | **DM Sans** → system-ui | 400/500/600/700 |
| Serif accent (`fs`) | **Instrument Serif** (italic) | used for the hero/bilan italic flourishes & step numbers in "3 étapes" |
| Mono micro-copy (`fm`) | **JetBrains Mono** → Space Grotesk → ui-monospace | tech labels: `step_01`, `// finançable via :`, `en_ligne` |

Webfonts: Google Fonts (Instrument Serif, DM Sans, JetBrains Mono…) + Fontshare (Cabinet Grotesk).
In production, self-host or load via the same providers.

Heading scale (px): Hero H1 **48** · section H2 **44–46** · card H3 **19** · big step numbers **56** ·
body **14–16** · eyebrow/meta **11** · footnotes **12**.

### Spacing / radius / shadow
- Section padding: ~`80px 64px` (Hero `56px 52px`; newsletter `88px 64px`).
- Card radius: 8–18px (stat cards 8, persona cards 18, "3 étapes" grid container 10).
- Buttons radius: 5–8px. Inputs radius 6px.
- Card shadow (persona): `0 12px 32px -16px rgba(42,37,32,0.18)`.
- Guy CTA shadow: `0 14px 30px -14px rgba(156,90,44,0.55)`.

---

## Block specs

### 1. Top ticker
Thin full-width band, dark (`#1A1714`) text-on-light or as a marquee of credibility chips:
`DES MÉTIERS DIGITAL ACCESSIBLES SANS CODER` · `POEI · CDI GARANTI AVANT LA FORMATION` ·
`CPF JUSQU'À 100% FINANCÉ` · `PASSBOT · …`. Auto-scrolls horizontally (continuous loop).

### 2. Header / Nav  (height 64px, padding `0 40px`)
- Background **cream `#FAF7F3`**, bottom border **1.5px solid `#1A1714`**.
- Left: wordmark **LaPasse** (ink) + **Tech** (caramel `#9C5A2C`), Cabinet Grotesk 800, 19px.
- Center: links `S'informer` · `Passer à l'action` · `Le bilan` · `À propos` (DM Sans 14, gray).
- Right: green status dot (`#16B877` + soft halo) + mono `PassBot · en ligne`, then a
  **yellow `#F5C542`** CTA "Faire mon bilan →" (dark text `#1A1714`, radius 5, padding `9px 18px`).

### 3. Hero  (2-col grid, bg cream `#F8F4EB`, divider between columns)
**Left column** (`56px 52px`, right border):
- Eyebrow: `Reconversion sans bullshit · Mai 2026` (11px, tracked uppercase).
- H1 (Cabinet 800, 48/1.08, `-0.025em`): `Le digital, c'est pas` + line break +
  `réservé aux autres.` wrapped in a **caramel `<mark>`** (text `#FAF7F3`, padding `2px 10px`, radius 2).
- Paragraph (16/1.7, max 460): "Métiers, formations, financements — tout ce que j'aurais aimé
  savoir avant de me reconvertir. **Par quelqu'un qui l'a vraiment vécu.**"
- Buttons (gap 10): primary **"Faire mon diagnostic gratuit →"** (bg `#1A1714`, white, the arrow is
  green `#16B877`); secondary **"Guide gratuit · 20 pages"** (outline 1.5px ink, transparent).
- Trust chips (pills, white, 1px border): `5 min · 100% gratuit` · `CPF financé à 100%` ·
  `POEI · CDI avant la formation`.

**Right column** (white): top image (height 220, founder photo, slight saturate/contrast filter)
with an overlaid caption chip "Guy · 16 ans marketing → Business Analyst Salesforce"; below it a
numbered **featured-articles list** (01/02/03 with category, title, meta) separated by hairlines:
1. `Reconversion` — "16 ans en marketing : comment j'ai basculé dans la tech à 40 ans" · 7 min · 4 mars 2026
2. `Financement` — "POEI, CPF, Transitions Pro : lequel choisir pour ta reconversion ?" · 6 min · CPF · Guide
3. `Métiers du digital` — "Business Analyst Salesforce : le métier que personne ne t'a expliqué" · 8 min

### 4. Freins — « Tu te poses la même question ? »
Eyebrow `Pour qui`. H2: **Tu te poses** + caramel-highlight **la même question ?**. Sub:
"Quatre doutes que tout le monde garde pour soi. Tu vas trouver une réponse à chacun ici."
Then a **4-column grid** of persona cards (white, radius 18, 1px border, soft shadow, min-height 380),
each: a **3D-style avatar** (illustrated — replace with real art/illustration), an uppercase name
(`Sophie · 38 ans`), a former-role line (`Commerciale 16 ans`), and a 2-line question in Cabinet 700/18:
- Sophie · 38 ans — Commerciale 16 ans — "Suis-je trop vieille pour me reconvertir ?"
- Malik · 42 ans — Gestionnaire de stock — "Puis-je entrer dans la tech sans diplôme ?"
- Aïcha · 34 ans — Assistante 8 ans — "Comment financer ma formation sans me ruiner ?"
- Thomas · 45 ans — Prof 18 ans — "Suis-je capable d'apprendre à coder à mon âge ?"

### 5. Bilan — « Ton bilan en 5 minutes »  (caramel `#9C5A2C` full band)
Two-part: editorial left (title "Ton bilan **en 5 minutes**" — *the "en 5 minutes" is upright,
NOT italic* in this variant) + a **chat module** mimicking PassBot:
- A status row: **green dot `#16B877`** + label **"En ligne"** rendered **white** (mono `en_ligne`
  when mono labels on).
- Bot/user chat bubbles (assessment Q&A preview).
- An input row with a **black `#1A1714` "Envoyer"** chip.
- Primary CTA **"Commencer mon bilan →"** as a **yellow `#F5C542`** button with **black** text
  (arrow also black).
Text-on-caramel is white/cream for legibility.

### 6. Content — « S'informer. Agir. »
Eyebrow + H2 with caramel emphasis on **Agir.** Intro about two distinct spaces (articles of
substance vs. actionable resources). Renders the "humans" illustrated content layout: two grouped
columns (Articles / Ressources) with item lists; warm illustrative background treatment.

### 7. 3 étapes pour passer  (the "how it works" grid)
Eyebrow `Comment ça marche`. H2: **3 étapes pour** + caramel **passer.** Sub: "Un chemin clair,
gratuit, sans engagement. Tu avances à ton rythme."
**3 connected cells** (single grid, 1px gutters over a border-colored bg, outer radius 10): each cell
has a **3px top bar** (caramel; the middle/active cell uses green `#16B877`), a mono `step_0N` label +
a small state badge (`à faire` / green `● en cours` on the active cell), a **big number 01/02/03**
(Cabinet 800, 56px, caramel; outlined when the accent is light), an H3 title, and a description:
1. **Fais ton bilan gratuit** — "PassBot pose 8 questions pour identifier les métiers du digital qui collent à ton profil."
2. **Explore articles & ressources** — "Comprends les métiers, les formations, les financements. Monte en compétences maintenant."
3. **Continue à avancer chaque semaine** — "Ton diagnostic arrive par email avec tes métiers compatibles. Ensuite, 2× par semaine : un article + une ressource pour progresser."
Footer row of the block: left label **"Finançable via :"** (mono `// finançable via :` if mono on) +
right cluster of pill chips: `CPF` · `France Travail` · `POEI` · `OPCO` · `Transitions Pro` · `Mon Compte Formation`.

### 8. Lead magnet — « Le guide des métiers du digital… »  (white bg)
Two-col: left = H2 "Le guide des métiers du digital / **expliqués sans jargon**", a short blurb
("20 pages concrètes…"), and a 4-item checklist (caramel ✓):
`8 métiers digital accessibles sans code` · `CPF, POEI, Transitions Pro : lequel pour toi` ·
`Les formations qui débouchent vraiment` · `Checklist reconversion prête à l'emploi`.
Right = capture form: inputs **"Ton prénom"** + **"Ton email"**, then a **caramel `#9C5A2C`** button
**"Recevoir le guide gratuitement →"** (white text), and a reassurance footnote ("Zéro spam.
Désinscription en 1 clic. En t'inscrivant tu rejoins aussi la newsletter 2×/semaine.").

### 9. Témoignages — « Des parcours qui ressemblent au tien. »  (bg `#F2E4D4`)
H2 with caramel emphasis on **ressemblent au tien.** A grid of testimonial cards (name, before→after
role, quote, outcome metric). Keep card rhythm consistent with persona cards.

### 10. Guy — « Guy — celui qui est passé. »  (bg `#F6ECDD`)
Two-col: left = eyebrow "Pourquoi j'ai créé LaPasseTech", H2 with caramel emphasis on **est passé.**,
two paragraphs of founder story (bold pull-phrases in ink), an italic **blockquote** (Instrument Serif
24, left border 3px caramel-deep, cream bg), a text link "Lire mon parcours complet →" (caramel
underline), **and a primary solid CTA** → **"Faire mon diagnostic gratuit →"** (bg caramel `#9C5A2C`,
white, radius 8, padding `15px 26px`, soft caramel shadow).
Right = a column of 4 **stat cards** (white, 1px border, radius 8): `16` Années en marketing et CRM ·
`100%` Financé via POEI · `40` Ans au moment de la reconversion · `BA` Business Analyst Salesforce.

### 11. Newsletter — « 2 fois par semaine, concret et gratuit »  (dark `#1A1714`, centered)
H2 (Cabinet 800, 40, cream) "2 fois par semaine, concret et gratuit". Sub (gray-light)
"Articles · Ressources · Info financement". A centered row (max 540): email input (translucent
white field, dark border) + **caramel `#9C5A2C`** button **"Je m'abonne →"** (white text). Footnote:
"2 emails/semaine max · Désinscription 1 clic · _Confidentialité_ (underlined link)".

### 12. Footer  (dark `#1A1714`, 4-col grid + legal bar)
Col 1: wordmark + tagline "Reconversion vers les métiers du digital. Sans bullshit, sans jargon,
sans complexe." Cols 2–4: link lists under headings **S'informer** / **Passer à l'action** /
**LaPasseTech** (note: in the design, the "Télécharger le guide PDF" link is tinted caramel as a
subtle highlight). Bottom legal bar (top border): "© 2026 LaPasseTech. Tous droits réservés." +
"Mentions légales · RGPD".

---

## Interactions & behavior
- **Header CTA / Hero CTAs / Bilan CTA / Guy CTA** → route to the bilan/diagnostic flow (`/bilan`).
- **"Guide gratuit"/lead-magnet form** → email capture → triggers PDF delivery + newsletter opt-in.
- **Newsletter form** → email capture → subscribe (double opt-in recommended).
- **Bilan chat module**: in production this should be the interactive PassBot assessment (8 questions,
  ~5 min). The prototype only shows a static preview — treat as the entry point UI.
- **Top ticker**: continuous horizontal marquee (CSS animation; pause on hover optional).
- **Status dot** ("en ligne"): subtle pulse (`@keyframes pulse` opacity 0.3↔1) — respect
  `prefers-reduced-motion`.
- **Hover states** (not all encoded in the proto — apply tasteful defaults): buttons darken ~6–8%
  / lift 1px; links underline or shift to caramel; cards raise shadow slightly.
- **Forms**: validate email format; show inline error; success state replaces the form with a
  confirmation ("Vérifie ta boîte mail").

## Responsive behavior
The prototype is desktop-fixed at **1280px**. Production must be responsive:
- **Hero**, **Content**, **Guy**, **Témoignages** 2-col grids → stack to 1 column on tablet/mobile.
- **Freins** 4-col → 2-col (tablet) → 1-col (mobile).
- **3 étapes** 3 connected cells → stack vertically on mobile (drop the connectors).
- **Header** nav links → hamburger/drawer on mobile; keep the CTA visible.
- **Newsletter/lead-magnet** input rows → stack input above button on narrow screens.
Maintain min tap targets ≥ 44px and body text ≥ 16px on mobile.

## State management
Mostly static marketing page. Minimal state:
- Form field values + validation/submission status (idle/loading/success/error) for the two capture
  forms and the header/hero bilan entry.
- Optional: ticker animation is pure CSS (no state).
- The actual PassBot assessment is a separate flow/app — out of scope for the homepage beyond its CTA.

## Assets
- **Founder photo (Guy)** and **testimonial/persona portraits** are **Unsplash placeholders** in the
  proto (e.g. `images.unsplash.com/photo-1507003211169…`). Replace with real, licensed photos of Guy
  and real testimonials, or commissioned illustrations.
- **Persona avatars** in the Freins block are stylized 3D-ish illustrations drawn in the prototype —
  replace with real illustration assets or photography consistent with the brand.
- **Icons**: checkmarks are simple `✓` glyphs in caramel; arrows are `→` glyphs. Use an icon set or
  inline SVG in production.
- No proprietary/brand-locked assets are required.

## Files in this package
- `homepage-v4-reference.html` — **self-contained** rendered reference (open in a browser; inspect
  DOM + computed styles). The Cabinet Grotesk webfont only loads when online; offline it falls back
  to Bricolage Grotesque.
- `screenshots/` — `01-section.png` → `09-section.png`, the page captured top-to-bottom (visual
  reference for each block; rendered at the 1280px design width).
- `source-reference/` — original exploration JSX (read-only reference, **do not copy-paste**):
  - `palette-launch.jsx` — defines the finalist `PaletteFinalVertMJ4` (token values, block order, flags).
  - `home-cabinet-warm.jsx` — the body component: section renderers (bilan, 3-étapes grid, Guy stats,
    newsletter, lead magnet, footer) + color/`punch` token logic.
  - `home-cabinet-hybrid.jsx` — Nav + Hero (cream header, yellow CTA, ticker).
  - `block-explorations.jsx` — Freins persona block + content "humans" block + avatars.
  - `home.jsx` — `LPT_CONTENT` single source of truth (copy, article list, stats, image URLs).

## Implementation checklist
- [ ] Set up tokens (colors, fonts, spacing) from the tables above.
- [ ] Build layout primitives: Section wrapper (`80px 64px`), 1280 container, pill, button variants
      (primary-black, primary-caramel, CTA-yellow, outline), card.
- [ ] Implement blocks 1–12 in the exact order, with the copy above.
- [ ] Wire the two capture forms + bilan CTA routing.
- [ ] Make it responsive per the breakpoints above.
- [ ] Swap placeholder imagery for real assets.
- [ ] QA against `homepage-v4-reference.html` at 1280px.
