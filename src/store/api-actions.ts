import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import {
  FavoriteMovie,
  FavoriteStatus,
  Movie,
  MoviePreviews,
  PromoMovie,
} from '../types/movies';
import { ApiRoute, AppRoutes } from '../const';
import { redirectToRoute } from './action';
import { AuthData, UserData } from '../types/user';
import { setToken } from '../services/token';
import { ReviewBase, Reviews } from '../types/reviews';

export const fetchMoviePreviews = createAsyncThunk<
  MoviePreviews,
  undefined,
  { dispatch: AppDispatch; state: State; extra: AxiosInstance }
>('movies/fetch', async (_arg, { extra: api }) => {
  const { data } = await api.get<MoviePreviews>(ApiRoute.Films);
  return data;
});

export const checkAuth = createAsyncThunk<
  string,
  undefined,
  { dispatch: AppDispatch; state: State; extra: AxiosInstance }
>('user/checkAuth', async (_arg, { extra: api }) => {
  const {
    data: { avatarUrl },
  } = await api.get<UserData>(ApiRoute.Login);
  return avatarUrl;
});

export const login = createAsyncThunk<
  string,
  AuthData,
  { dispatch: AppDispatch; extra: AxiosInstance }
>('user/login', async ({ email, password }, { dispatch, extra: api }) => {
  const {
    data: { token, avatarUrl },
  } = await api.post<UserData>(ApiRoute.Login, { email, password });
  setToken(token);
  dispatch(redirectToRoute(AppRoutes.Main));
  return avatarUrl;
});

export const logout = createAsyncThunk<
  void,
  undefined,
  { dispatch: AppDispatch; extra: AxiosInstance }
>('user/logout', async (_arg, { extra: api }) => {
  await api.delete(ApiRoute.Login);
});

export const fetchMovie = createAsyncThunk<
  Movie,
  string,
  { dispatch: AppDispatch; extra: AxiosInstance }
>('movie/fetch', async (id, { extra: api }) => {
  const { data } = await api.get<Movie>(`${ApiRoute.Films}/${id}`);
  return data;
});

export const fetchPromoMovie = createAsyncThunk<
  PromoMovie,
  undefined,
  { dispatch: AppDispatch; extra: AxiosInstance }
>('movie/fetchPromo', async (_arg, { extra: api }) => {
  const { data } = await api.get<PromoMovie>(ApiRoute.Promo);
  return data;
});

export const fetchReviews = createAsyncThunk<
  Reviews,
  string,
  { dispatch: AppDispatch; extra: AxiosInstance }
>('reviews/fetch', async (id, { extra: api }) => {
  const { data } = await api.get<Reviews>(`${ApiRoute.Reviews}/${id}`);
  return data;
});

export const fetchSimilarMovies = createAsyncThunk<
  MoviePreviews,
  string,
  { dispatch: AppDispatch; extra: AxiosInstance }
>('movie/fetchSimilar', async (id, { extra: api }) => {
  const { data } = await api.get<MoviePreviews>(
    `${ApiRoute.Films}/${id}/similar`
  );
  return data;
});

export const fetchMyList = createAsyncThunk<
  MoviePreviews,
  undefined,
  { dispatch: AppDispatch; extra: AxiosInstance }
>('movie/fetchMyList', async (_arg, { extra: api }) => {
  const { data } = await api.get<MoviePreviews>(ApiRoute.MyList);
  return data;
});

export const postFavoriteStatus = createAsyncThunk<
  FavoriteMovie,
  FavoriteStatus,
  { dispatch: AppDispatch; extra: AxiosInstance }
>('movie/setFavoriteStatus', async ({ id, status }, { extra: api }) => {
  const { data } = await api.post<FavoriteMovie>(
    `${ApiRoute.MyList}/${id}/${status}`
  );
  return data;
});

export const postReview = createAsyncThunk<
  void,
  ReviewBase,
  { dispatch: AppDispatch; extra: AxiosInstance }
>('review/post', async ({ id, comment, rating }, { extra: api }) => {
  await api.post(`${ApiRoute.Reviews}/${id}`, { comment, rating });
});
