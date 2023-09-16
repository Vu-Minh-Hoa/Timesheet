import React from 'react';
import { DashboardLayout } from './layouts/DashboardLayout';
import './App.less';
import PrivateRoute from './navigation/PrivateRoute';
import { Routes, Route } from 'react-router-dom';
import { Login } from './features/authen/Login';
import { ConfigProvider } from 'antd';

const App = (): JSX.Element => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#f44336'
        }
      }}
    >
      <div className="App">
        <Routes>
          <Route
            path='/*'
            element={
              <PrivateRoute>
                <DashboardLayout />
              </PrivateRoute>}
          />
          <Route path='/login' element={<Login />} />
          {/* <Route path="*" element={<Navigate to={'/home'} />} /> */}
        </Routes>
      </div >
    </ConfigProvider>
  );
};
export default App;
