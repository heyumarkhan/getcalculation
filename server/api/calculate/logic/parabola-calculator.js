/**
 * Parabola Calculator
 * Calculates parabola properties from various forms
 */

import { BaseCalculator } from './base-calculator.js';

export class ParabolaCalculator extends BaseCalculator {
  constructor() {
    super('PARABOLA_CALCULATOR', 'Parabola Calculator');
  }

  /**
   * Calculate parabola properties
   * @param {object} inputs - Input values
   * @param {object} manifest - Calculator manifest
   * @returns {object} Calculation results
   */
  calculate(inputs, manifest) {
    try {
      // Extract calculation type
      let calculationType;
      if (inputs['parabola-type']) {
        calculationType = inputs['parabola-type'].calculationType;
      } else {
        calculationType = inputs.calculationType;
      }

      if (!calculationType) {
        return { error: 'Calculation type must be specified' };
      }

      // Calculate based on type
      switch (calculationType) {
        case 'vertex-form':
          return this.calculateVertexForm(inputs);
        case 'standard-form':
          return this.calculateStandardForm(inputs);
        case 'intercept-form':
          return this.calculateInterceptForm(inputs);
        case 'focus-directrix':
          return this.calculateFocusDirectrix(inputs);
        default:
          return { error: 'Unsupported calculation type' };
      }
    } catch (error) {
      return { error: `Calculation error: ${error.message}` };
    }
  }

  /**
   * Calculate vertex form parabola
   */
  calculateVertexForm(inputs) {
    const a = inputs.a;
    const h = inputs.h;
    const k = inputs.k;

    if (!this.isValidNumber(a) || !this.isValidNumber(h) || !this.isValidNumber(k)) {
      return { error: 'All coefficients (a, h, k) must be valid numbers' };
    }

    if (a === 0) {
      return { error: 'Coefficient a cannot be zero' };
    }

    const vertex = this.formatCoordinates(h, k);
    const direction = a > 0 ? 'upward' : 'downward';
    const vertexFormEquation = this.formatVertexForm(a, h, k);

    return {
      vertex: vertex,
      direction: direction,
      vertexFormEquation: vertexFormEquation,
      a: this.roundToPrecision(a, 6),
      h: this.roundToPrecision(h, 6),
      k: this.roundToPrecision(k, 6)
    };
  }

  /**
   * Calculate standard form parabola
   */
  calculateStandardForm(inputs) {
    const a = inputs.a;
    const b = inputs.b;
    const c = inputs.c;

    if (!this.isValidNumber(a) || !this.isValidNumber(b) || !this.isValidNumber(c)) {
      return { error: 'All coefficients (a, b, c) must be valid numbers' };
    }

    if (a === 0) {
      return { error: 'Coefficient a cannot be zero' };
    }

    // Calculate vertex coordinates
    const vertexX = -b / (2 * a);
    const vertexY = c - (b * b) / (4 * a);

    const vertex = this.formatCoordinates(vertexX, vertexY);
    const direction = a > 0 ? 'upward' : 'downward';
    const standardFormEquation = this.formatStandardForm(a, b, c);

    return {
      vertex: vertex,
      direction: direction,
      standardFormEquation: standardFormEquation,
      a: this.roundToPrecision(a, 6),
      b: this.roundToPrecision(b, 6),
      c: this.roundToPrecision(c, 6)
    };
  }

  /**
   * Calculate intercept form parabola
   */
  calculateInterceptForm(inputs) {
    const a = inputs.a;
    const p = inputs.p;
    const q = inputs.q;

    if (!this.isValidNumber(a) || !this.isValidNumber(p) || !this.isValidNumber(q)) {
      return { error: 'All coefficients (a, p, q) must be valid numbers' };
    }

    if (a === 0) {
      return { error: 'Coefficient a cannot be zero' };
    }

    // Calculate vertex coordinates
    const vertexX = (p + q) / 2;
    const vertexY = a * (vertexX - p) * (vertexX - q);

    const vertex = this.formatCoordinates(vertexX, vertexY);
    const direction = a > 0 ? 'upward' : 'downward';

    return {
      vertex: vertex,
      direction: direction,
      a: this.roundToPrecision(a, 6),
      p: this.roundToPrecision(p, 6),
      q: this.roundToPrecision(q, 6)
    };
  }

  /**
   * Calculate focus-directrix parabola
   */
  calculateFocusDirectrix(inputs) {
    const focusX = inputs.focusX;
    const focusY = inputs.focusY;
    const directrix = inputs.directrix;

    if (!this.isValidNumber(focusX) || !this.isValidNumber(focusY) || !this.isValidNumber(directrix)) {
      return { error: 'Focus coordinates and directrix must be valid numbers' };
    }

    // Calculate vertex (midpoint between focus and directrix)
    const vertexX = focusX;
    const vertexY = (focusY + directrix) / 2;

    const vertex = this.formatCoordinates(vertexX, vertexY);
    const direction = focusY > directrix ? 'upward' : 'downward';

    return {
      vertex: vertex,
      direction: direction,
      focusX: this.roundToPrecision(focusX, 6),
      focusY: this.roundToPrecision(focusY, 6),
      directrix: this.roundToPrecision(directrix, 6)
    };
  }

  /**
   * Format coordinates as string
   */
  formatCoordinates(x, y) {
    return `(${this.formatNumber(x)}, ${this.formatNumber(y)})`;
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
   * Format standard form equation
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
   */
  formatVertexForm(a, h, k) {
    let equation = 'y = ';

    // Handle a coefficient
    if (a === 1) {
      equation += '(x';
    } else if (a === -1) {
      equation += '-(x';
    } else {
      equation += `${this.formatNumber(a)}(x`;
    }

    // Handle h coefficient
    if (h === 0) {
      equation += ')²';
    } else if (h > 0) {
      equation += ` - ${this.formatNumber(h)})²`;
    } else {
      equation += ` + ${this.formatNumber(Math.abs(h))})²`;
    }

    // Handle k coefficient
    if (k !== 0) {
      if (k > 0) equation += ` + ${this.formatNumber(k)}`;
      if (k < 0) equation += ` - ${this.formatNumber(Math.abs(k))}`;
    }

    return equation;
  }

  /**
   * Check if a value is a valid number
   */
  isValidNumber(value) {
    return typeof value === 'number' && !isNaN(value) && isFinite(value);
  }

  /**
   * Round number to specified precision
   */
  roundToPrecision(value, precision) {
    return Math.round(value * Math.pow(10, precision)) / Math.pow(10, precision);
  }
}

/**
 * Calculate function for the calculator registry
 */
export function calculate(inputs, manifest) {
  const calculator = new ParabolaCalculator();
  return calculator.calculate(inputs, manifest);
}

export default calculate;