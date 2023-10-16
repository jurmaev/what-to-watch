import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { mainData } from './mocks/main';
import { movies } from './mocks/films';
import { playerData } from './mocks/player';
import { reviewData } from './mocks/review';
import { movieData } from './mocks/movie';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App main={mainData} films={movies} player={playerData} review={reviewData} movie={movieData} />
  </React.StrictMode>
);
