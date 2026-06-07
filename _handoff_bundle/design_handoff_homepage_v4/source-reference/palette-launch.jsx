/* eslint-disable */
// palette-launch.jsx
// 5 déclinaisons couleur du gabarit Launch-ready (ordre validé HERO → Reconnais
// E3 Pixar → Bilan → Témoignages → Content Humans → Parcours → Guy →
// Leadmagnet → Footer). Chaque palette définit son accent + l'alternance des
// fonds de section. Les blocs Reconnais & Content sont swappés vers les
// versions Pixar / Illustré humains via les props `reconnaisVariant="pixar-freins"`
// et `contentVariant="humans"` (cf. HomeCabinetWarm).
//
// Objectif : sortir du jaune-Tademy en proposant des univers chromatiques
// distincts (cacao chaleureux, bordeaux affirmé, sauge apaisé, vert forêt,
// violet contemporain) — tout en gardant la même grammaire éditoriale.

// Ordre validé par l'utilisateur (HERO inclus via Hero du Hybride)
const LAUNCH_ORDER = [
  'reconnais',     // E3 · Pixar 3D — freins reconversion
  'bilan',         // Ton bilan PassBot
  'temoignages',   // 1 témoignage featured
  'content',       // C · Fond illustré humains
  'parcours',      // Comment ça marche
  'guy',           // Pourquoi j'ai créé LaPasseTech
  'leadmagnet',    // Guide PDF
];

// Shared launch settings — same for all palettes
const SHARED_LAUNCH = {
  sectionOrder: LAUNCH_ORDER,
  reconnaisVariant: 'pixar-freins',
  contentVariant: 'humans',
  guyVariant: 'text',
  parcoursVariant: 'lapassetech',
  bilanDuration: 5,
  temoignageVariant: 'single',
  showTicker: true,
};

// ── 1. Cacao & Crème ──────────────────────────────────────────────────
// Alternance crème ↔ beige ↔ blanc, accent caramel saturé sur le Bilan.
// Vibe Studyrama croisée avec un éditorial gourmand. Pas de jaune.
const PaletteLaunchCacao = ({ tweaks = {} }) => (
  <HomeCabinetHybrid
    {...SHARED_LAUNCH}
    tweaks={{
      ...tweaks,
      accent: '#9C5A2C',           // caramel — utilisé sur le Bilan + signatures
      ctaColor: '#2D1810',         // chocolat profond
      bgReconnais: '#FFFFFF',      // blanc (Pixar respire)
      bgManifeste: '#F7ECD2',      // crème
      bgParcours: '#FFFFFF',
      bgGuy: '#EFE6D2',            // beige plus saturé
      bgContent: '#F7ECD2',        // crème
      bgTemoignages: '#FFFFFF',
      bgBilan: '#9C5A2C',          // caramel — moment d'accent
      bgLeadmagnet: '#EFE6D2',     // beige
    }}
  />
);

// ── 2. Bordeaux · Blanc · Noir ───────────────────────────────────────
// Affirmation éditoriale. Bilan en bordeaux plein (texte blanc),
// reste de la page en blanc/crème, CTA noirs.
const PaletteLaunchBordeaux = ({ tweaks = {} }) => (
  <HomeCabinetHybrid
    {...SHARED_LAUNCH}
    tweaks={{
      ...tweaks,
      accent: '#A04141',           // bordeaux signature — Hi & Eyebrow flipent en blanc
      ctaColor: '#1A1714',         // noir profond
      bgReconnais: '#FFFFFF',
      bgManifeste: '#FAF7F3',      // off-white
      bgParcours: '#FFFFFF',
      bgGuy: '#FAF7F3',
      bgContent: '#FFFFFF',
      bgTemoignages: '#FAF7F3',
      bgBilan: '#A04141',          // bordeaux — moment d'accent fort
      bgLeadmagnet: '#FFFFFF',
    }}
  />
);

