/**
 * Manifest Validation Schema and Validator
 * Ensures calculator manifests follow the correct structure
 */

export class ManifestValidator {
  constructor() {
    this.requiredFields = [
      'toolName',
      'toolSlug', 
      'categorySlug',
      'description',
      'calculationLogic'
    ];

    this.validFieldTypes = ['number', 'text', 'email', 'tel', 'select', 'checkbox', 'radio'];
    this.validUnitCategories = ['length', 'weight', 'temperature', 'area', 'volume', 'time', 'currency', 'percentage'];
    this.validDisplayTypes = ['unit-selector', 'dropdown', 'toggle', 'radio'];
    this.validPositions = ['left', 'right', 'below', 'above'];
    this.validSections = ['primary', 'secondary', 'tertiary'];
  }

  /**
   * Validate a complete manifest
   * @param {object} manifest - Manifest to validate
   * @returns {object} - Validation result with errors and warnings
   */
  validateManifest(manifest) {
    const result = {
      isValid: true,
      errors: [],
      warnings: [],
      info: []
    };

    // Check required fields
    this.validateRequiredFields(manifest, result);

    // Validate basic structure
    this.validateBasicStructure(manifest, result);

    // Validate sections (new format) or parameters (legacy format)
    if (manifest.sections) {
      this.validateSections(manifest.sections, result);
    } else if (manifest.parameters) {
      this.validateLegacyParameters(manifest.parameters, result);
      result.warnings.push('Using legacy parameter format. Consider upgrading to section-based format.');
    } else {
      result.errors.push('Manifest must have either "sections" or "parameters" field');
    }

    // Validate outputs
    if (manifest.outputs) {
      this.validateOutputs(manifest.outputs, result);
    } else {
      result.warnings.push('No outputs defined. Results may not display properly.');
    }

    // Validate UI configuration
    if (manifest.ui) {
      this.validateUIConfig(manifest.ui, result);
    }

    // Validate SEO configuration
    if (manifest.seo) {
      this.validateSEOConfig(manifest.seo, result);
    }

    // Validate features
    if (manifest.features) {
      this.validateFeatures(manifest.features, result);
    }

    result.isValid = result.errors.length === 0;
    return result;
  }

  /**
   * Validate required fields
   * @param {object} manifest - Manifest object
   * @param {object} result - Validation result object
   */
  validateRequiredFields(manifest, result) {
    for (const field of this.requiredFields) {
      if (!manifest[field]) {
        result.errors.push(`Required field missing: ${field}`);
      } else if (typeof manifest[field] !== 'string' || manifest[field].trim() === '') {
        result.errors.push(`Required field empty or invalid: ${field}`);
      }
    }
  }

  /**
   * Validate basic manifest structure
   * @param {object} manifest - Manifest object
   * @param {object} result - Validation result object
   */
  validateBasicStructure(manifest, result) {
    // Validate toolSlug format
    if (manifest.toolSlug && !/^[a-z0-9-]+$/.test(manifest.toolSlug)) {
      result.errors.push('toolSlug must contain only lowercase letters, numbers, and hyphens');
    }

    // Validate categorySlug format
    if (manifest.categorySlug && !/^[a-z0-9-]+$/.test(manifest.categorySlug)) {
      result.errors.push('categorySlug must contain only lowercase letters, numbers, and hyphens');
    }

    // Validate calculationLogic format
    if (manifest.calculationLogic && !/^[A-Z_]+$/.test(manifest.calculationLogic)) {
      result.warnings.push('calculationLogic should use UPPER_CASE_WITH_UNDERSCORES format');
    }
  }

