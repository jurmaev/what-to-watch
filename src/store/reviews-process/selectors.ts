import { Namespace } from '../../const';
import { Reviews } from '../../types/reviews';
import { State } from '../../types/state';

export const getReviews = (
  state: Pick<State, typeof Namespace.Reviews>
): Reviews => state[Namespace.Reviews].reviews;

export const getReviewsFetchingStatus = (
  state: Pick<State, typeof Namespace.Reviews>
): boolean => state[Namespace.Reviews].isFetchingReviewsData;
