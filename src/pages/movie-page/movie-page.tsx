import { Helmet } from 'react-helmet-async';
import { Link, generatePath, useParams } from 'react-router-dom';
import MovieList from '../../components/movie-list/movie-list';
import { AppRoutes, AuthorizationStatus } from '../../const';
import Tabs from '../../components/tabs/tabs';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  fetchMovie,
  fetchReviews,
  fetchSimilarMovies,
} from '../../store/api-actions';
import { useEffect } from 'react';
import NotFoundPage from '../not-found-page/not-found-page';
import UserBlock from '../../components/ui/user-block/user-block';
import Spinner from '../../components/ui/spinner/spinner';
import {
  getMovie,
  getMovieFetchingStatus,
  getSimilarMovies,
} from '../../store/movie-process/selectors';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import {
  getReviews,
  getReviewsFetchingStatus,
} from '../../store/reviews-process/selectors';
import Logo from '../../components/ui/logo/logo';
import Footer from '../../components/ui/footer/footer';
import MyListButton from '../../components/ui/my-list-button/my-list-button';
import PlayButton from '../../components/ui/play-button/play-button';

export default function MoviePage() {
  const movie = useAppSelector(getMovie);
  const reviews = useAppSelector(getReviews);
  const similarMovies = useAppSelector(getSimilarMovies);
  const isFetchingMovies = useAppSelector(getMovieFetchingStatus);
  const isFetchingReviews = useAppSelector(getReviewsFetchingStatus);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const { id } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchMovie(id));
      dispatch(fetchReviews(id));
      dispatch(fetchSimilarMovies(id));
    }
  }, [dispatch, id]);

  if (isFetchingMovies || isFetchingReviews) {
    return <Spinner isActive />;
  }
  if (!id || !movie) {
    return <NotFoundPage />;
  }

  return (
    <>
      <Helmet>
        <title>Movie</title>
      </Helmet>
      <section
        className="film-card film-card--full"
        style={{ backgroundColor: movie.backgroundColor }}
      >
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={movie.backgroundImage} alt={movie.name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <Logo />

            <UserBlock />
          </header>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{movie.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{movie.genre}</span>
                <span className="film-card__year">{movie.released}</span>
              </p>

              <div className="film-card__buttons">
                <PlayButton id={movie.id} />
                <MyListButton
                  id={movie.id}
                  isFavorite={movie.isFavorite}
                  category="movie"
                />
                {authorizationStatus === AuthorizationStatus.Auth && (
                  <Link
                    to={generatePath(AppRoutes.Review, { id: movie.id })}
                    className="btn film-card__button"
                  >
                    Add review
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img
                src={movie.posterImage}
                alt={`${movie.name} poster`}
                width="218"
                height="327"
              />
            </div>
            <Tabs movie={movie} reviews={reviews} />
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <MovieList moviePreviews={similarMovies} length={4} />
        </section>

        <Footer />
      </div>
    </>
  );
}
