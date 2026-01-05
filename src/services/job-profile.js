import { http } from '@/http/index.js';

import * as ENDPOINTS from './endpoints';
import { useToast } from 'vue-toastification';
import { resolveRequestError } from '@/utils/requestError';

const toast = useToast();
export default class JobProfileService {
  static async createProfile(payload) {
    try {
      const { data } = await http.post(ENDPOINTS.JOB_PROFILES_USER, payload);
      return data;
    } catch (err) {
      console.log(err);
      toast.error(JSON.stringify(err.response.data.message));
      resolveRequestError(err);
      return;
    }
  }

  static async editProfile(payload) {
    try {
      const { data } = await http.put(ENDPOINTS.JOB_PROFILES_USER, payload);
      return data;
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
      resolveRequestError(err);
      return;
    }
  }

  static async fetchProfiles(params) {
    try {
      const { data } = await http.get(ENDPOINTS.JOB_PROFILES, { params });
      return data;
    } catch (err) {
      console.log(err);
      resolveRequestError(err);
      toast.error(err.response.data.message);
      return;
    }
  }

  static async fetchOneProfile(id) {
    try {
      const { data } = await http.get(`${ENDPOINTS.JOB_PROFILES}/${id}`);
      return data;
    } catch (err) {
      console.log(err);
      resolveRequestError(err);
      toast.error(err.response.data.message);

      return;
    }
  }
}
