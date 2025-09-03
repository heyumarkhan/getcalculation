import { useStorage } from '#imports';

export default defineEventHandler(async () => {
  try {
    // 1. Access the 'assets:server' storage provided by Nitro.
    const storage = useStorage('assets:server');

    // 2. Get the keys (file paths) for all manifests within the new location.
    // The colons act as path separators for the storage system.
    const allManifestKeys = await storage.getKeys('content:tools');

    // 3. Read the content of each manifest file concurrently.
    const allTools = await Promise.all(
      allManifestKeys
        .filter(key => key.endsWith('.json')) // Ensure we only read JSON files
        .map(async (key) => {
          // .getItem(key) retrieves the parsed JSON content of the file.
          return await storage.getItem(key);
        })
    );

    return allTools;
  } catch (error) {
    // This will catch any errors if the storage operations fail.
    console.error('Error fetching all tool manifests from storage:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Could not load tool information from server assets.',
    });
  }
});