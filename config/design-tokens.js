/**
 * Design Tokens for getcalculation
 * 
 * This file provides atomic design tokens that can be used
 * across different platforms and design tools.
 */

import brandConfig from './brand.js';

// ========================================
// DESIGN TOKENS
// ========================================

export const designTokens = {
  // ========================================
  // COLOR TOKENS
  // ========================================
  colors: {
    // Primary Brand Colors
    'primary-50': brandConfig.colors.primary[50],
    'primary-100': brandConfig.colors.primary[100],
    'primary-200': brandConfig.colors.primary[200],
    'primary-300': brandConfig.colors.primary[300],
    'primary-400': brandConfig.colors.primary[400],
    'primary-500': brandConfig.colors.primary[500],
    'primary-600': brandConfig.colors.primary[600],
    'primary-700': brandConfig.colors.primary[700],
    'primary-800': brandConfig.colors.primary[800],
    'primary-900': brandConfig.colors.primary[900],
    'primary-950': brandConfig.colors.primary[950],

    // Accent Colors
    'accent-50': brandConfig.colors.accent[50],
    'accent-100': brandConfig.colors.accent[100],
    'accent-200': brandConfig.colors.accent[200],
    'accent-300': brandConfig.colors.accent[300],
    'accent-400': brandConfig.colors.accent[400],
    'accent-500': brandConfig.colors.accent[500],
    'accent-600': brandConfig.colors.accent[600],
    'accent-700': brandConfig.colors.accent[700],
    'accent-800': brandConfig.colors.accent[800],
    'accent-900': brandConfig.colors.accent[900],
    'accent-950': brandConfig.colors.accent[950],

    // Category Colors
    'math-50': brandConfig.colors.categories.math[50],
    'math-500': brandConfig.colors.categories.math[500],
    'math-600': brandConfig.colors.categories.math[600],
    'math-700': brandConfig.colors.categories.math[700],

    'physics-50': brandConfig.colors.categories.physics[50],
    'physics-500': brandConfig.colors.categories.physics[500],
    'physics-600': brandConfig.colors.categories.physics[600],
    'physics-700': brandConfig.colors.categories.physics[700],

    'chemistry-50': brandConfig.colors.categories.chemistry[50],
    'chemistry-500': brandConfig.colors.categories.chemistry[500],
    'chemistry-600': brandConfig.colors.categories.chemistry[600],
    'chemistry-700': brandConfig.colors.categories.chemistry[700],

    'finance-50': brandConfig.colors.categories.finance[50],
    'finance-500': brandConfig.colors.categories.finance[500],
    'finance-600': brandConfig.colors.categories.finance[600],
    'finance-700': brandConfig.colors.categories.finance[700],

    // Neutral Colors
    'neutral-50': brandConfig.colors.neutral[50],
    'neutral-100': brandConfig.colors.neutral[100],
    'neutral-200': brandConfig.colors.neutral[200],
    'neutral-300': brandConfig.colors.neutral[300],
    'neutral-400': brandConfig.colors.neutral[400],
    'neutral-500': brandConfig.colors.neutral[500],
    'neutral-600': brandConfig.colors.neutral[600],
    'neutral-700': brandConfig.colors.neutral[700],
    'neutral-800': brandConfig.colors.neutral[800],
    'neutral-900': brandConfig.colors.neutral[900],

    // Status Colors
    'success-50': brandConfig.colors.status.success[50],
    'success-500': brandConfig.colors.status.success[500],
    'success-600': brandConfig.colors.status.success[600],
    'success-700': brandConfig.colors.status.success[700],

    'warning-50': brandConfig.colors.status.warning[50],
    'warning-500': brandConfig.colors.status.warning[500],
    'warning-600': brandConfig.colors.status.warning[600],
    'warning-700': brandConfig.colors.status.warning[700],

    'error-50': brandConfig.colors.status.error[50],
    'error-500': brandConfig.colors.status.error[500],
    'error-600': brandConfig.colors.status.error[600],
    'error-700': brandConfig.colors.status.error[700],

    'info-50': brandConfig.colors.status.info[50],
    'info-500': brandConfig.colors.status.info[500],
    'info-600': brandConfig.colors.status.info[600],
    'info-700': brandConfig.colors.status.info[700]
  },

  // ========================================
  // TYPOGRAPHY TOKENS
  // ========================================
  typography: {
    // Font Families
    'font-family-primary': brandConfig.typography.fontFamily.primary.join(', '),
    'font-family-display': brandConfig.typography.fontFamily.display.join(', '),
    'font-family-mono': brandConfig.typography.fontFamily.mono.join(', '),

    // Font Weights
    'font-weight-light': brandConfig.typography.fontWeight.light,
    'font-weight-regular': brandConfig.typography.fontWeight.regular,
    'font-weight-medium': brandConfig.typography.fontWeight.medium,
    'font-weight-semibold': brandConfig.typography.fontWeight.semibold,
    'font-weight-bold': brandConfig.typography.fontWeight.bold,
    'font-weight-extrabold': brandConfig.typography.fontWeight.extrabold,

    // Font Sizes
    'font-size-xs': brandConfig.typography.fontSize.xs.size,
    'font-size-sm': brandConfig.typography.fontSize.sm.size,
    'font-size-base': brandConfig.typography.fontSize.base.size,
    'font-size-lg': brandConfig.typography.fontSize.lg.size,
    'font-size-xl': brandConfig.typography.fontSize.xl.size,
    'font-size-2xl': brandConfig.typography.fontSize['2xl'].size,
    'font-size-3xl': brandConfig.typography.fontSize['3xl'].size,
    'font-size-4xl': brandConfig.typography.fontSize['4xl'].size,
    'font-size-5xl': brandConfig.typography.fontSize['5xl'].size,
    'font-size-6xl': brandConfig.typography.fontSize['6xl'].size,

    // Line Heights
    'line-height-xs': brandConfig.typography.fontSize.xs.lineHeight,
    'line-height-sm': brandConfig.typography.fontSize.sm.lineHeight,
    'line-height-base': brandConfig.typography.fontSize.base.lineHeight,
    'line-height-lg': brandConfig.typography.fontSize.lg.lineHeight,
    'line-height-xl': brandConfig.typography.fontSize.xl.lineHeight,
    'line-height-2xl': brandConfig.typography.fontSize['2xl'].lineHeight,
    'line-height-3xl': brandConfig.typography.fontSize['3xl'].lineHeight,
    'line-height-4xl': brandConfig.typography.fontSize['4xl'].lineHeight,
    'line-height-5xl': brandConfig.typography.fontSize['5xl'].lineHeight,
    'line-height-6xl': brandConfig.typography.fontSize['6xl'].lineHeight,

    // Letter Spacing
    'letter-spacing-xs': brandConfig.typography.fontSize.xs.letterSpacing,
    'letter-spacing-sm': brandConfig.typography.fontSize.sm.letterSpacing,
    'letter-spacing-base': brandConfig.typography.fontSize.base.letterSpacing,
    'letter-spacing-lg': brandConfig.typography.fontSize.lg.letterSpacing,
    'letter-spacing-xl': brandConfig.typography.fontSize.xl.letterSpacing,
    'letter-spacing-2xl': brandConfig.typography.fontSize['2xl'].letterSpacing,
    'letter-spacing-3xl': brandConfig.typography.fontSize['3xl'].letterSpacing,
    'letter-spacing-4xl': brandConfig.typography.fontSize['4xl'].letterSpacing,
    'letter-spacing-5xl': brandConfig.typography.fontSize['5xl'].letterSpacing,
    'letter-spacing-6xl': brandConfig.typography.fontSize['6xl'].letterSpacing
  },

  // ========================================
  // SPACING TOKENS
  // ========================================
  spacing: {
    'space-0': brandConfig.spacing.scale[0],
    'space-1': brandConfig.spacing.scale[1],
    'space-2': brandConfig.spacing.scale[2],
    'space-3': brandConfig.spacing.scale[3],
    'space-4': brandConfig.spacing.scale[4],
    'space-5': brandConfig.spacing.scale[5],
    'space-6': brandConfig.spacing.scale[6],
    'space-8': brandConfig.spacing.scale[8],
    'space-10': brandConfig.spacing.scale[10],
    'space-12': brandConfig.spacing.scale[12],
    'space-16': brandConfig.spacing.scale[16],
    'space-20': brandConfig.spacing.scale[20],
    'space-24': brandConfig.spacing.scale[24],
    'space-32': brandConfig.spacing.scale[32],
    'space-40': brandConfig.spacing.scale[40],
    'space-48': brandConfig.spacing.scale[48],
    'space-56': brandConfig.spacing.scale[56],
    'space-64': brandConfig.spacing.scale[64],

    // Semantic spacing
    'space-xs': brandConfig.spacing.semantic.xs,
    'space-sm': brandConfig.spacing.semantic.sm,
    'space-md': brandConfig.spacing.semantic.md,
    'space-lg': brandConfig.spacing.semantic.lg,
    'space-xl': brandConfig.spacing.semantic.xl,
    'space-2xl': brandConfig.spacing.semantic['2xl'],
    'space-3xl': brandConfig.spacing.semantic['3xl'],
    'space-4xl': brandConfig.spacing.semantic['4xl'],
    'space-5xl': brandConfig.spacing.semantic['5xl']
  },

  // ========================================
  // BORDER RADIUS TOKENS
  // ========================================
  borderRadius: {
    'radius-none': brandConfig.borderRadius.none,
    'radius-sm': brandConfig.borderRadius.sm,
    'radius-base': brandConfig.borderRadius.base,
    'radius-md': brandConfig.borderRadius.md,
    'radius-lg': brandConfig.borderRadius.lg,
    'radius-xl': brandConfig.borderRadius.xl,
    'radius-2xl': brandConfig.borderRadius['2xl'],
    'radius-3xl': brandConfig.borderRadius['3xl'],
    'radius-full': brandConfig.borderRadius.full
  },

  // ========================================
  // SHADOW TOKENS
  // ========================================
  shadows: {
    'shadow-none': brandConfig.shadows.none,
    'shadow-sm': brandConfig.shadows.sm,
    'shadow-base': brandConfig.shadows.base,
    'shadow-md': brandConfig.shadows.md,
    'shadow-lg': brandConfig.shadows.lg,
    'shadow-xl': brandConfig.shadows.xl,
    'shadow-2xl': brandConfig.shadows['2xl'],
    'shadow-inner': brandConfig.shadows.inner,
    'shadow-accent': brandConfig.shadows.accent,
    'shadow-glow': brandConfig.shadows.glow,
    'shadow-soft': brandConfig.shadows.soft,
    'shadow-medium': brandConfig.shadows.medium,
    'shadow-strong': brandConfig.shadows.strong
  },

  // ========================================
  // ANIMATION TOKENS
  // ========================================
  animations: {
    'duration-fast': brandConfig.animations.duration.fast,
    'duration-normal': brandConfig.animations.duration.normal,
    'duration-slow': brandConfig.animations.duration.slow,

    'easing-linear': brandConfig.animations.easing.linear,
    'easing-ease': brandConfig.animations.easing.ease,
    'easing-ease-in': brandConfig.animations.easing.easeIn,
    'easing-ease-out': brandConfig.animations.easing.easeOut,
    'easing-ease-in-out': brandConfig.animations.easing.easeInOut,
    'easing-bounce': brandConfig.animations.easing.bounce
  },

  // ========================================
  // BREAKPOINT TOKENS
  // ========================================
  breakpoints: {
    'breakpoint-xs': brandConfig.breakpoints.xs,
    'breakpoint-sm': brandConfig.breakpoints.sm,
    'breakpoint-md': brandConfig.breakpoints.md,
    'breakpoint-lg': brandConfig.breakpoints.lg,
    'breakpoint-xl': brandConfig.breakpoints.xl,
    'breakpoint-2xl': brandConfig.breakpoints['2xl']
  }
};

