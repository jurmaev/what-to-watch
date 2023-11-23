import { createSlice } from '@reduxjs/toolkit';
import { ReviewsProcess } from '../../types/state';
import { NameSpace } from '../../const';
import { fetchReviews } from '../api-actions';

const initialState: ReviewsProcess = {
  reviews: [],
  isFetchingReviewsData: false,
};

export const reviewsProcess = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.isFetchingReviewsData = true;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.isFetchingReviewsData = false;
      });
  },
});