// ── 3. Vert sauge ────────────────────────────────────────────────────
// Atmosphère apaisée, coaching. Sauge tendre en alternance, signature
// sauge plein sur le Bilan.
const PaletteLaunchSauge = ({ tweaks = {} }) => (
  <HomeCabinetHybrid
    {...SHARED_LAUNCH}
    tweaks={{
      ...tweaks,
      accent: '#7E9F6E',           // sauge — Hi/Eyebrow garde texte sombre (lum > 0.5)
      ctaColor: '#3D5230',         // sauge profond
      bgReconnais: '#FFFFFF',
      bgManifeste: '#E7EFE0',      // sauge soft
      bgParcours: '#FFFFFF',
      bgGuy: '#E7EFE0',
      bgContent: '#FFFFFF',
      bgTemoignages: '#E7EFE0',
      bgBilan: '#7E9F6E',          // sauge plein — texte sombre lisible
      bgLeadmagnet: '#FFFFFF',
    }}
  />
);

// ── 4. Vert forêt ────────────────────────────────────────────────────
// Variante plus dramatique : vert foncé en accent. Bilan en vert forêt
// plein, texte blanc. Signature dorée discrète possible.
const PaletteLaunchForet = ({ tweaks = {} }) => (
  <HomeCabinetHybrid
    {...SHARED_LAUNCH}
    tweaks={{
      ...tweaks,
      accent: '#1E4D3A',           // vert foncé — Hi/Eyebrow flipent en blanc
      ctaColor: '#1E4D3A',         // CTA sombre cohérent
      bgReconnais: '#FFFFFF',
      bgManifeste: '#F4F0E6',      // cream chaud
      bgParcours: '#FFFFFF',
      bgGuy: '#F4F0E6',
      bgContent: '#FFFFFF',
      bgTemoignages: '#F4F0E6',
      bgBilan: '#1E4D3A',          // vert forêt plein — moment d'accent
      bgLeadmagnet: '#FFFFFF',
    }}
  />
);

// ── 5. Violet ────────────────────────────────────────────────────────
// Atmosphère contemporaine, plus calme. Lavande très clair en alternance,
// violet profond comme accent du Bilan + Hi.
const PaletteLaunchViolet = ({ tweaks = {} }) => (
  <HomeCabinetHybrid
    {...SHARED_LAUNCH}
    tweaks={{
      ...tweaks,
      accent: '#6B4D8C',           // violet profond — Hi/Eyebrow blanc
      ctaColor: '#2A1F40',         // ink violet
      bgReconnais: '#FFFFFF',
      bgManifeste: '#F0EBF8',      // lavande très clair (couleur citée par utilisateur)
      bgParcours: '#FFFFFF',
      bgGuy: '#F0EBF8',
      bgContent: '#FFFFFF',
      bgTemoignages: '#F0EBF8',
      bgBilan: '#6B4D8C',          // violet plein — moment d'accent
      bgLeadmagnet: '#FFFFFF',
    }}
  />
);

// ── 6. Marron / Moka ─────────────────────────────────────────────────
// Marron #7C5A2A en couleur principale — plus terreux et moins orangé
// que le caramel de Cacao. Crème chaude en alternance, signature dorée
// possible sur le Bilan. Le Hi flip auto en blanc (lum < 0.5).
const PaletteLaunchMarron = ({ tweaks = {} }) => (
  <HomeCabinetHybrid
    {...SHARED_LAUNCH}
    tweaks={{
      ...tweaks,
      accent: '#7C5A2A',           // marron profond — Hi/Eyebrow blanc auto
      ctaColor: '#3A2810',         // brun très foncé
      bgReconnais: '#FFFFFF',
      bgManifeste: '#F5EFE2',      // crème chaude légèrement plus claire
      bgParcours: '#FFFFFF',
      bgGuy: '#F5EFE2',
      bgContent: '#FFFFFF',
      bgTemoignages: '#F5EFE2',
      bgBilan: '#7C5A2A',          // marron plein — moment d'accent
      bgLeadmagnet: '#FFFFFF',
    }}
  />
);

