export * from './settingEnum';
export * from './userEnum';
export const KEY_SIDE_BAR = {
  DASHBOARD: '1',
  INVEST: '2',
  FUNDS: '3',
  INTEREST_TOOL: '4',
  HISTORY_TRANSACTION: '5',
  NOTIFY: '9',
  PROFILE: '10',
  SETTING: '11',
};
export * from './userEnum';
export const KEY_SIDE_BAR_ADMIN = {
  DASHBOARD: '1',
  FUND: '2',
  TRANSACTIONS: '3',
  USER: '4',
  PROFILE: '5'
};
export const STATUS_TRANSACTION = {
  SUCCESS: 1,
  PENDING: 0,
  FAILED: -1
};
export const TRANSACTION_TYPE = {
  DEPOSIT: 0,
  WITHDRAWAL: 1,
};
export const LIST_BANK = [
  {
    label: 'Ngân hàng TMCP Ngoại thương Việt Nam (Vietcombank)',
    value: '970436'
  },
  {
    label: 'Ngân hàng TMCP Kỹ Thương Việt Nam (Techcombank)',
    value: '970407'
  },
  {
    label: 'Ngân hàng TMCP Tiên Phong (Tpbank)',
    value: '970423'
  },

]