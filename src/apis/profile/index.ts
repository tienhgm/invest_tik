import { sendUploadAvt, sendPut } from 'apis/axios';
const profileApi = {
  uploadAvt(file: any): Promise<any> {
    const url = '/me/change-avatar';
    return sendUploadAvt(url, file);
  },
  updateProfile(payload: any): Promise<any> {
    const url = '/api/auth/user/profile-information';
    return sendPut(url, payload);
  },
};
export default profileApi;
