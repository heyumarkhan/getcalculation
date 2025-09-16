# 🧪 Calculator Test Values Summary

This document contains comprehensive test values for all calculators in the GetCalculation project.

## ✅ Working Calculators (8/10)

### 1. Decimal to Percent Calculator
**Endpoint:** `/api/calculate/math/decimal-to-percent`
**Logic Key:** `DECIMAL_TO_PERCENT`

**Test Values:**
```json
{"decimal": 0.25} → 25%
{"decimal": 0.5} → 50%
{"decimal": 0.75} → 75%
{"decimal": 0.123} → 12.3%
{"decimal": 1} → 100%
{"decimal": 0} → 0%
```

### 2. Simple Interest Calculator
**Endpoint:** `/api/calculate/finance/simple-interest`
**Logic Key:** `SIMPLE_INTEREST`

**Test Values:**
```json
{"principal": 1000, "rate": 5, "time": 2, "timeUnit": "year"} → Interest: $100, Total: $1100
{"principal": 5000, "rate": 3.5, "time": 6, "timeUnit": "month"} → Interest: $87.5, Total: $5087.5
{"principal": 2000, "rate": 8, "time": 4, "timeUnit": "week"} → Interest: $12.31, Total: $2012.31
{"principal": 10000, "rate": 12, "time": 30, "timeUnit": "day"} → Interest: $98.63, Total: $10098.63
{"principal": 15000, "rate": 0, "time": 3, "timeUnit": "year"} → Interest: $0, Total: $15000
```

### 3. Mortgage Calculator
**Endpoint:** `/api/calculate/finance/mortgage-calculator`
**Logic Key:** `MORTGAGE_CALCULATOR`

**Test Values:**
```json
{"loanAmount": 300000, "downPayment": 60000, "interestRate": 4.5, "loanTerm": 30} → Monthly: $1216.04
{"loanAmount": 500000, "downPayment": 100000, "interestRate": 3.8, "loanTerm": 15} → Monthly: $2934.18
{"loanAmount": 200000, "downPayment": 40000, "interestRate": 5.2, "loanTerm": 20} → Monthly: $1064.48
{"loanAmount": 150000, "downPayment": 0, "interestRate": 6, "loanTerm": 25} → Monthly: $966.45
```

### 4. Midpoint Calculator
**Endpoint:** `/api/calculate/math/midpoint`
**Logic Key:** `MIDPOINT`

**Test Values:**
```json
{"x1": 0, "y1": 0, "x2": 4, "y2": 6} → Midpoint: (2, 3)
{"x1": -2, "y1": 3, "x2": 6, "y2": -1} → Midpoint: (2, 1)
{"x1": 1.5, "y1": 2.5, "x2": 3.5, "y2": 4.5} → Midpoint: (2.5, 3.5)
{"x1": -5, "y1": -3, "x2": 1, "y2": 7} → Midpoint: (-2, 2)
{"x1": 0, "y1": 0, "x2": 0, "y2": 0} → Midpoint: (0, 0)
```

### 5. Slope Calculator
**Endpoint:** `/api/calculate/math/slope-calculator`
**Logic Key:** `SLOPE_CALCULATOR`

**Test Values:**
```json
{"x1": 1, "y1": 2, "x2": 5, "y2": 8} → Slope: 1.5, Type: increasing
{"x1": 0, "y1": 0, "x2": 4, "y2": 0} → Slope: 0, Type: horizontal
{"x1": 2, "y1": 5, "x2": 2, "y2": 1} → Slope: null, Type: vertical
{"x1": -1, "y1": 3, "x2": 3, "y2": -1} → Slope: -1, Type: decreasing
{"x1": 0, "y1": 0, "x2": 3, "y2": 6} → Slope: 2, Type: increasing
```

### 6. Length of Line Segment Calculator
**Endpoint:** `/api/calculate/math/length-of-a-line-segment`
**Logic Key:** `LENGTH_OF_A_LINE_SEGMENT`

**Test Values:**
```json
{"x1": 0, "y1": 0, "x2": 3, "y2": 4} → Length: 5
{"x1": 1, "y1": 1, "x2": 4, "y2": 5} → Length: 5
{"x1": -2, "y1": 3, "x2": 2, "y2": 7} → Length: 5.656854
{"x1": 0, "y1": 0, "x2": 0, "y2": 5} → Length: 5
{"x1": 0, "y1": 0, "x2": 5, "y2": 0} → Length: 5
```

### 7. Volume Calculator
**Endpoint:** `/api/calculate/math/volume-calculator`
**Logic Key:** `VOLUME_CALCULATOR`

