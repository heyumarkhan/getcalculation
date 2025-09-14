/**
 * Unit Conversion Engine
 * Handles conversion between different units for calculator inputs/outputs
 */

export class UnitConverter {
  constructor() {
    this.conversionTables = {
      // Length conversions (base unit: meters)
      length: {
        m: { factor: 1, label: 'Meters', symbol: 'm', precision: 2, step: 0.01 },
        cm: { factor: 100, label: 'Centimeters', symbol: 'cm', precision: 0, step: 1 },
        mm: { factor: 1000, label: 'Millimeters', symbol: 'mm', precision: 0, step: 1 },
        km: { factor: 0.001, label: 'Kilometers', symbol: 'km', precision: 3, step: 0.001 },
        ft: { factor: 3.28084, label: 'Feet', symbol: 'ft', precision: 2, step: 0.01 },
        in: { factor: 39.3701, label: 'Inches', symbol: 'in', precision: 1, step: 0.1 },
        yd: { factor: 1.09361, label: 'Yards', symbol: 'yd', precision: 2, step: 0.01 },
        mi: { factor: 0.000621371, label: 'Miles', symbol: 'mi', precision: 4, step: 0.0001 }
      },

      // Weight conversions (base unit: kilograms)
      weight: {
        kg: { factor: 1, label: 'Kilograms', symbol: 'kg', precision: 2, step: 0.01 },
        g: { factor: 1000, label: 'Grams', symbol: 'g', precision: 0, step: 1 },
        lb: { factor: 2.20462, label: 'Pounds', symbol: 'lb', precision: 2, step: 0.01 },
        oz: { factor: 35.274, label: 'Ounces', symbol: 'oz', precision: 1, step: 0.1 },
        ton: { factor: 0.001, label: 'Metric Tons', symbol: 't', precision: 3, step: 0.001 }
      },

      // Temperature conversions (base unit: Celsius)
      temperature: {
        c: { factor: 1, offset: 0, label: 'Celsius', symbol: '°C', precision: 1, step: 0.1 },
        f: { factor: 9/5, offset: 32, label: 'Fahrenheit', symbol: '°F', precision: 1, step: 0.1 },
        k: { factor: 1, offset: 273.15, label: 'Kelvin', symbol: 'K', precision: 1, step: 0.1 }
      },

      // Area conversions (base unit: square meters)
      area: {
        m2: { factor: 1, label: 'Square Meters', symbol: 'm²', precision: 2, step: 0.01 },
        cm2: { factor: 10000, label: 'Square Centimeters', symbol: 'cm²', precision: 0, step: 1 },
        ft2: { factor: 10.7639, label: 'Square Feet', symbol: 'ft²', precision: 2, step: 0.01 },
        in2: { factor: 1550, label: 'Square Inches', symbol: 'in²', precision: 1, step: 0.1 },
        acre: { factor: 0.000247105, label: 'Acres', symbol: 'acre', precision: 4, step: 0.0001 }
      },

      // Volume conversions (base unit: liters)
      volume: {
        l: { factor: 1, label: 'Liters', symbol: 'L', precision: 2, step: 0.01 },
        ml: { factor: 1000, label: 'Milliliters', symbol: 'mL', precision: 0, step: 1 },
        gal: { factor: 0.264172, label: 'Gallons (US)', symbol: 'gal', precision: 3, step: 0.001 },
        qt: { factor: 1.05669, label: 'Quarts (US)', symbol: 'qt', precision: 3, step: 0.001 },
        cup: { factor: 4.22675, label: 'Cups (US)', symbol: 'cup', precision: 2, step: 0.01 }
      },

      // Time conversions (base unit: years for financial calculations)
      time: {
        year: { factor: 1, label: 'Years', symbol: 'years', precision: 2, step: 0.01 },
        month: { factor: 12, label: 'Months', symbol: 'months', precision: 1, step: 0.1 },
        week: { factor: 52, label: 'Weeks', symbol: 'weeks', precision: 1, step: 0.1 },
        day: { factor: 365, label: 'Days', symbol: 'days', precision: 0, step: 1 },
        s: { factor: 31556952, label: 'Seconds', symbol: 's', precision: 0, step: 1 },
        min: { factor: 525949.2, label: 'Minutes', symbol: 'min', precision: 0, step: 1 },
        h: { factor: 8765.82, label: 'Hours', symbol: 'h', precision: 1, step: 0.1 }
      },

      // Currency - will be enhanced with real-time rates later
      currency: {
        usd: { factor: 1, label: 'US Dollar', symbol: '$', precision: 2, step: 0.01 },
        eur: { factor: 0.85, label: 'Euro', symbol: '€', precision: 2, step: 0.01 },
        gbp: { factor: 0.73, label: 'British Pound', symbol: '£', precision: 2, step: 0.01 },
        jpy: { factor: 110, label: 'Japanese Yen', symbol: '¥', precision: 0, step: 1 }
      }
    };
  }

