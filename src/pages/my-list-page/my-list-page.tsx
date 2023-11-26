import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import MovieList from '../../components/movie-list/movie-list';
import { AppRoutes } from '../../const';
import UserBlock from '../../components/user-block/user-block';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect } from 'react';
import { fetchMyList } from '../../store/api-actions';
import Spinner from '../../components/spinner/spinner';
import {
  getMovieFetchingStatus,
  getMyList,
} from '../../store/movie-process/selectors';
import Logo from '../../components/logo/logo';

export default function MyListPage() {
  const dispatch = useAppDispatch();
  const myList = useAppSelector(getMyList);
  const isFetchingData = useAppSelector(getMovieFetchingStatus);

  useEffect(() => {
    dispatch(fetchMyList());
  }, [dispatch]);

  if (isFetchingData) {
    return <Spinner isActive />;
  }

  return (
    <div className="user-page">
      <Helmet>
        <title>My List</title>
      </Helmet>

      <header className="page-header user-page__head">
        <Logo />

        <h1 className="page-title user-page__title">
          My list <span className="user-page__film-count">{myList.length}</span>
        </h1>
        <UserBlock />
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        <MovieList moviePreviews={myList} length={myList.length} />
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
  );
}
