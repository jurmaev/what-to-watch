import { createReducer } from '@reduxjs/toolkit';
import { changeGenre, fillMovies, filterByGenre } from './action';
import { Genres } from '../const';
import { moviePreviews } from '../mocks/movie-previews';

const initialState = {
  genre: 'all',
  moviePreviews: moviePreviews,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(filterByGenre, (state, action) => {
      if (action.payload === Genres.All) {
        state.moviePreviews = moviePreviews;
      } else {
        state.moviePreviews = moviePreviews.filter(
          (movie) => movie.genre === action.payload
        );
      }
    })
    .addCase(changeGenre, (state, action) => {
      state.genre = action.payload;
    })
    .addCase(fillMovies, (state) => {
      state.moviePreviews = moviePreviews;
    });
});
