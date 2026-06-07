/* eslint-disable */
// HomeCabinetWarm — variant aérée + jaune signature
// Hybride entre Light (crème/beige, blanc, italiques Instrument Serif, espace)
// et Dense (jaune saturé en accent). Différences vs Light :
//   • Hi devient un highlighter (italique serif sur fond jaune transparent)
//   • BilanCTA récupère sa bande jaune pleine (comme Dense)
//   • Cards Parcours et Témoignages reçoivent un border-top jaune signature
//   • Eyebrow par défaut passe en jaune saturé (bg accent · text ink)

// Palette dérivée pour chaque accent : `deep` pour texte/icônes/borders
// sur fond clair, `soft` pour bg de pills/eyebrows. Permet à un seul tweak
// (couleur d'accent) de retinter toute la maquette claire de manière cohérente.
const ACCENT_PALETTES = {
  '#F5C542': { deep: '#8A6307', soft: '#FFF3C7' }, // jaune soleil
  '#E0AC2B': { deep: '#7C5A08', soft: '#FBEFC9' }, // ocre chaud
  '#7E9F6E': { deep: '#3D5230', soft: '#E7EFE0' }, // vert sauge
  '#A04141': { deep: '#5E1E1E', soft: '#F2DEDE' }, // cassis / bordeaux
  '#1E4D3A': { deep: '#0F2A20', soft: '#DCE9E2' }, // vert foncé / forêt
  '#6B4D8C': { deep: '#3D2A5C', soft: '#EDE4F5' }, // violet profond
  '#9C5A2C': { deep: '#5C2E10', soft: '#F2E2CC' }, // cacao caramel
  '#7C5A2A': { deep: '#4A350F', soft: '#EDDFC2' }, // moka / marron profond
};
const accentPalette = (hex) => ACCENT_PALETTES[hex] || ACCENT_PALETTES['#E0AC2B'];

