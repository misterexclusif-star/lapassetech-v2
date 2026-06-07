/* eslint-disable */
// Home — single themed component used by all 5 variations.
// Sections: Header → Hero → Manifeste (5 points) → Parcours → Guy → Témoignages → CTA Bilan → Footer

const ARTBOARD_W = 1280;

// ---------- Shared content (single source of truth) ----------
const CONTENT = {
  brand: 'lapassetech.',
  nav: ['Articles', 'Ressources', 'Bilan', 'À propos'],
  navCTA: 'Faire mon bilan',
  hero: {
    eyebrow: 'Reconversion vers le digital',
    titleA: 'Tu n’es pas',
    titleB: 'en retard.',
    titleC: 'On t’ouvre la passe.',
    subhead:
      'Métiers du digital, formations financées à 100 %, parcours qui te ressemblent. Expliqué simplement — par quelqu’un qui a fait le chemin.',
    ctaPrimary: 'Faire mon bilan gratuit',
    ctaSecondary: 'Comment ça marche',
    badge1: { k: 'Bilan', v: '10 min' },
    badge2: { k: 'Coût', v: '0 €' },
    badge3: { k: 'Engagement', v: 'Aucun' },
    portrait: 'Guy',
    portraitSub: 'Reconverti en 18 mois.',
  },
  manifeste: {
    eyebrow: 'Le projet',
    title: 'Pas un blog de plus.',
    titleAccent: 'Un hub.',
    intro:
      'Informer, orienter, former, accompagner — pensé pour celles et ceux qui ne se croient pas concernés par le digital. Et qui ont tort.',
    points: [
      {
        n: '01',
        t: 'Informer sans condescendance',
        d: 'Articles, vidéos, guides pratiques en français simple. Reconversion, droit du travail, financement, métiers — avec des exemples qui te ressemblent.',
      },
      {
        n: '02',
        t: 'Rendre visible ce qui est invisible',
        d: 'CPF, France Travail, POEI, OPCO, Transitions Pro. Ces outils financent des formations à 100 %. La plupart des gens ne le savent pas. On explique, on enlève la peur administrative.',
      },
      {
        n: '03',
        t: 'Démystifier le digital concrètement',
        d: 'WordPress, no-code, marketing digital, IA — pas réservés aux ingénieurs. Avec les bons outils et quelques heures, tu lances ton premier projet.',
      },
      {
        n: '04',
        t: 'Orienter avec l’IA, pas à la place de l’humain',
        d: 'Un chatbot qui pose les bonnes questions et propose un plan d’action personnalisé. Gratuit, sans jugement, dispo à 23 h un dimanche soir quand personne ne répond.',
      },
      {
        n: '05',
        t: 'Construire la communauté qui manque',
        d: 'Des témoignages de reconvertis qui te ressemblent. Les parcours de Bilel, d’Issa, et de centaines d’autres. « D’où tu viens » devient une force, pas un frein.',
      },
    ],
  },
  parcours: {
    eyebrow: 'Comment ça marche',
    title: 'Trois étapes,',
    titleAccent: 'à ton rythme.',
    steps: [
      {
        n: '1',
        t: 'Fais ton bilan',
        d: '8 questions, 10 minutes. PassBot identifie les métiers du digital qui collent à ton profil et t’envoie un plan d’action par email.',
        tag: 'Gratuit',
      },
      {
        n: '2',
        t: 'Explore ce qui te concerne',
        d: 'Articles, ressources, vidéos — classés par métier, par financement, par niveau. Tu lis seulement ce qui te sert.',
        tag: 'Sans jargon',
      },
      {
        n: '3',
        t: 'Avance chaque semaine',
        d: 'Deux emails par semaine : un article qui t’éclaire, une ressource que tu peux utiliser le soir-même sur ton téléphone.',
        tag: 'Concret',
      },
    ],
  },
  outils: ['CPF', 'France Travail', 'POEI', 'OPCO', 'Transitions Pro', 'Mon Compte Formation'],
  guy: {
    eyebrow: 'À propos',
    title: 'Guy — celui',
    titleAccent: 'qui est passé.',
    intro:
      '16 ans en marketing dans la presse, puis une formation Business Analyst Salesforce financée à 100 % par la POEI. Aujourd’hui en poste — et fondateur de LaPasseTech.',
    quote:
      '« J’ai fait cette reconversion seul, sans réseau dans la tech, depuis la banlieue. Si j’avais eu LaPasseTech à l’époque, j’aurais gagné six mois. »',
    timeline: [
      { y: '2005–2021', t: 'Responsable Marketing Digital', d: 'Groupes de presse · 16 ans' },
      { y: '2022', t: 'Formation Business Analyst Salesforce', d: 'POEI · financée à 100 %' },
      { y: 'Aujourd’hui', t: 'BA Salesforce + fondateur LaPasseTech', d: '' },
    ],
  },
  temoignages: {
    eyebrow: 'Ils sont passés',
    title: 'Des parcours',
    titleAccent: 'qui te ressemblent.',
    items: [
      { name: 'Bilel', age: '32 ans', from: 'Livreur', to: 'Tech support', q: 'Je croyais qu’il fallait coder. C’est faux.', imgKey: 'bilel' },
      { name: 'Issa', age: '28 ans', from: 'Restauration', to: 'Data analyst', q: 'Formation payée à 100 %. Je ne savais pas que c’était possible.', imgKey: 'issa' },
      { name: 'Aïcha', age: '41 ans', from: 'Congé parental', to: 'Marketing digital', q: 'En 8 mois, j’étais en poste. Sans réseau.', imgKey: 'aicha' },
    ],
  },
  cta: {
    title: 'Ton bilan',
    titleAccent: 'en 10 minutes.',
    sub: 'PassBot te pose 8 questions et t’envoie un plan d’action personnalisé. Gratuit. Sans engagement. Sans jugement.',
    button: 'Commencer mon bilan',
    note: 'Pas d’email obligatoire pour commencer. Réponses détaillées envoyées si tu veux les recevoir.',
  },
  images: {
    guy: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=720&h=900&fit=crop&crop=faces&q=80',
    bilel: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=240&h=240&fit=crop&crop=faces&q=80',
    issa: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=240&h=240&fit=crop&crop=faces&q=80',
    aicha: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=240&h=240&fit=crop&crop=faces&q=80',
    scene: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=900&h=600&fit=crop&q=80',
  },
  footer: {
    tag: 'Reconversion vers le digital — sans jargon, sans complexe.',
    cols: [
      { h: 'S’informer', l: ['Tous les articles', 'Reconversion', 'CPF & POEI', 'Métiers du digital', 'Droit du travail'] },
      { h: 'Passer à l’action', l: ['Toutes les ressources', 'Outils IA', 'Compétences digitales', 'Financement'] },
      { h: 'Le projet', l: ['Le bilan', 'Guide PDF', 'À propos de Guy', 'Newsletter'] },
      { h: 'Contact', l: ['contact@lapassetech.fr', 'Mentions légales', 'RGPD'] },
    ],
  },
};