  /**
   * Convert value from one unit to another
   * @param {number} value - The value to convert
   * @param {string} fromUnit - Source unit
   * @param {string} toUnit - Target unit
   * @param {string} category - Unit category (length, weight, etc.)
   * @returns {number} - Converted value
   */
  convert(value, fromUnit, toUnit, category = 'length') {
    // If units are the same, return original value
    if (fromUnit === toUnit) {
      return value;
    }

    const table = this.conversionTables[category];
    if (!table || !table[fromUnit] || !table[toUnit]) {
      throw new Error(`Invalid units: ${fromUnit} to ${toUnit} in category ${category}`);
    }

    const fromConfig = table[fromUnit];
    const toConfig = table[toUnit];

    // Handle temperature conversions (special case with offset)
    if (category === 'temperature') {
      return this.convertTemperature(value, fromConfig, toConfig);
    }

    // Standard conversion: convert to base unit, then to target unit
    // value * (toFactor / fromFactor)
    const convertedValue = value * (toConfig.factor / fromConfig.factor);
    return convertedValue;
  }

  /**
   * Convert temperature with special handling for offset
   * @param {number} value - Temperature value
   * @param {object} fromConfig - Source unit config
   * @param {object} toConfig - Target unit config
   * @returns {number} - Converted temperature
   */
  convertTemperature(value, fromConfig, toConfig) {
    // Convert to base unit (Celsius)
    let celsius;
    if (fromConfig.symbol === '°F') {
      celsius = (value - 32) * 5/9;
    } else if (fromConfig.symbol === 'K') {
      celsius = value - 273.15;
    } else {
      celsius = value;
    }

    // Convert from Celsius to target unit
    if (toConfig.symbol === '°F') {
      return celsius * 9/5 + 32;
    } else if (toConfig.symbol === 'K') {
      return celsius + 273.15;
    } else {
      return celsius;
    }
  }

  /**
   * Get all available units for a category
   * @param {string} category - Unit category
   * @returns {array} - Array of unit keys
   */
  getAvailableUnits(category) {
    return Object.keys(this.conversionTables[category] || {});
  }

  /**
   * Get unit information (label, symbol, precision, etc.)
   * @param {string} unit - Unit key
   * @param {string} category - Unit category
   * @returns {object} - Unit configuration
   */
  getUnitInfo(unit, category = 'length') {
    return this.conversionTables[category]?.[unit];
  }

  /**
   * Get all unit categories
   * @returns {array} - Array of category keys
   */
  getCategories() {
    return Object.keys(this.conversionTables);
  }

  /**
   * Validate if a unit exists in a category
   * @param {string} unit - Unit to validate
   * @param {string} category - Category to check
   * @returns {boolean} - True if unit exists
   */
  isValidUnit(unit, category) {
    return !!(this.conversionTables[category] && this.conversionTables[category][unit]);
  }

  /**
   * Convert multiple values at once
   * @param {object} values - Object with value-unit pairs
   * @param {string} category - Unit category
   * @param {string} targetUnit - Target unit for all conversions
   * @returns {object} - Object with converted values
   */
  convertMultiple(values, category, targetUnit) {
    const results = {};
    
    for (const [key, data] of Object.entries(values)) {
      if (data.value !== null && data.unit) {
        results[key] = {
          value: this.convert(data.value, data.unit, targetUnit, category),
          unit: targetUnit,
          original: data
        };
      }
    }
    
    return results;
  }

  /**
   * Get conversion factors for all units in a category relative to a base unit
   * @param {string} category - Unit category
   * @param {string} baseUnit - Base unit for comparison
   * @returns {object} - Object with conversion factors
   */
  getConversionFactors(category, baseUnit) {
    const table = this.conversionTables[category];
    if (!table || !table[baseUnit]) {
      throw new Error(`Invalid base unit: ${baseUnit} in category ${category}`);
    }

    const factors = {};
    const baseConfig = table[baseUnit];

    for (const [unit, config] of Object.entries(table)) {
      if (unit !== baseUnit) {
        factors[unit] = {
          factor: config.factor / baseConfig.factor,
          symbol: config.symbol,
          label: config.label
        };
      }
    }

    return factors;
  }
}

// Export a singleton instance
export const unitConverter = new UnitConverter();
export default UnitConverter;
