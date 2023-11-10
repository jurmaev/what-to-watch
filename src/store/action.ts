import { createAction } from '@reduxjs/toolkit';
import { AuthorizationStatusValues, GenresValues } from '../const';
import { MoviePreviews } from '../types/movies';
import { AppRoutes } from '../const';

export const changeGenre = createAction<GenresValues>('genre/change');

export const loadMovies = createAction<MoviePreviews>('movies/load');

export const setDataFetchingStatus = createAction<boolean>(
  'data/fetchingStatus'
);

export const setAuthorizationStatus = createAction<AuthorizationStatusValues>(
  'authorizationStatus/set'
);

export const redirectToRoute =
  createAction<keyof typeof AppRoutes>('redirectToRoute');
