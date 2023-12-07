import { render, screen } from '@testing-library/react';
import { mockMovie } from '../../mocks/movie';
import { mockReviews } from '../../mocks/reviews';
import Tabs from './tabs';
import { withHistory } from '../../services/mocks';
import userEvent from '@testing-library/user-event';

describe('Tabs', () => {
  const preparedComponent = withHistory(
    <Tabs movie={mockMovie} reviews={mockReviews} />
  );

  it('renders correctly', () => {
    render(preparedComponent);

    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('renders overview tab', () => {
    render(preparedComponent);

    expect(screen.getByText(mockMovie.rating)).toBeInTheDocument();
    expect(screen.getByText(mockMovie.description)).toBeInTheDocument();
  });

  it('renders details tab', async () => {
    render(preparedComponent);

    await userEvent.click(screen.getByTestId('detailsLink'));

    expect(screen.getByText(mockMovie.director)).toBeInTheDocument();
    expect(screen.getByText(mockMovie.genre)).toBeInTheDocument();
    expect(screen.getByText(mockMovie.released)).toBeInTheDocument();
  });

  it('renders reviews tab', async () => {
    render(preparedComponent);

    await userEvent.click(screen.getByTestId('reviewsLink'));

    expect(screen.getAllByTestId('review')).toHaveLength(1);
  });
});
