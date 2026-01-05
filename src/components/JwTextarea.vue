<template>
  <div class="floating-label-textarea">
    <!-- Left Icon -->
    <span v-if="leftIcon" class="textarea-icon-left">
      <i :class="leftIcon"></i>
    </span>

    <!-- Textarea -->
    <textarea
      :id="id"
      :value="modelValue"
      @input="updateValue"
      :required="required"
      :placeholder="placeholder"
      class="textarea-field"
      @focus="isFocused = true"
      @blur="handleBlur"
      :class="{
        'has-content': modelValue || isFocused,
        'with-left-icon': leftIcon,
      }"
    ></textarea>

    <!-- Label -->
    <label
      :for="id"
      class="textarea-label"
      :class="{ 'is-floating': modelValue || isFocused }"
    >
      {{ label }}
    </label>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'FloatingLabelTextarea',
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      default: () => `textarea-${Math.random().toString(36).substr(2, 9)}`,
    },
    required: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: ' ', // Placeholder must be non-empty for floating behavior
    },
    leftIcon: {
      type: String,
      default: '', // Class name for the left icon (e.g., "fa fa-comment")
    },
  },
  setup(props, { emit }) {
    const isFocused = ref(false);

    const updateValue = (event) => {
      emit('update:modelValue', event.target.value);
    };

    const handleBlur = () => {
      isFocused.value = false;
      emit('blur');
    };

    return {
      isFocused,
      updateValue,
      handleBlur,
    };
  },
});
</script>

<style scoped>
.floating-label-textarea {
  position: relative;
  font-family: Arial, sans-serif;
  display: flex;
  align-items: start;
  flex-direction: column;
}

.textarea-field {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  background-color: transparent;
  transition: border-color 0.3s ease-in-out;
  resize: none;
  min-height: 200px; /* Adjust as needed */
}

.textarea-field:focus {
  border-color: #6772e5;
}

.textarea-label {
  position: absolute;
  top: 14px;
  left: 15px;
  font-size: 12px;
  color: #999;
  pointer-events: none;
  transition: all 0.3s ease-in-out;
}

.textarea-field:focus + .textarea-label,
.textarea-label.is-floating {
  top: -10px;
  left: 10px;
  font-size: 12px;
  color: #6772e5;
  padding: 0 10px;
  background: #fff;
}

.textarea-field.has-content + .textarea-label {
  top: -10px;
  left: 10px;
  font-size: 12px;
  color: #6772e5;
}

/* Adjust padding for left icon */
.textarea-field.with-left-icon {
  padding-left: 35px;
}

/* Left Icon */
.textarea-icon-left {
  position: absolute;
  left: 10px;
  top: 20px;
  font-size: 16px;
  color: #999;
}
</style>
