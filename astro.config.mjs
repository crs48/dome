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
  integrations: [mdx(), sitemap()],
  image: {
    // Scale down to the container, never up; emit responsive srcset styles.
    layout: 'constrained',
    responsiveStyles: true,
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
