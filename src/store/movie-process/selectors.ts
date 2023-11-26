import { Namespace } from '../../const';
import { Movie, MoviePreviews, PromoMovie } from '../../types/movies';
import { State } from '../../types/state';

export const getMoviePreviews = (state: State): MoviePreviews =>
  state[Namespace.Movie].moviePreviews;

export const getMovie = (state: State): Movie | null =>
  state[Namespace.Movie].movie;

export const getPromoMovie = (state: State): PromoMovie | null =>
  state[Namespace.Movie].promoMovie;

export const getMyList = (state: State): MoviePreviews =>
  state[Namespace.Movie].myList;

export const getMyListLength = (state: State): number =>
  state[Namespace.Movie].myListLength;

export const getSimilarMovies = (state: State): MoviePreviews =>
  state[Namespace.Movie].similarMovies;

export const getMovieFetchingStatus = (state: State): boolean =>
  state[Namespace.Movie].isFetchingMovieData;
