<script setup>
defineProps({
  tool: {
    type: Object,
    required: true,
  }
});
</script>

<template>
  <NuxtLink :to="`/${tool.categorySlug}/${tool.toolSlug}`" class="tool-card">
    <h3>{{ tool.toolName }}</h3>
    <p>{{ tool.description }}</p>
    <span class="category-badge">{{ tool.categorySlug }}</span>
  </NuxtLink>
</template>

<style scoped>
.tool-card {
  display: block;
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 8px;
  text-decoration: none;
  color: inherit;
  transition: box-shadow 0.2s ease;
}
.tool-card:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}
h3 {
  margin-top: 0;
}
.category-badge {
  display: inline-block;
  background-color: #eee;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  margin-top: 1rem;
  text-transform: capitalize;
}
</style>