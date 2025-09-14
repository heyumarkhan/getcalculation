/**
 * Standard Form to Slope Intercept Form Calculator
 * Converts equations from standard form (Ax + By = C) to slope-intercept form (y = mx + b)
 */

import { BaseCalculator } from './base-calculator.js';

export class StandardFormToSlopeInterceptCalculator extends BaseCalculator {
  constructor(inputs, manifest) {
    super(inputs, manifest);
  }

  /**
   * Validate inputs for standard form conversion
   * @returns {object} Validation result
   */
  validateInputs() {
    const result = super.validateInputs();
    if (!result) return { valid: false, error: this.errors.join(', ') };

    // Extract coefficients from section-based or flat structure
    let A, B, C;
    if (this.inputs['equation-coefficients']) {
      // Section-based structure
      const coefficients = this.inputs['equation-coefficients'];
      A = coefficients.A;
      B = coefficients.B;
      C = coefficients.C;
    } else {
      // Flat structure (for direct testing)
      A = this.inputs.A;
      B = this.inputs.B;
      C = this.inputs.C;
    }

    // Check that coefficients are valid numbers
    if (!this.isValidNumber(A) || !this.isValidNumber(B) || !this.isValidNumber(C)) {
      return {
        valid: false,
        error: 'All coefficients (A, B, C) must be valid numbers'
      };
    }

    // B cannot be zero (would make equation undefined for y)
    if (B === 0) {
      return {
        valid: false,
        error: 'Coefficient B cannot be zero (equation would be vertical line)'
      };
    }

    // A and B cannot both be zero
    if (A === 0 && B === 0) {
      return {
        valid: false,
        error: 'Coefficients A and B cannot both be zero'
      };
    }

    return { valid: true };
  }

  /**
   * Calculate slope-intercept form from standard form
   * Standard form: Ax + By = C
   * Slope-intercept form: y = mx + b
   * 
   * Where:
   * m (slope) = -A/B
   * b (y-intercept) = C/B
   * 
   * @returns {object} Calculation results
   */
  calculate() {
    const validation = this.validateInputs();
    if (!validation.valid) {
      throw new Error(validation.error);
    }

    // Extract coefficients from section-based or flat structure
    let A, B, C;
    if (this.inputs['equation-coefficients']) {
      // Section-based structure
      const coefficients = this.inputs['equation-coefficients'];
      A = coefficients.A;
      B = coefficients.B;
      C = coefficients.C;
    } else {
      // Flat structure (for direct testing)
      A = this.inputs.A;
      B = this.inputs.B;
      C = this.inputs.C;
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

    // Handle case where both A and B are 0
    if (A === 0 && B === 0) {
      equation = '0';
    }

    equation += ` = ${C}`;
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
    } else if (slope === 0) {
      equation += '0';
    } else {
      const formattedSlope = this.formatCoefficient(slope);
      equation += `${formattedSlope}x`;
    }

    // Handle y-intercept
    if (yIntercept !== 0) {
      if (yIntercept > 0 && slope !== 0) {
        equation += ` + ${this.formatCoefficient(yIntercept)}`;
      } else if (yIntercept < 0) {
        equation += ` - ${this.formatCoefficient(Math.abs(yIntercept))}`;
      } else if (slope === 0) {
        equation += this.formatCoefficient(yIntercept);
      } else {
        equation += ` + ${this.formatCoefficient(yIntercept)}`;
      }
    }

    // Special case for horizontal line (slope = 0)
    if (slope === 0) {
      equation = `y = ${this.formatCoefficient(yIntercept)}`;
    }

    return equation;
  }

  /**
   * Format coefficient for display
   * @param {number} coeff - Coefficient to format
   * @returns {string} Formatted coefficient
   */
  formatCoefficient(coeff) {
    // Check if it's a simple fraction
    const fraction = this.toFraction(coeff);
    if (fraction && Math.abs(coeff) < 1000 && fraction !== '1' && fraction !== '-1') {
      return fraction;
    }
    
    // Otherwise, format as decimal
    return this.roundToPrecision(coeff, 6).toString();
  }

  /**
   * Convert decimal to fraction string if it's a simple fraction
   * @param {number} decimal - Decimal to convert
   * @returns {string|null} Fraction string or null
   */
  toFraction(decimal) {
    if (decimal === 0) return '0';
    if (decimal === 1) return '1';
    if (decimal === -1) return '-1';

    const tolerance = 1e-10;
    let h1 = 1, h2 = 0, k1 = 0, k2 = 1;
    let b = decimal;
    let negative = false;

    if (b < 0) {
      negative = true;
      b = -b;
    }

    do {
      const a = Math.floor(b);
      const aux = h1;
      h1 = a * h1 + h2;
      h2 = aux;
      const aux2 = k1;
      k1 = a * k1 + k2;
      k2 = aux2;
      b = 1 / (b - a);
    } while (Math.abs(decimal - h1 / k1) > decimal * tolerance && k1 < 1000);

    // Only return simple fractions
    if (k1 > 100) return null;
    
    const result = `${h1}/${k1}`;
    return negative ? `-${result}` : result;
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
      console.error('Standard Form to Slope Intercept calculation error:', error);
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
  const calculator = new StandardFormToSlopeInterceptCalculator(inputs, manifest);
  return calculator.execute();
}

export default calculate;
