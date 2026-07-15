import { config, collection, singleton, fields } from '@keystatic/core'

export default config({
  storage: { kind: 'cloud' },
  cloud: { project: 'lapassetech/lapassetech-v2' },

  singletons: {
    // ── Bandeau d'actus (ticker sous le header) ──────────────────────────────
    ticker: singleton({
      label: "Bandeau d'actus (ticker)",
      path: 'src/data/ticker',
      format: { data: 'json' },
      schema: {
        items: fields.array(
          fields.text({
            label: "Actu — mets **le passage clé** entre doubles astérisques pour le gras",
          }),
          {
            label: 'Messages du bandeau (datés de préférence)',
            itemLabel: (props) => props.value ?? 'Actu',
          },
        ),
      },
    }),
  },

  collections: {

    // ── Articles ──────────────────────────────────────────────────────────────
    articles: collection({
      label: 'Articles',
      slugField: 'title',
      path: 'src/content/articles/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Titre' } }),
        description: fields.text({ label: 'Description courte' }),
        tag: fields.select({
          label: 'Catégorie',
          options: [
            { label: 'Reconversion',        value: 'Reconversion' },
            { label: 'Financement',         value: 'Financement' },
            { label: 'Métiers du digital',  value: 'Métiers du digital' },
            { label: 'Droit du travail',    value: 'Droit du travail' },
            { label: 'Témoignage',          value: 'Témoignage' },
            { label: 'Outils IA',           value: 'Outils IA' },
          ],
          defaultValue: 'Reconversion',
        }),
        date: fields.date({ label: 'Date de publication' }),
        updated: fields.date({
          label: 'Dernière mise à jour (badge « à jour · mois »)',
          validation: { isRequired: false },
        }),
        readingTime: fields.text({ label: 'Temps de lecture (ex : 7 min)', validation: { isRequired: false } }),
        cover: fields.text({ label: 'URL image de couverture (Unsplash…)', multiline: false }),
        featured: fields.checkbox({
          label: 'À la une (deck du hero — 4 max)',
          defaultValue: false,
        }),
        draft: fields.checkbox({ label: 'Brouillon (masqué en prod)', defaultValue: false }),
        content: fields.markdoc({ label: 'Contenu' }),
      },
    }),

    // ── Ressources ────────────────────────────────────────────────────────────
    ressources: collection({
      label: 'Ressources',
      slugField: 'title',
      path: 'src/content/ressources/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Titre' } }),
        description: fields.text({ label: 'Description courte' }),
        level: fields.select({
          label: 'Niveau',
          options: [
            { label: 'Débutant',       value: 'deb' },
            { label: 'Intermédiaire',  value: 'int' },
            { label: 'Avancé',         value: 'avance' },
          ],
          defaultValue: 'deb',
        }),
        theme: fields.select({
          label: 'Thème',
          options: [
            { label: 'Outils IA',    value: 'Outils IA' },
            { label: 'No-code',      value: 'No-code' },
            { label: 'Financement',  value: 'Financement' },
            { label: 'Compétences',  value: 'Compétences' },
            { label: 'Emploi',       value: 'Emploi' },
          ],
          defaultValue: 'Outils IA',
        }),
        duration: fields.text({ label: 'Durée estimée (ex : 20 min)', validation: { isRequired: false } }),
        visual: fields.text({
          label: 'URL du visuel du hero (polaroid)',
          validation: { isRequired: false },
        }),
        prereqs: fields.array(fields.text({ label: 'Prérequis' }), {
          label: '« Avant de commencer, prépare » (liste)',
          itemLabel: (props) => props.value ?? 'Prérequis',
        }),
        doneWhen: fields.array(fields.text({ label: 'Critère' }), {
          label: '« Tu as terminé quand » (liste)',
          itemLabel: (props) => props.value ?? 'Critère',
        }),
        links: fields.array(
          fields.object({
            label: fields.text({ label: 'Nom du lien (ex : moncompteformation.gouv.fr)' }),
            url: fields.url({ label: 'URL' }),
            note: fields.text({
              label: 'Note (à quelle étape il sert)',
              validation: { isRequired: false },
            }),
          }),
          {
            label: 'Liens officiels (affichés UNIQUEMENT en fin de page)',
            itemLabel: (props) => props.fields.label.value ?? 'Lien',
          },
        ),
        draft: fields.checkbox({ label: 'Brouillon (masqué en prod)', defaultValue: false }),
        content: fields.markdoc({ label: 'Contenu' }),
      },
    }),

    // ── Fiches Métiers ────────────────────────────────────────────────────────
    metiers: collection({
      label: 'Fiches Métiers',
      slugField: 'title',
      path: 'src/content/metiers/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Nom du métier' } }),
        description: fields.text({ label: 'Description courte' }),
        family: fields.select({
          label: 'Famille de métier',
          options: [
            { label: 'Data',                    value: 'Data' },
            { label: 'Marketing Digital',       value: 'Marketing Digital' },
            { label: 'CRM / Salesforce',        value: 'CRM' },
            { label: 'Gestion de projet / BA',  value: 'Gestion de projet' },
            { label: 'No-code / Low-code',      value: 'No-code' },
            { label: 'Support & Admin IT',      value: 'Support IT' },
          ],
          defaultValue: 'Gestion de projet',
        }),
        salary: fields.text({ label: 'Salaire premier poste (ex : 38–42 k€)', validation: { isRequired: false } }),
        salarySenior: fields.text({
          label: 'Salaire après 3 ans (ex : 45–55 k€)',
          validation: { isRequired: false },
        }),
        reconversionTime: fields.text({
          label: 'Durée de reconversion (ex : 3–9 mois)',
          validation: { isRequired: false },
        }),
        icon: fields.text({
          label: 'Icône emoji de la fiche (ex : 🧭)',
          validation: { isRequired: false },
        }),
        accessibility: fields.text({ label: 'Accessibilité (ex : Sans diplôme tech)', validation: { isRequired: false } }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tags (ex : zéro code, certifiable)',
          itemLabel: (props) => props.value ?? 'Tag',
        }),
        formations: fields.array(
          fields.object({
            name: fields.text({ label: 'Nom (ex : Trailhead — Salesforce)' }),
            url: fields.url({ label: 'URL' }),
            desc: fields.text({ label: 'Description honnête (format, pour qui)', multiline: true }),
            tags: fields.array(fields.text({ label: 'Tag' }), {
              label: 'Tags (durée, modalité, financement)',
              itemLabel: (props) => props.value ?? 'Tag',
            }),
          }),
          {
            label: 'Formations & centres repérés',
            itemLabel: (props) => props.fields.name.value ?? 'Formation',
          },
        ),
        draft: fields.checkbox({ label: 'Brouillon (masqué en prod)', defaultValue: false }),
        content: fields.markdoc({ label: 'Contenu' }),
      },
    }),

  },
})
