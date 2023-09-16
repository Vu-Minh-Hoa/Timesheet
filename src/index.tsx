import './index.less';
import 'react-toastify/dist/ReactToastify.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ToastContainer } from 'react-toastify';
import reportWebVitals from './reportWebVitals';
import { store } from './redux/Store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <React.StrictMode>
        <App />
        <ToastContainer
          position='top-right'
        />
      </React.StrictMode>
    </Provider>
  </BrowserRouter >
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
