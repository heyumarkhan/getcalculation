<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  units: {
    type: Object,
    required: true
  },
  selected: {
    type: String,
    required: true
  },
  displayType: {
    type: String,
    default: 'unit-selector',
    validator: value => ['unit-selector', 'dropdown', 'toggle', 'radio'].includes(value)
  },
  showSymbol: {
    type: Boolean,
    default: true
  },
  showLabel: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: 'md',
    validator: value => ['sm', 'md', 'lg'].includes(value)
  }
});

const emit = defineEmits(['change']);

// Component state
const isOpen = ref(false);
const dropdownRef = ref(null);

// Unit information mapping
const unitInfo = {
  // Weight units
  kg: { symbol: 'kg', label: 'Kilograms' },
  lb: { symbol: 'lb', label: 'Pounds' },
  g: { symbol: 'g', label: 'Grams' },
  oz: { symbol: 'oz', label: 'Ounces' },
  
  // Length units
  m: { symbol: 'm', label: 'Meters' },
  cm: { symbol: 'cm', label: 'Centimeters' },
  mm: { symbol: 'mm', label: 'Millimeters' },
  km: { symbol: 'km', label: 'Kilometers' },
  ft: { symbol: 'ft', label: 'Feet' },
  in: { symbol: 'in', label: 'Inches' },
  yd: { symbol: 'yd', label: 'Yards' },
  mi: { symbol: 'mi', label: 'Miles' },
  
  // Currency units
  usd: { symbol: '$', label: 'US Dollar' },
  eur: { symbol: '€', label: 'Euro' },
  gbp: { symbol: '£', label: 'British Pound' },
  jpy: { symbol: '¥', label: 'Japanese Yen' },
  
  // Percentage
  '%': { symbol: '%', label: 'Percent' },
  
  // Time units
  s: { symbol: 's', label: 'Seconds' },
  min: { symbol: 'min', label: 'Minutes' },
  h: { symbol: 'h', label: 'Hours' },
  day: { symbol: 'day', label: 'Days' },
  week: { symbol: 'week', label: 'Weeks' },
  month: { symbol: 'month', label: 'Months' },
  year: { symbol: 'year', label: 'Years' },
  
  // Temperature units
  c: { symbol: '°C', label: 'Celsius' },
  f: { symbol: '°F', label: 'Fahrenheit' },
  k: { symbol: 'K', label: 'Kelvin' },
  
  // Area units
  m2: { symbol: 'm²', label: 'Square Meters' },
  cm2: { symbol: 'cm²', label: 'Square Centimeters' },
  ft2: { symbol: 'ft²', label: 'Square Feet' },
  in2: { symbol: 'in²', label: 'Square Inches' },
  
  // Volume units
  l: { symbol: 'L', label: 'Liters' },
  ml: { symbol: 'mL', label: 'Milliliters' },
  gal: { symbol: 'gal', label: 'Gallons' },
  qt: { symbol: 'qt', label: 'Quarts' },
  cup: { symbol: 'cup', label: 'Cups' }
};

// Computed properties
const availableUnits = computed(() => {
  return props.units.available?.map(unit => ({
    value: unit,
    symbol: unitInfo[unit]?.symbol || unit,
    label: unitInfo[unit]?.label || unit,
    info: unitInfo[unit]
  })) || [];
});

const selectedUnitInfo = computed(() => {
  const unit = availableUnits.value.find(u => u.value === props.selected);
  return unit || { value: props.selected, symbol: props.selected, label: props.selected };
});

const displayText = computed(() => {
  if (props.showLabel && props.showSymbol) {
    return `${selectedUnitInfo.value.symbol} ${selectedUnitInfo.value.label}`;
  } else if (props.showLabel) {
    return selectedUnitInfo.value.label;
  } else {
    return selectedUnitInfo.value.symbol;
  }
});

const containerClasses = computed(() => [
  'unit-selector',
  `unit-selector-${props.displayType}`,
  `unit-selector-${props.size}`,
  {
    'is-open': isOpen.value,
    'is-disabled': props.disabled,
    'has-multiple-units': availableUnits.value.length > 1
  }
]);

