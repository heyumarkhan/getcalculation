<script setup>
// This component accepts a 'prop' called 'manifest'.
// This is how the parent page ([tool].vue) sends data down to this component.
const props = defineProps({
  manifest: {
    type: Object,
    required: true,
  },
});

// 'ref' creates a reactive variable. We'll store the API result here.
const result = ref(null);
const error = ref(null);
const isLoading = ref(false);

// 'reactive' creates a reactive object to store the user's input from the form.
// We initialize it as an empty object.
const formState = reactive({});

// We dynamically set the initial state of the form based on the manifest parameters.
// This ensures the formState has keys like 'principal', 'rate', etc.
props.manifest.parameters.forEach(param => {
  formState[param.name] = null;
});

// This function runs when the user clicks the "Calculate" button.
async function performCalculation() {
  isLoading.value = true;
  result.value = null;
  error.value = null;

  try {
    // We use the global '$fetch' utility to send a POST request to our API.
    const response = await $fetch(`/api/calculate/${props.manifest.categorySlug}/${props.manifest.toolSlug}`, {
      method: 'POST',
      // The body contains the calculationLogic key and the user's inputs.
      body: {
        logic: props.manifest.calculationLogic,
        inputs: formState,
      },
    });
    
    // Check if the API returned an error message inside a valid response
    if(response.error) {
      error.value = response.error;
    } else {
      result.value = response;
    }

  } catch (e) {
    // If the fetch itself fails (e.g., network error, 500 server error), we catch it here.
    error.value = e.data?.message || 'An unexpected error occurred.';
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <form @submit.prevent="performCalculation">
    <div v-for="param in manifest.parameters" :key="param.name" class="form-group">
      <label :for="param.name">{{ param.label }} ({{ param.unit }})</label>
      <input
        :id="param.name"
        v-model.number="formState[param.name]"
        :type="param.type"
        required
        :placeholder="param.label"
      />
    </div>
    
    <button type="submit" :disabled="isLoading">
      {{ isLoading ? 'Calculating...' : 'Calculate' }}
    </button>
  </form>

  <div v-if="result || error" class="results">
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
</template>

<style scoped>
/* Basic styling for the form and results */
.form-group {
  margin-bottom: 1rem;
}
label {
  display: block;
  margin-bottom: 0.25rem;
}
input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  padding: 0.75rem 1.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:disabled {
  background-color: #ccc;
}
.results {
  margin-top: 2rem;
  padding: 1rem;
  border: 1px solid #eee;
  border-radius: 4px;
}
.error-message {
  color: red;
}
</style>