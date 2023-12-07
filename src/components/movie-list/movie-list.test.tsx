import { render, screen } from '@testing-library/react';
import MovieList from './movie-list';
import { mockMoviePreviews } from '../../mocks/movie-previews';
import { withHistory } from '../../services/mocks';

describe('MovieList', () => {
  it('renders correctly', () => {
    render(
      withHistory(
        <MovieList
          length={mockMoviePreviews.length}
          moviePreviews={mockMoviePreviews}
        />
      )
    );

    expect(screen.getAllByRole('article')).toHaveLength(1);
  });
});
