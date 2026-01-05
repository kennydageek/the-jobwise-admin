import { http } from '@/http/index.js';
// import app from '@/main';
import * as ENDPOINTS from './endpoints';
import { useToast } from 'vue-toastification';

const toast = useToast();
export default class PromotionService {
  static async fetchCouponCodes(params) {
    try {
      const { data } = await http.get(ENDPOINTS.COUPONS, { params });
      return data;
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
      resolveRequestError(err);
      return;
    }
  }

  static async createCouponCode(payload) {
    try {
      const { data } = await http.post(ENDPOINTS.CREATE_COUPON, payload);
      return data;
    } catch (err) {
      const error = err.response.data.error;
      if (error) {
        console.log(error);
        for (const key in error) {
          toast.error(error[key]);
        }
      } else {
        toast.error(err.response.data.message ?? 'Something went wrong');
      }

      resolveRequestError(err);
      return;
      // toast.error(err.response.data.message);
      // return;
    }
  }

  static async createPromotionCode(payload) {
    try {
      const { data } = await http.post(ENDPOINTS.PROMOTION, payload);
      return data;
    } catch (err) {
      const error = err.response.data.error;
      if (error) {
        console.log(error);
        for (const key in error) {
          toast.error(error[key]);
        }
      } else {
        toast.error(err.response.data.message ?? 'Something went wrong');
      }

      return;
    }
  }

  static async activatePromotion(id) {
    try {
      const { data } = await http.patch(
        `${ENDPOINTS.PROMOTION}/${id}/activate`
      );
      return data;
    } catch (err) {
      const error = err.response.data.error;
      if (error) {
        console.log(error);
        for (const key in error) {
          toast.error(error[key]);
        }
      } else {
        toast.error(err.response.data.message ?? 'Something went wrong');
      }

      return;
    }
  }

  static async deactivatePromotion(id) {
    try {
      const { data } = await http.patch(
        `${ENDPOINTS.PROMOTION}/${id}/deactivate`
      );
      return data;
    } catch (err) {
      const error = err.response.data.error;
      if (error) {
        console.log(error);
        for (const key in error) {
          toast.error(error[key]);
        }
      } else {
        toast.error(err.response.data.message ?? 'Something went wrong');
      }

      return;
    }
  }

  static async deletePromotion(id) {
    try {
      const { data } = await http.delete(`${ENDPOINTS.PROMOTION}/${id}`);
      return data;
    } catch (err) {
      const error = err.response.data.error;
      if (error) {
        console.log(error);
        for (const key in error) {
          toast.error(error[key]);
        }
      } else {
        toast.error(err.response.data.message ?? 'Something went wrong');
      }

      return;
    }
  }

  static async fetchPromotions(params) {
    try {
      const { data } = await http.get(ENDPOINTS.PROMOTION, { params });
      return data;
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
      resolveRequestError(err);
      return;
    }
  }

  static async fetchPromotionsById(id) {
    try {
      const { data } = await http.get(`${ENDPOINTS.PROMOTION}/${id}`);
      return data;
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
      resolveRequestError(err);
      return;
    }
  }
}
