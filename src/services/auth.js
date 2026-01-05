import { http } from '@/http/index.js';
// import app from '@/main';
import * as ENDPOINTS from './endpoints';
import { useToast } from 'vue-toastification';
import { resolveRequestError } from '@/utils/requestError';

const toast = useToast();
export default class AuthService {
  // Login user
  static async login(payload) {
    try {
      const { data } = await http.post(ENDPOINTS.LOGIN, payload);
      return data;
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);

      const statuscode = err.response.data.statusCode;
      if (statuscode === 412 || statuscode === 400) {
        return err;
      }
      return;
    }
  }

  static authenticateUser(tokens) {
    http.defaults.headers.common['Authorization'] = `Bearer ${tokens.access}`;
    localStorage.setItem('authToken', tokens.access);
    // localStorage.setItem('refreshToken', tokens.refresh);
  }

  // static async register(payload) {
  //   try {
  //     const { data } = await http.post(ENDPOINTS.REGISTER, payload);
  //     return data;
  //   } catch (err) {
  //     console.log(err);
  //     toast.error(err.response.data.message);
  //     return;
  //   }
  // }

  static async verifyEmail(payload) {
    try {
      const { data } = await http.post(ENDPOINTS.VERIFY_EMAIL, payload);
      return data;
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
      return;
    }
  }

  static async resendEmailVerification(payload) {
    try {
      const { data } = await http.patch(
        ENDPOINTS.RESEND_VERIFICATION_CODE,
        payload
      );
      return data;
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
      return;
    }
  }

  static async forgotPassword(payload) {
    try {
      const { data } = await http.post(ENDPOINTS.FORGOT_PASSWORD, payload);
      return data;
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
      return;
    }
  }

  static async resetPassword(payload) {
    try {
      const { data } = await http.post(ENDPOINTS.RESET_PASSWORD, payload);
      return data;
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
      return;
    }
  }
}
