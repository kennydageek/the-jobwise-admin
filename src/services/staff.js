import { http } from '@/http/index.js';
// import app from '@/main';
import * as ENDPOINTS from './endpoints';
import { useToast } from 'vue-toastification';

const toast = useToast();
export default class StaffService {
  static async fetchAdmins(params) {
    try {
      const { data } = await http.get(ENDPOINTS.GET_ALL_ADMINS, { params });
      return data;
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
      resolveRequestError(err);

      return;
    }
  }

  static async createAdmin(payload) {
    try {
      const { data } = await http.post(ENDPOINTS.CREATE_ADMIN, payload);
      return data;
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
      resolveRequestError(err);

      return;
    }
  }

  static async fetchAdminRoles(params) {
    try {
      const { data } = await http.get(ENDPOINTS.GET_ADMIN_ROLES, { params });
      return data;
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
      resolveRequestError(err);

      return;
    }
  }

  static async createAdminRole(payload) {
    try {
      const { data } = await http.post(ENDPOINTS.CREATE_ADMIN_ROLE, payload);
      return data;
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
      resolveRequestError(err);

      return;
    }
  }

  static async updateAdminStatus(payload) {
    try {
      const { data } = await http.patch(ENDPOINTS.UPDATE_ADMIN_STATUS, payload);
      return data;
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
      resolveRequestError(err);

      return;
    }
  }
}
