import { sendGet, sendPost } from 'apis/axios';
const packageApi = {
  getListPackageDefault(): Promise<any> {
    const url = '/packages/default';
    return sendGet(url);
  },
  getDetailPackageById(id: string): Promise<any> {
    const url = '/packages/' + id;
    return sendGet(url);
  },
  getDetailFundHistoryById(id: number, month: string = '12'): Promise<any> {
    const url = `/funds/history/${id}?month=${month}`;
    return sendGet(url);
  },
  getListCustomizePackage(): Promise<any> {
    const url = '/packages/customization';
    return sendGet(url);
  },
  createPackage(payload: any): Promise<any> {
    const url = `/packages/create`;
    return sendPost(url, payload);
  },
};
export default packageApi;
