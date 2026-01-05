import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useCouponStore = defineStore('coupon', {
  state: () => ({
    coupon: [],
  }),
  actions: {
    UPDATE_COUPON(data) {
      console.log(data);
      this.coupon = data;
    },
  },

  persist: {
    storage: localStorage,
  },
});
