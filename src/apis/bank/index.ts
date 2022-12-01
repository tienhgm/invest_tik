import { sendGet } from 'apis/axios';
const bankApi = {
  getInfoUserByBank(payload: any): Promise<any> {
    const { bank_id, account_id } = payload
    const url = `/banks/${bank_id}/${account_id}`;
    return sendGet(url);
  },
  getBankUsed(): Promise<any> {
    const url = `/banks/used`;
    return sendGet(url);
  }
};
export default bankApi;
