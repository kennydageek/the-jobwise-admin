import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {},
  }),

  actions: {
    UPDATE_USER(data) {
      console.log(data);
      this.user = data;
    },
  },

  persist: {
    storage: localStorage,
  },
});
