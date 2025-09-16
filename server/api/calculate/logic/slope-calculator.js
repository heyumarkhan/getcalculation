/**
 * Slope Calculator (Using Gradient)
 * Calculates the slope/gradient of a line passing through two points
 */

import { BaseCalculator } from './base-calculator.js';

export class SlopeCalculator extends BaseCalculator {
  constructor() {
    super("SLOPE_CALCULATOR", "Slope Calculator");
  }

  /**
   * Calculate slope
   * @param {object} inputs - Input values
   * @param {object} manifest - Calculator manifest
   * @returns {object} Calculation results
   */
  calculate(inputs, manifest) {
    try {
      // Extract coordinates from section-based or flat structure
      let x1, y1, x2, y2;
      if (inputs['point-coordinates']) {
        const coords = inputs['point-coordinates'];
        x1 = coords.x1;
        y1 = coords.y1;
        x2 = coords.x2;
        y2 = coords.y2;
      } else {
        x1 = inputs.x1;
        y1 = inputs.y1;
        x2 = inputs.x2;
        y2 = inputs.y2;
      }

      // Validate inputs
      if (!isValidNumber(x1) || !isValidNumber(y1) || !isValidNumber(x2) || !isValidNumber(y2)) {
        return { error: 'All coordinates (x₁, y₁, x₂, y₂) must be valid numbers.' };
      }

      // Calculate rise and run
      const rise = y2 - y1;
      const run = x2 - x1;

      // Calculate slope
      let slope;
      let lineType;
      let slopeAsRatio;

      if (run === 0) {
        // Vertical line - undefined slope
        slope = null;
        lineType = 'vertical';
        slopeAsRatio = 'undefined (vertical line)';
      } else {
        slope = rise / run;
        
        // Determine line type
        if (slope === 0) {
          lineType = 'horizontal';
        } else if (slope > 0) {
          lineType = 'increasing';
        } else {
          lineType = 'decreasing';
        }

        // Create simple ratio representation
        const gcd = findGCD(Math.abs(rise), Math.abs(run));
        const simplifiedRise = rise / gcd;
        const simplifiedRun = run / gcd;
        
        if (simplifiedRise === 0) {
          slopeAsRatio = '0/1 (horizontal line)';
        } else if (simplifiedRun === 1) {
          slopeAsRatio = `${formatNumber(simplifiedRise)}/1`;
        } else if (simplifiedRun === -1) {
          slopeAsRatio = `${formatNumber(-simplifiedRise)}/1`;
        } else {
          slopeAsRatio = `${formatNumber(simplifiedRise)}/${formatNumber(simplifiedRun)}`;
        }
      }

      // Calculate angle of inclination
      let angleInDegrees = null;
      let angleInRadians = null;

      if (slope !== null) {
        angleInRadians = Math.atan(slope);
        angleInDegrees = angleInRadians * (180 / Math.PI);
      }

      // Format points display
      const formatNumber = (num) => {
        if (Number.isInteger(num)) return num.toString();
        return Math.round(num * 1000000) / 1000000;
      };

      const formatCoordinates = (x, y) => `(${formatNumber(x)}, ${formatNumber(y)})`;
      const pointsDisplay = `${formatCoordinates(x1, y1)} to ${formatCoordinates(x2, y2)}`;

      function isValidNumber(value) {
        return typeof value === 'number' && !isNaN(value) && isFinite(value);
      }

      function findGCD(a, b) {
        const intA = Math.round(a);
        const intB = Math.round(b);
        if (intB === 0) return intA;
        return findGCD(intB, intA % intB);
      }

      return {
        slope: slope !== null ? formatNumber(slope) : null,
        slopeAsRatio,
        angleInDegrees: angleInDegrees !== null ? formatNumber(angleInDegrees) : null,
        angleInRadians: angleInRadians !== null ? formatNumber(angleInRadians) : null,
        rise: formatNumber(rise),
        run: formatNumber(run),
        lineType,
        pointsDisplay
      };
    } catch (error) {
      return { error: `Calculation error: ${error.message}` };
    }
  }

