# LaPasseTech — Spec design refonte v4.5

**Date :** 14 juillet 2026 · **Statut :** validé sur maquettes, à implémenter
**Maquettes de référence :** `~/Downloads/lapassetech-*-v4-5.html` (7 pages, HTML autonomes)

## 1. Contexte et décision

Trois versions existaient : v1 (lapassetech.fr, template orange générique), v2 (ce repo, déployé sur Vercel — chaleureux, humain, média, mais statique) et v3 (maquette Fable — système néo-brutaliste dynamique mais froid : vert dominant, beaucoup de noir, zéro visage).

**Décision : v4.5 = squelette v3 + peau v2.** On garde la structure, les animations et les composants signature de la v3 ; on les réchauffe avec la palette marron/jaune, les visages et le feel média de la v2. Positionnement : **média éditorial incarné d'abord** (« un magazine spécialisé reconversion, tenu par quelqu'un de vrai »), le système graphique au service de ce feel.

## 2. Tokens

Les tokens existants du repo (`src/styles/design-system/tokens/colors.css`, préfixe `--lpt-*`) sont conservés ; la refonte **inverse la hiérarchie d'usage** et ajoute deux valeurs.

| Token maquette | Valeur | Équivalent repo | Usage v4.5 |
|---|---|---|---|
| `--creme` | `#F8F4EB` | `--lpt-cream` | Fond de page + grain papier SVG |
| `--noir` | `#1A1714` | `--lpt-black` | Texte, bordures 2px, footer |
| `--caramel` | `#9C5A2C` | `--lpt-caramel` | **Accent n°1** : eyebrows, hovers, soulignés nav, liseré footer, logo |
| `--caramel-deep` | `#5C2E10` | `--lpt-caramel-deep` | Sections sombres chaudes (questions, ticker) |
| `--terracotta` | `#C97C4A` | **à ajouter** | Accents lisibles sur fonds sombres (footer, ticker) |
| `--jaune` | `#F5C542` | `--lpt-yellow` | **CTA** (« Faire mon bilan », guide), badges, surligneur hero, ticks |
| `--vert` | `#16B877` | `--lpt-green` | **Uniquement** le point de statut « PassBot · en ligne » |
| `--beige` | `#F2E4D4` | `--lpt-temoignage-bg` | Sections intermédiaires (3 étapes, parcours, CTA de bas de page) |
| `--shadow-pop` | `6px 6px 0 var(--noir)` | **à ajouter** | Ombre dure signature (cartes) ; version `-sm` 4px |
| `--r` | `18px` | — | Radius cartes |

**Typo** (inchangée, déjà dans le repo) : Cabinet Grotesk 800 (display), DM Sans (body), Instrument Serif italique (accents `em.s` dans les titres), JetBrains Mono (eyebrows `//`, meta, chips).

Règle d'or : **le vert a disparu comme couleur d'ambiance.** Le jaune signale l'action, le caramel fait l'ambiance, le noir est chaud (`#1A1714`), jamais de jaune sur noir en aplat (association Tademy à éviter).

## 3. Logo & favicon (D6av — validé)

- **Logo** : pastille caramel pivotée (-6°), bord noir 2px, radius 7px, flèche `→` crème (SVG stroke 3, linecap round) **devant** le wordmark `La**Passe**Tech` — « Passe » en caramel, le reste en noir. Sur fond sombre (footer) : bord de pastille crème, « Passe » en terracotta.
- **Favicon / avatar réseaux** : la même pastille seule — carré arrondi caramel, bord noir, flèche crème (SVG inline data-URI dans les maquettes).
- Le logo remplace toutes les variantes précédentes (wordmark v2 « Tech » coloré, carré jaune v3).

## 4. Composants (tous présents dans les maquettes)

**Structure & navigation**
- Header sticky crème translucide, bordure basse noire 2px ; nav avec souligné caramel au hover et sur la page active (`aria-current="page"`) ; chip statut « PassBot · en ligne » (noir, point vert pulsé) ; CTA jaune.
- **Ticker média** sous le header : bande `caramel-deep`, items mono crème séparés par `//` terracotta, défilement 46s en boucle, pause au hover et en `prefers-reduced-motion`. Contenu : actus financement datées.
- Footer noir chaud, liseré haut caramel 6px, titres de colonnes terracotta.

**Cartes & contenus**
- Carte de base : fond blanc, bordure noire 2px, radius 18px, hover translate(-3px,-3px) + shadow-pop-sm.
- **Deck « à la une »** (hero home) : 4 cartes-articles empilées/pivotées avec scotch, autoplay 3.2s, dots jaunes, pause hover/focus, aria-roledescription carrousel.
- **Cartes questions + personas** (signature) : 4 cartes pivotées épinglées (punaise), fonds jaune/crème/caramel/blanc, photo ronde du persona + prénom·âge·métier en mono, question en gros, lien ancré vers la section réponse de la home.
- **Tickets financement** : perforations latérales, label mono `dispositif_0X`, bloc « **La vérité :** » séparé par pointillés caramel.
- **Cartes étapes** (3 étapes pour passer) : label `étape_0X`, flèches caramel entre cartes, fond beige de section.
- **Chat mock PassBot**, **polaroid** (photo bordée, rotation, scotch), **quote card** (guillemet serif géant), **facts** (chiffres 38/16/0, un sur jaune).
- **Cartes formation** (fiche métier) : nom + pastille `↗` jaune, description honnête, tags durée/modalité/financement ; note « je ne touche aucune commission ».
- **Liens externes** : pilule mono avec `↗` caramel. Règle : **jamais de lien sortant dans le hero ou les étapes d'une ressource** — ils sont regroupés en fin de page (« // les liens de cette ressource »), après la checklist de complétion.
- Encadrés éditoriaux : « l'essentiel » (30 s), « La vérité » (pointillés caramel), « Astuce », pull-quote serif à barre jaune.

