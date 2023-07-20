import axios from 'axios';
import { toast } from 'react-toastify';

function handleError(error: any, errorHandler: ((error: any) => void) | undefined) {
  if (errorHandler) {
    errorHandler(error);
  } else {
    console.warn(error);
    console.warn(error?.response?.data);
    toast(error?.response?.data?.message || error?.message || 'Unknown error', { type: 'error' });
    throw new Error(error);
  }
}

export async function get<T>(url: string, config: any = null, errorHandler?: (error: any) => void) {
  try {
    const response = await axios.get(url, config);
    return response.data as T;
  } catch (error: any) {
    handleError(error, errorHandler);
  }
}

export async function post<T, R>(url: string, params: R, config: any = null, errorHandler?: (error: any) => void) {
  try {
    const response = await axios.post(url, params, config);
    return response.data as T;
  } catch (error: any) {
    handleError(error, errorHandler);
  }
}

export async function patch<T, R>(url: string, params: R, config: any = null, errorHandler?: (error: any) => void) {
  try {
    const response = await axios.patch(url, params, config);
    return response.data as T;
  } catch (error: any) {
    handleError(error, errorHandler);
  }
}

export async function put<T, R>(url: string, params: R, config: any = null, errorHandler?: (error: any) => void) {
  try {
    const response = await axios.put(url, params, config);
    return response.data as T;
  } catch (error: any) {
    handleError(error, errorHandler);
  }
}

export async function remove<T>(url: string, config: any = null, errorHandler?: (error: any) => void) {
  try {
    const response = await axios.delete(url, config);
    return response.data as T;
  } catch (error: any) {
    handleError(error, errorHandler);
  }
}

export function rememberToken(token: string) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  localStorage.setItem('token', token);
}

export function getToken() {
  return axios.defaults.headers.common['Authorization'].toString().split(' ')[1];
}

export function removeToken() {
  delete axios.defaults.headers.common['Authorization'];
  localStorage.removeItem('token');
}
