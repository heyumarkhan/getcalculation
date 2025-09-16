import { BaseCalculator } from './base-calculator.js';

/**
 * Decimal to Percent Calculator
 * Converts decimal numbers to percentages
 */
export class DecimalToPercentCalculator extends BaseCalculator {
  constructor() {
    super('DECIMAL_TO_PERCENT', 'Decimal to Percent Calculator');
  }

  /**
   * Calculate decimal to percent conversion
   * @param {object} inputs - Input values
   * @param {object} manifest - Calculator manifest
   * @returns {object} Calculation results
   */
  calculate(inputs, manifest) {
    try {
      // Extract decimal value
      const decimal = inputs.decimal;

      // Validate input
      if (decimal === null || decimal === undefined || decimal === '') {
        return { error: 'Decimal number is required.' };
      }

      const decimalNum = Number(decimal);
      if (isNaN(decimalNum)) {
        return { error: 'Please enter a valid decimal number.' };
      }

      // Calculate percent: Percent = Decimal × 100
      const percent = decimalNum * 100;

      return {
        decimal: decimalNum,
        percent: percent,
        formula: 'Percent = Decimal × 100',
        calculation: `${decimalNum} × 100 = ${percent}%`
      };
    } catch (error) {
      return { error: `Calculation error: ${error.message}` };
    }
  }
}

// Export the calculate function for the registry
export function calculate(inputs, manifest) {
  const calculator = new DecimalToPercentCalculator();
  return calculator.calculate(inputs, manifest);
}
