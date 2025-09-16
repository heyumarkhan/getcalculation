/**
 * Volume Calculator
 * Calculates the volume of various geometric shapes
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
}

/**
 * Calculate function for the calculator registry
 * @param {object} inputs - Input values
 * @param {object} manifest - Calculator manifest
 * @returns {object} Calculation results
 */
export function calculate(inputs, manifest) {
  const calculator = new VolumeCalculator();
  return calculator.calculate(inputs, manifest);
}

export default calculate;