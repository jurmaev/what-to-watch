import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { mainData } from './mocks/main';
import { Provider } from 'react-redux';
import { store } from './store';
import { checkAuth, fetchMoviePreviews } from './store/api-actions';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

store.dispatch(fetchMoviePreviews());
store.dispatch(checkAuth());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App main={mainData} />
    </Provider>
  </React.StrictMode>
);
