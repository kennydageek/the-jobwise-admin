<script setup>
import { RouterView, useRoute } from 'vue-router';
import { computed } from 'vue';

// Import your layout components
import PublicLayout from '@/layouts/Public.vue';
import PrivateLayout from '@/layouts/Private.vue';

const route = useRoute();

const layout = computed(() => {
  // Map layout names to components
  const layouts = {
    public: PublicLayout,
    private: PrivateLayout,
  };

  // Return the corresponding layout component
  return layouts[route?.meta?.layout ?? 'public'];
});
</script>

<template>
  <component :is="layout">
    <RouterView />
  </component>
</template>

<style scoped></style>
