import { Namespace } from '../../const';
import { mockReviews } from '../../mocks/reviews';
import { getReviews, getReviewsFetchingStatus } from './selectors';

describe('Reviews process selectors', () => {
  const state = {
    [Namespace.Reviews]: {
      reviews: mockReviews,
      isFetchingReviewsData: false,
    },
  };

  it('returns reviews from state', () => {
    const { reviews } = state[Namespace.Reviews];
    const result = getReviews(state);
    expect(result).toEqual(reviews);
  });

  it('returns isFetchingReviewsData from state', () => {
    const { isFetchingReviewsData } = state[Namespace.Reviews];
    const result = getReviewsFetchingStatus(state);
    expect(result).toEqual(isFetchingReviewsData);
  });
});
