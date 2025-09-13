import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Papa from 'papaparse';

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// NOTE: The import for 'useStorage' has been removed as it's not used here.

export default defineNuxtConfig({
  devtools: { enabled: true },
  compatibilityDate: '2025-09-05',
  
  // CSS Configuration
  css: ['~/assets/css/main.css'],
  
  // Tailwind CSS Configuration
  modules: ['@nuxtjs/tailwindcss'],
  
  hooks: {
    async 'nitro:config'(nitroConfig) {
      if (!nitroConfig.prerender) { return; }

      // --- CRITICAL CORRECTION ---
      // Reverting to Node.js 'fs' for file access within the build hook context.
      // We now point it to the new, correct location inside '/server/assets/'.
      const contentRoot = path.join(__dirname, 'server', 'assets', 'content');
      const toolsDir = path.join(contentRoot, 'tools');
      
      const allTools = [];

      // Using the same reliable file-reading function as before.
      async function findTools(dir: string) {
        try {
          await fs.access(dir);
        } catch (error) {
          console.error(`[pSEO] Error: Directory not found at ${dir}`);
          return;
        }

        const items = await fs.readdir(dir, { withFileTypes: true });
        for (const item of items) {
          const fullPath = path.join(dir, item.name);
          if (item.isDirectory()) {
            await findTools(fullPath);
          } else if (item.isFile() && item.name.endsWith('.json')) {
            const fileContent = await fs.readFile(fullPath, 'utf-8');
            allTools.push(JSON.parse(fileContent));
          }
        }
      }

      await findTools(toolsDir);
      
      for (const tool of allTools) {
        // Construct the path to the CSV using the correct content root.
        const csvPath = path.join(contentRoot, tool.pSEODataset);
        try {
          const csvFile = await fs.readFile(csvPath, 'utf-8');
          const parsed = Papa.parse(csvFile, { header: true });
          
          for (const row of parsed.data) {
            const slug = tool.parameters
              .map(p => `${p.name}-${row[p.name]}`)
              .join('-');
            
            if (slug && slug.length > tool.parameters.length) {
              const route = `/${tool.categorySlug}/${tool.toolSlug}/${slug}`;
              if (!nitroConfig.prerender.routes.includes(route)) {
                nitroConfig.prerender.routes.push(route);
              }
            }
          }
        } catch (e) {
          console.warn(`[pSEO] Could not find or parse CSV for ${tool.toolName} at path: ${csvPath}`);
        }
      }
    },
  },
});