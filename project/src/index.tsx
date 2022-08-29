import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { store } from './store';
import { fetchOffersAction, checkAuthAction } from './store/api-action';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

// Проверяем авторизацию на сервере
store.dispatch(checkAuthAction());
// Запрашиваем список предложений с сервера
store.dispatch(fetchOffersAction());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <ErrorMessage /> */}
      <ToastContainer />
      <App />
    </Provider>

  </React.StrictMode>,
);
