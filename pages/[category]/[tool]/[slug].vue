<script setup>
import { ref, onMounted } from 'vue';
import CalculatorForm from '~/components/CalculatorForm.vue';

const route = useRoute();
const { category, tool, slug } = route.params;

const calculatorFormRef = ref(null);

const { data: manifest, error } = await useAsyncData(
  `manifest-${category}-${tool}`,
  () => $fetch(`/api/manifests/${category}/${tool}`)
);

if (error.value) {
  throw createError({ statusCode: 404, statusMessage: 'Calculator not found', fatal: true });
}

onMounted(() => {
  if (manifest.value && slug && calculatorFormRef.value) {
    const parsedParams = {};
    const parts = slug.split('-');

    for (let i = 0; i < parts.length; i += 2) {
      const key = parts[i];
      const value = parts[i + 1];
      const isExpectedKey = manifest.value.parameters.some(p => p.name === key);
      if (key && value !== undefined && isExpectedKey) {
        parsedParams[key] = value;
      }
    }
    
    calculatorFormRef.value.setFormState(parsedParams);
  }
});
</script>

<template>
  <div>
    <div v-if="!manifest">Loading calculator...</div>
    <div v-else>
      <header>
        <h1>{{ manifest.toolName }}</h1>
        <p>{{ manifest.description }}</p>
      </header>
      <hr />
      
      <CalculatorForm ref="calculatorFormRef" :manifest="manifest" />
    </div>
  </div>
</template>