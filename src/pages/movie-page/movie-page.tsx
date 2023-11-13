import { Helmet } from 'react-helmet-async';
import { Link, generatePath, useNavigate, useParams } from 'react-router-dom';
import MovieList from '../../components/movie-list/movie-list';
import { MoviePreviews } from '../../types/movies';
import { AppRoutes } from '../../const';
import Tabs from '../../components/tabs/tabs';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getMovie, getReviews } from '../../store/api-actions';
import { useEffect } from 'react';
import NotFoundPage from '../not-found-page/not-found-page';

type MoviePageProps = {
  moviePreviews: MoviePreviews;
};

export default function MoviePage(props: MoviePageProps) {
  const movie = useAppSelector((state) => state.movie);
  const reviews = useAppSelector((state) => state.reviews);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(getMovie(id));
      dispatch(getReviews(id));
    }
  }, [dispatch, id]);

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
            <div className="logo">
              <Link to={AppRoutes.Main} className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </Link>
            </div>

            <ul className="user-block">
              <li className="user-block__item">
                <div className="user-block__avatar">
                  <img
                    src="img/avatar.jpg"
                    alt="User avatar"
                    width="63"
                    height="63"
                  />
                </div>
              </li>
              <li className="user-block__item">
                <a className="user-block__link">Sign out</a>
              </li>
            </ul>
          </header>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{movie.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{movie.genre}</span>
                <span className="film-card__year">{movie.released}</span>
              </p>

              <div className="film-card__buttons">
                <button
                  className="btn btn--play film-card__button"
                  type="button"
                  onClick={() => navigate(`/player/${movie.id}`)}
                >
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button
                  className="btn btn--list film-card__button"
                  type="button"
                  onClick={() => navigate('/mylist')}
                >
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                  <span className="film-card__count">9</span>
                </button>
                <Link
                  to={generatePath(AppRoutes.Review, { id: movie.id })}
                  className="btn film-card__button"
                >
                  Add review
                </Link>
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
          <MovieList moviePreviews={props.moviePreviews} length={4} />
        </section>

        <footer className="page-footer">
          <div className="logo">
            <Link to={AppRoutes.Main} className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
