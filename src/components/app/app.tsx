import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoutes, AuthorizationStatus } from '../../const';
import MainPage from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import MyListPage from '../../pages/my-list-page/my-list-page';
import MoviePage from '../../pages/movie-page/movie-page';
import ReviewPage from '../../pages/review-page/review-page';
import PlayerPage from '../../pages/player-page/player-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import PrivateRoute from '../private-route/private-route';
import ScrollToTop from '../scroll-to-top/scroll-to-top';
import { Films } from '../../types/film';

type AppProps = {
  main: {
    filmName: string;
    genre: string;
    date: number;
    filmId: number;
  };
  films: Films;
  player: {
    title: string;
    movieLength: string;
    posterSrc: string;
    movieSrc: string;
  };
  review: {
    title: string;
    imgLink: string;
    filmId: number;
  };
  movie: {
    title: string;
    filmId: number;
  };
}

export default function App(props: AppProps): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path={AppRoutes.Main}
            element={<MainPage filmId={props.main.filmId} films={props.films} filmName={props.main.filmName} genre={props.main.genre} date={props.main.date} />}
          />
          <Route path={AppRoutes.Login} element={<LoginPage />} />
          <Route path={AppRoutes.MyList} element={<PrivateRoute authorized={AuthorizationStatus.Auth}><MyListPage films={props.films} /></PrivateRoute>} />
          <Route path={AppRoutes.Movie}
            element={<MoviePage films={props.films} title={props.movie.title} filmId={props.movie.filmId} />}
          />
          <Route path={AppRoutes.Review}
            element={<ReviewPage title={props.review.title} imgLink={props.review.imgLink} filmId={props.review.filmId} />}
          />
          <Route path={AppRoutes.Player}
            element={<PlayerPage title={props.player.title} movieLength={props.player.movieLength} posterSrc={props.player.posterSrc} movieSrc={props.player.movieSrc} />}
          />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
