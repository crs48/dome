import { defineCollection, z } from 'astro:content';
import { file } from 'astro/loaders';

// Build-method comparison rows. Kept honest: `insulation`/`durability` are
// prose so the real R-value caveats survive, and `caveats` preserves the
// uncertainty flags (aircrete R-value dispute, Binishell history, Geoship).
const methods = defineCollection({
  loader: file('src/content/methods.yaml'),
  schema: z.object({
    name: z.string(), // "Aircrete (Domegaia)"
    family: z.enum(['concrete', 'timber', 'glazed', 'earth', 'ceramic']),
    costPerSqFt: z.string(),
    insulation: z.string(), // keep the honest R-value prose
    diy: z.enum(['low', 'medium', 'high', 'highest']),
    light: z.enum(['opaque', 'translucent', 'transparent']),
    durability: z.string(),
    bestUse: z.string(),
    pros: z.array(z.string()),
    cons: z.array(z.string()),
    caveats: z.array(z.string()).default([]), // e.g. the aircrete R-value dispute
    vendorUrl: z.string().url().optional(),
    sources: z.array(z.string().url()).default([]),
  }),
});

// Curated, live-verified outbound resource directory.
const projects = defineCollection({
  loader: file('src/content/projects.yaml'),
  schema: z.object({
    title: z.string(),
    url: z.string().url(),
    category: z.enum([
      'bioceramic',
      'aircrete',
      'geodesic-kit',
      'monolithic',
      'earthbag',
      'theory',
      'inspiration',
      'software',
    ]),
    blurb: z.string(),
    verified: z.boolean().default(true),
    verifiedDate: z.string().optional(), // e.g. "2026-07"
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { methods, projects };
