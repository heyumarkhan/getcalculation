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
  <form @submit.prevent="performCalculation">
    <div v-if="manifest && manifest.parameters">
      <div v-for="param in manifest.parameters" :key="param.name" class="form-group">
        <label :for="param.name">{{ param.label }} ({{ param.unit }})</label>
        <input
          :id="param.name"
          v-model.number="formState[param.name]"
          :type="param.type"
          :placeholder="param.label"
        />
      </div>
    </div>
  </form>

  <div class="results">
    <div v-if="isLoading">Calculating...</div>
    <div v-else-if="result || error">
      <h3>Result</h3>
      <div v-if="error" class="error-message">
        <p>Error: {{ error }}</p>
      </div>
      <div v-if="result">
        <div v-for="output in manifest.outputs" :key="output.name">
           <p v-if="result[output.name] !== undefined">
             <strong>{{ output.label }}:</strong> 
             {{ result[output.name].toFixed(output.precision) }} {{ output.unit }}
           </p>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Enter values above to see the result.</p>
    </div>
  </div>
</template>

<style scoped>
.form-group { margin-bottom: 1rem; }
label { display: block; margin-bottom: 0.25rem; }
input { width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px; }
.results { margin-top: 2rem; padding: 1rem; border: 1px solid #eee; border-radius: 4px; }
.error-message { color: red; }
</style>