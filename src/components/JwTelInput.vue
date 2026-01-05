<template>
  <div class="floating-label-input relative">
    <div class="w-full flex">
      <p
        @click="toggleCountryDropdown"
        class="cursor-pointer text-xl absolute top-[12px] left-[10px]"
      >
        {{ selectedCountry?.flag || countries[234]?.flag }}
        <!-- {{ selectedCountry.dial_code || countries[234]?.dial_code }} -->
      </p>
      <!-- <div class="w-full flex gap-[50px]"> -->
      <p class="absolute top-[12px] text-[16px]mr-20 left-[35px] text-[#999]">
        <!-- {{ selectedCountry.dial_code || countries[234]?.dial_code }} -->
      </p>
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
      <!-- </div> -->

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

    <div
      v-if="countryDropdownOpen"
      class="absolute z-10 top-[45px] border-t border-b bg-[#fff] mt-1 h-[240px] overflow-y-auto rounded"
      v-click-away="away"
    >
      <div
        v-for="country in countries"
        :key="country.code"
        class="space-x-4 p-2 cursor-pointer w-[200px] hover:bg-light-200"
        @click="selectCountry(country)"
      >
        <span>{{ country.flag }}</span>
        <span class="country-name">{{ country.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';

import countriesData from '@/utils/countries.json';

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

    const countryDropdownOpen = ref(false);
    const selectedCountry = ref('');

    const text = ref('');

    // Toggle password visibility
    const togglePasswordVisibility = () => {
      if (props.type === 'password') {
        isPasswordVisible.value = !isPasswordVisible.value;
      }
    };

    const toggleCountryDropdown = () => {
      countryDropdownOpen.value = !countryDropdownOpen.value;
    };

    // Compute the input type (e.g., "text" or "password")
    const computedType = computed(() =>
      props.type === 'password' && isPasswordVisible.value ? 'text' : props.type
    );

    const countries = computed(() => countriesData);

    const selectCountry = (country) => {
      text.value = '';
      selectedCountry.value = country; // Save the selected country object
      countryDropdownOpen.value = false;

      // Emit a custom event 'country-selected' along with the selected country data
      emit('country-selected', {
        dial_code: selectedCountry.value.dial_code,
        name: selectedCountry.value.name,
        flag: selectedCountry.value.flag,
        code: selectedCountry.value.code,
      });
    };

    const away = () => {
      countryDropdownOpen.value = false;
    };

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

      countryDropdownOpen,
      countries,
      selectedCountry,
      toggleCountryDropdown,
      selectCountry,
      text,
      away,
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
  gap: 20px;
}

.input-field {
  width: 100%;
  padding: 10px 30px; /* Default padding */
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  background-color: transparent;
  transition: border-color 0.3s ease-in-out;
}

.input-field.with-country-code {
  padding-left: 90px; /* Adjust this value based on country code width */
}

.input-field:focus {
  border-color: #6772e5;
}

.input-label {
  position: absolute;
  top: 16px;
  left: 60px;
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
