import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance, AxiosResponse } from 'axios';
import { MoviePreviews } from '../types/movies';
import { ApiRoute, AuthorizationStatus } from '../const';
import {
  loadMovies,
  setAuthorizationStatus,
  setDataFetchingStatus,
} from './action';

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
