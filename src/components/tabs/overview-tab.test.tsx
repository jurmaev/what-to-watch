import { mockMovie } from '../../mocks/movie';
import OverviewTab from './overview-tab';
import { render, screen } from '@testing-library/react';

describe('OverviewTab', () => {
  it('renders correctly', () => {
    render(<OverviewTab movie={mockMovie} />);

    expect(screen.getByText(mockMovie.rating)).toBeInTheDocument();
    expect(
      screen.getByText(`${mockMovie.scoresCount} ratings`)
    ).toBeInTheDocument();
    expect(screen.getByText(mockMovie.description)).toBeInTheDocument();
    expect(
      screen.getByText(`Director: ${mockMovie.director}`)
    ).toBeInTheDocument();
  });
});
