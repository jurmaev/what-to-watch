import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import MoviePreviewsByGenre from '../../components/movie-previews-by-genre/movie-previews-by-genre';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Spinner from '../../components/spinner/spinner';
import UserBlock from '../../components/user-block/user-block';
import { useEffect } from 'react';
import { fetchPromoMovie, postFavoriteStatus } from '../../store/api-actions';
import {
  getMovieFetchingStatus,
  getMyListLength,
  getPromoMovie,
} from '../../store/movie-process/selectors';

export default function MainPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const promoMovie = useAppSelector(getPromoMovie);
  const myListLength = useAppSelector(getMyListLength);
  const isFetchingData = useAppSelector(getMovieFetchingStatus);

  useEffect(() => {
    dispatch(fetchPromoMovie());
  }, [dispatch]);

  if (isFetchingData || !promoMovie) {
    return <Spinner isActive />;
  }

  return (
    <>
      <Helmet>
        <title>Main</title>
      </Helmet>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={promoMovie.backgroundImage} alt={promoMovie.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header film-card__head">
          <div className="logo">
            <a className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <UserBlock />
        </header>

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img
                src={promoMovie.posterImage}
                alt={`${promoMovie.name} poster`}
                width="218"
                height="327"
              />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{promoMovie.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{promoMovie.genre}</span>
                <span className="film-card__year">{promoMovie.released}</span>
              </p>

              <div className="film-card__buttons">
                <button
                  className="btn btn--play film-card__button"
                  type="button"
                  onClick={() => navigate(`/player/${promoMovie.id}`)}
                >
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button
                  className="btn btn--list film-card__button"
                  type="button"
                  onClick={() => {
                    dispatch(
                      postFavoriteStatus({
                        id: promoMovie.id,
                        status: Number(!promoMovie.isFavorite),
                      })
                    );
                  }}
                >
                  {promoMovie.isFavorite ? (
                    <svg width="18" height="14" viewBox="0 0 18 14">
                      <use xlinkHref="#in-list"></use>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 19 20" width="19" height="20">
                      <use xlinkHref="#add"></use>
                    </svg>
                  )}

                  <span>My list</span>
                  <span className="film-card__count">{myListLength}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <MoviePreviewsByGenre />

        <footer className="page-footer">
          <div className="logo">
            <a className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
