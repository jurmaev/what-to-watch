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

  describe('fetchMoviePreviews', () => {
    it('sets isFetchingMovieData to true with pending action', () => {
      const expectedState = { ...initialState, isFetchingMovieData: true };
      const result = movieProcess.reducer(
        initialState,
        fetchMoviePreviews.pending
      );
      expect(result).toEqual(expectedState);
    });

    it('sets isFetchingMovieData to false and moviePreviews to payload with fulfilled action', () => {
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
  });

  describe('fetchMovie', () => {
    it('sets isFetchingMovieData to true with pending action', () => {
      const expectedState = { ...initialState, isFetchingMovieData: true };
      const result = movieProcess.reducer(initialState, fetchMovie.pending);
      expect(result).toEqual(expectedState);
    });

    it('sets isFetchingMovieData to false and movie to payload with fulfilled action', () => {
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
  });

  describe('fetchPromoMovie', () => {
    it('sets isFetchingMovieData to true with pending action', () => {
      const expectedState = { ...initialState, isFetchingMovieData: true };
      const result = movieProcess.reducer(
        initialState,
        fetchPromoMovie.pending
      );
      expect(result).toEqual(expectedState);
    });

    it('sets isFetchingMovieData to false and promoMovie to payload with fulfilled action', () => {
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
  });

  describe('fetchSimilarMovies', () => {
    it('sets isFetchingMovieData to true with pending action', () => {
      const expectedState = { ...initialState, isFetchingMovieData: true };
      const result = movieProcess.reducer(
        initialState,
        fetchSimilarMovies.pending
      );
      expect(result).toEqual(expectedState);
    });

    it('sets isFetchingMovieData to false and similarMovies to payload with fulfilled action', () => {
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
  });

  describe('fetchMyList', () => {
    it('sets isFetchingMovieData to true with pending action', () => {
      const expectedState = { ...initialState, isFetchingMovieData: true };
      const result = movieProcess.reducer(initialState, fetchMyList.pending);
      expect(result).toEqual(expectedState);
    });

    it('sets isFetchingMovieData to false, myList and myListLength to payload with fulfilled action', () => {
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
  });

  describe('fetchFavoriteStatus', () => {
    it('adds favorite movie to myList and change myListLength with fulfilled action', () => {
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

    it('removes favorite movie from myList and change myListLength with fulfilled action', () => {
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
  });

  describe('postFavoriteStatus', () => {
    it('changes promoMovie.isFavorite status with fulfilled action', () => {
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

    it('changes movie.isFavorite status with fulfilled action', () => {
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
});
