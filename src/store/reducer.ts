import { createReducer } from '@reduxjs/toolkit';
import {
  changeGenre,
  loadMovies,
  setAuthorizationStatus,
  setDataFetchingStatus,
  setMovie,
  setReviews,
  setSimilarMovies,
} from './action';
import {
  AuthorizationStatus,
  AuthorizationStatusValues,
  Genres,
  GenresValues,
} from '../const';
import { Movie, MoviePreviews } from '../types/movies';
import { Reviews } from '../types/reviews';

type InitialState = {
  genre: GenresValues;
  moviePreviews: MoviePreviews;
  isFetchingData: boolean;
  authorizationStatus: AuthorizationStatusValues;
  movie: Movie | null;
  reviews: Reviews;
  similarMovies: MoviePreviews;
};

const initialState: InitialState = {
  genre: Genres.All,
  moviePreviews: [],
  isFetchingData: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  movie: null,
  reviews: [],
  similarMovies: [],
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
    })
    .addCase(setMovie, (state, action) => {
      state.movie = action.payload;
    })
    .addCase(setReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(setSimilarMovies, (state, action) => {
      state.similarMovies = action.payload;
    });
});
