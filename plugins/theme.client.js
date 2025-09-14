/**
 * Client-side theme initialization plugin
 * Prevents hydration mismatches by initializing theme before Vue hydration
 */

export default defineNuxtPlugin(() => {
  const THEME_KEY = 'getcalculation-theme'
  
  // Initialize theme from localStorage or system preference
  const initializeTheme = () => {
    const savedTheme = localStorage.getItem(THEME_KEY)
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    let theme = 'light'
    if (savedTheme === 'dark' || savedTheme === 'light') {
      theme = savedTheme
    } else if (systemPrefersDark) {
      theme = 'dark'
    }
    
    // Apply theme to document
    const html = document.documentElement
    if (theme === 'dark') {
      html.classList.add('dark')
    } else {
      html.classList.remove('dark')
    }
    
    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]')
    if (metaThemeColor) {
      metaThemeColor.content = theme === 'dark' ? '#1f2937' : '#f9fafb'
    }
  }
  
  // Initialize theme immediately
  initializeTheme()
  
  // Watch for system theme changes
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  mediaQuery.addEventListener('change', (e) => {
    // Only auto-switch if user hasn't manually set a preference
    const savedTheme = localStorage.getItem(THEME_KEY)
    if (!savedTheme) {
      const html = document.documentElement
      if (e.matches) {
        html.classList.add('dark')
      } else {
        html.classList.remove('dark')
      }
    }
  })
})