// ── 6b. Marron / Moka MIX — Cacao (Hero/Reconnais/Content) + lpt-v2-marron1
// (Bilan/Témoignages/Parcours/Guy) ────────────────────────────────────
// Demande utilisateur : garder les blocs Hero, "Et toi c'est quoi qui te
// bloque" (Reconnais Pixar freins) et "S'informer. Agir" (Content humains) du
// template Cacao, et reprendre les blocs "Ton bilan en 5 minutes" (chat
// PassBot translucide), "Témoignages" (3 cartes de→vers), "Comment ça marche"
// (grille numérotée) et "Pourquoi j'ai créé LaPasseTech" (texte + 4 stats) de
// la maquette lpt-v2-marron1 — le tout en palette Moka #7C5A2A.
const PaletteLaunchMarronMix = ({ tweaks = {} }) => (
  <HomeCabinetHybrid
    {...SHARED_LAUNCH}
    // Cacao garde : reconnais pixar-freins + content humains (via SHARED_LAUNCH)
    // lpt-v2-marron1 reprend :
    bilanVariant="chat-lpt"
    temoignageVariant="grid-lpt"
    parcoursVariant="grid-lpt"
    guyVariant="stats-lpt"
    tweaks={{
      ...tweaks,
      accent: '#7C5A2A',           // moka profond — Hi/Eyebrow blanc auto
      ctaColor: '#3A2810',         // brun très foncé
      bgReconnais: '#FFFFFF',      // blanc (Pixar respire)
      bgManifeste: '#F5EFE2',
      bgParcours: '#FFFFFF',       // blanc pur (grille parcours lpt)
      bgGuy: '#F5EFE2',            // crème chaude (Guy lpt)
      bgContent: '#FFFFFF',
      bgTemoignages: '#EDDFC2',    // pâle moka (bande témoignages lpt)
      bgBilan: '#7C5A2A',          // moka plein — chat PassBot translucide
      bgLeadmagnet: '#FFFFFF',
    }}
  />
);

// ── 6c. Marron / Moka MIX CLAIR — même mix que 6b mais marron clair #9C5A2C
// au lieu du moka foncé #7C5A2A, + tweak couleur de texte des sections ──────
// Demande utilisateur : repartir de la maquette MIX (Hero / Te bloque /
// S'informer issus de Cacao + Bilan / Témoignages / Comment ça marche / Guy
// issus de lpt-v2-marron1), mais en remplaçant le marron foncé par le caramel
// clair #9C5A2C. Le tweak `sectionTextColor` (Tweaks → "Texte des sections")
// permet de basculer le texte des sections en noir ou en blanc.
const PaletteLaunchMarronMixClair = ({ tweaks = {} }) => (
  <HomeCabinetHybrid
    {...SHARED_LAUNCH}
    // lpt-v2-marron1 reprend :
    bilanVariant="chat-lpt"
    temoignageVariant="grid-lpt"
    parcoursVariant="grid-lpt"
    guyVariant="stats-lpt"
    tweaks={{
      ...tweaks,
      accent: '#9C5A2C',           // caramel clair — remplace le moka foncé
      ctaColor: '#3A2810',         // brun très foncé (CTA)
      bgReconnais: '#FFFFFF',      // blanc (Pixar respire)
      bgManifeste: '#F6ECDD',
      bgParcours: '#FFFFFF',       // blanc pur (grille parcours lpt)
      bgGuy: '#F6ECDD',            // crème chaude (Guy lpt)
      bgContent: '#FFFFFF',
      bgTemoignages: '#F2E4D4',    // pâle caramel (bande témoignages lpt)
      bgBilan: '#9C5A2C',          // caramel clair plein — chat PassBot translucide
      bgLeadmagnet: '#FFFFFF',
    }}
  />
);

