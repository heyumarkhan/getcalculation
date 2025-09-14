<template>
  <ClientOnly>
    <button
      @click="toggleTheme"
      :aria-label="`Switch to ${isDark ? 'light' : 'dark'} mode`"
      class="theme-toggle"
      :class="[
        'relative inline-flex items-center justify-center',
        'w-12 h-12 rounded-lg transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        'hover:scale-105 active:scale-95',
        isDark 
          ? 'bg-neutral-700 hover:bg-neutral-600 focus:ring-neutral-500 text-yellow-400' 
          : 'bg-neutral-200 hover:bg-neutral-300 focus:ring-neutral-400 text-neutral-600'
      ]"
    >
    <!-- Sun Icon (Light Mode) -->
    <svg
      v-if="isDark"
      class="w-5 h-5 transition-all duration-300"
      :class="isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-75'"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>

    <!-- Moon Icon (Dark Mode) -->
    <svg
      v-else
      class="w-5 h-5 transition-all duration-300"
      :class="isLight ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-75'"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />
    </svg>

    <!-- Tooltip -->
    <div
      class="absolute -top-12 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs font-medium text-white bg-neutral-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap"
    >
      {{ isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode' }}
    </div>
    </button>
    <template #fallback>
      <!-- Fallback for SSR - shows a neutral button -->
      <button
        class="theme-toggle relative inline-flex items-center justify-center w-12 h-12 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 hover:scale-105 active:scale-95 bg-neutral-200 hover:bg-neutral-300 focus:ring-neutral-400 text-neutral-600"
        aria-label="Theme toggle"
      >
        <svg class="w-5 h-5 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      </button>
    </template>
  </ClientOnly>
</template>

<script setup>
import { useTheme } from '~/composables/useTheme'

const { toggleTheme, isDark, isLight } = useTheme()
</script>

<style scoped>
/* Smooth transitions for icon changes */
.theme-toggle svg {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Hover effect */
.theme-toggle:hover {
  transform: scale(1.05);
}

.theme-toggle:active {
  transform: scale(0.95);
}

/* Focus styles */
.theme-toggle:focus {
  @apply ring-2 ring-offset-2;
}

.theme-toggle:focus:not(:focus-visible) {
  @apply ring-0 ring-offset-0;
}

/* Dark mode specific styles */
.dark .theme-toggle {
  @apply shadow-lg;
}

/* Light mode specific styles */
:not(.dark) .theme-toggle {
  @apply shadow-md;
}
</style>
