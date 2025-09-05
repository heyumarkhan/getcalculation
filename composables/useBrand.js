/**
 * Brand Configuration Composable
 * 
 * Provides easy access to brand configuration values in Vue components
 * with reactive updates and utility functions.
 */

import { computed, ref } from 'vue';
import brandConfig from '~/config/brand.js';

export const useBrand = () => {
  // Reactive brand configuration
  const config = ref(brandConfig);

  // Color utilities
  const colors = computed(() => config.value.colors);
  const getColor = (path) => {
    return path.split('.').reduce((obj, key) => obj?.[key], config.value.colors);
  };
  const getCategoryColor = (category) => {
    return config.value.utils.getCategoryColor(category);
  };

  // Typography utilities
  const typography = computed(() => config.value.typography);
  const getFontSize = (size) => {
    return config.value.typography.fontSize[size];
  };
  const getTypographyScale = (scale) => {
    return config.value.typography.scale[scale];
  };

  // Spacing utilities
  const spacing = computed(() => config.value.spacing);
  const getSpacing = (size) => {
    return config.value.spacing.scale[size];
  };
  const getResponsiveSpacing = (base, multiplier = 1) => {
    return config.value.utils.getResponsiveSpacing(base, multiplier);
  };

  // Component utilities
  const components = computed(() => config.value.components);
  const getButtonVariant = (variant) => {
    return config.value.components.button.variants[variant];
  };
  const getButtonSize = (size) => {
    return config.value.components.button.sizes[size];
  };

  // Shadow utilities
  const shadows = computed(() => config.value.shadows);
  const getShadow = (shadow) => {
    return config.value.shadows[shadow];
  };

  // Animation utilities
  const animations = computed(() => config.value.animations);
  const getAnimation = (animation) => {
    return config.value.animations.keyframes[animation];
  };

  // Breakpoint utilities
  const breakpoints = computed(() => config.value.breakpoints);
  const getBreakpoint = (breakpoint) => {
    return config.value.breakpoints[breakpoint];
  };

  // CSS Custom Properties generator
  const generateCSSVariables = () => {
    const variables = {};
    
    // Color variables
    Object.entries(config.value.colors).forEach(([colorName, colorScale]) => {
      if (typeof colorScale === 'object' && colorScale !== null) {
        Object.entries(colorScale).forEach(([shade, value]) => {
          variables[`--color-${colorName}-${shade}`] = value;
        });
      }
    });

    // Typography variables
    Object.entries(config.value.typography.fontSize).forEach(([size, props]) => {
      variables[`--font-size-${size}`] = props.size;
      variables[`--line-height-${size}`] = props.lineHeight;
      variables[`--letter-spacing-${size}`] = props.letterSpacing;
    });

    // Spacing variables
    Object.entries(config.value.spacing.scale).forEach(([size, value]) => {
      variables[`--spacing-${size}`] = value;
    });

    // Shadow variables
    Object.entries(config.value.shadows).forEach(([name, value]) => {
      variables[`--shadow-${name}`] = value;
    });

    return variables;
  };

  // Theme class generator
  const getThemeClasses = (component, variant = 'default') => {
    const componentConfig = config.value.components[component];
    if (!componentConfig) return {};

    const baseClasses = componentConfig.base || {};
    const variantClasses = componentConfig[variant] || {};

    return { ...baseClasses, ...variantClasses };
  };

  // Category-specific utilities
  const getCategoryBadge = (category) => {
    return config.value.utils.getCategoryBadge(category);
  };

  // Responsive utility generator
  const getResponsiveClasses = (property, values) => {
    const classes = {};
    Object.entries(values).forEach(([breakpoint, value]) => {
      if (breakpoint === 'base') {
        classes[property] = value;
      } else {
        classes[`${breakpoint}:${property}`] = value;
      }
    });
    return classes;
  };

  return {
    // Core configuration
    config,
    colors,
    typography,
    spacing,
    components,
    shadows,
    animations,
    breakpoints,

    // Utility functions
    getColor,
    getCategoryColor,
    getFontSize,
    getTypographyScale,
    getSpacing,
    getResponsiveSpacing,
    getButtonVariant,
    getButtonSize,
    getShadow,
    getAnimation,
    getBreakpoint,
    getCategoryBadge,
    getThemeClasses,
    getResponsiveClasses,
    generateCSSVariables
  };
};

// Export individual utilities for direct use
export const useColors = () => {
  const { colors, getColor, getCategoryColor } = useBrand();
  return { colors, getColor, getCategoryColor };
};

export const useTypography = () => {
  const { typography, getFontSize, getTypographyScale } = useBrand();
  return { typography, getFontSize, getTypographyScale };
};

export const useSpacing = () => {
  const { spacing, getSpacing, getResponsiveSpacing } = useBrand();
  return { spacing, getSpacing, getResponsiveSpacing };
};

export const useComponents = () => {
  const { components, getButtonVariant, getButtonSize, getThemeClasses } = useBrand();
  return { components, getButtonVariant, getButtonSize, getThemeClasses };
};

export default useBrand;
