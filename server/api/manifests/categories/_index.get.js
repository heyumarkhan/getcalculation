import { useStorage } from '#imports';

export default defineEventHandler(async () => {
  const storageKey = 'content:categories:_index.json';

  // Verify the item exists before trying to get it.
  const hasItem = await useStorage('assets:server').hasItem(storageKey);

  if (!hasItem) {
    console.error(`[API Error] Categories manifest not found at storage key: ${storageKey}`);
    throw createError({
      statusCode: 404,
      statusMessage: 'Categories Manifest Not Found',
    });
  }

  const categories = await useStorage('assets:server').getItem(storageKey);
  return categories;
});