import Axios from 'axios';
import authApi from './auth';
// import configs from '../config';
// import { history } from '../index';
const axiosInstance = Axios.create({
  timeout: 3 * 60 * 1000,
  baseURL: '/api'
});
axiosInstance.interceptors.request.use(
  (config) => {
    // @ts-ignore
    // config.headers.Authorization = `Bearer 123`;
    config.headers['Access-Control-Allow-Origin'] = `*`;
    // @ts-ignore
    config.headers['X-CSRF-TOKEN'] = '';

    return config;
  },
  (error) => Promise.reject(error)
);

const logout = async () => {
  await authApi.logout();
  localStorage.setItem('logoutSuccess', 'true');
  window.location.reload();
};
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      logout();
    }
    // else {
    return Promise.reject(error.response);
    // }
    // const refreshToken = JSON.parse(JSON.parse(localStorage.getItem("persist:root")!).auth).refreshToken;
    // if (!refreshToken) {
    //     return logout();
    // }
  }
);
export default axiosInstance;
export const sendGet = (url: string, params?: any) =>
  axiosInstance.get(url, { params }).then((res) => res.data);
export const sendPost = (url: string, params?: any, queryParams?: any) =>
  axiosInstance.post(url, params, { params: queryParams }).then((res) => res.data);
export const sendPut = (url: string, params?: any) =>
  axiosInstance.put(url, params).then((res) => res.data);
export const sendPatch = (url: string, params?: any) =>
  axiosInstance.patch(url, params).then((res) => res.data);
export const sendDelete = (url: string, params?: any) =>
  axiosInstance.delete(url, { data: params }).then((res) => res.data);
export const sendUpload = (url: string, file: any) => {
  let formData = new FormData();
  formData.append('certification', file);
  return axiosInstance.put(url, formData).then((res) => res.data);
};
export const sendUploadAvt = (url: string, file: any) => {
  let formData = new FormData();
  formData.append('image', file);
  return axiosInstance.post(url, formData).then((res) => res.data);
};
// export const sendUploadEkyc = (url: string, file: any) => {
//   let formData = new FormData();
//   formData.append('im', file);
//   return axiosInstance.put(url, formData).then((res) => res.data);
// };
