import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { offers } from './mocks/offers';
import { ArrayOffers } from './types/types';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

//записываем массив с предложениями в переменную
const offersAppartment: ArrayOffers = offers;

root.render(
  <React.StrictMode>
    <App offer={offersAppartment} />
  </React.StrictMode>,
);