// Luminance-aware text picker — when the accent is dark (bordeaux, vert
// foncé, violet, cacao), text laid ON TOP of the accent (Hi highlight bg,
// Eyebrow chip bg) must flip to white to stay readable.
const luminance = (hex) => {
  const h = (hex || '').replace('#', '');
  if (h.length !== 6) return 1;
  const r = parseInt(h.substr(0, 2), 16);
  const g = parseInt(h.substr(2, 2), 16);
  const b = parseInt(h.substr(4, 2), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
};
const textOnAccent = (hex, inkColor = '#2A2520', invertedColor = '#FAF7F3') =>
  luminance(hex) < 0.5 ? invertedColor : inkColor;

// chrome: 'full' (default — render Nav + Hero + sections + Footer)
//         'none'  (hybrid mode — render only sections + Footer; the parent
//                   provides its own Nav/Hero)
// sectionOrder: array of section keys controlling render order.
// Launch-ready overrides (Claude feedback v2):
//   reconnaisVariant: 'cards' (default) | 'list' — text-only editorial list
//   guyVariant:        'card'  (default) | 'text' — no photo, text block
//   parcoursVariant:   'default' (Trois étapes à ton rythme) | 'lapassetech'
//                                (vocabulaire propriétaire "Tu t'informes/identifies/franchis")
//   bilanDuration:     10 (default) | 5
//   temoignageVariant: 'grid' (default 3) | 'single' (1 featured + slot CTA)
const HomeCabinetWarm = ({
  tweaks = {},
  chrome = 'full',
  sectionOrder,
  reconnaisVariant = 'cards',
  guyVariant = 'card',
  parcoursVariant = 'default',
  bilanDuration = 10,
  bilanVariant = 'default',
  temoignageVariant = 'grid',
  contentVariant = 'default',
}) => {
  const C = window.LPT_CONTENT;
  const show = (k) => tweaks[`show_${k}`] !== false;
  const ap = accentPalette(tweaks.accent || '#E0AC2B');

  // Typo tweaks — heading/body font swap.
  const HEADING_FONTS = {
    cabinet: '"Cabinet Grotesk", "Bricolage Grotesque", system-ui, sans-serif',
    bricolage: '"Bricolage Grotesque", "Cabinet Grotesk", system-ui, sans-serif',
    fraunces: '"Fraunces", "Cormorant Garamond", Georgia, serif',
    plus: '"Plus Jakarta Sans", system-ui, sans-serif',
  };
  const BODY_FONTS = {
    dm: '"DM Sans", system-ui, sans-serif',
    manrope: '"Manrope", system-ui, sans-serif',
    geist: '"Geist", system-ui, sans-serif',
    inter: 'system-ui, sans-serif',
  };
  const fd = HEADING_FONTS[tweaks.fontHeading] || HEADING_FONTS.cabinet;
  const fb = BODY_FONTS[tweaks.fontBody] || BODY_FONTS.dm;

  // CTA + section background tweaks.
  const ctaBg = tweaks.ctaColor || '#2A2520';
  // Auto-pick readable label color for the CTA (dark text on light bg, vice versa)
  const ctaFg = (() => {
    const hex = ctaBg.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return lum > 0.6 ? '#2A2520' : '#FAF7F3';
  })();

  // Tweak `sectionTextColor` : force la couleur de texte des sections (corps
  // de page rendu par ce composant) en noir ou en blanc. 'noir' (défaut) garde
  // l'encre chaude #2A2520 ; 'blanc' bascule tous les tons de texte en blanc
  // (utile quand les fonds de section sont colorés / foncés).
  const stc = tweaks.sectionTextColor;
  const whiteText = stc === 'blanc' || stc === 'white';
  const c = {
    accent: tweaks.accent || '#E0AC2B',   // accent vif — pour les "marks" et logos
    accentDeep: ap.deep,                   // texte/borders sur fond clair
    accentSoft: ap.soft,                   // background pour les pills/eyebrows
    ink: whiteText ? '#FFFFFF' : '#2A2520',
    inkSoft: whiteText ? 'rgba(255,255,255,.86)' : '#3D362F',
    paper: '#FFFFFF',
    cream: '#F8F4EB',
    beige: '#EFE6D2',
    beigeDeep: '#E5D8B8',
    gray: whiteText ? 'rgba(255,255,255,.74)' : '#6B655D',
    grayLt: whiteText ? 'rgba(255,255,255,.56)' : '#9A9388',
    grayLight: whiteText ? 'rgba(255,255,255,.42)' : '#B5AE9F',
    border: whiteText ? 'rgba(255,255,255,.22)' : '#E5DDC9',
    borderSoft: whiteText ? 'rgba(255,255,255,.16)' : '#EFE9D9',
    borderDark: 'rgba(255,255,255,.1)',
    fd,
    fb,
    fs: '"Instrument Serif", "Cormorant Garamond", serif',
    ctaBg,
    ctaFg,
    // Section background tweaks — let the user retint specific zones
    bgReconnais: tweaks.bgReconnais || '#FFFFFF',
    bgManifeste: tweaks.bgManifeste || '#FFFFFF',
    bgParcours: tweaks.bgParcours || '#F8F4EB',
    bgGuy: tweaks.bgGuy || '#FFFFFF',
    bgContent: tweaks.bgContent || '#FFFFFF',
    bgTemoignages: tweaks.bgTemoignages || '#EFE6D2',
    bgBilan: tweaks.bgBilan || (tweaks.accent || '#E0AC2B'),
    bgLeadmagnet: tweaks.bgLeadmagnet || '#EFE6D2',
  };

  // ── Punch — accent tech secondaire (vert électrique ou jaune) ──────────
  // Le cacao/caramel n'évoque pas la tech ; on injecte un 2ᵉ accent vif,
  // utilisé avec parcimonie (~5 %) sur les signaux « tech » : points de statut
  // « en ligne », flèches d'action, étape active du parcours, badges « vers ».
  // `punch` = '' / 'none' → désactivé (mono-accent cacao pur).
  const PUNCH_PALETTES = {
    vert: { base: '#16B877', soft: 'rgba(22,184,119,.12)', line: 'rgba(22,184,119,.32)', deep: '#0E7A4D' },
    jaune: { base: '#F5C542', soft: 'rgba(245,197,66,.16)', line: 'rgba(245,197,66,.45)', deep: '#8A6307' },
  };
  const punchKey = tweaks.punch && tweaks.punch !== 'none' ? tweaks.punch : null;
  const pp = punchKey ? (PUNCH_PALETTES[punchKey] || PUNCH_PALETTES.vert) : null;
  c.punch = pp ? pp.base : c.accentDeep;          // fallback : cacao foncé si pas de punch
  c.punchSoft = pp ? pp.soft : c.accentSoft;
  c.punchLine = pp ? pp.line : c.border;
  c.punchDeep = pp ? pp.deep : c.accentDeep;
  c.hasPunch = !!pp;
  // Texte lisible posé SUR le punch (jaune → encre foncée ; vert → blanc)
  c.punchInk = pp ? textOnAccent(pp.base, '#1A1714', '#FFFFFF') : c.ctaFg;

  // Mono « tech » — micro-copie en JetBrains Mono quand le tweak est actif.
  c.fm = '"JetBrains Mono", "Space Grotesk", ui-monospace, monospace';
  const monoLabels = !!tweaks.monoLabels;

  // Chrome « mj-vert » (inspiré de lpt-v2-mj-final) : CTA « Commencer mon
  // bilan » jaune, texte « En ligne » blanc, bouton « Envoyer » noir, et bouton
  // du lead magnet en caramel sur fond blanc. Scopé à la version finaliste.
  const mjVert = !!tweaks.mjVert;

  // `caramelHeads` (inspiré de lpt-v2-mj-final) : les mots accentués des titres
  // de section (« ressemblent au tien », « tu fais la passe », « est passé »)
  // ne sont plus surlignés mais rendus en caramel #9C5A2C, gras, non-italique ;
  // et le sous-titre « en X minutes » du Bilan perd son italique.
  const caramelHeads = !!tweaks.caramelHeads;

  // Highlighter italique : italique serif posé sur un brush jaune (faux
  // surligneur marker). Combine la grammaire éditoriale du Light avec l'éclat
  // du jaune du Dense. Le `color` prop (utilisé sur les logos Nav/Footer)
  // bascule sur un italique simple sans surbrillance.
  // Quand l'accent est foncé (bordeaux/vert foncé/violet/cacao), le texte
  // bascule en blanc pour rester lisible sur le brush.
  // Tweak `hiWhite` : force le blanc même sur accent clair (utile sauge, jaune…)
  const hiTextColor = tweaks.hiWhite
    ? c.cream
    : textOnAccent(c.accent, c.ink, c.cream);
  const Hi = ({ children, color, plain = false }) => {
    if (plain || color) {
      return (
        <em
          style={{
            fontFamily: c.fs,
            fontStyle: 'italic',
            fontWeight: 400,
            color: color || c.accentDeep,
            letterSpacing: '0.005em',
            fontSize: '1.04em',
          }}
        >
          {children}
        </em>
      );
    }
    return (
      <em
        style={{
          fontFamily: c.fs,
          fontStyle: 'italic',
          fontWeight: 400,
          color: hiTextColor,
          letterSpacing: '0.005em',
          fontSize: '1.04em',
          // Highlighter effect — yellow brush behind the italic. Use a
          // background gradient to keep the highlight at ~70% of the cap-height
          // (like a real marker pen).
          background: `linear-gradient(180deg, transparent 0 18%, ${c.accent} 18% 92%, transparent 92% 100%)`,
          padding: '0 6px',
          margin: '0 -2px',
          WebkitBoxDecorationBreak: 'clone',
          boxDecorationBreak: 'clone',
        }}
      >
        {children}
      </em>
    );
  };

  // HeadEm — mot accentué d'un titre de section. Par défaut = surligneur <Hi>.
  // Quand `caramelHeads` est actif (finaliste mj-vert2) : caramel #9C5A2C, gras,
  // non-italique, sans surlignage (cf. lpt-v2-mj-final).
  const HeadEm = ({ children }) =>
    caramelHeads ? (
      <em style={{ fontFamily: c.fd, fontStyle: 'normal', fontWeight: 800, color: c.accent }}>{children}</em>
    ) : (
      <Hi>{children}</Hi>
    );

  // Content reused from the dense variant (3 articles featured in hero)
  const featured = [
    { n: '01', cat: 'Reconversion', t: '16 ans en marketing : comment j’ai basculé dans la tech à 40 ans', meta: '7 min · 4 mars 2026 · Témoignage' },
    { n: '02', cat: 'Financement', t: 'POEI, CPF, Transitions Pro : lequel choisir pour ta reconversion ?', meta: '6 min · CPF · Guide' },
    { n: '03', cat: 'Métiers du digital', t: 'Business Analyst Salesforce : le métier que personne ne t’a expliqué', meta: '8 min · Fiche métier' },
  ];
  const articles = [
    { n: '01', cat: 'Reconversion', t: '16 ans en marketing : comment j’ai basculé dans la tech à 40 ans (sans réseau et sans diplôme informatique)', meta: '7 min · 4 mars 2026' },
    { n: '02', cat: 'Financement', t: 'POEI, CPF, Transitions Pro : lequel choisir pour ta reconversion ?', meta: '6 min · CPF' },
    { n: '03', cat: 'Métiers du digital', t: 'Business Analyst Salesforce : le métier que personne ne t’a expliqué', meta: '8 min · Salesforce' },
    { n: '04', cat: 'Droit du travail', t: 'Rupture conventionnelle : ce que tu peux vraiment négocier', meta: '9 min · Droit' },
    { n: '05', cat: 'Reconversion', t: 'Reconversion à 35 ans : par où commencer quand on part de zéro ?', meta: '5 min · Guide' },
  ];
  const personas = [
    { n: '01', t: 'En poste mais épuisé', d: 'Tu bosses depuis des années dans un métier qui ne te correspond plus. Tu veux changer mais tu ne sais pas par où commencer dans la tech.', cta: 'Commence par le bilan', featured: true },
    { n: '02', t: 'En recherche d’emploi', d: 'Tu es entre deux jobs. Le digital attire mais semble inaccessible sans formation ni contacts dans le secteur.', cta: 'Explore les ressources' },
    { n: '03', t: 'Curieux du digital', d: 'Tu entends parler de Salesforce, data, no-code. Tu veux comprendre concrètement ce que c’est — sans jargon ni préjugé.', cta: 'Lis les articles' },
    { n: '04', t: 'CPF mais perdu', d: 'Tu as des droits formation mais tu ne sais pas comment les utiliser ni quelle formation choisir pour vraiment trouver du travail.', cta: 'Guide financement' },
  ];
  const ressources = [
    { tag: 'Outils IA · Débutant · 15 min', t: 'Utiliser Gemini pour booster ta recherche d’emploi', sub: '5 étapes concrètes avec prompts prêts à l’emploi', chips: ['YouTube', 'Guide PDF'] },
    { tag: 'Financement · Débutant · 20 min', t: 'Faire sa demande CPF en 20 minutes chrono', sub: 'Étape par étape, de la connexion à la validation', chips: ['Guide PDF'] },
    { tag: 'Compétences · Intermédiaire · 30 min', t: 'Créer son premier dashboard no-code avec Notion', sub: 'Outil de suivi de candidatures prêt à l’emploi', chips: ['YouTube', 'Template'] },
  ];

  // Eyebrow plus saturé : full yellow on light bg, full yellow on dark bg too.
  // Reprend le jaune éclatant du Dense plutôt que le pastel du Light.
  // Auto-flip text color when accent is dark (so bordeaux/vert foncé/violet
  // chips show white text instead of invisible black).
  // Le tweak `hiWhite` force le blanc même sur accent clair.
  const eyebrowTextColor = tweaks.hiWhite
    ? c.cream
    : textOnAccent(c.accent, c.ink, c.cream);
  const Eyebrow = ({ children, onDark = false }) => (
    <span
      style={{
        fontFamily: monoLabels ? c.fm : c.fb,
        fontSize: monoLabels ? 10.5 : 11,
        fontWeight: monoLabels ? 500 : 700,
        letterSpacing: monoLabels ? '0.04em' : '0.16em',
        textTransform: monoLabels ? 'lowercase' : 'uppercase',
        color: eyebrowTextColor,
        background: c.accent,
        display: 'inline-block',
        padding: monoLabels ? '4px 10px' : '5px 11px',
        borderRadius: 3,
        marginBottom: 16,
      }}
    >
      {monoLabels ? <span style={{ opacity: 0.7 }}>{'// '}</span> : null}
      {children}
    </span>
  );

  // ── Nav (charcoal, slim) ──
  const Nav = () => (
    <nav
      style={{
        background: c.ink,
        padding: '0 56px',
        height: 64,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <a style={{ fontFamily: c.fd, fontWeight: 800, fontSize: 19, letterSpacing: '-0.02em', color: '#fff', textDecoration: 'none' }}>
        LaPasse<Hi color={c.accent}>Tech</Hi>
      </a>
      <ul style={{ display: 'flex', gap: 36, listStyle: 'none', padding: 0, margin: 0 }}>
        {['S’informer', 'Passer à l’action', 'Le bilan', 'À propos'].map((x) => (
          <li key={x}>
            <a style={{ fontFamily: c.fb, fontSize: 14, color: c.grayLight, textDecoration: 'none' }}>{x}</a>
          </li>
        ))}
      </ul>
      <a
        style={{
          background: c.cream,
          color: c.ink,
          fontFamily: c.fb,
          fontSize: 14,
          fontWeight: 700,
          padding: '9px 20px',
          borderRadius: 999,
          textDecoration: 'none',
          border: `1px solid ${c.cream}`,
        }}
      >
        Faire mon bilan →
      </a>
    </nav>
  );

  // ── Hero — white left + cream right, image card with caption ──
  const Hero = () => (
    <section style={{ background: c.paper, display: 'grid', gridTemplateColumns: '1.1fr 1fr', borderBottom: `1px solid ${c.border}` }}>
      <div style={{ padding: '72px 64px 60px', borderRight: `1px solid ${c.border}` }}>
        <div
          style={{
            fontFamily: c.fb,
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: c.grayLt,
            marginBottom: 26,
          }}
        >
          Reconversion sans bullshit · Mai 2026
        </div>
        <h1
          style={{
            fontFamily: c.fd,
            fontWeight: 800,
            fontSize: 56,
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            color: c.ink,
            margin: 0,
          }}
        >
          Le digital, c’est pas{' '}
          <Hi>réservé aux autres.</Hi>
        </h1>
        <p
          style={{
            fontFamily: c.fb,
            fontSize: 17,
            color: c.gray,
            lineHeight: 1.65,
            maxWidth: 480,
            marginTop: 26,
            marginBottom: 32,
          }}
        >
          Métiers, formations, financements — tout ce que j’aurais aimé savoir avant de me reconvertir.{' '}
          <strong style={{ color: c.ink, fontWeight: 600 }}>Par quelqu’un qui l’a vraiment vécu.</strong>
        </p>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 32 }}>
          <a
            style={{
              background: c.ctaBg,
              color: c.ctaFg,
              fontFamily: c.fb,
              fontSize: 14,
              fontWeight: 600,
              padding: '14px 24px',
              borderRadius: 6,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 9,
            }}
          >
            Faire mon diagnostic gratuit <span style={{ color: c.hasPunch ? c.punch : c.ctaFg, fontWeight: 800 }}>→</span>
          </a>
          <a
            style={{
              fontFamily: c.fb,
              fontSize: 14,
              color: c.ink,
              border: `1.5px solid ${c.ink}`,
              padding: '13px 24px',
              borderRadius: 6,
              textDecoration: 'none',
              fontWeight: 500,
              background: 'transparent',
            }}
          >
            Guide gratuit · 20 pages
          </a>
        </div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {[
            ['5 min', '· 100% gratuit'],
            ['CPF', 'financé à 100%'],
            ['POEI', '· CDI avant la formation'],
          ].map(([b, l]) => (
            <span
              key={b}
              style={{
                fontFamily: c.fb,
                fontSize: 12,
                color: c.gray,
                background: c.cream,
                padding: '7px 13px',
                borderRadius: 20,
              }}
            >
              <b style={{ color: c.ink, fontWeight: 600 }}>{b}</b> {l}
            </span>
          ))}
        </div>
      </div>

      {/* RIGHT — image + articles list on cream */}
      <div style={{ display: 'flex', flexDirection: 'column', background: c.cream }}>
        <div
          style={{
            height: 240,
            position: 'relative',
            overflow: 'hidden',
            borderBottom: `1px solid ${c.border}`,
            background: c.beige,
            margin: 24,
            marginBottom: 0,
            borderRadius: 6,
          }}
        >
          <img
            src={C.images.guy}
            alt="Guy — fondateur"
            loading="eager"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'saturate(0.85) contrast(1.02)' }}
          />
          <div
            style={{
              position: 'absolute',
              left: 16,
              bottom: 16,
              background: c.paper,
              padding: '8px 14px',
              borderRadius: 4,
              fontFamily: c.fb,
              fontSize: 12,
              border: `1px solid ${c.border}`,
            }}
          >
            <span style={{ color: c.gray }}>Guy · </span>
            <span style={{ color: c.ink, fontWeight: 600 }}>16 ans marketing → Business Analyst Salesforce</span>
          </div>
          <div
            style={{
              position: 'absolute',
              top: 16,
              right: 16,
              background: c.paper,
              color: c.ink,
              padding: '6px 12px',
              borderRadius: 3,
              fontFamily: c.fb,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              border: `1px solid ${c.border}`,
            }}
          >
            Le fondateur
          </div>
        </div>

        <div
          style={{
            fontFamily: c.fb,
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: c.grayLt,
            padding: '20px 36px 14px',
          }}
        >
          À lire maintenant
        </div>
        <div style={{ borderTop: `1px solid ${c.borderSoft}` }}>
          {featured.map((a) => (
            <a
              key={a.n}
              style={{
                display: 'flex',
                gap: 20,
                alignItems: 'flex-start',
                padding: '20px 36px',
                borderBottom: `1px solid ${c.borderSoft}`,
                textDecoration: 'none',
              }}
            >
              <span
                style={{
                  fontFamily: c.fs,
                  fontStyle: 'italic',
                  fontWeight: 400,
                  fontSize: 30,
                  color: c.accentDeep,
                  minWidth: 30,
                  lineHeight: 1,
                }}
              >
                {a.n}
              </span>
              <div>
                <div style={{ fontFamily: c.fb, fontSize: 10, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: c.grayLt, marginBottom: 4 }}>
                  {a.cat}
                </div>
                <div style={{ fontFamily: c.fd, fontWeight: 700, fontSize: 15, color: c.ink, lineHeight: 1.35, marginBottom: 5 }}>
                  {a.t}
                </div>
                <div style={{ fontFamily: c.fb, fontSize: 11, color: c.grayLt }}>{a.meta}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );

  // List variant: 4 statements in pure text, no cards, no icons.
  // Emphasis on the "pain" via Instrument Serif italic in accent color.
  const reconnaisListItems = [
    { lead: 'Tu bosses depuis 10 ans dans un métier qui', em: 't’épuise.' },
    { lead: 'Tu entends parler de reconversion mais tu ne sais', em: 'pas si c’est pour toi.' },
    { lead: 'Tu veux changer mais le digital te semble', em: 'réservé à d’autres.' },
    { lead: 'Tu as des droits CPF mais tu ne sais', em: 'qu’en faire.' },
  ];

  // ── Tu te reconnais ici ? — beige featured card ──
  const Reconnais = () => {
    // 'pixar-freins' variant — delegate to the standalone block from
    // block-explorations. Used by palette-launch wrappers so the validated
    // E3 Pixar block ships inside the full launch page.
    if (reconnaisVariant === 'pixar-freins' && window.ReconnaisPixarFreins) {
      return (
        <div style={{ background: c.bgReconnais, borderBottom: `1px solid ${c.border}` }}>
          <window.ReconnaisPixarFreins tweaks={{ ...tweaks, bgReconnais: c.bgReconnais }} />
        </div>
      );
    }
    return (
    <section style={{ background: c.bgReconnais, borderBottom: `1px solid ${c.border}` }}>
      <div style={{ padding: '72px 64px 32px' }}>
        <Eyebrow>Pour qui</Eyebrow>
        <h2
          style={{
            fontFamily: c.fd,
            fontWeight: 800,
            fontSize: 44,
            letterSpacing: '-0.025em',
            lineHeight: 1.05,
            color: c.ink,
            margin: 0,
            marginBottom: 14,
          }}
        >
          Tu te reconnais <Hi>ici&nbsp;?</Hi>
        </h2>
        <p style={{ fontFamily: c.fb, fontSize: 15, color: c.gray, lineHeight: 1.65, maxWidth: 560, margin: 0 }}>
          {reconnaisVariant === 'list'
            ? 'LaPasseTech parle à celles et ceux qui voient le digital de loin et veulent y entrer — sans qu’on leur fasse la courte échelle.'
            : 'LaPasseTech s’adresse à celles et ceux qui voient le digital de loin et veulent y entrer — sans que personne ne leur fasse la courte échelle.'}
        </p>
      </div>

      {reconnaisVariant === 'list' ? (
        // Pure-text editorial list. No cards. No icons. Heavy whitespace, italic
        // emphasis on the pain point lifts the line without decoration.
        <div style={{ padding: '0 64px 80px', maxWidth: 980 }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {reconnaisListItems.map((it, i) => (
              <li
                key={i}
                style={{
                  padding: '28px 0 30px',
                  borderTop: `1px solid ${c.border}`,
                  borderBottom: i === reconnaisListItems.length - 1 ? `1px solid ${c.border}` : 'none',
                  fontFamily: c.fd,
                  fontWeight: 600,
                  fontSize: 26,
                  lineHeight: 1.32,
                  letterSpacing: '-0.015em',
                  color: c.ink,
                  display: 'flex',
                  gap: 28,
                  alignItems: 'baseline',
                }}
              >
                <span
                  style={{
                    fontFamily: c.fs,
                    fontStyle: 'italic',
                    fontWeight: 400,
                    fontSize: 22,
                    color: c.accentDeep,
                    minWidth: 36,
                    lineHeight: 1,
                  }}
                >
                  0{i + 1}
                </span>
                <span style={{ textWrap: 'pretty' }}>
                  {it.lead}{' '}
                  <em
                    style={{
                      fontFamily: c.fs,
                      fontStyle: 'italic',
                      fontWeight: 400,
                      color: c.accentDeep,
                      fontSize: '1.06em',
                    }}
                  >
                    {it.em}
                  </em>
                </span>
              </li>
            ))}
          </ul>
          <p style={{ fontFamily: c.fb, fontSize: 14, color: c.gray, margin: '28px 0 0', lineHeight: 1.6 }}>
            Si une seule de ces phrases résonne, tu es au bon endroit.
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderTop: `1px solid ${c.border}` }}>
          {personas.map((p, i) => (
            <a
              key={p.n}
              style={{
                padding: '32px 28px 34px',
                borderRight: i < personas.length - 1 ? `1px solid ${c.border}` : 'none',
                background: p.featured ? c.beige : c.paper,
                color: c.ink,
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: 14,
                minHeight: 300,
              }}
            >
              <div
                style={{
                  fontFamily: c.fs,
                  fontStyle: 'italic',
                  fontWeight: 400,
                  fontSize: 38,
                  color: c.accentDeep,
                  lineHeight: 1,
                }}
              >
                {p.n}
              </div>
              <div
                style={{
                  fontFamily: c.fd,
                  fontWeight: 700,
                  fontSize: 19,
                  letterSpacing: '-0.015em',
                lineHeight: 1.22,
                color: c.ink,
                marginTop: 4,
              }}
            >
              {p.t}
            </div>
            <p
              style={{
                fontFamily: c.fb,
                fontSize: 13.5,
                color: c.gray,
                lineHeight: 1.6,
                margin: 0,
                flexGrow: 1,
              }}
            >
              {p.d}
            </p>
            <div
              style={{
                fontFamily: c.fb,
                fontSize: 13,
                fontWeight: 600,
                color: c.ink,
                borderTop: `1px solid ${p.featured ? c.beigeDeep : c.border}`,
                paddingTop: 14,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span>→</span>
              <span style={{ borderBottom: `1px solid ${c.accentDeep}`, paddingBottom: 1 }}>{p.cta}</span>
            </div>
          </a>
        ))}
        </div>
      )}
    </section>
    );
  };

  // ── Manifeste ──
  const Manifeste = () => (
    <section style={{ padding: '72px 64px 0', background: c.bgManifeste, borderBottom: `1px solid ${c.border}` }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 72, alignItems: 'start' }}>
        <div>
          <Eyebrow>Le projet</Eyebrow>
          <h2 style={{ fontFamily: c.fd, fontWeight: 800, fontSize: 42, letterSpacing: '-0.025em', lineHeight: 1.05, color: c.ink, margin: 0 }}>
            Pas un blog<br />de plus. <Hi>Un hub.</Hi>
          </h2>
          <p style={{ fontFamily: c.fb, fontSize: 15, color: c.gray, lineHeight: 1.65, marginTop: 22, maxWidth: 360 }}>
            Informer, orienter, former, accompagner — pensé pour celles et ceux qui ne se croient pas concernés par le digital. Et qui ont tort.
          </p>
        </div>
        <ol style={{ listStyle: 'none', padding: 0, margin: 0, borderTop: `1px solid ${c.border}` }}>
          {C.manifeste.points.map((p) => (
            <li
              key={p.n}
              style={{
                display: 'grid',
                gridTemplateColumns: '70px 1fr',
                gap: 24,
                padding: '24px 0',
                borderBottom: `1px solid ${c.border}`,
              }}
            >
              <div
                style={{
                  fontFamily: c.fs,
                  fontStyle: 'italic',
                  fontWeight: 400,
                  fontSize: 36,
                  color: c.accentDeep,
                  lineHeight: 1,
                }}
              >
                {p.n}
              </div>
              <div>
                <h3 style={{ fontFamily: c.fd, fontWeight: 700, fontSize: 19, letterSpacing: '-0.015em', color: c.ink, margin: 0 }}>
                  {p.t}
                </h3>
                <p style={{ fontFamily: c.fb, fontSize: 14, color: c.gray, lineHeight: 1.65, margin: '6px 0 0' }}>{p.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <div style={{ height: 60 }} />
    </section>
  );

  // Parcours steps — `lapassetech` variant uses LaPasseTech's own vocabulary
  // around the brand metaphor "la passe" (the breakthrough move).
  const parcoursStepsLapassetech = [
    {
      n: 1,
      tag: 'S’informer',
      t: 'Tu t’informes sans te perdre.',
      d: 'Articles, fiches métiers, guides financement — tu comprends le digital avec tes mots, pas ceux des recruteurs LinkedIn.',
    },
    {
      n: 2,
      tag: 'S’orienter',
      t: 'Tu identifies ta passe.',
      d: 'Avec PassBot ou seul·e, tu repères les 2-3 métiers qui matchent vraiment ton profil et ton appétence. Pas 47.',
    },
    {
      n: 3,
      tag: 'S’engager',
      t: 'Tu franchis avec un plan.',
      d: 'Formation choisie, financement validé, premier poste visé — tu sais exactement quoi faire la semaine prochaine.',
    },
  ];

  // ── Parcours — beige band (NOT black) ──
  const Parcours = () => {
    const steps = parcoursVariant === 'lapassetech' || parcoursVariant === 'grid-lpt' ? parcoursStepsLapassetech : C.parcours.steps;

    // 'grid-lpt' — repris de lpt-v2-marron1 : grille 3 colonnes bordée, gros
    // numéros, footer "Finançable via" + tool-tags. Sur fond blanc.
    if (parcoursVariant === 'grid-lpt') {
      return (
        <section style={{ background: c.bgParcours, padding: '80px 64px', borderBottom: `1px solid ${c.border}` }}>
          <Eyebrow>Comment ça marche</Eyebrow>
          <h2 style={{ fontFamily: c.fd, fontWeight: 800, fontSize: 46, letterSpacing: '-0.025em', lineHeight: 1.04, color: c.ink, margin: '0 0 10px' }}>
            Comment <HeadEm>tu fais la passe.</HeadEm>
          </h2>
          <p style={{ fontFamily: c.fb, fontSize: 15, color: c.gray, lineHeight: 1.6, margin: 0, maxWidth: 520 }}>
            Trois étapes, à ton rythme.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 1,
              background: c.border,
              marginTop: 36,
              border: `1px solid ${c.border}`,
              borderRadius: 10,
              overflow: 'hidden',
            }}
          >
            {steps.map((s, i) => {
              const active = c.hasPunch && i === 1; // étape « en cours » mise en avant par le punch
              return (
              <div key={s.n} style={{ padding: '34px 30px 36px', background: c.paper, position: 'relative' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 3, background: active ? c.punch : c.accent }} />
                {monoLabels || c.hasPunch ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                    <span style={{ fontFamily: c.fm, fontSize: 10.5, color: c.grayLt }}>step_0{s.n}</span>
                    {c.hasPunch ? (
                      <span style={{ fontFamily: c.fm, fontSize: 9.5, fontWeight: 700, padding: '2px 8px', borderRadius: 3, color: active ? c.punchDeep : c.accentDeep, background: active ? c.punchSoft : c.accentSoft }}>
                        {active ? '● en cours' : 'à faire'}
                      </span>
                    ) : null}
                  </div>
                ) : null}
                <div
                  style={{
                    fontFamily: c.fd,
                    fontWeight: 800,
                    fontSize: 56,
                    color: active ? c.punchDeep : c.accent,
                    lineHeight: 1,
                    letterSpacing: '-0.03em',
                    marginBottom: 16,
                    WebkitTextStroke: !active && luminance(c.accent) > 0.55 ? `1px ${c.accentDeep}` : 'none',
                  }}
                >
                  0{s.n}
                </div>
                <h3 style={{ fontFamily: c.fd, fontWeight: 700, fontSize: 19, color: c.ink, lineHeight: 1.25, margin: '0 0 10px', letterSpacing: '-0.015em' }}>
                  {s.t}
                </h3>
                <p style={{ fontFamily: c.fb, fontSize: 14, color: c.gray, lineHeight: 1.65, margin: 0 }}>
                  {s.d}
                </p>
              </div>
              );
            })}
          </div>

          <div
            style={{
              marginTop: 28,
              paddingTop: 20,
              borderTop: `1px solid ${c.border}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 20,
              flexWrap: 'wrap',
            }}
          >
            <div style={{ fontFamily: monoLabels ? c.fm : c.fb, fontSize: 13, color: c.grayLt, fontStyle: monoLabels ? 'normal' : 'italic' }}>{monoLabels ? '// finançable via :' : 'Finançable via :'}</div>
            <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
              {C.outils.map((o) => (
                <span
                  key={o}
                  style={{
                    fontFamily: monoLabels ? c.fm : c.fb,
                    fontSize: 12,
                    color: c.gray,
                    border: `1px solid ${c.border}`,
                    padding: '5px 11px',
                    borderRadius: 999,
                    background: c.cream,
                  }}
                >
                  {o}
                </span>
              ))}
            </div>
          </div>
        </section>
      );
    }

    // ── Parcours 'trois-etapes-grid' — contenu « 3 étapes pour passer » dans
    // le DESIGN de « Comment tu fais la passe » (grid-lpt : cellules reliées,
    // grands numéros, barres d'accent, bandeau « Finançable via »). ──────────
    if (parcoursVariant === 'trois-etapes-grid') {
      const etapesG = [
        { n: 1, t: 'Fais ton bilan gratuit', d: 'PassBot pose 8 questions pour identifier les métiers du digital qui collent à ton profil.' },
        { n: 2, t: 'Explore articles & ressources', d: 'Comprends les métiers, les formations, les financements. Monte en compétences maintenant.' },
        { n: 3, t: 'Continue à avancer chaque semaine', d: 'Ton diagnostic arrive par email avec tes métiers compatibles. Ensuite, 2× par semaine : un article + une ressource pour progresser.' },
      ];
      return (
        <section style={{ background: c.bgParcours, padding: '80px 64px', borderBottom: `1px solid ${c.border}` }}>
          <Eyebrow>Comment ça marche</Eyebrow>
          <h2 style={{ fontFamily: c.fd, fontWeight: 800, fontSize: 46, letterSpacing: '-0.025em', lineHeight: 1.04, color: c.ink, margin: '0 0 10px' }}>
            3 étapes pour <HeadEm>passer.</HeadEm>
          </h2>
          <p style={{ fontFamily: c.fb, fontSize: 15, color: c.gray, lineHeight: 1.6, margin: 0, maxWidth: 520 }}>
            Un chemin clair, gratuit, sans engagement. Tu avances à ton rythme.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 1,
              background: c.border,
              marginTop: 36,
              border: `1px solid ${c.border}`,
              borderRadius: 10,
              overflow: 'hidden',
            }}
          >
            {etapesG.map((s, i) => {
              const active = c.hasPunch && i === 1;
              return (
              <div key={s.n} style={{ padding: '34px 30px 36px', background: c.paper, position: 'relative' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 3, background: active ? c.punch : c.accent }} />
                {monoLabels || c.hasPunch ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                    <span style={{ fontFamily: c.fm, fontSize: 10.5, color: c.grayLt }}>step_0{s.n}</span>
                    {c.hasPunch ? (
                      <span style={{ fontFamily: c.fm, fontSize: 9.5, fontWeight: 700, padding: '2px 8px', borderRadius: 3, color: active ? c.punchDeep : c.accentDeep, background: active ? c.punchSoft : c.accentSoft }}>
                        {active ? '● en cours' : 'à faire'}
                      </span>
                    ) : null}
                  </div>
                ) : null}
                <div
                  style={{
                    fontFamily: c.fd,
                    fontWeight: 800,
                    fontSize: 56,
                    color: active ? c.punchDeep : c.accent,
                    lineHeight: 1,
                    letterSpacing: '-0.03em',
                    marginBottom: 16,
                    WebkitTextStroke: !active && luminance(c.accent) > 0.55 ? `1px ${c.accentDeep}` : 'none',
                  }}
                >
                  0{s.n}
                </div>
                <h3 style={{ fontFamily: c.fd, fontWeight: 700, fontSize: 19, color: c.ink, lineHeight: 1.25, margin: '0 0 10px', letterSpacing: '-0.015em' }}>
                  {s.t}
                </h3>
                <p style={{ fontFamily: c.fb, fontSize: 14, color: c.gray, lineHeight: 1.65, margin: 0 }}>
                  {s.d}
                </p>
              </div>
              );
            })}
          </div>

          <div
            style={{
              marginTop: 28,
              paddingTop: 20,
              borderTop: `1px solid ${c.border}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 20,
              flexWrap: 'wrap',
            }}
          >
            <div style={{ fontFamily: monoLabels ? c.fm : c.fb, fontSize: 13, color: c.grayLt, fontStyle: monoLabels ? 'normal' : 'italic' }}>{monoLabels ? '// finançable via :' : 'Finançable via :'}</div>
            <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
              {C.outils.map((o) => (
                <span
                  key={o}
                  style={{
                    fontFamily: monoLabels ? c.fm : c.fb,
                    fontSize: 12,
                    color: c.gray,
                    border: `1px solid ${c.border}`,
                    padding: '5px 11px',
                    borderRadius: 999,
                    background: c.cream,
                  }}
                >
                  {o}
                </span>
              ))}
            </div>
          </div>
        </section>
      );
    }

    // ── Parcours 'trois-etapes' ──────────────────────────────────────────
    // Titre « 3 étapes pour *passer* » (caramel italique serif), 3 cartes
    // blanches bordées avec flèches, numéros en caramel, checks caramel.
    if (parcoursVariant === 'trois-etapes') {
      const etapes = [
        {
          n: 1,
          t: 'Fais ton bilan gratuit',
          d: 'PassBot pose 8 questions pour identifier les métiers du digital qui collent à ton profil.',
          items: ['10 minutes, 8 questions', 'Résultat reçu par email', 'Gratuit, sans engagement'],
        },
        {
          n: 2,
          t: 'Explore articles & ressources',
          d: 'Comprends les métiers, les formations, les financements. Monte en compétences maintenant.',
          items: ['Articles par catégorie', 'Ressources étape par étape', 'Liens YouTube, OpenClassroom'],
        },
        {
          n: 3,
          t: 'Continue à avancer chaque semaine',
          d: 'Ton diagnostic arrive par email avec tes métiers compatibles. Ensuite, 2× par semaine : un article + une ressource pour progresser.',
          items: ['Diagnostic personnalisé par email', 'Newsletter 2×/semaine', 'Un article + une ressource actionnable'],
        },
      ];
      return (
        <section style={{ background: c.bgParcours, padding: '80px 64px', borderBottom: `1px solid ${c.border}` }}>
          <h2 style={{ fontFamily: c.fd, fontWeight: 800, fontSize: 50, letterSpacing: '-0.025em', lineHeight: 1.04, color: c.ink, margin: '0 0 12px' }}>
            3 étapes pour{' '}
            <em style={{ fontFamily: c.fs, fontStyle: 'italic', fontWeight: 400, color: c.accent }}>passer.</em>
          </h2>
          <p style={{ fontFamily: c.fb, fontSize: 15, color: c.gray, lineHeight: 1.6, margin: '0 0 52px', maxWidth: 520 }}>
            Un chemin clair, gratuit, sans engagement. Tu avances à ton rythme.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr auto 1fr', alignItems: 'start' }}>
            {etapes.map((e, i) => (
              <React.Fragment key={e.n}>
                <div style={{ background: c.paper, border: `1.5px solid ${c.border}`, borderRadius: 16, padding: '32px 28px 36px' }}>
                  <div style={{ fontFamily: c.fs, fontStyle: 'italic', fontWeight: 400, fontSize: 72, lineHeight: 1, color: c.accent, letterSpacing: '-0.03em', marginBottom: 24 }}>
                    {e.n}
                  </div>
                  <h3 style={{ fontFamily: c.fd, fontWeight: 800, fontSize: 19, color: c.ink, lineHeight: 1.25, margin: '0 0 10px', letterSpacing: '-0.015em' }}>
                    {e.t}
                  </h3>
                  <p style={{ fontFamily: c.fb, fontSize: 14, color: c.gray, lineHeight: 1.65, margin: '0 0 20px' }}>
                    {e.d}
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {e.items.map((item) => (
                      <div key={item} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                        <span style={{ color: c.accent, fontFamily: c.fb, fontWeight: 700, fontSize: 14, lineHeight: 1.5, flexShrink: 0 }}>✓</span>
                        <span style={{ fontFamily: c.fb, fontSize: 14, color: c.accentDeep, lineHeight: 1.5 }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {i < 2 && (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 20px', paddingTop: 80, color: c.grayLight, fontSize: 22 }}>
                    →
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </section>
      );
    }

    return (
    <section style={{ background: c.bgParcours, padding: '80px 64px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 44, gap: 32 }}>
        <div>
          <Eyebrow>Comment ça marche</Eyebrow>
          <h2
            style={{
              fontFamily: c.fd,
              fontWeight: 800,
              fontSize: 46,
              letterSpacing: '-0.025em',
              lineHeight: 1.04,
              color: c.ink,
              margin: 0,
            }}
          >
            {parcoursVariant === 'lapassetech' ? (
              <>
                Comment <Hi>tu fais la passe.</Hi>
              </>
            ) : (
              <>
                Trois étapes, <Hi>à ton rythme.</Hi>
              </>
            )}
          </h2>
        </div>
        <p style={{ fontFamily: c.fb, fontSize: 13, color: c.gray, maxWidth: 280, textAlign: 'right', margin: 0, lineHeight: 1.6 }}>
          Tu n’as rien à signer. Tu peux tout faire seul·e — ou demander de l’aide quand tu veux.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
        {steps.map((s) => (
          <div
            key={s.n}
            style={{
              background: c.paper,
              border: `1px solid ${c.border}`,
              borderTop: `3px solid ${c.accent}`,
              borderRadius: 8,
              padding: '28px 26px 30px',
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              minHeight: 260,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span
                style={{
                  fontFamily: c.fs,
                  fontStyle: 'italic',
                  fontWeight: 400,
                  fontSize: 40,
                  color: c.accentDeep,
                  lineHeight: 1,
                }}
              >
                0{s.n}
              </span>
              <span
                style={{
                  fontFamily: c.fb,
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: c.accentDeep,
                  background: c.accentSoft,
                  padding: '5px 11px',
                  borderRadius: 3,
                }}
              >
                {s.tag}
              </span>
            </div>
            <h3
              style={{
                fontFamily: c.fd,
                fontWeight: 700,
                fontSize: 20,
                letterSpacing: '-0.02em',
                lineHeight: 1.22,
                color: c.ink,
                margin: 0,
              }}
            >
              {s.t}
            </h3>
            <p style={{ fontFamily: c.fb, fontSize: 14, lineHeight: 1.65, color: c.gray, margin: 0 }}>
              {s.d}
            </p>
          </div>
        ))}
      </div>

      {/* Outils bar */}
      <div
        style={{
          marginTop: 32,
          padding: '22px 28px',
          background: c.paper,
          border: `1px solid ${c.border}`,
          borderRadius: 8,
          display: 'flex',
          alignItems: 'center',
          gap: 24,
          justifyContent: 'space-between',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ fontFamily: c.fb, fontSize: 13.5, color: c.gray, maxWidth: 300, lineHeight: 1.55 }}>
          <span style={{ color: c.ink, fontWeight: 600 }}>Financements existants :</span>{' '}
          on t’explique lequel est fait pour toi.
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
          {C.outils.map((o) => (
            <span
              key={o}
              style={{
                fontFamily: c.fb,
                fontSize: 12,
                fontWeight: 600,
                padding: '6px 12px',
                background: c.cream,
                border: `1px solid ${c.border}`,
                borderRadius: 999,
                color: c.ink,
              }}
            >
              {o}
            </span>
          ))}
          ))}
        </div>
      </div>
    </section>
    );
  };

  // ── Guy ──
  const Guy = () => {
    // 'stats-lpt' — repris de lpt-v2-marron1 : bloc texte + colonne de 4 cartes
    // statistiques (16 / 100% / 40 / BA). Pas de photo. Fond crème.
    if (guyVariant === 'stats-lpt') {
      const stats = [
        { n: '16', t: 'Années en marketing et CRM', d: 'Responsable marketing, responsable CRM dans des groupes de presse' },
        { n: '100%', t: 'Financé via POEI', d: 'CDI garanti avant même de commencer la formation' },
        { n: '40', t: 'Ans au moment de la reconversion', d: 'Sans diplôme informatique, sans réseau dans la tech' },
        { n: 'BA', t: 'Business Analyst Salesforce', d: 'Certifié · en poste · fondateur de LaPasseTech' },
      ];
      return (
        <section style={{ padding: '80px 64px', background: c.bgGuy, borderBottom: `1px solid ${c.border}` }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>
            <div>
              <Eyebrow>Pourquoi j’ai créé LaPasseTech</Eyebrow>
              <h2 style={{ fontFamily: c.fd, fontWeight: 800, fontSize: 44, letterSpacing: '-0.025em', lineHeight: 1.04, color: c.ink, margin: '6px 0 0' }}>
                Guy — celui qui <HeadEm>est passé.</HeadEm>
              </h2>
              <p style={{ fontFamily: c.fb, fontSize: 15, color: c.gray, lineHeight: 1.75, margin: '22px 0 0', maxWidth: 520 }}>
                À 40 ans, après 16 ans dans le marketing, je me suis basculé dans la tech d’une manière que je n’aurais jamais imaginée.{' '}
                <strong style={{ color: c.ink, fontWeight: 600 }}>Le même doute que toi</strong> — et l’impression que le digital c’était pour les autres.
              </p>
              <p style={{ fontFamily: c.fb, fontSize: 15, color: c.gray, lineHeight: 1.75, margin: '14px 0 0', maxWidth: 520 }}>
                Ce que j’ai découvert ? Que les formations existent, que les financements aussi, et que{' '}
                <strong style={{ color: c.ink, fontWeight: 600 }}>mon expérience en marketing et CRM était un atout, pas un handicap.</strong> Personne ne me l’avait dit avant.
              </p>
              <blockquote
                style={{
                  fontFamily: c.fs,
                  fontStyle: 'italic',
                  fontWeight: 400,
                  fontSize: 24,
                  lineHeight: 1.4,
                  color: c.ink,
                  letterSpacing: '0',
                  margin: '26px 0 0',
                  padding: '16px 20px',
                  borderLeft: `3px solid ${c.accentDeep}`,
                  background: c.paper,
                  borderRadius: '0 6px 6px 0',
                  maxWidth: 540,
                }}
              >
                « Pas un site de plus — ni inspirant ni inutile. Un site qui dit la vérité, y compris quand ça dérange. »
              </blockquote>
              <a
                style={{
                  display: 'inline-block',
                  marginTop: 22,
                  fontFamily: c.fb,
                  fontSize: 14,
                  fontWeight: 600,
                  color: c.ink,
                  textDecoration: 'none',
                  borderBottom: `2px solid ${c.accent}`,
                  paddingBottom: 2,
                }}
              >
                Lire mon parcours complet →
              </a>
              {tweaks.guyCta ? (
                <div style={{ marginTop: 26 }}>
                  <a
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 10,
                      background: c.accent,
                      color: '#FFFFFF',
                      fontFamily: c.fb,
                      fontSize: 15,
                      fontWeight: 700,
                      padding: '15px 26px',
                      borderRadius: 8,
                      textDecoration: 'none',
                      boxShadow: '0 14px 30px -14px rgba(156,90,44,0.55)',
                    }}
                  >
                    Faire mon diagnostic gratuit <span style={{ fontWeight: 800 }}>→</span>
                  </a>
                </div>
              ) : null}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingTop: 6 }}>
              {stats.map((s) => (
                <div
                  key={s.n}
                  style={{
                    background: c.paper,
                    border: `1px solid ${c.border}`,
                    borderRadius: 8,
                    padding: '18px 22px',
                    display: 'flex',
                    gap: 18,
                    alignItems: 'center',
                  }}
                >
                  <div
                    style={{
                      fontFamily: c.fd,
                      fontWeight: 800,
                      fontSize: 30,
                      color: c.accentDeep,
                      letterSpacing: '-0.02em',
                      minWidth: 64,
                      lineHeight: 1,
                    }}
                  >
                    {s.n}
                  </div>
                  <div style={{ fontFamily: c.fb, fontSize: 12.5, color: c.gray, lineHeight: 1.5 }}>
                    <strong style={{ color: c.ink, fontWeight: 600, display: 'block', fontSize: 13.5, marginBottom: 2 }}>{s.t}</strong>
                    {s.d}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }

    if (guyVariant === 'text') {
      // No-photo launch variant — strong text block "Pourquoi j'ai créé LaPasseTech"
      // Avoids placeholder portrait that erodes credibility before launch.
      return (
        <section style={{ padding: '88px 64px', background: c.bgGuy, borderBottom: `1px solid ${c.border}` }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 64, alignItems: 'start', maxWidth: 1120 }}>
            <div>
              <Eyebrow>À propos</Eyebrow>
              <h2
                style={{
                  fontFamily: c.fd,
                  fontWeight: 800,
                  fontSize: 46,
                  letterSpacing: '-0.025em',
                  lineHeight: 1.02,
                  color: c.ink,
                  margin: 0,
                }}
              >
                Pourquoi j’ai <Hi>créé LaPasseTech.</Hi>
              </h2>
              <p style={{ fontFamily: c.fb, fontSize: 14, color: c.grayLt, marginTop: 18, letterSpacing: '0.04em', textTransform: 'uppercase', fontWeight: 600 }}>
                Guy · Fondateur
              </p>
            </div>

            <div>
              <p
                style={{
                  fontFamily: c.fb,
                  fontSize: 18,
                  color: c.ink,
                  lineHeight: 1.65,
                  margin: 0,
                  maxWidth: 600,
                }}
              >
                À 38 ans, après 16 ans dans le marketing, j’ai voulu basculer dans la tech. Je n’avais ni diplôme info, ni mentor, ni réseau dans le secteur. Juste la conviction que c’était possible — et l’impression que personne ne parlait à des gens comme moi.
              </p>
              <p
                style={{
                  fontFamily: c.fb,
                  fontSize: 16,
                  color: c.gray,
                  lineHeight: 1.7,
                  marginTop: 18,
                  maxWidth: 600,
                }}
              >
                J’ai galéré, j’ai trouvé. Aujourd’hui je suis Business Analyst Salesforce, en CDI, dans une boîte que j’aime. LaPasseTech est tout ce que j’aurais voulu lire pendant ces 18 mois.
              </p>
              <blockquote
                style={{
                  fontFamily: c.fs,
                  fontStyle: 'italic',
                  fontWeight: 400,
                  fontSize: 26,
                  lineHeight: 1.35,
                  color: c.ink,
                  letterSpacing: '0',
                  margin: '32px 0 0',
                  paddingLeft: 24,
                  borderLeft: `2px solid ${c.accentDeep}`,
                  maxWidth: 600,
                }}
              >
                Pas un site « inspirant ». Un site qui dit la vérité — y compris quand elle dérange.
              </blockquote>
              <div
                style={{
                  marginTop: 28,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  flexWrap: 'wrap',
                }}
              >
                <a
                  style={{
                    fontFamily: c.fb,
                    fontSize: 14,
                    fontWeight: 600,
                    color: c.ink,
                    textDecoration: 'none',
                    borderBottom: `2px solid ${c.accent}`,
                    paddingBottom: 2,
                  }}
                >
                  Lire l’histoire complète →
                </a>
                <span style={{ fontFamily: c.fb, fontSize: 13, color: c.grayLt }}>
                  Photo + interview à venir sur la page À propos.
                </span>
              </div>
            </div>
          </div>
        </section>
      );
    }

    return (
    <section style={{ padding: '80px 64px', background: c.bgGuy, borderBottom: `1px solid ${c.border}` }}>
      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 64, alignItems: 'start' }}>
        <div>
          <div
            style={{
              aspectRatio: '4/5',
              width: '100%',
              position: 'relative',
              overflow: 'hidden',
              border: `1px solid ${c.border}`,
              borderRadius: 6,
              background: c.beige,
            }}
          >
            <img
              src={C.images.guy}
              alt="Guy"
              loading="eager"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            <div
              style={{
                position: 'absolute',
                top: 14,
                left: 14,
                background: c.paper,
                color: c.ink,
                padding: '5px 11px',
                borderRadius: 3,
                fontFamily: c.fb,
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                border: `1px solid ${c.border}`,
              }}
            >
              Le fondateur
            </div>
          </div>
          <div style={{ marginTop: 16 }}>
            <div style={{ fontFamily: c.fd, fontWeight: 700, fontSize: 17, color: c.ink, letterSpacing: '-0.01em' }}>
              Guy
            </div>
            <div style={{ fontFamily: c.fb, fontSize: 13, color: c.gray, marginTop: 2 }}>
              Fondateur · Business Analyst Salesforce
            </div>
          </div>
        </div>

        <div>
          <Eyebrow>À propos</Eyebrow>
          <h2
            style={{
              fontFamily: c.fd,
              fontWeight: 800,
              fontSize: 46,
              letterSpacing: '-0.025em',
              lineHeight: 1.04,
              color: c.ink,
              margin: 0,
            }}
          >
            Guy — celui <Hi>qui est passé.</Hi>
          </h2>
          <p style={{ fontFamily: c.fb, fontSize: 17, color: c.gray, lineHeight: 1.65, marginTop: 22, maxWidth: 580 }}>
            {C.guy.intro}
          </p>

          <div style={{ marginTop: 32 }}>
            {C.guy.timeline.map((tl, i) => (
              <div
                key={i}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '140px 1fr',
                  gap: 24,
                  padding: '18px 0',
                  borderTop: `1px solid ${c.border}`,
                  borderBottom: i === C.guy.timeline.length - 1 ? `1px solid ${c.border}` : 'none',
                }}
              >
                <div
                  style={{
                    fontFamily: c.fb,
                    fontSize: 11,
                    color: c.grayLt,
                    fontWeight: 600,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    paddingTop: 3,
                  }}
                >
                  {tl.y}
                </div>
                <div>
                  <div style={{ fontFamily: c.fd, fontSize: 18, fontWeight: 700, color: c.ink, letterSpacing: '-0.015em', lineHeight: 1.3 }}>
                    {tl.t}
                  </div>
                  {tl.d && <div style={{ fontFamily: c.fb, fontSize: 13.5, color: c.gray, marginTop: 4 }}>{tl.d}</div>}
                </div>
              </div>
            ))}
          </div>

          <blockquote
            style={{
              fontFamily: c.fs,
              fontWeight: 400,
              fontStyle: 'italic',
              fontSize: 28,
              lineHeight: 1.32,
              color: c.ink,
              letterSpacing: '0',
              margin: '36px 0 0',
              paddingLeft: 24,
              borderLeft: `2px solid ${c.accentDeep}`,
              maxWidth: 640,
            }}
          >
            {C.guy.quote}
          </blockquote>
        </div>
      </div>
    </section>
    );
  };

  // ── ContentSection — articles + ressources (light cards) ──
  const ContentSection = () => {
    // 'humans' variant — delegate to the standalone block from
    // block-explorations. Used by palette-launch wrappers so the validated
    // "S'informer · C · Fond illustré humains" ships inside the full page.
    if (contentVariant === 'humans' && window.ContentWithHumans) {
      return (
        <div style={{ background: c.bgContent }}>
          <window.ContentWithHumans tweaks={tweaks} />
        </div>
      );
    }
    return (
    <section style={{ background: c.bgContent }}>
      <div style={{ padding: '64px 64px 0' }}>
        <Eyebrow>Le contenu</Eyebrow>
        <h2
          style={{
            fontFamily: c.fd,
            fontWeight: 800,
            fontSize: 44,
            letterSpacing: '-0.025em',
            lineHeight: 1.05,
            color: c.ink,
            margin: 0,
            marginBottom: 10,
          }}
        >
          S’informer. <HeadEm>Agir.</HeadEm>
        </h2>
        <p style={{ fontFamily: c.fb, fontSize: 15, color: c.gray, lineHeight: 1.6, maxWidth: 560 }}>
          Articles de fond et ressources actionnables — deux espaces distincts selon où tu en es.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderTop: `1px solid ${c.border}`, marginTop: 32 }}>
        {/* Articles */}
        <div style={{ borderRight: `1px solid ${c.border}` }}>
          <div
            style={{
              fontFamily: c.fb,
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: c.grayLt,
              padding: '16px 36px',
              borderBottom: `1px solid ${c.border}`,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span>Articles récents</span>
            <a style={{ fontSize: 12, color: c.ink, textDecoration: 'none', fontWeight: 600, letterSpacing: 0, textTransform: 'none' }}>
              Voir tous →
            </a>
          </div>
          {articles.map((a) => (
            <a
              key={a.n}
              style={{
                display: 'flex',
                gap: 18,
                alignItems: 'flex-start',
                padding: '18px 36px',
                borderBottom: `1px solid ${c.borderSoft}`,
                textDecoration: 'none',
              }}
            >
              <span
                style={{
                  fontFamily: c.fs,
                  fontStyle: 'italic',
                  fontWeight: 400,
                  fontSize: 24,
                  color: c.accentDeep,
                  minWidth: 26,
                  lineHeight: 1,
                }}
              >
                {a.n}
              </span>
              <div>
                <div style={{ fontFamily: c.fb, fontSize: 10, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: c.grayLt, marginBottom: 4 }}>
                  {a.cat}
                </div>
                <div style={{ fontFamily: c.fd, fontWeight: 700, fontSize: 14, color: c.ink, lineHeight: 1.4, marginBottom: 4 }}>
                  {a.t}
                </div>
                <div style={{ fontFamily: c.fb, fontSize: 12, color: c.grayLt }}>{a.meta}</div>
              </div>
            </a>
          ))}
        </div>

        {/* Ressources — beige cards instead of black */}
        <div style={{ background: c.cream }}>
          <div
            style={{
              fontFamily: c.fb,
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: c.grayLt,
              padding: '16px 36px',
              borderBottom: `1px solid ${c.border}`,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span>Ressources actionnables</span>
            <a style={{ fontSize: 12, color: c.ink, textDecoration: 'none', fontWeight: 600, letterSpacing: 0, textTransform: 'none' }}>
              Voir toutes →
            </a>
          </div>
          {ressources.map((r) => (
            <a
              key={r.t}
              style={{
                background: c.paper,
                margin: '16px 24px',
                borderRadius: 8,
                padding: 20,
                textDecoration: 'none',
                display: 'block',
                border: `1px solid ${c.border}`,
                borderLeft: `3px solid ${c.accent}`,
              }}
            >
              <div style={{ fontFamily: c.fb, fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: c.accentDeep, marginBottom: 8 }}>
                {r.tag}
              </div>
              <div style={{ fontFamily: c.fd, fontWeight: 700, fontSize: 16, color: c.ink, lineHeight: 1.3, marginBottom: 6 }}>
                {r.t}
              </div>
              <div style={{ fontFamily: c.fb, fontSize: 13, color: c.gray, marginBottom: 14 }}>{r.sub}</div>
              <div style={{ display: 'flex', gap: 6 }}>
                {r.chips.map((ch) => (
                  <span
                    key={ch}
                    style={{
                      fontFamily: c.fb,
                      fontSize: 11,
                      padding: '4px 10px',
                      border: `1px solid ${c.border}`,
                      borderRadius: 3,
                      color: c.gray,
                      background: c.cream,
                    }}
                  >
                    {ch}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
    );
  };

  // ── Témoignages — beige band, cards on paper ──
  const Temoignages = () => {
    // 'grid-lpt' — repris de lpt-v2-marron1 : 3 cartes blanches bordées noir,
    // avatar initiale, tags reconversion (de → vers), citation à filet accent.
    if (temoignageVariant === 'grid-lpt') {
      return (
        <section style={{ padding: '80px 64px', background: c.bgTemoignages, borderTop: `1px solid ${c.border}`, borderBottom: `1px solid ${c.border}` }}>
          <Eyebrow>Témoignages</Eyebrow>
          <h2 style={{ fontFamily: c.fd, fontWeight: 800, fontSize: 46, letterSpacing: '-0.025em', lineHeight: 1.04, color: c.ink, margin: 0 }}>
            Des parcours qui <HeadEm>ressemblent au tien.</HeadEm>
          </h2>
          <p style={{ fontFamily: c.fb, fontSize: 12.5, color: c.grayLt, fontStyle: 'italic', margin: '10px 0 32px' }}>
            Prénoms modifiés à leur demande · Parcours réels rencontrés en centre de formation.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {C.temoignages.items.map((it) => (
              <div
                key={it.name}
                style={{
                  background: c.paper,
                  border: `1.5px solid ${c.ink}`,
                  borderRadius: 8,
                  padding: 22,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      background: c.accent,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: c.fd,
                      fontWeight: 800,
                      fontSize: 15,
                      color: textOnAccent(c.accent, c.ink, '#fff'),
                      flexShrink: 0,
                    }}
                  >
                    {it.name[0]}.
                  </div>
                  <div>
                    <div style={{ fontFamily: c.fd, fontWeight: 700, fontSize: 14, color: c.ink, marginBottom: 5 }}>
                      {it.name[0]}.
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, flexWrap: 'wrap' }}>
                      <span style={{ fontFamily: c.fb, fontSize: 10.5, color: c.grayLt, background: c.cream, padding: '2px 8px', borderRadius: 3 }}>
                        {it.from}
                      </span>
                      <span style={{ fontFamily: c.fs, fontStyle: 'italic', fontSize: 13, color: c.hasPunch ? c.punchDeep : c.accentDeep }}>→</span>
                      <span
                        style={{
                          fontFamily: monoLabels ? c.fm : c.fb,
                          fontSize: 10.5,
                          color: c.hasPunch ? c.punchDeep : c.ink,
                          fontWeight: 600,
                          background: c.hasPunch ? c.punchSoft : c.accentSoft,
                          border: `0.5px solid ${c.hasPunch ? c.punchLine : c.accentDeep}`,
                          padding: '2px 8px',
                          borderRadius: 3,
                        }}
                      >
                        {it.to}
                      </span>
                    </div>
                  </div>
                </div>
                <p
                  style={{
                    fontFamily: c.fd,
                    fontWeight: 700,
                    fontSize: 15,
                    color: c.ink,
                    lineHeight: 1.45,
                    borderLeft: `3px solid ${c.accent}`,
                    paddingLeft: 14,
                    margin: 0,
                  }}
                >
                  « {it.q} »
                </p>
                <div style={{ fontFamily: monoLabels ? c.fm : c.fb, fontSize: 11.5, color: c.grayLt }}>{monoLabels ? '// ' : ''}{it.age} · POEI · 100% financé</div>
              </div>
            ))}
          </div>
        </section>
      );
    }

    if (temoignageVariant === 'single') {
      // Launch variant — 1 single big testimonial slot.
      // Honest "à venir" badge so users see this is a real placeholder, not stock.
      const it = C.temoignages.items[0];
      return (
        <section style={{ padding: '80px 64px', background: c.bgTemoignages, borderTop: `1px solid ${c.border}`, borderBottom: `1px solid ${c.border}` }}>
          <div style={{ marginBottom: 36 }}>
            <Eyebrow>Ils sont passés</Eyebrow>
            <h2
              style={{
                fontFamily: c.fd,
                fontWeight: 800,
                fontSize: 46,
                letterSpacing: '-0.025em',
                lineHeight: 1.04,
                color: c.ink,
                margin: 0,
              }}
            >
              Le premier <Hi>parcours.</Hi>
            </h2>
            <p style={{ fontFamily: c.fb, fontSize: 14, color: c.gray, marginTop: 10, maxWidth: 520, lineHeight: 1.6 }}>
              D’autres histoires arrivent. Pour démarrer, on en publie une seule — la vraie.
            </p>
          </div>
          <div
            style={{
              background: c.paper,
              border: `1px solid ${c.border}`,
              borderTop: `3px solid ${c.accent}`,
              borderRadius: 8,
              padding: '44px 48px',
              display: 'grid',
              gridTemplateColumns: '1fr 1.5fr',
              gap: 48,
              alignItems: 'center',
              maxWidth: 1040,
            }}
          >
            <div>
              <div style={{ fontFamily: c.fb, fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: c.accentDeep, marginBottom: 16 }}>
                Témoignage #01
              </div>
              <div style={{ fontFamily: c.fd, fontSize: 22, fontWeight: 700, color: c.ink, letterSpacing: '-0.015em' }}>
                {it.name}
              </div>
              <div style={{ fontFamily: c.fb, fontSize: 13.5, color: c.gray, marginTop: 4 }}>{it.age}</div>
              <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 10, fontFamily: c.fb, fontSize: 13, flexWrap: 'wrap' }}>
                <span style={{ color: c.gray }}>{it.from}</span>
                <span style={{ fontFamily: c.fs, fontStyle: 'italic', fontSize: 18, color: c.accentDeep }}>→</span>
                <span style={{ color: c.ink, fontWeight: 700, background: c.accent, padding: '4px 10px', borderRadius: 3 }}>
                  {it.to}
                </span>
              </div>
            </div>
            <p
              style={{
                fontFamily: c.fs,
                fontStyle: 'italic',
                fontWeight: 400,
                fontSize: 28,
                lineHeight: 1.32,
                color: c.ink,
                margin: 0,
                letterSpacing: '0',
              }}
            >
              « {it.q} »
            </p>
          </div>
          <p style={{ fontFamily: c.fb, fontSize: 12, color: c.grayLt, marginTop: 18, fontStyle: 'italic' }}>
            Tu es passé·e par LaPasseTech ? <a style={{ color: c.ink, textDecoration: 'underline', fontStyle: 'normal', fontWeight: 600 }}>Raconte ton histoire ici →</a>
          </p>
        </section>
      );
    }

    return (
    <section style={{ padding: '80px 64px', background: c.bgTemoignages, borderTop: `1px solid ${c.border}`, borderBottom: `1px solid ${c.border}` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40, gap: 24 }}>
        <div>
          <Eyebrow>Ils sont passés</Eyebrow>
          <h2
            style={{
              fontFamily: c.fd,
              fontWeight: 800,
              fontSize: 46,
              letterSpacing: '-0.025em',
              lineHeight: 1.04,
              color: c.ink,
              margin: 0,
            }}
          >
            Des parcours <Hi>qui te ressemblent.</Hi>
          </h2>
        </div>
        <a
          style={{
            fontFamily: c.fb,
            color: c.ink,
            fontWeight: 600,
            fontSize: 13,
            textDecoration: 'none',
            borderBottom: `2px solid ${c.accent}`,
            paddingBottom: 2,
          }}
        >
          Voir tous les parcours →
        </a>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
        {C.temoignages.items.map((it) => (
          <div
            key={it.name}
            style={{
              background: c.paper,
              padding: 26,
              display: 'flex',
              flexDirection: 'column',
              gap: 18,
              border: `1px solid ${c.border}`,
              borderTop: `3px solid ${c.accent}`,
              borderRadius: 6,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: '50%',
                  overflow: 'hidden',
                  flexShrink: 0,
                  position: 'relative',
                  background: c.beige,
                  border: `1px solid ${c.border}`,
                }}
              >
                <img
                  src={C.images[it.imgKey]}
                  alt={it.name}
                  loading="eager"
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
              <div>
                <div style={{ fontFamily: c.fd, fontSize: 16, fontWeight: 700, color: c.ink, letterSpacing: '-0.01em' }}>
                  {it.name}
                </div>
                <div style={{ fontFamily: c.fb, fontSize: 12, color: c.grayLt, marginTop: 2 }}>{it.age}</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: c.fb, fontSize: 12, flexWrap: 'wrap' }}>
              <span style={{ color: c.gray }}>{it.from}</span>
              <span
                style={{
                  fontFamily: c.fs,
                  fontStyle: 'italic',
                  fontWeight: 400,
                  fontSize: 16,
                  color: c.accentDeep,
                }}
              >
                →
              </span>
              <span
                style={{
                  color: c.ink,
                  fontWeight: 700,
                  background: c.accent,
                  padding: '3px 9px',
                  borderRadius: 3,
                }}
              >
                {it.to}
              </span>
            </div>
            <p
              style={{
                fontFamily: c.fs,
                fontStyle: 'italic',
                fontWeight: 400,
                fontSize: 20,
                lineHeight: 1.4,
                color: c.ink,
                margin: 0,
                letterSpacing: '0.005em',
              }}
            >
              « {it.q} »
            </p>
          </div>
        ))}
      </div>
    </section>
    );
  };

  // ── Bilan CTA — bande JAUNE pleine (reprise du Dense) ──
  const BilanCTA = () => {
    // 'chat-lpt' — repris de lpt-v2-marron1 : bande accent pleine, texte blanc,
    // mock PassBot translucide (bulles question / réponse) à droite.
    if (bilanVariant === 'chat-lpt') {
      const onAccent = textOnAccent(c.bgBilan, c.ink, '#FFFFFF');
      const onAccentSoft = onAccent === '#FFFFFF' ? 'rgba(255,255,255,.72)' : 'rgba(26,23,20,.7)';
      const onAccentFaint = onAccent === '#FFFFFF' ? 'rgba(255,255,255,.5)' : 'rgba(26,23,20,.5)';
      const bubbleBg = onAccent === '#FFFFFF' ? 'rgba(0,0,0,.18)' : 'rgba(255,255,255,.5)';
      const cardBg = onAccent === '#FFFFFF' ? 'rgba(0,0,0,.22)' : 'rgba(255,255,255,.45)';
      const msgBg = onAccent === '#FFFFFF' ? 'rgba(255,255,255,.12)' : 'rgba(255,255,255,.7)';
      return (
        <section style={{ background: c.bgBilan, padding: '80px 64px', borderTop: `1px solid ${c.ink}`, borderBottom: `1px solid ${c.ink}` }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <div>
              <div style={{ fontFamily: monoLabels ? c.fm : c.fb, fontSize: monoLabels ? 10.5 : 11, fontWeight: monoLabels ? 500 : 600, letterSpacing: monoLabels ? '0.04em' : '0.16em', textTransform: monoLabels ? 'lowercase' : 'uppercase', color: c.hasPunch ? c.punch : onAccentFaint, marginBottom: 14 }}>
                {monoLabels ? '// ' : ''}Le bilan PassBot
              </div>
              <h2 style={{ fontFamily: c.fd, fontWeight: 800, fontSize: 52, letterSpacing: '-0.03em', lineHeight: 1.04, color: onAccent, margin: 0 }}>
                Ton bilan<br />
                <em style={{ fontFamily: caramelHeads ? c.fd : c.fs, fontStyle: caramelHeads ? 'normal' : 'italic', fontWeight: caramelHeads ? 800 : 400, fontSize: '1.04em', color: c.accentSoft }}>
                  en {bilanDuration} minutes.
                </em>
              </h2>
              <p style={{ fontFamily: c.fb, fontSize: 16, color: onAccentSoft, lineHeight: 1.65, margin: '18px 0 28px', maxWidth: 460 }}>
                {bilanDuration <= 5 ? 5 : 8} questions, un plan d’action personnalisé. Gratuit. Sans engagement. Sans jugement. Disponible à 23h un dimanche.
              </p>
              <a
                style={{
                  background: mjVert ? '#F5C542' : c.ink,
                  color: mjVert ? '#1A1714' : c.cream,
                  fontFamily: c.fb,
                  fontSize: 14,
                  fontWeight: 700,
                  padding: '13px 24px',
                  borderRadius: 6,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 9,
                }}
              >
                Commencer mon bilan <span style={{ color: mjVert ? '#1A1714' : c.hasPunch ? c.punch : c.cream, fontWeight: 800 }}>→</span>
              </a>
            </div>

            {/* Mock PassBot — bulles translucides sur la bande accent */}
            <div style={{ background: cardBg, borderRadius: 12, padding: 22, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: monoLabels ? c.fm : c.fb, fontSize: 12.5, fontWeight: 600, color: onAccent }}>PassBot{monoLabels ? '' : ' — Bilan d’orientation'}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: c.punch, boxShadow: c.hasPunch ? `0 0 0 3px ${c.punchSoft}` : 'none' }} />
                  <span style={{ fontFamily: monoLabels ? c.fm : c.fb, fontSize: 11, color: mjVert ? onAccent : c.hasPunch ? c.punch : onAccentFaint }}>{monoLabels ? 'en_ligne' : 'En ligne'}</span>
                </div>
              </div>
              <div style={{ background: msgBg, borderRadius: 10, padding: '12px 14px' }}>
                <p style={{ fontFamily: c.fb, fontSize: 13, color: onAccent, lineHeight: 1.5, margin: 0 }}>
                  Tu veux te reconvertir dans le digital ? Dis-moi, tu travailles actuellement dans quel secteur ?
                </p>
              </div>
              <div style={{ background: '#fff', borderRadius: 10, padding: '12px 14px', alignSelf: 'flex-end', maxWidth: '85%' }}>
                <p style={{ fontFamily: c.fb, fontSize: 13, color: c.ink, lineHeight: 1.5, margin: 0 }}>
                  Je suis dans la logistique depuis 8 ans.
                </p>
              </div>
              <div style={{ background: msgBg, borderRadius: 10, padding: '12px 14px' }}>
                <p style={{ fontFamily: c.fb, fontSize: 13, color: onAccent, lineHeight: 1.5, margin: 0 }}>
                  Super. Et est-ce que tu as déjà regardé ce que le CPF ou la POEI pourraient financer pour toi ?
                </p>
              </div>
              <div style={{ background: bubbleBg, borderRadius: 8, padding: '9px 13px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: monoLabels ? c.fm : c.fb, fontSize: 12, color: onAccentFaint }}>{monoLabels ? '// écris ta réponse…' : 'Écris ta réponse…'}</span>
                <span style={{ background: mjVert ? c.ink : c.hasPunch ? c.punch : c.ink, color: mjVert ? c.cream : c.hasPunch ? c.punchInk : c.cream, fontFamily: c.fb, fontSize: 11, fontWeight: 700, padding: '5px 12px', borderRadius: 5 }}>Envoyer{!mjVert && c.hasPunch ? ' →' : ''}</span>
              </div>
            </div>
          </div>
        </section>
      );
    }

    return (
    <section style={{ background: c.bgBilan, padding: '88px 64px', borderBottom: `1px solid ${c.border}` }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.25fr 1fr', gap: 56, alignItems: 'center' }}>
        <div>
          <div
            style={{
              fontFamily: c.fb,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: c.ink,
              opacity: 0.7,
              marginBottom: 16,
            }}
          >
            Le bilan PassBot
          </div>
          <h2
            style={{
              fontFamily: c.fd,
              fontWeight: 800,
              fontSize: 64,
              letterSpacing: '-0.03em',
              lineHeight: 1.0,
              color: c.ink,
              margin: 0,
            }}
          >
            Ton bilan<br />
            <em style={{ fontFamily: c.fs, fontStyle: 'italic', fontWeight: 400, fontSize: '1.04em', borderBottom: `4px solid ${c.ink}`, paddingBottom: 4 }}>
              en {bilanDuration} minutes.
            </em>
          </h2>
          <p style={{ fontFamily: c.fb, fontSize: 17, color: c.ink, opacity: 0.78, lineHeight: 1.6, marginTop: 22, maxWidth: 500 }}>
            PassBot te pose {bilanDuration <= 5 ? 5 : 8} questions et t’envoie un plan d’action personnalisé. Gratuit. Sans engagement. Sans jugement.
          </p>
          <div style={{ marginTop: 32, display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
            <a
              style={{
                background: c.ctaBg,
                color: c.ctaFg,
                fontFamily: c.fb,
                fontSize: 14,
                fontWeight: 700,
                padding: '14px 24px',
                borderRadius: 6,
                textDecoration: 'none',
              }}
            >
              Commencer mon bilan →
            </a>
            <span style={{ fontFamily: c.fb, fontSize: 12, color: c.ink, opacity: 0.65, maxWidth: 240 }}>
              Pas d’email obligatoire pour commencer.
            </span>
          </div>
        </div>

        {/* Chatbot mock — sombre sur la bande jaune pour contraste */}
        <div
          style={{
            background: c.ink,
            borderRadius: 8,
            padding: 22,
            color: c.cream,
            fontFamily: c.fb,
            boxShadow: '0 24px 60px -24px rgba(0,0,0,0.45)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingBottom: 14, borderBottom: '1px solid rgba(255,255,255,.1)' }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: c.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: c.fs, fontStyle: 'italic', fontSize: 16, color: c.ink, fontWeight: 400 }}>
              P
            </div>
            <div style={{ fontWeight: 700, fontSize: 13.5, color: c.cream }}>PassBot</div>
            <div style={{ marginLeft: 'auto', fontSize: 11, color: c.grayLight, display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }} /> En ligne
            </div>
          </div>
          <div style={{ paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ background: c.inkSoft, padding: '12px 14px', borderRadius: 8, fontSize: 13.5, lineHeight: 1.5, maxWidth: '88%' }}>
              Salut ! Tu cherches à te reconvertir dans le digital ?
            </div>
            <div style={{ background: c.inkSoft, padding: '12px 14px', borderRadius: 8, fontSize: 13.5, lineHeight: 1.5, maxWidth: '88%' }}>
              Dis-moi ce que tu fais aujourd’hui — sans détailler, juste une phrase.
            </div>
            <div
              style={{
                background: c.accent,
                color: c.ink,
                padding: '12px 14px',
                borderRadius: 8,
                fontSize: 13.5,
                fontWeight: 500,
                lineHeight: 1.5,
                maxWidth: '88%',
                alignSelf: 'flex-end',
              }}
            >
              Je suis livreur depuis 4 ans, je veux changer.
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: c.grayLt, fontSize: 12, paddingLeft: 4 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: c.grayLt, animation: 'pulse 1.4s ease-in-out infinite' }} />
              PassBot rédige une réponse…
            </div>
          </div>
        </div>
      </div>
    </section>
    );
  };

  // ── LeadMagnet — beige band (not black) ──
  // ── LeadMagnet — beige par défaut, devient dark-aware quand bg est foncé ──
  // Détecte la luminance du bg pour basculer titres / corps / inputs / chevrons
  // en clair sur fond foncé (utile pour les palettes type "Caramel Éditorial"
  // qui posent un lead magnet noir en fin de page).
  const LeadMagnet = () => {
    const lmHex = (c.bgLeadmagnet || '').replace('#', '');
    const lmR = parseInt(lmHex.substr(0, 2), 16);
    const lmG = parseInt(lmHex.substr(2, 2), 16);
    const lmB = parseInt(lmHex.substr(4, 2), 16);
    const lmLum = (0.299 * lmR + 0.587 * lmG + 0.114 * lmB) / 255;
    const lmDark = lmLum < 0.45;
    const lmInk = lmDark ? c.cream : c.ink;
    const lmGray = lmDark ? '#B5AE9F' : c.gray;
    const lmGrayLt = lmDark ? '#8A867D' : c.gray;
    const lmEyebrowColor = lmDark ? c.accent : c.accentDeep;
    const lmCheckColor = lmDark ? c.accent : c.accentDeep;
    const lmInputBg = lmDark ? 'rgba(255,255,255,0.06)' : c.paper;
    const lmInputBorder = lmDark ? 'rgba(255,255,255,0.14)' : c.border;
    const lmInputPlaceholder = lmDark ? 'rgba(255,255,255,0.35)' : undefined;
    return (
    <section
      style={{
        background: c.bgLeadmagnet,
        padding: '72px 64px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 64,
        alignItems: 'center',
      }}
    >
      <div>
        <div style={{ fontFamily: c.fb, fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: lmEyebrowColor, marginBottom: 18 }}>
          Gratuit · 20 pages
        </div>
        <h2 style={{ fontFamily: c.fd, fontWeight: 800, fontSize: 38, letterSpacing: '-0.025em', lineHeight: 1.1, color: lmInk, margin: 0, marginBottom: 14 }}>
          Le guide des métiers du digital<br />
          <Hi>expliqués sans jargon</Hi>
        </h2>
        <p style={{ fontFamily: c.fb, fontSize: 14.5, color: lmGray, lineHeight: 1.65, marginBottom: 26, maxWidth: 480 }}>
          20 pages concrètes : les 8 métiers accessibles sans coder, les formations qui recrutent, les financements disponibles.
        </p>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            '8 métiers digital accessibles sans code',
            'CPF, POEI, Transitions Pro : lequel pour toi',
            'Les formations qui débouchent vraiment',
            'Checklist reconversion prête à l’emploi',
          ].map((l) => (
            <li key={l} style={{ fontFamily: c.fb, fontSize: 14, color: lmInk, display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <span style={{ color: lmCheckColor, fontWeight: 800, flexShrink: 0 }}>✓</span>
              <span>{l}</span>
            </li>
          ))}
        </ul>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <input
          placeholder="Ton prénom"
          style={{
            background: lmInputBg,
            border: `1px solid ${lmInputBorder}`,
            borderRadius: 6,
            padding: '14px 16px',
            fontFamily: c.fb,
            fontSize: 14,
            color: lmInk,
            outline: 'none',
            ...(lmInputPlaceholder ? { '--phc': lmInputPlaceholder } : {}),
          }}
        />
        <input
          placeholder="Ton email"
          style={{
            background: lmInputBg,
            border: `1px solid ${lmInputBorder}`,
            borderRadius: 6,
            padding: '14px 16px',
            fontFamily: c.fb,
            fontSize: 14,
            color: lmInk,
            outline: 'none',
          }}
        />
        <button
          style={{
            background: mjVert ? c.accent : c.ctaBg,
            color: mjVert ? '#FFFFFF' : c.ctaFg,
            fontFamily: c.fb,
            fontSize: 14,
            fontWeight: 700,
            padding: '14px 20px',
            borderRadius: 6,
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Recevoir le guide gratuitement →
        </button>
        <p style={{ fontFamily: c.fb, fontSize: 12, color: lmGrayLt, textAlign: 'center', marginTop: 4 }}>
          Zéro spam. Désinscription en 1 clic.<br />En t’inscrivant tu rejoins aussi la newsletter 2×/semaine.
        </p>
      </div>
    </section>
    );
  };

  // ── Newsletter — bande sombre (cf. lpt-v2-mj-final) ──
  // Pousse l'abonnement 2×/semaine. Rendue seulement si 'newsletter' figure
  // dans sectionOrder (le finaliste MJ v4 l'ajoute juste avant le footer).
  const Newsletter = () => (
    <section style={{ background: c.ink, padding: '88px 64px', textAlign: 'center' }}>
      <h2 style={{ fontFamily: c.fd, fontWeight: 800, fontSize: 40, letterSpacing: '-0.025em', lineHeight: 1.08, color: c.cream, margin: '0 0 12px' }}>
        2 fois par semaine, concret et gratuit
      </h2>
      <p style={{ fontFamily: c.fb, fontSize: 15, color: c.grayLight, margin: '0 0 32px' }}>
        Articles · Ressources · Info financement
      </p>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', maxWidth: 540, margin: '0 auto' }}>
        <input
          placeholder="Ton email"
          style={{
            flex: 1,
            background: 'rgba(255,255,255,0.06)',
            border: `1px solid ${c.borderDark}`,
            borderRadius: 6,
            padding: '15px 18px',
            fontFamily: c.fb,
            fontSize: 14,
            color: c.cream,
            outline: 'none',
          }}
        />
        <button
          style={{
            background: c.accent,
            color: '#FFFFFF',
            fontFamily: c.fb,
            fontSize: 14,
            fontWeight: 700,
            padding: '15px 26px',
            borderRadius: 6,
            border: 'none',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          Je m’abonne →
        </button>
      </div>
      <p style={{ fontFamily: c.fb, fontSize: 12, color: c.grayLight, margin: '18px 0 0' }}>
        2 emails/semaine max · Désinscription 1 clic · <a style={{ color: c.grayLight, textDecoration: 'underline' }}>Confidentialité</a>
      </p>
    </section>
  );

  // ── Footer — warm charcoal ──
  const Footer = () => (
    <>
      <footer
        style={{
          background: c.ink,
          padding: 56,
          display: 'grid',
          gridTemplateColumns: '1.5fr 1fr 1fr 1fr',
          gap: 56,
        }}
      >
        <div>
          <div style={{ fontFamily: c.fd, fontWeight: 800, fontSize: 19, letterSpacing: '-0.02em', color: c.cream, marginBottom: 14 }}>
            LaPasse<Hi color={c.accent}>Tech</Hi>
          </div>
          <p style={{ fontFamily: c.fb, fontSize: 13.5, color: c.grayLight, lineHeight: 1.65 }}>
            Reconversion vers les métiers du digital.<br />Sans bullshit, sans jargon, sans complexe.
          </p>
        </div>
        {[
          { h: 'S’informer', l: ['Tous les articles', 'Reconversion', 'CPF & POEI', 'Métiers du digital', 'Droit du travail'] },
          { h: 'Passer à l’action', l: ['Toutes les ressources', 'Outils IA', 'Compétences digitales', 'Télécharger le guide PDF'] },
          { h: 'LaPasseTech', l: ['Le bilan gratuit', 'À propos de Guy', 'Écrire à Guy', 'Mentions légales'] },
        ].map((col, ix) => (
          <div key={col.h}>
            <div style={{ fontFamily: c.fb, fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: c.grayLight, marginBottom: 16 }}>
              {col.h}
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {col.l.map((l, li) => (
                <li key={l}>
                  <a
                    style={{
                      fontFamily: c.fb,
                      fontSize: 14,
                      color: ix === 1 && li === col.l.length - 1 ? c.accent : c.grayLight,
                      textDecoration: 'none',
                    }}
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </footer>
      <div
        style={{
          background: c.ink,
          borderTop: `1px solid ${c.borderDark}`,
          padding: '20px 56px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <p style={{ fontFamily: c.fb, fontSize: 12, color: c.grayLight, margin: 0 }}>
          © 2026 LaPasseTech. Tous droits réservés.
        </p>
        <a style={{ fontFamily: c.fb, fontSize: 12, color: c.grayLight, textDecoration: 'none' }}>
          Mentions légales · RGPD
        </a>
      </div>
    </>
  );

  // Map section key → renderer. Lets the parent reorder/drop sections without
  // touching component bodies.
  const SECTION_MAP = {
    reconnais: Reconnais,
    manifeste: Manifeste,
    parcours: Parcours,
    guy: Guy,
    content: ContentSection,
    temoignages: Temoignages,
    bilan: BilanCTA,
    leadmagnet: LeadMagnet,
    newsletter: Newsletter,
  };
  const DEFAULT_ORDER = ['reconnais', 'manifeste', 'parcours', 'guy', 'content', 'temoignages', 'bilan', 'leadmagnet'];
  const order = sectionOrder && sectionOrder.length ? sectionOrder : DEFAULT_ORDER;

  return (
    <div style={{ background: c.paper, color: c.ink, fontFamily: c.fb, width: window.ARTBOARD_W, minHeight: '100%' }}>
      {chrome !== 'none' && <Nav />}
      {chrome !== 'none' && <Hero />}
      {order.map((key) => {
        const Comp = SECTION_MAP[key];
        if (!Comp || !show(key)) return null;
        return <Comp key={key} />;
      })}
      <Footer />
    </div>
  );
};

window.HomeCabinetWarm = HomeCabinetWarm;
