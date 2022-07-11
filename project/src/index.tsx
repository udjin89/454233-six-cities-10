import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

// let COUNT: number;
// COUNT = 5;
// COUNT = 4;

root.render(
  <React.StrictMode>
    <App counter={1} />
  </React.StrictMode>,
);
