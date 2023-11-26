import { Namespace } from '../../const';
import { Reviews } from '../../types/reviews';
import { State } from '../../types/state';

export const getReviews = (state: State): Reviews =>
  state[Namespace.Reviews].reviews;

export const getReviewsFetchingStatus = (state: State): boolean =>
  state[Namespace.Reviews].isFetchingReviewsData;
