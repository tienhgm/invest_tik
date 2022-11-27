import { sendDelete, sendGet, sendPost, sendPut } from 'apis/axios';
const adminApi = {
  getListUsers(payload: any): Promise<any> {
    const url = `/admin/users`;
    return sendGet(url, payload);
  },
  getListFunds(payload: any): Promise<any> {
    const url = `/admin/funds`;
    return sendGet(url, payload);
  },
  getDetailFund(id: any): Promise<any> {
    const url = `/admin/funds/${id}`;
    return sendGet(url);
  },
  getDetailUser(id: any): Promise<any> {
    const url = `/admin/users/${id}`;
    return sendGet(url);
  },
  deleteUser(id: any): Promise<any> {
    const url = `/admin/users/${id}`;
    return sendDelete(url);
  },
  deleteFund(id: any): Promise<any> {
    const url = `/admin/funds/${id}`;
    return sendDelete(url);
  },
  deleteUsers(payload: any): Promise<any> {
    const url = `/admin/users`;
    return sendDelete(url, payload);
  },
  updateUser(id: any, field: any): Promise<any> {
    const url = `/admin/users/${id}`;
    return sendPut(url, field);
  },
  sendActiveMail(id: any): Promise<any> {
    const url = `/admin/users/${id}/send-verify-email`;
    return sendPost(url);
  },
  createUser(payload: any): Promise<any> {
    const url = 'admin/users';
    return sendPost(url, payload);
  },
  getListNotify(id: any, payload: any): Promise<any> {
    const url = `/admin/users/${id}/notifications`;
    return sendGet(url, payload)
  },
  createNotify(id: any, payload: any): Promise<any> {
    const url = `/admin/users/${id}/send-notification`;
    return sendPost(url, payload)
  },
  getListTransaction(payload: any): Promise<any> {
    const url = `/admin/users/transactions`;
    return sendGet(url, payload)
  },
  getListTransactionFunds(payload: any): Promise<any> {
    const url = `/admin/funds/transactions`;
    return sendGet(url, payload)
  },
  getListPackages(payload: any): Promise<any> {
    const url = `/admin/packages`;
    return sendGet(url, payload)
  },
};
export default adminApi;
