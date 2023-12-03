import { render, screen } from '@testing-library/react';
import MovieCard from './movie-card';
import { mockMoviePreviews } from '../../mocks/movie-previews';
import { withHistory } from '../../services/mocks';

describe('MovieCard', () => {
  it('renders correctly', () => {
    const moviePreview = mockMoviePreviews[0];

    render(
      withHistory(
        <MovieCard
          id={moviePreview.id}
          name={moviePreview.name}
          previewImage={moviePreview.previewImage}
          previewVideoLink={moviePreview.previewVideoLink}
          isMuted
        />
      )
    );

    expect(screen.getByRole('article')).toBeInTheDocument();
  });
});