// Methods
const selectUnit = (unit) => {
  if (props.disabled) return;
  
  emit('change', unit);
  closeDropdown();
};

const toggleDropdown = () => {
  if (props.disabled || availableUnits.value.length <= 1) return;
  
  isOpen.value = !isOpen.value;
};

const closeDropdown = () => {
  isOpen.value = false;
};

const handleKeydown = (event) => {
  if (props.disabled) return;
  
  switch (event.key) {
    case 'Enter':
    case ' ':
      event.preventDefault();
      toggleDropdown();
      break;
    case 'Escape':
      closeDropdown();
      break;
    case 'ArrowDown':
      event.preventDefault();
      if (!isOpen.value) {
        toggleDropdown();
      } else {
        // Focus next option
        focusNextOption(1);
      }
      break;
    case 'ArrowUp':
      event.preventDefault();
      if (isOpen.value) {
        focusNextOption(-1);
      }
      break;
  }
};

const focusNextOption = (direction) => {
  const currentIndex = availableUnits.value.findIndex(u => u.value === props.selected);
  const nextIndex = currentIndex + direction;
  
  if (nextIndex >= 0 && nextIndex < availableUnits.value.length) {
    selectUnit(availableUnits.value[nextIndex].value);
  }
};

// Click outside handler
const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    closeDropdown();
  }
};

// Lifecycle
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
  <div 
    ref="dropdownRef"
    :class="containerClasses"
    @keydown="handleKeydown"
  >
    <!-- Unit Selector (Default) -->
    <div 
      v-if="displayType === 'unit-selector'"
      class="unit-selector-trigger"
      :tabindex="disabled ? -1 : 0"
      @click="toggleDropdown"
    >
      <span class="unit-text">{{ displayText }}</span>
      <svg 
        v-if="availableUnits.length > 1"
        class="unit-dropdown-arrow"
        :class="{ 'rotated': isOpen }"
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </div>

    <!-- Dropdown Menu -->
    <div 
      v-if="displayType === 'unit-selector' && isOpen && availableUnits.length > 1"
      class="unit-dropdown-menu"
    >
      <button
        v-for="unit in availableUnits"
        :key="unit.value"
        type="button"
        class="unit-option"
        :class="{ 'is-selected': unit.value === selected }"
        @click="selectUnit(unit.value)"
      >
        <span class="unit-symbol">{{ unit.symbol }}</span>
        <span v-if="showLabel" class="unit-label">{{ unit.label }}</span>
        <svg 
          v-if="unit.value === selected"
          class="unit-check-icon"
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>

    <!-- Dropdown Select -->
    <select
      v-if="displayType === 'dropdown'"
      :value="selected"
      :disabled="disabled"
      class="unit-dropdown-select"
      @change="$emit('change', $event.target.value)"
    >
      <option
        v-for="unit in availableUnits"
        :key="unit.value"
        :value="unit.value"
      >
        {{ showLabel ? unit.label : unit.symbol }}
      </option>
    </select>

    <!-- Toggle Buttons -->
    <div v-if="displayType === 'toggle'" class="unit-toggle-group">
      <button
        v-for="unit in availableUnits"
        :key="unit.value"
        type="button"
        class="unit-toggle-button"
        :class="{ 'is-active': unit.value === selected }"
        :disabled="disabled"
        @click="selectUnit(unit.value)"
      >
        {{ showLabel ? unit.label : unit.symbol }}
      </button>
    </div>

    <!-- Radio Buttons -->
    <div v-if="displayType === 'radio'" class="unit-radio-group">
      <label
        v-for="unit in availableUnits"
        :key="unit.value"
        class="unit-radio-option"
      >
        <input
          type="radio"
          :value="unit.value"
          :checked="unit.value === selected"
          :disabled="disabled"
          class="unit-radio-input"
          @change="selectUnit(unit.value)"
        />
        <span class="unit-radio-label">
          <span class="unit-symbol">{{ unit.symbol }}</span>
          <span v-if="showLabel" class="unit-label">{{ unit.label }}</span>
        </span>
      </label>
    </div>
  </div>
