import { sendDelete, sendGet, sendPost, sendPut } from 'apis/axios';
const adminApi = {
  getListUsers(payload: any): Promise<any> {
    const url = `/admin/users`;
    return sendGet(url, payload);
  },
  getDetailUser(id: any): Promise<any> {
    const url = `/admin/users/${id}`;
    return sendGet(url);
  },
  deleteUser(id: any) : Promise<any> {
    const url =  `/admin/users/${id}`;
    return sendDelete(url);
  },
  deleteUsers(payload: any) : Promise<any> {
    const url =  `/admin/users`;
    return sendDelete(url, payload);
  },
  updateUser(id: any, field: any) : Promise<any> {
    const url =  `/admin/users/${id}`;
    return sendPut(url, field);
  },
  sendActiveMail(id: any) : Promise<any> {
    const url =  `/admin/users/${id}/send-verify-email`;
    return sendPost(url);
  },
  createUser(payload: any): Promise<any> {
    const url = 'admin/users';
    return sendPost(url, payload);
  }
};
export default adminApi;
