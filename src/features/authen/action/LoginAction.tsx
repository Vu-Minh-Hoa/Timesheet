import { createAsyncThunk } from '@reduxjs/toolkit';
import { ILoginForm } from '../interface/LoginTypes';
import { postLoginInfo, getUserInfo } from '../api/AuthenAPI';

export const loginAction = createAsyncThunk(
  'auth/login', async (data: ILoginForm) => {
    const res = await postLoginInfo(data);
    return res;
  }
);

export const getCurrentUserInfoAction = createAsyncThunk(
  'auth/login/user', async () => {
    const res = await getUserInfo();
    return res;
  }
);
