<template>
  <div class="input-field-container relative">
    <!-- Label for the dropdown -->
    <label
      for="multi-select"
      class="input-label !font-medium absolute top-[-12px] bg-[#fff]"
      >{{ label }}</label
    >

    <!-- Dropdown toggle button -->
    <div
      class="input-field w-full flex items-center justify-between cursor-pointer"
      @click="toggleDropdown"
    >
      <span>{{
        selectedOptions.length ? selectedOptions.join(', ') : placeholder
      }}</span>
      <span class="arrow-icon">{{ isOpen ? '▲' : '▼' }}</span>
    </div>

    <!-- Dropdown list with checkboxes -->
    <ul v-if="isOpen" class="options-list" v-click-away="away">
      <li v-for="(option, index) in options" :key="index">
        <label class="checkbox-option">
          <input
            type="checkbox"
            :value="option"
            v-model="selectedOptions"
            @change="handleCheckboxChange"
          />
          <span>{{ option }}</span>
        </label>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, watch } from 'vue';

export default {
  props: {
    options: {
      type: Array,
      required: true,
    },
    label: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: 'Select options...',
    },
    modelValue: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, { emit }) {
    // Reactive state
    const isOpen = ref(false);
    const selectedOptions = ref(props.modelValue); // Initialize with modelValue

    const away = () => {
      isOpen.value = false;
    };
    // Toggle dropdown visibility
    const toggleDropdown = () => {
      isOpen.value = !isOpen.value;
    };

    // Handle checkbox change
    const handleCheckboxChange = () => {
      emit('update:modelValue', selectedOptions.value); // Emit updated value
      emit('options-selected', selectedOptions.value);
    };

    // Watch for changes in modelValue (from parent)
    watch(
      () => props.modelValue,
      (newValue) => {
        selectedOptions.value = newValue; // Sync with parent's modelValue
      }
    );

    return {
      isOpen,
      selectedOptions,
      toggleDropdown,
      handleCheckboxChange,
      away,
    };
  },
};
</script>

<style scoped>
.input-field-container {
  display: flex;
  flex-direction: column;
  padding: 16px;
  border-radius: 8px;
  font-family: Arial, sans-serif;
  border: 1.5px solid #e1e7eb;
  position: relative;
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
  padding: 0;
  font-size: 16px;
  outline: none;
  cursor: pointer;
}

.input-field::placeholder {
  color: #c3ccd2;
}

.input-field-container:focus-within {
  border: 1px solid #6772e5;
}

.arrow-icon {
  font-size: 12px;
  margin-left: 8px;
}

.options-list {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin: 0;
  padding: 8px;
  list-style: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: white;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
}

.options-list li {
  padding: 8px;
  cursor: pointer;
}

.checkbox-option {
  display: flex;
  align-items: center;
  gap: 8px;
}

.checkbox-option input {
  cursor: pointer;
}

.options-list li:hover {
  background-color: #f0f0f0;
}
</style>
