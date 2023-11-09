import { createReducer } from '@reduxjs/toolkit';
import { changeGenre, loadMovies, setDataFetchingStatus } from './action';
import { Genres, GenresValues } from '../const';
import { MoviePreviews } from '../types/movies';

type InitialState = {
  genre: GenresValues;
  moviePreviews: MoviePreviews;
  isFetchingData: boolean;
};

const initialState: InitialState = {
  genre: Genres.All,
  moviePreviews: [],
  isFetchingData: false,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      state.genre = action.payload;
    })
    .addCase(loadMovies, (state, action) => {
      state.moviePreviews = action.payload;
    })
    .addCase(setDataFetchingStatus, (state, action) => {
      state.isFetchingData = action.payload;
    });
});
