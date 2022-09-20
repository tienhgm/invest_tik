import { sendGet } from 'apis/axios';
const packageApi = {
  getListPackageDefault(): Promise<any> {
    const url = '/packages/default';
    return sendGet(url);
  },
  getDetailPackageById(id: string): Promise<any> {
    const url = '/packages/' + id;
    return sendGet(url);
  },
  getDetailFundHistoryById(id: number, month: string = "12"): Promise<any> {
    const url = `/funds/history/${id}?month=${month}`;
    return sendGet(url);
  },
};
export default packageApi;
