import { AuthorizationStatusValues, Namespace } from '../../const';
import { State } from '../../types/state';

export const getAuthorizationStatus = (
  state: Pick<State, typeof Namespace.User>
): AuthorizationStatusValues => state[Namespace.User].authorizationStatus;

export const getAvatarUrl = (
  state: Pick<State, typeof Namespace.User>
): string => state[Namespace.User].avatarUrl;
