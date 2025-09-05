/**
 * TypeScript declarations for brand configuration
 */

export interface BrandConfig {
  brand: {
    name: string;
    tagline: string;
    description: string;
    version: string;
  };
  colors: {
    primary: ColorScale;
    accent: ColorScale;
    categories: {
      math: ColorScale;
      physics: ColorScale;
      chemistry: ColorScale;
      finance: ColorScale;
    };
    neutral: ColorScale;
    status: {
      success: ColorScale;
      warning: ColorScale;
      error: ColorScale;
      info: ColorScale;
    };
  };
  typography: {
    fontFamily: {
      primary: string[];
      display: string[];
      mono: string[];
    };
    fontWeight: {
      light: number;
      regular: number;
      medium: number;
      semibold: number;
      bold: number;
      extrabold: number;
    };
    fontSize: {
      [key: string]: {
        size: string;
        lineHeight: string;
        letterSpacing: string;
      };
    };
    scale: {
      display: TypographyStyle;
      h1: TypographyStyle;
      h2: TypographyStyle;
      h3: TypographyStyle;
      h4: TypographyStyle;
      body: TypographyStyle;
      caption: TypographyStyle;
    };
  };
  spacing: {
    unit: number;
    scale: { [key: string]: string };
    semantic: { [key: string]: string };
  };
  borderRadius: { [key: string]: string };
  shadows: { [key: string]: string };
  animations: {
    duration: { [key: string]: string };
    easing: { [key: string]: string };
    keyframes: { [key: string]: any };
  };
  breakpoints: { [key: string]: string };
  components: {
    button: {
      sizes: { [key: string]: any };
      variants: { [key: string]: any };
    };
    card: {
      base: any;
      hover: any;
    };
    input: {
      base: any;
      focus: any;
    };
  };
  utils: {
    getCategoryColor: (category: string) => string;
    getCategoryBadge: (category: string) => string;
    getResponsiveSpacing: (base: number, multiplier?: number) => { [key: string]: string };
  };
}

export interface ColorScale {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950?: string;
  primary?: string;
  light?: string;
  dark?: string;
  background?: string;
  surface?: string;
  text?: string;
  muted?: string;
  subtle?: string;
  hover?: string;
  active?: string;
  glow?: string;
}

export interface TypographyStyle {
  fontFamily: string;
  fontWeight: number;
  fontSize: string;
  lineHeight: string;
  letterSpacing: string;
  textTransform?: string;
}

export type CategoryType = 'math' | 'physics' | 'chemistry' | 'finance';
export type ColorVariant = 'primary' | 'secondary' | 'accent' | 'neutral';
export type SizeVariant = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
export type SpacingVariant = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
