import { http } from '@/http/index.js';
// import app from '@/main';
import * as ENDPOINTS from './endpoints';
import { useToast } from 'vue-toastification';
import { resolveRequestError } from '@/utils/requestError';

const toast = useToast();
export default class UserService {
  static async fetchProfile() {
    try {
      const { data } = await http.get(ENDPOINTS.GET_PROFILE);
      return data;
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
      resolveRequestError(err);

      return;
    }
  }

  static async fetchUsers(params) {
    try {
      const { data } = await http.get(ENDPOINTS.GET_USERS, { params });
      return data;
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
      resolveRequestError(err);

      return;
    }
  }

  static async fetchAUser(id) {
    try {
      const { data } = await http.get(`${ENDPOINTS.GET_USERS}/${id}`);
      return data;
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
      resolveRequestError(err);

      return;
    }
  }

  static async exportUsers() {
    try {
      const { data } = await http.get(ENDPOINTS.EXPORT_USERS);
      return data;
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
      resolveRequestError(err);

      return;
    }
  }
}
