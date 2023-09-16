/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { axiosInstance } from '../../../axios/axios';
import { toast } from 'react-toastify';
import { ILoginForm } from '../interface/LoginTypes';

export const postLoginInfo = async ({ username, password, isRemember }: ILoginForm) => {
  try {
    const res = await axiosInstance.post('/api/TokenAuth/Authenticate', {
      userNameOrEmailAddress: username,
      password,
      rememberClient: isRemember
    });
    return res.data.result;
  } catch (err) {
    toast.error('Incorrect username or password');
  }
};

export const getUserInfo = async () => {
  try {
    const res = await axiosInstance.get('/api/services/app/Session/GetCurrentLoginInformations');
    return res.data.result.user;
  } catch (err) {
    throw new Error(String(err));
  }
};
