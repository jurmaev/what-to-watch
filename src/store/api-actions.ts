import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { MoviePreviews } from '../types/movies';
import { ApiRoute } from '../const';
import { loadMovies, setDataFetchingStatus } from './action';

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
