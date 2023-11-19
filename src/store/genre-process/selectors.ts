import { GenresValues, NameSpace } from '../../const';
import { State } from '../../types/state';

export const getGenre = (state: State): GenresValues =>
  state[NameSpace.Genre].genre;
