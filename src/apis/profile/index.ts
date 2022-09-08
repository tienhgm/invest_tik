import { sendGet, sendUploadAvt } from 'apis/axios';
const profileApi = {
  uploadAvt(file: any): Promise<any> {
    const url = '/me/change-avatar';
    return sendUploadAvt(url, file);
  },
};
export default profileApi;
