import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useSidebarStore = defineStore('store', {
  state: () => ({
    showSidebar: false,
  }),

  actions: {
    TOGGLE_SIDEBAR(show) {
      this.showSidebar = !show;
    },
  },
});
