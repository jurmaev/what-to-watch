import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { Movie, MoviePreviews } from '../types/movies';
import { ApiRoute, AppRoutes, AuthorizationStatus } from '../const';
import {
  loadMovies,
  redirectToRoute,
  setAuthorizationStatus,
  setDataFetchingStatus,
  setMovie,
  setReviews,
  setSimilarMovies,
} from './action';
import { AuthData, UserData } from '../types/user';
import { setToken } from '../services/token';
import { Reviews } from '../types/reviews';

export const fetchMoviePreviews = createAsyncThunk<
  void,
  undefined,
  { dispatch: AppDispatch; state: State; extra: AxiosInstance }
>('movies/fetch', async (_arg, { dispatch, extra: api }) => {
  dispatch(setDataFetchingStatus(true));
  const { data } = await api.get<MoviePreviews>(ApiRoute.Films);
  dispatch(loadMovies(data));
  dispatch(setDataFetchingStatus(false));
});

export const checkAuth = createAsyncThunk<
  void,
  undefined,
  { dispatch: AppDispatch; state: State; extra: AxiosInstance }
>('user/checkAuth', async (_arg, { dispatch, extra: api }) => {
  try {
    await api.get(ApiRoute.Login);
    dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
  } catch {
    dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
  }
});

export const login = createAsyncThunk<
  void,
  AuthData,
  { dispatch: AppDispatch; state: State; extra: AxiosInstance }
>('user/login', async ({ email, password }, { dispatch, extra: api }) => {
  const {
    data: { token },
  } = await api.post<UserData>(ApiRoute.Login, { email, password });
  setToken(token);
  dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
  dispatch(redirectToRoute(AppRoutes.Main));
});

export const getMovie = createAsyncThunk<
  void,
  string,
  { dispatch: AppDispatch; extra: AxiosInstance }
>('movie/get', async (id, { dispatch, extra: api }) => {
  dispatch(setDataFetchingStatus(true));
  const { data } = await api.get<Movie>(`${ApiRoute.Films}/${id}`);
  dispatch(setMovie(data));
  dispatch(setDataFetchingStatus(false));
});

export const getReviews = createAsyncThunk<
  void,
  string,
  { dispatch: AppDispatch; extra: AxiosInstance }
>('reviews/get', async (id, { dispatch, extra: api }) => {
  dispatch(setDataFetchingStatus(true));
  const { data } = await api.get<Reviews>(`${ApiRoute.Reviews}/${id}`);
  dispatch(setReviews(data));
  dispatch(setDataFetchingStatus(false));
});

export const getSimilarMovies = createAsyncThunk<
  void,
  string,
  { dispatch: AppDispatch; extra: AxiosInstance }
>('movie/getSimilar', async (id, { dispatch, extra: api }) => {
  dispatch(setDataFetchingStatus(true));
  const { data } = await api.get<MoviePreviews>(
    `${ApiRoute.Films}/${id}/similar`
  );
  dispatch(setSimilarMovies(data));
  dispatch(setDataFetchingStatus(false));
});
