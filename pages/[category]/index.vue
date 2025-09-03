<script setup>
const route = useRoute();
const categorySlug = route.params.category;

// Fetch the list of tools for this specific category.
const { data: tools, error } = await useAsyncData(
  `tools-in-${categorySlug}`,
  () => $fetch(`/api/tools/${categorySlug}`)
);

// We also fetch the category details to display the name and description
const { data: categoryDetails } = await useAsyncData(
  `category-${categorySlug}`,
  async () => {
    const categories = await $fetch('/api/manifests/categories/_index');
    return categories.find(c => c.slug === categorySlug);
  }
);

if (error.value) {
  throw createError({ statusCode: 404, statusMessage: `Category '${categorySlug}' not found`, fatal: true });
}
</script>

<template>
  <div class="category-page">
    <header v-if="categoryDetails">
      <h1>{{ categoryDetails.name }}</h1>
      <p>{{ categoryDetails.description }}</p>
    </header>
    <hr />
    <div v-if="tools && tools.length > 0" class="card-grid">
      <ToolCard v-for="tool in tools" :key="tool.toolSlug" :tool="tool" />
    </div>
    <div v-else>
      <p>No tools found in this category yet.</p>
    </div>
  </div>
</template>

<style scoped>
.category-page { max-width: 960px; margin: 0 auto; padding: 2rem; }
hr { margin: 2rem 0; }
.card-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem; }
</style>