# 🎨 Design System Documentation

## Overview

This document outlines the comprehensive design system for **getcalculation**, built with Tailwind CSS and following your brand guidelines for "Clarity and Modernity" with "Professional Trust and an Innovative Spark."

## 🎯 Brand Guidelines

### Typography: "Clarity and Modernity"
- **Primary Font**: Plus Jakarta Sans
- **Headings**: Clean, modern sans-serif with technical feel
- **Body Text**: Regular weight for maximum legibility

### Color Palette: "Professional Trust with an Innovative Spark"
- **Primary Background**: Deep Navy Blue (#1B2A41)
- **Primary Accent**: Professional Teal (#00A79D)
- **Secondary Accents**: Category-specific colors (gold for math, purple for physics)

## 📁 File Structure

```
config/
├── brand.js              # Main brand configuration
├── design-tokens.js      # Atomic design tokens
types/
├── brand.d.ts           # TypeScript declarations
composables/
├── useBrand.js          # Vue composable for brand access
assets/css/
├── main.css             # Global styles with CSS variables
tailwind.config.js       # Tailwind configuration
```

## 🎨 Color System

### Primary Colors
```javascript
// Deep Navy Blue Foundation
primary: {
  50: '#f0f4f8',   // Lightest
  100: '#d9e2ec',
  200: '#bcccdc',
  300: '#9fb3c8',
  400: '#829ab1',
  500: '#627d98',
  600: '#486581',
  700: '#334e68',
  800: '#243b53',
  900: '#1B2A41',  // Main brand color
  950: '#0f172a'   // Darkest
}
```

### Accent Colors
```javascript
// Professional Teal
accent: {
  50: '#f0fdfa',   // Lightest
  100: '#ccfbf1',
  200: '#99f6e4',
  300: '#5eead4',
  400: '#2dd4bf',
  500: '#00A79D',  // Main accent color
  600: '#0d9488',
  700: '#0f766e',
  800: '#115e59',
  900: '#134e4a',  // Darkest
  950: '#042f2e'
}
```

### Category Colors
- **Math**: Soft Gold (#eab308)
- **Physics**: Gentle Purple (#a855f7)
- **Chemistry**: Sky Blue (#0ea5e9)
- **Finance**: Green (#22c55e)

## 📝 Typography System

### Font Families
```css
font-family-primary: 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif;
font-family-display: 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif;
font-family-mono: 'JetBrains Mono', 'Fira Code', 'Monaco', 'Consolas', monospace;
```

### Font Scale
| Size | Font Size | Line Height | Letter Spacing | Usage |
|------|-----------|-------------|----------------|-------|
| xs   | 12px      | 16px        | 0.025em        | Captions, labels |
| sm   | 14px      | 20px        | 0.025em        | Small text |
| base | 16px      | 24px        | 0              | Body text |
| lg   | 18px      | 28px        | -0.025em       | Large body text |
| xl   | 20px      | 28px        | -0.025em       | Small headings |
| 2xl  | 24px      | 32px        | -0.025em       | Medium headings |
| 3xl  | 30px      | 36px        | -0.025em       | Large headings |
| 4xl  | 36px      | 40px        | -0.025em       | Extra large headings |
| 5xl  | 48px      | 48px        | -0.025em       | Display text |
| 6xl  | 60px      | 60px        | -0.025em       | Hero text |

### Typography Scale
```javascript
// Predefined typography styles
scale: {
  display: { fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: '3.75rem', lineHeight: '1' },
  h1: { fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: '3rem', lineHeight: '1' },
  h2: { fontFamily: 'Plus Jakarta Sans', fontWeight: 600, fontSize: '1.875rem', lineHeight: '2.25rem' },
  h3: { fontFamily: 'Plus Jakarta Sans', fontWeight: 600, fontSize: '1.25rem', lineHeight: '1.75rem' },
  h4: { fontFamily: 'Plus Jakarta Sans', fontWeight: 500, fontSize: '1.125rem', lineHeight: '1.75rem' },
  body: { fontFamily: 'Plus Jakarta Sans', fontWeight: 400, fontSize: '1rem', lineHeight: '1.5rem' },
  caption: { fontFamily: 'Plus Jakarta Sans', fontWeight: 500, fontSize: '0.75rem', lineHeight: '1rem', textTransform: 'uppercase' }
}
```

## 📏 Spacing System

### Base Unit
- **Base Unit**: 4px
- **Scale**: 0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 56, 64

### Semantic Spacing
```javascript
semantic: {
  xs: '0.25rem',    // 4px
  sm: '0.5rem',     // 8px
  md: '1rem',       // 16px
  lg: '1.5rem',     // 24px
  xl: '2rem',       // 32px
  '2xl': '3rem',    // 48px
  '3xl': '4rem',    // 64px
  '4xl': '6rem',    // 96px
  '5xl': '8rem'     // 128px
}
```

## 🎭 Shadow System

### Shadow Scale
```javascript
shadows: {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  
  // Brand-specific shadows
  accent: '0 4px 25px -5px rgba(0, 167, 157, 0.2), 0 10px 10px -5px rgba(0, 167, 157, 0.1)',
  glow: '0 0 20px rgba(0, 167, 157, 0.3)',
  soft: '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
  medium: '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  strong: '0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
}
```

## 🎬 Animation System

### Duration
```javascript
duration: {
  fast: '150ms',
  normal: '300ms',
  slow: '500ms'
}
```

### Easing
```javascript
easing: {
  linear: 'linear',
  ease: 'ease',
  easeIn: 'ease-in',
  easeOut: 'ease-out',
  easeInOut: 'ease-in-out',
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
}
```

### Keyframes
- `fadeIn`: Fade in animation
- `slideUp`: Slide up from bottom
- `slideDown`: Slide down from top
- `scaleIn`: Scale in from center
- `bounceGentle`: Gentle bounce effect

## 📱 Breakpoints

```javascript
breakpoints: {
  xs: '0px',      // Mobile
  sm: '640px',    // Large mobile
  md: '768px',    // Tablet
  lg: '1024px',   // Desktop
  xl: '1280px',   // Large desktop
  '2xl': '1536px' // Extra large desktop
}
```

## 🧩 Component System

### Button Variants
```javascript
button: {
  sizes: {
    sm: { padding: '0.5rem 0.75rem', fontSize: '0.875rem', borderRadius: '0.375rem' },
    md: { padding: '0.75rem 1rem', fontSize: '1rem', borderRadius: '0.5rem' },
    lg: { padding: '1rem 1.5rem', fontSize: '1.125rem', borderRadius: '0.75rem' }
  },
  variants: {
    primary: { backgroundColor: '#00A79D', color: '#ffffff' },
    secondary: { backgroundColor: '#f1f5f9', color: '#334e68' },
    outline: { backgroundColor: 'transparent', color: '#00A79D', border: '2px solid #00A79D' }
  }
}
```

### Card System
```javascript
card: {
  base: {
    backgroundColor: '#ffffff',
    borderRadius: '0.75rem',
    boxShadow: '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
    border: '1px solid #e2e8f0'
  },
  hover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
  }
}
```

## 🛠 Usage Examples

### In Vue Components
```vue
<template>
  <div class="bg-primary-900 text-white p-6 rounded-xl shadow-soft">
    <h1 class="text-4xl font-bold mb-4">Welcome to getcalculation</h1>
    <p class="text-lg text-neutral-200 mb-6">Your go-to hub for precise calculations</p>
    <button class="btn btn-primary btn-lg">
      Get Started
    </button>
  </div>
</template>

<script setup>
import { useBrand } from '~/composables/useBrand';

const { getCategoryColor, getSpacing } = useBrand();

// Get category-specific color
const mathColor = getCategoryColor('math'); // Returns '#eab308'

// Get responsive spacing
const spacing = getSpacing('lg'); // Returns '1.5rem'
</script>
```

### Using Design Tokens
```javascript
import { designTokens, getToken } from '~/config/design-tokens';

// Get specific token
const primaryColor = getToken('colors.primary-500'); // Returns '#627d98'

// Get token group
const primaryColors = designTokens.colors.primary;

// Generate CSS variables
const cssVars = generateCSSVariables();
```

### Tailwind Classes
```html
<!-- Using brand colors -->
<div class="bg-primary-900 text-white">
  <h1 class="text-accent-500">Branded Heading</h1>
</div>

<!-- Using category colors -->
<div class="bg-math-50 text-math-700">
  <span class="badge-math">Mathematics</span>
</div>

<!-- Using spacing system -->
<div class="p-6 m-4 space-y-4">
  <div class="mb-2">Content with consistent spacing</div>
</div>

<!-- Using typography scale -->
<h1 class="text-5xl font-bold text-primary-900">Hero Title</h1>
<p class="text-lg text-neutral-600">Subtitle text</p>
```

## 🔧 Customization

### Adding New Colors
1. Update `config/brand.js`
2. Add to `config/design-tokens.js`
3. Update `tailwind.config.js`
4. Regenerate CSS variables

### Adding New Components
1. Define in `config/brand.js` components section
2. Create utility classes in `assets/css/main.css`
3. Add to composable in `composables/useBrand.js`

### Modifying Typography
1. Update font scale in `config/brand.js`
2. Regenerate design tokens
3. Update CSS variables

## 📊 Benefits

### For Developers
- **Consistency**: Centralized design values
- **Type Safety**: TypeScript declarations
- **Reusability**: Composable utilities
- **Maintainability**: Single source of truth

### For Designers
- **Scalability**: Systematic approach
- **Flexibility**: Easy customization
- **Documentation**: Clear guidelines
- **Tools Integration**: Design token export

### For Users
- **Accessibility**: Consistent contrast ratios
- **Performance**: Optimized CSS
- **Responsiveness**: Mobile-first approach
- **Brand Recognition**: Consistent visual identity

## 🚀 Next Steps

1. **Component Refactoring**: Update existing components to use new system
2. **Responsive Design**: Implement mobile-first patterns
3. **Accessibility**: Add ARIA labels and focus states
4. **Testing**: Create visual regression tests
5. **Documentation**: Add Storybook for component library

---

This design system provides a solid foundation for building consistent, accessible, and beautiful user interfaces while maintaining your brand identity and technical requirements.
