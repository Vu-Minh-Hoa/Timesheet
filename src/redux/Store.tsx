import { configureStore } from '@reduxjs/toolkit';
import loginSlice from '../features/authen/loginReducer/LoginReducer';
import projectReducer from '../features/projects/projectReducer/ProjectReducer';
// import { projectManagamentSlice } from '../features/projects/projectReducer/ProjectReducer';

export const store = configureStore({
  reducer: { loginSlice, projectReducer }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
