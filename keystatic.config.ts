import { config, collection, fields } from '@keystatic/core'

export default config({
  storage: { kind: 'cloud' },
  cloud: { project: 'lapassetech/lapassetech-v2' },

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
        readingTime: fields.text({ label: 'Temps de lecture (ex : 7 min)', validation: { isRequired: false } }),
        cover: fields.text({ label: 'URL image de couverture (Unsplash…)', multiline: false }),
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
        salary: fields.text({ label: 'Salaire moyen (ex : 38–48 k€)', validation: { isRequired: false } }),
        accessibility: fields.text({ label: 'Accessibilité (ex : Sans diplôme tech)', validation: { isRequired: false } }),
        draft: fields.checkbox({ label: 'Brouillon (masqué en prod)', defaultValue: false }),
        content: fields.markdoc({ label: 'Contenu' }),
      },
    }),

  },
})
