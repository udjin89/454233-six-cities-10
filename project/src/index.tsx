import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { offers } from './mocks/offers';
import { ArrayOffers } from './types/types';
import { Provider } from 'react-redux';
import { store } from './store';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

//записываем массив с предложениями в переменную
const offersAppartment: ArrayOffers = offers;

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App offer={offersAppartment} />
    </Provider>

  </React.StrictMode>,
);
