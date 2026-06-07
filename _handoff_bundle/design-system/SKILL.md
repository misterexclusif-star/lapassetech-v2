---
name: lapassetech-design
description: Use this skill to generate well-branded interfaces and assets for LaPasseTech (V2), either for production Astro code or throwaway prototypes/mocks. Contains the design guidelines, color/type/spacing tokens, fonts, and reusable component CSS for the warm editorial "caramel + green tech punch" system.
user-invocable: true
---

Read `README.md` in this skill, then explore the token files (`tokens/*.css`),
`base.css`, `components.css`, and the visual style guide `design-system.html`.

- The single global entry is `styles.css` — it `@import`s fonts + tokens + base +
  components. Link/import that one file.
- Prefer the **semantic CSS variables** (`var(--accent)`, `var(--text-body)`,
  `var(--surface-cream)`, `var(--btn-cta-bg)`…) and the `.lpt-*` component classes.
- Voice is French, informal « tu », anti-bullshit, concrete. No emoji.
- Caramel `#9C5A2C` is primary; green `#16B877` is a ~5% "tech" punch; yellow
  `#F5C542` is the loud CTA. Cabinet Grotesk (display) / DM Sans (body) /
  Instrument Serif (italic flourish) / JetBrains Mono (tech labels).

If creating visual artifacts (mocks, throwaway prototypes), copy assets out and
produce static HTML that links `styles.css`. If working on the production Astro
codebase, copy these tokens into `src/styles/` and use the rules here to design
on-brand. For fonts in production, self-host Cabinet Grotesk (Fontshare licence).

If invoked without guidance, ask what to build, ask a few questions, then act as
an expert LaPasseTech designer who outputs HTML artifacts or production Astro code.
