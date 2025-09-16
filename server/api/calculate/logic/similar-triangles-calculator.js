/**
 * Similar Triangles Calculator
 * Calculates missing sides, scale factors, and verifies similarity of triangles
 */

import { BaseCalculator } from './base-calculator.js';

export class SimilarTrianglesCalculator extends BaseCalculator {
  constructor() {
    super('SIMILAR_TRIANGLES_CALCULATOR', 'Similar Triangles Calculator');
  }

  /**
   * Calculate similar triangles
   * @param {object} inputs - Input values
   * @param {object} manifest - Calculator manifest
   * @returns {object} Calculation results
   */
  calculate(inputs, manifest) {
    try {
      // Validate inputs exist
      if (!inputs || typeof inputs !== 'object') {
        return { error: 'Invalid inputs provided' };
      }

      // Extract calculation type
      let calculationType;
      if (inputs['triangle-type']) {
        calculationType = inputs['triangle-type'].calculationType;
      } else {
        calculationType = inputs.calculationType;
      }

      if (!calculationType) {
        return { error: 'Calculation type must be specified' };
      }

      // Calculate based on type
      switch (calculationType) {
        case 'find-missing-side':
          return this.calculateMissingSide(inputs);
        case 'find-scale-factor':
          return this.calculateScaleFactor(inputs);
        case 'verify-similarity':
          return this.verifySimilarity(inputs);
        default:
          return { error: 'Unsupported calculation type' };
      }
    } catch (error) {
      console.error('Similar Triangles Calculator Error:', error);
      return { error: `Calculation error: ${error.message}` };
    }
  }






  /**
   * Calculate missing side
   */
  calculateMissingSide(inputs) {
    try {
      // For simple test cases, extract data directly from inputs
      const side1 = inputs.side1;
      const side2 = inputs.side2;
      const side3 = inputs.side3;
      const correspondingSide1 = inputs.correspondingSide1;
      const correspondingSide2 = inputs.correspondingSide2;
      const correspondingSide3 = inputs.correspondingSide3;

      if (!this.isValidPositiveNumber(side1) || !this.isValidPositiveNumber(side2) || !this.isValidPositiveNumber(side3)) {
        return { error: 'First triangle must have all three sides provided' };
      }

      if (!this.isValidPositiveNumber(correspondingSide1) || !this.isValidPositiveNumber(correspondingSide2)) {
        return { error: 'Second triangle must have at least two corresponding sides provided' };
      }

    // Calculate scale factor from the first two corresponding sides
    const scaleFactor = correspondingSide1 / side1;
    
    // Verify scale factor consistency with second pair
    const scaleFactor2 = correspondingSide2 / side2;
    const tolerance = 0.001;
    
    if (Math.abs(scaleFactor - scaleFactor2) > tolerance) {
      return { error: 'Triangles are not similar - scale factors are inconsistent' };
    }

    // Calculate the missing side (third side)
    const missingSide = side3 * scaleFactor;
    
      return {
        missingSide: this.roundToPrecision(missingSide, 6),
        scaleFactor: this.roundToPrecision(scaleFactor, 6),
        proportion: `${this.formatNumber(correspondingSide1)}/${this.formatNumber(side1)} = ${this.formatNumber(correspondingSide2)}/${this.formatNumber(side2)} = ${this.formatNumber(missingSide)}/${this.formatNumber(side3)}`,
        similarityStatus: 'Triangles are similar (scale factor consistent)'
      };
    } catch (error) {
      console.error('calculateMissingSide error:', error);
      return { error: `Missing side calculation error: ${error.message}` };
    }
  }