// ---------- Tiny visual primitives ----------
const PortraitPlaceholder = ({ t, label, sublabel, size = 360, src = CONTENT.images.guy }) => (
  <div
    style={{
      width: size,
      height: size * 1.2,
      background: t.surfaceAlt,
      borderRadius: t.radius,
      position: 'relative',
      overflow: 'hidden',
      boxShadow: t.cardStyle === 'shadow' ? t.shadow : 'none',
      border: t.cardStyle === 'border' ? `1px solid ${t.border}` : 'none',
    }}
  >
    <img
      src={src}
      alt={label}
      loading="eager"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
    />
    <div
      style={{
        position: 'absolute',
        left: 16,
        bottom: 16,
        right: 16,
        background: t.surface,
        padding: '10px 14px',
        borderRadius: t.radius * 0.6,
        border: `1px solid ${t.border}`,
        fontFamily: t.fontBody,
      }}
    >
      <div style={{ fontWeight: 700, color: t.text, fontSize: 14 }}>{label}</div>
      <div style={{ color: t.textSoft, fontSize: 12, marginTop: 2 }}>{sublabel}</div>
    </div>
  </div>
);

const AvatarPlaceholder = ({ t, name, size = 56, src }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: '50%',
      background: t.surfaceAlt,
      flexShrink: 0,
      overflow: 'hidden',
      position: 'relative',
      border: `1px solid ${t.border}`,
    }}
  >
    {src ? (
      <img
        src={src}
        alt={name}
        loading="eager"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
    ) : (
      <span
        style={{
          position: 'absolute',
          inset: 0,
          display: 'grid',
          placeItems: 'center',
          color: t.text,
          fontFamily: t.fontDisplay,
          fontWeight: 600,
          fontSize: size * 0.34,
        }}
      >
        {name[0]}
      </span>
    )}
  </div>
);

