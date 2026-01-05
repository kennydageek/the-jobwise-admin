<template>
  <div class="input-field-container relative">
    <!-- Input field for typing or selecting -->
    <label
      for="job-title"
      class="input-label !font-medium absolute top-[-12px] bg-[#fff]"
      >{{ label }}</label
    >
    <input
      type="text"
      v-model="inputValue"
      @input="handleInput"
      @focus="showOptions = true"
      @blur="hideOptions"
      placeholder="Type or select an option..."
      class="input-field w-full"
      @keydown.enter="handleEnter"
    />

    <!-- Dropdown list of options -->
    <ul v-if="showOptions && filteredOptions.length" class="options-list">
      <li
        v-for="(option, index) in filteredOptions"
        :key="index"
        @mousedown="selectOption(option)"
      >
        {{ option }}
      </li>
    </ul>

    <!-- Message if no options match the search -->
    <!-- <div v-show="showOptions && !filteredOptions.length" class="no-results">
      No matching options found.
    </div> -->
  </div>
</template>

<script>
import { ref, computed } from 'vue';

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
  },
  setup(props, { emit }) {
    // Reactive state
    const inputValue = ref('');
    const showOptions = ref(false);

    // Computed property to filter options based on input value
    const filteredOptions = computed(() => {
      return props.options.filter((option) =>
        option.toLowerCase().includes(inputValue.value.toLowerCase())
      );
    });

    // Handle input changes
    const handleInput = () => {
      showOptions.value = true;
      emit('input-change', inputValue.value);
    };

    // Select an option and update the input value
    const selectOption = (option) => {
      inputValue.value = option;
      emit('option-selected', option);
      showOptions.value = false;
      inputValue.value = '';
    };

    // Hide the options list when the input loses focus
    const hideOptions = () => {
      emit('blur');
      setTimeout(() => {
        showOptions.value = false;
      }, 200); // Delay to allow click events to register
    };

    const handleEnter = () => {
      if (
        inputValue.value.trim() &&
        !props.options.includes(inputValue.value.trim())
      ) {
        emit('add-option', inputValue.value.trim()); // Emit event to add new option
        selectOption(inputValue.value.trim()); // Select the newly added option
      }
    };

    return {
      inputValue,
      showOptions,
      filteredOptions,
      handleInput,
      selectOption,
      hideOptions,
      handleEnter,
    };
  },
};
</script>

<style scoped>
.input-field-container {
  display: flex;
  flex-direction: column;
  /* color: #fff; */
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

.options-list {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin: 0;
  padding: 0;
  list-style: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: white;
  max-height: 150px;
  overflow-y: auto;
  z-index: 1000;
}

.options-list li {
  padding: 8px;
  cursor: pointer;
}

.options-list li:hover {
  background-color: #f0f0f0;
}

.no-results {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: white;
  color: #888;
}
</style>
