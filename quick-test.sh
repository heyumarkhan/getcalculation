#!/bin/bash

# Quick Test Script for All Calculators
# Tests key functionality with realistic values

BASE_URL="http://localhost:3000/api/calculate"

echo "🧪 QUICK CALCULATOR TESTS"
echo "========================="

# Test 1: Decimal to Percent
echo ""
echo "1. Decimal to Percent (0.25 → 25%):"
RESULT=$(curl -s -X POST "$BASE_URL/math/decimal-to-percent" \
  -H "Content-Type: application/json" \
  -d '{"logic": "DECIMAL_TO_PERCENT", "inputs": {"decimal": 0.25}}' | jq -r '.percent')
echo "   Result: $RESULT (Expected: 25)"

# Test 2: Simple Interest
echo ""
echo "2. Simple Interest (1000, 5%, 2 years):"
RESULT=$(curl -s -X POST "$BASE_URL/finance/simple-interest" \
  -H "Content-Type: application/json" \
  -d '{"logic": "SIMPLE_INTEREST", "inputs": {"principal": 1000, "rate": 5, "time": 2, "timeUnit": "year"}}' | jq -r '.interest')
echo "   Result: $RESULT (Expected: 100)"

# Test 3: Mortgage Calculator
echo ""
echo "3. Mortgage Calculator (300k loan, 60k down, 4.5%, 30 years):"
RESULT=$(curl -s -X POST "$BASE_URL/finance/mortgage-calculator" \
  -H "Content-Type: application/json" \
  -d '{"logic": "MORTGAGE_CALCULATOR", "inputs": {"loanAmount": 300000, "downPayment": 60000, "interestRate": 4.5, "loanTerm": 30}}' | jq -r '.monthlyPayment')
echo "   Result: $RESULT (Expected: ~1216)"

# Test 4: Midpoint
echo ""
echo "4. Midpoint (0,0) to (4,6):"
RESULT=$(curl -s -X POST "$BASE_URL/math/midpoint" \
  -H "Content-Type: application/json" \
  -d '{"logic": "MIDPOINT", "inputs": {"x1": 0, "y1": 0, "x2": 4, "y2": 6}}' | jq -r '.midpointX')
echo "   Result: $RESULT (Expected: 2)"

# Test 5: Slope Calculator
echo ""
echo "5. Slope Calculator (1,2) to (5,8):"
RESULT=$(curl -s -X POST "$BASE_URL/math/slope-calculator" \
  -H "Content-Type: application/json" \
  -d '{"logic": "SLOPE_CALCULATOR", "inputs": {"x1": 1, "y1": 2, "x2": 5, "y2": 8}}' | jq -r '.slope')
echo "   Result: $RESULT (Expected: 1.5)"

# Test 6: Length of Line Segment
echo ""
echo "6. Length of Line Segment (0,0) to (3,4):"
RESULT=$(curl -s -X POST "$BASE_URL/math/length-of-a-line-segment" \
  -H "Content-Type: application/json" \
  -d '{"logic": "LENGTH_OF_A_LINE_SEGMENT", "inputs": {"x1": 0, "y1": 0, "x2": 3, "y2": 4}}' | jq -r '.lineSegmentLength')
echo "   Result: $RESULT (Expected: 5)"

# Test 7: Volume Calculator (Cube)
echo ""
echo "7. Volume Calculator (Cube side=3):"
RESULT=$(curl -s -X POST "$BASE_URL/math/volume-calculator" \
  -H "Content-Type: application/json" \
  -d '{"logic": "VOLUME_CALCULATOR", "inputs": {"shapeType": "cube", "side": 3}}' | jq -r '.volume')
echo "   Result: $RESULT (Expected: 27)"

# Test 8: Perimeter Calculator (Rectangle)
echo ""
echo "8. Perimeter Calculator (Rectangle 5x3):"
RESULT=$(curl -s -X POST "$BASE_URL/math/perimeter-calculator" \
  -H "Content-Type: application/json" \
  -d '{"logic": "PERIMETER_CALCULATOR", "inputs": {"shapeType": "rectangle", "length": 5, "width": 3}}' | jq -r '.perimeter')
echo "   Result: $RESULT (Expected: 16)"

# Test 9: Similar Triangles
echo ""
echo "9. Similar Triangles (Find missing side):"
RESULT=$(curl -s -X POST "$BASE_URL/math/similar-triangles" \
  -H "Content-Type: application/json" \
  -d '{"logic": "SIMILAR_TRIANGLES_CALCULATOR", "inputs": {"calculationType": "find-missing-side", "side1": 3, "side2": 4, "side3": 5, "correspondingSide1": 6, "correspondingSide2": 8}}' | jq -r '.missingSide')
echo "   Result: $RESULT (Expected: 10)"

# Test 10: Standard Form to Slope Intercept
echo ""
echo "10. Standard Form to Slope Intercept (2x - 3y = 6):"
RESULT=$(curl -s -X POST "$BASE_URL/math/standard-form-to-slope-intercept" \
  -H "Content-Type: application/json" \
  -d '{"logic": "STANDARD_FORM_TO_SLOPE_INTERCEPT", "inputs": {"a": 2, "b": -3, "c": 6}}' | jq -r '.slope')
echo "   Result: $RESULT (Expected: 0.666667)"

echo ""
echo "✅ Quick tests completed!"
echo "If all results match expected values, your calculators are working correctly."
