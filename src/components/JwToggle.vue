<template>
  <div
    :class="['toggle-switch', { 'toggle-switch--checked': modelValue }]"
    @click="toggle"
  >
    <div class="toggle-switch__slider"></div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: { type: Boolean, default: false }, // v-model
});

const emit = defineEmits(['update:modelValue']);

const toggle = () => {
  emit('update:modelValue', !props.modelValue);
};
</script>

<style scoped>
.toggle-switch {
  width: 50px;
  height: 25px;
  background-color: #d1d5db; /* gray by default */
  border-radius: 25px;
  position: relative;
  cursor: pointer;
  transition: background-color 0.3s;
}

.toggle-switch--checked {
  background-color: #2563eb; /* blue when checked */
}

.toggle-switch__slider {
  width: 23px;
  height: 23px;
  background-color: #fff;
  border-radius: 50%;
  position: absolute;
  top: 1px;
  left: 1px;
  transition: transform 0.3s;
}

.toggle-switch--checked .toggle-switch__slider {
  transform: translateX(25px);
}
</style>
