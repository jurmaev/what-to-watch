import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { mainData } from './mocks/main';
import { movies } from './mocks/movies';
import { Provider } from 'react-redux';
import { store } from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App main={mainData} movies={movies} />
    </Provider>
  </React.StrictMode>
);
