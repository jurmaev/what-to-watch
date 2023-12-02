import { mockReviews } from '../../mocks/reviews';
import { fetchReviews } from '../api-actions';
import { reviewsProcess } from './reviews-process';

describe('Reviews process slice', () => {
  it('sets isFetchingReviewsData to true with fetchReviews.pending', () => {
    const expectedState = {
      reviews: [],
      isFetchingReviewsData: true,
    };
    const result = reviewsProcess.reducer(undefined, fetchReviews.pending);
    expect(result).toEqual(expectedState);
  });

  it('sets reviews to payload array, isFetchingReviewsData to false with fetchReviews.fulfilled', () => {
    const expectedState = {
      reviews: mockReviews,
      isFetchingReviewsData: false,
    };
    const result = reviewsProcess.reducer(
      undefined,
      fetchReviews.fulfilled(mockReviews, '', '')
    );
    expect(result).toEqual(expectedState);
  });
});
