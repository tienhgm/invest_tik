import { sendGet } from 'apis/axios';
const fundApi = {
  getListFunds(): Promise<any> {
    const url = '/funds';
    return sendGet(url);
  },
};
export default fundApi;
