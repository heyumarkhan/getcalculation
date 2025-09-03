import { promises as fs } from 'fs';
import path from 'path';

export default defineEventHandler(async (event) => {
  const { category } = event.context.params;

  // Sanitize input to prevent accessing unintended directories
  const safeCategory = path.normalize(category).replace(/^(\.\.(\/|\\|$))+/, '');
  const categoryDir = path.join(process.cwd(), 'content', 'tools', safeCategory);

  try {
    const files = await fs.readdir(categoryDir);
    const toolManifests = [];

    for (const file of files) {
      if (file.endsWith('.json')) {
        const filePath = path.join(categoryDir, file);
        const fileContent = await fs.readFile(filePath, 'utf-8');
        toolManifests.push(JSON.parse(fileContent));
      }
    }
    return toolManifests;
  } catch (error) {
    throw createError({
      statusCode: 404,
      statusMessage: `Tools for category '${safeCategory}' not found.`,
    });
  }
});