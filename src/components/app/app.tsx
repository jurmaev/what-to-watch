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
import { MoviePreview, Movies } from '../../types/movies';

type AppProps = {
  main: {
    name: string;
    genre: string;
    date: number;
    id: number;
  };
  moviePreviews: MoviePreview[];
  movies: Movies;
}

export default function App(props: AppProps) {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path={AppRoutes.Main}
            element={<MainPage id={props.main.id} moviePreviews={props.moviePreviews} name={props.main.name} genre={props.main.genre} date={props.main.date} />}
          />
          <Route path={AppRoutes.Login} element={<LoginPage />} />
          <Route path={AppRoutes.MyList} element={<PrivateRoute authorized={AuthorizationStatus.Auth}><MyListPage moviePreviews={props.moviePreviews} /></PrivateRoute>} />
          <Route path={AppRoutes.Movie}
            element={<MoviePage movies={props.movies} moviePreviews={props.moviePreviews} />}
          />
          <Route path={AppRoutes.Review}
            element={<ReviewPage movies={props.movies} />}
          />
          <Route path={AppRoutes.Player}
            element={<PlayerPage movies={props.movies} />}
          />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
