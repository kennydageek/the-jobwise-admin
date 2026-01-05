import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import dayjs from 'dayjs';

import App from './App.vue';
import router from './http/router';
import VueClickAway from 'vue3-click-away';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';

const app = createApp(App);
app.component('VueDatePicker', VueDatePicker);

app.config.globalProperties.$dayjs = dayjs;

app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      // prefix: 'p',
      darkModeSelector: 'light',
      cssLayer: false,
    },
  },
});

app.use(Toast, {
  position: 'top-right',
  timeout: 8000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: 'button',
  icon: true,
  rtl: false,
});

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(router);
app.use(VueClickAway);

app.mount('#app');
