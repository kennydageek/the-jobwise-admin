import { http } from '@/http/index.js';
// import app from '@/main';
import * as ENDPOINTS from './endpoints';
import { useToast } from 'vue-toastification';
import { resolveRequestError } from '@/utils/requestError';

const toast = useToast();
export default class SubscriptionService {
  static async fetchSubscriptions(params) {
    try {
      const { data } = await http.get(ENDPOINTS.GET_SUBSCRIPTIONS, { params });
      return data;
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
      resolveRequestError(err);

      return;
    }
  }

  static async fetchASubscription(id) {
    try {
      const { data } = await http.get(`${ENDPOINTS.GET_SUBSCRIPTIONS}/${id}`);
      return data;
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
      resolveRequestError(err);

      return;
    }
  }
}
