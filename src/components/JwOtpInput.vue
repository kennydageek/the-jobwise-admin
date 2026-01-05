<template>
  <div ref="otpCont" class="flex justify-between">
    <input
      type="password"
      class="digit-box"
      v-for="(el, ind) in digits"
      :key="el + ind"
      v-model="digits[ind]"
      :autofocus="ind === 0"
      placeholder=""
      maxlength="1"
      @keydown="handleKeyDown($event, ind)"
      :class="{ bounce: digits[ind] !== null }"
    />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';

const props = defineProps({
  default: String,

  digitCount: {
    type: Number,
    required: true,
  },
});

const digits = reactive([]);

if (props.default && props.default.length === props.digitCount) {
  for (let i = 0; i < props.digitCount; i++) {
    digits[i] = props.default.charAt(i);
  }
} else {
  for (let i = 0; i < props.digitCount; i++) {
    digits[i] = null;
  }
}

const otpCont = ref(null);

const emit = defineEmits(['update:otp']);

const isDigitsFull = function () {
  for (const elem of digits) {
    if (elem == null || elem == undefined) {
      return false;
    }
  }

  return true;
};

const handleKeyDown = function (event, index) {
  if (
    event.key !== 'Tab' &&
    event.key !== 'ArrowRight' &&
    event.key !== 'ArrowLeft'
  ) {
    event.preventDefault();
  }

  if (event.key === 'Backspace') {
    digits[index] = null;

    if (index != 0) {
      otpCont.value.children[index - 1].focus();
    }

    return;
  }

  // Update the regex to accept alphanumeric characters
  if (new RegExp('^[a-zA-Z0-9]$').test(event.key)) {
    digits[index] = event.key;

    if (index != props.digitCount - 1) {
      otpCont.value.children[index + 1].focus();
    }

    if (isDigitsFull()) {
      emit('update:otp', digits.join(''));
    }
  }
};
</script>

<style scoped>
.digit-box {
  height: 10vw; /* Make the height relative to viewport width */
  width: 9.5vw; /* Make the width relative to viewport width */
  max-height: 56px; /* Add maximum size constraints */
  max-width: 54px;
  min-height: 40px; /* Add minimum size constraints */
  min-width: 38px;
  flex-grow: 0;
  border: 1.5px solid #e1e7eb;
  display: inline-block;
  border-radius: 5px;
  margin: 5px;
  text-align: center;
  font-size: 1rem; /* Use relative font size */
}
.digit-box:focus {
  border: 1.5px solid #5270ed !important;
}

.bounce {
  animation: pulse 0.3s ease-in-out alternate;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }

  100% {
    transform: scale(1.1);
  }
}

/* Responsive adjustments for smaller screens */
@media (max-width: 768px) {
  .digit-box {
    height: 8vw;
    width: 8vw;
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .digit-box {
    height: 11vw;
    width: 11vw;
    font-size: 0.8rem;
    margin: 3px;
  }
}
</style>
