import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../redux/Hook';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const auth: string | null = useAppSelector((state) => state.loginSlice.accessToken);
  return (
    (auth != null) ? children : <Navigate to='/login' />
  );
};

export default PrivateRoute;
