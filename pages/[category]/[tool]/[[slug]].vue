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

// SEO Meta Tags
useHead(() => {
  if (!manifest.value) return {};
  
  const seo = manifest.value.seo || {};
  const content = manifest.value.content || {};
  
  return {
    title: `${manifest.value.toolName} - Free Online Calculator`,
    meta: [
      {
        name: 'description',
        content: seo.metaDescription || manifest.value.description
      },
      {
        name: 'keywords',
        content: seo.keywords ? seo.keywords.join(', ') : ''
      },
      {
        property: 'og:title',
        content: `${manifest.value.toolName} - Free Online Calculator`
      },
      {
        property: 'og:description',
        content: seo.metaDescription || manifest.value.description
      },
      {
        property: 'og:type',
        content: 'website'
      },
      {
        name: 'twitter:card',
        content: 'summary'
      },
      {
        name: 'twitter:title',
        content: `${manifest.value.toolName} - Free Online Calculator`
      },
      {
        name: 'twitter:description',
        content: seo.metaDescription || manifest.value.description
      }
    ],
    link: [
      {
        rel: 'canonical',
        href: `https://yoursite.com/${category}/${tool}`
      }
    ]
  };
});

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
    math: 'bg-math-100 dark:bg-math-900 text-math-700 dark:text-math-300',
    physics: 'bg-physics-100 dark:bg-physics-900 text-physics-700 dark:text-physics-300',
    chemistry: 'bg-chemistry-100 dark:bg-chemistry-900 text-chemistry-700 dark:text-chemistry-300',
    finance: 'bg-finance-100 dark:bg-finance-900 text-finance-700 dark:text-finance-300',
    biology: 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300',
    engineering: 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
  };
  return classes[categorySlug] || 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300';
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
  <div class="min-h-screen bg-neutral-50 dark:bg-neutral-900">
    <!-- Loading State -->
    <div v-if="!manifest" class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-4 border-accent-500 border-t-transparent mx-auto mb-4"></div>
        <p class="text-lg text-neutral-600 dark:text-neutral-400">Loading calculator...</p>
      </div>
    </div>

    <!-- Calculator Page -->
    <div v-else class="py-12">
      <!-- Header Section -->
      <header class="max-w-4xl mx-auto px-4 mb-12">
        <div class="text-center">
          <!-- Breadcrumb -->
          <nav class="flex items-center justify-center space-x-2 text-sm text-neutral-500 dark:text-neutral-400 mb-6">
            <NuxtLink to="/" class="hover:text-accent-600 transition-colors">Home</NuxtLink>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
            <NuxtLink :to="`/${category}`" class="hover:text-accent-600 transition-colors">{{ category }}</NuxtLink>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
            <span class="text-primary-700 dark:text-primary-300 font-medium">{{ manifest.toolName }}</span>
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
          <h1 class="text-4xl md:text-5xl font-bold text-primary-900 dark:text-primary-100 mb-6">
            {{ manifest.toolName }}
          </h1>
          <p class="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed">
            {{ manifest.description }}
          </p>
        </div>
      </header>

      <!-- Calculator Section -->
      <main class="max-w-4xl mx-auto px-4">
        <CalculatorForm ref="calculatorFormRef" :manifest="manifest" />
      </main>

      <!-- Educational Content Section -->
      <section v-if="manifest.content" class="max-w-4xl mx-auto px-4 mt-16">
        <!-- How It Works -->
        <div v-if="manifest.content.howItWorks" class="card p-8 mb-8">
          <h2 class="text-2xl font-bold text-primary-900 dark:text-primary-100 mb-4">
            {{ manifest.content.howItWorks.title }}
          </h2>
          <p class="text-neutral-700 dark:text-neutral-300 mb-6 leading-relaxed">
            {{ manifest.content.howItWorks.description }}
          </p>
          
          <!-- Formula Display -->
          <div v-if="manifest.content.howItWorks.formula" class="bg-accent-50 dark:bg-accent-900/20 rounded-lg p-6 mb-6">
            <h3 class="text-lg font-semibold text-accent-800 dark:text-accent-200 mb-3">Formula</h3>
            <div class="text-2xl font-mono text-accent-700 dark:text-accent-300 mb-4">
              {{ manifest.content.howItWorks.formula }}
            </div>
            
            <!-- Variables -->
            <div v-if="manifest.content.howItWorks.variables" class="space-y-2">
              <h4 class="text-sm font-medium text-accent-800 dark:text-accent-200 mb-2">Where:</h4>
              <div v-for="variable in manifest.content.howItWorks.variables" :key="variable.symbol" 
                   class="flex items-start space-x-3">
                <span class="font-mono font-bold text-accent-700 dark:text-accent-300 min-w-[20px]">{{ variable.symbol }}</span>
                <span class="text-sm text-neutral-700 dark:text-neutral-300">
                  <strong>{{ variable.name }}:</strong> {{ variable.description }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Use Cases -->
        <div v-if="manifest.content.useCases" class="card p-8 mb-8">
          <h2 class="text-2xl font-bold text-primary-900 dark:text-primary-100 mb-6">When to Use This Calculator</h2>
          <div class="grid md:grid-cols-2 gap-6">
            <div v-for="useCase in manifest.content.useCases" :key="useCase.title" 
                 class="bg-neutral-50 dark:bg-neutral-700 rounded-lg p-6">
              <h3 class="text-lg font-semibold text-primary-800 dark:text-primary-200 mb-3">{{ useCase.title }}</h3>
              <p class="text-neutral-700 dark:text-neutral-300">{{ useCase.description }}</p>
            </div>
          </div>
        </div>

        <!-- Examples -->
        <div v-if="manifest.content.examples" class="card p-8 mb-8">
          <h2 class="text-2xl font-bold text-primary-900 dark:text-primary-100 mb-6">Examples</h2>
          <div class="space-y-6">
            <div v-for="example in manifest.content.examples" :key="example.title" 
                 class="border border-neutral-200 dark:border-neutral-700 rounded-lg p-6">
              <h3 class="text-lg font-semibold text-primary-800 dark:text-primary-200 mb-3">{{ example.title }}</h3>
              <div class="space-y-3">
                <p class="text-neutral-700 dark:text-neutral-300"><strong>Scenario:</strong> {{ example.scenario }}</p>
                <p class="text-neutral-700 dark:text-neutral-300"><strong>Calculation:</strong> 
                   <code class="bg-neutral-100 dark:bg-neutral-700 px-2 py-1 rounded text-sm font-mono">{{ example.calculation }}</code>
                </p>
                <p class="text-accent-700 dark:text-accent-400 font-semibold">{{ example.result }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Tips -->
        <div v-if="manifest.content.tips" class="card p-8 mb-8">
          <h2 class="text-2xl font-bold text-primary-900 dark:text-primary-100 mb-6">Tips & Things to Know</h2>
          <div class="space-y-3">
            <div v-for="tip in manifest.content.tips" :key="tip" 
                 class="flex items-start space-x-3">
              <svg class="w-5 h-5 text-accent-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
              <p class="text-neutral-700 dark:text-neutral-300">{{ tip }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Footer Info -->
      <footer class="max-w-4xl mx-auto px-4 mt-16 pb-12">
        <div class="card p-8 text-center">
          <h3 class="text-lg font-semibold text-primary-800 dark:text-primary-200 mb-2">
            Need Help?
          </h3>
          <p class="text-neutral-600 dark:text-neutral-400 mb-4">
            This calculator uses precise mathematical formulas to ensure accurate results.
          </p>
          <div class="flex flex-wrap justify-center gap-4 text-sm text-neutral-500 dark:text-neutral-400">
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