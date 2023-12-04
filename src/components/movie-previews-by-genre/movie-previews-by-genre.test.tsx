import { render, screen } from '@testing-library/react';
import { makeFakeStore, withHistory, withStore } from '../../services/mocks';
import MoviePreviewsByGenre from './movie-previews-by-genre';
import { Genres, GenresValues, Namespace } from '../../const';
import { mockMoviePreviews } from '../../mocks/movie-previews';

describe('MoviePreviewsByGenre', () => {
  it('renders correctly', () => {
    const { withStoreComponent } = withStore(
      withHistory(<MoviePreviewsByGenre />),
      makeFakeStore()
    );
    const moviePreview = mockMoviePreviews[0];

    render(withStoreComponent);

    expect(screen.getByText('Catalog')).toBeInTheDocument();
    expect(screen.getByTestId(Genres.All)).toBeInTheDocument();
    expect(screen.getByTestId(Genres.All)).toHaveClass(
      'catalog__genres-item--active'
    );
    expect(screen.getByTestId(moviePreview.genre)).toBeInTheDocument();
  });

  it('selects correct genre', () => {
    const moviePreview = mockMoviePreviews[0];
    const { withStoreComponent } = withStore(
      withHistory(<MoviePreviewsByGenre />),
      makeFakeStore({
        [Namespace.Genre]: { genre: moviePreview.genre as GenresValues },
      })
    );

    render(withStoreComponent);

    expect(screen.getByTestId(moviePreview.genre)).toHaveClass(
      'catalog__genres-item--active'
    );
  });
});
