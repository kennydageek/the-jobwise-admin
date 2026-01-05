import { http } from '@/http/index.js';
// import app from '@/main';
import * as ENDPOINTS from './endpoints';
import { useToast } from 'vue-toastification';
import { resolveRequestError } from '@/utils/requestError';

const toast = useToast();
export default class DashboardService {
  static async fetchDashboardStats() {
    try {
      const { data } = await http.get(ENDPOINTS.GET_DASHBOARD_STATS);
      return data;
    } catch (err) {
      console.log(err);
      resolveRequestError(err);
      toast.error(err.response.data.message);
      return;
    }
  }
}