  /**
   * Calculate scale factor
   */
  calculateScaleFactor(inputs) {
    try {
      // For simple test cases, extract data directly from inputs
      const side1 = inputs.side1;
      const side2 = inputs.side2;
      const correspondingSide1 = inputs.correspondingSide1;
      const correspondingSide2 = inputs.correspondingSide2;

      if (!this.isValidPositiveNumber(side1) || !this.isValidPositiveNumber(side2)) {
        return { error: 'First triangle must have at least two sides provided' };
      }

      if (!this.isValidPositiveNumber(correspondingSide1) || !this.isValidPositiveNumber(correspondingSide2)) {
        return { error: 'Second triangle must have at least two corresponding sides provided' };
      }

    // Calculate scale factors for both pairs
    const scaleFactor1 = correspondingSide1 / side1;
    const scaleFactor2 = correspondingSide2 / side2;

    // Check if scale factors are equal (within tolerance)
    const tolerance = 0.0001;
    const allEqual = Math.abs(scaleFactor1 - scaleFactor2) < tolerance;

      return {
        scaleFactor: this.roundToPrecision(scaleFactor1, 6),
        scaleFactor1: this.roundToPrecision(scaleFactor1, 6),
        scaleFactor2: this.roundToPrecision(scaleFactor2, 6),
        proportion: `${this.formatNumber(correspondingSide1)}/${this.formatNumber(side1)} = ${this.formatNumber(scaleFactor1)}\n${this.formatNumber(correspondingSide2)}/${this.formatNumber(side2)} = ${this.formatNumber(scaleFactor2)}`,
        similarityStatus: allEqual ? 'Triangles are similar' : 'Triangles are not similar (scale factors differ)'
      };
    } catch (error) {
      console.error('calculateScaleFactor error:', error);
      return { error: `Scale factor calculation error: ${error.message}` };
    }
  }

  /**
   * Verify similarity
   */
  verifySimilarity(inputs) {
    try {
      // For simple test cases, extract data directly from inputs
      const side1 = inputs.side1;
      const side2 = inputs.side2;
      const side3 = inputs.side3;
      const correspondingSide1 = inputs.correspondingSide1;
      const correspondingSide2 = inputs.correspondingSide2;
      const correspondingSide3 = inputs.correspondingSide3;

      if (!this.isValidPositiveNumber(side1) || !this.isValidPositiveNumber(side2) || !this.isValidPositiveNumber(side3)) {
        return { error: 'First triangle must have all three sides provided' };
      }

      if (!this.isValidPositiveNumber(correspondingSide1) || !this.isValidPositiveNumber(correspondingSide2) || !this.isValidPositiveNumber(correspondingSide3)) {
        return { error: 'Second triangle must have all three corresponding sides provided' };
      }

    const sides1 = [side1, side2, side3];
    const sides2 = [correspondingSide1, correspondingSide2, correspondingSide3];

    // Calculate scale factors
    const scaleFactors = sides1.map((side1, index) => {
      const side2 = sides2[index];
      return side2 / side1;
    });

    // Check if all scale factors are equal (within tolerance)
    const tolerance = 0.0001;
    const firstScaleFactor = scaleFactors[0];
    const allEqual = scaleFactors.every(sf => 
      Math.abs(sf - firstScaleFactor) < tolerance
    );

      return {
        result: allEqual ? 1 : 0,
        proportion: scaleFactors.map((sf, index) => 
          `${this.formatNumber(sides2[index])}/${this.formatNumber(sides1[index])} = ${this.formatNumber(sf)}`
        ).join('\n'),
        scaleFactor: this.roundToPrecision(firstScaleFactor, 6),
        similarityStatus: allEqual ? 'Triangles are similar' : 'Triangles are not similar'
      };
    } catch (error) {
      console.error('verifySimilarity error:', error);
      return { error: `Similarity verification error: ${error.message}` };
    }
  }

  /**
   * Check if a value is a valid positive number
   */
  isValidPositiveNumber(value) {
    return typeof value === 'number' && !isNaN(value) && isFinite(value) && value > 0;
  }

  /**
   * Check if a value is a valid non-negative number (including zero)
   */
  isValidNonNegativeNumber(value) {
    return typeof value === 'number' && !isNaN(value) && isFinite(value) && value >= 0;
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
   * Round number to specified precision
   */
  roundToPrecision(value, precision) {
    return Math.round(value * Math.pow(10, precision)) / Math.pow(10, precision);
  }

  /**
   * Execute the calculation
   */
  execute(inputs, manifest) {
    try {
      return this.calculate(inputs, manifest);
    } catch (error) {
      console.error('Similar triangles calculation error:', error);
      throw new Error(`Calculation failed: ${error.message}`);
    }
  }
}

/**
 * Calculate function for the calculator registry
 */
export function calculate(inputs, manifest) {
  const calculator = new SimilarTrianglesCalculator();
  return calculator.calculate(inputs, manifest);
}

export default calculate;
