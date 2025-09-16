// Import the calculator registry for dynamic loading
import { calculatorRegistry } from '../logic/calculator-registry.js';

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

  // Try to get calculator from registry
  let calculate = null;
  
  try {
    // Debug: Log available calculators
    await calculatorRegistry.initialize();
    
    // Manually register calculators if not found (fallback for production)
    if (!calculatorRegistry.hasCalculator(logicKey)) {
      try {
        let calculatorModule;
        switch (logicKey) {
          case 'DECIMAL_TO_PERCENT':
            calculatorModule = await import('../logic/decimal-to-percent.js');
            break;
          case 'SIMPLE_INTEREST':
            calculatorModule = await import('../logic/simple-interest.js');
            break;
          case 'MORTGAGE_CALCULATOR':
            calculatorModule = await import('../logic/mortgage-calculator.js');
            break;
          case 'MIDPOINT':
            calculatorModule = await import('../logic/midpoint.js');
            break;
          case 'SLOPE_CALCULATOR':
            calculatorModule = await import('../logic/slope-calculator.js');
            break;
          case 'LENGTH_OF_A_LINE_SEGMENT':
            calculatorModule = await import('../logic/length-of-a-line-segment.js');
            break;
          case 'PARABOLA_CALCULATOR':
            calculatorModule = await import('../logic/parabola-calculator.js');
            break;
          case 'PERIMETER_CALCULATOR':
            calculatorModule = await import('../logic/perimeter-calculator.js');
            break;
          case 'VOLUME_CALCULATOR':
            calculatorModule = await import('../logic/volume-calculator.js');
            break;
          case 'SIMILAR_TRIANGLES_CALCULATOR':
            calculatorModule = await import('../logic/similar-triangles-calculator.js');
            break;
          case 'STANDARD_FORM_TO_SLOPE_INTERCEPT':
            calculatorModule = await import('../logic/standard-form-to-slope-intercept.js');
            break;
          default:
            throw new Error(`Unknown calculator: ${logicKey}`);
        }
        
        if (calculatorModule && calculatorModule.calculate) {
          calculatorRegistry.registerFunction(logicKey, calculatorModule.calculate);
          console.log(`✅ Manually registered ${logicKey} in registry`);
        } else {
          throw new Error(`No calculate function found in ${logicKey} module`);
        }
      } catch (importError) {
        console.warn(`Failed to manually register ${logicKey}:`, importError.message);
      }
    }
    
    const availableCalculators = calculatorRegistry.getAvailableCalculators();
    console.log(`Available calculators in registry: ${availableCalculators.join(', ')}`);
    console.log(`Looking for calculator: ${logicKey}`);
    
    // Get calculator from registry
    if (calculatorRegistry.hasCalculator(logicKey)) {
      calculate = await calculatorRegistry.getCalculator(logicKey);
      console.log(`✅ Using modular calculator: ${logicKey}`);
    } else {
      console.log(`❌ Calculator not found in registry: ${logicKey}`);
    }
  } catch (registryError) {
    console.warn(`Registry error for ${logicKey}:`, registryError.message);
  }

  // If we can't find a matching function, send an error.
  if (!calculate) {
    throw createError({ 
      statusCode: 500, 
      statusMessage: `Calculation logic for '${logicKey}' not found in registry.` 
    });
  }

  // Run the found function with the user's data and return the result.
  // The result will be sent back to the frontend as JSON.
  try {
    // Prepare inputs based on calculator type
    let processedInputs = body.inputs;
    
    // All calculators now use the modular system
    // Pass the manifest for enhanced calculators
    if (body.manifest) {
      return calculate(body.inputs, body.manifest);
    } else {
      return calculate(body.inputs);
    }
  } catch (error) {
    console.error('Calculation error:', error);
    console.error('Error stack:', error.stack);
    console.error('Logic key:', logicKey);
    console.error('Inputs:', JSON.stringify(body.inputs, null, 2));
    
    // Provide more specific error messages
    let errorMessage = 'Calculation failed';
    
    if (error.message) {
      errorMessage = error.message;
    } else if (error.name) {
      errorMessage = `${error.name}: ${error.message || 'Unknown error'}`;
    }
    
    throw createError({ 
      statusCode: 500, 
      statusMessage: errorMessage,
      data: {
        message: errorMessage,
        logicKey: logicKey,
        errorType: error.name || 'UnknownError'
      }
    });
  }
});