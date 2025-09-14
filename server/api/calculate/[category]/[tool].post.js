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
    // Prepare inputs for legacy calculators from section-based data
    let processedInputs = body.inputs;
    
    // If inputs are section-based, flatten them for legacy calculators
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
    
    // For modular calculators, pass the manifest if available
    if (body.manifest && calculate.name !== 'anonymous') {
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