const cardStyle = (t) => ({
  background: t.surface,
  borderRadius: t.radius,
  border: t.cardStyle === 'border' ? `1px solid ${t.border}` : 'none',
  boxShadow: t.cardStyle === 'shadow' ? t.shadow : 'none',
});

const Btn = ({ t, variant = 'primary', children, full }) => {
  const base = {
    fontFamily: t.fontBody,
    fontWeight: 600,
    fontSize: 15,
    padding: t.btnPad,
    borderRadius: t.radiusBtn,
    border: 'none',
    cursor: 'pointer',
    letterSpacing: '0.005em',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    width: full ? '100%' : 'auto',
    justifyContent: 'center',
  };
  if (variant === 'primary') {
    return (
      <button style={{ ...base, background: t.primary, color: t.onPrimary }}>
        {children}
        <span aria-hidden style={{ display: 'inline-block', transform: 'translateX(0)' }}>→</span>
      </button>
    );
  }
  if (variant === 'ghost') {
    return (
      <button style={{ ...base, background: 'transparent', color: t.text, border: `1px solid ${t.border}` }}>
        {children}
      </button>
    );
  }
  if (variant === 'accent') {
    return (
      <button style={{ ...base, background: t.accent, color: t.accentText }}>
        {children}
        <span aria-hidden>→</span>
      </button>
    );
  }
  return <button style={base}>{children}</button>;
};

// ---------- Sections ----------
const Header = ({ t }) => (
  <header
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '28px 64px',
      borderBottom: `1px solid ${t.border}`,
      background: t.bg,
    }}
  >
    <div style={{ fontFamily: t.fontDisplay, fontSize: 22, fontWeight: t.displayWeight, color: t.text, letterSpacing: t.displayLetter }}>
      {CONTENT.brand}
    </div>
    <nav style={{ display: 'flex', gap: 36, fontFamily: t.fontBody, fontSize: 15, color: t.textSoft }}>
      {CONTENT.nav.map((n) => (
        <a key={n} style={{ color: t.text, textDecoration: 'none', fontWeight: 500 }}>{n}</a>
      ))}
    </nav>
    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
      <Btn t={t} variant="primary">{CONTENT.navCTA}</Btn>
    </div>
  </header>
);

const Hero = ({ t }) => (
  <section style={{ padding: '88px 64px 96px', display: 'grid', gridTemplateColumns: '1.25fr 1fr', gap: 64, alignItems: 'center' }}>
    <div>
      <div style={{ ...t.eyebrow, color: t.textSoft, marginBottom: 28 }}>{CONTENT.hero.eyebrow}</div>
      <h1
        style={{
          fontFamily: t.fontDisplay,
          fontWeight: t.displayWeight,
          fontSize: 76,
          lineHeight: 1.02,
          letterSpacing: t.displayLetter,
          color: t.text,
          margin: 0,
        }}
      >
        {CONTENT.hero.titleA}{' '}
        <span style={{ color: t.text }}>{CONTENT.hero.titleB}</span>
        <br />
        <span
          style={{
            color: t.text,
            position: 'relative',
            display: 'inline-block',
          }}
        >
          <span style={{ position: 'relative', zIndex: 2 }}>{CONTENT.hero.titleC}</span>
          <span
            aria-hidden
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 6,
              height: 14,
              background: t.accent,
              borderRadius: 4,
              zIndex: 1,
              opacity: t.id === 'soleilNuit' || t.id === 'moutardeNoir' ? 1 : 0.85,
            }}
          />
        </span>
      </h1>
      <p style={{ fontFamily: t.fontBody, fontSize: 19, lineHeight: 1.5, color: t.textSoft, maxWidth: 540, marginTop: 28 }}>
        {CONTENT.hero.subhead}
      </p>
      <div style={{ display: 'flex', gap: 14, marginTop: 36 }}>
        <Btn t={t} variant="primary">{CONTENT.hero.ctaPrimary}</Btn>
        <Btn t={t} variant="ghost">{CONTENT.hero.ctaSecondary}</Btn>
      </div>
      <div style={{ display: 'flex', gap: 28, marginTop: 40, fontFamily: t.fontBody }}>
        {[CONTENT.hero.badge1, CONTENT.hero.badge2, CONTENT.hero.badge3].map((b, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 12, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{b.k}</span>
            <span style={{ fontSize: 17, color: t.text, fontWeight: 600, marginTop: 4 }}>{b.v}</span>
          </div>
        ))}
      </div>
    </div>
    <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
      <PortraitPlaceholder t={t} label={CONTENT.hero.portrait} sublabel={CONTENT.hero.portraitSub} size={340} />
      {/* Floating sticker */}
      <div
        style={{
          position: 'absolute',
          left: -24,
          top: 60,
          background: t.accent,
          color: t.accentText,
          padding: '12px 16px',
          borderRadius: t.radius * 0.6,
          fontFamily: t.fontBody,
          fontSize: 13,
          fontWeight: 700,
          transform: 'rotate(-4deg)',
          maxWidth: 180,
          lineHeight: 1.35,
          boxShadow: '0 12px 24px -16px rgba(0,0,0,0.3)',
        }}
      >
        Formation à 100 % financée ? Oui, c’est possible.
      </div>
    </div>
  </section>
);

