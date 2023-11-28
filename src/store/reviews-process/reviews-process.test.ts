import { mockReviews } from '../../mocks/reviews';
import { fetchReviews } from '../api-actions';
import { reviewsProcess } from './reviews-process';

describe('Reviews process slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      reviews: [],
      isFetchingReviewsData: false,
    };
    const result = reviewsProcess.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should return default state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      reviews: [],
      isFetchingReviewsData: false,
    };
    const result = reviewsProcess.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should set "isFetchingReviewsData" to true with "fetchReviews.pending"', () => {
    const expectedState = {
      reviews: [],
      isFetchingReviewsData: true,
    };
    const result = reviewsProcess.reducer(undefined, fetchReviews.pending);
    expect(result).toEqual(expectedState);
  });

  it('should set "reviews" to payload array, "isFetchingReviewsData" to false with "fetchReviews.fulfilled"', () => {
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
