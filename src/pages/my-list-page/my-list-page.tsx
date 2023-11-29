import { Helmet } from 'react-helmet-async';
import MovieList from '../../components/movie-list/movie-list';
import UserBlock from '../../components/ui/user-block/user-block';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect } from 'react';
import { fetchMyList } from '../../store/api-actions';
import Spinner from '../../components/ui/spinner/spinner';
import {
  getMovieFetchingStatus,
  getMyList,
} from '../../store/movie-process/selectors';
import Logo from '../../components/ui/logo/logo';
import Footer from '../../components/ui/footer/footer';

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

      <Footer />
    </div>
  );
}
