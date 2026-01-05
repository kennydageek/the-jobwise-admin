import { http } from '@/http/index.js';
// import app from '@/main';
import * as ENDPOINTS from './endpoints';
import { useToast } from 'vue-toastification';

const toast = useToast();
export default class PaymentService {
  static async fetchPayments(params) {
    try {
      const { data } = await http.get(ENDPOINTS.PAYMENTS, { params });
      return data;
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
      resolveRequestError(err);

      return;
    }
  }

  static async fetchAPayment(id, params) {
    try {
      const { data } = await http.get(`${ENDPOINTS.PAYMENTS}/${id}`, {
        params,
      });
      return data;
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
      resolveRequestError(err);

      return;
    }
  }
}
