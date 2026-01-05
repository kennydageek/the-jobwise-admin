import axios from 'axios';
import router from './router';

export const http = axios.create({
  baseURL: import.meta.env.VITE_VUE_APP_API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add an interceptor to set the token in the request headers
http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// export const RouterPlugin = {
//   install(Vue) {
//     Vue.prototype.globalRouter = async function (route, params, query) {
//       await router
//         .push({ name: route, params: params, query: query })
//         .catch(() => {});
//     };
//   },
// };

export { router };
