/**
 * Brand Configuration for getcalculation
 * 
 * This file contains all brand guidelines, design tokens, and styling constants
 * to ensure consistency across the entire application.
 * 
 * Based on user requirements:
 * - Typography: "Clarity and Modernity" with Plus Jakarta Sans
 * - Color Palette: "Professional Trust with an Innovative Spark"
 * - Primary: Deep Navy Blue (#1B2A41)
 * - Accent: Professional Teal (#00A79D)
 * - Secondary Accents: Category-specific colors
 */

export const brandConfig = {
  // ========================================
  // BRAND IDENTITY
  // ========================================
  brand: {
    name: 'getcalculation',
    tagline: 'Your go-to hub for precise and easy-to-use online calculators',
    description: 'A modern, SEO-optimized calculator platform built with Nuxt.js',
    version: '1.0.0'
  },

  // ========================================
  // COLOR SYSTEM
  // ========================================
  colors: {
    // Primary Palette - Deep Navy Blue Foundation
    primary: {
      50: '#f0f4f8',
      100: '#d9e2ec',
      200: '#bcccdc',
      300: '#9fb3c8',
      400: '#829ab1',
      500: '#627d98',
      600: '#486581',
      700: '#334e68',
      800: '#243b53',
      900: '#1B2A41', // Main brand color
      950: '#0f172a',
      // Semantic aliases
      background: '#1B2A41',
      surface: '#243b53',
      text: '#1B2A41',
      muted: '#486581'
    },

    // Accent Color - Professional Teal
    accent: {
      50: '#f0fdfa',
      100: '#ccfbf1',
      200: '#99f6e4',
      300: '#5eead4',
      400: '#2dd4bf',
      500: '#00A79D', // Main accent color
      600: '#0d9488',
      700: '#0f766e',
      800: '#115e59',
      900: '#134e4a',
      950: '#042f2e',
      // Semantic aliases
      primary: '#00A79D',
      hover: '#0d9488',
      active: '#0f766e',
      glow: 'rgba(0, 167, 157, 0.3)'
    },

    // Category-Specific Colors
    categories: {
      math: {
        50: '#fefce8',
        100: '#fef9c3',
        200: '#fef08a',
        300: '#fde047',
        400: '#facc15',
        500: '#eab308', // Soft gold for math
        600: '#ca8a04',
        700: '#a16207',
        800: '#854d0e',
        900: '#713f12',
        primary: '#eab308',
        light: '#fef9c3',
        dark: '#a16207'
      },
      physics: {
        50: '#faf5ff',
        100: '#f3e8ff',
        200: '#e9d5ff',
        300: '#d8b4fe',
        400: '#c084fc',
        500: '#a855f7', // Gentle purple for physics
        600: '#9333ea',
        700: '#7c3aed',
        800: '#6b21a8',
        900: '#581c87',
        primary: '#a855f7',
        light: '#f3e8ff',
        dark: '#7c3aed'
      },
      chemistry: {
        50: '#f0f9ff',
        100: '#e0f2fe',
        200: '#bae6fd',
        300: '#7dd3fc',
        400: '#38bdf8',
        500: '#0ea5e9', // Sky blue for chemistry
        600: '#0284c7',
        700: '#0369a1',
        800: '#075985',
        900: '#0c4a6e',
        primary: '#0ea5e9',
        light: '#e0f2fe',
        dark: '#0369a1'
      },
      finance: {
        50: '#f0fdf4',
        100: '#dcfce7',
        200: '#bbf7d0',
        300: '#86efac',
        400: '#4ade80',
        500: '#22c55e', // Green for finance
        600: '#16a34a',
        700: '#15803d',
        800: '#166534',
        900: '#14532d',
        primary: '#22c55e',
        light: '#dcfce7',
        dark: '#15803d'
      }
    },

    // Neutral Grays
    neutral: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
      // Semantic aliases
      background: '#f8fafc',
      surface: '#ffffff',
      border: '#e2e8f0',
      text: '#0f172a',
      muted: '#64748b',
      subtle: '#94a3b8'
    },

    // Status Colors
    status: {
      success: {
        50: '#f0fdf4',
        500: '#22c55e',
        600: '#16a34a',
        700: '#15803d'
      },
      warning: {
        50: '#fefce8',
        500: '#eab308',
        600: '#ca8a04',
        700: '#a16207'
      },
      error: {
        50: '#fef2f2',
        500: '#ef4444',
        600: '#dc2626',
        700: '#b91c1c'
      },
      info: {
        50: '#f0f9ff',
        500: '#3b82f6',
        600: '#2563eb',
        700: '#1d4ed8'
      }
    }
  },

  // ========================================
  // TYPOGRAPHY SYSTEM
  // ========================================
  typography: {
    // Font Families
    fontFamily: {
      primary: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      display: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'Fira Code', 'Monaco', 'Consolas', 'monospace']
    },

    // Font Weights
    fontWeight: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800
    },

    // Font Sizes & Line Heights
    fontSize: {
      xs: {
        size: '0.75rem',    // 12px
        lineHeight: '1rem', // 16px
        letterSpacing: '0.025em'
      },
      sm: {
        size: '0.875rem',   // 14px
        lineHeight: '1.25rem', // 20px
        letterSpacing: '0.025em'
      },
      base: {
        size: '1rem',       // 16px
        lineHeight: '1.5rem', // 24px
        letterSpacing: '0'
      },
      lg: {
        size: '1.125rem',   // 18px
        lineHeight: '1.75rem', // 28px
        letterSpacing: '-0.025em'
      },
      xl: {
        size: '1.25rem',    // 20px
        lineHeight: '1.75rem', // 28px
        letterSpacing: '-0.025em'
      },
      '2xl': {
        size: '1.5rem',     // 24px
        lineHeight: '2rem', // 32px
        letterSpacing: '-0.025em'
      },
      '3xl': {
        size: '1.875rem',   // 30px
        lineHeight: '2.25rem', // 36px
        letterSpacing: '-0.025em'
      },
      '4xl': {
        size: '2.25rem',    // 36px
        lineHeight: '2.5rem', // 40px
        letterSpacing: '-0.025em'
      },
      '5xl': {
        size: '3rem',       // 48px
        lineHeight: '1',    // 48px
        letterSpacing: '-0.025em'
      },
      '6xl': {
        size: '3.75rem',    // 60px
        lineHeight: '1',    // 60px
        letterSpacing: '-0.025em'
      }
    },

    // Typography Scale
    scale: {
      display: {
        fontFamily: 'Plus Jakarta Sans',
        fontWeight: 700,
        fontSize: '3.75rem',
        lineHeight: '1',
        letterSpacing: '-0.025em'
      },
      h1: {
        fontFamily: 'Plus Jakarta Sans',
        fontWeight: 700,
        fontSize: '3rem',
        lineHeight: '1',
        letterSpacing: '-0.025em'
      },
      h2: {
        fontFamily: 'Plus Jakarta Sans',
        fontWeight: 600,
        fontSize: '1.875rem',
        lineHeight: '2.25rem',
        letterSpacing: '-0.025em'
      },
      h3: {
        fontFamily: 'Plus Jakarta Sans',
        fontWeight: 600,
        fontSize: '1.25rem',
        lineHeight: '1.75rem',
        letterSpacing: '-0.025em'
      },
      h4: {
        fontFamily: 'Plus Jakarta Sans',
        fontWeight: 500,
        fontSize: '1.125rem',
        lineHeight: '1.75rem',
        letterSpacing: '-0.025em'
      },
      body: {
        fontFamily: 'Plus Jakarta Sans',
        fontWeight: 400,
        fontSize: '1rem',
        lineHeight: '1.5rem',
        letterSpacing: '0'
      },
      caption: {
        fontFamily: 'Plus Jakarta Sans',
        fontWeight: 500,
        fontSize: '0.75rem',
        lineHeight: '1rem',
        letterSpacing: '0.1em',
        textTransform: 'uppercase'
      }
    }
  },

  // ========================================
  // SPACING SYSTEM
  // ========================================
  spacing: {
    // Base spacing unit (4px)
    unit: 4,
    
    // Spacing scale
    scale: {
      0: '0',
      1: '0.25rem',   // 4px
      2: '0.5rem',    // 8px
      3: '0.75rem',   // 12px
      4: '1rem',      // 16px
      5: '1.25rem',   // 20px
      6: '1.5rem',    // 24px
      8: '2rem',      // 32px
      10: '2.5rem',   // 40px
      12: '3rem',     // 48px
      16: '4rem',     // 64px
      20: '5rem',     // 80px
      24: '6rem',     // 96px
      32: '8rem',     // 128px
      40: '10rem',    // 160px
      48: '12rem',    // 192px
      56: '14rem',    // 224px
      64: '16rem'     // 256px
    },

    // Semantic spacing
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
  },

  // ========================================
  // BORDER RADIUS SYSTEM
  // ========================================
  borderRadius: {
    none: '0',
    sm: '0.125rem',   // 2px
    base: '0.25rem',  // 4px
    md: '0.375rem',   // 6px
    lg: '0.5rem',     // 8px
    xl: '0.75rem',    // 12px
    '2xl': '1rem',    // 16px
    '3xl': '1.5rem',  // 24px
    full: '9999px'
  },

  // ========================================
  // SHADOW SYSTEM
  // ========================================
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
  },

  // ========================================
  // ANIMATION SYSTEM
  // ========================================
  animations: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms'
    },
    easing: {
      linear: 'linear',
      ease: 'ease',
      easeIn: 'ease-in',
      easeOut: 'ease-out',
      easeInOut: 'ease-in-out',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
    },
    keyframes: {
      fadeIn: {
        '0%': { opacity: '0' },
        '100%': { opacity: '1' }
      },
      slideUp: {
        '0%': { transform: 'translateY(10px)', opacity: '0' },
        '100%': { transform: 'translateY(0)', opacity: '1' }
      },
      slideDown: {
        '0%': { transform: 'translateY(-10px)', opacity: '0' },
        '100%': { transform: 'translateY(0)', opacity: '1' }
      },
      scaleIn: {
        '0%': { transform: 'scale(0.95)', opacity: '0' },
        '100%': { transform: 'scale(1)', opacity: '1' }
      },
      bounceGentle: {
        '0%, 100%': { transform: 'translateY(0)' },
        '50%': { transform: 'translateY(-5px)' }
      }
    }
  },

  // ========================================
  // BREAKPOINTS
  // ========================================
  breakpoints: {
    xs: '0px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  },

  // ========================================
  // COMPONENT THEMES
  // ========================================
  components: {
    button: {
      sizes: {
        sm: {
          padding: '0.5rem 0.75rem',
          fontSize: '0.875rem',
          borderRadius: '0.375rem'
        },
        md: {
          padding: '0.75rem 1rem',
          fontSize: '1rem',
          borderRadius: '0.5rem'
        },
        lg: {
          padding: '1rem 1.5rem',
          fontSize: '1.125rem',
          borderRadius: '0.75rem'
        }
      },
      variants: {
        primary: {
          backgroundColor: '#00A79D',
          color: '#ffffff',
          hover: {
            backgroundColor: '#0d9488'
          }
        },
        secondary: {
          backgroundColor: '#f1f5f9',
          color: '#334e68',
          hover: {
            backgroundColor: '#e2e8f0'
          }
        },
        outline: {
          backgroundColor: 'transparent',
          color: '#00A79D',
          border: '2px solid #00A79D',
          hover: {
            backgroundColor: '#00A79D',
            color: '#ffffff'
          }
        }
      }
    },
    
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
    },

    input: {
      base: {
        padding: '0.75rem 1rem',
        border: '1px solid #cbd5e1',
        borderRadius: '0.5rem',
        fontSize: '1rem',
        transition: 'all 0.2s ease'
      },
      focus: {
        borderColor: '#00A79D',
        boxShadow: '0 0 0 3px rgba(0, 167, 157, 0.1)'
      }
    }
  },

  // ========================================
  // UTILITY FUNCTIONS
  // ========================================
  utils: {
    // Get category color
    getCategoryColor: (category) => {
      const categoryColors = {
        math: '#eab308',
        physics: '#a855f7',
        chemistry: '#0ea5e9',
        finance: '#22c55e'
      };
      return categoryColors[category] || '#64748b';
    },

    // Get category badge variant
    getCategoryBadge: (category) => {
      const badgeVariants = {
        math: 'math',
        physics: 'physics',
        chemistry: 'chemistry',
        finance: 'finance'
      };
      return badgeVariants[category] || 'neutral';
    },

    // Generate responsive spacing
    getResponsiveSpacing: (base, multiplier = 1) => {
      return {
        xs: `${base * 0.5 * multiplier}rem`,
        sm: `${base * 0.75 * multiplier}rem`,
        md: `${base * multiplier}rem`,
        lg: `${base * 1.25 * multiplier}rem`,
        xl: `${base * 1.5 * multiplier}rem`
      };
    }
  }
};

// Export individual sections for easier imports
export const colors = brandConfig.colors;
export const typography = brandConfig.typography;
export const spacing = brandConfig.spacing;
export const shadows = brandConfig.shadows;
export const animations = brandConfig.animations;
export const breakpoints = brandConfig.breakpoints;
export const components = brandConfig.components;

export default brandConfig;
