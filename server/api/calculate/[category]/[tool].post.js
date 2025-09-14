// Import the calculator registry for dynamic loading
import { calculatorRegistry } from '../logic/calculator-registry.js';

// Legacy calculation library for backward compatibility
const legacyCalculationLibrary = new Map([
  [
    'SIMPLE_INTEREST',
    ({ principal, rate, time, timeUnit = 'year' }) => {
      // Convert time to years for calculation
      let timeInYears = time;
      
      if (timeUnit === 'month') {
        timeInYears = time / 12;
      } else if (timeUnit === 'week') {
        timeInYears = time / 52; // Standard financial convention: 52 weeks per year
      } else if (timeUnit === 'day') {
        timeInYears = time / 365.25; // Account for leap years
      }
      
      // Formula: Interest = Principal * (Rate / 100) * Time (in years)
      const interest = principal * (rate / 100) * timeInYears;
      const totalAmount = principal + interest;
      
      return { 
        interest: interest,
        totalAmount: totalAmount
      };
    }
  ],
  [
    'DECIMAL_TO_PERCENT', 
    ({ decimal }) => {
      if (decimal === null || decimal === undefined) {
        return { error: 'Decimal number is required.' };
      }
      // Formula: Percent = Decimal × 100
      const result = decimal * 100;
      return { percent: result };
    }
  ],
  [
    'STANDARD_FORM_TO_SLOPE_INTERCEPT',
    (inputs) => {
      // Extract coefficients from section-based or flat structure
      let A, B, C;
      if (inputs['equation-coefficients']) {
        const coefficients = inputs['equation-coefficients'];
        A = coefficients.A;
        B = coefficients.B;
        C = coefficients.C;
      } else {
        A = inputs.A;
        B = inputs.B;
        C = inputs.C;
      }

      // Validate inputs
      if (!A && A !== 0 || !B && B !== 0 || !C && C !== 0) {
        return { error: 'All coefficients (A, B, C) must be provided.' };
      }
      if (B === 0) {
        return { error: 'Coefficient B cannot be zero (would create a vertical line).' };
      }

      // Calculate slope-intercept form
      const slope = -A / B;
      const yIntercept = C / B;
      const xIntercept = A !== 0 ? C / A : null;

      // Format equations
      const standardFormEquation = `${A === 1 ? '' : A === -1 ? '-' : A}x ${B > 0 ? '+' : ''} ${B === 1 ? '' : B === -1 ? '-' : B}y = ${C}`;
      const slopeInterceptEquation = `y = ${slope === 1 ? '' : slope === -1 ? '-' : slope}x ${yIntercept >= 0 ? '+' : ''} ${yIntercept}`;

      return {
        slope: Math.round(slope * 1000000) / 1000000,
        yIntercept: Math.round(yIntercept * 1000000) / 1000000,
        xIntercept: xIntercept !== null ? Math.round(xIntercept * 1000000) / 1000000 : null,
        standardFormEquation: standardFormEquation.replace(/\s+/g, ' ').replace(/^\s|\s$/g, ''),
        slopeInterceptEquation: slopeInterceptEquation.replace(/\s+/g, ' ').replace(/^\s|\s$/g, ''),
        isVerticalLine: false,
        isHorizontalLine: A === 0
      };
    }
  ],
  [
    'MIDPOINT',
    (inputs) => {
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
    }
  ],
  [
    'LENGTH_OF_A_LINE_SEGMENT',
    (inputs) => {
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
    }
  ],
  [
    'PARABOLA_CALCULATOR',
    (inputs) => {
      // Extract coefficients from section-based or flat structure
      let a, b, c;
      if (inputs['parabola-coefficients']) {
        const coefficients = inputs['parabola-coefficients'];
        a = coefficients.a;
        b = coefficients.b;
        c = coefficients.c;
      } else {
        a = inputs.a;
        b = inputs.b;
        c = inputs.c;
      }

      // Validate inputs
      if (!isValidNumber(a) || !isValidNumber(b) || !isValidNumber(c)) {
        return { error: 'All coefficients (a, b, c) must be valid numbers.' };
      }

      if (a === 0) {
        return { error: 'Coefficient a cannot be zero (would not be a parabola).' };
      }

      // Calculate vertex coordinates
      const vertexX = -b / (2 * a);
      const vertexY = c - (b * b) / (4 * a);

      // Calculate focus coordinates
      const focusX = vertexX;
      const focusY = vertexY + 1 / (4 * a);

      // Calculate directrix
      const directrixY = vertexY - 1 / (4 * a);

      // Calculate other properties
      const discriminant = b * b - 4 * a * c;
      const yIntercept = c;
      const opens = a > 0 ? 'upward' : 'downward';

      // Format numbers
      const formatNumber = (num) => {
        if (Number.isInteger(num)) return num.toString();
        return Math.round(num * 1000000) / 1000000;
      };

      // Format coordinates
      const formatCoordinates = (x, y) => `(${formatNumber(x)}, ${formatNumber(y)})`;
      
      const vertex = formatCoordinates(vertexX, vertexY);
      const focus = formatCoordinates(focusX, focusY);
      const axisOfSymmetry = `x = ${formatNumber(vertexX)}`;
      const directrix = `y = ${formatNumber(directrixY)}`;

      function isValidNumber(value) {
        return typeof value === 'number' && !isNaN(value) && isFinite(value);
      }

      return {
        vertexX: formatNumber(vertexX),
        vertexY: formatNumber(vertexY),
        vertex,
        axisOfSymmetry,
        focusX: formatNumber(focusX),
        focusY: formatNumber(focusY),
        focus,
        directrix,
        discriminant: formatNumber(discriminant),
        yIntercept: formatNumber(yIntercept),
        opens
      };
    }
  ],
  [
    'SLOPE_CALCULATOR',
    (inputs) => {
      // Helper functions defined first
      function isValidNumber(value) {
        return typeof value === 'number' && !isNaN(value) && isFinite(value);
      }

      function findGCD(a, b) {
        const intA = Math.round(a);
        const intB = Math.round(b);
        if (intB === 0) return intA;
        return findGCD(intB, intA % intB);
      }

      const formatNumber = (num) => {
        if (Number.isInteger(num)) return num.toString();
        return Math.round(num * 1000000) / 1000000;
      };

      const formatCoordinates = (x, y) => `(${formatNumber(x)}, ${formatNumber(y)})`;

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
      const pointsDisplay = `${formatCoordinates(x1, y1)} to ${formatCoordinates(x2, y2)}`;

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
    }
  ],
  [
    'PERIMETER_CALCULATOR',
    (inputs) => {
      // Helper functions defined first
      function isValidPositiveNumber(value) {
        return typeof value === 'number' && !isNaN(value) && isFinite(value) && value > 0;
      }

      const formatNumber = (num) => {
        if (Number.isInteger(num)) return num.toString();
        return Math.round(num * 1000000) / 1000000;
      };

      const roundToPrecision = (value, precision) => {
        return Math.round(value * Math.pow(10, precision)) / Math.pow(10, precision);
      };

      const numberToWords = (num) => {
        if (num === 0) return 'zero';
        const rounded = roundToPrecision(num, 2);
        const isDecimal = !Number.isInteger(rounded);
        if (isDecimal) {
          return `approximately ${rounded}`;
        } else {
          return rounded.toString();
        }
      };

      // Extract shape type from section-based or flat structure
      let shapeType;
      if (inputs['shape-selection']) {
        shapeType = inputs['shape-selection'].shapeType;
      } else {
        shapeType = inputs.shapeType;
      }

      if (!shapeType) {
        return { error: 'Shape type must be specified' };
      }

      // Extract dimensions helper
      const extractDimensions = (sectionId) => {
        if (inputs[sectionId]) {
          return inputs[sectionId];
        }
        return inputs;
      };

      // Calculate based on shape type
      switch (shapeType) {
        case 'rectangle': {
          const { length, width } = extractDimensions('rectangle-dimensions');
          if (!isValidPositiveNumber(length) || !isValidPositiveNumber(width)) {
            return { error: 'Rectangle requires positive length and width values' };
          }
          const perimeter = 2 * (length + width);
          return {
            perimeter: roundToPrecision(perimeter, 6),
            formula: 'P = 2(l + w)',
            calculation: `P = 2(${formatNumber(length)} + ${formatNumber(width)}) = 2(${formatNumber(length + width)}) = ${formatNumber(perimeter)}`,
            shapeInfo: `Rectangle with length ${formatNumber(length)} and width ${formatNumber(width)}`,
            perimeterInWords: numberToWords(perimeter)
          };
        }

        case 'square': {
          const { side } = extractDimensions('square-dimensions');
          if (!isValidPositiveNumber(side)) {
            return { error: 'Square requires a positive side length value' };
          }
          const perimeter = 4 * side;
          return {
            perimeter: roundToPrecision(perimeter, 6),
            formula: 'P = 4s',
            calculation: `P = 4 × ${formatNumber(side)} = ${formatNumber(perimeter)}`,
            shapeInfo: `Square with side length ${formatNumber(side)}`,
            perimeterInWords: numberToWords(perimeter)
          };
        }

        case 'circle': {
          const { radius, diameter } = extractDimensions('circle-dimensions');
          if (!isValidPositiveNumber(radius) && !isValidPositiveNumber(diameter)) {
            return { error: 'Circle requires either a positive radius or diameter value' };
          }
          
          let r, formula, calculation;
          if (isValidPositiveNumber(radius)) {
            r = radius;
            formula = 'P = 2πr';
            calculation = `P = 2 × π × ${formatNumber(r)} ≈ ${formatNumber(2 * Math.PI * r)}`;
          } else {
            r = diameter / 2;
            formula = 'P = πd';
            calculation = `P = π × ${formatNumber(diameter)} ≈ ${formatNumber(Math.PI * diameter)}`;
          }
          
          const perimeter = 2 * Math.PI * r;
          return {
            perimeter: roundToPrecision(perimeter, 6),
            formula,
            calculation,
            shapeInfo: `Circle with radius ${formatNumber(r)}`,
            perimeterInWords: numberToWords(perimeter)
          };
        }

        case 'triangle': {
          const { sideA, sideB, sideC } = extractDimensions('triangle-dimensions');
          if (!isValidPositiveNumber(sideA) || !isValidPositiveNumber(sideB) || !isValidPositiveNumber(sideC)) {
            return { error: 'Triangle requires three positive side length values' };
          }
          
          // Check triangle inequality
          if (sideA + sideB <= sideC || sideA + sideC <= sideB || sideB + sideC <= sideA) {
            return { error: 'Invalid triangle: the sum of any two sides must be greater than the third side' };
          }
          
          const perimeter = sideA + sideB + sideC;
          return {
            perimeter: roundToPrecision(perimeter, 6),
            formula: 'P = a + b + c',
            calculation: `P = ${formatNumber(sideA)} + ${formatNumber(sideB)} + ${formatNumber(sideC)} = ${formatNumber(perimeter)}`,
            shapeInfo: `Triangle with sides ${formatNumber(sideA)}, ${formatNumber(sideB)}, and ${formatNumber(sideC)}`,
            perimeterInWords: numberToWords(perimeter)
          };
        }

        case 'regular-polygon': {
          const { numberOfSides, sideLength } = extractDimensions('polygon-dimensions');
          if (!isValidPositiveNumber(numberOfSides) || !isValidPositiveNumber(sideLength)) {
            return { error: 'Regular polygon requires positive number of sides and side length' };
          }
          if (numberOfSides < 3 || !Number.isInteger(numberOfSides)) {
            return { error: 'Number of sides must be an integer greater than or equal to 3' };
          }
          
          const perimeter = numberOfSides * sideLength;
          return {
            perimeter: roundToPrecision(perimeter, 6),
            formula: 'P = n × s',
            calculation: `P = ${numberOfSides} × ${formatNumber(sideLength)} = ${formatNumber(perimeter)}`,
            shapeInfo: `Regular ${numberOfSides}-sided polygon with side length ${formatNumber(sideLength)}`,
            perimeterInWords: numberToWords(perimeter)
          };
        }

        default:
          return { error: 'Unsupported shape type' };
      }
    }
  ]
]);

