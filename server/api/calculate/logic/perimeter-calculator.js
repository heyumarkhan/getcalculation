/**
 * Perimeter Calculator
 * Calculates the perimeter of various geometric shapes
 */

import { BaseCalculator } from './base-calculator.js';

export class PerimeterCalculator extends BaseCalculator {
  constructor(inputs, manifest) {
    super(inputs, manifest);
  }

  /**
   * Validate inputs for perimeter calculation
   * @returns {object} Validation result
   */
  validateInputs() {
    const result = super.validateInputs();
    if (!result) return { valid: false, error: this.errors.join(', ') };

    // Extract shape type from section-based or flat structure
    let shapeType;
    if (this.inputs['shape-selection']) {
      shapeType = this.inputs['shape-selection'].shapeType;
    } else {
      shapeType = this.inputs.shapeType;
    }

    if (!shapeType) {
      return { valid: false, error: 'Shape type must be specified' };
    }

    // Validate based on shape type
    switch (shapeType) {
      case 'rectangle':
        return this.validateRectangle();
      case 'square':
        return this.validateSquare();
      case 'circle':
        return this.validateCircle();
      case 'triangle':
        return this.validateTriangle();
      case 'regular-polygon':
        return this.validateRegularPolygon();
      case 'parallelogram':
        return this.validateParallelogram();
      case 'rhombus':
        return this.validateRhombus();
      case 'trapezoid':
        return this.validateTrapezoid();
      default:
        return { valid: false, error: 'Unsupported shape type' };
    }
  }

  /**
   * Validate rectangle inputs
   */
  validateRectangle() {
    const { length, width } = this.extractDimensions('rectangle-dimensions');
    
    if (!this.isValidPositiveNumber(length) || !this.isValidPositiveNumber(width)) {
      return { valid: false, error: 'Rectangle requires positive length and width values' };
    }
    
    return { valid: true };
  }

  /**
   * Validate square inputs
   */
  validateSquare() {
    const { side } = this.extractDimensions('square-dimensions');
    
    if (!this.isValidPositiveNumber(side)) {
      return { valid: false, error: 'Square requires a positive side length value' };
    }
    
    return { valid: true };
  }

  /**
   * Validate circle inputs
   */
  validateCircle() {
    const { radius, diameter } = this.extractDimensions('circle-dimensions');
    
    if (!this.isValidPositiveNumber(radius) && !this.isValidPositiveNumber(diameter)) {
      return { valid: false, error: 'Circle requires either a positive radius or diameter value' };
    }
    
    return { valid: true };
  }

  /**
   * Validate triangle inputs
   */
  validateTriangle() {
    const { sideA, sideB, sideC } = this.extractDimensions('triangle-dimensions');
    
    if (!this.isValidPositiveNumber(sideA) || !this.isValidPositiveNumber(sideB) || !this.isValidPositiveNumber(sideC)) {
      return { valid: false, error: 'Triangle requires three positive side length values' };
    }

    // Check triangle inequality
    if (sideA + sideB <= sideC || sideA + sideC <= sideB || sideB + sideC <= sideA) {
      return { valid: false, error: 'Invalid triangle: the sum of any two sides must be greater than the third side' };
    }
    
    return { valid: true };
  }

  /**
   * Validate regular polygon inputs
   */
  validateRegularPolygon() {
    const { numberOfSides, sideLength } = this.extractDimensions('polygon-dimensions');
    
    if (!this.isValidPositiveNumber(numberOfSides) || !this.isValidPositiveNumber(sideLength)) {
      return { valid: false, error: 'Regular polygon requires positive number of sides and side length' };
    }

    if (numberOfSides < 3 || !Number.isInteger(numberOfSides)) {
      return { valid: false, error: 'Number of sides must be an integer greater than or equal to 3' };
    }
    
    return { valid: true };
  }

  /**
   * Validate parallelogram inputs (same as rectangle)
   */
  validateParallelogram() {
    const { length, width } = this.extractDimensions('parallelogram-dimensions');
    
    if (!this.isValidPositiveNumber(length) || !this.isValidPositiveNumber(width)) {
      return { valid: false, error: 'Parallelogram requires positive length and width values' };
    }
    
    return { valid: true };
  }

  /**
   * Validate rhombus inputs (same as square)
   */
  validateRhombus() {
    const { side } = this.extractDimensions('rhombus-dimensions');
    
    if (!this.isValidPositiveNumber(side)) {
      return { valid: false, error: 'Rhombus requires a positive side length value' };
    }
    
    return { valid: true };
  }

