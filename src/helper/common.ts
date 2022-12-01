import dayjs from 'dayjs';
export default function getIsLoggedIn() {
  return JSON.parse(JSON.parse(localStorage.getItem('persist:root')!).auth.isLoggedIn);
}
export const formatDateTime = (value: any) => {
  if (!value) return '';
  return dayjs(value).format('DD-MM-YYYY');
};
export const formatCurrency = (value: any) => {
  if (!value) return 0;
  return String(value.toFixed(2)).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
