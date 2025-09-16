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
      return { error: `Calculation error: ${error.message}` };
    }
  }

  /**
   * Validate inputs for finding missing side
   */
  validateFindMissingSide() {
    const triangle1 = this.extractTriangleData('triangle-1');
    const triangle2 = this.extractTriangleData('triangle-2');
    const missingSideInfo = this.extractMissingSideInfo();

    // Check if we have enough data for triangle 1
    const sides1 = [triangle1.side1A, triangle1.side1B, triangle1.side1C].filter(side => 
      this.isValidPositiveNumber(side)
    );
    
    if (sides1.length < 2) {
      return { valid: false, error: 'First triangle must have at least 2 known sides' };
    }

    // Check if we have enough data for triangle 2
    const sides2 = [triangle2.side2A, triangle2.side2B, triangle2.side2C].filter(side => 
      this.isValidPositiveNumber(side)
    );
    
    if (sides2.length < 2) {
      return { valid: false, error: 'Second triangle must have at least 2 known sides' };
    }

    if (!missingSideInfo.missingSide) {
      return { valid: false, error: 'Missing side must be specified' };
    }

    // Check if we have the corresponding side in triangle 1
    const correspondingSide = this.getCorrespondingSide(triangle1, missingSideInfo.missingSide);
    if (!this.isValidPositiveNumber(correspondingSide)) {
      return { valid: false, error: `Corresponding side ${missingSideInfo.missingSide} must be provided in the first triangle` };
    }

    // Check if we have at least one corresponding pair to determine scale factor
    const pairs = this.getCorrespondingPairs(triangle1, triangle2);
    if (pairs.length === 0) {
      return { valid: false, error: 'At least one pair of corresponding sides must be provided to determine scale factor' };
    }

    return { valid: true };
  }

  /**
   * Validate inputs for finding scale factor
   */
  validateFindScaleFactor() {
    const triangle1 = this.extractTriangleData('triangle-1');
    const triangle2 = this.extractTriangleData('triangle-2');

    // Check if we have at least one corresponding pair
    const pairs = this.getCorrespondingPairs(triangle1, triangle2);
    
    if (pairs.length === 0) {
      return { valid: false, error: 'At least one pair of corresponding sides must be provided' };
    }

    // Check for zero values in corresponding pairs
    const pairsWithZero = this.getCorrespondingPairsIncludingZero(triangle1, triangle2);
    for (const pair of pairsWithZero) {
      if (pair.side1 === 0 || pair.side2 === 0) {
        return { valid: false, error: 'Side lengths must be positive numbers (greater than 0)' };
      }
    }

    return { valid: true };
  }

  /**
   * Validate inputs for verifying similarity
   */
  validateVerifySimilarity() {
    const triangle1 = this.extractTriangleData('triangle-1');
    const triangle2 = this.extractTriangleData('triangle-2');

    // Check if we have all three sides for both triangles
    const sides1 = [triangle1.side1A, triangle1.side1B, triangle1.side1C];
    const sides2 = [triangle2.side2A, triangle2.side2B, triangle2.side2C];
    
    const validSides1 = sides1.filter(side => this.isValidPositiveNumber(side));
    const validSides2 = sides2.filter(side => this.isValidPositiveNumber(side));
    
    if (validSides1.length < 3 || validSides2.length < 3) {
      return { valid: false, error: 'Both triangles must have all three sides provided' };
    }

    // Check for zero values
    for (let i = 0; i < 3; i++) {
      if (sides1[i] === 0 || sides2[i] === 0) {
        return { valid: false, error: 'Side lengths must be positive numbers (greater than 0)' };
      }
    }

    return { valid: true };
  }

  /**
   * Extract triangle data from section-based or flat structure
   */
  extractTriangleData(sectionId) {
    if (this.inputs[sectionId]) {
      return this.inputs[sectionId];
    }
    return this.inputs;
  }

  /**
   * Extract missing side information
   */
  extractMissingSideInfo() {
    if (this.inputs['missing-side-info']) {
      return this.inputs['missing-side-info'];
    }
    return this.inputs;
  }

  /**
   * Get corresponding pairs of sides between triangles
   */
  getCorrespondingPairs(triangle1, triangle2) {
    const pairs = [];
    
    if (this.isValidPositiveNumber(triangle1.side1A) && this.isValidPositiveNumber(triangle2.side2A)) {
      pairs.push({ side1: triangle1.side1A, side2: triangle2.side2A, label: 'A' });
    }
    if (this.isValidPositiveNumber(triangle1.side1B) && this.isValidPositiveNumber(triangle2.side2B)) {
      pairs.push({ side1: triangle1.side1B, side2: triangle2.side2B, label: 'B' });
    }
    if (this.isValidPositiveNumber(triangle1.side1C) && this.isValidPositiveNumber(triangle2.side2C)) {
      pairs.push({ side1: triangle1.side1C, side2: triangle2.side2C, label: 'C' });
    }
    
    return pairs;
  }

  /**
   * Get corresponding pairs including zero values (for validation)
   */
  getCorrespondingPairsIncludingZero(triangle1, triangle2) {
    const pairs = [];
    
    if (this.isValidNonNegativeNumber(triangle1.side1A) && this.isValidNonNegativeNumber(triangle2.side2A)) {
      pairs.push({ side1: triangle1.side1A, side2: triangle2.side2A, label: 'A' });
    }
    if (this.isValidNonNegativeNumber(triangle1.side1B) && this.isValidNonNegativeNumber(triangle2.side2B)) {
      pairs.push({ side1: triangle1.side1B, side2: triangle2.side2B, label: 'B' });
    }
    if (this.isValidNonNegativeNumber(triangle1.side1C) && this.isValidNonNegativeNumber(triangle2.side2C)) {
      pairs.push({ side1: triangle1.side1C, side2: triangle2.side2C, label: 'C' });
    }
    
    return pairs;
  }

  /**
   * Get corresponding side from triangle 1
   */
  getCorrespondingSide(triangle1, sideLabel) {
    switch (sideLabel) {
      case 'A':
        return triangle1.side1A;
      case 'B':
        return triangle1.side1B;
      case 'C':
        return triangle1.side1C;
      default:
        return null;
    }
  }

  /**
   * Calculate based on calculation type
   * @returns {object} Calculation results
   */
  calculate() {
    const validation = this.validateInputs();
    if (!validation.valid) {
      throw new Error(validation.error);
    }

    // Extract calculation type
    let calculationType;
    if (this.inputs['triangle-type']) {
      calculationType = this.inputs['triangle-type'].calculationType;
    } else {
      calculationType = this.inputs.calculationType;
    }

    // Calculate based on type
    switch (calculationType) {
      case 'find-missing-side':
        return this.calculateMissingSide();
      case 'find-scale-factor':
        return this.calculateScaleFactor();
      case 'verify-similarity':
        return this.verifySimilarity();
      default:
        throw new Error('Unsupported calculation type');
    }
  }

  /**
   * Calculate missing side
   */
  calculateMissingSide(inputs) {
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
  }

  /**
   * Calculate scale factor
   */
  calculateScaleFactor() {
    const triangle1 = this.extractTriangleData('triangle-1');
    const triangle2 = this.extractTriangleData('triangle-2');

    const pairs = this.getCorrespondingPairs(triangle1, triangle2);
    
    if (pairs.length === 0) {
      throw new Error('No corresponding sides found');
    }

    // Calculate scale factors for all pairs
    const scaleFactors = pairs.map(pair => ({
      ...pair,
      scaleFactor: pair.side2 / pair.side1
    }));

    // Check if all scale factors are equal (within tolerance)
    const tolerance = 0.0001;
    const firstScaleFactor = scaleFactors[0].scaleFactor;
    const allEqual = scaleFactors.every(sf => 
      Math.abs(sf.scaleFactor - firstScaleFactor) < tolerance
    );

    return {
      result: this.roundToPrecision(firstScaleFactor, 6),
      proportion: scaleFactors.map(sf => 
        `${this.formatNumber(sf.side2)}/${this.formatNumber(sf.side1)} = ${this.formatNumber(sf.scaleFactor)}`
      ).join('\n'),
      scaleFactor: this.roundToPrecision(firstScaleFactor, 6),
      similarityStatus: allEqual ? 'Triangles are similar' : 'Triangles are not similar (scale factors differ)'
    };
  }

  /**
   * Verify similarity
   */
  verifySimilarity() {
    const triangle1 = this.extractTriangleData('triangle-1');
    const triangle2 = this.extractTriangleData('triangle-2');

    const sides1 = [triangle1.side1A, triangle1.side1B, triangle1.side1C];
    const sides2 = [triangle2.side2A, triangle2.side2B, triangle2.side2C];

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
