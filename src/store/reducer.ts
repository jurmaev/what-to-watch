import { createReducer } from '@reduxjs/toolkit';
import { movies } from '../mocks/movies';
import { changeGenre, fillMovies, filterByGenre } from './action';
import { Genres } from '../const';

const initialState = {
  genre: 'all',
  movies: movies,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(filterByGenre, (state, action) => {
      if (action.payload === Genres.All) {
        state.movies = movies;
      } else {
        state.movies = movies.filter((movie) => movie.genre === action.payload);
      }
    })
    .addCase(changeGenre, (state, action) => {
      state.genre = action.payload;
    })
    .addCase(fillMovies, (state) => {
      state.movies = movies;
    });
});