// ── 6d. Cacao + Vert Tech & 6e. Cacao + Jaune — punch secondaire ────────
// La couleur principale retenue est le cacao/caramel #9C5A2C. Comme le cacao
// n'évoque pas spontanément la tech, on injecte un 2ᵉ accent vif (~5 %) sur
// les signaux « tech » : point « en ligne », flèches d'action, étape active du
// parcours, badge « → métier ». Deux directions, reprises des maquettes de
// Claude Code (lpt-v2-marron-tech-final = vert ; lpt-v2-mj = jaune) — mêmes
// blocs que MIX CLAIR. Le tweak `punch` (vert/jaune/none) et `monoLabels`
// (micro-copie JetBrains Mono) restent ajustables depuis le panneau Tweaks.
const CACAO_PUNCH_BASE = {
  bilanVariant: 'chat-lpt',
  temoignageVariant: 'grid-lpt',
  parcoursVariant: 'grid-lpt',
  guyVariant: 'stats-lpt',
};
const CACAO_PUNCH_TWEAKS = {
  // Marron profond (cacao terreux) comme couleur PRINCIPALE — moins doré/jaune
  // que l'ancien caramel #9C5A2C, qui lisait trop « jaune » sur les grandes
  // surfaces (mark, bande Bilan, mot « Tech », numéros d'étape). Le marron
  // domine, le punch (vert/jaune) reste un signal tech très minoritaire.
  accent: '#6F4522',           // cacao profond — couleur principale (marron)
  ctaColor: '#1A1714',         // noir profond — CTA primary
  bgReconnais: '#FFFFFF',
  bgManifeste: '#F6ECDD',
  bgParcours: '#FFFFFF',
  bgGuy: '#F6ECDD',
  bgContent: '#FFFFFF',
  bgTemoignages: '#F2E4D4',
  bgBilan: '#6F4522',          // bande Bilan en marron plein (texte blanc auto)
  bgLeadmagnet: '#1A1714',     // noir — contraste final, met le punch en valeur
};

// 6d — Vert électrique + micro-copie mono (direction « tech assumée »)
const PaletteLaunchCacaoVert = ({ tweaks = {} }) => {
  const { punch, monoLabels, ...rest } = tweaks;
  return (
    <HomeCabinetHybrid
      {...SHARED_LAUNCH}
      {...CACAO_PUNCH_BASE}
      tweaks={{
        ...rest,
        ...CACAO_PUNCH_TWEAKS,
        punch: punch !== undefined ? punch : 'vert',
        monoLabels: monoLabels !== undefined ? monoLabels : true,
      }}
    />
  );
};

// 6e — Jaune soleil, sans mono (direction « chaleureuse + punchy »)
const PaletteLaunchCacaoJaune = ({ tweaks = {} }) => {
  const { punch, monoLabels, ...rest } = tweaks;
  return (
    <HomeCabinetHybrid
      {...SHARED_LAUNCH}
      {...CACAO_PUNCH_BASE}
      tweaks={{
        ...rest,
        ...CACAO_PUNCH_TWEAKS,
        punch: punch !== undefined ? punch : 'jaune',
        monoLabels: monoLabels !== undefined ? monoLabels : false,
      }}
    />
  );
};

