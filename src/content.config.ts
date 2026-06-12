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
    draft: z.boolean().default(false),
  }),
});

const metiers = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdoc}", base: "./src/content/metiers" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    family: z.string(), // famille de métier : Data, Marketing, Dev, Support, Gestion de projet
    salary: z.string().optional(), // ex: "38–48 k€"
    accessibility: z.string().optional(), // ex: "Sans diplôme tech"
    draft: z.boolean().default(false),
  }),
});

export const collections = { articles, ressources, metiers };
