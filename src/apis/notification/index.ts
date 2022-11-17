import { sendGet, sendPatch } from 'apis/axios';
const notiApi = {
  getNotification(): Promise<any> {
    const url = '/notifications';
    return sendGet(url);
  },
  markAllAsRead(): Promise<any> {
      const url = '/notifications/mark-all-as-read'
      return sendPatch(url)
  },
  markAsRead(id: number): Promise<any> {
      const url = `/notifications/${id}/mark-as-read`;
      return sendPatch(url)
  }
};
export default notiApi;
