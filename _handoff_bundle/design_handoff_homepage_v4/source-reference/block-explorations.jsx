/* eslint-disable */
// block-explorations.jsx
// Self-contained alternative renderings of two key V2 sections:
//   • Reconnais — 3 variants (A liste / B illus / C photos)
//   • Content    — 3 variants (A default / B covers / C humans bg)
// Each component renders its block on a paper background, sized to fit a
// design-canvas artboard exactly (no surrounding chrome).

// ── Shared tokens (mirror HomeCabinetWarm) ──
const blockTokens = (tweaks = {}) => {
  const accentMap = {
    '#F5C542': { deep: '#8A6307', soft: '#FFF3C7' },
    '#E0AC2B': { deep: '#7C5A08', soft: '#FBEFC9' },
    '#7E9F6E': { deep: '#3D5230', soft: '#E7EFE0' },
    '#A04141': { deep: '#5E1E1E', soft: '#F2DEDE' },
    '#1E4D3A': { deep: '#0F2A20', soft: '#DCE9E2' },
    '#6B4D8C': { deep: '#3D2A5C', soft: '#EDE4F5' },
    '#9C5A2C': { deep: '#5C2E10', soft: '#F2E2CC' },
    '#7C5A2A': { deep: '#4A350F', soft: '#EDDFC2' },
  };
  const accent = tweaks.accent || '#F5C542';
  const ap = accentMap[accent] || accentMap['#F5C542'];
  // Luminance check — dark accents (bordeaux, vert foncé, violet, cacao) need
  // white text on top of the BlockHi italic-serif so it stays readable.
  const h = accent.replace('#', '');
  const r = parseInt(h.substr(0, 2), 16);
  const g = parseInt(h.substr(2, 2), 16);
  const b = parseInt(h.substr(4, 2), 16);
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  const accentTextLight = lum < 0.5;
  return {
    accent,
    accentDeep: ap.deep,
    accentSoft: ap.soft,
    accentTextLight,
    ink: '#2A2520',
    paper: '#FFFFFF',
    cream: '#F8F4EB',
    beige: '#EFE6D2',
    border: '#E5DDC9',
    borderSoft: '#EFE9D9',
    gray: '#6B655D',
    grayLt: '#9A9388',
    fd: '"Cabinet Grotesk", "Bricolage Grotesque", system-ui, sans-serif',
    fb: '"DM Sans", system-ui, sans-serif',
    fs: '"Instrument Serif", "Cormorant Garamond", serif',
  };
};

// Italic-serif highlight (same idiom as HomeCabinetWarm)
const BlockHi = ({ children, c }) => (
  <em style={{ fontFamily: c.fs, fontStyle: 'italic', fontWeight: 400, color: c.accentDeep, fontSize: '1.06em' }}>
    {children}
  </em>
);

const BlockEyebrow = ({ children, c }) => (
  <span
    style={{
      fontFamily: c.fb,
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
      color: c.accentDeep,
      background: c.accentSoft,
      display: 'inline-block',
      padding: '5px 11px',
      borderRadius: 3,
      marginBottom: 16,
    }}
  >
    {children}
  </span>
);

// ── Editorial-style flat avatars (SVG, no cartoon) ──
// Each portrait = simple geometric silhouette with a subtle skin-tone fill,
// hair shape, optional accessory (glasses/headscarf/beard). Inspired by
// Le Monde and NYT magazine illustrations — adult-oriented, sober.
const PersonaAvatar = ({ variant, c, size = 80 }) => {
  const variants = {
    // ── Sophie · 38, ex-commerciale ──
    sophie: {
      skin: '#E8C4A8',
      hair: '#3A2418',
      bg: c.beige,
      d: (
        <>
          {/* hair back */}
          <path d="M 50 28 Q 30 30 28 50 L 28 64 L 32 60 Q 30 45 38 38 Q 50 30 62 38 Q 70 45 68 60 L 72 64 L 72 50 Q 70 30 50 28 Z" fill="#3A2418" />
          {/* face */}
          <ellipse cx="50" cy="50" rx="18" ry="22" fill="#E8C4A8" />
          {/* hair front */}
          <path d="M 35 38 Q 40 32 50 32 Q 60 32 65 38 Q 60 36 50 36 Q 40 36 35 38 Z" fill="#3A2418" />
          {/* eyes */}
          <ellipse cx="43" cy="48" rx="1.5" ry="2" fill="#2A2520" />
          <ellipse cx="57" cy="48" rx="1.5" ry="2" fill="#2A2520" />
          {/* mouth */}
          <path d="M 46 58 Q 50 60 54 58" stroke="#8a5a44" strokeWidth="1" fill="none" strokeLinecap="round" />
          {/* shoulders */}
          <path d="M 25 84 Q 35 72 50 72 Q 65 72 75 84 L 75 100 L 25 100 Z" fill={c.accent} />
        </>
      ),
    },
    // ── Karim · 42, ex-livreur ──
    karim: {
      skin: '#B58769',
      bg: c.cream,
      d: (
        <>
          {/* short hair */}
          <path d="M 30 44 Q 30 28 50 28 Q 70 28 70 44 L 68 38 Q 50 32 32 38 Z" fill="#1c120a" />
          <ellipse cx="50" cy="50" rx="18" ry="22" fill="#B58769" />
          {/* beard */}
          <path d="M 35 58 Q 40 68 50 68 Q 60 68 65 58 Q 60 65 50 65 Q 40 65 35 58 Z" fill="#1c120a" opacity="0.85" />
          <ellipse cx="43" cy="48" rx="1.5" ry="2" fill="#2A2520" />
          <ellipse cx="57" cy="48" rx="1.5" ry="2" fill="#2A2520" />
          {/* glasses */}
          <circle cx="43" cy="48" r="4.5" stroke="#2A2520" strokeWidth="1" fill="none" />
          <circle cx="57" cy="48" r="4.5" stroke="#2A2520" strokeWidth="1" fill="none" />
          <line x1="47.5" y1="48" x2="52.5" y2="48" stroke="#2A2520" strokeWidth="1" />
          {/* shoulders */}
          <path d="M 25 84 Q 35 72 50 72 Q 65 72 75 84 L 75 100 L 25 100 Z" fill="#2A2520" />
        </>
      ),
    },
    // ── Aïcha · 34, ex-assistante ──
    aicha: {
      skin: '#8B5E3C',
      bg: c.beige,
      d: (
        <>
          {/* hijab */}
          <path d="M 20 50 Q 20 22 50 22 Q 80 22 80 50 L 80 84 Q 70 76 50 76 Q 30 76 20 84 Z" fill="#5C4033" />
          {/* face */}
          <ellipse cx="50" cy="52" rx="15" ry="18" fill="#8B5E3C" />
          {/* eyes */}
          <ellipse cx="44" cy="50" rx="1.5" ry="2" fill="#2A2520" />
          <ellipse cx="56" cy="50" rx="1.5" ry="2" fill="#2A2520" />
          {/* mouth */}
          <path d="M 46 60 Q 50 62 54 60" stroke="#5C4033" strokeWidth="1" fill="none" strokeLinecap="round" />
          {/* shoulders */}
          <path d="M 25 84 Q 35 72 50 72 Q 65 72 75 84 L 75 100 L 25 100 Z" fill={c.accent} />
        </>
      ),
    },
    // ── Thomas · 45, ex-prof ──
    thomas: {
      skin: '#F0D5BD',
      bg: c.cream,
      d: (
        <>
          {/* receding hair */}
          <path d="M 35 36 Q 35 30 50 30 Q 65 30 65 36 Q 60 34 50 34 Q 40 34 35 36 Z" fill="#7d5a3c" />
          <ellipse cx="50" cy="50" rx="18" ry="22" fill="#F0D5BD" />
          {/* eyes */}
          <ellipse cx="43" cy="48" rx="1.5" ry="2" fill="#2A2520" />
          <ellipse cx="57" cy="48" rx="1.5" ry="2" fill="#2A2520" />
          {/* glasses */}
          <rect x="38" y="44" width="10" height="8" rx="1.5" stroke="#2A2520" strokeWidth="1.2" fill="none" />
          <rect x="52" y="44" width="10" height="8" rx="1.5" stroke="#2A2520" strokeWidth="1.2" fill="none" />
          <line x1="48" y1="48" x2="52" y2="48" stroke="#2A2520" strokeWidth="1.2" />
          {/* mouth */}
          <path d="M 46 60 Q 50 62 54 60" stroke="#8a5a44" strokeWidth="1" fill="none" strokeLinecap="round" />
          {/* shoulders */}
          <path d="M 25 84 Q 35 72 50 72 Q 65 72 75 84 L 75 100 L 25 100 Z" fill={c.accentDeep} />
        </>
      ),
    },
  };
  const v = variants[variant];
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} style={{ display: 'block', borderRadius: '50%', background: v.bg, border: `1px solid ${c.border}` }}>
      {v.d}
    </svg>
  );
};

