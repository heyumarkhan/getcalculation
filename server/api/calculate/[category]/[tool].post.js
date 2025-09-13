// This is a special Map object that holds all our calculation functions.
// Using a Map is a safe way to link the 'calculationLogic' string from our JSON
// manifests to an actual, secure function here in our code.
const calculationLibrary = new Map([
  [
    'SIMPLE_INTEREST',
    ({ principal, rate, time }) => {
      // Formula: Interest = Principal * (Rate / 100) * Time
      const result = principal * (rate / 100) * time;
      // We return an object. This is good practice for APIs.
      return { interest: result };
    }
  ],
  [
    'VELOCITY',
    ({ distance, time }) => {
      if (time === 0) {
        return { error: 'Time cannot be zero.' };
      }
      // Formula: Velocity = Distance / Time
      const result = distance / time;
      return { velocity: result };
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
    'BMI_CALCULATOR',
    ({ weight, height }) => {
      if (weight <= 0 || height <= 0) {
        return { error: 'Weight and height must be greater than zero.' };
      }
      // Formula: BMI = Weight (kg) / Height (m)²
      const result = weight / (height * height);
      return { bmi: result };
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

  // Look up the correct function in our library using the key.
  const calculate = calculationLibrary.get(logicKey);

  // If we can't find a matching function, send an error.
  if (!calculate) {
    throw createError({ statusCode: 500, statusMessage: `Calculation logic for '${logicKey}' not found.` });
  }

  // Run the found function with the user's data and return the result.
  // The result will be sent back to the frontend as JSON.
  try {
    return calculate(body.inputs);
  } catch (error) {
    console.error('Calculation error:', error);
    throw createError({ 
      statusCode: 500, 
      statusMessage: `Calculation failed: ${error.message}` 
    });
  }
});