  /**
   * Validate trapezoid inputs
   */
  validateTrapezoid() {
    const dimensions = this.extractDimensions('trapezoid-dimensions');
    const { side1, side2, side3, side4 } = dimensions;
    
    if (!this.isValidPositiveNumber(side1) || !this.isValidPositiveNumber(side2) || 
        !this.isValidPositiveNumber(side3) || !this.isValidPositiveNumber(side4)) {
      return { valid: false, error: 'Trapezoid requires four positive side length values' };
    }
    
    return { valid: true };
  }

  /**
   * Extract dimensions from section-based or flat structure
   */
  extractDimensions(sectionId) {
    if (this.inputs[sectionId]) {
      return this.inputs[sectionId];
    }
    return this.inputs;
  }

  /**
   * Calculate the perimeter based on shape type
   * @returns {object} Calculation results
   */
  calculate() {
    const validation = this.validateInputs();
    if (!validation.valid) {
      throw new Error(validation.error);
    }

    // Extract shape type
    let shapeType;
    if (this.inputs['shape-selection']) {
      shapeType = this.inputs['shape-selection'].shapeType;
    } else {
      shapeType = this.inputs.shapeType;
    }

    // Calculate based on shape type
    switch (shapeType) {
      case 'rectangle':
        return this.calculateRectanglePerimeter();
      case 'square':
        return this.calculateSquarePerimeter();
      case 'circle':
        return this.calculateCirclePerimeter();
      case 'triangle':
        return this.calculateTrianglePerimeter();
      case 'regular-polygon':
        return this.calculateRegularPolygonPerimeter();
      case 'parallelogram':
        return this.calculateParallelogramPerimeter();
      case 'rhombus':
        return this.calculateRhombusPerimeter();
      case 'trapezoid':
        return this.calculateTrapezoidPerimeter();
      default:
        throw new Error('Unsupported shape type');
    }
  }

  /**
   * Calculate rectangle perimeter
   */
  calculateRectanglePerimeter() {
    const { length, width } = this.extractDimensions('rectangle-dimensions');
    const perimeter = 2 * (length + width);
    
    return {
      perimeter: this.roundToPrecision(perimeter, 6),
      formula: 'P = 2(l + w)',
      calculation: `P = 2(${this.formatNumber(length)} + ${this.formatNumber(width)}) = 2(${this.formatNumber(length + width)}) = ${this.formatNumber(perimeter)}`,
      shapeInfo: `Rectangle with length ${this.formatNumber(length)} and width ${this.formatNumber(width)}`,
      perimeterInWords: this.numberToWords(perimeter)
    };
  }

  /**
   * Calculate square perimeter
   */
  calculateSquarePerimeter() {
    const { side } = this.extractDimensions('square-dimensions');
    const perimeter = 4 * side;
    
    return {
      perimeter: this.roundToPrecision(perimeter, 6),
      formula: 'P = 4s',
      calculation: `P = 4 × ${this.formatNumber(side)} = ${this.formatNumber(perimeter)}`,
      shapeInfo: `Square with side length ${this.formatNumber(side)}`,
      perimeterInWords: this.numberToWords(perimeter)
    };
  }

  /**
   * Calculate circle perimeter (circumference)
   */
  calculateCirclePerimeter() {
    const { radius, diameter } = this.extractDimensions('circle-dimensions');
    
    let r;
    let formula;
    let calculation;
    
    if (this.isValidPositiveNumber(radius)) {
      r = radius;
      formula = 'P = 2πr';
      calculation = `P = 2 × π × ${this.formatNumber(r)} = 2 × ${this.formatNumber(Math.PI)} × ${this.formatNumber(r)} = ${this.formatNumber(2 * Math.PI * r)}`;
    } else {
      r = diameter / 2;
      formula = 'P = πd';
      calculation = `P = π × ${this.formatNumber(diameter)} = ${this.formatNumber(Math.PI)} × ${this.formatNumber(diameter)} = ${this.formatNumber(Math.PI * diameter)}`;
    }
    
    const perimeter = 2 * Math.PI * r;
    
    return {
      perimeter: this.roundToPrecision(perimeter, 6),
      formula,
      calculation,
      shapeInfo: `Circle with radius ${this.formatNumber(r)}`,
      perimeterInWords: this.numberToWords(perimeter)
    };
  }

