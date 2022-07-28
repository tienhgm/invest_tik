import { LoginPayload } from 'common/index';
import { sendPost } from 'apis/axios';
export const handleRegister = (account: LoginPayload) => sendPost('/register', account);
export const handleLogin = (account: LoginPayload) => sendPost('/login', account);
export const handleLogout = () => sendPost('/logout');
