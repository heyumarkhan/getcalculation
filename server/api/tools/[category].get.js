import { useStorage } from '#imports';

export default defineEventHandler(async (event) => {
  const { category } = event.context.params;

  // This is the key for the directory we want to read inside server/assets.
  // Note the use of colons ':' as path separators for the storage API.
  const storageKey = `content:tools:${category}`;

  try {
    // 'getKeys' retrieves all file paths within the specified directory.
    const toolManifestKeys = await useStorage('assets:server').getKeys(storageKey);

    // If no keys are found, the directory is empty or doesn't exist.
    if (!toolManifestKeys || toolManifestKeys.length === 0) {
      return []; // Return an empty array for a valid but empty category.
    }

    // Process all found keys concurrently.
    const categoryTools = await Promise.all(
      toolManifestKeys
        // Ensure we only process .json files.
        .filter(key => key.endsWith('.json'))
        // For each valid key, retrieve its full JSON content.
        .map(async (key) => {
          return await useStorage('assets:server').getItem(key);
        })
    );

    return categoryTools;

  } catch (error) {
    // This will catch errors if the base storage itself is misconfigured.
    console.error(`Error accessing storage for category '${category}':`, error);
    throw createError({
      statusCode: 500,
      statusMessage: `Could not retrieve tools for category '${category}'.`,
    });
  }
});