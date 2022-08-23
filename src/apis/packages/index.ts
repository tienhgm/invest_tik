import { sendGet } from 'apis/axios';
const packageApi = {
  getListPackages(): Promise<any> {
    const url = '/api/funds';
    return sendGet(url);
  },
};
export default packageApi;
