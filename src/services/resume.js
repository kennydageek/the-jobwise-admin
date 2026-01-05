import { http } from '@/http/index.js';
// import app from '@/main';
import * as ENDPOINTS from './endpoints';
import { useToast } from 'vue-toastification';
import { resolveRequestError } from '@/utils/requestError';

const toast = useToast();
export default class ResumeService {
  static async createResumes(payload) {
    try {
      const { data } = await http.post(
        `${ENDPOINTS.RESUMES}/${payload.user_id}/resume`,
        payload
      );
      return data;
    } catch (err) {
      console.log(err);
      // resolveRequestError(err);

      toast.error(err.response.data.message);
      return err;
    }
  }

  static async fetchResumes(id) {
    try {
      const { data } = await http.get(`${ENDPOINTS.RESUMES}/${id}/resume`);
      return data;
    } catch (err) {
      console.log(err);
      resolveRequestError(err);

      toast.error(err.response.data.message);
      return;
    }
  }

  static async deleteResume(id) {
    try {
      const { data } = await http.delete(`${ENDPOINTS.RESUMES}/${id}`);
      return data;
    } catch (err) {
      console.log(err);
      resolveRequestError(err);

      toast.error(err.response.data.message);
      return;
    }
  }
}
