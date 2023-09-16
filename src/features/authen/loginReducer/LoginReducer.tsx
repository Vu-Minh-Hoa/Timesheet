/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { createSlice } from '@reduxjs/toolkit';
import { IAuthen, IUserInformation } from '../interface/LoginTypes';
import { loginAction, getCurrentUserInfoAction } from '../action/LoginAction';
import { getAccessToken, setAccessToken } from '../../../ults/LocalStorage';

const initialState: IAuthen = {
  accessToken: getAccessToken,
  userInfo: {} as IUserInformation,
  isError: false,
  isLoading: false
};

const loginSlice = createSlice({
  name: 'auth/login',
  initialState,
  reducers: {
    logout: (state) => {
      state.accessToken = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginAction.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.accessToken = action.payload.accessToken;
        setAccessToken(state.accessToken as string);
      })
      .addCase(getCurrentUserInfoAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCurrentUserInfoAction.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
      })
      .addCase(getCurrentUserInfoAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInfo = action.payload;
      });
  }
});

export const { logout } = loginSlice.actions;

export default loginSlice.reducer;