// ── Background humans silhouette (low-opacity scene) ──
// 5 overlapping silhouettes spanning the width — diverse postures/heights.
// Renders as a faint backdrop to humanize text headers.
const HumansBackdrop = ({ c, opacity = 0.08 }) => (
  <svg
    viewBox="0 0 1200 220"
    preserveAspectRatio="xMidYMid slice"
    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity }}
  >
    {/* 5 figures with shoulders + heads, varied heights */}
    {[
      { x: 80,   h: 160, dy: 0 },
      { x: 280,  h: 180, dy: -10 },
      { x: 500,  h: 150, dy: 8 },
      { x: 720,  h: 175, dy: -4 },
      { x: 920,  h: 165, dy: 4 },
      { x: 1100, h: 170, dy: 0 },
    ].map((f, i) => (
      <g key={i} transform={`translate(${f.x}, ${f.dy})`}>
        <circle cx="0" cy={220 - f.h - 35} r="32" fill={c.ink} />
        <path
          d={`M -75 220 Q -60 ${220 - f.h + 30} 0 ${220 - f.h + 10} Q 60 ${220 - f.h + 30} 75 220 Z`}
          fill={c.ink}
        />
      </g>
    ))}
  </svg>
);

// ── D · Studyrama-style cartoon avatars (DiceBear avataaars API) ──
// Note: cartoon style is intentionally "too young" for the audience (per user feedback),
// included for direct comparison with the editorial Variante B.
const ReconnaisStudyrama = ({ tweaks = {} }) => {
  const c = blockTokens(tweaks);
  // DiceBear avataaars — uses HEX for colors (no #, 6 chars) and ENUM names for top/facialHair/accessories.
  // Valid `top` values include: bob, longButNotTooLong, straight01, shortFlat, shortRound, hijab, etc.
  // Valid `accessories`: prescription01, prescription02, round, sunglasses, wayfarers, eyepatch.
  // Valid `facialHair`: beardLight, beardMajestic, beardMedium, moustacheFancy, moustacheMagnum.
  const personas = [
    {
      seed: 'Sophie-marketing',
      params: 'top=longButNotTooLong&hairColor=2c1810&skinColor=fdbcb4',
      n: 'Sophie · 38 ans',
      was: 'Commerciale 16 ans',
      q: 'Suis-je faite pour\nles métiers du digital ?',
    },
    {
      seed: 'Karim-livreur',
      params: 'top=shortFlat&hairColor=0e0e0e&skinColor=8d5524&facialHair=beardLight&accessories=prescription02',
      n: 'Karim · 42 ans',
      was: 'Livreur 4 ans',
      q: 'Suis-je fait pour\nla data sans coder ?',
    },
    {
      seed: 'Aicha-assistante',
      params: 'top=hijab&skinColor=ae5d29',
      n: 'Aïcha · 34 ans',
      was: 'Assistante 8 ans',
      q: 'Suis-je faite pour\nle no-code ?',
    },
    {
      seed: 'Thomas-prof',
      params: 'top=shortFlat&hairColor=a55728&skinColor=edb98a&accessories=prescription01',
      n: 'Thomas · 45 ans',
      was: 'Prof 18 ans',
      q: 'Suis-je fait pour\nle CRM Salesforce ?',
    },
  ];
  // DiceBear backgroundColor is taken from the design-system accentSoft (cream/sand)
  // so the avatar disc and the card ochre form a tonal pair.
  const discBg = c.accentSoft.replace('#', '');
  const url = (p) =>
    `https://api.dicebear.com/9.x/avataaars/svg?seed=${encodeURIComponent(p.seed)}&${p.params}&radius=50&backgroundColor=${discBg}`;

  return (
    <section style={{ background: c.paper, fontFamily: c.fb, color: c.ink, width: window.ARTBOARD_W, minHeight: '100%' }}>
      <div style={{ padding: '72px 64px 32px' }}>
        <BlockEyebrow c={c}>Pour qui · Variante D · Cartoon (style Studyrama)</BlockEyebrow>
        <h2 style={{ fontFamily: c.fd, fontWeight: 800, fontSize: 44, letterSpacing: '-0.025em', lineHeight: 1.05, margin: 0, marginBottom: 14 }}>
          Tu te poses <BlockHi c={c}>la même question&nbsp;?</BlockHi>
        </h2>
        <p style={{ fontFamily: c.fb, fontSize: 15, color: c.gray, lineHeight: 1.65, maxWidth: 560, margin: 0 }}>
          Style assumément cartoon — chaleureux, accessible. À réserver si on cible aussi des jeunes en réorientation post-bac.
        </p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, padding: '0 64px 80px' }}>
        {personas.map((p) => (
          <div
            key={p.seed}
            style={{
              // Card bg: design-system deep ochre (replaces the original Studyrama-blue
              // #3F6FB3). Falls back to ink (#2A2520) if the user picks a light accent
              // so the contrast vs. the cream avatar disc stays high.
              background: c.accentDeep,
              borderRadius: 12,
              padding: '28px 22px 26px',
              color: '#fff',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 16,
              textAlign: 'center',
              minHeight: 320,
            }}
          >
            <div
              style={{
                width: 110,
                height: 110,
                borderRadius: '50%',
                background: c.accentSoft,
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src={url(p)}
                alt={p.n}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ fontFamily: c.fb, fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', opacity: 0.85, color: c.accentSoft }}>
              {p.n}
            </div>
            <div style={{ fontFamily: c.fb, fontSize: 12.5, opacity: 0.75, marginTop: -10, color: c.accentSoft }}>{p.was}</div>
            <div
              style={{
                fontFamily: c.fd,
                fontWeight: 700,
                fontSize: 18,
                letterSpacing: '-0.01em',
                lineHeight: 1.28,
                color: '#fff',
                whiteSpace: 'pre-line',
                marginTop: 4,
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {p.q}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// ── E · Pixar 3D-style avatars ──
// Uses AI-generated Pixar-style portraits (Gemini), copied locally to
// assets/personas/. Each image is masked into a circle, with a soft drop
// shadow, matching the original artboard's avatar treatment.
const Pixar3DAvatar = ({ variant, size = 140 }) => {
  const srcMap = {
    sophie: 'assets/personas/sophie.png',
    karim:  'assets/personas/karim.png',
    aicha:  'assets/personas/aicha.png',
    thomas: 'assets/personas/thomas.png',
  };
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        overflow: 'hidden',
        position: 'relative',
        boxShadow:
          '0 1px 0 rgba(0,0,0,0.04), 0 8px 24px -8px rgba(40,30,20,0.18), inset 0 0 0 1px rgba(0,0,0,0.06)',
        background: '#F4ECDF',
      }}
    >
      <img
        src={srcMap[variant]}
        alt={variant}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          // Slightly bias toward the face (top half of the portrait)
          objectPosition: 'center 18%',
          display: 'block',
        }}
      />
    </div>
  );
};

// ── Legacy SVG Pixar avatar (kept for reference / fallback testing) ──
const Pixar3DAvatarSVG = ({ variant, size = 130 }) => {
  // Common gradient definitions reused per face
  const variants = {
    sophie: {
      bg: '#FCE6BD',
      skinLight: '#FBD7B5',
      skinDark: '#D48F66',
      hair: '#3a2418',
      hairHL: '#5a3a28',
      shirt: '#E8A640',
    },
    karim: {
      bg: '#E5D8FF',
      skinLight: '#C8956C',
      skinDark: '#6E4124',
      hair: '#1a0e08',
      hairHL: '#2e1a0e',
      shirt: '#3B4B6E',
    },
    aicha: {
      bg: '#FFD5DC',
      skinLight: '#B8814E',
      skinDark: '#5C3514',
      hair: null, // hijab covers
      hijab: '#7A4B86',
      hijabHL: '#9468A0',
      shirt: '#7A4B86',
    },
    thomas: {
      bg: '#D4ECCF',
      skinLight: '#FCDAB4',
      skinDark: '#C99272',
      hair: '#a55728',
      hairHL: '#c9763a',
      shirt: '#5A7BB0',
    },
  };
  const v = variants[variant];
  const id = `px-${variant}`;
  return (
    <svg viewBox="0 0 160 160" width={size} height={size} style={{ display: 'block', borderRadius: '50%', overflow: 'hidden' }}>
      <defs>
        {/* Background bubble */}
        <radialGradient id={`${id}-bg`} cx="35%" cy="30%">
          <stop offset="0%" stopColor={v.bg} stopOpacity="1" />
          <stop offset="100%" stopColor={v.bg} stopOpacity="0.6" />
        </radialGradient>
        {/* Skin (top-left highlight → bottom-right shadow) */}
        <radialGradient id={`${id}-skin`} cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
          <stop offset="35%" stopColor={v.skinLight} stopOpacity="1" />
          <stop offset="100%" stopColor={v.skinDark} stopOpacity="1" />
        </radialGradient>
        {/* Hair gradient */}
        {v.hair && (
          <radialGradient id={`${id}-hair`} cx="30%" cy="25%" r="75%">
            <stop offset="0%" stopColor={v.hairHL} />
            <stop offset="100%" stopColor={v.hair} />
          </radialGradient>
        )}
        {/* Hijab gradient */}
        {v.hijab && (
          <radialGradient id={`${id}-hijab`} cx="30%" cy="25%" r="80%">
            <stop offset="0%" stopColor={v.hijabHL} />
            <stop offset="100%" stopColor={v.hijab} />
          </radialGradient>
        )}
        {/* Shirt */}
        <linearGradient id={`${id}-shirt`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={v.shirt} />
          <stop offset="100%" stopColor={v.shirt} stopOpacity="0.7" />
        </linearGradient>
        {/* Cheek blush */}
        <radialGradient id={`${id}-cheek`}>
          <stop offset="0%" stopColor="#FF8B8B" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#FF8B8B" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Bubble background */}
      <rect width="160" height="160" fill={`url(#${id}-bg)`} />

      {/* Hair back (or hijab) */}
      {variant === 'sophie' && (
        <ellipse cx="80" cy="82" rx="50" ry="55" fill={`url(#${id}-hair)`} />
      )}
      {variant === 'thomas' && (
        <path d="M 38 70 Q 38 50 80 50 Q 122 50 122 70 L 122 88 Q 122 65 80 65 Q 38 65 38 88 Z" fill={`url(#${id}-hair)`} />
      )}
      {variant === 'karim' && (
        <path d="M 38 70 Q 38 42 80 42 Q 122 42 122 70 L 120 60 Q 100 50 80 50 Q 60 50 40 60 Z" fill={`url(#${id}-hair)`} />
      )}
      {variant === 'aicha' && (
        <path d="M 30 78 Q 30 30 80 30 Q 130 30 130 78 L 130 130 Q 110 118 80 118 Q 50 118 30 130 Z" fill={`url(#${id}-hijab)`} />
      )}

      {/* Shoulders/shirt */}
      <path d="M 25 160 Q 35 135 80 135 Q 125 135 135 160 Z" fill={`url(#${id}-shirt)`} />
      {/* Neck */}
      <ellipse cx="80" cy="128" rx="14" ry="12" fill={`url(#${id}-skin)`} />

      {/* Face */}
      <ellipse cx="80" cy="88" rx="36" ry="42" fill={`url(#${id}-skin)`} />

      {/* Hair front (covers top of face) */}
      {variant === 'sophie' && (
        <path d="M 50 70 Q 60 50 80 50 Q 100 50 110 70 Q 102 64 80 64 Q 58 64 50 70 Z" fill={`url(#${id}-hair)`} />
      )}
      {variant === 'karim' && (
        <path d="M 50 70 Q 60 56 80 56 Q 100 56 110 70 Q 102 66 80 66 Q 58 66 50 70 Z" fill={`url(#${id}-hair)`} />
      )}
      {variant === 'thomas' && (
        <path d="M 55 72 Q 65 64 80 64 Q 95 64 105 72 Q 95 68 80 68 Q 65 68 55 72 Z" fill={`url(#${id}-hair)`} opacity="0.85" />
      )}

      {/* Cheeks */}
      <ellipse cx="60" cy="96" rx="7" ry="5" fill={`url(#${id}-cheek)`} />
      <ellipse cx="100" cy="96" rx="7" ry="5" fill={`url(#${id}-cheek)`} />

      {/* Eyes — oversized Pixar style with white catchlight */}
      <g>
        {/* eye whites */}
        <ellipse cx="66" cy="86" rx="7" ry="8.5" fill="#fff" />
        <ellipse cx="94" cy="86" rx="7" ry="8.5" fill="#fff" />
        {/* iris */}
        <ellipse cx="67" cy="87" rx="4" ry="5" fill="#3a4d3a" />
        <ellipse cx="95" cy="87" rx="4" ry="5" fill="#3a4d3a" />
        {/* pupil */}
        <ellipse cx="67.5" cy="88" rx="2" ry="3" fill="#1a1a1a" />
        <ellipse cx="95.5" cy="88" rx="2" ry="3" fill="#1a1a1a" />
        {/* catchlight */}
        <circle cx="68.5" cy="85" r="1.6" fill="#fff" />
        <circle cx="96.5" cy="85" r="1.6" fill="#fff" />
        {/* eyebrows */}
        {variant === 'aicha' ? (
          <>
            <path d="M 60 76 Q 66 73 72 76" stroke="#3a2418" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M 88 76 Q 94 73 100 76" stroke="#3a2418" strokeWidth="2" fill="none" strokeLinecap="round" />
          </>
        ) : (
          <>
            <path d="M 60 76 Q 66 73 72 76" stroke={v.hair || '#3a2418'} strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M 88 76 Q 94 73 100 76" stroke={v.hair || '#3a2418'} strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </>
        )}
      </g>

      {/* Glasses for Karim & Thomas */}
      {(variant === 'karim' || variant === 'thomas') && (
        <g stroke="#1a1a1a" strokeWidth="1.5" fill="none">
          <ellipse cx="66" cy="87" rx="10" ry="10" />
          <ellipse cx="94" cy="87" rx="10" ry="10" />
          <line x1="76" y1="87" x2="84" y2="87" />
          <path d="M 56 87 L 50 86" />
          <path d="M 104 87 L 110 86" />
        </g>
      )}

      {/* Beard for Karim */}
      {variant === 'karim' && (
        <path d="M 56 102 Q 60 122 80 124 Q 100 122 104 102 Q 92 116 80 116 Q 68 116 56 102 Z" fill={`url(#${id}-hair)`} opacity="0.9" />
      )}

      {/* Nose (subtle) */}
      <path d="M 78 96 Q 80 102 82 96" stroke={v.skinDark} strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.55" />

      {/* Mouth — soft smile */}
      <path d="M 70 110 Q 80 116 90 110" stroke="#a23a3a" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 72 111 Q 80 114 88 111" fill="#d8696e" />

      {/* Glossy face highlight (top-left) */}
      <ellipse cx="68" cy="75" rx="10" ry="6" fill="#fff" opacity="0.18" />
    </svg>
  );
};

const ReconnaisPixar = ({ tweaks = {} }) => {
  const c = blockTokens(tweaks);
  const personas = [
    { v: 'sophie', n: 'Sophie · 38 ans',  was: 'Commerciale 16 ans',    q: 'Suis-je faite pour\nles métiers du digital ?' },
    { v: 'karim',  n: 'Malik · 42 ans',    was: 'Gestionnaire de stock', q: 'Suis-je fait pour\nla data sans coder ?' },
    { v: 'aicha',  n: 'Aïcha · 34 ans',    was: 'Assistante 8 ans',      q: 'Suis-je faite pour\nle no-code ?' },
    { v: 'thomas', n: 'Thomas · 45 ans',   was: 'Prof 18 ans',           q: 'Suis-je fait pour\nle CRM Salesforce ?' },
  ];
  return (
    <section style={{ background: c.paper, fontFamily: c.fb, color: c.ink, width: window.ARTBOARD_W, minHeight: '100%' }}>
      <div style={{ padding: '72px 64px 32px' }}>
        <BlockEyebrow c={c}>Pour qui · Variante E1 · 3D Pixar-style — questions perso</BlockEyebrow>
        <h2 style={{ fontFamily: c.fd, fontWeight: 800, fontSize: 44, letterSpacing: '-0.025em', lineHeight: 1.05, margin: 0, marginBottom: 14 }}>
          Tu te poses <BlockHi c={c}>la même question&nbsp;?</BlockHi>
        </h2>
        <p style={{ fontFamily: c.fb, fontSize: 15, color: c.gray, lineHeight: 1.65, maxWidth: 560, margin: 0 }}>
          Style 3D animé — chaleur maximale, légère infantilisation possible. Très engageant sur mobile et social.
        </p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18, padding: '0 64px 80px' }}>
        {personas.map((p) => (
          <div
            key={p.v}
            style={{
              background: c.paper,
              borderRadius: 18,
              padding: '28px 22px 28px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 14,
              textAlign: 'center',
              minHeight: 360,
              border: `1px solid ${c.border}`,
              boxShadow: '0 12px 32px -16px rgba(42,37,32,0.18)',
            }}
          >
            <Pixar3DAvatar variant={p.v} size={140} />
            <div style={{ fontFamily: c.fb, fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: c.grayLt, marginTop: 4 }}>
              {p.n}
            </div>
            <div style={{ fontFamily: c.fb, fontSize: 12.5, color: c.gray, marginTop: -8 }}>{p.was}</div>
            <div
              style={{
                fontFamily: c.fd,
                fontWeight: 700,
                fontSize: 18,
                letterSpacing: '-0.01em',
                lineHeight: 1.28,
                color: c.ink,
                whiteSpace: 'pre-line',
                marginTop: 6,
              }}
            >
              {p.q}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// ── E2 · Pixar 3D-style — phrases éditoriales ──
// Même grille de personas que E1, mais chaque carte porte une des 4 phrases
// du bloc "Tu te reconnais ici" (Variante A), avec la ligne de clôture
// en bas. Le mot fort de chaque phrase est mis en italic-serif (BlockHi).
const ReconnaisPixarPhrases = ({ tweaks = {} }) => {
  const c = blockTokens(tweaks);
  const personas = [
    {
      v: 'sophie',
      n: 'Sophie · 38 ans',
      was: 'Commerciale 16 ans',
      lead: 'Tu bosses depuis 10 ans dans un métier qui',
      em:   't’épuise.',
    },
    {
      v: 'karim',
      n: 'Malik · 42 ans',
      was: 'Gestionnaire de stock',
      lead: 'Tu entends parler de reconversion mais tu ne sais',
      em:   'pas si c’est pour toi.',
    },
    {
      v: 'aicha',
      n: 'Aïcha · 34 ans',
      was: 'Assistante 8 ans',
      lead: 'Tu veux changer mais le digital te semble',
      em:   'réservé à d’autres.',
    },
    {
      v: 'thomas',
      n: 'Thomas · 45 ans',
      was: 'Prof 18 ans',
      lead: 'Tu as des droits CPF mais tu ne sais',
      em:   'qu’en faire.',
    },
  ];
  return (
    <section style={{ background: c.paper, fontFamily: c.fb, color: c.ink, width: window.ARTBOARD_W, minHeight: '100%' }}>
      <div style={{ padding: '72px 64px 32px' }}>
        <BlockEyebrow c={c}>Pour qui · Variante E2 · 3D Pixar-style — phrases éditoriales</BlockEyebrow>
        <h2 style={{ fontFamily: c.fd, fontWeight: 800, fontSize: 44, letterSpacing: '-0.025em', lineHeight: 1.05, margin: 0, marginBottom: 14 }}>
          Tu te reconnais <BlockHi c={c}>ici&nbsp;?</BlockHi>
        </h2>
        <p style={{ fontFamily: c.fb, fontSize: 15, color: c.gray, lineHeight: 1.65, maxWidth: 600, margin: 0 }}>
          Personnages 3D + texte éditorial. La chaleur de l’illustré combinée à la voix directe du bloc original.
        </p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18, padding: '0 64px 28px' }}>
        {personas.map((p) => (
          <div
            key={p.v}
            style={{
              background: c.paper,
              borderRadius: 18,
              padding: '28px 22px 28px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 14,
              textAlign: 'center',
              minHeight: 400,
              border: `1px solid ${c.border}`,
              boxShadow: '0 12px 32px -16px rgba(42,37,32,0.18)',
            }}
          >
            <Pixar3DAvatar variant={p.v} size={140} />
            <div style={{ fontFamily: c.fb, fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: c.grayLt, marginTop: 4 }}>
              {p.n}
            </div>
            <div style={{ fontFamily: c.fb, fontSize: 12.5, color: c.gray, marginTop: -8 }}>{p.was}</div>
            <div
              style={{
                fontFamily: c.fd,
                fontWeight: 700,
                fontSize: 17,
                letterSpacing: '-0.01em',
                lineHeight: 1.32,
                color: c.ink,
                marginTop: 6,
              }}
            >
              {p.lead} <BlockHi c={c}>{p.em}</BlockHi>
            </div>
          </div>
        ))}
      </div>
      {/* Clôture */}
      <div style={{ padding: '8px 64px 80px', textAlign: 'center' }}>
        <p
          style={{
            fontFamily: c.fd,
            fontWeight: 600,
            fontSize: 19,
            letterSpacing: '-0.01em',
            color: c.ink,
            margin: 0,
          }}
        >
          Si une seule de ces phrases résonne, <BlockHi c={c}>tu es au bon endroit.</BlockHi>
        </p>
      </div>
    </section>
  );
};

// ── E3 · Pixar 3D-style — questions Variante B (freins reconversion) ──
// Même grille de personas (Sophie / Malik / Aïcha / Thomas), mais cette fois
// chaque carte porte une des 4 questions "freins" du bloc B (âge, diplôme,
// financement, capacité d'apprendre). Plus universelles que les questions
// métier-spécifique d'E1.
const ReconnaisPixarFreins = ({ tweaks = {} }) => {
  const c = blockTokens(tweaks);
  const personas = [
    { v: 'sophie', n: 'Sophie · 38 ans',  was: 'Commerciale 16 ans',    q: 'Suis-je trop vieille\npour me reconvertir ?' },
    { v: 'karim',  n: 'Malik · 42 ans',    was: 'Gestionnaire de stock', q: 'Puis-je entrer dans la\ntech sans diplôme ?' },
    { v: 'aicha',  n: 'Aïcha · 34 ans',    was: 'Assistante 8 ans',      q: 'Comment financer ma\nformation sans me ruiner ?' },
    { v: 'thomas', n: 'Thomas · 45 ans',   was: 'Prof 18 ans',           q: 'Suis-je capable d’apprendre\nà coder à mon âge ?' },
  ];
  return (
    <section style={{ background: c.paper, fontFamily: c.fb, color: c.ink, width: window.ARTBOARD_W, minHeight: '100%' }}>
      <div style={{ padding: '72px 64px 32px' }}>
        <BlockEyebrow c={c}>{tweaks.freinsTitle ? 'Pour qui' : 'Pour qui · Variante E3 · 3D Pixar-style — freins reconversion'}</BlockEyebrow>
        <h2 style={{ fontFamily: c.fd, fontWeight: 800, fontSize: 44, letterSpacing: '-0.025em', lineHeight: 1.05, margin: 0, marginBottom: 14 }}>
          {tweaks.freinsTitle ? (
            <>Tu te poses <BlockHi c={c}>la même question&nbsp;?</BlockHi></>
          ) : (
            <>Et toi, <BlockHi c={c}>qu’est-ce qui te bloque&nbsp;?</BlockHi></>
          )}
        </h2>
        <p style={{ fontFamily: c.fb, fontSize: 15, color: c.gray, lineHeight: 1.65, maxWidth: 600, margin: 0 }}>
          {tweaks.freinsTitle
            ? 'Quatre doutes que tout le monde garde pour soi. Tu vas trouver une réponse à chacun ici.'
            : 'Les 4 freins les plus fréquents — incarnés par des personnages 3D. Plus universel que les questions métier d’E1.'}
        </p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18, padding: '0 64px 80px' }}>
        {personas.map((p) => (
          <div
            key={p.v}
            style={{
              background: c.paper,
              borderRadius: 18,
              padding: '28px 22px 28px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 14,
              textAlign: 'center',
              minHeight: 380,
              border: `1px solid ${c.border}`,
              boxShadow: '0 12px 32px -16px rgba(42,37,32,0.18)',
            }}
          >
            <Pixar3DAvatar variant={p.v} size={140} />
            <div style={{ fontFamily: c.fb, fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: c.grayLt, marginTop: 4 }}>
              {p.n}
            </div>
            <div style={{ fontFamily: c.fb, fontSize: 12.5, color: c.gray, marginTop: -8 }}>{p.was}</div>
            <div
              style={{
                fontFamily: c.fd,
                fontWeight: 700,
                fontSize: 18,
                letterSpacing: '-0.01em',
                lineHeight: 1.28,
                color: c.ink,
                whiteSpace: 'pre-line',
                marginTop: 6,
              }}
            >
              {p.q}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

Object.assign(window, {
  ReconnaisStudyrama,
  ReconnaisPixar,
  ReconnaisPixarPhrases,
  ReconnaisPixarFreins,
  Pixar3DAvatar,
});

// ── A · Liste éditoriale (reference / V2 actuel) ──
const ReconnaisListe = ({ tweaks = {} }) => {
  const c = blockTokens(tweaks);
  const items = [
    { lead: 'Tu bosses depuis 10 ans dans un métier qui', em: 't’épuise.' },
    { lead: 'Tu entends parler de reconversion mais tu ne sais', em: 'pas si c’est pour toi.' },
    { lead: 'Tu veux changer mais le digital te semble', em: 'réservé à d’autres.' },
    { lead: 'Tu as des droits CPF mais tu ne sais', em: 'qu’en faire.' },
  ];
  return (
    <section style={{ background: c.paper, fontFamily: c.fb, color: c.ink, width: window.ARTBOARD_W, minHeight: '100%' }}>
      <div style={{ padding: '72px 64px 32px' }}>
        <BlockEyebrow c={c}>Pour qui · Variante A · Liste éditoriale</BlockEyebrow>
        <h2 style={{ fontFamily: c.fd, fontWeight: 800, fontSize: 44, letterSpacing: '-0.025em', lineHeight: 1.05, margin: 0, marginBottom: 14 }}>
          Tu te reconnais <BlockHi c={c}>ici&nbsp;?</BlockHi>
        </h2>
        <p style={{ fontFamily: c.fb, fontSize: 15, color: c.gray, lineHeight: 1.65, maxWidth: 560, margin: 0 }}>
          LaPasseTech parle à celles et ceux qui voient le digital de loin et veulent y entrer — sans qu’on leur fasse la courte échelle.
        </p>
      </div>
      <div style={{ padding: '0 64px 80px', maxWidth: 980 }}>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {items.map((it, i) => (
            <li
              key={i}
              style={{
                padding: '28px 0 30px',
                borderTop: `1px solid ${c.border}`,
                borderBottom: i === items.length - 1 ? `1px solid ${c.border}` : 'none',
                fontFamily: c.fd,
                fontWeight: 600,
                fontSize: 26,
                lineHeight: 1.32,
                letterSpacing: '-0.015em',
                display: 'flex',
                gap: 28,
                alignItems: 'baseline',
              }}
            >
              <span style={{ fontFamily: c.fs, fontStyle: 'italic', fontWeight: 400, fontSize: 22, color: c.accentDeep, minWidth: 36, lineHeight: 1 }}>
                0{i + 1}
              </span>
              <span style={{ textWrap: 'pretty' }}>
                {it.lead}{' '}
                <em style={{ fontFamily: c.fs, fontStyle: 'italic', fontWeight: 400, color: c.accentDeep, fontSize: '1.06em' }}>
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
    </section>
  );
};

// ── B · Personnages illustrés (style éditorial, PAS Studyrama-cartoon) ──
const ReconnaisIllustres = ({ tweaks = {} }) => {
  const c = blockTokens(tweaks);
  const personas = [
    { v: 'sophie', n: 'Sophie · 38 ans',  was: 'Commerciale 16 ans', q: 'Suis-je trop vieille\npour me reconvertir ?' },
    { v: 'karim',  n: 'Karim · 42 ans',    was: 'Livreur 4 ans',       q: 'Puis-je entrer dans la\ntech sans diplôme ?' },
    { v: 'aicha',  n: 'Aïcha · 34 ans',    was: 'Assistante 8 ans',    q: 'Comment financer ma\nformation sans me ruiner ?' },
    { v: 'thomas', n: 'Thomas · 45 ans',   was: 'Prof 18 ans',         q: 'Suis-je capable d’apprendre\nle code à mon âge ?' },
  ];
  return (
    <section style={{ background: c.paper, fontFamily: c.fb, color: c.ink, width: window.ARTBOARD_W, minHeight: '100%' }}>
      <div style={{ padding: '72px 64px 32px' }}>
        <BlockEyebrow c={c}>Pour qui · Variante B · Personnages illustrés</BlockEyebrow>
        <h2 style={{ fontFamily: c.fd, fontWeight: 800, fontSize: 44, letterSpacing: '-0.025em', lineHeight: 1.05, margin: 0, marginBottom: 14 }}>
          Tu te poses <BlockHi c={c}>la même question&nbsp;?</BlockHi>
        </h2>
        <p style={{ fontFamily: c.fb, fontSize: 15, color: c.gray, lineHeight: 1.65, maxWidth: 560, margin: 0 }}>
          Quatre profils. Quatre doutes que tout le monde garde pour soi. Tu vas trouver une réponse à chacun ici.
        </p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderTop: `1px solid ${c.border}` }}>
        {personas.map((p, i) => (
          <a
            key={p.v}
            style={{
              padding: '32px 24px 30px',
              borderRight: i < personas.length - 1 ? `1px solid ${c.border}` : 'none',
              background: i === 0 ? c.cream : c.paper,
              color: c.ink,
              textDecoration: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: 16,
              minHeight: 340,
            }}
          >
            <PersonaAvatar variant={p.v} c={c} size={88} />
            <div style={{ fontFamily: c.fb, fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: c.grayLt }}>
              {p.n}
            </div>
            <div style={{ fontFamily: c.fb, fontSize: 12.5, color: c.gray, marginTop: -10 }}>{p.was}</div>
            <div
              style={{
                fontFamily: c.fd,
                fontWeight: 700,
                fontSize: 19,
                letterSpacing: '-0.015em',
                lineHeight: 1.28,
                color: c.ink,
                whiteSpace: 'pre-line',
                marginTop: 4,
                flexGrow: 1,
              }}
            >
              {p.q}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

// ── C · Cards photos réelles (placeholders) ──
const ReconnaisPhotos = ({ tweaks = {} }) => {
  const c = blockTokens(tweaks);
  const C = window.LPT_CONTENT;
  // Use the imagery defined in LPT_CONTENT (Bilel/Issa/Aïcha/Guy) as stand-ins
  const personas = [
    { key: 'bilel',  n: 'Bilel · 31',  q: 'Livreur → BA Salesforce',   sub: 'A franchi la passe en 11 mois.' },
    { key: 'issa',   n: 'Issa · 39',   q: 'Manager retail → Data',     sub: 'Reconversion avec POEI + CPF.' },
    { key: 'aicha',  n: 'Aïcha · 34',  q: 'Assistante → No-code',      sub: 'Sans coder, sans diplôme info.' },
    { key: 'guy',    n: 'Toi ·  ?',    q: 'Aujourd’hui → ?',           sub: 'Le prochain parcours, c’est le tien.', isYou: true },
  ];
  return (
    <section style={{ background: c.paper, fontFamily: c.fb, color: c.ink, width: window.ARTBOARD_W, minHeight: '100%' }}>
      <div style={{ padding: '72px 64px 32px' }}>
        <BlockEyebrow c={c}>Pour qui · Variante C · Portraits photo</BlockEyebrow>
        <h2 style={{ fontFamily: c.fd, fontWeight: 800, fontSize: 44, letterSpacing: '-0.025em', lineHeight: 1.05, margin: 0, marginBottom: 14 }}>
          Ils sont passés. <BlockHi c={c}>Et toi&nbsp;?</BlockHi>
        </h2>
        <p style={{ fontFamily: c.fb, fontSize: 15, color: c.gray, lineHeight: 1.65, maxWidth: 560, margin: 0 }}>
          Trois profils qui ont franchi la passe. Plus une place vide — celle du prochain parcours.
        </p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, padding: '0 64px 80px' }}>
        {personas.map((p) => (
          <a
            key={p.key}
            style={{
              borderRadius: 6,
              overflow: 'hidden',
              border: `1px solid ${c.border}`,
              background: p.isYou ? c.cream : c.paper,
              color: c.ink,
              textDecoration: 'none',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                aspectRatio: '4/5',
                position: 'relative',
                overflow: 'hidden',
                background: c.beige,
              }}
            >
              {p.isYou ? (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: `repeating-linear-gradient(45deg, ${c.beige} 0, ${c.beige} 8px, ${c.cream} 8px, ${c.cream} 16px)`,
                    gap: 8,
                  }}
                >
                  <div style={{ fontFamily: c.fs, fontStyle: 'italic', fontSize: 48, color: c.accentDeep }}>?</div>
                  <div style={{ fontFamily: c.fb, fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: c.gray }}>
                    Ton portrait
                  </div>
                </div>
              ) : (
                <img
                  src={C.images[p.key]}
                  alt={p.n}
                  loading="eager"
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                />
              )}
              {!p.isYou && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: 10,
                    left: 10,
                    background: c.accent,
                    color: c.ink,
                    padding: '4px 9px',
                    borderRadius: 3,
                    fontFamily: c.fb,
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}
                >
                  Parcours
                </div>
              )}
            </div>
            <div style={{ padding: '18px 18px 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ fontFamily: c.fd, fontSize: 16, fontWeight: 700, color: c.ink, letterSpacing: '-0.01em' }}>
                {p.n}
              </div>
              <div style={{ fontFamily: c.fb, fontSize: 13, color: p.isYou ? c.accentDeep : c.gray, fontWeight: p.isYou ? 600 : 400 }}>{p.q}</div>
              <div style={{ fontFamily: c.fb, fontSize: 12.5, color: c.grayLt, lineHeight: 1.5 }}>{p.sub}</div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

// ── Content variant — article cover thumbnails ──
const ContentWithCovers = ({ tweaks = {} }) => {
  const c = blockTokens(tweaks);
  const C = window.LPT_CONTENT;
  const articles = [
    { n: '01', cat: 'Reconversion',     t: '16 ans en marketing : comment j’ai basculé dans la tech à 40 ans',         meta: '7 min · 4 mars 2026',  cover: C.images.guy,   tint: c.accent },
    { n: '02', cat: 'Financement',      t: 'POEI, CPF, Transitions Pro : lequel choisir pour ta reconversion ?',       meta: '6 min · CPF',          cover: C.images.bilel, tint: '#7E9F6E' },
    { n: '03', cat: 'Métiers',          t: 'Business Analyst Salesforce : le métier que personne ne t’a expliqué',     meta: '8 min · Salesforce',   cover: C.images.issa,  tint: '#A04141' },
    { n: '04', cat: 'Droit du travail', t: 'Rupture conventionnelle : ce que tu peux vraiment négocier',               meta: '9 min · Droit',        cover: C.images.aicha, tint: '#5A7BB0' },
  ];
  const ressources = [
    { tag: 'Outils IA · Débutant · 15 min', t: 'Utiliser Gemini pour booster ta recherche d’emploi', sub: '5 étapes concrètes avec prompts prêts à l’emploi', chips: ['YouTube', 'Guide PDF'] },
    { tag: 'Financement · Débutant · 20 min', t: 'Faire sa demande CPF en 20 minutes chrono', sub: 'Étape par étape, de la connexion à la validation', chips: ['Guide PDF'] },
    { tag: 'Compétences · Intermédiaire · 30 min', t: 'Créer son premier dashboard no-code avec Notion', sub: 'Outil de suivi de candidatures prêt à l’emploi', chips: ['YouTube', 'Template'] },
  ];

  return (
    <section style={{ background: c.paper, fontFamily: c.fb, color: c.ink, width: window.ARTBOARD_W, minHeight: '100%' }}>
      <div style={{ padding: '64px 64px 0' }}>
        <BlockEyebrow c={c}>Le contenu · Variante B · Couvertures articles</BlockEyebrow>
        <h2 style={{ fontFamily: c.fd, fontWeight: 800, fontSize: 44, letterSpacing: '-0.025em', lineHeight: 1.05, margin: 0, marginBottom: 10 }}>
          S’informer. <BlockHi c={c}>Agir.</BlockHi>
        </h2>
        <p style={{ fontFamily: c.fb, fontSize: 15, color: c.gray, lineHeight: 1.6, maxWidth: 560 }}>
          Articles de fond et ressources actionnables — deux espaces distincts selon où tu en es.
        </p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderTop: `1px solid ${c.border}`, marginTop: 32 }}>
        {/* Articles avec thumbnails */}
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
                display: 'grid',
                gridTemplateColumns: '88px 1fr',
                gap: 20,
                alignItems: 'center',
                padding: '18px 36px',
                borderBottom: `1px solid ${c.borderSoft}`,
                textDecoration: 'none',
              }}
            >
              {/* Thumbnail */}
              <div
                style={{
                  width: 88,
                  height: 110,
                  borderRadius: 4,
                  overflow: 'hidden',
                  position: 'relative',
                  background: a.tint,
                  flexShrink: 0,
                }}
              >
                <img
                  src={a.cover}
                  alt={a.t}
                  loading="lazy"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    mixBlendMode: 'multiply',
                    opacity: 0.92,
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: 6,
                    left: 6,
                    fontFamily: c.fs,
                    fontStyle: 'italic',
                    fontSize: 18,
                    color: c.paper,
                    textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                    lineHeight: 1,
                  }}
                >
                  {a.n}
                </div>
              </div>
              <div>
                <div style={{ fontFamily: c.fb, fontSize: 10, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: c.grayLt, marginBottom: 4 }}>
                  {a.cat}
                </div>
                <div style={{ fontFamily: c.fd, fontWeight: 700, fontSize: 14.5, color: c.ink, lineHeight: 1.4, marginBottom: 5 }}>
                  {a.t}
                </div>
                <div style={{ fontFamily: c.fb, fontSize: 12, color: c.grayLt }}>{a.meta}</div>
              </div>
            </a>
          ))}
        </div>

        {/* Ressources unchanged */}
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

// ── S'informer · C · Real Unsplash backdrop image ──
// Diverse group of professionals in a coworking / collaboration scene.
// Unsplash direct URL with width param so it streams efficiently.
const HUMANS_BG_IMG = 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1600&q=80&auto=format&fit=crop';

const ContentWithHumans = ({ tweaks = {} }) => {
  const c = blockTokens(tweaks);
  const articles = [
    { n: '01', cat: 'Reconversion', t: '16 ans en marketing : comment j’ai basculé dans la tech à 40 ans', meta: '7 min · 4 mars 2026' },
    { n: '02', cat: 'Financement', t: 'POEI, CPF, Transitions Pro : lequel choisir pour ta reconversion ?', meta: '6 min · CPF' },
    { n: '03', cat: 'Métiers', t: 'Business Analyst Salesforce : le métier que personne ne t’a expliqué', meta: '8 min · Salesforce' },
    { n: '04', cat: 'Droit du travail', t: 'Rupture conventionnelle : ce que tu peux vraiment négocier', meta: '9 min · Droit' },
  ];
  const ressources = [
    { tag: 'Outils IA · Débutant · 15 min', t: 'Utiliser Gemini pour booster ta recherche d’emploi', sub: '5 étapes concrètes avec prompts prêts à l’emploi', chips: ['YouTube', 'Guide PDF'] },
    { tag: 'Financement · Débutant · 20 min', t: 'Faire sa demande CPF en 20 minutes chrono', sub: 'Étape par étape, de la connexion à la validation', chips: ['Guide PDF'] },
    { tag: 'Compétences · Intermédiaire · 30 min', t: 'Créer son premier dashboard no-code avec Notion', sub: 'Outil de suivi de candidatures prêt à l’emploi', chips: ['YouTube', 'Template'] },
  ];

  return (
    <section style={{ background: c.paper, fontFamily: c.fb, color: c.ink, width: window.ARTBOARD_W, minHeight: '100%' }}>
      {/* Heading band — real photo backdrop of diverse professionals */}
      <div
        style={{
          position: 'relative',
          padding: '88px 64px 64px',
          overflow: 'hidden',
          background: c.cream,
          borderBottom: `1px solid ${c.border}`,
          minHeight: 280,
        }}
      >
        <img
          src={HUMANS_BG_IMG}
          alt=""
          aria-hidden="true"
          loading="eager"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.22,
            filter: 'grayscale(0.4) contrast(1.05)',
          }}
        />
        {/* Subtle gradient fade so text stays legible */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(90deg, ${c.cream} 0%, rgba(248,244,235,0.4) 50%, rgba(248,244,235,0.6) 100%)`,
            pointerEvents: 'none',
          }}
        />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <BlockEyebrow c={c}>Le contenu · Variante C · Fond illustré humains</BlockEyebrow>
          <h2 style={{ fontFamily: c.fd, fontWeight: 800, fontSize: 52, letterSpacing: '-0.03em', lineHeight: 1.02, margin: 0, marginBottom: 14 }}>
            S’informer. <BlockHi c={c}>Agir.</BlockHi>
          </h2>
          <p style={{ fontFamily: c.fb, fontSize: 17, color: c.ink, lineHeight: 1.6, maxWidth: 620, margin: 0 }}>
            Articles de fond et ressources actionnables — <strong style={{ fontWeight: 600 }}>deux espaces distincts</strong> selon où tu en es.
          </p>
        </div>
      </div>

      {/* Default articles + ressources grid (same as V2 default) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
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
              <span style={{ fontFamily: c.fs, fontStyle: 'italic', fontWeight: 400, fontSize: 24, color: c.accentDeep, minWidth: 26, lineHeight: 1 }}>
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

Object.assign(window, {
  ReconnaisListe,
  ReconnaisIllustres,
  ReconnaisPhotos,
  ContentWithCovers,
  ContentWithHumans,
});
