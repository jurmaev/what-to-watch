import { internet } from 'faker';
import { mockFavoriteMovie } from '../../mocks/favorite-movie';
import { mockMovie } from '../../mocks/movie';
import { mockMoviePreviews } from '../../mocks/movie-previews';
import { mockPromoMovie } from '../../mocks/promo-movie';
import { FavoriteMovie } from '../../types/movies';
import {
  fetchMovie,
  fetchMoviePreviews,
  fetchMyList,
  fetchPromoMovie,
  fetchSimilarMovies,
  postFavoriteStatus,
} from '../api-actions';
import { movieProcess } from './movie-process';

describe('Movie process slice', () => {
  const initialState = {
    moviePreviews: [],
    movie: null,
    promoMovie: null,
    myList: [],
    myListLength: 0,
    similarMovies: [],
    isFetchingMovieData: false,
  };

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const result = movieProcess.reducer(initialState, emptyAction);
    expect(result).toEqual(initialState);
  });

  it('should return default state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const result = movieProcess.reducer(undefined, emptyAction);
    expect(result).toEqual(initialState);
  });

  it('should set "isFetchingMovieData" to true with "fetchMoviePreviews.pending" action', () => {
    const expectedState = { ...initialState, isFetchingMovieData: true };
    const result = movieProcess.reducer(
      initialState,
      fetchMoviePreviews.pending
    );
    expect(result).toEqual(expectedState);
  });

  it('should set "isFetchingMovieData" to false and "moviePreviews" to payload with "fetchMoviePreviews.fulfilled" action', () => {
    const expectedState = {
      ...initialState,
      isFetchingMovieData: false,
      moviePreviews: mockMoviePreviews,
    };
    const result = movieProcess.reducer(
      initialState,
      fetchMoviePreviews.fulfilled(mockMoviePreviews, '', undefined)
    );
    expect(result).toEqual(expectedState);
  });

  it('should set "isFetchingMovieData" to true with "fetchMovie.pending" action', () => {
    const expectedState = { ...initialState, isFetchingMovieData: true };
    const result = movieProcess.reducer(initialState, fetchMovie.pending);
    expect(result).toEqual(expectedState);
  });

  it('should set "isFetchingMovieData" to false and "movie" to payload with "fetchMovie.fulfilled" action', () => {
    const expectedState = {
      ...initialState,
      isFetchingMovieData: false,
      movie: mockMovie,
    };
    const result = movieProcess.reducer(
      initialState,
      fetchMovie.fulfilled(mockMovie, '', '')
    );
    expect(result).toEqual(expectedState);
  });

  it('should set "isFetchingMovieData" to true with "fetchPromoMovie.pending" action', () => {
    const expectedState = { ...initialState, isFetchingMovieData: true };
    const result = movieProcess.reducer(initialState, fetchPromoMovie.pending);
    expect(result).toEqual(expectedState);
  });

  it('should set "isFetchingMovieData" to false and "promoMovie" to payload with "fetchPromoMovie.fulfilled" action', () => {
    const expectedState = {
      ...initialState,
      isFetchingMovieData: false,
      promoMovie: mockMovie,
    };
    const result = movieProcess.reducer(
      initialState,
      fetchPromoMovie.fulfilled(mockMovie, '', undefined)
    );
    expect(result).toEqual(expectedState);
  });

  it('should set "isFetchingMovieData" to true with "fetchSimilarMovies.pending" action', () => {
    const expectedState = { ...initialState, isFetchingMovieData: true };
    const result = movieProcess.reducer(
      initialState,
      fetchSimilarMovies.pending
    );
    expect(result).toEqual(expectedState);
  });

  it('should set "isFetchingMovieData" to false and "similarMovies" to payload with "fetchSimilarMovies.fulfilled" action', () => {
    const expectedState = {
      ...initialState,
      isFetchingMovieData: false,
      similarMovies: mockMoviePreviews,
    };
    const result = movieProcess.reducer(
      initialState,
      fetchSimilarMovies.fulfilled(mockMoviePreviews, '', '')
    );
    expect(result).toEqual(expectedState);
  });

  it('should set "isFetchingMovieData" to true with "fetchMyList.pending" action', () => {
    const expectedState = { ...initialState, isFetchingMovieData: true };
    const result = movieProcess.reducer(initialState, fetchMyList.pending);
    expect(result).toEqual(expectedState);
  });

  it('should set "isFetchingMovieData" to false, "myList" and "myListLength" to payload with "fetchMyList.fulfilled" action', () => {
    const expectedState = {
      ...initialState,
      isFetchingMovieData: false,
      myList: mockMoviePreviews,
      myListLength: mockMoviePreviews.length,
    };
    const result = movieProcess.reducer(
      initialState,
      fetchMyList.fulfilled(mockMoviePreviews, '', undefined)
    );
    expect(result).toEqual(expectedState);
  });

  it('should add favorite movie to "myList" and change "myListLength" with "postFavoriteStatus.fulfilled" action', () => {
    const favoriteMovie = { ...mockFavoriteMovie, isFavorite: true };
    const expectedState = {
      ...initialState,
      myList: [favoriteMovie],
      myListLength: 1,
    };
    const favoriteStatus = {
      id: mockFavoriteMovie.id,
      category: mockFavoriteMovie.category,
      status: 1,
    };

    const result = movieProcess.reducer(
      initialState,
      postFavoriteStatus.fulfilled(favoriteMovie, '', favoriteStatus)
    );

    expect(result).toEqual(expectedState);
  });

  it('should remove favorite movie from "myList" and change "myListLength" with "postFavoriteStatus.fulfilled" action', () => {
    const favoriteMovie = { ...mockFavoriteMovie, isFavorite: false };
    const startingState = {
      ...initialState,
      myList: [favoriteMovie],
      myListLength: 1,
    };
    const favoriteStatus = {
      id: mockFavoriteMovie.id,
      category: mockFavoriteMovie.category,
      status: 0,
    };

    const result = movieProcess.reducer(
      startingState,
      postFavoriteStatus.fulfilled(favoriteMovie, '', favoriteStatus)
    );

    expect(result).toEqual(initialState);
  });

  it('should change "promoMovie.isFavorite" status with "postFavoriteStatus.fulfilled" action', () => {
    const startingState = { ...initialState, promoMovie: mockPromoMovie };
    const expectedPromoMovie = {
      ...startingState.promoMovie,
      isFavorite: true,
    };
    const favoriteMovie: FavoriteMovie = {
      ...expectedPromoMovie,
      category: 'promoMovie',
      previewImage: internet.url(),
      previewVideoLink: internet.url(),
    };
    const favoriteStatus = {
      id: mockFavoriteMovie.id,
      category: mockFavoriteMovie.category,
      status: 0,
    };

    const result = movieProcess.reducer(
      startingState,
      postFavoriteStatus.fulfilled(favoriteMovie, '', favoriteStatus)
    );

    expect(result.promoMovie?.isFavorite).toBeTruthy();
  });

  it('should change "movie.isFavorite" status with "postFavoriteStatus.fulfilled" action', () => {
    const startingState = { ...initialState, movie: mockMovie };
    const expectedMovie = {
      ...startingState.movie,
      isFavorite: true,
    };
    const favoriteMovie: FavoriteMovie = {
      ...expectedMovie,
      category: 'movie',
      previewImage: internet.url(),
      previewVideoLink: internet.url(),
    };
    const favoriteStatus = {
      id: mockFavoriteMovie.id,
      category: mockFavoriteMovie.category,
      status: 0,
    };

    const result = movieProcess.reducer(
      startingState,
      postFavoriteStatus.fulfilled(favoriteMovie, '', favoriteStatus)
    );

    expect(result.movie?.isFavorite).toBeTruthy();
  });
});
