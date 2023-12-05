import { render, screen } from '@testing-library/react';
import { makeFakeStore, withHistory, withStore } from '../../services/mocks';
import PlayerPage from './player-page';
import { Route, Routes } from 'react-router-dom';
import { AppRoutes } from '../../const';
import { createMemoryHistory } from 'history';
import { mockMovie } from '../../mocks/movie';
import userEvent from '@testing-library/user-event';

describe('PlayerPage', () => {
  it('renders correctly', () => {
    const mockHistory = createMemoryHistory();
    const { withStoreComponent } = withStore(
      withHistory(
        <Routes>
          <Route path={AppRoutes.Player} element={<PlayerPage />}></Route>
        </Routes>,
        mockHistory
      ),
      makeFakeStore()
    );
    mockHistory.push(`/player/${mockMovie.id}`);

    render(withStoreComponent);

    expect(screen.getByText('Exit')).toBeInTheDocument();
    expect(screen.getByText('Toggler')).toBeInTheDocument();
    expect(screen.getByText('Play')).toBeInTheDocument();
    expect(screen.getByText('Full screen')).toBeInTheDocument();
  });

  it('plays video', async () => {
    const mockHistory = createMemoryHistory();
    const { withStoreComponent } = withStore(
      withHistory(
        <Routes>
          <Route path={AppRoutes.Player} element={<PlayerPage />}></Route>
        </Routes>,
        mockHistory
      ),
      makeFakeStore()
    );
    mockHistory.push(`/player/${mockMovie.id}`);

    render(withStoreComponent);
    await userEvent.click(screen.getByTestId('videoControl'));

    expect(screen.getByText('Pause')).toBeInTheDocument();
  });
});
