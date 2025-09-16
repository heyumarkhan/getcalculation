/**
 * Standard Form to Slope Intercept Form Calculator
 * Converts equations from standard form (Ax + By = C) to slope-intercept form (y = mx + b)
 */

import { BaseCalculator } from './base-calculator.js';

export class StandardFormToSlopeInterceptCalculator extends BaseCalculator {
  constructor() {
    super('STANDARD_FORM_TO_SLOPE_INTERCEPT', 'Standard Form to Slope Intercept Calculator');
  }

  /**
   * Calculate standard form to slope intercept conversion
   * @param {object} inputs - Input values
   * @param {object} manifest - Calculator manifest
   * @returns {object} Calculation results
   */
  calculate(inputs, manifest) {
    try {
      // Extract coefficients from section-based or flat structure
      let A, B, C;
      if (inputs['equation-coefficients']) {
        // Section-based structure
        const coefficients = inputs['equation-coefficients'];
        A = coefficients.A;
        B = coefficients.B;
        C = coefficients.C;
      } else {
        // Flat structure (for direct testing)
        A = inputs.A || inputs.a;
        B = inputs.B || inputs.b;
        C = inputs.C || inputs.c;
      }

      // Check that coefficients are valid numbers
      if (!this.isValidNumber(A) || !this.isValidNumber(B) || !this.isValidNumber(C)) {
        return { error: 'All coefficients (A, B, C) must be valid numbers' };
      }

      // B cannot be zero (would make equation undefined for y)
      if (B === 0) {
        return { error: 'Coefficient B cannot be zero (equation would be vertical line)' };
      }

      // A and B cannot both be zero
      if (A === 0 && B === 0) {
        return { error: 'Coefficients A and B cannot both be zero' };
      }

      // Convert to slope-intercept form: y = mx + b
      const slope = -A / B;
      const yIntercept = C / B;

      // Format the equation strings
      const standardFormEquation = this.formatStandardForm(A, B, C);
      const slopeInterceptEquation = this.formatSlopeIntercept(slope, yIntercept);

      // Additional calculations
      const xIntercept = A !== 0 ? C / A : null; // x-intercept (when y = 0)
      
      return {
        slope: this.roundToPrecision(slope, 6),
        yIntercept: this.roundToPrecision(yIntercept, 6),
        xIntercept: xIntercept !== null ? this.roundToPrecision(xIntercept, 6) : null,
        standardFormEquation,
        slopeInterceptEquation,
        isVerticalLine: B === 0,
        isHorizontalLine: A === 0
      };
    } catch (error) {
      return { error: `Calculation error: ${error.message}` };
    }
  }

  /**
   * Format standard form equation as string
   * @param {number} A - Coefficient of x
   * @param {number} B - Coefficient of y
   * @param {number} C - Constant term
   * @returns {string} Formatted equation
   */
  formatStandardForm(A, B, C) {
    let equation = '';

    // Handle A coefficient
    if (A === 1) {
      equation += 'x';
    } else if (A === -1) {
      equation += '-x';
    } else if (A !== 0) {
      equation += `${A}x`;
    }

    // Handle B coefficient
    if (B !== 0) {
      if (equation && B > 0) equation += ' + ';
      if (equation && B < 0) equation += ' - ';
      
      const absB = Math.abs(B);
      if (absB === 1) {
        equation += (!equation && B < 0 ? '-' : '') + 'y';
      } else {
        equation += (!equation && B < 0 ? '-' : '') + `${absB}y`;
      }
    }

    // Handle C coefficient
    if (equation && C > 0) equation += ' + ';
    if (equation && C < 0) equation += ' - ';
    equation += Math.abs(C);

    equation += ' = 0';
    return equation;
  }

  /**
   * Format slope-intercept form equation as string
   * @param {number} slope - Slope (m)
   * @param {number} yIntercept - Y-intercept (b)
   * @returns {string} Formatted equation
   */
  formatSlopeIntercept(slope, yIntercept) {
    let equation = 'y = ';

    // Handle slope
    if (slope === 1) {
      equation += 'x';
    } else if (slope === -1) {
      equation += '-x';
    } else {
      equation += `${this.roundToPrecision(slope, 6)}x`;
    }

    // Handle y-intercept
    if (yIntercept > 0) {
      equation += ` + ${this.roundToPrecision(yIntercept, 6)}`;
    } else if (yIntercept < 0) {
      equation += ` - ${this.roundToPrecision(Math.abs(yIntercept), 6)}`;
    }

    return equation;
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
}

/**
 * Calculate function for the calculator registry
 */
export function calculate(inputs, manifest) {
  const calculator = new StandardFormToSlopeInterceptCalculator();
  return calculator.calculate(inputs, manifest);
}

export default calculate;