export enum PAGINATION {
  START = 1,
  PAGE_SIZE = 12,
  PAGE_SIZE_MIN = 10,
  PAGE_SIZE_MAX = 1000000,
}
export interface LoginPayload {
  email: string;
  password: string;
  re_password?: string;
}