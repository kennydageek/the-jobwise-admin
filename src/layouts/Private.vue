<template>
  <div class="flex">
    <!-- Sidebar Mobile -->
    <jw-sidebar class="hidden md:block" />
    <transition name="slide-in" class="md:hidden">
      <jw-sidebar-mobile
        class="absolute"
        v-show="sidebarStore.$state.showSidebar"
      />
    </transition>

    <!-- Main Content -->
    <main class="grow bg-light-200 pb-20">
      <slot />
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';

import { useSidebarStore } from '@/stores/sidebar.js';

import JwSidebar from '@/components/JwSidebar.vue';
import JwSidebarMobile from '@/components/JwSidebarMobile.vue';

const showSidebar = ref(true);
const sidebarStore = useSidebarStore();
</script>

<style scoped>
/* Sliding transition for entering and leaving */
.slide-in-enter-active,
.slide-in-leave-active {
  transition: transform 0.3s ease-in-out;
}

.slide-in-enter {
  transform: translateX(-1000%); /* Start off-screen */
}

.slide-in-enter-to {
  transform: translateX(1%); /* End fully visible */
}

.slide-in-leave {
  transform: translateX(0); /* Start fully visible */
}

.slide-in-leave-to {
  transform: translateX(-100%); /* End off-screen */
}

/* Sidebar styling */
.jw-sidebar-mobile {
  width: 250px; /* Adjust the width as needed */
  height: 100vh;
  background: #fff;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}
</style>
