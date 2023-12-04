import { render, screen } from '@testing-library/react';
import ReviewPage from './review-page';
import { makeFakeStore, withHistory, withStore } from '../../services/mocks';
import { mockMovie } from '../../mocks/movie';
import { createMemoryHistory } from 'history';
import { AppRoutes } from '../../const';
import { Route, Routes } from 'react-router-dom';

describe('ReviewPage', () => {
  it('renders correctly', () => {
    const mockHistory = createMemoryHistory();
    const { withStoreComponent } = withStore(
      withHistory(
        <Routes>
          <Route path={AppRoutes.Review} element={<ReviewPage />}></Route>
        </Routes>,
        mockHistory
      ),
      makeFakeStore()
    );
    mockHistory.push(`/films/${mockMovie.id}/review`);

    render(withStoreComponent);

    expect(screen.getByAltText(mockMovie.name)).toBeInTheDocument();
    expect(screen.getByText(mockMovie.name)).toBeInTheDocument();
    expect(screen.getByAltText(`${mockMovie.name} poster`)).toBeInTheDocument();
  });
});
