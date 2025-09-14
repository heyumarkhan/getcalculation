<template>
  <div class="min-h-screen bg-neutral-50 dark:bg-neutral-900 transition-colors duration-300">
    <!-- Theme Toggle - Fixed Position -->
    <div class="fixed top-4 right-4 z-50">
      <ThemeToggle />
    </div>
    
    <NuxtPage />
  </div>
</template>

<script setup>
// Theme is automatically initialized via the theme.client.js plugin
</script>