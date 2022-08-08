import { LoginPayload, RegisterPayload } from 'common/index';
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
  register(account: RegisterPayload): Promise<any> {
    const url = '/register';
    return sendPost(url, account);
  },
  login(account: LoginPayload): Promise<any> {
    const url = '/login';
    return sendPost(url, account);
  },
  logout(): Promise<any> {
    const url = '/logout';
    return sendPost(url);
  },
};
export default authApi;
