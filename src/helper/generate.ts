import { GENDER, STATUS_ACCOUNT } from 'enum';

export const getPathKey = (value: any) => {
  switch (value) {
    case 'dashboard':
      return '1';
    case undefined:
      return '1';
    case 'default':
      return '1';
    case 'funds':
      return '2';
    case 'interest-tool':
      return '9';
    case 'profile':
      return '10';
    case 'settings':
      return '11';
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
