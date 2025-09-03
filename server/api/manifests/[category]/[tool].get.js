import { promises as fs } from 'fs';
import path from 'path';

export default defineEventHandler(async (event) => {
  const { category, tool } = event.context.params;

  // IMPORTANT: Sanitize inputs to prevent directory traversal attacks
  // This ensures the path doesn't contain '..' or other malicious characters.
  const safeCategory = path.normalize(category).replace(/^(\.\.(\/|\\|$))+/, '');
  const safeTool = path.normalize(tool).replace(/^(\.\.(\/|\\|$))+/, '');

  // Construct the file path relative to the server directory
  const filePath = path.join(process.cwd(), 'content', 'tools', safeCategory, `${safeTool}.json`);

  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    // Parse the JSON string into a JavaScript object and return it
    return JSON.parse(fileContent);
  } catch (e) {
    // If the file doesn't exist or there's an error, throw a 404 not found error.
    throw createError({
      statusCode: 404,
      statusMessage: 'Calculator Manifest Not Found',
    });
  }
});