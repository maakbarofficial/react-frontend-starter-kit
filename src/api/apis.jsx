// prettier-ignore
import axiosClient from './axiosClient';

// Global APIs
export const ServerHealthCheck = async () => (await axiosClient.get('/health')).data;

// Login APIs
export const LoginUser = async (data) => (await axiosClient.post('/auth/login', data)).data;
export const RefreshToken = async () => (await axiosClient.get('/auth/refresh-token')).data;