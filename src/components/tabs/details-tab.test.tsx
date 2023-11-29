import { render, screen } from '@testing-library/react';
import DetailsTab from './details-tab';
import { mockMovie } from '../../mocks/movie';

describe('Component: DetailsTab', () => {
  it('should render correctly', () => {
    render(<DetailsTab movie={mockMovie} />);

    expect(screen.getByText(mockMovie.director)).toBeInTheDocument();
    expect(screen.getByText(mockMovie.genre)).toBeInTheDocument();
    expect(screen.getByText(mockMovie.released)).toBeInTheDocument();
  });
});
