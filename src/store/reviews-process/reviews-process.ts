import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ReviewsProcess } from '../../types/state';
import { NameSpace } from '../../const';
import { Reviews } from '../../types/reviews';

const initialState: ReviewsProcess = {
  reviews: [],
};

export const reviewsProcess = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: {
    setReviews: (state, action: PayloadAction<Reviews>) => {
      state.reviews = action.payload;
    },
  },
});

export const { setReviews } = reviewsProcess.actions;
