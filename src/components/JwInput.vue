<template>
  <div class="floating-label-input">
    <!-- Left Icon -->
    <span v-if="leftIcon" class="input-icon-left">
      <i :class="leftIcon"></i>
    </span>

    <!-- Input Field -->
    <input
      :type="computedType"
      :id="id"
      :value="modelValue"
      @input="updateValue"
      :required="required"
      :placeholder="placeholder"
      class="input-field"
      @focus="isFocused = true"
      @blur="handleBlur"
      :class="{
        'has-content': modelValue || isFocused,
        'with-left-icon': leftIcon,
        'with-right-icon': rightIcon,
      }"
    />

    <!-- Label -->
    <label
      :for="id"
      class="input-label"
      :class="{ 'is-floating': modelValue || isFocused }"
    >
      {{ label }}
    </label>

    <!-- Right Icon -->
    <span
      v-if="rightIcon"
      class="input-icon-right"
      @click="togglePasswordVisibility"
    >
      <i :class="rightIcon"></i>
    </span>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';

export default defineComponent({
  name: 'FloatingLabelInput',
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'text', // Supports text, email, password, etc.
    },
    id: {
      type: String,
      default: () => `input-${Math.random().toString(36).substr(2, 9)}`,
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
      default: '', // Class name for the left icon (e.g., "fa fa-envelope")
    },
    rightIcon: {
      type: String,
      default: '', // Class name for the right icon (e.g., "fa fa-eye")
    },
  },
  setup(props, { emit }) {
    const isFocused = ref(false);
    const isPasswordVisible = ref(false);

    // Toggle password visibility
    const togglePasswordVisibility = () => {
      if (props.type === 'password') {
        isPasswordVisible.value = !isPasswordVisible.value;
      }
    };

    // Compute the input type (e.g., "text" or "password")
    const computedType = computed(() =>
      props.type === 'password' && isPasswordVisible.value ? 'text' : props.type
    );

    const updateValue = (event) => {
      emit('update:modelValue', event.target.value);
    };

    const handleBlur = () => {
      isFocused.value = false;
      emit('blur');
    };

    return {
      isFocused,
      isPasswordVisible,
      computedType,
      togglePasswordVisibility,
      updateValue,
      handleBlur,
    };
  },
});
</script>

<style scoped>
.floating-label-input {
  position: relative;
  font-family: Arial, sans-serif;
  /* margin: 20px 0; */
  display: flex;
  align-items: center;
}

.input-field {
  width: 100%;
  padding: 10px 5px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  background-color: transparent;
  transition: border-color 0.3s ease-in-out;
}

.input-field:focus {
  border-color: #6772e5;
}

.input-label {
  position: absolute;
  top: 14px;
  left: 38px;
  font-size: 12px;
  color: #999;
  pointer-events: none;
  transition: all 0.3s ease-in-out;
}

.input-field:focus + .input-label,
.input-label.is-floating {
  top: -10px;
  left: 10px;
  font-size: 12px;
  color: #6772e5;
  padding: 0 10px;
  background: #fff;
}

.input-field.has-content + .input-label {
  top: -10px;
  left: 10px;
  font-size: 12px;
  color: #6772e5;
}

/* Input field padding adjustments for icons */
.input-field.with-left-icon {
  padding-left: 35px;
}
.input-field.with-right-icon {
  padding-right: 35px;
}

/* Left Icon */
.input-icon-left {
  position: absolute;
  left: 10px;
  font-size: 16px;
  color: #999;
}

/* Right Icon */
.input-icon-right {
  position: absolute;
  right: 10px;
  font-size: 16px;
  color: #999;
  cursor: pointer;
}

/* Hover effect for right icon */
.input-icon-right:hover {
  color: #6772e5;
}
</style>
