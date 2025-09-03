import { promises as fs } from 'fs';
import path from 'path';

// This is a helper function that will recursively read directories.
async function readToolManifests(dir) {
  let allTools = [];
  const items = await fs.readdir(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      // If it's a directory, read its contents recursively.
      const nestedTools = await readToolManifests(fullPath);
      allTools = allTools.concat(nestedTools);
    } else if (item.isFile() && item.name.endsWith('.json')) {
      // If it's a JSON file, read and parse it.
      const fileContent = await fs.readFile(fullPath, 'utf-8');
      allTools.push(JSON.parse(fileContent));
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
    console.error('Failed to read tool manifests:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Could not load tool information.',
    });
  }
});