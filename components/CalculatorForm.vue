<script setup>
import { reactive, ref, watch } from 'vue';

const props = defineProps({
  manifest: {
    type: Object,
    required: false,
  },
});

const result = ref(null);
const error = ref(null);
const isLoading = ref(false);
const formState = reactive({});
const fieldErrors = reactive({});

// This watcher reactively initializes the form's state keys when the manifest arrives.
watch(() => props.manifest, (newManifest) => {
  if (newManifest) {
    // Handle new section-based format
    if (newManifest.sections) {
      newManifest.sections.forEach(section => {
        section.fields.forEach(field => {
          if (!(field.name in formState)) {
            // Set default value for select fields or use null
            formState[field.name] = field.defaultValue || null;
          }
          // Initialize unit state for unit-aware fields
          if (field.units && !(field.name + 'Unit' in formState)) {
            formState[field.name + 'Unit'] = field.units.default || field.units.available[0];
          }
        });
      });
    }
    // Handle legacy parameters format
    else if (newManifest.parameters) {
      newManifest.parameters.forEach(param => {
        if (!(param.name in formState)) {
           formState[param.name] = null;
        }
      });
    }
  }
}, { immediate: true });

let debounceTimer = null;

// This watcher handles the live calculation with a 500ms debounce.
watch(formState, () => {
  if (!props.manifest?.outputs) return; // Don't calculate if manifest isn't ready
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    performCalculation();
  }, 500);
}, { deep: true });

async function performCalculation() {
  if (!props.manifest) return;

  // Validate all fields first
  const isValid = validateAllFields();
  
  if (!isValid) {
    result.value = null;
    error.value = 'Please enter correct values above';
    return;
  }

  // Clear any previous errors
  error.value = null;

  isLoading.value = true;
  error.value = null;
  
  console.log('Performing calculation with manifest:', props.manifest);
  try {
    // Prepare inputs based on manifest format
    let inputs = formState;
    
    // For section-based manifests, organize inputs by section
    if (props.manifest.sections) {
      inputs = {};
      props.manifest.sections.forEach(section => {
        inputs[section.id] = {};
        section.fields.forEach(field => {
          inputs[section.id][field.name] = formState[field.name];
          if (field.units) {
            inputs[section.id][field.name + 'Unit'] = formState[field.name + 'Unit'];
          }
        });
      });
    }
    
    const response = await $fetch(`/api/calculate/${props.manifest.categorySlug}/${props.manifest.toolSlug}`, {
      method: 'POST',
      body: {
        logic: props.manifest.calculationLogic,
        inputs: inputs,
        manifest: props.manifest, // Pass manifest for enhanced calculators
      },
    });
    if(response.error) {
      error.value = response.error;
      result.value = null;
    } else {
      result.value = response;
      console.log('Calculation result:', response);
    }
  } catch (e) {
    error.value = e.data?.message || 'An unexpected error occurred.';
    result.value = null;
  } finally {
    isLoading.value = false;
  }
}

function setFormState(newValues) {
  for (const key in newValues) {
    if (key in formState) {
      formState[key] = parseFloat(newValues[key]);
    }
  }
}

function formatOutputValue(value, output) {
  if (value === undefined || value === null) {
    return 'N/A';
  }
  
  // Handle different output types
  if (output?.type === 'number' && typeof value === 'number') {
    const precision = output?.precision !== undefined ? output.precision : 2;
    return value.toFixed(precision);
  } else if (typeof value === 'number') {
    // Default number formatting if type not specified
    const precision = output?.precision !== undefined ? output.precision : 2;
    return value.toFixed(precision);
  } else {
    // For strings and other types, return as-is
    return String(value);
  }
}

function getOutputValueClasses(output, value) {
  const baseClasses = 'font-bold';
  
  if (output?.type === 'number' || typeof value === 'number') {
    return `${baseClasses} text-2xl text-accent-600`;
  } else if (output?.type === 'string') {
    // Special styling for category results
    if (output.name === 'category') {
      return `${baseClasses} text-lg ${getCategoryColorClass(value)}`;
    }
    return `${baseClasses} text-lg text-gray-700`;
  } else {
    return `${baseClasses} text-lg text-gray-700`;
  }
}