// ── 6f & 6g. MIX CLAIR + punch tech — caramel clair #9C5A2C principal ──────
// Demande utilisateur : 2 nouvelles versions de MIX CLAIR (#9C5A2C caramel
// clair + tweak `sectionTextColor` noir/blanc), chacune calquée sur une
// maquette Claude Code :
//   • 6f ← lpt-v2-marron-tech-final.html : punch VERT + micro-copie mono
//     (// tech), CTA noir à flèche verte, lead magnet noir.
//   • 6g ← lpt-v2-mj.html : punch JAUNE utilisé AUSSI comme couleur de CTA
//     (jaune #F5C542, texte noir auto), sans mono, lead magnet noir.
// Contrairement à Cacao+Vert/Jaune (6d/6e) qui passent en marron profond
// #6F4522, ces deux gardent le caramel clair #9C5A2C comme couleur PRINCIPALE
// — la lignée « MIX CLAIR ». Le tweak `sectionTextColor` (noir/blanc) reste
// actif sur les sections.
const MIXCLAIR_PUNCH_BASE = {
  bilanVariant: 'chat-lpt',
  temoignageVariant: 'grid-lpt',
  parcoursVariant: 'grid-lpt',
  guyVariant: 'stats-lpt',
};
const MIXCLAIR_PUNCH_TWEAKS = {
  accent: '#9C5A2C',           // caramel clair — couleur PRINCIPALE
  bgReconnais: '#FFFFFF',
  bgManifeste: '#F6ECDD',
  bgParcours: '#FFFFFF',
  bgGuy: '#F6ECDD',
  bgContent: '#FFFFFF',
  bgTemoignages: '#F2E4D4',    // accent-lt pâle (témoignages des 2 réf.)
  bgBilan: '#9C5A2C',          // caramel clair plein — chat PassBot translucide
  bgLeadmagnet: '#1A1714',     // noir — comme les 2 maquettes réf.
};

// 6f — MIX CLAIR + Vert tech (← lpt-v2-marron-tech-final)
const PaletteLaunchMixClairVert = ({ tweaks = {} }) => {
  const { punch, monoLabels, ...rest } = tweaks;
  return (
    <HomeCabinetHybrid
      {...SHARED_LAUNCH}
      {...MIXCLAIR_PUNCH_BASE}
      tweaks={{
        ...rest,
        ...MIXCLAIR_PUNCH_TWEAKS,
        ctaColor: '#1A1714',     // CTA noir (flèche verte via punch)
        punch: punch !== undefined ? punch : 'vert',
        monoLabels: monoLabels !== undefined ? monoLabels : true,
      }}
    />
  );
};

// 6g — MIX CLAIR + Jaune (← lpt-v2-mj)
const PaletteLaunchMixClairJaune = ({ tweaks = {} }) => {
  const { punch, monoLabels, ...rest } = tweaks;
  return (
    <HomeCabinetHybrid
      {...SHARED_LAUNCH}
      {...MIXCLAIR_PUNCH_BASE}
      tweaks={{
        ...rest,
        ...MIXCLAIR_PUNCH_TWEAKS,
        ctaColor: '#F5C542',     // CTA jaune (texte noir auto) — signature lpt-v2-mj
        punch: punch !== undefined ? punch : 'jaune',
        monoLabels: monoLabels !== undefined ? monoLabels : false,
      }}
    />
  );
};

// ── 7. Caramel Éditorial (basé sur lpt-v2-marron1.html / Claude) ────
// Reprend l'identité chromatique du fichier de Claude : caramel #9C5A2C
// en accent fort + variante très pâle #F2E4D4 pour les sections
// "respiration", lead magnet sur fond noir pour contraste final. Header
// blanc forcé (proche du cream de Claude). Plus rythmé que Cacao : 7
// sections enchaînent crème → blanc → accent-lt → blanc → noir au lieu
// d'une alternance binaire.
const PaletteLaunchMarronClaude = ({ tweaks = {} }) => (
  <HomeCabinetHybrid
    {...SHARED_LAUNCH}
    tweaks={{
      ...tweaks,
      accent: '#9C5A2C',           // caramel — Hi/Eyebrow blanc auto (lum < 0.5)
      ctaColor: '#1A1714',         // noir — CTA primary
      navWhite: true,              // header sur fond clair (proche du cream de Claude)
      bgReconnais: '#F8F4EB',      // crème
      bgManifeste: '#FFFFFF',
      bgParcours: '#FFFFFF',       // blanc pur
      bgGuy: '#F8F4EB',            // crème
      bgContent: '#FFFFFF',        // blanc pur
      bgTemoignages: '#F2E4D4',    // pâle accent — distinctif Claude
      bgBilan: '#9C5A2C',          // caramel plein, texte blanc
      bgLeadmagnet: '#1A1714',     // NOIR — contraste final fort
    }}
  />
);

