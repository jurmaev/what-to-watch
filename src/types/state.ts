import { AuthorizationStatusValues, GenresValues } from '../const';
import { store } from '../store';
import { Movie, MoviePreviews, PromoMovie } from './movies';
import { Reviews } from './reviews';

export type UserProcess = {
  authorizationStatus: AuthorizationStatusValues;
};

export type MovieProcess = {
  moviePreviews: MoviePreviews;
  movie: Movie | null;
  similarMovies: MoviePreviews;
  promoMovie: PromoMovie | null;
  myList: MoviePreviews;
  myListLength: number;
  isFetchingMovieData: boolean;
};

export type GenreProcess = {
  genre: GenresValues;
};

export type DataProcess = {
  isFetchingData: boolean;
};

export type ReviewsProcess = {
  reviews: Reviews;
  isFetchingReviewsData: boolean;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
