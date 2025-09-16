/**
 * Slope Calculator
 * Calculates the slope between two points on a coordinate plane
 */

import { BaseCalculator } from './base-calculator.js';

export class SlopeCalculator extends BaseCalculator {
  constructor() {
    super('SLOPE_CALCULATOR', 'Slope Calculator');
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