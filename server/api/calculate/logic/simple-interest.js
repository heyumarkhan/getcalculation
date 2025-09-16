import { BaseCalculator } from './base-calculator.js';

/**
 * Simple Interest Calculator
 * Calculates simple interest and total amount
 */
export class SimpleInterestCalculator extends BaseCalculator {
  constructor() {
    super('SIMPLE_INTEREST', 'Simple Interest Calculator');
  }

  /**
   * Calculate simple interest
   * @param {object} inputs - Input values
   * @param {object} manifest - Calculator manifest
   * @returns {object} Calculation results
   */
  calculate(inputs, manifest) {
    try {
      // Extract values from section-based inputs
      let principal, rate, time, timeUnit;
      
      if (inputs['loan-details']) {
        const loanDetails = inputs['loan-details'];
        principal = loanDetails.principal;
        rate = loanDetails.rate;
        time = loanDetails.time;
        timeUnit = loanDetails.timeUnit || 'year';
      } else {
        // Fallback to flat structure
        principal = inputs.principal;
        rate = inputs.rate;
        time = inputs.time;
        timeUnit = inputs.timeUnit || 'year';
      }

      // Validate inputs
      if (!principal || !rate || !time) {
        return { error: 'Principal, rate, and time are required.' };
      }

      const principalNum = Number(principal);
      const rateNum = Number(rate);
      const timeNum = Number(time);

      if (isNaN(principalNum) || isNaN(rateNum) || isNaN(timeNum)) {
        return { error: 'Please enter valid numbers for all fields.' };
      }

      if (principalNum <= 0 || rateNum < 0 || timeNum <= 0) {
        return { error: 'Principal and time must be positive, rate must be non-negative.' };
      }

      // Convert time to years for calculation
      let timeInYears = timeNum;
      
      if (timeUnit === 'month') {
        timeInYears = timeNum / 12;
      } else if (timeUnit === 'week') {
        timeInYears = timeNum / 52; // Standard financial convention: 52 weeks per year
      } else if (timeUnit === 'day') {
        timeInYears = timeNum / 365.25; // Account for leap years
      }

      // Calculate simple interest: Interest = Principal × (Rate / 100) × Time (in years)
      const interest = principalNum * (rateNum / 100) * timeInYears;
      const totalAmount = principalNum + interest;

      return {
        principal: principalNum,
        rate: rateNum,
        time: timeNum,
        timeUnit: timeUnit,
        timeInYears: timeInYears,
        interest: interest,
        totalAmount: totalAmount,
        formula: 'Interest = Principal × (Rate / 100) × Time',
        calculation: `Interest = ${principalNum} × (${rateNum} / 100) × ${timeInYears} = ${interest}`,
        totalCalculation: `Total Amount = ${principalNum} + ${interest} = ${totalAmount}`
      };
    } catch (error) {
      return { error: `Calculation error: ${error.message}` };
    }
  }
}

// Export the calculate function for the registry
export function calculate(inputs, manifest) {
  const calculator = new SimpleInterestCalculator();
  return calculator.calculate(inputs, manifest);
}
