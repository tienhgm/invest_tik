export enum PAGINATION {
  START = 1,
  PAGE_SIZE = 12,
  PAGE_SIZE_MIN = 10,
  PAGE_SIZE_MAX = 1000000,
}
export interface RegisterPayload {
  email: string;
  password: string;
  name: string;
  password_confirmation?: string;
}
export interface LoginPayload {
  email: string;
  password: string;
}
export interface ForgotPasswordPayload {
  email: string;
}
export interface ResetPasswordPayload {
  email: string;
  token: string;
  password: string;
  password_confirmation: string;
}