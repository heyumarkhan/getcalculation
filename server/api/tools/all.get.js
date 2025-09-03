// REPLACEMENT CODE for /server/api/tools/all.get.js

import { promises as fs } from 'fs';
import path from 'path';

async function readToolManifests(dir) {
  let allTools = [];
  const items = await fs.readdir(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      const nestedTools = await readToolManifests(fullPath);
      allTools = allTools.concat(nestedTools);
    } else if (item.isFile() && item.name.endsWith('.json')) {
      const fileContent = await fs.readFile(fullPath, 'utf-8');
      try {
        // We add a specific try...catch here for parsing
        allTools.push(JSON.parse(fileContent));
      } catch (jsonError) {
        // This will give a much more helpful error message in your terminal
        console.error(`Error parsing JSON in file: ${fullPath}`, jsonError);
        // We re-throw the error to be caught by the main handler
        throw jsonError;
      }
    }
  }
  return allTools;
}

export default defineEventHandler(async () => {
  const toolsDir = path.join(process.cwd(), 'content', 'tools');
  try {
    const allToolManifests = await readToolManifests(toolsDir);
    return allToolManifests;
  } catch (error) {
    // This console.error is the most important debugging tool you have
    console.error('Failed to read tool manifests:', error.message);
    throw createError({
      statusCode: 500,
      statusMessage: 'Could not load tool information. Check server logs for details.',
    });
  }
});