// ── 8. AJUSTEMENTS FINAUX — 3 finalistes côte à côte ───────────────────────
// Les 3 directions retenues, caramel clair #9C5A2C en couleur PRINCIPALE pour
// les trois : MIX CLAIR + Vert · MIX CLAIR + Jaune · Caramel Éditorial. Deux
// tweaks globaux pilotent les réglages finaux simultanément sur les trois :
//   • launchHeader : 'auto' (défaut propre à chaque version) | 'noir' | 'blanc'
//   • launchCta    : 'auto' (signature de chaque version) | 'caramel' | 'jaune' | 'noir'
// 'auto' conserve la signature de chaque finaliste (Vert→CTA noir/header noir,
// Jaune→CTA jaune/header noir, Caramel→CTA noir/header blanc) pour comparer
// les directions ; choisir une valeur explicite aligne les trois maquettes.
const LAUNCH_CTA_HEX = { caramel: '#9C5A2C', jaune: '#F5C542', noir: '#1A1714' };

// Résout header (navWhite) + couleur CTA depuis les tweaks globaux, avec
// repli sur la signature de chaque finaliste quand le tweak vaut 'auto'.
function resolveFinalChrome(tweaks, defaults) {
  const h = tweaks.launchHeader;
  const navWhite = h === 'blanc' ? true : h === 'noir' ? false : defaults.navWhite;
  const ctaColor = LAUNCH_CTA_HEX[tweaks.launchCta] || defaults.ctaColor;
  return { navWhite, ctaColor };
}

const CARAMEL_EDITO_TWEAKS = {
  accent: '#9C5A2C',           // caramel clair — couleur PRINCIPALE
  bgReconnais: '#F8F4EB',      // crème
  bgManifeste: '#FFFFFF',
  bgParcours: '#FFFFFF',
  bgGuy: '#F8F4EB',
  bgContent: '#FFFFFF',
  bgTemoignages: '#F2E4D4',    // pâle accent — distinctif Claude
  bgBilan: '#9C5A2C',          // caramel plein, texte blanc
  bgLeadmagnet: '#1A1714',     // NOIR — contraste final fort
};

// 8a — Finaliste MIX CLAIR + Vert tech
const PaletteFinalVert = ({ tweaks = {} }) => {
  const { punch, monoLabels, launchHeader, launchCta, ...rest } = tweaks;
  const chrome = resolveFinalChrome(tweaks, { navWhite: false, ctaColor: '#1A1714' });
  return (
    <HomeCabinetHybrid
      {...SHARED_LAUNCH}
      {...MIXCLAIR_PUNCH_BASE}
      tweaks={{
        ...rest,
        ...MIXCLAIR_PUNCH_TWEAKS,
        ...chrome,
        punch: punch !== undefined ? punch : 'vert',
        monoLabels: monoLabels !== undefined ? monoLabels : true,
      }}
    />
  );
};

// 8b — Finaliste MIX CLAIR + Jaune
const PaletteFinalJaune = ({ tweaks = {} }) => {
  const { punch, monoLabels, launchHeader, launchCta, ...rest } = tweaks;
  const chrome = resolveFinalChrome(tweaks, { navWhite: false, ctaColor: '#F5C542' });
  return (
    <HomeCabinetHybrid
      {...SHARED_LAUNCH}
      {...MIXCLAIR_PUNCH_BASE}
      tweaks={{
        ...rest,
        ...MIXCLAIR_PUNCH_TWEAKS,
        ...chrome,
        punch: punch !== undefined ? punch : 'jaune',
        monoLabels: monoLabels !== undefined ? monoLabels : false,
      }}
    />
  );
};

// 8c — Finaliste Caramel Éditorial (basé sur lpt-v2-marron1)
const PaletteFinalCaramel = ({ tweaks = {} }) => {
  const { launchHeader, launchCta, ...rest } = tweaks;
  const chrome = resolveFinalChrome(tweaks, { navWhite: true, ctaColor: '#1A1714' });
  return (
    <HomeCabinetHybrid
      {...SHARED_LAUNCH}
      tweaks={{
        ...rest,
        ...CARAMEL_EDITO_TWEAKS,
        ...chrome,
      }}
    />
  );
};

