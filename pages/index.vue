<script setup>
import { ref, computed } from 'vue';

// Fetch all categories and all tools when the page loads.
const { data: categories } = await useAsyncData('categories', () => $fetch('/api/manifests/categories/_index'));
const { data: allTools } = await useAsyncData('all-tools', () => $fetch('/api/tools/all'));

// A 'ref' is a reactive variable. It will hold the user's search input.
const searchQuery = ref('');

// A 'computed' property automatically recalculates when its dependencies change.
// It will re-run the filter whenever 'searchQuery' changes, creating the "live search" effect.
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
</script>

<template>
  <div class="min-h-screen bg-neutral-50">
    <!-- Hero Section -->
    <header class="hero bg-gradient-primary text-white py-20 px-4">
      <div class="max-w-4xl mx-auto text-center">
        <h1 class="hero-title text-6xl md:text-7xl font-bold mb-6 animate-fade-in">
          getcalculation
        </h1>
        <p class="hero-subtitle text-xl md:text-2xl text-neutral-200 mb-12 max-w-3xl mx-auto animate-slide-up">
          Your go-to hub for precise and easy-to-use online calculators.
        </p>
        <div class="max-w-2xl mx-auto animate-slide-up">
          <input
            type="search"
            v-model.trim="searchQuery"
            placeholder="Search for any calculator (e.g., interest, velocity...)"
            class="search-input w-full px-6 py-4 text-lg border-2 border-white/20 rounded-2xl bg-white/10 backdrop-blur-sm text-white placeholder-white/70 focus:ring-4 focus:ring-accent-500/50 focus:border-accent-400 transition-all duration-300"
          />
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 py-12">
      <!-- Search Results -->
      <section v-if="searchQuery" class="animate-fade-in">
        <div class="mb-8">
          <h2 class="text-3xl font-semibold text-primary-800 mb-2">
            Search Results Are:
          </h2>
          <p class="text-neutral-600">
            Found {{ filteredTools.length }} calculator{{ filteredTools.length !== 1 ? 's' : '' }} for "{{ searchQuery }}"
          </p>
        </div>
        
        <div v-if="filteredTools.length > 0" class="responsive-grid">
          <ToolCard 
            v-for="tool in filteredTools" 
            :key="tool.toolSlug" 
            :tool="tool" 
            class="animate-scale-in"
          />
        </div>
        
        <div v-else class="text-center py-16">
          <div class="text-6xl mb-4">🔍</div>
          <h3 class="text-xl font-semibold text-neutral-700 mb-2">
            No calculators found
          </h3>
          <p class="text-neutral-500">
            Try searching with different keywords or browse our categories below.
          </p>
        </div>
      </section>

      <!-- Categories -->
      <section v-else class="animate-fade-in">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-primary-900 mb-4">
            All Categories
          </h2>
          <p class="text-xl text-neutral-600 max-w-2xl mx-auto">
            Explore our collection of calculators organized by subject area
          </p>
        </div>
        
        <div v-if="categories" class="responsive-grid">
          <NuxtLink 
            v-for="category in categories" 
            :key="category.slug" 
            :to="`/${category.slug}`" 
            class="group card card-hover p-8 text-center transform transition-all duration-300 hover:scale-105"
          >
            <div class="mb-6">
              <div class="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center text-2xl font-bold"
                   :class="getCategoryIconClass(category.slug)">
                {{ getCategoryIcon(category.slug) }}
              </div>
              <h3 class="text-2xl font-semibold text-primary-800 mb-3 group-hover:text-accent-600 transition-colors">
                {{ category.name }}
              </h3>
              <p class="text-neutral-600 leading-relaxed">
                {{ category.description }}
              </p>
            </div>
            <div class="inline-flex items-center text-accent-600 font-medium group-hover:text-accent-700 transition-colors">
              Explore Calculators
              <svg class="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </div>
          </NuxtLink>
        </div>
      </section>
    </main>
  </div>
</template>
