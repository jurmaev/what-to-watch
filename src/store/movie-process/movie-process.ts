import { createSlice } from '@reduxjs/toolkit';
import { MovieProcess } from '../../types/state';
import { Namespace } from '../../const';
import {
  fetchMovie,
  fetchMoviePreviews,
  fetchMyList,
  fetchPromoMovie,
  fetchSimilarMovies,
  postFavoriteStatus,
} from '../api-actions';

const initialState: MovieProcess = {
  moviePreviews: [],
  movie: null,
  promoMovie: null,
  myList: [],
  myListLength: 0,
  similarMovies: [],
  isFetchingMovieData: false,
};

export const movieProcess = createSlice({
  name: Namespace.Movie,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchMoviePreviews.pending, (state) => {
        state.isFetchingMovieData = true;
      })
      .addCase(fetchMoviePreviews.fulfilled, (state, action) => {
        state.moviePreviews = action.payload;
        state.isFetchingMovieData = false;
      })
      .addCase(fetchMovie.pending, (state) => {
        state.isFetchingMovieData = true;
      })
      .addCase(fetchMovie.fulfilled, (state, action) => {
        state.movie = action.payload;
        state.isFetchingMovieData = false;
      })
      .addCase(fetchPromoMovie.pending, (state) => {
        state.isFetchingMovieData = true;
      })
      .addCase(fetchPromoMovie.fulfilled, (state, action) => {
        state.promoMovie = action.payload;
        state.isFetchingMovieData = false;
      })
      .addCase(fetchSimilarMovies.pending, (state) => {
        state.isFetchingMovieData = true;
      })
      .addCase(fetchSimilarMovies.fulfilled, (state, action) => {
        state.similarMovies = action.payload;
        state.isFetchingMovieData = false;
      })
      .addCase(fetchMyList.pending, (state) => {
        state.isFetchingMovieData = true;
      })
      .addCase(fetchMyList.fulfilled, (state, action) => {
        state.myList = action.payload;
        state.myListLength = action.payload.length;
        state.isFetchingMovieData = false;
      })
      .addCase(postFavoriteStatus.fulfilled, (state, action) => {
        const favoriteMovie = action.payload;
        if (favoriteMovie.isFavorite) {
          state.myList.push(favoriteMovie);
          state.myListLength = state.myList.length;
        } else {
          state.myList = state.myList.filter(
            (movie) => movie.id !== favoriteMovie.id
          );
          state.myListLength = state.myList.length;
        }
        if (favoriteMovie.category === 'promoMovie' && state.promoMovie) {
          state.promoMovie.isFavorite = favoriteMovie.isFavorite;
        } else if (favoriteMovie.category === 'movie' && state.movie) {
          state.movie.isFavorite = favoriteMovie.isFavorite;
        }
      });
  },
});
