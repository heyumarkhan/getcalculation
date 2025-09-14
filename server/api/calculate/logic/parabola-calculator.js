/**
 * Parabola Calculator
 * Calculates parabola properties from standard form y = ax² + bx + c
 */

import { BaseCalculator } from './base-calculator.js';

export class ParabolaCalculator extends BaseCalculator {
  constructor(inputs, manifest) {
    super(inputs, manifest);
  }

  /**
   * Validate inputs for parabola calculation
   * @returns {object} Validation result
   */
  validateInputs() {
    const result = super.validateInputs();
    if (!result) return { valid: false, error: this.errors.join(', ') };

    // Extract coefficients from section-based or flat structure
    let a, b, c;
    if (this.inputs['parabola-coefficients']) {
      const coefficients = this.inputs['parabola-coefficients'];
      a = coefficients.a;
      b = coefficients.b;
      c = coefficients.c;
    } else {
      a = this.inputs.a;
      b = this.inputs.b;
      c = this.inputs.c;
    }

    // Check that coefficients are valid numbers
    if (!this.isValidNumber(a) || !this.isValidNumber(b) || !this.isValidNumber(c)) {
      return {
        valid: false,
        error: 'All coefficients (a, b, c) must be valid numbers'
      };
    }

    // a cannot be zero (would not be a parabola)
    if (a === 0) {
      return {
        valid: false,
        error: 'Coefficient a cannot be zero (would not be a parabola)'
      };
    }

    return { valid: true };
  }

  /**
   * Calculate parabola properties from standard form y = ax² + bx + c
   * 
   * Key formulas:
   * - Vertex: (-b/(2a), c - b²/(4a))
   * - Focus: (-b/(2a), c - b²/(4a) + 1/(4a))
   * - Directrix: y = c - b²/(4a) - 1/(4a)
   * - Axis of symmetry: x = -b/(2a)
   * 
   * @returns {object} Calculation results
   */
  calculate() {
    const validation = this.validateInputs();
    if (!validation.valid) {
      throw new Error(validation.error);
    }

    // Extract coefficients from section-based or flat structure
    let a, b, c;
    if (this.inputs['parabola-coefficients']) {
      const coefficients = this.inputs['parabola-coefficients'];
      a = coefficients.a;
      b = coefficients.b;
      c = coefficients.c;
    } else {
      a = this.inputs.a;
      b = this.inputs.b;
      c = this.inputs.c;
    }

    // Calculate vertex coordinates
    const vertexX = -b / (2 * a);
    const vertexY = c - (b * b) / (4 * a);

    // Calculate focus coordinates
    const focusX = vertexX; // Same x-coordinate as vertex
    const focusY = vertexY + 1 / (4 * a);

    // Calculate directrix (horizontal line)
    const directrixY = vertexY - 1 / (4 * a);

    // Calculate other properties
    const discriminant = b * b - 4 * a * c;
    const yIntercept = c; // When x = 0, y = c
    const opens = a > 0 ? 'upward' : 'downward';

    // Format output strings
    const vertex = this.formatCoordinates(vertexX, vertexY);
    const focus = this.formatCoordinates(focusX, focusY);
    const axisOfSymmetry = `x = ${this.formatNumber(vertexX)}`;
    const directrix = `y = ${this.formatNumber(directrixY)}`;

    return {
      vertexX: this.roundToPrecision(vertexX, 6),
      vertexY: this.roundToPrecision(vertexY, 6),
      vertex,
      axisOfSymmetry,
      focusX: this.roundToPrecision(focusX, 6),
      focusY: this.roundToPrecision(focusY, 6),
      focus,
      directrix,
      discriminant: this.roundToPrecision(discriminant, 6),
      yIntercept: this.roundToPrecision(yIntercept, 6),
      opens,
      // Additional calculated values for reference
      standardForm: this.formatStandardForm(a, b, c),
      vertexForm: this.formatVertexForm(a, vertexX, vertexY)
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
   * Format standard form equation
   * @param {number} a - Coefficient of x²
   * @param {number} b - Coefficient of x
   * @param {number} c - Constant term
   * @returns {string} Formatted equation
   */
  formatStandardForm(a, b, c) {
    let equation = 'y = ';

    // Handle a coefficient
    if (a === 1) {
      equation += 'x²';
    } else if (a === -1) {
      equation += '-x²';
    } else {
      equation += `${this.formatNumber(a)}x²`;
    }

    // Handle b coefficient
    if (b !== 0) {
      if (b > 0) equation += ' + ';
      if (b < 0) equation += ' - ';
      
      const absB = Math.abs(b);
      if (absB === 1) {
        equation += 'x';
      } else {
        equation += `${this.formatNumber(absB)}x`;
      }
    }

    // Handle c coefficient
    if (c !== 0) {
      if (c > 0 && (a !== 0 || b !== 0)) equation += ' + ';
      if (c < 0) equation += ' - ';
      
      equation += this.formatNumber(Math.abs(c));
    }

    return equation;
  }

  /**
   * Format vertex form equation
   * @param {number} a - Coefficient of x²
   * @param {number} h - Vertex x-coordinate
   * @param {number} k - Vertex y-coordinate
   * @returns {string} Formatted vertex form equation
   */
  formatVertexForm(a, h, k) {
    let equation = 'y = ';

    // Handle a coefficient
    if (a === 1) {
      equation += '';
    } else if (a === -1) {
      equation += '-';
    } else {
      equation += `${this.formatNumber(a)}`;
    }

    // Handle (x - h)² part
    if (h === 0) {
      equation += 'x²';
    } else if (h > 0) {
      equation += `(x - ${this.formatNumber(h)})²`;
    } else {
      equation += `(x + ${this.formatNumber(Math.abs(h))})²`;
    }

    // Handle k part
    if (k !== 0) {
      if (k > 0) equation += ' + ';
      if (k < 0) equation += ' - ';
      equation += this.formatNumber(Math.abs(k));
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

  /**
   * Execute the calculation
   * @returns {object} Calculation results
   */
  execute() {
    try {
      return this.calculate();
    } catch (error) {
      console.error('Parabola calculation error:', error);
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
  const calculator = new ParabolaCalculator(inputs, manifest);
  return calculator.execute();
}

export default calculate;