const Manifeste = ({ t }) => (
  <section style={{ padding: '96px 64px', background: t.bg, borderTop: `1px solid ${t.divider}` }}>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 80, alignItems: 'start' }}>
      <div style={{ position: 'sticky', top: 32 }}>
        <div style={{ ...t.eyebrow, color: t.textSoft, marginBottom: 24 }}>{CONTENT.manifeste.eyebrow}</div>
        <h2
          style={{
            fontFamily: t.fontDisplay,
            fontWeight: t.displayWeight,
            fontSize: 52,
            lineHeight: 1.05,
            letterSpacing: t.displayLetter,
            color: t.text,
            margin: 0,
          }}
        >
          {CONTENT.manifeste.title}
          <br />
          <span style={{ color: t.primary, fontStyle: t.useItalic ? 'italic' : 'normal' }}>
            {CONTENT.manifeste.titleAccent}
          </span>
        </h2>
        <p style={{ fontFamily: t.fontBody, fontSize: 17, lineHeight: 1.55, color: t.textSoft, marginTop: 24, maxWidth: 380 }}>
          {CONTENT.manifeste.intro}
        </p>
      </div>
      <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {CONTENT.manifeste.points.map((p, i) => (
          <li
            key={p.n}
            style={{
              padding: '28px 0 32px',
              borderTop: i === 0 ? `1px solid ${t.divider}` : 'none',
              borderBottom: `1px solid ${t.divider}`,
              display: 'grid',
              gridTemplateColumns: '80px 1fr',
              gap: 24,
            }}
          >
            <div
              style={{
                fontFamily: t.fontDisplay,
                fontSize: 36,
                fontWeight: t.displayWeight,
                color: t.primary,
                letterSpacing: t.displayLetter,
                lineHeight: 1,
              }}
            >
              {p.n}
            </div>
            <div>
              <h3 style={{ fontFamily: t.fontDisplay, fontSize: 26, fontWeight: t.displayWeight, color: t.text, margin: 0, letterSpacing: t.displayLetter, lineHeight: 1.15 }}>
                {p.t}
              </h3>
              <p style={{ fontFamily: t.fontBody, fontSize: 16, lineHeight: 1.6, color: t.textSoft, margin: '10px 0 0' }}>{p.d}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

const Parcours = ({ t }) => (
  <section style={{ padding: '96px 64px', background: t.surface }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 56 }}>
      <div>
        <div style={{ ...t.eyebrow, color: t.textSoft, marginBottom: 20 }}>{CONTENT.parcours.eyebrow}</div>
        <h2
          style={{
            fontFamily: t.fontDisplay,
            fontWeight: t.displayWeight,
            fontSize: 52,
            lineHeight: 1.05,
            letterSpacing: t.displayLetter,
            color: t.text,
            margin: 0,
          }}
        >
          {CONTENT.parcours.title}{' '}
          <span style={{ color: t.primary, fontStyle: t.useItalic ? 'italic' : 'normal' }}>
            {CONTENT.parcours.titleAccent}
          </span>
        </h2>
      </div>
      <div style={{ fontFamily: t.fontBody, fontSize: 14, color: t.textMuted, maxWidth: 260, textAlign: 'right' }}>
        Tu n’as rien à signer. Tu peux tout faire seul·e, à ton rythme.
      </div>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
      {CONTENT.parcours.steps.map((s) => (
        <div
          key={s.n}
          style={{
            ...cardStyle(t),
            padding: 32,
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            minHeight: 280,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: t.radiusBtn === 999 ? '50%' : t.radius * 0.5,
                background: t.primary,
                color: t.onPrimary,
                display: 'grid',
                placeItems: 'center',
                fontFamily: t.fontDisplay,
                fontWeight: t.displayWeight,
                fontSize: 20,
              }}
            >
              {s.n}
            </div>
            <span
              style={{
                fontFamily: t.fontBody,
                fontSize: 11,
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                color: t.textSoft,
                background: t.bg,
                padding: '6px 10px',
                borderRadius: 999,
                border: `1px solid ${t.border}`,
                fontWeight: 600,
              }}
            >
              {s.tag}
            </span>
          </div>
          <h3 style={{ fontFamily: t.fontDisplay, fontSize: 26, fontWeight: t.displayWeight, color: t.text, margin: 0, letterSpacing: t.displayLetter, lineHeight: 1.15 }}>
            {s.t}
          </h3>
          <p style={{ fontFamily: t.fontBody, fontSize: 15, lineHeight: 1.55, color: t.textSoft, margin: 0 }}>{s.d}</p>
        </div>
      ))}
    </div>

    {/* Outils bar */}
    <div
      style={{
        marginTop: 56,
        padding: '28px 32px',
        background: t.bg,
        borderRadius: t.radius,
        border: `1px solid ${t.border}`,
        display: 'flex',
        alignItems: 'center',
        gap: 32,
        justifyContent: 'space-between',
        flexWrap: 'wrap',
      }}
    >
      <div style={{ fontFamily: t.fontBody, fontSize: 14, color: t.textSoft, maxWidth: 280 }}>
        <span style={{ color: t.text, fontWeight: 600 }}>Financements existants :</span>
        <br />
        on t’explique lequel est fait pour toi.
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        {CONTENT.outils.map((o) => (
          <span
            key={o}
            style={{
              fontFamily: t.fontBody,
              fontSize: 13,
              fontWeight: 600,
              padding: '8px 14px',
              background: t.surface,
              border: `1px solid ${t.border}`,
              borderRadius: 999,
              color: t.text,
            }}
          >
            {o}
          </span>
        ))}
      </div>
    </div>
  </section>
);

const Guy = ({ t }) => (
  <section style={{ padding: '96px 64px', background: t.bg, borderTop: `1px solid ${t.divider}` }}>
    <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 72, alignItems: 'start' }}>
      <div>
        <PortraitPlaceholder t={t} label="Guy" sublabel="Fondateur · BA Salesforce" size={320} />
      </div>
      <div>
        <div style={{ ...t.eyebrow, color: t.textSoft, marginBottom: 20 }}>{CONTENT.guy.eyebrow}</div>
        <h2
          style={{
            fontFamily: t.fontDisplay,
            fontWeight: t.displayWeight,
            fontSize: 52,
            lineHeight: 1.05,
            letterSpacing: t.displayLetter,
            color: t.text,
            margin: 0,
          }}
        >
          {CONTENT.guy.title}{' '}
          <span style={{ color: t.primary, fontStyle: t.useItalic ? 'italic' : 'normal' }}>
            {CONTENT.guy.titleAccent}
          </span>
        </h2>
        <p style={{ fontFamily: t.fontBody, fontSize: 18, lineHeight: 1.55, color: t.textSoft, marginTop: 20, maxWidth: 560 }}>
          {CONTENT.guy.intro}
        </p>

        <div style={{ marginTop: 36, display: 'flex', flexDirection: 'column', gap: 0 }}>
          {CONTENT.guy.timeline.map((tl, i) => (
            <div
              key={i}
              style={{
                display: 'grid',
                gridTemplateColumns: '140px 1fr',
                gap: 24,
                padding: '20px 0',
                borderTop: `1px solid ${t.divider}`,
                borderBottom: i === CONTENT.guy.timeline.length - 1 ? `1px solid ${t.divider}` : 'none',
              }}
            >
              <div style={{ fontFamily: t.fontBody, fontSize: 13, color: t.textMuted, fontWeight: 600, paddingTop: 4 }}>{tl.y}</div>
              <div>
                <div style={{ fontFamily: t.fontDisplay, fontSize: 20, fontWeight: t.displayWeight, color: t.text, letterSpacing: t.displayLetter }}>{tl.t}</div>
                {tl.d && <div style={{ fontFamily: t.fontBody, fontSize: 14, color: t.textSoft, marginTop: 4 }}>{tl.d}</div>}
              </div>
            </div>
          ))}
        </div>

        <blockquote
          style={{
            fontFamily: t.fontDisplay,
            fontWeight: t.displayWeight,
            fontSize: 26,
            lineHeight: 1.3,
            color: t.text,
            margin: '40px 0 0',
            paddingLeft: 24,
            borderLeft: `3px solid ${t.primary}`,
            fontStyle: t.useItalic ? 'italic' : 'normal',
            letterSpacing: t.displayLetter,
            maxWidth: 600,
          }}
        >
          {CONTENT.guy.quote}
        </blockquote>
      </div>
    </div>
  </section>
);

