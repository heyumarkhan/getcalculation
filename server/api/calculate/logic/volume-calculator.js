/**
 * Volume Calculator
 * Calculates the volume of rectangular prisms and triangular pyramids
 */

import { BaseCalculator } from './base-calculator.js';

export class VolumeCalculator extends BaseCalculator {
  constructor() {
    super('VOLUME_CALCULATOR', 'Volume Calculator');
  }

  /**
   * Calculate volume
   * @param {object} inputs - Input values
   * @param {object} manifest - Calculator manifest
   * @returns {object} Calculation results
   */
  calculate(inputs, manifest) {
    try {
      // Extract shape type from section-based or flat structure
      let shapeType;
      if (inputs['shape-selection']) {
        shapeType = inputs['shape-selection'].shapeType;
      } else {
        shapeType = inputs.shapeType;
      }

      if (!shapeType) {
        return { error: 'Shape type must be specified' };
      }

      // Extract dimensions helper
      const extractDimensions = (sectionId) => {
        if (inputs[sectionId]) {
          return inputs[sectionId];
        }
        return inputs;
      };

      // Helper functions
      function isValidPositiveNumber(value) {
        return typeof value === 'number' && !isNaN(value) && isFinite(value) && value > 0;
      }

      const formatNumber = (num) => {
        if (Number.isInteger(num)) return num.toString();
        return Math.round(num * 1000000) / 1000000;
      };

      const roundToPrecision = (value, precision) => {
        return Math.round(value * Math.pow(10, precision)) / Math.pow(10, precision);
      };

      const numberToWords = (num) => {
        if (num === 0) return 'zero';
        const rounded = roundToPrecision(num, 2);
        const isDecimal = !Number.isInteger(rounded);
        if (isDecimal) {
          return `approximately ${rounded}`;
        } else {
          return rounded.toString();
        }
      };

      // Calculate based on shape type
      switch (shapeType) {
        case 'cube': {
          const { side } = extractDimensions('cube-dimensions');
          if (!isValidPositiveNumber(side)) {
            return { error: 'Cube requires a positive side length value' };
          }
          const volume = side * side * side;
          return {
            volume: roundToPrecision(volume, 6),
            formula: 'V = s³',
            calculation: `V = ${formatNumber(side)}³ = ${formatNumber(volume)}`,
            shapeInfo: `Cube with side length ${formatNumber(side)}`,
            volumeInWords: numberToWords(volume)
          };
        }

        case 'rectangular-prism': {
          const { length, width, height } = extractDimensions('rectangular-prism-dimensions');
          if (!isValidPositiveNumber(length) || !isValidPositiveNumber(width) || !isValidPositiveNumber(height)) {
            return { error: 'Rectangular prism requires positive length, width, and height values' };
          }
          const volume = length * width * height;
          return {
            volume: roundToPrecision(volume, 6),
            formula: 'V = l × w × h',
            calculation: `V = ${formatNumber(length)} × ${formatNumber(width)} × ${formatNumber(height)} = ${formatNumber(volume)}`,
            shapeInfo: `Rectangular prism with length ${formatNumber(length)}, width ${formatNumber(width)}, and height ${formatNumber(height)}`,
            volumeInWords: numberToWords(volume)
          };
        }

        case 'cylinder': {
          const { radius, height } = extractDimensions('cylinder-dimensions');
          if (!isValidPositiveNumber(radius) || !isValidPositiveNumber(height)) {
            return { error: 'Cylinder requires positive radius and height values' };
          }
          const volume = Math.PI * radius * radius * height;
          return {
            volume: roundToPrecision(volume, 6),
            formula: 'V = πr²h',
            calculation: `V = π × ${formatNumber(radius)}² × ${formatNumber(height)} ≈ ${formatNumber(volume)}`,
            shapeInfo: `Cylinder with radius ${formatNumber(radius)} and height ${formatNumber(height)}`,
            volumeInWords: numberToWords(volume)
          };
        }

        case 'sphere': {
          const { radius } = extractDimensions('sphere-dimensions');
          if (!isValidPositiveNumber(radius)) {
            return { error: 'Sphere requires a positive radius value' };
          }
          const volume = (4/3) * Math.PI * radius * radius * radius;
          return {
            volume: roundToPrecision(volume, 6),
            formula: 'V = (4/3)πr³',
            calculation: `V = (4/3) × π × ${formatNumber(radius)}³ ≈ ${formatNumber(volume)}`,
            shapeInfo: `Sphere with radius ${formatNumber(radius)}`,
            volumeInWords: numberToWords(volume)
          };
        }

        case 'cone': {
          const { radius, height } = extractDimensions('cone-dimensions');
          if (!isValidPositiveNumber(radius) || !isValidPositiveNumber(height)) {
            return { error: 'Cone requires positive radius and height values' };
          }
          const volume = (1/3) * Math.PI * radius * radius * height;
          return {
            volume: roundToPrecision(volume, 6),
            formula: 'V = (1/3)πr²h',
            calculation: `V = (1/3) × π × ${formatNumber(radius)}² × ${formatNumber(height)} ≈ ${formatNumber(volume)}`,
            shapeInfo: `Cone with radius ${formatNumber(radius)} and height ${formatNumber(height)}`,
            volumeInWords: numberToWords(volume)
          };
        }

        case 'pyramid': {
          const { baseLength, baseWidth, height } = extractDimensions('pyramid-dimensions');
          if (!isValidPositiveNumber(baseLength) || !isValidPositiveNumber(baseWidth) || !isValidPositiveNumber(height)) {
            return { error: 'Pyramid requires positive base length, base width, and height values' };
          }
          const volume = (1/3) * baseLength * baseWidth * height;
          return {
            volume: roundToPrecision(volume, 6),
            formula: 'V = (1/3)lwh',
            calculation: `V = (1/3) × ${formatNumber(baseLength)} × ${formatNumber(baseWidth)} × ${formatNumber(height)} = ${formatNumber(volume)}`,
            shapeInfo: `Pyramid with base length ${formatNumber(baseLength)}, base width ${formatNumber(baseWidth)}, and height ${formatNumber(height)}`,
            volumeInWords: numberToWords(volume)
          };
        }

        default:
          return { error: 'Unsupported shape type' };
      }
    } catch (error) {
      return { error: `Calculation error: ${error.message}` };
    }
  }

