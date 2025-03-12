// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://ryanblakeley.net',
  integrations: [mdx(), sitemap(), react()],
  redirects: { '/newsletter': 'https://newsletter.ryanblakeley.net' },
  vite: {
    plugins: [tailwindcss()],
  },
});
