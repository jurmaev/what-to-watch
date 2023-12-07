import { render, screen } from '@testing-library/react';
import MoviePage from './movie-page';
import { mockMovie } from '../../mocks/movie';
import { makeFakeStore, withHistory, withStore } from '../../services/mocks';
import { createMemoryHistory } from 'history';
import { Route, Routes } from 'react-router-dom';
import { AppRoutes, AuthorizationStatus, Namespace } from '../../const';

describe('MoviePage', () => {
  it('renders correctly', () => {
    const mockHistory = createMemoryHistory();
    const { withStoreComponent } = withStore(
      withHistory(
        <Routes>
          <Route path={AppRoutes.Movie} element={<MoviePage />}></Route>
        </Routes>,
        mockHistory
      ),
      makeFakeStore()
    );
    mockHistory.push(`/films/${mockMovie.id}`);

    render(withStoreComponent);

    expect(screen.getByAltText(mockMovie.name)).toBeInTheDocument();
    expect(screen.getByText(mockMovie.name)).toBeInTheDocument();
    expect(screen.getByText(mockMovie.genre)).toBeInTheDocument();
    expect(screen.getByText(mockMovie.released)).toBeInTheDocument();
    expect(screen.getByAltText(`${mockMovie.name} poster`)).toBeInTheDocument();
    expect(screen.queryByText('Add review')).not.toBeInTheDocument();
  });

  it('shows add review button when user is authorized', () => {
    const mockHistory = createMemoryHistory();
    const { withStoreComponent } = withStore(
      withHistory(
        <Routes>
          <Route path={AppRoutes.Movie} element={<MoviePage />}></Route>
        </Routes>,
        mockHistory
      ),
      makeFakeStore({
        [Namespace.User]: {
          authorizationStatus: AuthorizationStatus.Auth,
          avatarUrl: '',
        },
      })
    );
    mockHistory.push(`/films/${mockMovie.id}`);

    render(withStoreComponent);

    expect(screen.getByText('Add review')).toBeInTheDocument();
  });
});