// 8d — Finaliste MIX CLAIR + Vert « MJ » (← lpt-v2-mj-final)
// Reprend MIX CLAIR + Vert (caramel clair #9C5A2C, punch vert, micro-copie
// mono) mais applique le chrome de lpt-v2-mj-final via le flag `mjVert` :
//   • Header crème + bordure noire + CTA jaune
//   • Bilan : CTA « Commencer mon bilan » jaune, point vert + « En ligne »
//     blanc, bouton « Envoyer » noir
//   • Lead magnet (« Le guide des métiers… ») sur fond blanc, bouton caramel
// Le hero garde son CTA primaire noir (comme lpt-v2-mj-final).
const PaletteFinalVertMJ = ({ tweaks = {} }) => {
  const { punch, monoLabels, ...rest } = tweaks;
  return (
    <HomeCabinetHybrid
      {...SHARED_LAUNCH}
      {...MIXCLAIR_PUNCH_BASE}
      tweaks={{
        ...rest,
        ...MIXCLAIR_PUNCH_TWEAKS,
        ctaColor: '#1A1714',     // hero primary noir (comme lpt-v2-mj-final)
        bgLeadmagnet: '#FFFFFF', // lead magnet sur fond blanc
        mjVert: true,            // chrome mj : header crème + CTA jaune · bilan jaune/blanc/noir · bouton guide caramel
        punch: punch !== undefined ? punch : 'vert',
        monoLabels: monoLabels !== undefined ? monoLabels : true,
      }}
    />
  );
};

// 8e — Finaliste MIX CLAIR + Vert « MJ » v2 (← lpt-v2-mj-final, titres caramel)
// Identique à 8d (header crème + CTA jaune · bilan jaune/blanc/noir · guide
// fond blanc + bouton caramel) mais avec `caramelHeads` : les mots accentués
// des titres de section (« ressemblent au tien », « tu fais la passe »,
// « est passé ») passent en caramel gras non-souligné, et le sous-titre
// « en X minutes » du Bilan perd son italique.
const PaletteFinalVertMJ2 = ({ tweaks = {} }) => {
  const { punch, monoLabels, ...rest } = tweaks;
  return (
    <HomeCabinetHybrid
      {...SHARED_LAUNCH}
      {...MIXCLAIR_PUNCH_BASE}
      tweaks={{
        ...rest,
        ...MIXCLAIR_PUNCH_TWEAKS,
        ctaColor: '#1A1714',
        bgLeadmagnet: '#FFFFFF',
        mjVert: true,
        caramelHeads: true,      // titres caramel gras, sans surlignage · bilan sans italique
        punch: punch !== undefined ? punch : 'vert',
        monoLabels: monoLabels !== undefined ? monoLabels : true,
      }}
    />
  );
};

// 8f — Finaliste MIX CLAIR + Vert « MJ » v3 (← lpt-v2-mj-final · 3 étapes pour passer)
// Reprend v2 (caramelHeads, mjVert chrome) mais :
//   • Parcours = 'trois-etapes' : « 3 étapes pour passer », cartes blanches,
//     numéros caramel serif, checks caramel (≈ image fournie)
//   • S'informer. Agir. (content) déplacé juste avant le Bilan
// Tweak `blockOrder3` : preset nommé pour changer l'ordre des blocs.
const BLOCK_ORDERS_VJM3 = {
  default: ['reconnais', 'manifeste', 'parcours', 'guy', 'temoignages', 'content', 'bilan', 'leadmagnet'],
  sinformer_haut: ['reconnais', 'manifeste', 'content', 'parcours', 'guy', 'temoignages', 'bilan', 'leadmagnet'],
  sinformer_milieu: ['reconnais', 'manifeste', 'parcours', 'guy', 'content', 'temoignages', 'bilan', 'leadmagnet'],
};

