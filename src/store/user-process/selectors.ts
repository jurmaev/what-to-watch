import { AuthorizationStatusValues, Namespace } from '../../const';
import { State } from '../../types/state';

export const getAuthorizationStatus = (
  state: State
): AuthorizationStatusValues => state[Namespace.User].authorizationStatus;

export const getAvatarUrl = (state: State): string =>
  state[Namespace.User].avatarUrl;
