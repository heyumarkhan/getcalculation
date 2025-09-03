import { useStorage } from '#imports';

export default defineEventHandler(async (event) => {
  const { category, tool } = event.context.params;
  const manifestKey = `content:tools:${category}:${tool}.json`;

  const manifest = await useStorage('assets:server').getItem(manifestKey);

  if (!manifest) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Calculator Manifest Not Found',
    });
  }

  return manifest;
});