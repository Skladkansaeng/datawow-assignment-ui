import axios from 'axios';
// config
import { HOST_API_KEY } from '../config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: HOST_API_KEY });

axiosInstance.interceptors.response.use(
    (response: any) => response,
    (error: any) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

axiosInstance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('authToken');
    config.headers.Authorization =  token ? `Bearer ${token}` : '';
    return config;
  });

export default axiosInstance;
