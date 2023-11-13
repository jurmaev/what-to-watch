import { Helmet } from 'react-helmet-async';
import { Link, generatePath, useParams } from 'react-router-dom';
import ReviewForm from '../../components/review-form/review-form';
import { AppRoutes } from '../../const';
import NotFoundPage from '../not-found-page/not-found-page';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect } from 'react';
import { fetchMovie } from '../../store/api-actions';
import UserBlock from '../../components/user-block/user-block';
import Spinner from '../../components/spinner/spinner';

export default function ReviewPage() {
  const { id } = useParams();
  const movie = useAppSelector((state) => state.movie);
  const isFetchingData = useAppSelector((state) => state.isFetchingData);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchMovie(id));
    }
  }, [id, dispatch]);

  if (isFetchingData) {
    return <Spinner isActive />;
  }

  if (!movie || !id) {
    return <NotFoundPage />;
  }

  return (
    <section
      className="film-card film-card--full"
      style={{ backgroundColor: movie.backgroundColor }}
    >
      <Helmet>
        <title>Review</title>
      </Helmet>

      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={movie.backgroundImage} alt={movie.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <div className="logo">
            <Link to={AppRoutes.Main} className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link
                  to={generatePath(AppRoutes.Movie, { id: movie.id })}
                  className="breadcrumbs__link"
                >
                  {movie.name}
                </Link>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>

          <UserBlock />
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img
            src={movie.posterImage}
            alt={`${movie.name} poster`}
            width="218"
            height="327"
          />
        </div>
      </div>

      <ReviewForm id={id} />
    </section>
  );
}