  /**
   * Calculate triangle perimeter
   */
  calculateTrianglePerimeter() {
    const { sideA, sideB, sideC } = this.extractDimensions('triangle-dimensions');
    const perimeter = sideA + sideB + sideC;
    
    return {
      perimeter: this.roundToPrecision(perimeter, 6),
      formula: 'P = a + b + c',
      calculation: `P = ${this.formatNumber(sideA)} + ${this.formatNumber(sideB)} + ${this.formatNumber(sideC)} = ${this.formatNumber(perimeter)}`,
      shapeInfo: `Triangle with sides ${this.formatNumber(sideA)}, ${this.formatNumber(sideB)}, and ${this.formatNumber(sideC)}`,
      perimeterInWords: this.numberToWords(perimeter)
    };
  }

  /**
   * Calculate regular polygon perimeter
   */
  calculateRegularPolygonPerimeter() {
    const { numberOfSides, sideLength } = this.extractDimensions('polygon-dimensions');
    const perimeter = numberOfSides * sideLength;
    
    return {
      perimeter: this.roundToPrecision(perimeter, 6),
      formula: 'P = n × s',
      calculation: `P = ${numberOfSides} × ${this.formatNumber(sideLength)} = ${this.formatNumber(perimeter)}`,
      shapeInfo: `Regular ${numberOfSides}-sided polygon with side length ${this.formatNumber(sideLength)}`,
      perimeterInWords: this.numberToWords(perimeter)
    };
  }

  /**
   * Calculate parallelogram perimeter
   */
  calculateParallelogramPerimeter() {
    const { length, width } = this.extractDimensions('parallelogram-dimensions');
    const perimeter = 2 * (length + width);
    
    return {
      perimeter: this.roundToPrecision(perimeter, 6),
      formula: 'P = 2(a + b)',
      calculation: `P = 2(${this.formatNumber(length)} + ${this.formatNumber(width)}) = 2(${this.formatNumber(length + width)}) = ${this.formatNumber(perimeter)}`,
      shapeInfo: `Parallelogram with sides ${this.formatNumber(length)} and ${this.formatNumber(width)}`,
      perimeterInWords: this.numberToWords(perimeter)
    };
  }

  /**
   * Calculate rhombus perimeter
   */
  calculateRhombusPerimeter() {
    const { side } = this.extractDimensions('rhombus-dimensions');
    const perimeter = 4 * side;
    
    return {
      perimeter: this.roundToPrecision(perimeter, 6),
      formula: 'P = 4s',
      calculation: `P = 4 × ${this.formatNumber(side)} = ${this.formatNumber(perimeter)}`,
      shapeInfo: `Rhombus with side length ${this.formatNumber(side)}`,
      perimeterInWords: this.numberToWords(perimeter)
    };
  }

  /**
   * Calculate trapezoid perimeter
   */
  calculateTrapezoidPerimeter() {
    const { side1, side2, side3, side4 } = this.extractDimensions('trapezoid-dimensions');
    const perimeter = side1 + side2 + side3 + side4;
    
    return {
      perimeter: this.roundToPrecision(perimeter, 6),
      formula: 'P = a + b + c + d',
      calculation: `P = ${this.formatNumber(side1)} + ${this.formatNumber(side2)} + ${this.formatNumber(side3)} + ${this.formatNumber(side4)} = ${this.formatNumber(perimeter)}`,
      shapeInfo: `Trapezoid with sides ${this.formatNumber(side1)}, ${this.formatNumber(side2)}, ${this.formatNumber(side3)}, and ${this.formatNumber(side4)}`,
      perimeterInWords: this.numberToWords(perimeter)
    };
  }

  /**
   * Convert number to words (basic implementation)
   */
  numberToWords(num) {
    if (num === 0) return 'zero';
    
    const rounded = this.roundToPrecision(num, 2);
    const isDecimal = !Number.isInteger(rounded);
    
    if (isDecimal) {
      return `approximately ${rounded}`;
    } else {
      return rounded.toString();
    }
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
   * Check if a value is a valid positive number
   */
  isValidPositiveNumber(value) {
    return typeof value === 'number' && !isNaN(value) && isFinite(value) && value > 0;
  }

  /**
   * Round number to specified precision
   */
  roundToPrecision(value, precision) {
    return Math.round(value * Math.pow(10, precision)) / Math.pow(10, precision);
  }

  /**
   * Execute the calculation
   */
  execute() {
    try {
      return this.calculate();
    } catch (error) {
      console.error('Perimeter calculation error:', error);
      throw new Error(`Calculation failed: ${error.message}`);
    }
  }
}

/**
 * Calculate function for the calculator registry
 */
export function calculate(inputs, manifest) {
  const calculator = new PerimeterCalculator(inputs, manifest);
  return calculator.execute();
}

export default calculate;
