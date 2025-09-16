/**
 * Midpoint Calculator
 * Calculates the midpoint between two points on a coordinate plane
 */

import { BaseCalculator } from './base-calculator.js';

export class MidpointCalculator extends BaseCalculator {
  constructor() {
    super('MIDPOINT', 'Midpoint Calculator');
  }

  /**
   * Calculate midpoint
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

      // Calculate midpoint coordinates
      const midpointX = (x1 + x2) / 2;
      const midpointY = (y1 + y2) / 2;

      // Calculate distance between points
      const distanceBetweenPoints = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

      // Format coordinates
      const formatNumber = (num) => {
        if (Number.isInteger(num)) return num.toString();
        return Math.round(num * 1000000) / 1000000;
      };

      const midpointCoordinates = `(${formatNumber(midpointX)}, ${formatNumber(midpointY)})`;

      function isValidNumber(value) {
        return typeof value === 'number' && !isNaN(value) && isFinite(value);
      }

      return {
        midpointX: formatNumber(midpointX),
        midpointY: formatNumber(midpointY),
        midpointCoordinates,
        distanceBetweenPoints: formatNumber(distanceBetweenPoints),
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
  const calculator = new MidpointCalculator();
  return calculator.calculate(inputs, manifest);
}

export default calculate;