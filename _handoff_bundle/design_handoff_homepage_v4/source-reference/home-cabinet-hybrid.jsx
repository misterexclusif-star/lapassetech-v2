/* eslint-disable */
// HomeCabinetHybrid — déclinaison hybride :
//   • Header + Hero      → palette Dense (noir + jaune)
//   • Sections + Footer  → palette Warm/Clair (crème + jaune signature, italiques)
//
// Rend la grammaire éditoriale du Warm avec l'éclat assumé du Dense en
// ouverture. La cohérence accent / police / CTA traverse les deux zones via
// les mêmes tweaks que les autres maquettes Cabinet.

const HomeCabinetHybrid = ({
  tweaks = {},
  sectionOrder,
  // Launch-ready overrides forwarded to <HomeCabinetWarm>
  reconnaisVariant,
  guyVariant,
  parcoursVariant,
  bilanDuration = 5,
  bilanVariant,
  temoignageVariant,
  contentVariant,
  // Adds a thin scrolling stats bar between Nav and Hero
  showTicker = false,
}) => {
  const C = window.LPT_CONTENT;

  // Typo + CTA tweaks (mêmes que Dense/Warm)
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

  // CTA defaults to black (signature Dense) — survives tweak override
  const ctaBg = tweaks.ctaColor || '#1A1714';
  const ctaFg = (() => {
    const hex = ctaBg.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return lum > 0.6 ? '#1A1714' : '#FAF7F3';
  })();

  // Auto-pick readable label color for elements painted on the accent
  // (Hero <mark>, ticker, Nav CTA when not in navWhite mode). Honours the
  // `hiWhite` tweak as an override — when true, forces white regardless
  // of accent luminance.
  const accentTextColor = (() => {
    if (tweaks.hiWhite) return '#FAF7F3';
    const accent = tweaks.accent || '#F5C542';
    const hex = accent.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return lum < 0.5 ? '#FAF7F3' : '#1A1714';
  })();

  // Palette Dense pour le header/hero
  const c = {
    accent: tweaks.accent || '#F5C542',
    black: '#1A1714',
    cream: '#FAF7F3',
    gray: '#5F5E5A',
    grayLt: '#888780',
    grayLight: '#B5B3AB',
    border: '#D3D1C7',
    borderDark: 'rgba(255,255,255,.08)',
    fd,
    fb,
    ctaBg,
    ctaFg,
  };

  // ── Punch — accent tech secondaire (vert / jaune), aligné sur HomeCabinetWarm.
  // Sert les signaux « tech » du header/hero : point « en ligne » + flèches.
  const PUNCH_PALETTES = {
    vert: { base: '#16B877', soft: 'rgba(22,184,119,.18)' },
    jaune: { base: '#F5C542', soft: 'rgba(245,197,66,.22)' },
  };
  const pp = tweaks.punch && tweaks.punch !== 'none' ? (PUNCH_PALETTES[tweaks.punch] || PUNCH_PALETTES.vert) : null;
  c.hasPunch = !!pp;
  c.punch = pp ? pp.base : c.accent;
  c.punchSoft = pp ? pp.soft : 'transparent';
  const monoLabels = !!tweaks.monoLabels;
  c.fm = '"JetBrains Mono", "Space Grotesk", ui-monospace, monospace';

  const featured = [
    { n: '01', cat: 'Reconversion', t: '16 ans en marketing : comment j’ai basculé dans la tech à 40 ans', meta: '7 min · 4 mars 2026 · Témoignage' },
    { n: '02', cat: 'Financement', t: 'POEI, CPF, Transitions Pro : lequel choisir pour ta reconversion ?', meta: '6 min · CPF · Guide' },
    { n: '03', cat: 'Métiers du digital', t: 'Business Analyst Salesforce : le métier que personne ne t’a expliqué', meta: '8 min · Fiche métier' },
  ];

  // ── Nav (charcoal · blanc · OU crème selon tweaks `navWhite` / `navCream`) ──
  // `navCream` (activé par mjVert, inspiré de lpt-v2-mj-final) : header crème
  // #FAF7F3 + bordure noire 1.5px + CTA jaune. Header clair, micro-copie sombre.
  const navWhite = !!tweaks.navWhite;
  const navCream = !!tweaks.navCream || !!tweaks.mjVert;
  const navLight = navWhite || navCream;
  const navBg = navCream ? '#FAF7F3' : navWhite ? '#FFFFFF' : c.black;
  const navBorder = navCream ? `1.5px solid ${c.black}` : navWhite ? `1px solid ${c.border}` : `1px solid ${c.borderDark}`;
  // CTA du header : jaune sur crème, sinon comportement existant.
  const navCtaBg = navCream ? '#F5C542' : navWhite ? c.ctaBg : c.accent;
  const navCtaFg = navCream ? '#1A1714' : navWhite ? c.ctaFg : accentTextColor;
  const Nav = () => (
    <nav
      style={{
        background: navBg,
        padding: '0 40px',
        height: 64,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: navBorder,
      }}
    >
      <a style={{ fontFamily: c.fd, fontWeight: 800, fontSize: 19, letterSpacing: '-0.02em', color: navLight ? c.black : '#fff', textDecoration: 'none' }}>
        LaPasse<span style={{ color: c.accent }}>Tech</span>
      </a>
      <ul style={{ display: 'flex', gap: 32, listStyle: 'none', padding: 0, margin: 0 }}>
        {['S’informer', 'Passer à l’action', 'Le bilan', 'À propos'].map((x) => (
          <li key={x}>
            <a style={{ fontFamily: c.fb, fontSize: 14, color: navLight ? c.gray : c.grayLt, textDecoration: 'none' }}>{x}</a>
          </li>
        ))}
      </ul>
      <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
        {c.hasPunch ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontFamily: c.fm, fontSize: 11, color: navLight ? c.gray : c.grayLt }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: c.punch, boxShadow: `0 0 0 3px ${c.punchSoft}` }} />
            PassBot · en ligne
          </div>
        ) : null}
        <a
          style={{
            background: navCtaBg,
            color: navCtaFg,
            fontFamily: c.fb,
            fontSize: 14,
            fontWeight: 700,
            padding: '9px 18px',
            borderRadius: 5,
            textDecoration: 'none',
          }}
        >
          Faire mon bilan →
        </a>
      </div>
    </nav>
  );

  // ── Hero — repris du Dense, avec mark jaune ──
  const Hero = () => (
    <section style={{ borderBottom: `1px solid ${c.border}`, display: 'grid', gridTemplateColumns: '1fr 1fr', background: c.cream }}>
      <div style={{ padding: '56px 52px 48px', borderRight: `1px solid ${c.border}` }}>
        <div
          style={{
            fontFamily: monoLabels ? c.fm : c.fb,
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: monoLabels ? '0.04em' : '0.14em',
            textTransform: monoLabels ? 'lowercase' : 'uppercase',
            color: c.grayLt,
            marginBottom: 22,
          }}
        >
          {monoLabels ? '// ' : ''}Reconversion sans bullshit · Mai 2026
        </div>
        <h1
          style={{
            fontFamily: c.fd,
            fontWeight: 800,
            fontSize: 48,
            lineHeight: 1.08,
            letterSpacing: '-0.025em',
            color: c.black,
            margin: 0,
          }}
        >
          Le digital, c’est pas
          <br />
          <mark
            style={{
              background: c.accent,
              color: accentTextColor,
              padding: '2px 10px',
              fontStyle: 'normal',
              borderRadius: 2,
              boxDecorationBreak: 'clone',
              WebkitBoxDecorationBreak: 'clone',
            }}
          >
            réservé aux autres.
          </mark>
        </h1>
        <p
          style={{
            fontFamily: c.fb,
            fontSize: 16,
            color: c.gray,
            lineHeight: 1.7,
            maxWidth: 460,
            marginTop: 22,
            marginBottom: 28,
          }}
        >
          Métiers, formations, financements — tout ce que j’aurais aimé savoir avant de me reconvertir.{' '}
          <strong style={{ color: c.black, fontWeight: 600 }}>Par quelqu’un qui l’a vraiment vécu.</strong>
        </p>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 28 }}>
          <a
            style={{
              background: c.ctaBg,
              color: c.ctaFg,
              fontFamily: c.fb,
              fontSize: 14,
              fontWeight: 600,
              padding: '12px 22px',
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
              color: c.black,
              border: `1.5px solid ${c.black}`,
              padding: '11px 22px',
              borderRadius: 6,
              textDecoration: 'none',
              fontWeight: 500,
            }}
          >
            Guide gratuit · 20 pages
          </a>
        </div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {[
            [`${bilanDuration} min`, '· 100% gratuit'],
            ['CPF', 'financé à 100%'],
            ['POEI', '· CDI avant la formation'],
          ].map(([b, l]) => (
            <span
              key={b}
              style={{
                fontFamily: c.fb,
                fontSize: 12,
                color: c.gray,
                border: `1px solid ${c.border}`,
                padding: '6px 12px',
                borderRadius: 20,
                background: '#fff',
              }}
            >
              <b style={{ color: c.black, fontWeight: 600 }}>{b}</b> {l}
            </span>
          ))}
        </div>
      </div>

      {/* RIGHT — image + articles list */}
      <div style={{ display: 'flex', flexDirection: 'column', background: '#fff' }}>
        <div
          style={{
            height: 220,
            position: 'relative',
            overflow: 'hidden',
            borderBottom: `1px solid ${c.border}`,
            background: c.black,
          }}
        >
          <img
            src={C.images.guy}
            alt="Guy — fondateur"
            loading="eager"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'saturate(0.92) contrast(1.02)' }}
          />
          <div
            style={{
              position: 'absolute',
              left: 20,
              bottom: 16,
              background: c.cream,
              padding: '8px 14px',
              borderRadius: 4,
              fontFamily: c.fb,
              fontSize: 12,
            }}
          >
            <span style={{ color: c.gray }}>Guy · </span>
            <span style={{ color: c.black, fontWeight: 600 }}>16 ans marketing → Business Analyst Salesforce</span>
          </div>
          <div
            style={{
              position: 'absolute',
              top: 16,
              right: 16,
              background: c.accent,
              color: c.black,
              padding: '6px 12px',
              borderRadius: 3,
              fontFamily: c.fb,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
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
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: c.grayLt,
            padding: '14px 32px',
            borderBottom: `1px solid ${c.border}`,
          }}
        >
          À lire maintenant
        </div>
        {featured.map((a) => (
          <a
            key={a.n}
            style={{
              display: 'flex',
              gap: 18,
              alignItems: 'flex-start',
              padding: '16px 32px',
              borderBottom: `1px solid ${c.border}`,
              textDecoration: 'none',
            }}
          >
            <span
              style={{
                fontFamily: c.fd,
                fontWeight: 800,
                fontSize: 24,
                color: c.accent,
                minWidth: 30,
                lineHeight: 1,
                WebkitTextStroke: `0.6px ${c.black}`,
              }}
            >
              {a.n}
            </span>
            <div>
              <div style={{ fontFamily: c.fb, fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: c.grayLt, marginBottom: 4 }}>
                {a.cat}
              </div>
              <div style={{ fontFamily: c.fd, fontWeight: 700, fontSize: 15, color: c.black, lineHeight: 1.35, marginBottom: 4 }}>
                {a.t}
              </div>
              <div style={{ fontFamily: c.fb, fontSize: 11, color: c.grayLt }}>{a.meta}</div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );

  // ── Ticker (optionnel) — stats clés en bandeau défilant sous la nav ──
  // Affiché uniquement en mode launch. Marquee CSS, hover-pause.
  const Ticker = () => {
    const items = [
      '8 métiers du digital accessibles sans coder',
      'POEI · CDI garanti avant la formation',
      'CPF jusqu’à 100% financé',
      `PassBot · bilan en ${bilanDuration} minutes`,
      'Transitions Pro · jusqu’à 24 mois finançables',
      'Sans diplôme info · sans réseau',
    ];
    // Duplicate the run twice so the scroll loops seamlessly.
    const run = (
      <div style={{ display: 'flex', flexShrink: 0, gap: 0 }}>
        {items.map((t, i) => (
          <span
            key={i}
            style={{
              fontFamily: c.fb,
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: accentTextColor,
              padding: '0 28px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              whiteSpace: 'nowrap',
            }}
          >
            <span style={{ color: c.accent, fontSize: 8 }}>◆</span>
            {t}
          </span>
        ))}
      </div>
    );
    return (
      <>
        <style>{`@keyframes lpt-tick { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
        <div
          style={{
            background: c.accent,
            borderBottom: `1px solid ${c.black}`,
            height: 40,
            overflow: 'hidden',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              width: 'max-content',
              animation: 'lpt-tick 50s linear infinite',
            }}
          >
            {run}
            {run}
          </div>
        </div>
      </>
    );
  };

  return (
    <div style={{ background: '#fff', color: c.black, fontFamily: c.fb, width: window.ARTBOARD_W, minHeight: '100%' }}>
      <Nav />
      {showTicker && <Ticker />}
      <Hero />
      {/* All other sections + footer delegated to Warm, with chrome stripped */}
      <HomeCabinetWarm
        tweaks={tweaks}
        chrome="none"
        sectionOrder={sectionOrder}
        reconnaisVariant={reconnaisVariant}
        guyVariant={guyVariant}
        parcoursVariant={parcoursVariant}
        bilanDuration={bilanDuration}
        bilanVariant={bilanVariant}
        temoignageVariant={temoignageVariant}
        contentVariant={contentVariant}
      />
    </div>
  );
};

window.HomeCabinetHybrid = HomeCabinetHybrid;
