import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

const configuredSite = '';
const site = configuredSite.trim();

export default defineConfig({
  site: site || undefined,
  output: 'server',
  adapter: cloudflare({
    platformProxy: {
      enabled: true
    }
  }),
  integrations: site ? [sitemap()] : [],
  vite: {
    plugins: [tailwindcss()]
  },
  prefetch: true
});
