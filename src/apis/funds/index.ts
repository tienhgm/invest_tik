import { sendGet } from 'apis/axios';
const fundApi = {
  getListFunds(): Promise<any> {
    const url = '/funds';
    return sendGet(url);
  },
  getDetailFundById(id: number): Promise<any> {
    const url = '/funds/' + id;
    return sendGet(url);
  },
  getDetailFundHistoryById(id: number, month: string = "12"): Promise<any> {
    const url = `/funds/history/${id}?month=${month}`;
    return sendGet(url);
  },
};
export default fundApi;
