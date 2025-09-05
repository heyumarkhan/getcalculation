<script setup>
defineProps({
  tool: {
    type: Object,
    required: true,
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
  <NuxtLink 
    :to="`/${tool.categorySlug}/${tool.toolSlug}`" 
    class="group block card card-hover p-6 h-full flex flex-col transition-all duration-300 hover:scale-105"
  >
    <div class="flex items-start justify-between mb-4">
      <div class="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold"
           :class="getCategoryIconClass(tool.categorySlug)">
        {{ getCategoryIcon(tool.categorySlug) }}
      </div>
      <span class="badge text-xs font-medium px-3 py-1 rounded-full"
            :class="getCategoryBadgeClass(tool.categorySlug)">
        {{ tool.categorySlug }}
      </span>
    </div>
    
    <div class="flex-1">
      <h3 class="text-xl font-semibold text-primary-800 mb-3 group-hover:text-accent-600 transition-colors">
        {{ tool.toolName }}
      </h3>
      <p class="text-neutral-600 leading-relaxed mb-4">
        {{ tool.description }}
      </p>
    </div>
    
    <div class="flex items-center text-accent-600 font-medium group-hover:text-accent-700 transition-colors">
      <span>Use Calculator</span>
      <svg class="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
      </svg>
    </div>
  </NuxtLink>
</template>
