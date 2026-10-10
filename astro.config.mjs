// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Project page: served from https://crs48.github.io/dome/
// `base` is why every hand-written link / public asset path routes through
// import.meta.env.BASE_URL (see src/lib/base.ts). <Image> and src/-imported
// assets get the prefix automatically.
export default defineConfig({
  site: 'https://crs48.github.io',
  base: '/dome',
  trailingSlash: 'ignore',
  integrations: [mdx(), sitemap({
    // Redirect-only legacy routes point to their canonical archive pages.
    filter: (page) => !['design', 'gallery', 'methods', 'resources', 'before-you-build']
      .some((route) => new URL(page).pathname.replace(/\/$/, '') === `/dome/${route}`),
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
