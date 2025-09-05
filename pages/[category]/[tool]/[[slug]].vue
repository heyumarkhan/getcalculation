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

// Helper functions for category icons and styling
const getCategoryIcon = (categorySlug) => {
  const icons = {
    math: '🧮',
    physics: '⚡',
    chemistry: '🧪',
    finance: '💰',
    biology: '🧬',
    engineering: '⚙️'
  };
  return icons[categorySlug] || '📊';
};

const getCategoryIconClass = (categorySlug) => {
  const classes = {
    math: 'bg-math-100 text-math-700',
    physics: 'bg-physics-100 text-physics-700',
    chemistry: 'bg-chemistry-100 text-chemistry-700',
    finance: 'bg-finance-100 text-finance-700',
    biology: 'bg-green-100 text-green-700',
    engineering: 'bg-blue-100 text-blue-700'
  };
  return classes[categorySlug] || 'bg-neutral-100 text-neutral-700';
};

const getCategoryBadgeClass = (categorySlug) => {
  const classes = {
    math: 'badge-math',
    physics: 'badge-physics',
    chemistry: 'badge-chemistry',
    finance: 'badge-finance',
    biology: 'bg-green-100 text-green-800',
    engineering: 'bg-blue-100 text-blue-800'
  };
  return classes[categorySlug] || 'badge-neutral';
};
</script>

<template>
  <div class="min-h-screen bg-neutral-50">
    <!-- Loading State -->
    <div v-if="!manifest" class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-4 border-accent-500 border-t-transparent mx-auto mb-4"></div>
        <p class="text-lg text-neutral-600">Loading calculator...</p>
      </div>
    </div>

    <!-- Calculator Page -->
    <div v-else class="py-12">
      <!-- Header Section -->
      <header class="max-w-4xl mx-auto px-4 mb-12">
        <div class="text-center">
          <!-- Breadcrumb -->
          <nav class="flex items-center justify-center space-x-2 text-sm text-neutral-500 mb-6">
            <NuxtLink to="/" class="hover:text-accent-600 transition-colors">Home</NuxtLink>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
            <NuxtLink :to="`/${category}`" class="hover:text-accent-600 transition-colors">{{ category }}</NuxtLink>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
            <span class="text-primary-700 font-medium">{{ manifest.toolName }}</span>
          </nav>

          <!-- Category Badge -->
          <div class="inline-flex items-center space-x-2 mb-6">
            <div class="w-8 h-8 rounded-lg flex items-center justify-center text-lg"
                 :class="getCategoryIconClass(category)">
              {{ getCategoryIcon(category) }}
            </div>
            <span class="badge text-sm font-medium px-3 py-1 rounded-full"
                  :class="getCategoryBadgeClass(category)">
              {{ category }}
            </span>
          </div>

          <!-- Title and Description -->
          <h1 class="text-4xl md:text-5xl font-bold text-primary-900 mb-6">
            {{ manifest.toolName }}
          </h1>
          <p class="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            {{ manifest.description }}
          </p>
        </div>
      </header>

      <!-- Calculator Section -->
      <main class="max-w-4xl mx-auto px-4">
        <CalculatorForm ref="calculatorFormRef" :manifest="manifest" />
      </main>

      <!-- Footer Info -->
      <footer class="max-w-4xl mx-auto px-4 mt-16 pb-12">
        <div class="card p-8 text-center">
          <h3 class="text-lg font-semibold text-primary-800 mb-2">
            Need Help?
          </h3>
          <p class="text-neutral-600 mb-4">
            This calculator uses precise mathematical formulas to ensure accurate results.
          </p>
          <div class="flex flex-wrap justify-center gap-4 text-sm text-neutral-500">
            <span>• Real-time calculations</span>
            <span>• Precise results</span>
            <span>• Mobile-friendly</span>
            <span>• Free to use</span>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>