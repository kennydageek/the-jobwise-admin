import { http } from '@/http/index.js';
// import app from '@/main';
import * as ENDPOINTS from './endpoints';
import { useToast } from 'vue-toastification';
import { resolveRequestError } from '@/utils/requestError';

const toast = useToast();
export default class SettingService {
  static async updatePassword(payload) {
    try {
      const { data } = await http.patch(ENDPOINTS.UPDATE_PASSWORD, payload);
      return data;
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
      resolveRequestError(err);
      return;
    }
  }

  static async createBanner(payload) {
    try {
      const { data } = await http.post(ENDPOINTS.CREATE_BANNER, payload);
      return data;
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
      resolveRequestError(err);

      return;
    }
  }

  static async createNotifications(payload) {
    try {
      const { data } = await http.post(ENDPOINTS.NOTIFICATIONS, payload);
      return data;
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
      resolveRequestError(err);

      return;
    }
  }
}