const Temoignages = ({ t }) => (
  <section style={{ padding: '96px 64px', background: t.surface }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 56 }}>
      <div>
        <div style={{ ...t.eyebrow, color: t.textSoft, marginBottom: 20 }}>{CONTENT.temoignages.eyebrow}</div>
        <h2
          style={{
            fontFamily: t.fontDisplay,
            fontWeight: t.displayWeight,
            fontSize: 52,
            lineHeight: 1.05,
            letterSpacing: t.displayLetter,
            color: t.text,
            margin: 0,
          }}
        >
          {CONTENT.temoignages.title}{' '}
          <span style={{ color: t.primary, fontStyle: t.useItalic ? 'italic' : 'normal' }}>
            {CONTENT.temoignages.titleAccent}
          </span>
        </h2>
      </div>
      <a style={{ fontFamily: t.fontBody, color: t.text, fontWeight: 600, fontSize: 15, textDecoration: 'underline', textUnderlineOffset: 4, textDecorationColor: t.primary }}>
        Voir tous les parcours →
      </a>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
      {CONTENT.temoignages.items.map((it) => (
        <div
          key={it.name}
          style={{
            ...cardStyle(t),
            padding: 28,
            display: 'flex',
            flexDirection: 'column',
            gap: 18,
            background: t.bg,
            border: `1px solid ${t.border}`,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <AvatarPlaceholder t={t} name={it.name} size={52} src={CONTENT.images[it.imgKey]} />
            <div>
              <div style={{ fontFamily: t.fontDisplay, fontSize: 18, fontWeight: t.displayWeight, color: t.text, letterSpacing: t.displayLetter }}>{it.name}</div>
              <div style={{ fontFamily: t.fontBody, fontSize: 13, color: t.textMuted, marginTop: 2 }}>{it.age}</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: t.fontBody, fontSize: 13 }}>
            <span style={{ color: t.textSoft }}>{it.from}</span>
            <span style={{ color: t.primary, fontWeight: 700 }}>→</span>
            <span style={{ color: t.text, fontWeight: 700, background: t.accent, color: t.accentText, padding: '3px 10px', borderRadius: 999 }}>
              {it.to}
            </span>
          </div>
          <p
            style={{
              fontFamily: t.fontDisplay,
              fontWeight: t.displayWeight,
              fontSize: 19,
              lineHeight: 1.4,
              color: t.text,
              margin: 0,
              letterSpacing: t.displayLetter,
              fontStyle: t.useItalic ? 'italic' : 'normal',
            }}
          >
            « {it.q} »
          </p>
        </div>
      ))}
    </div>
  </section>
);

