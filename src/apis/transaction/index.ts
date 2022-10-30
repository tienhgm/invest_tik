import { sendGet } from 'apis/axios';
const transactionApi = {
  getTransaction(): Promise<any> {
    const url = '/transactions';
    return sendGet(url);
  },
  getDetailTransaction(id: string): Promise<any> {
    const url = `/transactions/${id}`;
    return sendGet(url);
  },
};
export default transactionApi;
