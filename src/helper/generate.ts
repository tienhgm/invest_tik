import { KEY_SIDE_BAR } from './../enum/index';
import { GENDER, STATUS_ACCOUNT } from 'enum';

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
      return 'ACTIVE';
    case STATUS_ACCOUNT.INACTIVE:
      return 'IN ACTIVE';
    default:
      return '';
  }
};
export const getNameGender = (gender: any) => {
  switch (gender) {
    case GENDER.MALE:
      return 'Male';
    case GENDER.FEMALE:
      return 'Female';
    case GENDER.OTHER:
      return 'Other';
    default:
      return '';
  }
};
