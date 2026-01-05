import { http } from '@/http/index.js';
// import app from '@/main';
import * as ENDPOINTS from './endpoints';
import { useToast } from 'vue-toastification';
import { resolveRequestError } from '@/utils/requestError';

export default class FileUploadService {
  static async upload(payload) {
    try {
      const { data } = await http.post(
        ENDPOINTS.FILE_UPLOAD,
        payload,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return data.payload;
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
      resolveRequestError(err);

      return;
    }
  }
}