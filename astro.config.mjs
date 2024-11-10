import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import node from '@astrojs/node';
import clerk from '@clerk/astro';
import react from '@astrojs/react';

import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  site: 'https://hannahshobbyroom.com',
  output: 'hybrid',
  adapter: vercel(),
  integrations: [
    mdx(), 
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en-US',
        },
      },
    }),
    clerk(),
    react()
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true
    }
  },
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto'
  },
  experimental: {
    serverIslands: true
  }
});