// This is the main Nuxt server handler. It runs for every request to this API endpoint.
export default defineEventHandler(async (event) => {
  // readBody waits for the user's form data to be sent from the frontend.
  const body = await readBody(event);

  // Here, we need to know which tool to use. We can't access the file system here directly
  // for the manifest. Instead, we'll ask the frontend to tell us which logic to use.
  // We'll add a 'logic' key to the data sent from our form.
  const logicKey = body.logic;

  if (!logicKey) {
    throw createError({ statusCode: 400, statusMessage: 'Calculation logic key is missing.' });
  }

  // Try to get calculator from registry first, then fall back to legacy library
  let calculate = null;
  
  try {
    // Debug: Log available calculators
    await calculatorRegistry.initialize();
    const availableCalculators = calculatorRegistry.getAvailableCalculators();
    console.log(`Available calculators in registry: ${availableCalculators.join(', ')}`);
    console.log(`Looking for calculator: ${logicKey}`);
    
    // First, try the new calculator registry
    if (calculatorRegistry.hasCalculator(logicKey)) {
      calculate = await calculatorRegistry.getCalculator(logicKey);
      console.log(`✅ Using modular calculator: ${logicKey}`);
    } else {
      // Fall back to legacy calculation library
      calculate = legacyCalculationLibrary.get(logicKey);
      if (calculate) {
        console.log(`✅ Using legacy calculator: ${logicKey}`);
      } else {
        console.log(`❌ Calculator not found in either registry or legacy library: ${logicKey}`);
      }
    }
  } catch (registryError) {
    console.warn(`Registry error for ${logicKey}:`, registryError.message);
    // Fall back to legacy library
    calculate = legacyCalculationLibrary.get(logicKey);
    if (calculate) {
      console.log(`✅ Using legacy calculator (after registry error): ${logicKey}`);
    }
  }

  // If we can't find a matching function, send an error.
  if (!calculate) {
    throw createError({ 
      statusCode: 500, 
      statusMessage: `Calculation logic for '${logicKey}' not found in registry or legacy library.` 
    });
  }

  // Run the found function with the user's data and return the result.
  // The result will be sent back to the frontend as JSON.
  try {
    // Prepare inputs based on calculator type
    let processedInputs = body.inputs;
    
    // Check if this is a modular calculator (has a name property)
    const isModularCalculator = calculate.name !== 'anonymous';
    
    if (isModularCalculator) {
      // For modular calculators, keep section-based structure
      // The BaseCalculator will handle section-based validation
      processedInputs = body.inputs;
    } else {
      // For legacy calculators, flatten section-based inputs
      if (body.inputs && typeof body.inputs === 'object' && !Array.isArray(body.inputs)) {
        // Check if this looks like section-based data
        const firstKey = Object.keys(body.inputs)[0];
        if (body.inputs[firstKey] && typeof body.inputs[firstKey] === 'object' && !Array.isArray(body.inputs[firstKey])) {
          // Flatten section-based inputs
          processedInputs = {};
          for (const sectionId of Object.keys(body.inputs)) {
            Object.assign(processedInputs, body.inputs[sectionId]);
          }
        }
      }
    }
    
    // For modular calculators, pass the manifest if available
    if (body.manifest && isModularCalculator) {
      return calculate(processedInputs, body.manifest);
    } else {
      return calculate(processedInputs);
    }
  } catch (error) {
    console.error('Calculation error:', error);
    throw createError({ 
      statusCode: 500, 
      statusMessage: `Calculation failed: ${error.message}` 
    });
  }
});