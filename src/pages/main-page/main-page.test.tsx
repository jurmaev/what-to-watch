import { render, screen } from '@testing-library/react';
import MainPage from './main-page';
import { mockPromoMovie } from '../../mocks/promo-movie';
import { makeFakeStore, withHistory, withStore } from '../../services/mocks';

describe('MainPage', () => {
  it('renders correctly', () => {
    const { withStoreComponent } = withStore(
      withHistory(<MainPage />),
      makeFakeStore()
    );
    render(withStoreComponent);

    expect(screen.getByAltText(mockPromoMovie.name)).toBeInTheDocument();
    expect(
      screen.getByAltText(`${mockPromoMovie.name} poster`)
    ).toBeInTheDocument();
    expect(screen.getByText(mockPromoMovie.name)).toBeInTheDocument();
    expect(screen.getByText(mockPromoMovie.genre)).toBeInTheDocument();
    expect(screen.getByText(mockPromoMovie.released)).toBeInTheDocument();
  });
});
