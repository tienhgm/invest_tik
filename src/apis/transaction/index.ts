import { sendGet } from 'apis/axios';
const transactionApi = {
  getTransaction(): Promise<any> {
    const url = '/transactions';
    return sendGet(url);
  },
};
export default transactionApi;
