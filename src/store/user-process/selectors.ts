import { AuthorizationStatusValues, NameSpace } from '../../const';
import { State } from '../../types/state';

export const getAuthorizationStatus = (
  state: State
): AuthorizationStatusValues => state[NameSpace.User].authorizationStatus;
