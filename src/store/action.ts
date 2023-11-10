import { createAction } from '@reduxjs/toolkit';
import { AuthorizationStatusValues, GenresValues } from '../const';
import { MoviePreviews } from '../types/movies';

export const changeGenre = createAction<GenresValues>('genre/change');

export const loadMovies = createAction<MoviePreviews>('movies/load');

export const setDataFetchingStatus = createAction<boolean>(
  'data/fetchingStatus'
);

export const setAuthorizationStatus = createAction<AuthorizationStatusValues>(
  'authorizationStatus/set'
);
