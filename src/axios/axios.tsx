/* eslint-disable @typescript-eslint/restrict-template-expressions */
import axios from 'axios';
import { getAccessToken } from '../ults/LocalStorage';

export const axiosInstance = axios.create({
  baseURL: 'http://training-api-timesheet.nccsoft.vn/',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
});

axiosInstance.interceptors.request.use((request) => {
  const accessToken: string | null = getAccessToken;
  const accessHeader = `Bearer ${accessToken}`;
  if (request.headers != null) {
    request.headers.Authorization = accessHeader;
  }
  return request;
});
