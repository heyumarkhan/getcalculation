import { BaseCalculator } from './base-calculator.js';

/**
 * Mortgage Calculator
 * Calculates monthly mortgage payments
 */
export class MortgageCalculator extends BaseCalculator {
  constructor() {
    super('MORTGAGE_CALCULATOR', 'Mortgage Calculator');
  }

  /**
   * Calculate mortgage payment
   * @param {object} inputs - Input values
   * @param {object} manifest - Calculator manifest
   * @returns {object} Calculation results
   */
  calculate(inputs, manifest) {
    try {
      // Extract values from section-based inputs
      let loanAmount, interestRate, loanTerm, downPayment;
      
      if (inputs['mortgage-details']) {
        const mortgageDetails = inputs['mortgage-details'];
        loanAmount = mortgageDetails.loanAmount;
        interestRate = mortgageDetails.interestRate;
        loanTerm = mortgageDetails.loanTerm;
        downPayment = mortgageDetails.downPayment || 0;
      } else {
        // Fallback to flat structure
        loanAmount = inputs.loanAmount;
        interestRate = inputs.interestRate;
        loanTerm = inputs.loanTerm;
        downPayment = inputs.downPayment || 0;
      }

      // Validate inputs
      if (!loanAmount || !interestRate || !loanTerm) {
        return { error: 'Loan amount, interest rate, and loan term are required.' };
      }

      const loanAmountNum = Number(loanAmount);
      const interestRateNum = Number(interestRate);
      const loanTermNum = Number(loanTerm);
      const downPaymentNum = Number(downPayment) || 0;

      if (isNaN(loanAmountNum) || isNaN(interestRateNum) || isNaN(loanTermNum)) {
        return { error: 'Please enter valid numbers for all fields.' };
      }

      if (loanAmountNum <= 0 || interestRateNum < 0 || loanTermNum <= 0) {
        return { error: 'Loan amount and term must be positive, interest rate must be non-negative.' };
      }

      // Calculate principal (loan amount minus down payment)
      const principal = loanAmountNum - downPaymentNum;
      
      if (principal <= 0) {
        return { error: 'Down payment cannot be greater than or equal to loan amount.' };
      }

      // Convert annual interest rate to monthly
      const monthlyRate = interestRateNum / 100 / 12;
      
      // Convert loan term from years to months
      const numberOfPayments = loanTermNum * 12;

      // Calculate monthly payment using the mortgage formula
      // M = P [ r(1 + r)^n ] / [ (1 + r)^n - 1 ]
      const monthlyPayment = principal * 
        (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

      // Calculate total amount paid over loan term
      const totalAmountPaid = monthlyPayment * numberOfPayments;
      
      // Calculate total interest paid
      const totalInterestPaid = totalAmountPaid - principal;

      return {
        loanAmount: loanAmountNum,
        downPayment: downPaymentNum,
        principal: principal,
        interestRate: interestRateNum,
        loanTerm: loanTermNum,
        monthlyPayment: monthlyPayment,
        totalAmountPaid: totalAmountPaid,
        totalInterestPaid: totalInterestPaid,
        formula: 'M = P [ r(1 + r)^n ] / [ (1 + r)^n - 1 ]',
        calculation: `Monthly Payment = ${principal} × [ ${monthlyRate}(1 + ${monthlyRate})^${numberOfPayments} ] / [ (1 + ${monthlyRate})^${numberOfPayments} - 1 ] = ${monthlyPayment}`
      };
    } catch (error) {
      return { error: `Calculation error: ${error.message}` };
    }
  }
}

// Export the calculate function for the registry
export function calculate(inputs, manifest) {
  const calculator = new MortgageCalculator();
  return calculator.calculate(inputs, manifest);
}
