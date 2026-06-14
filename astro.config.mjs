// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: import.meta.env.SITE || 'https://maison-ayaba.com',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      filter: (page) => {
        const path = new URL(page).pathname;
        // Exclude FR canonical root duplicate and paid-traffic landing pages.
        return path !== '/fr/' && !path.startsWith('/fr/reserver-cotonou') && !path.startsWith('/en/book-cotonou');
      },
    }),
  ],
  adapter: vercel(),

  vite: {
    plugins: [tailwindcss()]
  }
});