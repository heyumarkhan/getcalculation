import { promises as fs } from 'fs';
import path from 'path';

export default defineEventHandler(async (event) => {
  const filePath = path.join(process.cwd(), 'content', 'categories', '_index.json');

  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    // Parse the JSON string into an object and return it
    return JSON.parse(fileContent);
  } catch (e) {
    // If the file doesn't exist, throw a 500 server error.
    throw createError({
      statusCode: 500,
      statusMessage: 'Could not find the main categories manifest file.',
    });
  }
});