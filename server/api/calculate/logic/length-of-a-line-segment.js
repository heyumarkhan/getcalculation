/**
 * Length of Line Segment Calculator
 * Calculates the length of a line segment between two points
 */

import { BaseCalculator } from './base-calculator.js';

export class LengthOfLineSegmentCalculator extends BaseCalculator {
  constructor() {
    super('LENGTH_OF_A_LINE_SEGMENT', 'Length of Line Segment Calculator');
  }

  /**
   * Calculate length of line segment
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

      // Calculate differences
      const horizontalDistance = Math.abs(x2 - x1);
      const verticalDistance = Math.abs(y2 - y1);

      // Calculate line segment length using distance formula
      const lineSegmentLength = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

      // Format numbers
      const formatNumber = (num) => {
        if (Number.isInteger(num)) return num.toString();
        return Math.round(num * 1000000) / 1000000;
      };

      // Format coordinates
      const formatCoordinates = (x, y) => `(${formatNumber(x)}, ${formatNumber(y)})`;
      const coordinateDisplay = `${formatCoordinates(x1, y1)} to ${formatCoordinates(x2, y2)}`;

      function isValidNumber(value) {
        return typeof value === 'number' && !isNaN(value) && isFinite(value);
      }

      return {
        lineSegmentLength: formatNumber(lineSegmentLength),
        horizontalDistance: formatNumber(horizontalDistance),
        verticalDistance: formatNumber(verticalDistance),
        coordinateDisplay
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
  const calculator = new LengthOfLineSegmentCalculator();
  return calculator.calculate(inputs, manifest);
}

export default calculate;