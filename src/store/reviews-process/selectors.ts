import { NameSpace } from '../../const';
import { Reviews } from '../../types/reviews';
import { State } from '../../types/state';

export const getReviews = (state: State): Reviews =>
  state[NameSpace.Reviews].reviews;

export const getReviewsFetchingStatus = (state: State): boolean =>
  state[NameSpace.Reviews].isFetchingReviewsData;
