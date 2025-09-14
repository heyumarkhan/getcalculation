/**
 * Midpoint Calculator
 * Calculates the midpoint between two points on a coordinate plane
 */

import { BaseCalculator } from './base-calculator.js';

export class MidpointCalculator extends BaseCalculator {
  constructor(inputs, manifest) {
    super(inputs, manifest);
  }

  /**
   * Validate inputs for midpoint calculation
   * @returns {object} Validation result
   */
  validateInputs() {
    const result = super.validateInputs();
    if (!result) return { valid: false, error: this.errors.join(', ') };

    // Extract coordinates from section-based or flat structure
    let x1, y1, x2, y2;
    if (this.inputs['point-coordinates']) {
      const coords = this.inputs['point-coordinates'];
      x1 = coords.x1;
      y1 = coords.y1;
      x2 = coords.x2;
      y2 = coords.y2;
    } else {
      x1 = this.inputs.x1;
      y1 = this.inputs.y1;
      x2 = this.inputs.x2;
      y2 = this.inputs.y2;
    }

    // Check that all coordinates are valid numbers
    if (!this.isValidNumber(x1) || !this.isValidNumber(y1) || 
        !this.isValidNumber(x2) || !this.isValidNumber(y2)) {
      return {
        valid: false,
        error: 'All coordinates (x₁, y₁, x₂, y₂) must be valid numbers'
      };
    }

    return { valid: true };
  }

  /**
   * Calculate midpoint between two points
   * Formula: M = ((x₁ + x₂)/2, (y₁ + y₂)/2)
   * 
   * @returns {object} Calculation results
   */
  calculate() {
    const validation = this.validateInputs();
    if (!validation.valid) {
      throw new Error(validation.error);
    }

    // Extract coordinates from section-based or flat structure
    let x1, y1, x2, y2;
    if (this.inputs['point-coordinates']) {
      const coords = this.inputs['point-coordinates'];
      x1 = coords.x1;
      y1 = coords.y1;
      x2 = coords.x2;
      y2 = coords.y2;
    } else {
      x1 = this.inputs.x1;
      y1 = this.inputs.y1;
      x2 = this.inputs.x2;
      y2 = this.inputs.y2;
    }

    // Calculate midpoint coordinates
    const midpointX = (x1 + x2) / 2;
    const midpointY = (y1 + y2) / 2;

    // Calculate distance between the two points (bonus information)
    const distanceBetweenPoints = Math.sqrt(
      Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)
    );

    // Format coordinates
    const midpointCoordinates = this.formatCoordinates(midpointX, midpointY);
    const point1Coordinates = this.formatCoordinates(x1, y1);
    const point2Coordinates = this.formatCoordinates(x2, y2);
    return {
      midpointX: this.roundToPrecision(midpointX, 6),
      midpointY: this.roundToPrecision(midpointY, 6),
      midpointCoordinates,
      distanceBetweenPoints: this.roundToPrecision(distanceBetweenPoints, 6),
      point1Coordinates,
      point2Coordinates
    };
  }

  /**
   * Format coordinates as a string
   * @param {number} x - X coordinate
   * @param {number} y - Y coordinate
   * @returns {string} Formatted coordinate string
   */
  formatCoordinates(x, y) {
    const formattedX = this.formatNumber(x);
    const formattedY = this.formatNumber(y);
    return `(${formattedX}, ${formattedY})`;
  }

  /**
   * Format number for display (removes unnecessary decimals)
   * @param {number} num - Number to format
   * @returns {string} Formatted number string
   */
  formatNumber(num) {
    if (Number.isInteger(num)) {
      return num.toString();
    }
    
    // Round to 6 decimal places and remove trailing zeros
    const rounded = this.roundToPrecision(num, 6);
    return rounded.toString().replace(/\.?0+$/, '');
  }

  /**
   * Generate step-by-step calculation explanation
   * @param {number} x1 - First point x coordinate
   * @param {number} y1 - First point y coordinate
   * @param {number} x2 - Second point x coordinate
   * @param {number} y2 - Second point y coordinate
   * @param {number} midX - Calculated midpoint x
   * @param {number} midY - Calculated midpoint y
   * @returns {string} Step-by-step calculation

  /**
   * Check if a value is a valid number
   * @param {any} value - Value to check
   * @returns {boolean} True if valid number
   */
  isValidNumber(value) {
    return typeof value === 'number' && !isNaN(value) && isFinite(value);
  }

  /**
   * Round number to specified precision
   * @param {number} value - Value to round
   * @param {number} precision - Number of decimal places
   * @returns {number} Rounded value
   */
  roundToPrecision(value, precision) {
    return Math.round(value * Math.pow(10, precision)) / Math.pow(10, precision);
  }

  /**
   * Execute the calculation
   * @returns {object} Calculation results
   */
  execute() {
    try {
      return this.calculate();
    } catch (error) {
      console.error('Midpoint calculation error:', error);
      throw new Error(`Calculation failed: ${error.message}`);
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
  const calculator = new MidpointCalculator(inputs, manifest);
  return calculator.execute();
}

export default calculate;
