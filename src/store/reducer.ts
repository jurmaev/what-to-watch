import { createReducer } from '@reduxjs/toolkit';
import { Genres } from '../const';
import { movies } from '../mocks/movies';
import { changeGenre, fillMovies, filterByGenre } from './action';

const initialState = {
  genre: Genres.All,
  movies: movies,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(filterByGenre, (state, action) => {
      state.movies.filter((movie) => movie.genre === action.payload);
    })
    .addCase(changeGenre, (state, action) => {
      state.genre = action.payload;
    })
    .addCase(fillMovies, (state) => {
      state.movies = movies;
    });
});
