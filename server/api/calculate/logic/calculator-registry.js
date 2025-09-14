/**
 * Calculator Registry
 * Manages registration and loading of calculator logic modules
 */

import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class CalculatorRegistry {
  constructor() {
    this.calculators = new Map();
    this.loadedModules = new Map();
    this.isInitialized = false;
  }

  /**
   * Initialize the registry by scanning for calculator modules
   */
  async initialize() {
    if (this.isInitialized) {
      return;
    }

    try {
      await this.scanCalculatorModules();
      this.isInitialized = true;
      console.log(`Calculator Registry initialized with ${this.calculators.size} calculators`);
    } catch (error) {
      console.error('Failed to initialize Calculator Registry:', error);
      throw error;
    }
  }

  /**
   * Scan for calculator modules in the logic directory
   */
  async scanCalculatorModules() {
    const logicDir = __dirname;
    await this.scanDirectory(logicDir);
  }

  /**
   * Recursively scan directory for calculator files
   * @param {string} dir - Directory to scan
   */
  async scanDirectory(dir) {
    try {
      const items = await fs.readdir(dir, { withFileTypes: true });
      
      for (const item of items) {
        const fullPath = path.join(dir, item.name);
        
        if (item.isDirectory() && !item.name.startsWith('.')) {
          // Skip base files and utils
          if (item.name !== 'utils' && !item.name.includes('base')) {
            await this.scanDirectory(fullPath);
          }
        } else if (item.isFile() && item.name.endsWith('.js') && !item.name.includes('base') && !item.name.includes('registry')) {
          await this.registerCalculatorFile(fullPath);
        }
      }
    } catch (error) {
      console.warn(`Could not scan directory ${dir}:`, error.message);
    }
  }

  /**
   * Register a calculator file
   * @param {string} filePath - Path to calculator file
   */
  async registerCalculatorFile(filePath) {
    try {
      // Derive calculator key from file path
      const relativePath = path.relative(__dirname, filePath);
      const calculatorKey = this.pathToKey(relativePath);
      
      // Store the module path for lazy loading
      this.calculators.set(calculatorKey, {
        path: filePath,
        relativePath: relativePath,
        loaded: false,
        module: null
      });

      console.log(`Registered calculator: ${calculatorKey} -> ${relativePath}`);
    } catch (error) {
      console.warn(`Failed to register calculator ${filePath}:`, error.message);
    }
  }

  /**
   * Convert file path to calculator key
   * @param {string} relativePath - Relative file path
   * @returns {string} - Calculator key
   */
  pathToKey(relativePath) {
    // Convert path like "math/simple-interest.js" to "SIMPLE_INTEREST"
    const pathParts = relativePath.replace('.js', '').split('/');
    const filename = pathParts[pathParts.length - 1];
    
    return filename
      .split('-')
      .map(part => part.toUpperCase())
      .join('_');
  }

  /**
   * Get calculator function by key
   * @param {string} calculatorKey - Calculator key (e.g., "BMI_CALCULATOR")
   * @returns {function} - Calculator function
   */
  async getCalculator(calculatorKey) {
    if (!this.isInitialized) {
      await this.initialize();
    }

    const calculatorInfo = this.calculators.get(calculatorKey);
    if (!calculatorInfo) {
      throw new Error(`Calculator not found: ${calculatorKey}`);
    }

    // Lazy load the module if not already loaded
    if (!calculatorInfo.loaded) {
      try {
        const module = await import(calculatorInfo.path);
        calculatorInfo.module = module;
        calculatorInfo.loaded = true;
        
        console.log(`Loaded calculator module: ${calculatorKey}`);
      } catch (error) {
        console.error(`Failed to load calculator ${calculatorKey}:`, error);
        throw new Error(`Failed to load calculator: ${calculatorKey}`);
      }
    }

    // Return the calculation function
    const module = calculatorInfo.module;
    
    // Try different export patterns
    if (module.default && typeof module.default === 'function') {
      return module.default;
    } else if (module.default && module.default.calculate) {
      return (inputs, manifest) => {
        const calculator = new module.default(inputs, manifest);
        return calculator.execute();
      };
    } else if (module[`calculate${calculatorKey.replace(/_/g, '')}`]) {
      return module[`calculate${calculatorKey.replace(/_/g, '')}`];
    } else if (module.calculate) {
      return module.calculate;
    } else {
      // Look for any function that looks like a calculator
      const exportedFunctions = Object.keys(module).filter(key => 
        typeof module[key] === 'function' && key.toLowerCase().includes('calculate')
      );
      
      if (exportedFunctions.length > 0) {
        return module[exportedFunctions[0]];
      }
    }

    throw new Error(`No calculation function found in module: ${calculatorKey}`);
  }

  /**
   * Get all registered calculator keys
   * @returns {array} - Array of calculator keys
   */
  getAvailableCalculators() {
    return Array.from(this.calculators.keys());
  }

  /**
   * Check if a calculator is registered
   * @param {string} calculatorKey - Calculator key
   * @returns {boolean} - True if registered
   */
  hasCalculator(calculatorKey) {
    return this.calculators.has(calculatorKey);
  }

  /**
   * Register a calculator function manually
   * @param {string} calculatorKey - Calculator key
   * @param {function} calculatorFunction - Calculator function
   */
  registerFunction(calculatorKey, calculatorFunction) {
    this.calculators.set(calculatorKey, {
      path: 'manual',
      relativePath: 'manual',
      loaded: true,
      module: { default: calculatorFunction }
    });
    
    console.log(`Manually registered calculator: ${calculatorKey}`);
  }

  /**
   * Reload a specific calculator module
   * @param {string} calculatorKey - Calculator key
   */
  async reloadCalculator(calculatorKey) {
    const calculatorInfo = this.calculators.get(calculatorKey);
    if (!calculatorInfo) {
      throw new Error(`Calculator not found: ${calculatorKey}`);
    }

    if (calculatorInfo.path !== 'manual') {
      // Clear module cache and reload
      delete require.cache[calculatorInfo.path];
      calculatorInfo.loaded = false;
      calculatorInfo.module = null;
      
      // Load fresh module
      await this.getCalculator(calculatorKey);
      console.log(`Reloaded calculator: ${calculatorKey}`);
    }
  }

  /**
   * Get calculator statistics
   * @returns {object} - Registry statistics
   */
  getStats() {
    const total = this.calculators.size;
    const loaded = Array.from(this.calculators.values()).filter(calc => calc.loaded).length;
    
    return {
      total,
      loaded,
      unloaded: total - loaded,
      initialized: this.isInitialized,
      calculators: Array.from(this.calculators.keys())
    };
  }
}

// Export singleton instance
export const calculatorRegistry = new CalculatorRegistry();
export default calculatorRegistry;
