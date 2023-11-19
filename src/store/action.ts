import { createAction } from '@reduxjs/toolkit';
import {
  AppRoutesValues,
  AuthorizationStatusValues,
  GenresValues,
} from '../const';
import { Movie, MoviePreviews, PromoMovie } from '../types/movies';
import { Reviews } from '../types/reviews';

export const changeGenre = createAction<GenresValues>('genre/change');

export const loadMovies = createAction<MoviePreviews>('movies/load');

export const setSimilarMovies =
  createAction<MoviePreviews>('movies/getSimilar');

export const setDataFetchingStatus = createAction<boolean>(
  'data/fetchingStatus'
);

export const setAuthorizationStatus = createAction<AuthorizationStatusValues>(
  'authorizationStatus/set'
);

export const redirectToRoute = createAction<AppRoutesValues>('redirectToRoute');

export const setMovie = createAction<Movie>('movie/set');

export const setPromoMovie = createAction<PromoMovie>('movie/setPromo');

export const setReviews = createAction<Reviews>('reviews/set');

export const setMyList = createAction<MoviePreviews>('movie/myList');
