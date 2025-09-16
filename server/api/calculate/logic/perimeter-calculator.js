/**
 * Perimeter Calculator
 * Calculates the perimeter of various geometric shapes
 */

import { BaseCalculator } from './base-calculator.js';

export class PerimeterCalculator extends BaseCalculator {
  constructor() {
    super('PERIMETER_CALCULATOR', 'Perimeter Calculator');
  }

  /**
   * Calculate perimeter
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
        case 'rectangle': {
          const { length, width } = extractDimensions('rectangle-dimensions');
          if (!isValidPositiveNumber(length) || !isValidPositiveNumber(width)) {
            return { error: 'Rectangle requires positive length and width values' };
          }
          const perimeter = 2 * (length + width);
          return {
            perimeter: roundToPrecision(perimeter, 6),
            formula: 'P = 2(l + w)',
            calculation: `P = 2(${formatNumber(length)} + ${formatNumber(width)}) = 2(${formatNumber(length + width)}) = ${formatNumber(perimeter)}`,
            shapeInfo: `Rectangle with length ${formatNumber(length)} and width ${formatNumber(width)}`,
            perimeterInWords: numberToWords(perimeter)
          };
        }

        case 'square': {
          const { side } = extractDimensions('square-dimensions');
          if (!isValidPositiveNumber(side)) {
            return { error: 'Square requires a positive side length value' };
          }
          const perimeter = 4 * side;
          return {
            perimeter: roundToPrecision(perimeter, 6),
            formula: 'P = 4s',
            calculation: `P = 4 × ${formatNumber(side)} = ${formatNumber(perimeter)}`,
            shapeInfo: `Square with side length ${formatNumber(side)}`,
            perimeterInWords: numberToWords(perimeter)
          };
        }

        case 'circle': {
          const { radius, diameter } = extractDimensions('circle-dimensions');
          if (!isValidPositiveNumber(radius) && !isValidPositiveNumber(diameter)) {
            return { error: 'Circle requires either a positive radius or diameter value' };
          }
          
          let r, formula, calculation;
          if (isValidPositiveNumber(radius)) {
            r = radius;
            formula = 'P = 2πr';
            calculation = `P = 2 × π × ${formatNumber(r)} ≈ ${formatNumber(2 * Math.PI * r)}`;
          } else {
            r = diameter / 2;
            formula = 'P = πd';
            calculation = `P = π × ${formatNumber(diameter)} ≈ ${formatNumber(Math.PI * diameter)}`;
          }
          
          const perimeter = 2 * Math.PI * r;
          return {
            perimeter: roundToPrecision(perimeter, 6),
            formula,
            calculation,
            shapeInfo: `Circle with radius ${formatNumber(r)}`,
            perimeterInWords: numberToWords(perimeter)
          };
        }

        case 'triangle': {
          const { sideA, sideB, sideC } = extractDimensions('triangle-dimensions');
          if (!isValidPositiveNumber(sideA) || !isValidPositiveNumber(sideB) || !isValidPositiveNumber(sideC)) {
            return { error: 'Triangle requires three positive side length values' };
          }
          
          // Check triangle inequality
          if (sideA + sideB <= sideC || sideA + sideC <= sideB || sideB + sideC <= sideA) {
            return { error: 'Invalid triangle: the sum of any two sides must be greater than the third side' };
          }
          
          const perimeter = sideA + sideB + sideC;
          return {
            perimeter: roundToPrecision(perimeter, 6),
            formula: 'P = a + b + c',
            calculation: `P = ${formatNumber(sideA)} + ${formatNumber(sideB)} + ${formatNumber(sideC)} = ${formatNumber(perimeter)}`,
            shapeInfo: `Triangle with sides ${formatNumber(sideA)}, ${formatNumber(sideB)}, and ${formatNumber(sideC)}`,
            perimeterInWords: numberToWords(perimeter)
          };
        }

        case 'regular-polygon': {
          const { numberOfSides, sideLength } = extractDimensions('polygon-dimensions');
          if (!isValidPositiveNumber(numberOfSides) || !isValidPositiveNumber(sideLength)) {
            return { error: 'Regular polygon requires positive number of sides and side length' };
          }
          if (numberOfSides < 3 || !Number.isInteger(numberOfSides)) {
            return { error: 'Number of sides must be an integer greater than or equal to 3' };
          }
          
          const perimeter = numberOfSides * sideLength;
          return {
            perimeter: roundToPrecision(perimeter, 6),
            formula: 'P = n × s',
            calculation: `P = ${numberOfSides} × ${formatNumber(sideLength)} = ${formatNumber(perimeter)}`,
            shapeInfo: `Regular ${numberOfSides}-sided polygon with side length ${formatNumber(sideLength)}`,
            perimeterInWords: numberToWords(perimeter)
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
  const calculator = new PerimeterCalculator();
  return calculator.calculate(inputs, manifest);
}

export default calculate;