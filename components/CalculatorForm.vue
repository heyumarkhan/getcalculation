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

// This watcher reactively initializes the form's state keys when the manifest arrives.
watch(() => props.manifest, (newManifest) => {
  if (newManifest && newManifest.parameters) {
    newManifest.parameters.forEach(param => {
      if (!(param.name in formState)) {
         formState[param.name] = null;
      }
    });
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
  if (!props.manifest || !props.manifest.parameters) return;

  const allFieldsFilled = props.manifest.parameters.every(p => formState[p.name] !== null && formState[p.name] !== '');
  if (!allFieldsFilled) {
    result.value = null;
    return;
  }

  isLoading.value = true;
  error.value = null;
  
  console.log('Performing calculation with manifest:', props.manifest);
  try {
    const response = await $fetch(`/api/calculate/${props.manifest.categorySlug}/${props.manifest.toolSlug}`, {
      method: 'POST',
      body: {
        logic: props.manifest.calculationLogic,
        inputs: formState,
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

defineExpose({
  performCalculation,
  setFormState
});
</script>

<template>
  <div class="max-w-2xl mx-auto">
    <!-- Calculator Form -->
    <form @submit.prevent="performCalculation" class="mb-8">
      <div v-if="manifest && manifest.parameters" class="space-y-6">
        <div v-for="param in manifest.parameters" :key="param.name" class="form-group">
          <label :for="param.name" class="form-label">
            {{ param.label }}
            <span class="text-neutral-500 font-normal">({{ param.unit }})</span>
          </label>
          <input
            :id="param.name"
            v-model.number="formState[param.name]"
            :type="param.type"
            :placeholder="`Enter ${param.label.toLowerCase()}`"
            class="form-input"
            :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-500': error }"
          />
        </div>
      </div>
    </form>

    <!-- Results Section -->
    <div class="card p-8">
      <!-- Loading State -->
      <div v-if="isLoading" class="text-center py-8">
        <div class="inline-flex items-center space-x-3">
          <div class="animate-spin rounded-full h-6 w-6 border-2 border-accent-500 border-t-transparent"></div>
          <span class="text-lg font-medium text-neutral-700">Calculating...</span>
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
                  <span class="text-2xl font-bold text-accent-600">
                    {{ result[output.name] !== undefined ? result[output.name].toFixed(output?.precision || 2) : 'N/A' }}
                    <span class="text-lg font-normal text-neutral-500 ml-1">{{ output?.unit || '' }}</span>
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
        <h3 class="text-lg font-medium text-neutral-700 mb-2">Ready to Calculate</h3>
        <p class="text-neutral-500">Enter values above to see the result.</p>
      </div>
    </div>
  </div>
</template>
