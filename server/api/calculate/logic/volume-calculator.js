/**
 * Volume Calculator
 * Calculates the volume of rectangular prisms and triangular pyramids
 */

import { BaseCalculator } from './base-calculator.js';

export class VolumeCalculator extends BaseCalculator {
  constructor(inputs, manifest) {
    super(inputs, manifest);
  }

  /**
   * Validate inputs for volume calculation
   * @returns {object} Validation result
   */
  validateInputs() {
    const result = super.validateInputs();
    if (!result) return { valid: false, error: this.errors.join(', ') };

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
  const calculator = new VolumeCalculator(inputs, manifest);
  return calculator.execute();
}

export default calculate;