  /**
   * Validate sections array (new format)
   * @param {array} sections - Sections array
   * @param {object} result - Validation result object
   */
  validateSections(sections, result) {
    if (!Array.isArray(sections)) {
      result.errors.push('sections must be an array');
      return;
    }

    if (sections.length === 0) {
      result.errors.push('At least one section is required');
      return;
    }

    const sectionIds = new Set();
    
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      this.validateSection(section, i, result, sectionIds);
    }
  }

  /**
   * Validate individual section
   * @param {object} section - Section object
   * @param {number} index - Section index
   * @param {object} result - Validation result object
   * @param {Set} sectionIds - Set of used section IDs
   */
  validateSection(section, index, result, sectionIds) {
    const sectionPath = `sections[${index}]`;

    // Required section fields
    if (!section.id) {
      result.errors.push(`${sectionPath}: Missing required field "id"`);
    } else if (sectionIds.has(section.id)) {
      result.errors.push(`${sectionPath}: Duplicate section ID "${section.id}"`);
    } else {
      sectionIds.add(section.id);
    }

    if (!section.title) {
      result.errors.push(`${sectionPath}: Missing required field "title"`);
    }

    if (!section.fields || !Array.isArray(section.fields)) {
      result.errors.push(`${sectionPath}: Missing or invalid "fields" array`);
      return;
    }

    if (section.fields.length === 0) {
      result.warnings.push(`${sectionPath}: Section has no fields`);
    }

    // Validate fields
    const fieldNames = new Set();
    for (let i = 0; i < section.fields.length; i++) {
      this.validateField(section.fields[i], `${sectionPath}.fields[${i}]`, result, fieldNames);
    }

    // Validate optional section properties
    if (section.order !== undefined && (typeof section.order !== 'number' || section.order < 1)) {
      result.warnings.push(`${sectionPath}: order should be a positive number`);
    }

    if (section.required !== undefined && typeof section.required !== 'boolean') {
      result.warnings.push(`${sectionPath}: required should be a boolean`);
    }

    if (section.collapsible !== undefined && typeof section.collapsible !== 'boolean') {
      result.warnings.push(`${sectionPath}: collapsible should be a boolean`);
    }
  }

  /**
   * Validate individual field
   * @param {object} field - Field object
   * @param {string} fieldPath - Field path for error messages
   * @param {object} result - Validation result object
   * @param {Set} fieldNames - Set of used field names
   */
  validateField(field, fieldPath, result, fieldNames) {
    // Required field properties
    if (!field.name) {
      result.errors.push(`${fieldPath}: Missing required field "name"`);
    } else if (fieldNames.has(field.name)) {
      result.errors.push(`${fieldPath}: Duplicate field name "${field.name}"`);
    } else {
      fieldNames.add(field.name);
    }

    if (!field.label) {
      result.errors.push(`${fieldPath}: Missing required field "label"`);
    }

    if (!field.type) {
      result.errors.push(`${fieldPath}: Missing required field "type"`);
    } else if (!this.validFieldTypes.includes(field.type)) {
      result.errors.push(`${fieldPath}: Invalid field type "${field.type}". Valid types: ${this.validFieldTypes.join(', ')}`);
    }

    // Validate units configuration
    if (field.units) {
      this.validateFieldUnits(field.units, `${fieldPath}.units`, result);
    }

    // Validate validation rules
    if (field.validation) {
      this.validateFieldValidation(field.validation, `${fieldPath}.validation`, result);
    }

    // Validate UI configuration
    if (field.ui) {
      this.validateFieldUI(field.ui, `${fieldPath}.ui`, result);
    }

    // Validate numeric field constraints
    if (field.type === 'number') {
      this.validateNumericField(field, fieldPath, result);
    }

    // Validate conditional logic
    if (field.conditional) {
      this.validateConditional(field.conditional, `${fieldPath}.conditional`, result);
    }
  }

  /**
   * Validate field units configuration
   * @param {object} units - Units configuration
   * @param {string} unitsPath - Path for error messages
   * @param {object} result - Validation result object
   */
  validateFieldUnits(units, unitsPath, result) {
    if (!units.category) {
      result.errors.push(`${unitsPath}: Missing required field "category"`);
    } else if (!this.validUnitCategories.includes(units.category)) {
      result.errors.push(`${unitsPath}: Invalid unit category "${units.category}". Valid categories: ${this.validUnitCategories.join(', ')}`);
    }

    if (!units.available || !Array.isArray(units.available)) {
      result.errors.push(`${unitsPath}: Missing or invalid "available" array`);
    } else if (units.available.length === 0) {
      result.errors.push(`${unitsPath}: "available" array cannot be empty`);
    }

    if (!units.default) {
      result.warnings.push(`${unitsPath}: No default unit specified`);
    } else if (units.available && !units.available.includes(units.default)) {
      result.errors.push(`${unitsPath}: Default unit "${units.default}" not found in available units`);
    }
  }

  /**
   * Validate field validation rules
   * @param {object} validation - Validation configuration
   * @param {string} validationPath - Path for error messages
   * @param {object} result - Validation result object
   */
  validateFieldValidation(validation, validationPath, result) {
    if (validation.min !== undefined && typeof validation.min !== 'number') {
      result.errors.push(`${validationPath}: "min" must be a number`);
    }

    if (validation.max !== undefined && typeof validation.max !== 'number') {
      result.errors.push(`${validationPath}: "max" must be a number`);
    }

    if (validation.min !== undefined && validation.max !== undefined && validation.min > validation.max) {
      result.errors.push(`${validationPath}: "min" cannot be greater than "max"`);
    }

    if (validation.message && typeof validation.message !== 'string') {
      result.warnings.push(`${validationPath}: "message" should be a string`);
    }
  }

  /**
   * Validate field UI configuration
   * @param {object} ui - UI configuration
   * @param {string} uiPath - Path for error messages
   * @param {object} result - Validation result object
   */
  validateFieldUI(ui, uiPath, result) {
    if (ui.display && !this.validDisplayTypes.includes(ui.display)) {
      result.warnings.push(`${uiPath}: Invalid display type "${ui.display}". Valid types: ${this.validDisplayTypes.join(', ')}`);
    }

    if (ui.position && !this.validPositions.includes(ui.position)) {
      result.warnings.push(`${uiPath}: Invalid position "${ui.position}". Valid positions: ${this.validPositions.join(', ')}`);
    }
  }

  /**
   * Validate numeric field constraints
   * @param {object} field - Field object
   * @param {string} fieldPath - Field path for error messages
   * @param {object} result - Validation result object
   */
  validateNumericField(field, fieldPath, result) {
    if (field.min !== undefined && typeof field.min !== 'number') {
      result.errors.push(`${fieldPath}: "min" must be a number for numeric fields`);
    }

    if (field.max !== undefined && typeof field.max !== 'number') {
      result.errors.push(`${fieldPath}: "max" must be a number for numeric fields`);
    }

    if (field.step !== undefined && (typeof field.step !== 'number' || field.step <= 0)) {
      result.errors.push(`${fieldPath}: "step" must be a positive number`);
    }
  }

  /**
   * Validate conditional logic
   * @param {object} conditional - Conditional configuration
   * @param {string} conditionalPath - Path for error messages
   * @param {object} result - Validation result object
   */
  validateConditional(conditional, conditionalPath, result) {
    if (conditional.showWhen && typeof conditional.showWhen !== 'string') {
      result.errors.push(`${conditionalPath}: "showWhen" must be a string expression`);
    }

    if (conditional.hideWhen && typeof conditional.hideWhen !== 'string') {
      result.errors.push(`${conditionalPath}: "hideWhen" must be a string expression`);
    }
  }

  /**
   * Validate legacy parameters format
   * @param {array} parameters - Parameters array
   * @param {object} result - Validation result object
   */
  validateLegacyParameters(parameters, result) {
    if (!Array.isArray(parameters)) {
      result.errors.push('parameters must be an array');
      return;
    }

    const paramNames = new Set();
    for (let i = 0; i < parameters.length; i++) {
      const param = parameters[i];
      const paramPath = `parameters[${i}]`;

      if (!param.name) {
        result.errors.push(`${paramPath}: Missing required field "name"`);
      } else if (paramNames.has(param.name)) {
        result.errors.push(`${paramPath}: Duplicate parameter name "${param.name}"`);
      } else {
        paramNames.add(param.name);
      }

      if (!param.label) {
        result.errors.push(`${paramPath}: Missing required field "label"`);
      }

      if (!param.type) {
        result.errors.push(`${paramPath}: Missing required field "type"`);
      }
    }
  }

  /**
   * Validate outputs configuration
   * @param {array} outputs - Outputs array
   * @param {object} result - Validation result object
   */
  validateOutputs(outputs, result) {
    if (!Array.isArray(outputs)) {
      result.errors.push('outputs must be an array');
      return;
    }

    const outputNames = new Set();
    for (let i = 0; i < outputs.length; i++) {
      const output = outputs[i];
      const outputPath = `outputs[${i}]`;

      if (!output.name) {
        result.errors.push(`${outputPath}: Missing required field "name"`);
      } else if (outputNames.has(output.name)) {
        result.errors.push(`${outputPath}: Duplicate output name "${output.name}"`);
      } else {
        outputNames.add(output.name);
      }

      if (!output.label) {
        result.errors.push(`${outputPath}: Missing required field "label"`);
      }

      if (output.section && !this.validSections.includes(output.section)) {
        result.warnings.push(`${outputPath}: Invalid section "${output.section}". Valid sections: ${this.validSections.join(', ')}`);
      }

      if (output.precision !== undefined && (typeof output.precision !== 'number' || output.precision < 0)) {
        result.errors.push(`${outputPath}: "precision" must be a non-negative number`);
      }
    }
  }

  /**
   * Validate UI configuration
   * @param {object} ui - UI configuration
   * @param {object} result - Validation result object
   */
  validateUIConfig(ui, result) {
    const validComponents = ['generic', 'specialized'];
    const validLayouts = ['single-section', 'multi-section', 'tabbed'];
    const validThemes = ['math', 'chemistry', 'finance', 'engineering', 'biology'];

    if (ui.component && !validComponents.includes(ui.component)) {
      result.warnings.push(`Invalid UI component "${ui.component}". Valid components: ${validComponents.join(', ')}`);
    }

    if (ui.layout && !validLayouts.includes(ui.layout)) {
      result.warnings.push(`Invalid UI layout "${ui.layout}". Valid layouts: ${validLayouts.join(', ')}`);
    }

    if (ui.theme && !validThemes.includes(ui.theme)) {
      result.warnings.push(`Invalid UI theme "${ui.theme}". Valid themes: ${validThemes.join(', ')}`);
    }
  }

  /**
   * Validate SEO configuration
   * @param {object} seo - SEO configuration
   * @param {object} result - Validation result object
   */
  validateSEOConfig(seo, result) {
    if (seo.keywords && !Array.isArray(seo.keywords)) {
      result.warnings.push('SEO keywords should be an array');
    }

    if (seo.metaDescription && typeof seo.metaDescription !== 'string') {
      result.warnings.push('SEO metaDescription should be a string');
    }

    if (seo.scenarios && !Array.isArray(seo.scenarios)) {
      result.warnings.push('SEO scenarios should be an array');
    }
  }

  /**
   * Validate features configuration
   * @param {object} features - Features configuration
   * @param {object} result - Validation result object
   */
  validateFeatures(features, result) {
    const validFeatures = [
      'unitConversion', 'healthCategories', 'weightRecommendations', 
      'trendAnalysis', 'exportResults', 'amortizationSchedule',
      'extraPayments', 'taxInsuranceCalculation', 'comparisonMode'
    ];

    for (const [feature, value] of Object.entries(features)) {
      if (!validFeatures.includes(feature)) {
        result.warnings.push(`Unknown feature "${feature}"`);
      }

      if (typeof value !== 'boolean') {
        result.warnings.push(`Feature "${feature}" should be a boolean value`);
      }
    }
  }
}

// Export singleton instance
export const manifestValidator = new ManifestValidator();
export default manifestValidator;