</template>

<style scoped>
/* Base Unit Selector Styles */
.unit-selector {
  @apply relative inline-block;
}

.unit-selector-trigger {
  @apply flex items-center justify-between px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-all duration-200;
}

.unit-selector-trigger:hover {
  @apply border-gray-400;
}

.unit-selector.is-disabled .unit-selector-trigger {
  @apply bg-gray-50 text-gray-500 cursor-not-allowed;
}

.unit-text {
  @apply text-sm font-medium text-gray-700 min-w-0;
}

.unit-dropdown-arrow {
  @apply w-4 h-4 ml-2 text-gray-400 transition-transform duration-200 flex-shrink-0;
}

.unit-dropdown-arrow.rotated {
  @apply transform rotate-180;
}

/* Dropdown Menu */
.unit-dropdown-menu {
  @apply absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto;
}

.unit-option {
  @apply w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 flex items-center justify-between transition-colors duration-150;
}

.unit-option.is-selected {
  @apply bg-accent-50 text-accent-700;
}

.unit-symbol {
  @apply font-medium;
}

.unit-label {
  @apply ml-2 text-gray-500;
}

.unit-check-icon {
  @apply w-4 h-4 text-accent-600;
}

/* Dropdown Select */
.unit-dropdown-select {
  @apply block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 text-sm;
}

.unit-dropdown-select:disabled {
  @apply bg-gray-50 text-gray-500 cursor-not-allowed;
}

/* Toggle Buttons */
.unit-toggle-group {
  @apply flex border border-gray-300 rounded-md overflow-hidden;
}

.unit-toggle-button {
  @apply flex-1 px-3 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:z-10 border-r border-gray-300 last:border-r-0 transition-colors duration-150;
}

.unit-toggle-button.is-active {
  @apply bg-accent-600 text-white hover:bg-accent-700;
}

.unit-toggle-button:disabled {
  @apply bg-gray-50 text-gray-500 cursor-not-allowed;
}

/* Radio Buttons */
.unit-radio-group {
  @apply space-y-2;
}

.unit-radio-option {
  @apply flex items-center cursor-pointer;
}

.unit-radio-input {
  @apply mr-3 text-accent-600 focus:ring-accent-500;
}

.unit-radio-label {
  @apply flex items-center text-sm text-gray-700;
}

/* Size Variants */
.unit-selector-sm .unit-selector-trigger {
  @apply px-2 py-1 text-xs;
}

.unit-selector-sm .unit-dropdown-arrow {
  @apply w-3 h-3 ml-1;
}

.unit-selector-lg .unit-selector-trigger {
  @apply px-4 py-3 text-base;
}

.unit-selector-lg .unit-dropdown-arrow {
  @apply w-5 h-5 ml-3;
}

/* Single Unit Display */
.unit-selector:not(.has-multiple-units) .unit-selector-trigger {
  @apply cursor-default bg-gray-50 text-gray-600;
}

.unit-selector:not(.has-multiple-units) .unit-dropdown-arrow {
  @apply hidden;
}

/* Focus and hover states */
.unit-selector.is-open .unit-selector-trigger {
  @apply ring-2 ring-accent-500 border-accent-500;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .unit-dropdown-menu {
    @apply left-0 right-0;
  }
  
  .unit-toggle-group {
    @apply flex-col;
  }
  
  .unit-toggle-button {
    @apply border-r-0 border-b border-gray-300 last:border-b-0;
  }
}

/* Dark mode support (if needed) */
@media (prefers-color-scheme: dark) {
  .unit-selector-trigger {
    @apply bg-gray-800 border-gray-600 text-gray-200;
  }
  
  .unit-dropdown-menu {
    @apply bg-gray-800 border-gray-600;
  }
  
  .unit-option {
    @apply text-gray-200 hover:bg-gray-700;
  }
}
</style>
