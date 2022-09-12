import { sendPost } from './../axios';
import { sendGet, sendUploadAvt } from 'apis/axios';
const profileApi = {
  uploadAvt(file: any): Promise<any> {
    const url = '/me/change-avatar';
    return sendUploadAvt(url, file);
  },
  updateProfile(payload: any): Promise<any> {
    const url = '/api/user/profile-information';
    return sendPost(url, payload);
  },
};
export default profileApi;