const PaletteFinalVertMJ3 = ({ tweaks = {} }) => {
  const { punch, monoLabels, blockOrder3, ...rest } = tweaks;
  const sectionOrder = BLOCK_ORDERS_VJM3[blockOrder3] || BLOCK_ORDERS_VJM3.default;
  return (
    <HomeCabinetHybrid
      {...SHARED_LAUNCH}
      {...MIXCLAIR_PUNCH_BASE}
      parcoursVariant="trois-etapes"
      sectionOrder={sectionOrder}
      tweaks={{
        ...rest,
        ...MIXCLAIR_PUNCH_TWEAKS,
        ctaColor: '#1A1714',
        bgLeadmagnet: '#FFFFFF',
        mjVert: true,
        caramelHeads: true,
        punch: punch !== undefined ? punch : 'vert',
        monoLabels: monoLabels !== undefined ? monoLabels : true,
      }}
    />
  );
};

// 8g — Finaliste MIX CLAIR + Vert « MJ » v4 (← lpt-v2-mj-final, version travaillée)
// Repart de v2 (mjVert chrome + caramelHeads) et applique les ajustements :
//   • Reconnais (freins) : titre « Tu te poses la même question ? » (freinsTitle)
//   • Parcours : « 3 étapes pour passer » rendu dans le DESIGN de « Comment
//     tu fais la passe » (trois-etapes-grid), placé entre le guide et Guy
//   • S'informer. Agir. (content) déplacé SOUS le Bilan
//   • Guy (stats) : ajout du CTA « Faire mon diagnostic gratuit » (guyCta)
//   • Bloc Guy ↔ Lead magnet (guide) : positions inversées
//   • Bloc « Des parcours qui ressemblent au tien » (temoignages) ↔ « 3 étapes
//     pour passer » (parcours) : positions inversées
//   • Nouveau bloc Newsletter sombre (2×/semaine) juste avant le footer
const ORDER_VJM4 = ['reconnais', 'bilan', 'content', 'parcours', 'leadmagnet', 'temoignages', 'guy', 'newsletter'];

const PaletteFinalVertMJ4 = ({ tweaks = {} }) => {
  const { punch, monoLabels, ...rest } = tweaks;
  return (
    <HomeCabinetHybrid
      {...SHARED_LAUNCH}
      {...MIXCLAIR_PUNCH_BASE}
      parcoursVariant="trois-etapes-grid"
      sectionOrder={ORDER_VJM4}
      tweaks={{
        ...rest,
        ...MIXCLAIR_PUNCH_TWEAKS,
        ctaColor: '#1A1714',
        bgLeadmagnet: '#FFFFFF',
        mjVert: true,
        caramelHeads: true,
        freinsTitle: 'poses',     // « Tu te poses la même question ? »
        guyCta: true,             // CTA « Faire mon diagnostic gratuit » dans le bloc Guy
        punch: punch !== undefined ? punch : 'vert',
        monoLabels: monoLabels !== undefined ? monoLabels : true,
      }}
    />
  );
};

Object.assign(window, {
  PaletteLaunchCacao,
  PaletteLaunchBordeaux,
  PaletteLaunchSauge,
  PaletteLaunchForet,
  PaletteLaunchViolet,
  PaletteLaunchMarron,
  PaletteLaunchMarronMix,
  PaletteLaunchMarronMixClair,
  PaletteLaunchCacaoVert,
  PaletteLaunchCacaoJaune,
  PaletteLaunchMixClairVert,
  PaletteLaunchMixClairJaune,
  PaletteLaunchMarronClaude,
  PaletteFinalVert,
  PaletteFinalJaune,
  PaletteFinalCaramel,
  PaletteFinalVertMJ,
  PaletteFinalVertMJ2,
  PaletteFinalVertMJ3,
  PaletteFinalVertMJ4,
});
