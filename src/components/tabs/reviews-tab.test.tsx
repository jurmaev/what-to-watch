import { mockReviews } from '../../mocks/reviews';
import ReviewsTab from './reviews-tab';
import { render, screen } from '@testing-library/react';

describe('Component: ReviewsTab', () => {
  it('renders correctly', () => {
    const expectedReview = mockReviews[0];

    render(<ReviewsTab reviews={mockReviews} />);

    expect(screen.getAllByTestId('review')).toHaveLength(1);
    expect(screen.getByText(expectedReview.comment)).toBeInTheDocument();
    expect(screen.getByText(expectedReview.user)).toBeInTheDocument();
    expect(screen.getByText(expectedReview.rating)).toBeInTheDocument();
  });
});
