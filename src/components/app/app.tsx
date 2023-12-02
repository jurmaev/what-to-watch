import { Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoutes } from '../../const';
import MainPage from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import MyListPage from '../../pages/my-list-page/my-list-page';
import MoviePage from '../../pages/movie-page/movie-page';
import ReviewPage from '../../pages/review-page/review-page';
import PlayerPage from '../../pages/player-page/player-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import PrivateRoute from '../private-route/private-route';
import ScrollToTop from '../scroll-to-top/scroll-to-top';

export default function App() {
  return (
    <HelmetProvider>
      <ScrollToTop />
      <Routes>
        <Route path={AppRoutes.Main} element={<MainPage />} />
        <Route path={AppRoutes.Login} element={<LoginPage />} />
        <Route
          path={AppRoutes.MyList}
          element={
            <PrivateRoute>
              <MyListPage />
            </PrivateRoute>
          }
        />
        <Route path={AppRoutes.Movie} element={<MoviePage />} />
        <Route path={AppRoutes.Review} element={<ReviewPage />} />
        <Route path={AppRoutes.Player} element={<PlayerPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </HelmetProvider>
  );
}
