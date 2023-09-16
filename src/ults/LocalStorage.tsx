/* eslint-disable @typescript-eslint/explicit-function-return-type */
const ACCESSTOKEN = 'accessToken';

export const setAccessToken = (value: string): void => {
  localStorage.setItem(ACCESSTOKEN, value);
};

export const getAccessToken = localStorage.getItem(ACCESSTOKEN);

export const removeAccessToken = () => {
  localStorage.removeItem(ACCESSTOKEN);
};
