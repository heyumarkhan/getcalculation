// Imports for prerender hooks (temporarily disabled)
// import { promises as fs } from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import Papa from 'papaparse';

export default defineNuxtConfig({
  devtools: { enabled: true },
  compatibilityDate: '2025-09-05',
  
  // CSS Configuration
  css: ['~/assets/css/main.css'],
  
  // Tailwind CSS Configuration
  modules: ['@nuxtjs/tailwindcss'],
  
  // App Configuration
  app: {
    head: {
      meta: [
        { name: 'theme-color', content: '#f9fafb' },
        { name: 'theme-color', content: '#1f2937', media: '(prefers-color-scheme: dark)' }
      ]
    }
  },
  
  // Temporarily disable complex prerender hooks to fix startup issues
  // TODO: Re-enable after basic server is working
  // hooks: {
  //   async 'nitro:config'(nitroConfig) {
  //     // SEO prerendering logic will be added back later
  //   },
  // },
});