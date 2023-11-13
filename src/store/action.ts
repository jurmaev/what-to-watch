import { createAction } from '@reduxjs/toolkit';
import {
  AppRoutesValues,
  AuthorizationStatusValues,
  GenresValues,
} from '../const';
import { Movie, MoviePreviews } from '../types/movies';

export const changeGenre = createAction<GenresValues>('genre/change');

export const loadMovies = createAction<MoviePreviews>('movies/load');

export const setDataFetchingStatus = createAction<boolean>(
  'data/fetchingStatus'
);

export const setAuthorizationStatus = createAction<AuthorizationStatusValues>(
  'authorizationStatus/set'
);

export const redirectToRoute = createAction<AppRoutesValues>('redirectToRoute');

export const setMovie = createAction<Movie>('movie/set');
