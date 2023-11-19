import { NameSpace } from '../../const';
import { Movie, MoviePreviews, PromoMovie } from '../../types/movies';
import { State } from '../../types/state';

export const getMoviePreviews = (state: State): MoviePreviews =>
  state[NameSpace.Movie].moviePreviews;

export const getMovie = (state: State): Movie | null =>
  state[NameSpace.Movie].movie;

export const getPromoMovie = (state: State): PromoMovie | null =>
  state[NameSpace.Movie].promoMovie;

export const getMyList = (state: State): MoviePreviews =>
  state[NameSpace.Movie].myList;

export const getSimilarMovies = (state: State): MoviePreviews =>
  state[NameSpace.Movie].similarMovies;

export const getMovieFetchingStatus = (state: State): boolean =>
  state[NameSpace.Movie].isFetchingMovieData;
