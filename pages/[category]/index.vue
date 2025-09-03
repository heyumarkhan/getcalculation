<script setup>
import { ref, computed } from 'vue';

// Fetch all categories and all tools when the page loads.
const { data: categories } = await useAsyncData('categories', () => $fetch('/api/manifests/categories/_index'));
const { data: allTools } = await useAsyncData('all-tools', () => $fetch('/api/tools/all'));

// A 'ref' is a reactive variable. It will hold the user's search input.
const searchQuery = ref('');

// A 'computed' property is a value that automatically recalculates when its dependencies change.
// In this case, it will re-run the filter whenever 'searchQuery' changes, creating the "live search" effect.
const filteredTools = computed(() => {
  // If there's no search query or list of tools, return an empty array.
  if (!searchQuery.value || !allTools.value) {
    return [];
  }

  const query = searchQuery.value.toLowerCase();

  // Filter the master list of tools.
  return allTools.value.filter(tool => {
    const nameMatch = tool.toolName.toLowerCase().includes(query);
    const descriptionMatch = tool.description.toLowerCase().includes(query);
    const categoryMatch = tool.categorySlug.toLowerCase().includes(query);
    return nameMatch || descriptionMatch || categoryMatch;
  });
});
</script>

<template>
  <div class="homepage">
    <header class="hero">
      <h1>getcalculation</h1>
      <p>Your go-to hub for precise and easy-to-use online calculators.</p>
      <input
        type="search"
        v-model.trim="searchQuery"
        placeholder="Search for any calculator (e.g., interest, velocity...)"
        class="search-input"
      />
    </header>

    <section v-if="searchQuery" class="search-results">
      <h2>Search Results</h2>
      <div v-if="filteredTools.length > 0" class="card-grid">
        <ToolCard v-for="tool in filteredTools" :key="tool.toolSlug" :tool="tool" />
      </div>
      <p v-else>No calculators found for "{{ searchQuery }}".</p>
    </section>

    <section v-else class="categories">
      <h2>All Categories</h2>
      <div v-if="categories" class="category-grid">
        <NuxtLink v-for="category in categories" :key="category.slug" :to="`/${category.slug}`" class="category-card">
          <h3>{{ category.name }}</h3>
          <p>{{ category.description }}</p>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
.homepage { max-width: 960px; margin: 0 auto; padding: 2rem; }
.hero { text-align: center; margin-bottom: 3rem; }
.search-input { width: 100%; max-width: 600px; padding: 1rem; font-size: 1.1rem; border-radius: 8px; border: 1px solid #ccc; }
.card-grid, .category-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem; }
.category-card { background-color: #f9f9f9; text-align: center; padding: 2rem; border-radius: 8px; text-decoration: none; color: inherit; transition: transform 0.2s ease, box-shadow 0.2s ease; }
.category-card:hover { transform: translateY(-5px); box-shadow: 0 6px 16px rgba(0,0,0,0.1); }
h2 { margin-bottom: 2rem; }
</style>