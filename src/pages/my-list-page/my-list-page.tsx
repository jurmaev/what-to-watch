import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import MovieList from '../../components/movie-list/movie-list';
import { MoviePreviews } from '../../types/movies';
import { AppRoutes } from '../../const';

type MyListPageProps = {
  moviePreviews: MoviePreviews;
}

export default function MyListPage(props: MyListPageProps) {
  return (
    <div className="user-page">
      <Helmet><title>My List</title></Helmet>

      <header className="page-header user-page__head">
        <div className="logo">
          <Link to={AppRoutes.Main} className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>

        <h1 className="page-title user-page__title">My list <span className="user-page__film-count">{props.moviePreviews.length}</span></h1>
        <ul className="user-block">
          <li className="user-block__item">
            <div className="user-block__avatar">
              <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
            </div>
          </li>
          <li className="user-block__item">
            <a className="user-block__link">Sign out</a>
          </li>
        </ul>
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        <MovieList moviePreviews={props.moviePreviews} length={props.moviePreviews.length} />
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
