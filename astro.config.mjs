// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// GitHub Pages serves the custom domain at the root. Hand-written links and
// public asset paths share this base through src/lib/base.ts.
export default defineConfig({
  site: 'https://domes.haus',
  base: '/',
  trailingSlash: 'ignore',
  integrations: [mdx(), sitemap({
    // Redirect-only legacy routes point to their canonical archive pages.
    filter: (page) => !['design', 'gallery', 'methods', 'resources', 'before-you-build']
      .some((route) => new URL(page).pathname.replace(/\/$/, '') === `/${route}`),
  })],
  image: {
    // Scale down to the container, never up; emit responsive srcset styles.
    layout: 'constrained',
    responsiveStyles: true,
  },
  vite: {
    // Cast: @tailwindcss/vite and Astro resolve slightly different Vite type
    // versions, so the Plugin types differ nominally. Runtime is unaffected.
    plugins: [/** @type {any} */ (tailwindcss())],
  },
});
