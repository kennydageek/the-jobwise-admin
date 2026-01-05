<template>
  <div class="input-field-container relative">
    <label
      for="job-title"
      class="input-label !font-medium absolute top-[-12px] bg-[#fff]"
      >{{ label }}</label
    >
    <input
      id="job-title"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="input-field"
      :type="type"
      :placeholder="placeholder"
    />
  </div>
</template>

<script setup>
defineProps({
  placeholder: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  modelValue: {
    type: String,
    default: '',
  },
});

defineEmits(['update:modelValue']);
</script>

<style scoped>
.input-field-container {
  display: flex;
  flex-direction: column;
  color: #fff;
  padding: 16px;
  border-radius: 8px;
  font-family: Arial, sans-serif;
  border: 1.5px solid #e1e7eb;
}

.input-label {
  font-size: 16px;
  color: #252f48;
  margin-bottom: 8px;
}

.input-field {
  background-color: transparent;
  color: #252f48;
  border: none;
  border: 1px solid #fff;
  padding: 0;
  font-size: 16px;
  outline: none;
}

.input-field::placeholder {
  color: #c3ccd2;
}

.input-field-container:focus-within {
  border: 1px solid #6772e5;
}
.input-field:focus {
  outline: 1px solid transparent;
  border: 1px solid transparent;
}
</style>
