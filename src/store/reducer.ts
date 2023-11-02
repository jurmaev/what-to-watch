import { createReducer } from '@reduxjs/toolkit';
import { changeGenre, fillMovies } from './action';
import { Genres } from '../const';
import { moviePreviews } from '../mocks/movie-previews';

const initialState = {
  genre: Genres.All,
  moviePreviews: moviePreviews,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      state.genre = action.payload;
    })
    .addCase(fillMovies, (state) => {
      state.moviePreviews = moviePreviews;
    });
});