    // Extract shape type from section-based or flat structure
    let shapeType;
    if (this.inputs['shape-selection']) {
      shapeType = this.inputs['shape-selection'].shapeType;
    } else {
      shapeType = this.inputs.shapeType;
    }

    if (!shapeType) {
      return { valid: false, error: 'Shape type must be specified' };
    }

    // Validate based on shape type
    switch (shapeType) {
      case 'rectangular-prism':
        return this.validateRectangularPrism();
      case 'triangular-pyramid':
        return this.validateTriangularPyramid();
      default:
        return { valid: false, error: 'Unsupported shape type' };
    }
  }

  /**
   * Validate rectangular prism inputs
   */
  validateRectangularPrism() {
    const { length, width, height } = this.extractDimensions('rectangular-prism-dimensions');
    
    if (!this.isValidPositiveNumber(length) || !this.isValidPositiveNumber(width) || !this.isValidPositiveNumber(height)) {
      return { valid: false, error: 'Rectangular prism requires positive length, width, and height values' };
    }
    
    return { valid: true };
  }

  /**
   * Validate triangular pyramid inputs
   */
  validateTriangularPyramid() {
    const { baseLength, baseHeight, pyramidHeight } = this.extractDimensions('triangular-pyramid-dimensions');
    
    if (!this.isValidPositiveNumber(baseLength) || !this.isValidPositiveNumber(baseHeight) || !this.isValidPositiveNumber(pyramidHeight)) {
      return { valid: false, error: 'Triangular pyramid requires positive base length, base height, and pyramid height values' };
    }
    
    return { valid: true };
  }

  /**
   * Extract dimensions from section-based or flat structure
   */
  extractDimensions(sectionId) {
    if (this.inputs[sectionId]) {
      return this.inputs[sectionId];
    }
    return this.inputs;
  }

  /**
   * Calculate the volume based on shape type
   * @returns {object} Calculation results
   */
  calculate() {
    const validation = this.validateInputs();
    if (!validation.valid) {
      throw new Error(validation.error);
    }

    // Extract shape type
    let shapeType;
    if (this.inputs['shape-selection']) {
      shapeType = this.inputs['shape-selection'].shapeType;
    } else {
      shapeType = this.inputs.shapeType;
    }

    // Calculate based on shape type
    switch (shapeType) {
      case 'rectangular-prism':
        return this.calculateRectangularPrismVolume();
      case 'triangular-pyramid':
        return this.calculateTriangularPyramidVolume();
      default:
        throw new Error('Unsupported shape type');
    }
  }

  /**
   * Calculate rectangular prism volume
   */
  calculateRectangularPrismVolume() {
    const { length, width, height } = this.extractDimensions('rectangular-prism-dimensions');
    const volume = length * width * height;
    
    return {
      volume: this.roundToPrecision(volume, 6),
      formula: 'V = l × w × h',
      calculation: `V = ${this.formatNumber(length)} × ${this.formatNumber(width)} × ${this.formatNumber(height)} = ${this.formatNumber(volume)}`,
      shapeInfo: `Rectangular prism with length ${this.formatNumber(length)}, width ${this.formatNumber(width)}, and height ${this.formatNumber(height)}`,
      volumeInWords: this.numberToWords(volume)
    };
  }

  /**
   * Calculate triangular pyramid volume
   */
  calculateTriangularPyramidVolume() {
    const { baseLength, baseHeight, pyramidHeight } = this.extractDimensions('triangular-pyramid-dimensions');
    
    // Calculate base area first
    const baseArea = 0.5 * baseLength * baseHeight;
    const volume = (1/3) * baseArea * pyramidHeight;
    
    return {
      volume: this.roundToPrecision(volume, 6),
      formula: 'V = (1/3) × (1/2 × b × h) × H',
      calculation: `V = (1/3) × (1/2 × ${this.formatNumber(baseLength)} × ${this.formatNumber(baseHeight)}) × ${this.formatNumber(pyramidHeight)} = (1/3) × ${this.formatNumber(baseArea)} × ${this.formatNumber(pyramidHeight)} = ${this.formatNumber(volume)}`,
      shapeInfo: `Triangular pyramid with base length ${this.formatNumber(baseLength)}, base height ${this.formatNumber(baseHeight)}, and pyramid height ${this.formatNumber(pyramidHeight)}`,
      volumeInWords: this.numberToWords(volume)
    };
  }

  /**
   * Convert number to words (basic implementation)
   */
  numberToWords(num) {
    if (num === 0) return 'zero';
    
    const rounded = this.roundToPrecision(num, 2);
    const isDecimal = !Number.isInteger(rounded);
    
    if (isDecimal) {
      return `approximately ${rounded}`;
    } else {
      return rounded.toString();
    }
  }

  /**
   * Format number for display
   */
  formatNumber(num) {
    if (Number.isInteger(num)) {
      return num.toString();
    }
    return this.roundToPrecision(num, 6).toString();
  }

  /**
   * Check if a value is a valid positive number
   */
  isValidPositiveNumber(value) {
    return typeof value === 'number' && !isNaN(value) && isFinite(value) && value > 0;
  }

  /**
   * Round number to specified precision
   */
  roundToPrecision(value, precision) {
    return Math.round(value * Math.pow(10, precision)) / Math.pow(10, precision);
  }

  /**
   * Execute the calculation
   */
  execute() {
    try {
      return this.calculate();
    } catch (error) {
      console.error('Volume calculation error:', error);
      throw new Error(`Calculation failed: ${error.message}`);
    }
  }
}

/**
 * Calculate function for the calculator registry
 */
export function calculate(inputs, manifest) {
  const calculator = new VolumeCalculator();
  return calculator.calculate(inputs, manifest);
}

export default calculate;