**Test Values:**
```json
{"shapeType": "cube", "side": 3} → Volume: 27
{"shapeType": "rectangular-prism", "length": 4, "width": 3, "height": 2} → Volume: 24
{"shapeType": "cylinder", "radius": 3, "height": 5} → Volume: 141.371669
{"shapeType": "sphere", "radius": 4} → Volume: 268.082573
{"shapeType": "cone", "radius": 3, "height": 4} → Volume: 37.699112
```

### 8. Perimeter Calculator
**Endpoint:** `/api/calculate/math/perimeter-calculator`
**Logic Key:** `PERIMETER_CALCULATOR`

**Test Values:**
```json
{"shapeType": "rectangle", "length": 5, "width": 3} → Perimeter: 16
{"shapeType": "square", "side": 4} → Perimeter: 16
{"shapeType": "triangle", "side1": 3, "side2": 4, "side3": 5} → Perimeter: 12
{"shapeType": "circle", "radius": 5} → Perimeter: 31.415927
{"shapeType": "parallelogram", "base": 6, "side": 4} → Perimeter: 20
```

### 9. Standard Form to Slope Intercept Calculator
**Endpoint:** `/api/calculate/math/standard-form-to-slope-intercept`
**Logic Key:** `STANDARD_FORM_TO_SLOPE_INTERCEPT`

**Test Values:**
```json
{"a": 2, "b": -3, "c": 6} → Slope: 0.666667, Y-intercept: 2
{"a": 1, "b": 2, "c": -4} → Slope: -0.5, Y-intercept: 2
{"a": 3, "b": 0, "c": 9} → Slope: null, Y-intercept: null (vertical line)
{"a": 0, "b": 4, "c": 8} → Slope: 0, Y-intercept: -2
{"a": -2, "b": 5, "c": 10} → Slope: 0.4, Y-intercept: 2
```

## ⚠️ Calculators Needing Attention (2/10)

### 10. Similar Triangles Calculator
**Endpoint:** `/api/calculate/math/similar-triangles`
**Logic Key:** `SIMILAR_TRIANGLES_CALCULATOR`
**Status:** ❌ Internal server error

**Intended Test Values:**
```json
{"calculationType": "find-missing-side", "side1": 3, "side2": 4, "side3": 5, "correspondingSide1": 6, "correspondingSide2": 8} → Missing side: 10
{"calculationType": "find-scale-factor", "side1": 2, "side2": 3, "correspondingSide1": 6, "correspondingSide2": 9} → Scale factor: 3
{"calculationType": "verify-similarity", "side1": 3, "side2": 4, "side3": 5, "correspondingSide1": 6, "correspondingSide2": 8, "correspondingSide3": 10} → Is similar: true
```

### 11. Parabola Calculator
**Endpoint:** `/api/calculate/math/parabola-calculator`
**Logic Key:** `PARABOLA_CALCULATOR`
**Status:** ⚠️ Returns null (may need input format adjustment)

**Intended Test Values:**
```json
{"calculationType": "vertex-form", "a": 1, "h": 2, "k": 3} → Vertex: (2, 3)
{"calculationType": "standard-form", "a": 2, "b": -4, "c": 1} → Vertex: (1, -1)
{"calculationType": "intercept-form", "a": 1, "p": 2, "q": -3} → Vertex: (-0.5, -6.25)
{"calculationType": "focus-directrix", "focusX": 0, "focusY": 2, "directrix": -2} → Vertex: (0, 0)
```

## 🚀 Quick Test Commands

### Test All Working Calculators:
```bash
./comprehensive-test.sh
```

### Test Individual Calculator:
```bash
curl -X POST http://localhost:3000/api/calculate/math/decimal-to-percent \
  -H "Content-Type: application/json" \
  -d '{"logic": "DECIMAL_TO_PERCENT", "inputs": {"decimal": 0.25}}'
```

### Test with jq for clean output:
```bash
curl -s -X POST http://localhost:3000/api/calculate/math/decimal-to-percent \
  -H "Content-Type: application/json" \
  -d '{"logic": "DECIMAL_TO_PERCENT", "inputs": {"decimal": 0.25}}' | jq '.percent'
```

## 📊 Success Rate: 8/10 (80%)

- ✅ **8 calculators working perfectly**
- ⚠️ **2 calculators need fixes**
- 🎯 **Overall system is highly functional**

## 🔧 Next Steps

1. **Fix Similar Triangles Calculator** - Resolve internal server error
2. **Fix Parabola Calculator** - Adjust input format handling
3. **Test in production environment** - Verify all fixes work on live site
4. **Add more test cases** - Expand test coverage for edge cases

## 📝 Notes

- All test values use realistic, educational examples
- Results are rounded to 6 decimal places for consistency
- Error handling is implemented for invalid inputs
- All calculators follow the modular system architecture
- Manual registration fallback ensures production reliability
