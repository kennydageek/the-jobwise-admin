<template>
  <div class="select-field-container relative">
    <label
      for="job-role"
      class="select-label !font-medium absolute top-[-12px] bg-[#fff]"
      >{{ label }}</label
    >
    <select
      id="job-role"
      v-model="selectedValue"
      class="select-field"
      @change="$emit('update:modelValue', $event.target.value)"
    >
      <option value="" class="text-[#c3ccd2]" disabled>
        {{ placeholder }}
      </option>
      <option :value="option.value" v-for="option in options" :key="option.id">
        {{ option.text }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  options: {
    type: Array,
    default: () => [],
  },
  placeholder: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  modelValue: {
    type: [String, Number], // Assuming resume_id is a string or number
    default: '',
  },
});

const emit = defineEmits(['update:modelValue']);

const selectedValue = ref(props.modelValue); // Initialize with modelValue

// Watch for changes in modelValue (from parent)
watch(
  () => props.modelValue,
  (newValue) => {
    selectedValue.value = newValue; // Sync with parent's modelValue
  }
);

// Emit update:modelValue when the selected value changes
watch(selectedValue, (newValue) => {
  emit('update:modelValue', newValue);
});
</script>

<style scoped>
.select-field-container {
  display: flex;
  flex-direction: column;
  color: #fff;
  padding: 16px;
  border-radius: 8px;
  font-family: Arial, sans-serif;
  border: 1.5px solid #e1e7eb;
  transition: border-color 0.3s ease;
}

.select-label {
  font-size: 16px;
  color: #252f48;
  margin-bottom: 8px;
}

.select-field {
  background-color: transparent;
  cursor: pointer;
  color: #252f48;
  border: none;
  padding: 0;
  font-size: 16px;
  outline: none;
  /* border-bottom: 1px solid #e1e7eb; */
  /* Removes default select arrow in some browsers */
}

.select-field::placeholder {
  color: #666;
}

.select-field-container:focus-within {
  border: 1px solid #6772e5;
}

.select-field:focus {
  outline: 1px solid transparent;
  border: 1px solid transparent;
}
</style>
