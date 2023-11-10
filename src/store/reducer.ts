import { createReducer } from '@reduxjs/toolkit';
import {
  changeGenre,
  loadMovies,
  setAuthorizationStatus,
  setDataFetchingStatus,
} from './action';
import {
  AuthorizationStatus,
  AuthorizationStatusValues,
  Genres,
  GenresValues,
} from '../const';
import { MoviePreviews } from '../types/movies';

type InitialState = {
  genre: GenresValues;
  moviePreviews: MoviePreviews;
  isFetchingData: boolean;
  authorizationStatus: AuthorizationStatusValues;
};

const initialState: InitialState = {
  genre: Genres.All,
  moviePreviews: [],
  isFetchingData: false,
  authorizationStatus: AuthorizationStatus.Unknown,
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
    })
    .addCase(setAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    });
});
