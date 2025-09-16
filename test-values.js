// Comprehensive Test Values for All Calculators
// This file contains realistic test cases for each calculator

const testValues = {
  // Math Calculators
  'DECIMAL_TO_PERCENT': [
    { inputs: { decimal: 0.25 }, expected: { percent: 25 } },
    { inputs: { decimal: 0.5 }, expected: { percent: 50 } },
    { inputs: { decimal: 0.75 }, expected: { percent: 75 } },
    { inputs: { decimal: 0.123 }, expected: { percent: 12.3 } },
    { inputs: { decimal: 1 }, expected: { percent: 100 } },
    { inputs: { decimal: 0 }, expected: { percent: 0 } }
  ],

  'SIMPLE_INTEREST': [
    { inputs: { principal: 1000, rate: 5, time: 2, timeUnit: 'year' }, expected: { interest: 100, totalAmount: 1100 } },
    { inputs: { principal: 5000, rate: 3.5, time: 6, timeUnit: 'month' }, expected: { interest: 87.5, totalAmount: 5087.5 } },
    { inputs: { principal: 2000, rate: 8, time: 4, timeUnit: 'week' }, expected: { interest: 12.31, totalAmount: 2012.31 } },
    { inputs: { principal: 10000, rate: 12, time: 30, timeUnit: 'day' }, expected: { interest: 98.63, totalAmount: 10098.63 } },
    { inputs: { principal: 15000, rate: 0, time: 3, timeUnit: 'year' }, expected: { interest: 0, totalAmount: 15000 } }
  ],

  'MORTGAGE_CALCULATOR': [
    { inputs: { loanAmount: 300000, downPayment: 60000, interestRate: 4.5, loanTerm: 30 }, expected: { monthlyPayment: 1216.04, totalInterestPaid: 197774.4 } },
    { inputs: { loanAmount: 500000, downPayment: 100000, interestRate: 3.8, loanTerm: 15 }, expected: { monthlyPayment: 2934.18, totalInterestPaid: 128152.4 } },
    { inputs: { loanAmount: 200000, downPayment: 40000, interestRate: 5.2, loanTerm: 20 }, expected: { monthlyPayment: 1064.48, totalInterestPaid: 155475.2 } },
    { inputs: { loanAmount: 150000, downPayment: 0, interestRate: 6, loanTerm: 25 }, expected: { monthlyPayment: 966.45, totalInterestPaid: 139935 } }
  ],

  'MIDPOINT': [
    { inputs: { x1: 0, y1: 0, x2: 4, y2: 6 }, expected: { midpointX: 2, midpointY: 3 } },
    { inputs: { x1: -2, y1: 3, x2: 6, y2: -1 }, expected: { midpointX: 2, midpointY: 1 } },
    { inputs: { x1: 1.5, y1: 2.5, x2: 3.5, y2: 4.5 }, expected: { midpointX: 2.5, midpointY: 3.5 } },
    { inputs: { x1: -5, y1: -3, x2: 1, y2: 7 }, expected: { midpointX: -2, midpointY: 2 } },
    { inputs: { x1: 0, y1: 0, x2: 0, y2: 0 }, expected: { midpointX: 0, midpointY: 0 } }
  ],

  'SLOPE_CALCULATOR': [
    { inputs: { x1: 1, y1: 2, x2: 5, y2: 8 }, expected: { slope: 1.5, lineType: 'increasing' } },
    { inputs: { x1: 0, y1: 0, x2: 4, y2: 0 }, expected: { slope: 0, lineType: 'horizontal' } },
    { inputs: { x1: 2, y1: 5, x2: 2, y2: 1 }, expected: { slope: null, lineType: 'vertical' } },
    { inputs: { x1: -1, y1: 3, x2: 3, y2: -1 }, expected: { slope: -1, lineType: 'decreasing' } },
    { inputs: { x1: 0, y1: 0, x2: 3, y2: 6 }, expected: { slope: 2, lineType: 'increasing' } }
  ],

  'LENGTH_OF_A_LINE_SEGMENT': [
    { inputs: { x1: 0, y1: 0, x2: 3, y2: 4 }, expected: { lineSegmentLength: 5 } },
    { inputs: { x1: 1, y1: 1, x2: 4, y2: 5 }, expected: { lineSegmentLength: 5 } },
    { inputs: { x1: -2, y1: 3, x2: 2, y2: 7 }, expected: { lineSegmentLength: 5.656854 } },
    { inputs: { x1: 0, y1: 0, x2: 0, y2: 5 }, expected: { lineSegmentLength: 5 } },
    { inputs: { x1: 0, y1: 0, x2: 5, y2: 0 }, expected: { lineSegmentLength: 5 } }
  ],

  'PARABOLA_CALCULATOR': [
    { inputs: { calculationType: 'vertex-form', a: 1, h: 2, k: 3 }, expected: { vertex: '(2, 3)', direction: 'upward' } },
    { inputs: { calculationType: 'standard-form', a: 2, b: -4, c: 1 }, expected: { vertex: '(1, -1)', direction: 'upward' } },
    { inputs: { calculationType: 'intercept-form', a: 1, p: 2, q: -3 }, expected: { vertex: '(-0.5, -6.25)', direction: 'upward' } },
    { inputs: { calculationType: 'focus-directrix', focusX: 0, focusY: 2, directrix: -2 }, expected: { vertex: '(0, 0)', direction: 'upward' } }
  ],

  'PERIMETER_CALCULATOR': [
    { inputs: { shapeType: 'rectangle', length: 5, width: 3 }, expected: { perimeter: 16 } },
    { inputs: { shapeType: 'square', side: 4 }, expected: { perimeter: 16 } },
    { inputs: { shapeType: 'triangle', side1: 3, side2: 4, side3: 5 }, expected: { perimeter: 12 } },
    { inputs: { shapeType: 'circle', radius: 5 }, expected: { perimeter: 31.415927 } },
    { inputs: { shapeType: 'parallelogram', base: 6, side: 4 }, expected: { perimeter: 20 }
  ],

  'VOLUME_CALCULATOR': [
    { inputs: { shapeType: 'cube', side: 3 }, expected: { volume: 27 } },
    { inputs: { shapeType: 'rectangular-prism', length: 4, width: 3, height: 2 }, expected: { volume: 24 } },
    { inputs: { shapeType: 'cylinder', radius: 3, height: 5 }, expected: { volume: 141.371669 } },
    { inputs: { shapeType: 'sphere', radius: 4 }, expected: { volume: 268.082573 } },
    { inputs: { shapeType: 'cone', radius: 3, height: 4 }, expected: { volume: 37.699112 } }
  ],

  'SIMILAR_TRIANGLES_CALCULATOR': [
    { inputs: { calculationType: 'find-missing-side', side1: 3, side2: 4, side3: 5, correspondingSide1: 6, correspondingSide2: 8 }, expected: { missingSide: 10 } },
    { inputs: { calculationType: 'find-scale-factor', side1: 2, side2: 3, correspondingSide1: 6, correspondingSide2: 9 }, expected: { scaleFactor: 3 } },
    { inputs: { calculationType: 'verify-similarity', side1: 3, side2: 4, side3: 5, correspondingSide1: 6, correspondingSide2: 8, correspondingSide3: 10 }, expected: { isSimilar: true } }
  ],

  'STANDARD_FORM_TO_SLOPE_INTERCEPT': [
    { inputs: { a: 2, b: -3, c: 6 }, expected: { slope: 0.666667, yIntercept: 2 } },
    { inputs: { a: 1, b: 2, c: -4 }, expected: { slope: -0.5, yIntercept: 2 } },
    { inputs: { a: 3, b: 0, c: 9 }, expected: { slope: null, yIntercept: null } },
    { inputs: { a: 0, b: 4, c: 8 }, expected: { slope: 0, yIntercept: -2 } },
    { inputs: { a: -2, b: 5, c: 10 }, expected: { slope: 0.4, yIntercept: 2 } }
  ]
};

// Test runner function
async function runTests() {
  const BASE_URL = 'http://localhost:3000/api/calculate';
  const results = {};

  console.log('🧪 RUNNING COMPREHENSIVE CALCULATOR TESTS');
  console.log('==========================================');

  for (const [calculator, tests] of Object.entries(testValues)) {
    console.log(`\n📊 Testing ${calculator}:`);
    results[calculator] = { passed: 0, failed: 0, tests: [] };

    for (let i = 0; i < tests.length; i++) {
      const test = tests[i];
      const category = getCategoryForCalculator(calculator);
      const toolSlug = getToolSlugForCalculator(calculator);

      try {
        const response = await fetch(`${BASE_URL}/${category}/${toolSlug}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            logic: calculator,
            inputs: test.inputs
          })
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const result = await response.json();
        const testResult = validateTestResult(test, result);
        
        if (testResult.passed) {
          console.log(`  ✅ Test ${i + 1}: PASSED`);
          results[calculator].passed++;
        } else {
          console.log(`  ❌ Test ${i + 1}: FAILED - ${testResult.error}`);
          results[calculator].failed++;
        }
        
        results[calculator].tests.push(testResult);
      } catch (error) {
        console.log(`  ❌ Test ${i + 1}: ERROR - ${error.message}`);
        results[calculator].failed++;
        results[calculator].tests.push({ passed: false, error: error.message });
      }
    }
  }

  // Summary
  console.log('\n📈 TEST SUMMARY');
  console.log('================');
  
  let totalPassed = 0;
  let totalFailed = 0;

  for (const [calculator, result] of Object.entries(results)) {
    const total = result.passed + result.failed;
    const percentage = total > 0 ? Math.round((result.passed / total) * 100) : 0;
    
    console.log(`${calculator}: ${result.passed}/${total} (${percentage}%)`);
    totalPassed += result.passed;
    totalFailed += result.failed;
  }

  const totalTests = totalPassed + totalFailed;
  const overallPercentage = totalTests > 0 ? Math.round((totalPassed / totalTests) * 100) : 0;
  
  console.log(`\n🎯 OVERALL: ${totalPassed}/${totalTests} tests passed (${overallPercentage}%)`);
  
  if (totalFailed === 0) {
    console.log('🎉 ALL TESTS PASSED! Your calculators are working perfectly!');
  } else {
    console.log(`⚠️  ${totalFailed} tests failed. Check the details above.`);
  }

  return results;
}

// Helper functions
function getCategoryForCalculator(calculator) {
  const categoryMap = {
    'DECIMAL_TO_PERCENT': 'math',
    'SIMPLE_INTEREST': 'finance',
    'MORTGAGE_CALCULATOR': 'finance',
    'MIDPOINT': 'math',
    'SLOPE_CALCULATOR': 'math',
    'LENGTH_OF_A_LINE_SEGMENT': 'math',
    'PARABOLA_CALCULATOR': 'math',
    'PERIMETER_CALCULATOR': 'math',
    'VOLUME_CALCULATOR': 'math',
    'SIMILAR_TRIANGLES_CALCULATOR': 'math',
    'STANDARD_FORM_TO_SLOPE_INTERCEPT': 'math'
  };
  return categoryMap[calculator] || 'math';
}

function getToolSlugForCalculator(calculator) {
  const slugMap = {
    'DECIMAL_TO_PERCENT': 'decimal-to-percent',
    'SIMPLE_INTEREST': 'simple-interest',
    'MORTGAGE_CALCULATOR': 'mortgage-calculator',
    'MIDPOINT': 'midpoint',
    'SLOPE_CALCULATOR': 'slope-calculator',
    'LENGTH_OF_A_LINE_SEGMENT': 'length-of-a-line-segment',
    'PARABOLA_CALCULATOR': 'parabola-calculator',
    'PERIMETER_CALCULATOR': 'perimeter-calculator',
    'VOLUME_CALCULATOR': 'volume-calculator',
    'SIMILAR_TRIANGLES_CALCULATOR': 'similar-triangles',
    'STANDARD_FORM_TO_SLOPE_INTERCEPT': 'standard-form-to-slope-intercept'
  };
  return slugMap[calculator] || calculator.toLowerCase();
}

function validateTestResult(test, result) {
  if (result.error) {
    return { passed: false, error: `API returned error: ${result.error}` };
  }

  for (const [key, expectedValue] of Object.entries(test.expected)) {
    const actualValue = result[key];
    
    if (actualValue === undefined) {
      return { passed: false, error: `Missing expected field: ${key}` };
    }
    
    if (typeof expectedValue === 'number' && typeof actualValue === 'number') {
      const tolerance = 0.01; // Allow small floating point differences
      if (Math.abs(actualValue - expectedValue) > tolerance) {
        return { passed: false, error: `${key}: expected ${expectedValue}, got ${actualValue}` };
      }
    } else if (actualValue !== expectedValue) {
      return { passed: false, error: `${key}: expected ${expectedValue}, got ${actualValue}` };
    }
  }

  return { passed: true };
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { testValues, runTests };
}

// Run tests if this file is executed directly
if (typeof window === 'undefined' && require.main === module) {
  runTests().catch(console.error);
}
