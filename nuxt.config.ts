import { promises as fs } from 'fs';
import path from 'path';
import Papa from 'papaparse';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true }, // CORRECTED: Added a comma here to separate object properties.

  // CORRECTED: The 'hooks' object is now correctly defined as a key-value pair within the main config object.
  hooks: {
    async 'nitro:config'(nitroConfig) {
      // Ensure prerender routes array exists
      if (nitroConfig.prerender) {
        if (!nitroConfig.prerender.routes) {
          nitroConfig.prerender.routes = [];
        }
      } else {
        return; // Exit if not in a prerender/build context
      }

      const allTools = [];
      const toolsDir = path.join(process.cwd(), 'content', 'tools');
      
      async function findTools(dir) {
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
        if (!tool.pSEODataset) continue; // Skip if a tool has no pSEO dataset

        const csvPath = path.join(process.cwd(), 'content', tool.pSEODataset);
        try {
          const csvFile = await fs.readFile(csvPath, 'utf-8');
          const parsed = Papa.parse(csvFile, { header: true, skipEmptyLines: true });
          
          for (const row of parsed.data) {
            const slugParts = tool.parameters.map(p => row[p.name]);

            // Ensure all parts of the slug are present before creating it
            if (slugParts.every(part => part !== undefined && part !== null && part !== '')) {
              const slug = slugParts.join('-');
              const route = `/${tool.categorySlug}/${tool.toolSlug}/${slug}`;
              nitroConfig.prerender.routes.push(route);
            }
          }
        } catch (e) {
          // Check if the error is because the file doesn't exist, which can be normal.
          if (e.code !== 'ENOENT') {
            console.warn(`Could not parse CSV for ${tool.toolName}: ${csvPath}`, e.message);
          }
        }
      }
    },
  },
})