// ========================================
// TOKEN GROUPS
// ========================================

export const tokenGroups = {
  // Color groups
  primary: Object.fromEntries(
    Object.entries(designTokens.colors)
      .filter(([key]) => key.startsWith('primary-'))
      .map(([key, value]) => [key.replace('primary-', ''), value])
  ),
  
  accent: Object.fromEntries(
    Object.entries(designTokens.colors)
      .filter(([key]) => key.startsWith('accent-'))
      .map(([key, value]) => [key.replace('accent-', ''), value])
  ),

  neutral: Object.fromEntries(
    Object.entries(designTokens.colors)
      .filter(([key]) => key.startsWith('neutral-'))
      .map(([key, value]) => [key.replace('neutral-', ''), value])
  ),

  // Category colors
  math: Object.fromEntries(
    Object.entries(designTokens.colors)
      .filter(([key]) => key.startsWith('math-'))
      .map(([key, value]) => [key.replace('math-', ''), value])
  ),

  physics: Object.fromEntries(
    Object.entries(designTokens.colors)
      .filter(([key]) => key.startsWith('physics-'))
      .map(([key, value]) => [key.replace('physics-', ''), value])
  ),

  chemistry: Object.fromEntries(
    Object.entries(designTokens.colors)
      .filter(([key]) => key.startsWith('chemistry-'))
      .map(([key, value]) => [key.replace('chemistry-', ''), value])
  ),

  finance: Object.fromEntries(
    Object.entries(designTokens.colors)
      .filter(([key]) => key.startsWith('finance-'))
      .map(([key, value]) => [key.replace('finance-', ''), value])
  ),

  // Status colors
  success: Object.fromEntries(
    Object.entries(designTokens.colors)
      .filter(([key]) => key.startsWith('success-'))
      .map(([key, value]) => [key.replace('success-', ''), value])
  ),

  warning: Object.fromEntries(
    Object.entries(designTokens.colors)
      .filter(([key]) => key.startsWith('warning-'))
      .map(([key, value]) => [key.replace('warning-', ''), value])
  ),

  error: Object.fromEntries(
    Object.entries(designTokens.colors)
      .filter(([key]) => key.startsWith('error-'))
      .map(([key, value]) => [key.replace('error-', ''), value])
  ),

  info: Object.fromEntries(
    Object.entries(designTokens.colors)
      .filter(([key]) => key.startsWith('info-'))
      .map(([key, value]) => [key.replace('info-', ''), value])
  )
};

// ========================================
// UTILITY FUNCTIONS
// ========================================

export const getToken = (path) => {
  return path.split('.').reduce((obj, key) => obj?.[key], designTokens);
};

export const getTokenGroup = (group) => {
  return tokenGroups[group] || {};
};

export const generateCSSVariables = () => {
  const variables = {};
  
  // Generate CSS custom properties for all tokens
  Object.entries(designTokens).forEach(([category, tokens]) => {
    Object.entries(tokens).forEach(([token, value]) => {
      variables[`--${category}-${token}`] = value;
    });
  });

  return variables;
};

export const generateTailwindConfig = () => {
  return {
    colors: designTokens.colors,
    fontFamily: {
      sans: [brandConfig.typography.fontFamily.primary.join(', ')],
      display: [brandConfig.typography.fontFamily.display.join(', ')],
      mono: [brandConfig.typography.fontFamily.mono.join(', ')]
    },
    fontSize: brandConfig.typography.fontSize,
    fontWeight: brandConfig.typography.fontWeight,
    spacing: designTokens.spacing,
    borderRadius: designTokens.borderRadius,
    boxShadow: designTokens.shadows,
    screens: brandConfig.breakpoints
  };
};

export default designTokens;
