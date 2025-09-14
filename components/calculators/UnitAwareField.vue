<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import UnitSelector from './UnitSelector.vue';

const props = defineProps({
  field: {
    type: Object,
    required: true
  },
  modelValue: {
    type: [Number, String],
    default: null
  },
  unitValue: {
    type: String,
    default: null
  },
  error: {
    type: String,
    default: null
  },
  disabled: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:modelValue', 'update:unitValue', 'blur', 'focus']);

// Internal state
const inputValue = ref(props.modelValue);
const selectedUnit = ref(props.unitValue || props.field.units?.default || '');
const isFocused = ref(false);
const hasError = ref(false);

// Computed properties
const fieldId = computed(() => `field-${props.field.name}`);
const unitId = computed(() => `unit-${props.field.name}`);

const inputClasses = computed(() => [
  'form-input',
  'unit-aware-input',
  {
    'has-error': hasError.value || props.error,
    'is-focused': isFocused.value,
    'is-disabled': props.disabled,
    'has-left-unit': props.field.ui?.position === 'left',
    'has-right-unit': props.field.ui?.position === 'right'
  }
]);

const containerClasses = computed(() => [
  'unit-aware-field',
  {
    'has-units': props.field.units && props.field.units.available?.length > 1,
    'unit-left': props.field.ui?.position === 'left',
    'unit-right': props.field.ui?.position === 'right',
    'unit-below': props.field.ui?.position === 'below',
    'is-required': props.field.required,
    'has-error': hasError.value || props.error
  }
]);

const currentUnitInfo = computed(() => {
  if (!props.field.units || !selectedUnit.value) return null;
  // This would normally come from unit converter, simplified for now
  const unitLabels = {
    kg: { symbol: 'kg', label: 'Kilograms' },
    lb: { symbol: 'lb', label: 'Pounds' },
    g: { symbol: 'g', label: 'Grams' },
    m: { symbol: 'm', label: 'Meters' },
    cm: { symbol: 'cm', label: 'Centimeters' },
    ft: { symbol: 'ft', label: 'Feet' },
    in: { symbol: 'in', label: 'Inches' },
    usd: { symbol: '$', label: 'US Dollar' },
    eur: { symbol: '€', label: 'Euro' },
    gbp: { symbol: '£', label: 'British Pound' },
    '%': { symbol: '%', label: 'Percent' },
    year: { symbol: 'years', label: 'Years' },
    month: { symbol: 'months', label: 'Months' }
  };
  return unitLabels[selectedUnit.value] || { symbol: selectedUnit.value, label: selectedUnit.value };
});

const stepValue = computed(() => {
  // Adjust step based on current unit if needed
  if (currentUnitInfo.value && props.field.units) {
    // This would use unit converter to get appropriate step
    return props.field.step || 0.01;
  }
  return props.field.step || 0.01;
});

// Watchers
watch(() => props.modelValue, (newValue) => {
  inputValue.value = newValue;
});

watch(() => props.unitValue, (newUnit) => {
  if (newUnit) {
    selectedUnit.value = newUnit;
  }
});

watch(inputValue, (newValue) => {
  emit('update:modelValue', newValue);
});

watch(selectedUnit, (newUnit) => {
  emit('update:unitValue', newUnit);
});

// Methods
const handleInput = (event) => {
  const value = event.target.value;
  if (props.field.type === 'number') {
    inputValue.value = value === '' ? null : parseFloat(value);
  } else {
    inputValue.value = value;
  }
};

const handleFocus = () => {
  isFocused.value = true;
  emit('focus');
};

const handleBlur = () => {
  isFocused.value = false;
  validateField();
  emit('blur');
};

const handleUnitChange = (unit) => {
  selectedUnit.value = unit;
};

const validateField = () => {
  hasError.value = false;
  
  if (props.field.required && (inputValue.value === null || inputValue.value === '')) {
    hasError.value = true;
    return;
  }

  if (props.field.type === 'number' && inputValue.value !== null) {
    if (props.field.min !== undefined && inputValue.value < props.field.min) {
      hasError.value = true;
      return;
    }
    if (props.field.max !== undefined && inputValue.value > props.field.max) {
      hasError.value = true;
      return;
    }
  }
};

// Initialize on mount
onMounted(() => {
  if (!selectedUnit.value && props.field.units?.default) {
    selectedUnit.value = props.field.units.default;
    emit('update:unitValue', selectedUnit.value);
  }
});
</script>

<template>
  <div :class="containerClasses">
    <!-- Field Label -->
    <label :for="fieldId" class="field-label">
      {{ field.label }}
      <span v-if="field.required" class="required-indicator">*</span>
      <span v-if="field.description" class="field-description">
        {{ field.description }}
      </span>
    </label>

    <!-- Input Container -->
    <div class="input-container">
      <!-- Left Unit Selector -->
      <UnitSelector
        v-if="field.units && field.ui?.position === 'left'"
        :units="field.units"
        :selected="selectedUnit"
        :display-type="field.ui?.display || 'unit-selector'"
        :show-symbol="field.ui?.showSymbol"
        :disabled="disabled"
        class="unit-selector unit-left"
        @change="handleUnitChange"
      />

      <!-- Main Input Field -->
      <input
        :id="fieldId"
        v-model="inputValue"
        :type="field.type"
        :placeholder="field.placeholder"
        :min="field.min"
        :max="field.max"
        :step="stepValue"
        :disabled="disabled"
        :class="inputClasses"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
      />

      <!-- Right Unit Selector -->
      <UnitSelector
        v-if="field.units && field.ui?.position === 'right'"
        :units="field.units"
        :selected="selectedUnit"
        :display-type="field.ui?.display || 'unit-selector'"
        :show-symbol="field.ui?.showSymbol"
        :disabled="disabled"
        class="unit-selector unit-right"
        @change="handleUnitChange"
      />

      <!-- Unit Display (for single unit fields) -->
      <div
        v-if="field.units && field.units.available?.length === 1"
        class="unit-display"
      >
        {{ currentUnitInfo?.symbol }}
      </div>
    </div>

    <!-- Below Unit Selector -->
    <UnitSelector
      v-if="field.units && field.ui?.position === 'below'"
      :units="field.units"
      :selected="selectedUnit"
      :display-type="field.ui?.display || 'toggle'"
      :show-symbol="field.ui?.showSymbol"
      :disabled="disabled"
      class="unit-selector unit-below"
      @change="handleUnitChange"
    />

    <!-- Error Message -->
    <div v-if="hasError || error" class="field-error">
      {{ error || field.validation?.message || `Invalid ${field.label.toLowerCase()}` }}
    </div>

    <!-- Help Text -->
    <div v-if="field.helpText" class="field-help">
      {{ field.helpText }}
    </div>
  </div>
</template>

<style scoped>
.unit-aware-field {
  @apply mb-6;
}

.field-label {
  @apply block text-sm font-medium text-gray-700 mb-2;
}

.required-indicator {
  @apply text-red-500 ml-1;
}

.field-description {
  @apply block text-xs text-gray-500 font-normal mt-1;
}

.input-container {
  @apply relative flex items-center;
}

.unit-aware-input {
  @apply w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-all duration-200;
}

.unit-aware-input.has-left-unit {
  @apply rounded-l-none border-l-0;
}

.unit-aware-input.has-right-unit {
  @apply rounded-r-none border-r-0;
}

.unit-aware-input.has-error {
  @apply border-red-300 focus:border-red-500 focus:ring-red-500;
}

.unit-aware-input.is-disabled {
  @apply bg-gray-50 text-gray-500 cursor-not-allowed;
}

.unit-aware-input:focus {
  @apply ring-2 ring-accent-500 border-accent-500;
}

.unit-display {
  @apply absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm pointer-events-none;
}

.unit-selector.unit-left {
  @apply rounded-r-none border-r-0;
}

.unit-selector.unit-right {
  @apply rounded-l-none border-l-0;
}

.unit-selector.unit-below {
  @apply mt-2;
}

.field-error {
  @apply mt-2 text-sm text-red-600;
}

.field-help {
  @apply mt-2 text-sm text-gray-500;
}

/* Focus states */
.unit-aware-field.is-focused .unit-selector {
  @apply ring-2 ring-accent-500 border-accent-500;
}

/* Error states */
.unit-aware-field.has-error .unit-selector {
  @apply border-red-300;
}

.unit-aware-field.has-error .unit-aware-input {
  @apply border-red-300 focus:border-red-500 focus:ring-red-500;
}

/* Required field indicator */
.unit-aware-field.is-required .field-label::after {
  content: '';
  @apply inline-block w-1 h-1 bg-red-500 rounded-full ml-2;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .input-container {
    @apply flex-col;
  }
  
  .unit-aware-input.has-left-unit,
  .unit-aware-input.has-right-unit {
    @apply rounded-md border;
  }
  
  .unit-selector.unit-left,
  .unit-selector.unit-right {
    @apply w-full mt-2 rounded-md border;
  }
}
</style>