**Animations** : reveal au scroll (IntersectionObserver, translateY 26px, délais d1–d4), hovers pop, barre de progression de lecture caramel (articles). Tout est désactivé sous `prefers-reduced-motion`.

## 5. Pages (7 gabarits)

1. **Home** — ordre : header + ticker → hero (copy + deck à la une) → questions personas (fond `caramel-deep`) → S'informer/Agir (2 colonnes : articles numérotés + ressources actionnables) → 3 étapes (beige) → bilan PassBot → financement (tickets, fond caramel-10) → métiers (4 cartes) → citation Guy + polaroid + facts → parcours (beige) → guide (fond **caramel plein**, form crème) → footer. Une seule section sombre (questions) avant le footer.
2. **Listing articles** — hero éditorial (« S'informer pour mieux *décider.* »), recherche + filtres pills (actif = caramel), **première carte « à la une »** en double largeur avec image, grille 3 colonnes, compteur dynamique.
3. **Listing ressources** — « Passer à *l'action.* », cartes à bordure gauche épaisse colorée par thème, pastille de niveau (point jaune débutant / caramel intermédiaire), durée en pilule jaune.
4. **Listing métiers** — « Les métiers, *sans flou.* », cartes fiche : icône pivotée, fourchette salaire (jaune), tags, ligne d'accessibilité mono caramel (« // sans diplôme tech · 3–9 mois »).
5. **Template article** — chip catégorie, H1, standfirst, ligne auteur (photo + rôle) + badge « à jour · [mois] », **grande couverture** (400px, bordure + shadow-pop, légende mono), corps avec encadrés, **carte ressource liée dans le corps**, sommaire sticky + carte bilan en sidebar, boîte auteur, 3 « à lire ensuite », barre de progression.
6. **Template fiche métier** — hero icône + tags + stats (4 facts), « Une journée type » (créneaux horaires mono), « Ce que les fiches métiers ne te disent pas » (3 vérités), « Les compétences que tu as déjà » (checklist), « Comment y arriver » (3 étapes), **« Formations & centres repérés »** (cartes liens externes), citation Guy, métiers voisins.
7. **Template ressource** — hero 2 colonnes (chips niveau/thème/durée + visuel polaroid), « avant de commencer » (prérequis), **timeline verticale numérotée** (numéros serif italique terracotta cerclés, durée par étape, astuces, vérités), « tu as terminé quand » (critères de succès), **bloc liens officiels en fin**, « pour continuer ».

Chaque page interne se termine par un bandeau beige de conversion vers le bilan, au libellé contextualisé.

## 6. Règles éditoriales

- Tutoiement, voix « sans bullshit » ; chaque promesse chiffrée est datée (« à jour · avril 2026 »).
- **Témoignages** : les parcours (Bilel, Issa, Aïcha) sont de vraies conversations, pas des accompagnements — le site le dit explicitement (« Pas des success stories maison : trois conversations réelles, leurs mots tels quels. »). Pas de bouton vers une page parcours tant qu'elle n'existe pas. À remplacer par de vrais accompagnés dès que possible.
- **Deck ≠ liste** : le deck du hero est une sélection éditorialisée (« à la une »), la liste d'articles affiche les derniers publiés — ne pas afficher deux fois la même chose en prod.
- Un seul bloc de capture email (le guide) ; pas de bande newsletter séparée.
- Le vert n'apparaît que pour le statut PassBot.

## 7. Implémentation (repo `Site LaPasseTechV2`, branche `refonte-v4-5`)

- Étendre les tokens (`terracotta`, `shadow-pop`, radius) dans `src/styles/design-system/tokens/` ; basculer la hiérarchie des accents dans les composants existants.
- Refondre les sections home (`src/sections/Homepage*.astro`) sur le modèle maquette ; créer le ticker, le deck, les cartes personas (photos déjà dans `public/images/personas/`).
- Pages `articles`, `ressources`, `metiers` + layouts de détail (article via content collections existantes ; fiches métiers et ressources : ajouter champs frontmatter — liens formations, liens officiels, niveau, durée, visuel).
- **Assets à fournir par Guy** : sa vraie photo (le portrait actuel est un placeholder Unsplash) ; visuels de couverture d'articles (Cloudinary).
- Bilan : l'embed Typebot actuel affiche une carte vide au chargement — à remplacer par le chat mock + bouton, ou lazy-load avec placeholder stylé.
- Vérification : `npm run dev` + comparaison visuelle page par page avec les maquettes ; contraste AA sur caramel/crème ; `prefers-reduced-motion` ; mobile 375px.

## 8. Hors périmètre

Pages Bilan (Typebot), À propos, mentions légales : elles adoptent le shell (header/ticker/footer/tokens) mais leur contenu n'est pas re-spécifié ici. Le guide PDF et la newsletter restent tels quels.