function getCategoryColorClass(category) {
  const categoryColors = {
    'Underweight': 'text-orange-600',
    'Normal Weight': 'text-green-600',
    'Overweight': 'text-yellow-600',
    'Obese': 'text-red-600'
  };
  return categoryColors[category] || 'text-gray-600';
}

function getCategoryDescription(category) {
  const descriptions = {
    'Underweight': 'BMI < 18.5',
    'Normal Weight': 'BMI 18.5 - 24.9',
    'Overweight': 'BMI 25.0 - 29.9',
    'Obese': 'BMI ≥ 30.0'
  };
  return descriptions[category] || '';
}

// Field validation functions
function validateField(fieldName, value, field) {
  fieldErrors[fieldName] = null;
  
  if (!field) return true;
  
  // Check required fields
  if (field.required && (value === null || value === undefined || value === '')) {
    fieldErrors[fieldName] = `${field.label} is required`;
    return false;
  }
  
  // Skip validation for empty optional fields
  if (!field.required && (value === null || value === undefined || value === '')) {
    return true;
  }
  
  // Type-specific validation
  if (field.type === 'number' && value !== null && value !== undefined && value !== '') {
    const numValue = Number(value);
    
    if (isNaN(numValue)) {
      fieldErrors[fieldName] = `${field.label} must be a valid number`;
      return false;
    }
    
    if (field.min !== undefined && numValue < field.min) {
      fieldErrors[fieldName] = field.validation?.message || `${field.label} must be at least ${field.min}`;
      return false;
    }
    
    if (field.max !== undefined && numValue > field.max) {
      fieldErrors[fieldName] = field.validation?.message || `${field.label} must be at most ${field.max}`;
      return false;
    }
  }
  
  return true;
}

function validateAllFields() {
  let isValid = true;
  
  if (props.manifest?.sections) {
    // New section-based format
    props.manifest.sections.forEach(section => {
      section.fields.forEach(field => {
        const value = formState[field.name];
        if (!validateField(field.name, value, field)) {
          isValid = false;
        }
      });
    });
  } else if (props.manifest?.parameters) {
    // Legacy parameters format
    props.manifest.parameters.forEach(param => {
      const value = formState[param.name];
      if (!validateField(param.name, value, param)) {
        isValid = false;
      }
    });
  }
  
  return isValid;
}

function handleFieldInput(fieldName, value, field) {
  // Parse numeric fields as numbers to prevent string concatenation in calculations
  if (field.type === 'number' && value !== '' && value !== null && value !== undefined) {
    formState[fieldName] = parseFloat(value);
  } else {
    formState[fieldName] = value;
  }
  // Validate on input with debounce
  setTimeout(() => {
    validateField(fieldName, value, field);
  }, 300);
}

function handleFieldBlur(fieldName, value, field) {
  // Parse numeric fields as numbers to prevent string concatenation in calculations
  if (field.type === 'number' && value !== '' && value !== null && value !== undefined) {
    formState[fieldName] = parseFloat(value);
  } else {
    formState[fieldName] = value;
  }
  validateField(fieldName, value, field);
}

// Check if a section should be displayed based on conditional display rules
function shouldShowSection(section) {
  // If no conditional display is specified, always show the section
  if (!section.conditionalDisplay) {
    return true;
  }

  const { field, value } = section.conditionalDisplay;
  
  // Check if the controlling field's value matches the required value
  return formState[field] === value;
}

defineExpose({
  performCalculation,
  setFormState
});
</script>

