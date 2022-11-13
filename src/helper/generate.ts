import { KEY_SIDE_BAR } from './../enum/index';
import { STATUS_ACCOUNT } from 'enum';
import dayjs from 'dayjs';
var customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);
export const getPathKey = (value: any) => {
  switch (value) {
    case 'dashboard':
      return KEY_SIDE_BAR.DASHBOARD;
    case undefined:
      return KEY_SIDE_BAR.DASHBOARD;
    case 'default':
      return KEY_SIDE_BAR.DASHBOARD;
    case 'invest':
      return KEY_SIDE_BAR.INVEST;
    case 'funds':
      return KEY_SIDE_BAR.FUNDS;
    case 'interest-tool':
      return KEY_SIDE_BAR.INTEREST_TOOL;
    case 'transactions':
      return KEY_SIDE_BAR.HISTORY_TRANSACTION;
    case 'profile':
      return KEY_SIDE_BAR.PROFILE;
    case 'settings':
      return KEY_SIDE_BAR.SETTING;
  }
};

export const getColorStatusAccount = (status: any) => {
  switch (status) {
    case STATUS_ACCOUNT.ACTIVE:
      return '#87d068';
    case STATUS_ACCOUNT.INACTIVE:
      return '#f50';
    default:
      return '';
  }
};
export const getNameStatusAccount = (status: any) => {
  switch (status) {
    case STATUS_ACCOUNT.ACTIVE:
      return 'ĐÃ KÍCH HOẠT';
    case STATUS_ACCOUNT.INACTIVE:
      return 'CHƯA KÍCH HOẠT';
    default:
      return '';
  }
};
export const removeString = (str: string, removeStr: string) => {
  return str.replace(removeStr, '');
};
export const formatDateVN = (date: any) => {
  return dayjs(date, 'DD/MM/YYYY').format('DD-MM-YYYY');
};
export const formatDate = (date: any) => {
  return dayjs(date).format('DD-MM-YYYY');
};
