import { http } from '@/http/index.js';
// import app from '@/main';
import * as ENDPOINTS from './endpoints';
import { useToast } from 'vue-toastification';
import { resolveRequestError } from '@/utils/requestError';

const toast = useToast();
export default class JobApplicationService {
  static async fetchApplications(params) {
    try {
      const { data } = await http.get(ENDPOINTS.JOB_APPLICATIONS, { params });
      return data;
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
      resolveRequestError(err);

      return;
    }
  }
  static async fetchAJobApplication(id) {
    try {
      const { data } = await http.get(`${ENDPOINTS.JOB_APPLICATIONS}/${id}`);
      return data;
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
      resolveRequestError(err);

      return;
    }
  }

  static async editJobApplication(payload) {
    try {
      const { data } = await http.put(
        `${ENDPOINTS.JOB_APPLICATIONS}/${payload.job_application_id}`,
        payload
      );
      return data;
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
      resolveRequestError(err);

      return;
    }
  }

  static async deleteJobApplication(id) {
    try {
      const { data } = await http.delete(`${ENDPOINTS.JOB_APPLICATIONS}/${id}`);
      return data;
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
      resolveRequestError(err);

      return;
    }
  }

  static async fetchJobProfileById(id) {
    try {
      const { data } = await http.get(ENDPOINTS.JOB_PROFILES + `/${id}`);
      return data.payload;
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
      resolveRequestError(err);

      return;
    }
  }

  static async createApplication(payload) {
    try {
      const { data } = await http.post(ENDPOINTS.JOB_APPLICATIONS, payload);
      return data;
    } catch (err) {
      toast.error(err.response.data.message);
      resolveRequestError(err);

      return;
    }
  }
}
