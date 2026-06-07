# LaPasseTech V2 — Package de design (handoff Claude Code)

Dépose ce dossier à la racine de ton repo Astro V2. Tout est cohérent entre les
sous-dossiers (chemins relatifs OK).

## Par où commencer
1. **`design_handoff_homepage_v4/CLAUDE_CODE_PROMPT.md`** — le prompt à coller dans
   Claude Code. Il référence tout le reste.
2. **`design-system/`** — tokens + composants CSS (`styles.css` = point d'entrée).
   Ouvre `design-system/design-system.html` pour la référence visuelle.
3. **`design_handoff_homepage_v4/`** — spec + rendu de référence de la homepage.
4. **`pages/`** — toutes les autres pages maquettées. Ouvre `pages/index.html`.

## Contenu
- **Design system** : `design-system/` (colors, typo, spacing, radius/shadow,
  components, content patterns, hero cover, timeline…).
- **Homepage** : `design_handoff_homepage_v4/` (README spec + `homepage-v4-reference.html`
  + screenshots).
- **Templates de contenu** : `pages/article-detail.html`, `pages/ressource-detail.html`,
  `pages/fiche-metier.html`.
- **Listings** : `pages/articles.html`, `pages/ressources.html`, `pages/fiches-metiers.html`.
- **À propos** : `pages/a-propos.html`.
- Comparatifs d'exploration (`pages/options-*.html`) — pour mémoire, choix déjà appliqués.

## Décisions actées
- En-tête d'article = **image en fond** (`.lpt-hero-cover`), repli en-tête crème sans image.
- Blocs de prompt (ressource) = **beige** ; carte « Fais ton bilan » = **marron caramel**.
- **Pas d'emoji** ; voix FR, tutoiement, sans bullshit.
- Police titres **Cabinet Grotesk** (Fontshare) à self-héberger en prod.
- Iconographie recommandée : **Lucide** (à confirmer).

## À fournir / corriger côté contenu
- Remplacer les **images** (placeholders Unsplash) par les vraies.
- Valider les **chiffres** des fiches métiers (salaires, durées).
