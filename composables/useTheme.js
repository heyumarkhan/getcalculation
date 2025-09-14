/**
 * Theme Management Composable
 * Handles dark/light mode switching and persistence
 */

import { ref, computed, watch } from 'vue'

const THEME_KEY = 'getcalculation-theme'
const DEFAULT_THEME = 'light'

// Global theme state
const theme = ref(DEFAULT_THEME)

// Available themes
export const themes = {
  light: 'light',
  dark: 'dark'
}

// Theme colors for each mode
export const themeColors = {
  light: {
    background: 'bg-neutral-50',
    surface: 'bg-white',
    text: 'text-neutral-900',
    textSecondary: 'text-neutral-700',
    border: 'border-neutral-200',
    card: 'bg-white border-neutral-200',
    input: 'bg-white border-neutral-300',
    primary: 'text-primary-900',
    accent: 'text-accent-600'
  },
  dark: {
    background: 'bg-neutral-900',
    surface: 'bg-neutral-800',
    text: 'text-neutral-100',
    textSecondary: 'text-neutral-300',
    border: 'border-neutral-700',
    card: 'bg-neutral-800 border-neutral-700',
    input: 'bg-neutral-700 border-neutral-600',
    primary: 'text-primary-100',
    accent: 'text-accent-400'
  }
}

export function useTheme() {
  // Initialize theme from localStorage or system preference
  const initializeTheme = () => {
    if (process.client) {
      const savedTheme = localStorage.getItem(THEME_KEY)
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      
      if (savedTheme && themes[savedTheme]) {
        theme.value = savedTheme
      } else if (systemPrefersDark) {
        theme.value = themes.dark
      } else {
        theme.value = themes.light
      }
      
      applyTheme(theme.value)
    }
  }

  // Apply theme to document
  const applyTheme = (newTheme) => {
    if (process.client) {
      const html = document.documentElement
      
      if (newTheme === themes.dark) {
        html.classList.add('dark')
      } else {
        html.classList.remove('dark')
      }
      
      // Update meta theme-color for mobile browsers
      const metaThemeColor = document.querySelector('meta[name="theme-color"]')
      if (metaThemeColor) {
        metaThemeColor.content = newTheme === themes.dark ? '#1f2937' : '#f9fafb'
      }
    }
  }

  // Toggle between light and dark
  const toggleTheme = () => {
    const newTheme = theme.value === themes.light ? themes.dark : themes.light
    setTheme(newTheme)
  }

  // Set specific theme
  const setTheme = (newTheme) => {
    if (themes[newTheme]) {
      theme.value = newTheme
      applyTheme(newTheme)
      
      if (process.client) {
        localStorage.setItem(THEME_KEY, newTheme)
      }
    }
  }

  // Watch for system theme changes
  const watchSystemTheme = () => {
    if (process.client) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      mediaQuery.addEventListener('change', (e) => {
        // Only auto-switch if user hasn't manually set a preference
        const savedTheme = localStorage.getItem(THEME_KEY)
        if (!savedTheme) {
          setTheme(e.matches ? themes.dark : themes.light)
        }
      })
    }
  }

  // Computed properties
  const isDark = computed(() => theme.value === themes.dark)
  const isLight = computed(() => theme.value === themes.light)
  const currentThemeColors = computed(() => themeColors[theme.value])

  // Watch theme changes for side effects
  watch(theme, (newTheme) => {
    applyTheme(newTheme)
  })

  return {
    // State
    theme: readonly(theme),
    isDark,
    isLight,
    currentThemeColors,
    
    // Methods
    toggleTheme,
    setTheme,
    initializeTheme,
    watchSystemTheme,
    
    // Constants
    themes,
    themeColors
  }
}

// Auto-initialize theme when composable is imported
if (process.client) {
  const { initializeTheme, watchSystemTheme } = useTheme()
  initializeTheme()
  watchSystemTheme()
}
