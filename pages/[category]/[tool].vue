<script setup>
// 'useRoute' gives us access to information about the current URL.
const route = useRoute();
const category = route.params.category;
const tool = route.params.tool;

// This is a special Nuxt function to fetch data. It can run on the server OR client.
// We use it to find and load the correct JSON manifest file for our tool.
const { data: manifest, pending, error } = await useAsyncData(
  `manifest-${category}-${tool}`,
  () => $fetch(`/api/manifests/${category}/${tool}`)
);

// If there's an error fetching the manifest (e.g., a typo in the URL), show an error page.
if (error.value) {
  throw createError({ statusCode: 404, statusMessage: 'Calculator not found', fatal: true });
}
</script>

<template>
  <div>
    <div v-if="pending">
      Loading calculator...
    </div>

    <div v-else-if="manifest">
      <header>
        <h1>{{ manifest.toolName }}</h1>
        <p>{{ manifest.description }}</p>
      </header>
      <hr />

      <CalculatorForm :manifest="manifest" />
    </div>
  </div>
</template>