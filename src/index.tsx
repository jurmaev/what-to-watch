import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { AppData } from './const';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App filmName={AppData.filmName} genre={AppData.genre} date={AppData.date} />
  </React.StrictMode>
);
