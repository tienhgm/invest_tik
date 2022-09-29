import {
  ForgotPasswordPayload,
  LoginPayload,
  RegisterPayload,
  ResetPasswordPayload,
  VerifyPayload,
} from 'model/index';
import { sendPost, sendGet, sendDelete } from 'apis/axios';
// export const handleGetCsrfToken = () => sendGet('/csrf-cookie');
// export const handleRegister = (account: LoginPayload) => sendPost('/register', account);
// export const handleLogin = (account: LoginPayload) => sendPost('/login', account);
// export const handleLogout = () => sendPost('/logout');

const authApi = {
  getCsrfToken(): Promise<any> {
    const url = '/csrf-cookie';
    return sendGet(url);
  },
  register(payload: RegisterPayload): Promise<any> {
    const url = '/auth/register';
    return sendPost(url, payload);
  },
  sendEmailVerify(): Promise<any> {
    const url = '/auth/email/verification-notification';
    return sendPost(url);
  },
  verifyEmailAfterRegister(payload: VerifyPayload): Promise<any> {
    const { id, hash, expires, signature } = payload;
    const url = `/auth/email/verify/${id}/${hash}?expires=${expires}&signature=${signature}`;
    return sendGet(url);
  },
  login(payload: LoginPayload): Promise<any> {
    const url = '/auth/login';
    return sendPost(url, payload);
  },
  forgotPassword(email: ForgotPasswordPayload): Promise<any> {
    const url = '/auth/forgot-password';
    return sendPost(url, email);
  },
  resetPassword(payload: ResetPasswordPayload): Promise<any> {
    const url = '/auth/reset-password';
    return sendPost(url, payload);
  },
  logout(): Promise<any> {
    const url = '/auth/logout';
    return sendPost(url);
  },
  getMe(): Promise<any> {
    const url = '/me';
    return sendGet(url);
  },
  confirmPassword(payload: any): Promise<any> {
    const url = '/auth/user/confirm-password';
    return sendPost(url, payload);
  },
  settingTwoFactor(): Promise<any> {
    const url = '/auth/user/two-factor-authentication';
    return sendPost(url);
  },
  getTwoFactorQrCode(): Promise<any> {
    const url = '/auth/user/two-factor-qr-code';
    return sendGet(url);
  },
  confirmToTurnOnTwoFa(code: string): Promise<any> {
    const url = '/auth/user/confirmed-two-factor-authentication';
    return sendPost(url, { code });
  },
  confirmToTwoFaLogin(code: string): Promise<any> {
    const url = '/auth/two-factor-challenge';
    return sendPost(url, { code });
  },
  getSettings(): Promise<any> {
    const url = '/me/settings';
    return sendGet(url);
  },
  removeTwoFa(): Promise<any> {
    const url = '/auth/user/two-factor-authentication';
    return sendDelete(url);
  },
};
export default authApi;