  /**
   * Validate inputs for slope calculation
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
   * Calculate the slope/gradient of a line between two points
   * Formula: m = (y₂ - y₁) / (x₂ - x₁)
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

    // Calculate rise and run
    const rise = y2 - y1;
    const run = x2 - x1;

    // Calculate slope
    let slope;
    let lineType;
    let slopeAsRatio;

    if (run === 0) {
      // Vertical line - undefined slope
      slope = null;
      lineType = 'vertical';
      slopeAsRatio = 'undefined (vertical line)';
    } else {
      slope = rise / run;
      
      // Determine line type
      if (slope === 0) {
        lineType = 'horizontal';
      } else if (slope > 0) {
        lineType = 'increasing';
      } else {
        lineType = 'decreasing';
      }

      // Create ratio representation
      slopeAsRatio = this.createRatio(rise, run);
    }

    // Calculate angle of inclination (in degrees and radians)
    let angleInDegrees = null;
    let angleInRadians = null;

    if (slope !== null) {
      angleInRadians = Math.atan(slope);
      angleInDegrees = angleInRadians * (180 / Math.PI);
    }

    // Format coordinate display
    const pointsDisplay = this.formatPointsDisplay(x1, y1, x2, y2);

    return {
      slope: slope !== null ? this.roundToPrecision(slope, 6) : null,
      slopeAsRatio,
      angleInDegrees: angleInDegrees !== null ? this.roundToPrecision(angleInDegrees, 6) : null,
      angleInRadians: angleInRadians !== null ? this.roundToPrecision(angleInRadians, 6) : null,
      rise: this.roundToPrecision(rise, 6),
      run: this.roundToPrecision(run, 6),
      lineType,
      pointsDisplay,
      // Additional calculated values for reference
      point1: this.formatCoordinates(x1, y1),
      point2: this.formatCoordinates(x2, y2),
      isVertical: run === 0,
      isHorizontal: rise === 0
    };
  }

  /**
   * Create a simplified ratio representation of the slope
   * @param {number} rise - The rise (y₂ - y₁)
   * @param {number} run - The run (x₂ - x₁)
   * @returns {string} Simplified ratio string
   */
  createRatio(rise, run) {
    if (run === 0) {
      return 'undefined (vertical line)';
    }

    // Find GCD to simplify the ratio
    const gcd = this.findGCD(Math.abs(rise), Math.abs(run));
    const simplifiedRise = rise / gcd;
    const simplifiedRun = run / gcd;

    // Handle special cases
    if (simplifiedRise === 0) {
      return '0/1 (horizontal line)';
    }

    if (simplifiedRun === 1) {
      return `${this.formatNumber(simplifiedRise)}/1`;
    }

    if (simplifiedRun === -1) {
      return `${this.formatNumber(-simplifiedRise)}/1`;
    }

    return `${this.formatNumber(simplifiedRise)}/${this.formatNumber(simplifiedRun)}`;
  }

  /**
   * Find the Greatest Common Divisor of two numbers
   * @param {number} a - First number
   * @param {number} b - Second number
   * @returns {number} GCD
   */
  findGCD(a, b) {
    // Convert to integers for GCD calculation
    const intA = Math.round(a);
    const intB = Math.round(b);
    
    if (intB === 0) return intA;
    return this.findGCD(intB, intA % intB);
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
   * Format points display for both points
   * @param {number} x1 - First point x coordinate
   * @param {number} y1 - First point y coordinate
   * @param {number} x2 - Second point x coordinate
   * @param {number} y2 - Second point y coordinate
   * @returns {string} Formatted points display
   */
  formatPointsDisplay(x1, y1, x2, y2) {
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
      console.error('Slope calculation error:', error);
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
  const calculator = new SlopeCalculator();
  return calculator.calculate(inputs, manifest);
}

export default calculate;
