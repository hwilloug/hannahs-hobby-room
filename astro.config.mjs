import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import node from '@astrojs/node';
import clerk from '@clerk/astro';
import react from '@astrojs/react';

import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  site: 'https://hannahshobbyroom.com',
  output: 'server',
  adapter: vercel(),
  integrations: [
    react(),
    clerk({
      publishableKey: process.env.PUBLIC_CLERK_PUBLISHABLE_KEY,
      secretKey: process.env.CLERK_SECRET_KEY,
      debug: true // Add this to get more detailed logs
    }),
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
    })
  ],
  vite: {
    define: {
      'process.env.CLERK_PUBLISHABLE_KEY': 
        JSON.stringify(process.env.PUBLIC_CLERK_PUBLISHABLE_KEY),
    },
  },
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