import {
  ForgotPasswordPayload,
  LoginPayload,
  RegisterPayload,
  ResetPasswordPayload,
} from 'model/index';
import { sendPost, sendGet } from 'apis/axios';
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
    const url = '/register';
    return sendPost(url, payload);
  },
  login(payload: LoginPayload): Promise<any> {
    const url = '/login';
    return sendPost(url, payload);
  },
  forgotPassword(email: ForgotPasswordPayload): Promise<any> {
    const url = '/forgot-password';
    return sendPost(url, email);
  },
  resetPassword(payload: ResetPasswordPayload): Promise<any> {
    const url = '/reset-password';
    return sendPost(url, payload);
  },
  logout(): Promise<any> {
    const url = '/logout';
    return sendPost(url);
  },
};
export default authApi;
