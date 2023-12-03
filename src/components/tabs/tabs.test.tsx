import { render, screen } from '@testing-library/react';
import { mockMovie } from '../../mocks/movie';
import { mockReviews } from '../../mocks/reviews';
import Tabs from './tabs';
import { withHistory } from '../../services/mocks';
import userEvent from '@testing-library/user-event';

describe('Tabs', () => {
  it('renders correctly', () => {
    render(withHistory(<Tabs movie={mockMovie} reviews={mockReviews} />));

    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('renders overview tab', () => {
    render(withHistory(<Tabs movie={mockMovie} reviews={mockReviews} />));

    expect(screen.getByText(mockMovie.rating)).toBeInTheDocument();
    expect(screen.getByText(mockMovie.description)).toBeInTheDocument();
  });

  it('renders details tab', async () => {
    render(withHistory(<Tabs movie={mockMovie} reviews={mockReviews} />));

    await userEvent.click(screen.getByTestId('detailsLink'));

    expect(screen.getByText(mockMovie.director)).toBeInTheDocument();
    expect(screen.getByText(mockMovie.genre)).toBeInTheDocument();
    expect(screen.getByText(mockMovie.released)).toBeInTheDocument();
  });

  it('renders reviews tab', async () => {
    render(withHistory(<Tabs movie={mockMovie} reviews={mockReviews} />));

    await userEvent.click(screen.getByTestId('reviewsLink'));

    expect(screen.getAllByTestId('review')).toHaveLength(1);
  });
});
