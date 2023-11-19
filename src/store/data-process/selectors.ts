import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const getFetchingDataStatus = (state: State): boolean =>
  state[NameSpace.Data].isFetchingData;
