# Prompt de démarrage — Claude Code (LaPasseTech V2, Astro)

> Colle ceci comme premier message dans Claude Code, à la racine de ton repo V2.
> Ajuste les chemins (`src/...`) à ta structure réelle.

---

## Contexte

Je construis la **V2 du site LaPasseTech** (accompagnement à la reconversion vers
les métiers du digital) en **Astro**. J'ai un package de design prêt dans ce repo :

- `design-system/` — le design system : `styles.css` (point d'entrée global),
  tokens CSS (`tokens/colors.css`, `typography.css`, `spacing.css`,
  `radius-shadow.css`, `fonts.css`), `base.css`, `components.css`, `content.css`
  (patterns de pages : prose, callouts, code blocks, stepper, stat grid, aside
  collant, listings, hero cover, timeline…), et une page de référence visuelle
  `design-system.html`. Lis d'abord `design-system/README.md`.
- `design_handoff_homepage_v4/` — la maquette validée de la **homepage** :
  `README.md` (spec bloc par bloc, copy exacte, tokens, responsive),
  `homepage-v4-reference.html` (rendu de référence à ouvrir dans le navigateur),
  et `screenshots/` (captures de chaque section).
- `pages/` — **toutes les autres pages déjà maquettées** (HTML statique sur le
  design system, contenu réel). Ouvre `pages/index.html` : c'est le hub qui liste
  tout. Voir la section « Pages à recréer » ci-dessous.

## Règles

1. **Lis** `design-system/README.md` puis `design_handoff_homepage_v4/README.md`
   avant d'écrire du code. Ouvre `homepage-v4-reference.html` et les screenshots
   comme référence visuelle.
2. **Ne copie PAS** le JSX d'exploration dans `*/source-reference/` — c'est du code
   de prototypage paramétré. Recrée proprement le **rendu** documenté, avec des
   composants Astro idiomatiques.
3. **Tokens d'abord** : importe `design-system/styles.css` une seule fois dans le
   layout de base. Utilise les variables CSS sémantiques (`var(--accent)`,
   `var(--text-body)`, `var(--surface-cream)`…) et les classes `.lpt-*`. N'invente
   pas de nouvelles couleurs/tailles hors tokens.
4. **Fidélité haute** : couleurs, typo, espacements, copy et interactions sont
   finaux. Seules les **images** sont des placeholders (Unsplash) à remplacer.
5. **Responsive obligatoire** : la maquette est figée à 1280px ; rends-la
   responsive (cf. section "Responsive" du README homepage) — grilles qui passent
   en 1 colonne, header → menu mobile, CTA toujours visible, texte ≥16px, cibles
   tactiles ≥44px.
6. **Voix** : français, tutoiement informel, sans bullshit, pas d'emoji.

## Tâche 1 — Fondations + Homepage

1. Mets en place la structure Astro : un `BaseLayout.astro` (head, fonts, import
   du design system, `<Header>` + `<Footer>` + ticker), et des composants
   réutilisables (`Button`, `Pill`, `Tag`, `Card`, `ArticleCard`, `Input`,
   `Section`) basés sur les classes `.lpt-*`.
2. Construis la **homepage** en suivant l'ordre exact des 12 blocs du README :
   ticker → header → hero → freins « Tu te poses la même question ? » → bilan
   « Ton bilan en 5 minutes » → content « S'informer. Agir. » → « 3 étapes pour
   passer » → lead magnet → témoignages → Guy (+ CTA « Faire mon diagnostic
   gratuit ») → newsletter sombre → footer.
3. Câble les formulaires (capture email guide + newsletter) en stub
   (état idle/loading/success/error) — l'intégration réelle viendra ensuite.
4. Vérifie le rendu contre `homepage-v4-reference.html` à 1280px, puis en mobile.

Commence par lire les deux README et me proposer **l'arborescence de fichiers
Astro** que tu comptes créer, avant de coder. Attends ma validation.

## Pages à recréer (toutes maquettées dans `pages/`)

Ouvre `pages/index.html` pour les parcourir. Recrée-les en Astro **après** la
homepage, en réutilisant le design system. Contenu déjà réel dans les maquettes.

**Templates de contenu (détail) :**
- `pages/article-detail.html` — article long-form. En-tête = **hero image en fond**
  (classe `.lpt-hero-cover` : photo de couverture en `background-image` + dégradé
  sombre + titre superposé en clair). **Repli** : sans image, retirer la classe
  `lpt-hero-cover` → en-tête crème. Corps `.lpt-prose` (titres avec mot accentué
  caramel), sommaire collant, CTA inline (bilan + guide), carte bilan latérale.
- `pages/ressource-detail.html` — ressource pas-à-pas. Stepper, **blocs de prompt
  copiables en BEIGE** (`.lpt-codeblock.lpt-codeblock--beige`), callout « Astuce
  de Guy », récap latéral.
- `pages/fiche-metier.html` — fiche métier. Grille de stats, journée type,
  compétences transférables vs à acquérir, carte « En bref ». Un seul CTA bilan.

**Listings :**
- `pages/articles.html` — hero + recherche + filtres, article à la une (image),
  grille 3 colonnes de cartes **avec image de couverture**.
- `pages/ressources.html` — grille 3 colonnes, cartes avec **badge niveau**
  (`.lpt-level--deb` vert / `.lpt-level--int` caramel), thème, durée.
- `pages/fiches-metiers.html` — grille 3 colonnes, cartes avec **chips** salaire +
  accessibilité (`.lpt-metier-chip`), filtres par famille.

**Page :**
- `pages/a-propos.html` — hero portrait (texte + image côte à côte), mission en
  prose, **parcours en timeline** (`.lpt-timeline`), grille de stats, CTA.

**Décisions de design déjà actées** (ne pas revenir dessus) :
- En-tête d'article = **image en fond** (V1), pas de grande image décorative
  qui repousse le texte sous la ligne de flottaison.
- Blocs de prompt (ressource) = **beige** ; carte « Fais ton bilan » = **marron
  caramel** plein avec CTA jaune.
- **Pas d'emoji** (les méta de ressource utilisent des badges texte).

> Les fichiers `pages/options-*.html` sont des comparatifs d'exploration —
> **ignore-les**, les choix sont déjà appliqués dans les pages ci-dessus.

## À dériver du design system (sans maquette dédiée)
- Pages légales (mentions, RGPD), page 404.
- Flow Bilan / PassBot (chantier applicatif séparé).