<template>
  <div class="max-w-2xl mx-auto">
    <!-- Calculator Form -->
    <form @submit.prevent="performCalculation" class="mb-8">
      <!-- New Section-Based Format -->
      <div v-if="manifest && manifest.sections" class="space-y-8">
        <div 
          v-for="section in manifest.sections" 
          :key="section.id" 
          v-show="shouldShowSection(section)"
          class="section-group"
        >
          <!-- Section Header -->
          <div class="section-header mb-4">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">{{ section.title }}</h3>
            <p v-if="section.description" class="text-sm text-gray-600 dark:text-gray-400 mt-1">{{ section.description }}</p>
          </div>
          
          <!-- Section Fields -->
          <div class="space-y-6">
            <div v-for="field in section.fields" :key="field.name" class="form-group">
              <!-- Unit-Aware Field -->
              <div v-if="field.units" class="unit-aware-field">
                <label :for="field.name" class="form-label">
                  {{ field.label }}
                  <span v-if="field.required" class="text-red-500 ml-1">*</span>
                </label>
                <div class="flex items-center space-x-2">
                  <input
                    :id="field.name"
                    :value="formState[field.name]"
                    :type="field.type"
                    :placeholder="field.placeholder"
                    :min="field.min"
                    :max="field.max"
                    :step="field.step"
                    class="form-input flex-1"
                    :class="{ 
                      'border-red-300 focus:border-red-500 focus:ring-red-500': fieldErrors[field.name],
                      'border-green-300 focus:border-green-500 focus:ring-green-500': !fieldErrors[field.name] && formState[field.name] 
                    }"
                    @input="handleFieldInput(field.name, $event.target.value, field)"
                    @blur="handleFieldBlur(field.name, $event.target.value, field)"
                  />
                  <select
                    v-model="formState[field.name + 'Unit']"
                    class="form-select w-24"
                  >
                    <option v-for="unit in field.units.available" :key="unit" :value="unit">
                      {{ unit }}
                    </option>
                  </select>
                </div>
                <!-- Field Error Message -->
                <div v-if="fieldErrors[field.name]" class="field-error-message">
                  {{ fieldErrors[field.name] }}
                </div>
              </div>
              
              <!-- Regular Field -->
              <div v-else>
                <label :for="field.name" class="form-label">
                  {{ field.label }}
                  <span v-if="field.required" class="text-red-500 ml-1">*</span>
                  <span v-if="field.unit" class="text-neutral-500 font-normal">({{ field.unit }})</span>
                </label>
                
                <!-- Select Dropdown -->
                <select
                  v-if="field.type === 'select'"
                  :id="field.name"
                  :value="formState[field.name]"
                  class="form-input"
                  :class="{ 
                    'border-red-300 dark:border-red-600 focus:border-red-500 focus:ring-red-500': fieldErrors[field.name],
                    'border-green-300 dark:border-green-600 focus:border-green-500 focus:ring-green-500': !fieldErrors[field.name] && formState[field.name]
                  }"
                  @change="handleFieldInput(field.name, $event.target.value, field)"
                  @blur="handleFieldBlur(field.name, $event.target.value, field)"
                >
                  <option value="" disabled>{{ field.placeholder || 'Select an option' }}</option>
                  <option
                    v-for="option in field.options"
                    :key="option.value"
                    :value="option.value"
                  >
                    {{ option.label }}
                  </option>
                </select>
                
                <!-- Regular Input -->
                <input
                  v-else
                  :id="field.name"
                  :value="formState[field.name]"
                  :type="field.type"
                  :placeholder="field.placeholder"
                  :min="field.min"
                  :max="field.max"
                  :step="field.step"
                  class="form-input"
                  :class="{ 
                    'border-red-300 dark:border-red-600 focus:border-red-500 focus:ring-red-500': fieldErrors[field.name],
                    'border-green-300 dark:border-green-600 focus:border-green-500 focus:ring-green-500': !fieldErrors[field.name] && formState[field.name]
                  }"
                  @input="handleFieldInput(field.name, $event.target.value, field)"
                  @blur="handleFieldBlur(field.name, $event.target.value, field)"
                />
                
                <!-- Field Error Message -->
                <div v-if="fieldErrors[field.name]" class="field-error-message">
                  {{ fieldErrors[field.name] }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Legacy Parameters Format -->
      <div v-else-if="manifest && manifest.parameters" class="space-y-6">
        <div v-for="param in manifest.parameters" :key="param.name" class="form-group">
          <label :for="param.name" class="form-label">
            {{ param.label }}
            <span v-if="param.required" class="text-red-500 ml-1">*</span>
            <span class="text-neutral-500 font-normal">({{ param.unit }})</span>
          </label>
          <input
            :id="param.name"
            :value="formState[param.name]"
            :type="param.type"
            :placeholder="`Enter ${param.label.toLowerCase()}`"
            class="form-input"
            :class="{ 
              'border-red-300 focus:border-red-500 focus:ring-red-500': fieldErrors[param.name],
              'border-green-300 focus:border-green-500 focus:ring-green-500': !fieldErrors[param.name] && formState[param.name]
            }"
            @input="handleFieldInput(param.name, $event.target.value, param)"
            @blur="handleFieldBlur(param.name, $event.target.value, param)"
          />
          <!-- Field Error Message -->
          <div v-if="fieldErrors[param.name]" class="field-error-message">
            {{ fieldErrors[param.name] }}
          </div>
        </div>
      </div>
    </form>

    <!-- Results Section -->
    <div class="card p-8">
      <!-- Loading State -->
      <div v-if="isLoading" class="text-center py-8">
        <div class="inline-flex items-center space-x-3">
          <div class="animate-spin rounded-full h-6 w-6 border-2 border-accent-500 border-t-transparent"></div>
          <span class="text-lg font-medium text-neutral-700 dark:text-neutral-300">Calculating...</span>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="error-message">
        <div class="flex items-start space-x-3">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
            </svg>
          </div>
          <div>
            <h3 class="text-sm font-medium text-red-800">Calculation Error</h3>
            <p class="text-sm text-red-700 mt-1">{{ error }}</p>
          </div>
        </div>
      </div>

      <!-- Success State -->
      <div v-else-if="result" class="success-message">
        <div class="space-y-4">
          <!-- Show results based on manifest outputs -->
            <template v-if="result">
              <div v-for="output in (manifest?.outputs || [])" :key="output?.name || Math.random()"
                  class="bg-white rounded-lg p-6 border border-neutral-200">
                <div class="flex items-center justify-between">
                  <span class="text-sm font-medium text-neutral-600">{{ output?.label || 'Result' }}</span>
                  <span class="text-right">
                    <div :class="getOutputValueClasses(output, result[output.name])">
                      {{ formatOutputValue(result[output.name], output) }}
                      <span v-if="output?.unit" class="text-lg font-normal text-neutral-500 ml-1">{{ output.unit }}</span>
                    </div>
                    <div v-if="output?.type === 'string' && output.name === 'category'" class="text-xs text-neutral-500 mt-1">
                      {{ getCategoryDescription(result[output.name]) }}
                    </div>
                  </span>
                </div>
              </div>
            </template>
          
          <!-- Fallback: Show all result values if outputs array is empty or malformed -->
          <div v-if="(!manifest?.outputs || manifest.outputs.length === 0) && result" 
               class="bg-white rounded-lg p-6 border border-neutral-200">
            <div v-for="(value, key) in result" :key="key" class="flex items-center justify-between mb-2 last:mb-0">
              <span class="text-sm font-medium text-neutral-600">{{ key }}</span>
              <span class="text-2xl font-bold text-accent-600">
                {{ typeof value === 'number' ? value.toFixed(2) : value }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-12">
        <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-neutral-100 flex items-center justify-center">
          <svg class="w-8 h-8 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
          </svg>
        </div>
        <h3 class="text-lg font-medium text-neutral-700 dark:text-neutral-300 mb-2">Ready to Calculate</h3>
        <p class="text-neutral-500 dark:text-neutral-400">Enter values above to see the result.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.form-label {
  @apply block text-sm font-medium text-gray-700 mb-2;
}

.form-input {
  @apply block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-all duration-200;
}

.form-select {
  @apply block px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-all duration-200;
}

.section-group {
  @apply bg-white dark:bg-neutral-800 rounded-lg p-6 border border-gray-200 dark:border-neutral-700 shadow-sm;
}

.section-header h3 {
  @apply text-lg font-semibold text-gray-900 dark:text-gray-100;
}

.form-group {
  @apply space-y-2;
}

.unit-aware-field .flex {
  @apply items-center space-x-2;
}

.field-error-message {
  @apply mt-2 text-sm text-red-600 flex items-start space-x-1;
}

.field-error-message::before {
  content: "⚠";
  @apply text-red-500 font-bold;
}

/* Input states - using raw CSS to avoid circular dependency */
.form-input.border-red-300 {
  border-color: rgb(252 165 165);
}

.form-input.border-red-300:focus {
  border-color: rgb(239 68 68);
  box-shadow: 0 0 0 3px rgb(239 68 68 / 0.1);
}

.form-input.border-green-300 {
  border-color: rgb(134 239 172);
}

.form-input.border-green-300:focus {
  border-color: rgb(34 197 94);
  box-shadow: 0 0 0 3px rgb(34 197 94 / 0.1);
}
</style>