const CTASection = ({ t }) => (
  <section style={{ padding: '96px 64px' }}>
    <div
      style={{
        background: t.primary,
        color: t.onPrimary,
        borderRadius: t.radius * 1.4,
        padding: '72px 64px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 64, alignItems: 'center', position: 'relative', zIndex: 2 }}>
        <div>
          <div style={{ ...t.eyebrow, color: t.onPrimary, opacity: 0.7, marginBottom: 20 }}>Le bilan PassBot</div>
          <h2
            style={{
              fontFamily: t.fontDisplay,
              fontWeight: t.displayWeight,
              fontSize: 60,
              lineHeight: 1.02,
              letterSpacing: t.displayLetter,
              color: t.onPrimary,
              margin: 0,
            }}
          >
            {CONTENT.cta.title}{' '}
            <span style={{ color: t.accent, fontStyle: t.useItalic ? 'italic' : 'normal' }}>
              {CONTENT.cta.titleAccent}
            </span>
          </h2>
          <p style={{ fontFamily: t.fontBody, fontSize: 18, lineHeight: 1.55, color: t.onPrimary, opacity: 0.85, marginTop: 24, maxWidth: 500 }}>
            {CONTENT.cta.sub}
          </p>
          <div style={{ marginTop: 32, display: 'flex', gap: 14, alignItems: 'center' }}>
            <Btn t={t} variant="accent">{CONTENT.cta.button}</Btn>
            <span style={{ fontFamily: t.fontBody, fontSize: 13, color: t.onPrimary, opacity: 0.7, maxWidth: 260 }}>{CONTENT.cta.note}</span>
          </div>
        </div>

        {/* Chatbot mock */}
        <div
          style={{
            background: t.surface,
            borderRadius: t.radius,
            padding: 20,
            color: t.text,
            fontFamily: t.fontBody,
            boxShadow: '0 24px 60px -28px rgba(0,0,0,0.4)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingBottom: 14, borderBottom: `1px solid ${t.border}` }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: t.accent }} />
            <div style={{ fontWeight: 700, fontSize: 14 }}>PassBot</div>
            <div style={{ marginLeft: 'auto', fontSize: 11, color: t.textMuted, display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }} /> En ligne
            </div>
          </div>
          <div style={{ paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ background: t.bg, padding: '12px 14px', borderRadius: t.radius * 0.7, fontSize: 14, lineHeight: 1.45, maxWidth: '88%' }}>
              Salut ! Tu cherches à te reconvertir dans le digital ?
            </div>
            <div style={{ background: t.bg, padding: '12px 14px', borderRadius: t.radius * 0.7, fontSize: 14, lineHeight: 1.45, maxWidth: '88%' }}>
              Dis-moi ce que tu fais aujourd’hui — sans détailler, juste une phrase.
            </div>
            <div style={{ background: t.primary, color: t.onPrimary, padding: '12px 14px', borderRadius: t.radius * 0.7, fontSize: 14, lineHeight: 1.45, maxWidth: '88%', alignSelf: 'flex-end' }}>
              Je suis livreur depuis 4 ans, je veux changer.
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: t.textMuted, fontSize: 13, paddingLeft: 4 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: t.textMuted, animation: 'pulse 1.4s ease-in-out infinite' }} />
              PassBot rédige une réponse…
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Footer = ({ t }) => (
  <footer style={{ background: t.text, color: t.bg, padding: '72px 64px 36px' }}>
    <div style={{ display: 'grid', gridTemplateColumns: '1.4fr repeat(4, 1fr)', gap: 48, paddingBottom: 56, borderBottom: `1px solid ${t.textSoft}` }}>
      <div>
        <div style={{ fontFamily: t.fontDisplay, fontSize: 24, fontWeight: t.displayWeight, color: t.bg, letterSpacing: t.displayLetter }}>{CONTENT.brand}</div>
        <p style={{ fontFamily: t.fontBody, fontSize: 14, color: t.bg, opacity: 0.7, lineHeight: 1.55, marginTop: 16, maxWidth: 260 }}>
          {CONTENT.footer.tag}
        </p>
      </div>
      {CONTENT.footer.cols.map((c) => (
        <div key={c.h}>
          <div style={{ fontFamily: t.fontBody, fontSize: 12, fontWeight: 700, color: t.bg, opacity: 0.6, textTransform: 'uppercase', letterSpacing: '0.16em', marginBottom: 14 }}>
            {c.h}
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {c.l.map((l) => (
              <li key={l} style={{ fontFamily: t.fontBody, fontSize: 14, color: t.bg, opacity: 0.85 }}>
                {l}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 24, fontFamily: t.fontBody, fontSize: 13, color: t.bg, opacity: 0.55 }}>
      <div>© 2026 LaPasseTech — Reconversion vers les métiers du digital.</div>
      <div>Mentions légales · RGPD</div>
    </div>
  </footer>
);

// ---------- Home composer ----------
const Home = ({ theme }) => {
  const t = theme;
  return (
    <div
      style={{
        background: t.bg,
        color: t.text,
        fontFamily: t.fontBody,
        width: ARTBOARD_W,
        minHeight: '100%',
      }}
    >
      <Header t={t} />
      <Hero t={t} />
      <Manifeste t={t} />
      <Parcours t={t} />
      <Guy t={t} />
      <Temoignages t={t} />
      <CTASection t={t} />
      <Footer t={t} />
    </div>
  );
};

window.Home = Home;
window.ARTBOARD_W = ARTBOARD_W;
window.LPT_CONTENT = CONTENT;
