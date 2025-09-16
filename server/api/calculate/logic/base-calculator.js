/**
 * Base Calculator Class
 * Provides common functionality for all calculator implementations
 */

import { unitConverter } from '../utils/unit-converter.js';

export class BaseCalculator {
  constructor(inputsOrKey, manifestOrName) {
    // Support both old and new constructor patterns
    if (typeof inputsOrKey === 'string' && typeof manifestOrName === 'string') {
      // New pattern: super(KEY, NAME)
      this.key = inputsOrKey;
      this.name = manifestOrName;
      this.inputs = null;
      this.manifest = null;
    } else {
      // Old pattern: super(inputs, manifest)
      this.inputs = inputsOrKey;
      this.manifest = manifestOrName;
      this.key = null;
      this.name = null;
    }
    
    this.results = {};
    this.errors = [];
    this.warnings = [];
    this.converter = unitConverter;
  }

  /**
   * Validate all inputs according to manifest specifications
   * @returns {boolean} - True if all inputs are valid
   */
  validateInputs() {
    // For new pattern calculators, validation is handled in the calculate method
    if (!this.inputs || !this.manifest) {
      return true;
    }
    
    if (!this.manifest.sections) {
      // Legacy manifest format - use parameters
      return this.validateLegacyInputs();
    }

    // New section-based manifest format
    for (const section of this.manifest.sections) {
      if (section.required && !this.hasSectionData(section.id)) {
        this.errors.push(`Section "${section.title}" is required`);
        continue;
      }

      for (const field of section.fields) {
        const sectionData = this.inputs[section.id] || {};
        const value = sectionData[field.name];

        if (field.required && (value === null || value === undefined || value === '')) {
          this.errors.push(`${field.label} is required`);
          continue;
        }

        if (value !== null && value !== undefined && value !== '') {
          if (!this.validateField(field, value)) {
            this.errors.push(`Invalid value for ${field.label}`);
          }
        }
      }
    }

    return this.errors.length === 0;
  }

  /**
   * Validate inputs for legacy manifest format
   * @returns {boolean} - True if all inputs are valid
   */
  validateLegacyInputs() {
    if (!this.manifest.parameters) {
      return true;
    }

    for (const param of this.manifest.parameters) {
      const value = this.inputs[param.name];

      if (param.required && (value === null || value === undefined || value === '')) {
        this.errors.push(`${param.label} is required`);
        continue;
      }

      if (value !== null && value !== undefined && value !== '') {
        if (!this.validateField(param, value)) {
          this.errors.push(`Invalid value for ${param.label}`);
        }
      }
    }

    return this.errors.length === 0;
  }

  /**
   * Validate individual field value
   * @param {object} field - Field configuration
   * @param {any} value - Value to validate
   * @returns {boolean} - True if valid
   */
  validateField(field, value) {
    // Type validation
    if (field.type === 'number') {
      if (isNaN(value) || !isFinite(value)) {
        return false;
      }

      // Range validation
      if (field.min !== undefined && value < field.min) {
        return false;
      }
      if (field.max !== undefined && value > field.max) {
        return false;
      }
    }

    // Custom validation
    if (field.validation && field.validation.custom) {
      try {
        const customValidation = new Function('value', field.validation.custom);
        return customValidation(value);
      } catch (e) {
        console.warn('Custom validation failed:', e);
        return false;
      }
    }

    return true;
  }

  /**
   * Check if section has any data
   * @param {string} sectionId - Section identifier
   * @returns {boolean} - True if section has data
   */
  hasSectionData(sectionId) {
    const sectionData = this.inputs[sectionId];
    if (!sectionData) return false;

    return Object.values(sectionData).some(value => 
      value !== null && value !== undefined && value !== ''
    );
  }

  /**
   * Normalize inputs by converting all units to standard units
   * @returns {object} - Normalized inputs
   */
  normalizeInputs() {
    const normalized = {};

    // For new pattern calculators, return inputs as-is
    if (!this.inputs || !this.manifest) {
      return this.inputs || {};
    }

    if (!this.manifest.sections) {
      // Legacy format - direct conversion
      return this.normalizeLegacyInputs();
    }

    for (const section of this.manifest.sections) {
      normalized[section.id] = {};
      const sectionData = this.inputs[section.id] || {};

      for (const field of section.fields) {
        const value = sectionData[field.name];
        const unitValue = sectionData[`${field.name}Unit`];

        if (value !== null && value !== undefined && value !== '') {
          if (field.units && unitValue) {
            // Convert to standard unit
            const standardUnit = this.getStandardUnit(field.units.category);
            normalized[section.id][field.name] = this.converter.convert(
              value, 
              unitValue, 
              standardUnit, 
              field.units.category
            );
            normalized[section.id][`${field.name}Unit`] = standardUnit;
          } else {
            normalized[section.id][field.name] = value;
          }
        }
      }
    }

    return normalized;
  }

