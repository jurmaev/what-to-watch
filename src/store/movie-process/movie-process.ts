import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { MovieProcess } from '../../types/state';
import { NameSpace } from '../../const';
import { Movie, MoviePreviews, PromoMovie } from '../../types/movies';

const initialState: MovieProcess = {
  moviePreviews: [],
  movie: null,
  promoMovie: null,
  myList: [],
  similarMovies: [],
};

export const movieProcess = createSlice({
  name: NameSpace.Movie,
  initialState,
  reducers: {
    loadMovies: (state, action: PayloadAction<MoviePreviews>) => {
      state.moviePreviews = action.payload;
    },
    setMovie: (state, action: PayloadAction<Movie>) => {
      state.movie = action.payload;
    },
    setSimilarMovies: (state, action: PayloadAction<MoviePreviews>) => {
      state.similarMovies = action.payload;
    },
    setPromoMovie: (state, action: PayloadAction<PromoMovie>) => {
      state.promoMovie = action.payload;
    },
    setMyList: (state, action: PayloadAction<MoviePreviews>) => {
      state.myList = action.payload;
    },
  },
});

export const {
  loadMovies,
  setMovie,
  setSimilarMovies,
  setPromoMovie,
  setMyList,
} = movieProcess.actions;
