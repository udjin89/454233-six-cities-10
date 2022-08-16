import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { store } from './store';
import { fetchOffersAction } from './store/api-action';
import { ErrorMessage } from './components/error/error';
import { checkAuthAction } from './store/api-action';


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
      <ErrorMessage />
      <App />
    </Provider>

  </React.StrictMode>,
);
