import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { Movie, MoviePreviews, PromoMovie } from '../types/movies';
import { ApiRoute, AppRoutes } from '../const';
import { redirectToRoute } from './action';
import { AuthData, UserData } from '../types/user';
import { deleteToken, setToken } from '../services/token';
import { ReviewBase, Reviews } from '../types/reviews';
import {
  loadMovies,
  setMovie,
  setMyList,
  setPromoMovie,
  setSimilarMovies,
} from './movie-process/movie-process';
import { setDataFetchingStatus } from './data-process/data-process';
import { setReviews } from './reviews-process/reviews-process';

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
>('user/checkAuth', async (_arg, { extra: api }) => {
  await api.get(ApiRoute.Login);
  deleteToken();
});

export const login = createAsyncThunk<
  void,
  AuthData,
  { dispatch: AppDispatch; extra: AxiosInstance }
>('user/login', async ({ email, password }, { dispatch, extra: api }) => {
  const {
    data: { token },
  } = await api.post<UserData>(ApiRoute.Login, { email, password });
  setToken(token);
  dispatch(redirectToRoute(AppRoutes.Main));
});

export const logout = createAsyncThunk<
  void,
  undefined,
  { dispatch: AppDispatch; extra: AxiosInstance }
>('user/logout', async (_arg, { extra: api }) => {
  await api.delete(ApiRoute.Login);
  deleteToken();
});

export const fetchMovie = createAsyncThunk<
  void,
  string,
  { dispatch: AppDispatch; extra: AxiosInstance }
>('movie/fetch', async (id, { dispatch, extra: api }) => {
  dispatch(setDataFetchingStatus(true));
  const { data } = await api.get<Movie>(`${ApiRoute.Films}/${id}`);
  dispatch(setMovie(data));
  dispatch(setDataFetchingStatus(false));
});

export const fetchPromoMovie = createAsyncThunk<
  void,
  undefined,
  { dispatch: AppDispatch; extra: AxiosInstance }
>('movie/fetchPromo', async (_arg, { dispatch, extra: api }) => {
  dispatch(setDataFetchingStatus(true));
  const { data } = await api.get<PromoMovie>(ApiRoute.Promo);
  dispatch(setPromoMovie(data));
  dispatch(setDataFetchingStatus(false));
});

export const fetchReviews = createAsyncThunk<
  void,
  string,
  { dispatch: AppDispatch; extra: AxiosInstance }
>('reviews/fetch', async (id, { dispatch, extra: api }) => {
  dispatch(setDataFetchingStatus(true));
  const { data } = await api.get<Reviews>(`${ApiRoute.Reviews}/${id}`);
  dispatch(setReviews(data));
  dispatch(setDataFetchingStatus(false));
});

export const fetchSimilarMovies = createAsyncThunk<
  void,
  string,
  { dispatch: AppDispatch; extra: AxiosInstance }
>('movie/fetchSimilar', async (id, { dispatch, extra: api }) => {
  dispatch(setDataFetchingStatus(true));
  const { data } = await api.get<MoviePreviews>(
    `${ApiRoute.Films}/${id}/similar`
  );
  dispatch(setSimilarMovies(data));
  dispatch(setDataFetchingStatus(false));
});

export const fetchMyList = createAsyncThunk<
  void,
  undefined,
  { dispatch: AppDispatch; extra: AxiosInstance }
>('movie/fetchMyList', async (_arg, { dispatch, extra: api }) => {
  dispatch(setDataFetchingStatus(true));
  const { data } = await api.get<MoviePreviews>(ApiRoute.MyList);
  dispatch(setMyList(data));
  dispatch(setDataFetchingStatus(false));
});

export const postReview = createAsyncThunk<
  void,
  ReviewBase,
  { dispatch: AppDispatch; extra: AxiosInstance }
>('review/post', async ({ id, comment, rating }, { dispatch, extra: api }) => {
  dispatch(setDataFetchingStatus(true));
  await api.post(`${ApiRoute.Reviews}/${id}`, { comment, rating });
  dispatch(setDataFetchingStatus(false));
});
