import { Namespace } from '../../const';
import { Movie, MoviePreviews, PromoMovie } from '../../types/movies';
import { State } from '../../types/state';

export const getMoviePreviews = (
  state: Pick<State, typeof Namespace.Movie>
): MoviePreviews => state[Namespace.Movie].moviePreviews;

export const getMovie = (
  state: Pick<State, typeof Namespace.Movie>
): Movie | null => state[Namespace.Movie].movie;

export const getPromoMovie = (
  state: Pick<State, typeof Namespace.Movie>
): PromoMovie | null => state[Namespace.Movie].promoMovie;

export const getMyList = (
  state: Pick<State, typeof Namespace.Movie>
): MoviePreviews => state[Namespace.Movie].myList;

export const getMyListLength = (
  state: Pick<State, typeof Namespace.Movie>
): number => state[Namespace.Movie].myListLength;

export const getSimilarMovies = (
  state: Pick<State, typeof Namespace.Movie>
): MoviePreviews => state[Namespace.Movie].similarMovies;

export const getMovieFetchingStatus = (
  state: Pick<State, typeof Namespace.Movie>
): boolean => state[Namespace.Movie].isFetchingMovieData;
