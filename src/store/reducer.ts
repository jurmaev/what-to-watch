import { createReducer } from '@reduxjs/toolkit';
import { Genres } from '../const';
import { movies } from '../mocks/movies';

const initialState = {
  genre: Genres.All,
  movies: movies,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(filterByGenre, (state, action) => {
    state.movies.filter((movie) => movie.genre === action.payload);
  });
});
