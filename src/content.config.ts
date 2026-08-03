import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

/**
 * Content Collections — Astro 6 (Content Layer API, glob loader).
 * Format Markdown (.md) : le rendu MDX nécessiterait @astrojs/mdx, donc une
 * modification d'astro.config.mjs (hors périmètre Phase 2). À activer plus tard.
 */

const articles = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdoc}", base: "./src/content/articles" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tag: z.string(), // catégorie : Reconversion, Financement, Métiers, Droit travail, Perso
    date: z.coerce.date(),
    readingTime: z.string().optional(), // ex: "7 min"
    cover: z.string().optional(),
    updated: z.coerce.date().optional(), // badge « à jour · {mois} » (v4.5)
    featured: z.boolean().default(false), // deck « à la une » du hero (v4.5)
    draft: z.boolean().default(false),
  }),
});

const ressources = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdoc}", base: "./src/content/ressources" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    level: z.enum(["deb", "int", "avance"]).default("deb"), // débutant / intermédiaire / avancé
    theme: z.string(), // ex: Outils IA, No-code, Financement
    duration: z.string().optional(), // ex: "30 min"
    // v4.5 — liens officiels affichés UNIQUEMENT en fin de page (spec §6)
    links: z
      .array(
        z.object({
          label: z.string(),
          url: z.string().url(),
          note: z.string().optional(),
        }),
      )
      .default([]),
    visual: z.string().optional(), // image polaroid du hero
    prereqs: z.array(z.string()).default([]), // « avant de commencer, prépare »
    doneWhen: z.array(z.string()).default([]), // « tu as terminé quand »
    // Modal PDF : bouton affiché uniquement si pdfUrl est renseigné
    pdfUrl: z.string().optional(), // ex: /guides/analyse-formation-cpf.pdf
    subscribeType: z.string().optional(), // type /api/subscribe (défaut: newsletter)
    draft: z.boolean().default(false),
  }),
});

const metiers = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdoc}", base: "./src/content/metiers" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    family: z.string(), // famille de métier : Data, Marketing, Dev, Support, Gestion de projet
    salary: z.string().optional(), // ex: "38–48 k€" (premier poste)
    accessibility: z.string().optional(), // ex: "Sans diplôme tech"
    // v4.5 — facts + formations repérées
    icon: z.string().optional(), // emoji de la fiche (ex: "🧭")
    salarySenior: z.string().optional(), // ex: "45–55 k€"
    reconversionTime: z.string().optional(), // ex: "3–9 mois"
    tags: z.array(z.string()).default([]), // ex: ["zéro code", "certifiable"]
    formations: z
      .array(
        z.object({
          name: z.string(),
          url: z.string().url(),
          desc: z.string(),
          tags: z.array(z.string()).default([]),
        }),
      )
      .default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { articles, ressources, metiers };
