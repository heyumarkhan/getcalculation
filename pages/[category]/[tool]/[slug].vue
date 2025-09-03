<script setup>
import { ref, onMounted } from 'vue';

const route = useRoute();
const { category, tool, slug } = route.params;

// A template ref to access the CalculatorForm component's exposed functions
const calculatorFormRef = ref(null);

// Fetch the manifest for the current tool
const { data: manifest, pending, error } = await useAsyncData(
  `manifest-${category}-${tool}`,
  () => $fetch(`/api/manifests/${category}/${tool}`)
);

if (error.value) {
  throw createError({ statusCode: 404, statusMessage: 'Calculator not found', fatal: true });
}

// This function runs only on the client-side after the page has loaded
onMounted(() => {
  if (manifest.value && slug) {
    // 1. Parse the slug from the URL
    const parsedParams = {};
    const parts = slug.split('-');
    
    // Logic for "key-value" slugs like "principal-890-rate-49"
    if (isNaN(parts[0])) { 
      for (let i = 0; i < parts.length; i += 2) {
        const key = parts[i];
        const value = parts[i + 1];
        parsedParams[key] = value;
      }
    } 
    // Logic for pSEO slugs like "1000-5-1"
    else {
      manifest.value.parameters.forEach((param, index) => {
        parsedParams[param.name] = parts[index];
      });
    }

    // 2. Set the form state in the child component
    calculatorFormRef.value?.setFormState(parsedParams);

    // 3. Programmatically trigger the calculation
    setTimeout(() => {
      calculatorFormRef.value?.performCalculation();
    }, 100); // A small delay to ensure UI has updated
  }
});
</script>

<template>
  <div>
    <div v-if="pending">Loading calculator...</div>
    <div v-else-if="manifest">
      <header>
        <h1>{{ manifest.toolName }}</h1>
        <p>{{ manifest.description }}</p>
      </header>
      <hr />
      
      <CalculatorForm ref="calculatorFormRef" :manifest="manifest" />
    </div>
  </div>
</template>