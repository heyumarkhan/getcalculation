/**
 * Length of a Line Segment Calculator
 * Calculates the distance between two points using the distance formula
 */

import { BaseCalculator } from './base-calculator.js';

export class LengthOfALineSegmentCalculator extends BaseCalculator {
  constructor(inputs, manifest) {
    super(inputs, manifest);
  }

  /**
   * Validate inputs for line segment length calculation
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
   * Calculate the length of a line segment between two points
   * Formula: d = √[(x₂ - x₁)² + (y₂ - y₁)²]
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

    // Calculate differences
    const horizontalDistance = x2 - x1;
    const verticalDistance = y2 - y1;

    // Calculate line segment length using distance formula
    const lineSegmentLength = Math.sqrt(
      Math.pow(horizontalDistance, 2) + Math.pow(verticalDistance, 2)
    );

    // Format coordinate display
    const coordinateDisplay = this.formatCoordinateDisplay(x1, y1, x2, y2);

    return {
      lineSegmentLength: this.roundToPrecision(lineSegmentLength, 6),
      horizontalDistance: this.roundToPrecision(Math.abs(horizontalDistance), 6),
      verticalDistance: this.roundToPrecision(Math.abs(verticalDistance), 6),
      coordinateDisplay,
      // Additional calculated values for reference
      point1: this.formatCoordinates(x1, y1),
      point2: this.formatCoordinates(x2, y2),
      deltaX: this.roundToPrecision(horizontalDistance, 6),
      deltaY: this.roundToPrecision(verticalDistance, 6)
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
   * Format coordinate display for both points
   * @param {number} x1 - First point x coordinate
   * @param {number} y1 - First point y coordinate
   * @param {number} x2 - Second point x coordinate
   * @param {number} y2 - Second point y coordinate
   * @returns {string} Formatted coordinate display
   */
  formatCoordinateDisplay(x1, y1, x2, y2) {
    const point1 = this.formatCoordinates(x1, y1);
    const point2 = this.formatCoordinates(x2, y2);
    return `${point1} to ${point2}`;
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
      console.error('Length of a Line Segment calculation error:', error);
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
  const calculator = new LengthOfALineSegmentCalculator(inputs, manifest);
  return calculator.execute();
}

export default calculate;