  /**
   * Normalize inputs for legacy manifest format
   * @returns {object} - Normalized inputs
   */
  normalizeLegacyInputs() {
    const normalized = {};

    for (const [key, value] of Object.entries(this.inputs)) {
      if (key.endsWith('Unit')) continue; // Skip unit fields

      const unitKey = `${key}Unit`;
      const unitValue = this.inputs[unitKey];

      if (value !== null && value !== undefined && value !== '' && unitValue) {
        // Find parameter config
        const param = this.manifest.parameters?.find(p => p.name === key);
        if (param && param.units) {
          const standardUnit = this.getStandardUnit(param.units.category);
          normalized[key] = this.converter.convert(
            value, 
            unitValue, 
            standardUnit, 
            param.units.category
          );
        } else {
          normalized[key] = value;
        }
      } else {
        normalized[key] = value;
      }
    }

    return normalized;
  }

  /**
   * Get standard unit for a category
   * @param {string} category - Unit category
   * @returns {string} - Standard unit
   */
  getStandardUnit(category) {
    const standardUnits = {
      length: 'm',
      weight: 'kg',
      temperature: 'c',
      area: 'm2',
      volume: 'l',
      time: 's',
      currency: 'usd'
    };
    return standardUnits[category] || 'm';
  }

  /**
   * Format result with appropriate units and precision
   * @param {object} rawResults - Raw calculation results
   * @returns {object} - Formatted results
   */
  formatResults(rawResults) {
    const formatted = { ...rawResults };

    // Add unit conversions for display
    if (this.manifest && this.manifest.outputs) {
      for (const output of this.manifest.outputs) {
        if (formatted[output.name] !== undefined) {
          // Format precision
          if (output.precision !== undefined) {
            formatted[output.name] = Number(formatted[output.name].toFixed(output.precision));
          }

          // Add unit conversions if applicable
          if (output.units && output.units.available) {
            formatted[`${output.name}Conversions`] = this.getOutputConversions(
              formatted[output.name],
              output.units
            );
          }
        }
      }
    }

    return formatted;
  }

  /**
   * Get conversions for output value
   * @param {number} value - Value to convert
   * @param {object} unitConfig - Unit configuration
   * @returns {object} - Conversions object
   */
  getOutputConversions(value, unitConfig) {
    const conversions = {};
    const baseUnit = unitConfig.default || unitConfig.available[0];

    for (const unit of unitConfig.available) {
      if (unit !== baseUnit) {
        conversions[unit] = this.converter.convert(
          value,
          baseUnit,
          unit,
          unitConfig.category
        );
      }
    }

    return conversions;
  }

  /**
   * Add warning message
   * @param {string} message - Warning message
   */
  addWarning(message) {
    this.warnings.push(message);
  }

  /**
   * Add error message
   * @param {string} message - Error message
   */
  addError(message) {
    this.errors.push(message);
  }

  /**
   * Get calculation results with metadata
   * @returns {object} - Results with errors, warnings, and metadata
   */
  getResults() {
    const result = {
      ...this.results,
      metadata: {
        hasErrors: this.errors.length > 0,
        hasWarnings: this.warnings.length > 0,
        timestamp: new Date().toISOString(),
        calculator: this.manifest?.toolName || 'Unknown'
      }
    };

    if (this.errors.length > 0) {
      result.errors = this.errors;
    }

    if (this.warnings.length > 0) {
      result.warnings = this.warnings;
    }

    return result;
  }

  /**
   * Main calculation method - to be overridden by subclasses
   * @returns {object} - Calculation results
   */
  calculate() {
    throw new Error('calculate() method must be implemented by subclass');
  }

  /**
   * Execute full calculation workflow
   * @returns {object} - Final results
   */
  execute() {
    // Validate inputs
    if (!this.validateInputs()) {
      return { error: this.errors.join(', ') };
    }

    // Normalize units
    this.normalizedInputs = this.normalizeInputs();

    try {
      // Perform calculation
      const rawResults = this.calculate();
      
      if (rawResults.error) {
        return rawResults;
      }

      // Format and return results
      this.results = this.formatResults(rawResults);
      return this.getResults();
    } catch (error) {
      this.addError(`Calculation failed: ${error.message}`);
      return this.getResults();
    }
  }
}

export default BaseCalculator;
